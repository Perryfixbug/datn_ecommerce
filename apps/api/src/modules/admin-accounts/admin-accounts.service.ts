import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes, randomUUID } from "node:crypto"
import type { z } from "zod"
import {
  AccountsListAdminAccountsQueryParams,
  AccountsListAdminAccountsResponse,
  AccountsGetAdminAccountResponse,
  AccountsLockAdminAccountResponse,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type AccountQuery = z.infer<typeof AccountsListAdminAccountsQueryParams>
type Scope = "all" | "customers"
const select = {
  idNguoiDung: true,
  hoTen: true,
  email: true,
  soDienThoai: true,
  vaiTro: true,
  trangThai: true,
  createdAt: true,
  updatedAt: true,
  lanDangNhapCuoi: true,
} satisfies Prisma.NguoiDungSelect
type Account = Prisma.NguoiDungGetPayload<{ select: typeof select }>
export function accountId(value: string) {
  const id = BigInt(value)
  if (id < 1n || id > 9223372036854775807n)
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "ID vượt miền bigint",
    })
  return id
}
function summary(account: Account) {
  return AccountsListAdminAccountsResponse.shape.items.element.parse({
    accountId: account.idNguoiDung.toString(),
    name: account.hoTen,
    email: account.email,
    phone: account.soDienThoai,
    role: account.vaiTro,
    status: account.trangThai,
    createdAt: account.createdAt.toISOString(),
  })
}
@Injectable()
export class AdminAccountsService {
  constructor(private readonly db: PrismaService) {}
  async list(query: AccountQuery, scope: Scope) {
    const where: Prisma.NguoiDungWhereInput = {
      AND: [
        {
          vaiTro:
            scope === "customers"
              ? { in: ["NguoiMua", "NguoiBan"] }
              : undefined,
        },
        { vaiTro: query.role },
      ],
      trangThai: query.status,
      OR: query.search
        ? [
            { hoTen: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
            { soDienThoai: { contains: query.search } },
          ]
        : undefined,
    }
    return this.db.$transaction(
      async (tx) => {
        const total = await tx.nguoiDung.count({ where })
        const rows = await tx.nguoiDung.findMany({
          where: {
            ...where,
            idNguoiDung: query.cursor
              ? { lt: accountId(query.cursor) }
              : undefined,
          },
          orderBy: { idNguoiDung: "desc" },
          take: query.limit + 1,
          select,
        })
        const items = rows.slice(0, query.limit).map(summary)
        return {
          items,
          total,
          nextCursor:
            rows.length > query.limit ? items.at(-1)!.accountId : null,
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
    )
  }
  async detail(id: bigint, scope: Scope) {
    const account = await this.db.nguoiDung.findFirst({
      where: {
        idNguoiDung: id,
        vaiTro:
          scope === "customers" ? { in: ["NguoiMua", "NguoiBan"] } : undefined,
      },
      select,
    })
    if (!account) this.notFound()
    return AccountsGetAdminAccountResponse.parse({
      ...summary(account),
      updatedAt: account.updatedAt.toISOString(),
      lastLoginAt: account.lanDangNhapCuoi?.toISOString() ?? null,
    })
  }
  async change(
    id: bigint,
    actorId: bigint,
    action: "lock" | "unlock",
    reason: string
  ) {
    if (id === actorId) this.forbidden()
    try {
      return await this.db.$transaction(
        async (tx) => {
          const account = await tx.nguoiDung.findUnique({
            where: { idNguoiDung: id },
            select: { vaiTro: true },
          })
          if (!account) this.notFound()
          if (!["NguoiMua", "NguoiBan"].includes(account.vaiTro))
            this.forbidden()
          const previousStatus = action === "lock" ? "HoatDong" : "BiKhoa"
          const nextStatus = action === "lock" ? "BiKhoa" : "HoatDong"
          const now = new Date()
          const updated = await tx.nguoiDung.updateMany({
            where: {
              idNguoiDung: id,
              vaiTro: { in: ["NguoiMua", "NguoiBan"] },
              trangThai: previousStatus,
            },
            data: {
              trangThai: nextStatus,
              updatedAt: now,
              ...(action === "lock" ? { authVersion: { increment: 1 } } : {}),
            },
          })
          if (updated.count !== 1)
            throw new ConflictException({
              code: "CONFLICT",
              message: "Trạng thái tài khoản không phù hợp",
            })
          if (action === "lock")
            await tx.refreshToken.updateMany({
              where: { idNguoiDung: id, revokedAt: null },
              data: { revokedAt: now },
            })
          await tx.auditLog.create({
            data: {
              id: randomUUID(),
              resourceType: "account",
              resourceId: id,
              actorId,
              action,
              previousStatus,
              nextStatus,
              reason: reason.trim(),
              createdAt: now,
            },
          })
          await tx.thongBao.create({
            data: {
              idThongBao:
                randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn,
              idNguoiDung: id,
              loai: "HeThong",
              tieuDe: "Cập nhật trạng thái tài khoản",
              noiDung: nextStatus + ": " + reason.trim(),
              thoiGianGui: now,
              doiTuongLienQuan: id.toString(),
            },
          })
          return AccountsLockAdminAccountResponse.parse({
            accountId: id.toString(),
            status: nextStatus,
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
        throw new ConflictException({
          code: "CONFLICT",
          message: "Dữ liệu thay đổi đồng thời, vui lòng tải lại",
        })
      throw error
    }
  }
  private forbidden(): never {
    throw new ForbiddenException({
      code: "FORBIDDEN",
      message: "Không được đổi trạng thái tài khoản này",
    })
  }
  private notFound(): never {
    throw new NotFoundException({
      code: "NOT_FOUND",
      message: "Không tìm thấy tài khoản",
    })
  }
}
