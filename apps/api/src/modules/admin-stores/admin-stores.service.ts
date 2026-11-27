import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes, randomUUID } from "node:crypto"
import type { z } from "zod"
import {
  StoresListAdminStoresQueryParams,
  StoresListAdminStoresResponse,
  StoresGetAdminStoreResponse,
  StoresApproveAdminStoreResponse,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type StoreQuery = z.infer<typeof StoresListAdminStoresQueryParams>
export type StoreAction = "approval" | "rejection" | "lock" | "unlock"
const include = {
  nguoiBan: {
    include: { nguoiDung: { select: { hoTen: true, trangThai: true } } },
  },
} satisfies Prisma.CuaHangInclude
type Store = Prisma.CuaHangGetPayload<{ include: typeof include }>

export function storeId(value: string): bigint {
  const id = BigInt(value)
  if (id < 1n || id > 9223372036854775807n)
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "ID vượt miền bigint",
    })
  return id
}

function summary(store: Store) {
  return StoresListAdminStoresResponse.shape.items.element.parse({
    storeId: store.idCuaHang.toString(),
    code: store.maShop,
    name: store.tenShop,
    image: store.anh,
    province: store.tinh,
    ward: store.xa,
    status: store.trangThai,
    sellerId: store.idNguoiBan.toString(),
    sellerName: store.nguoiBan.nguoiDung.hoTen,
    verificationStatus: store.nguoiBan.trangThaiXacMinh,
    createdAt: store.createdAt.toISOString(),
  })
}

@Injectable()
export class AdminStoresService {
  constructor(private readonly db: PrismaService) {}

  async list(query: StoreQuery) {
    const where: Prisma.CuaHangWhereInput = {
      trangThai: query.status,
      nguoiBan: query.verificationStatus
        ? { trangThaiXacMinh: query.verificationStatus }
        : undefined,
      OR: query.search
        ? [
            { tenShop: { contains: query.search.trim(), mode: "insensitive" } },
            { maShop: { contains: query.search.trim(), mode: "insensitive" } },
          ]
        : undefined,
    }
    return this.db.$transaction(
      async (tx) => {
        const total = await tx.cuaHang.count({ where })
        const rows = await tx.cuaHang.findMany({
          where: {
            ...where,
            idCuaHang: query.cursor ? { lt: storeId(query.cursor) } : undefined,
          },
          orderBy: { idCuaHang: "desc" },
          take: query.limit + 1,
          include,
        })
        const items = rows.slice(0, query.limit).map(summary)
        return {
          items,
          total,
          nextCursor: rows.length > query.limit ? items.at(-1)!.storeId : null,
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
    )
  }

  async detail(id: bigint) {
    const store = await this.db.cuaHang.findUnique({
      where: { idCuaHang: id },
      include,
    })
    if (!store) this.notFound()
    const seller = store.nguoiBan
    return StoresGetAdminStoreResponse.parse({
      ...summary(store),
      description: store.moTa,
      address: store.diaChiChiTiet,
      phone: store.soDienThoai,
      openedOn: store.ngayMoCuaHang.toISOString().slice(0, 10),
      updatedAt: store.updatedAt.toISOString(),
      verification: {
        taxType: seller.loaiThue,
        companyName: seller.tenDoanhNghiep,
        taxCode: seller.maSoThue,
        rejectionReason: seller.lyDoTuChoi,
        submittedAt: seller.thoiGianNop?.toISOString() ?? null,
        reviewedAt: seller.thoiGianDuyet?.toISOString() ?? null,
      },
    })
  }

  async change(
    id: bigint,
    actorId: bigint,
    action: StoreAction,
    reason?: string
  ) {
    try {
      return await this.db.$transaction(
        async (tx) => {
          const store = await tx.cuaHang.findUnique({
            where: { idCuaHang: id },
            include,
          })
          if (!store) this.notFound()
          const now = new Date()
          const review = action === "approval" || action === "rejection"
          const previousStatus = review
            ? store.nguoiBan.trangThaiXacMinh
            : store.trangThai
          const nextStatus =
            action === "approval"
              ? "DaXacMinh"
              : action === "rejection"
                ? "TuChoi"
                : action === "lock"
                  ? "BiKhoa"
                  : "TamDong"
          let changed: { count: number }
          if (review) {
            changed = await tx.nguoiBan.updateMany({
              where: {
                idNguoiBan: store.idNguoiBan,
                trangThaiXacMinh: "ChoDuyet",
              },
              data: {
                trangThaiXacMinh: nextStatus,
                lyDoTuChoi: action === "rejection" ? reason?.trim() : null,
                thoiGianDuyet: now,
                updatedAt: now,
              },
            })
          } else {
            changed = await tx.cuaHang.updateMany({
              where: {
                idCuaHang: id,
                trangThai:
                  action === "lock"
                    ? { in: ["HoatDong", "TamDong"] }
                    : "BiKhoa",
                ...(action === "unlock"
                  ? {
                      nguoiBan: {
                        trangThaiXacMinh: "DaXacMinh",
                        nguoiDung: { trangThai: "HoatDong" },
                      },
                    }
                  : {}),
              },
              data: { trangThai: nextStatus, updatedAt: now },
            })
          }
          if (changed.count !== 1) this.conflict()
          await tx.auditLog.create({
            data: {
              id: randomUUID(),
              resourceType: "store",
              resourceId: id,
              actorId,
              action,
              previousStatus,
              nextStatus,
              reason: reason?.trim(),
              createdAt: now,
            },
          })
          await tx.thongBao.create({
            data: {
              idThongBao:
                randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn,
              idNguoiDung: store.idNguoiBan,
              loai: "HeThong",
              tieuDe: "Cập nhật gian hàng",
              noiDung:
                "Gian hàng " +
                store.tenShop +
                ": " +
                previousStatus +
                " -> " +
                nextStatus +
                (reason ? ": " + reason.trim() : ""),
              thoiGianGui: now,
              doiTuongLienQuan: id.toString(),
            },
          })
          return StoresApproveAdminStoreResponse.parse({
            storeId: id.toString(),
            sellerId: store.idNguoiBan.toString(),
            status: review ? store.trangThai : nextStatus,
            verificationStatus: review
              ? nextStatus
              : store.nguoiBan.trangThaiXacMinh,
            updatedAt: now.toISOString(),
          })
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      )
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      )
        this.conflict()
      throw error
    }
  }

  private notFound(): never {
    throw new NotFoundException({
      code: "NOT_FOUND",
      message: "Không tìm thấy gian hàng",
    })
  }
  private conflict(): never {
    throw new ConflictException({
      code: "CONFLICT",
      message:
        "Trạng thái gian hàng hoặc hồ sơ không phù hợp; vui lòng tải lại",
    })
  }
}
