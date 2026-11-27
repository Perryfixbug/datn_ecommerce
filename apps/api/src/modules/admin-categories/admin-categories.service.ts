import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes } from "node:crypto"
import type { z } from "zod"
import {
  CategoriesListAdminCategoriesQueryParams,
  CategoriesCreateAdminCategoryBody,
  CategoriesCreateAdminCategoryResponse,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import type { DanhMuc } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type CategoryQuery = z.infer<
  typeof CategoriesListAdminCategoriesQueryParams
>
export type CategoryInput = z.infer<typeof CategoriesCreateAdminCategoryBody>
export function categoryId(value: string) {
  const id = BigInt(value)
  if (id < 1n || id > 9223372036854775807n)
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "ID vượt miền bigint",
    })
  return id
}
function snapshot(category: DanhMuc) {
  return CategoriesCreateAdminCategoryResponse.parse({
    categoryId: category.idDanhMuc.toString(),
    name: category.tenDanhMuc,
    parentId: category.idDanhMucCha?.toString() ?? null,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  })
}
@Injectable()
export class AdminCategoriesService {
  constructor(private readonly db: PrismaService) {}
  async list(query: CategoryQuery) {
    const where: Prisma.DanhMucWhereInput = {
      idDanhMucCha: query.parentId ? categoryId(query.parentId) : undefined,
      tenDanhMuc: query.search
        ? { contains: query.search, mode: "insensitive" }
        : undefined,
    }
    return this.db.$transaction(
      async (tx) => {
        const total = await tx.danhMuc.count({ where })
        const rows = await tx.danhMuc.findMany({
          where: {
            ...where,
            idDanhMuc: query.cursor
              ? { lt: categoryId(query.cursor) }
              : undefined,
          },
          orderBy: { idDanhMuc: "desc" },
          take: query.limit + 1,
        })
        const items = rows.slice(0, query.limit).map(snapshot)
        return {
          total,
          items,
          nextCursor:
            rows.length > query.limit ? items.at(-1)!.categoryId : null,
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
    )
  }
  async save(id: bigint | null, actorId: bigint, input: CategoryInput) {
    return this.write(async (tx) => {
      const before =
        id === null
          ? null
          : await tx.danhMuc.findUnique({ where: { idDanhMuc: id } })
      if (id !== null && !before) this.notFound()
      const parentId =
        input.parentId === null ? null : categoryId(input.parentId)
      await this.validateParent(tx, id, parentId)
      const name = input.name.trim()
      const duplicate = await tx.danhMuc.findFirst({
        where: {
          idDanhMucCha: parentId,
          tenDanhMuc: name,
          ...(id === null ? {} : { idDanhMuc: { not: id } }),
        },
      })
      if (duplicate) this.conflict("Tên danh mục đã tồn tại trong cùng cấp")
      const now = new Date()
      const data = { tenDanhMuc: name, idDanhMucCha: parentId, updatedAt: now }
      const after =
        id === null
          ? await tx.danhMuc.create({
              data: {
                ...data,
                idDanhMuc:
                  randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn || 1n,
                idNhanVien: actorId,
                createdAt: now,
              },
            })
          : await tx.danhMuc.update({ where: { idDanhMuc: id }, data })
      return snapshot(after)
    })
  }
  async remove(id: bigint) {
    return this.write(async (tx) => {
      const before = await tx.danhMuc.findUnique({ where: { idDanhMuc: id } })
      if (!before) this.notFound()
      if (
        (await tx.danhMuc.count({ where: { idDanhMucCha: id } })) ||
        (await tx.sanPham.count({ where: { idDanhMuc: id } }))
      )
        this.conflict("Danh mục còn danh mục con hoặc sản phẩm")
      await tx.danhMuc.delete({ where: { idDanhMuc: id } })
      return { categoryId: id.toString() }
    })
  }
  private async validateParent(
    tx: Prisma.TransactionClient,
    id: bigint | null,
    parentId: bigint | null
  ) {
    const visited = new Set<bigint>()
    let current = parentId
    while (current !== null) {
      if (current === id || visited.has(current))
        this.conflict("Quan hệ danh mục tạo chu trình")
      visited.add(current)
      const parent = await tx.danhMuc.findUnique({
        where: { idDanhMuc: current },
        select: { idDanhMucCha: true },
      })
      if (!parent) this.notFound()
      current = parent.idDanhMucCha
    }
  }
  private async write<T>(work: (tx: Prisma.TransactionClient) => Promise<T>) {
    try {
      return await this.db.$transaction(work, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (["P2002", "P2003", "P2034"].includes(error.code))
          this.conflict(
            "Danh mục trùng tên, đang được tham chiếu hoặc vừa thay đổi"
          )
        if (error.code === "P2025") this.notFound()
      }
      throw error
    }
  }
  private notFound(): never {
    throw new NotFoundException({
      code: "NOT_FOUND",
      message: "Không tìm thấy danh mục hoặc danh mục cha",
    })
  }
  private conflict(message: string): never {
    throw new ConflictException({ code: "CONFLICT", message })
  }
}
