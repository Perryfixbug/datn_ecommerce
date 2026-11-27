import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes, randomUUID } from "node:crypto"
import type { z } from "zod"
import {
  ProductModerationListProductModerationQueryParams,
  ProductModerationListProductModerationResponse,
  ProductModerationGetProductModerationResponse,
  ProductModerationApproveProductModerationResponse,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type ModerationQuery = z.infer<
  typeof ProductModerationListProductModerationQueryParams
>
const include = {
  cuaHang: { select: { tenShop: true, idNguoiBan: true } },
  danhMuc: { select: { tenDanhMuc: true } },
} satisfies Prisma.SanPhamInclude
type Product = Prisma.SanPhamGetPayload<{ include: typeof include }>
export function moderationId(value: string) {
  const id = BigInt(value)
  if (id < 1n || id > 9223372036854775807n)
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "ID vượt miền bigint",
    })
  return id
}
function summary(product: Product) {
  return ProductModerationListProductModerationResponse.shape.items.element.parse(
    {
      productId: product.idSanPham.toString(),
      code: product.maSanPham,
      name: product.tenSanPham,
      image: product.anh,
      storeId: product.idCuaHang.toString(),
      storeName: product.cuaHang.tenShop,
      categoryId: product.idDanhMuc.toString(),
      categoryName: product.danhMuc.tenDanhMuc,
      visibility: product.trangThai,
      moderationStatus: product.moderationStatus,
      version: product.moderationVersion,
      createdAt: product.createdAt.toISOString(),
    }
  )
}
@Injectable()
export class ProductModerationService {
  constructor(private readonly db: PrismaService) {}
  async list(query: ModerationQuery) {
    const where: Prisma.SanPhamWhereInput = {
      moderationStatus: query.status,
      idCuaHang: query.storeId ? moderationId(query.storeId) : undefined,
      OR: query.search
        ? [
            { tenSanPham: { contains: query.search, mode: "insensitive" } },
            { maSanPham: { contains: query.search, mode: "insensitive" } },
          ]
        : undefined,
    }
    return this.db.$transaction(
      async (tx) => {
        const total = await tx.sanPham.count({ where })
        const rows = await tx.sanPham.findMany({
          where: {
            ...where,
            idSanPham: query.cursor
              ? { lt: moderationId(query.cursor) }
              : undefined,
          },
          orderBy: { idSanPham: "desc" },
          take: query.limit + 1,
          include,
        })
        const items = rows.slice(0, query.limit).map(summary)
        return {
          total,
          items,
          nextCursor:
            rows.length > query.limit ? items.at(-1)!.productId : null,
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
    )
  }
  async detail(id: bigint) {
    const product = await this.db.sanPham.findUnique({
      where: { idSanPham: id },
      include: {
        ...include,
        danhSachBienThe: { orderBy: { idBienThe: "asc" } },
      },
    })
    if (!product) this.notFound()
    return ProductModerationGetProductModerationResponse.parse({
      ...summary(product),
      description: product.moTa,
      classification: product.phanLoai,
      updatedAt: product.updatedAt.toISOString(),
      rejectionReason: product.rejectionReason,
      reviewedAt: product.reviewedAt?.toISOString() ?? null,
      variants: product.danhSachBienThe.map((variant) => ({
        variantId: variant.idBienThe.toString(),
        name: variant.tenBienThe,
        attributes: variant.thuocTinh,
        image: variant.anh,
        price: variant.gia.toFixed(0),
        stock: variant.tonKho,
      })),
    })
  }
  async decide(
    id: bigint,
    actorId: bigint,
    version: number,
    decision: "DaDuyet" | "TuChoi",
    reason?: string
  ) {
    try {
      return await this.db.$transaction(
        async (tx) => {
          const product = await tx.sanPham.findUnique({
            where: { idSanPham: id },
            include,
          })
          if (!product) this.notFound()
          const now = new Date()
          const changed = await tx.sanPham.updateMany({
            where: {
              idSanPham: id,
              moderationStatus: "ChoDuyet",
              moderationVersion: version,
            },
            data: {
              moderationStatus: decision,
              moderationVersion: { increment: 1 },
              rejectionReason: decision === "TuChoi" ? reason?.trim() : null,
              reviewedAt: now,
              updatedAt: now,
            },
          })
          if (changed.count !== 1) this.conflict()
          await tx.auditLog.create({
            data: {
              id: randomUUID(),
              resourceType: "product",
              resourceId: id,
              actorId,
              previousStatus: "ChoDuyet",
              nextStatus: decision,
              action: decision === "DaDuyet" ? "approval" : "rejection",
              metadata: { version: version + 1 },
              reason: reason?.trim(),
              createdAt: now,
            },
          })
          await tx.thongBao.create({
            data: {
              idThongBao:
                randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn,
              idNguoiDung: product.cuaHang.idNguoiBan,
              loai: "HeThong",
              tieuDe: "Kết quả kiểm duyệt sản phẩm",
              noiDung:
                product.tenSanPham +
                ": " +
                decision +
                (reason ? ": " + reason.trim() : ""),
              thoiGianGui: now,
              doiTuongLienQuan: id.toString(),
            },
          })
          return ProductModerationApproveProductModerationResponse.parse({
            productId: id.toString(),
            moderationStatus: decision,
            version: version + 1,
            reviewedAt: now.toISOString(),
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
      message: "Không tìm thấy sản phẩm",
    })
  }
  private conflict(): never {
    throw new ConflictException({
      code: "CONFLICT",
      message: "Sản phẩm đã thay đổi hoặc không còn chờ duyệt",
    })
  }
}
