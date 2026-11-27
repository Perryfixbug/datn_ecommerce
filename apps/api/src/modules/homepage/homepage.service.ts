import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes, randomUUID } from "node:crypto"
import type { z } from "zod"
import {
  HomepageGetHomepageResponse,
  HomepageCreateHomepageBannerBody,
  HomepageCreateHomepageCategorySectionBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type Config = z.infer<typeof HomepageGetHomepageResponse>
export type Item = Config["draft"]["items"][number]
export type MediaInput = z.infer<typeof HomepageCreateHomepageBannerBody>
export type CategoryInput = z.infer<
  typeof HomepageCreateHomepageCategorySectionBody
>
type Mutation =
  | {
      action: "save"
      kind: Item["kind"]
      id?: string
      input: MediaInput | CategoryInput
    }
  | { action: "delete"; kind: Item["kind"]; id: string }
  | { action: "order"; ids: string[] }
  | { action: "publish"; actorId: bigint }
export function validateHomepageId(value: string) {
  if (BigInt(value) > 9223372036854775807n)
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "ID vượt miền bigint",
    })
}
@Injectable()
export class HomepageService {
  constructor(private readonly db: PrismaService) {}
  async get() {
    const row = await this.db.homepageConfig.findUnique({ where: { id: 1 } })
    if (!row)
      throw new NotFoundException({
        code: "NOT_FOUND",
        message: "Chưa có cấu hình trang chủ; cần migration",
      })
    return HomepageGetHomepageResponse.parse({
      version: row.version,
      draft: row.draft,
      published: row.published,
      publishedVersion: row.publishedVersion,
      publishedAt: row.publishedAt?.toISOString() ?? null,
    })
  }
  async preview(at = new Date().toISOString()) {
    const config = await this.get()
    await this.validateContent(this.db, config.draft)
    const time = Date.parse(at)
    return {
      version: config.version,
      at,
      items: config.draft.items.filter(
        (item) =>
          item.enabled &&
          (!item.startsAt || Date.parse(item.startsAt) <= time) &&
          (!item.endsAt || time < Date.parse(item.endsAt))
      ),
    }
  }
  async mutate(version: number, mutation: Mutation) {
    try {
      return await this.db.$transaction(
        async (tx) => {
          const row = await tx.homepageConfig.findUnique({ where: { id: 1 } })
          if (!row)
            throw new NotFoundException({
              code: "NOT_FOUND",
              message: "Chưa có cấu hình trang chủ; cần migration",
            })
          if (row.version !== version || version >= 2147483646) this.conflict()
          const config = HomepageGetHomepageResponse.parse({
            ...row,
            publishedAt: row.publishedAt?.toISOString() ?? null,
          })
          let items = config.draft.items
          if (mutation.action === "save") {
            const index = mutation.id
              ? items.findIndex(
                  (item) =>
                    item.itemId === mutation.id && item.kind === mutation.kind
                )
              : -1
            if (mutation.id && index < 0) this.notFound()
            if (!mutation.id && items.length >= 100)
              this.invalid("Tối đa 100 thành phần")
            const input = mutation.input
            const item: Item = {
              itemId:
                mutation.id ??
                (
                  randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn || 1n
                ).toString(),
              kind: mutation.kind,
              title: input.title.trim(),
              enabled: input.enabled,
              startsAt: input.startsAt,
              endsAt: input.endsAt,
              imageUrl: "imageUrl" in input ? input.imageUrl : null,
              targetUrl: "targetUrl" in input ? input.targetUrl : null,
              categoryIds: "categoryIds" in input ? input.categoryIds : [],
            }
            if (index >= 0) items[index] = item
            else items.push(item)
          } else if (mutation.action === "delete") {
            const index = items.findIndex(
              (item) =>
                item.itemId === mutation.id && item.kind === mutation.kind
            )
            if (index < 0) this.notFound()
            items.splice(index, 1)
          } else if (mutation.action === "order") {
            if (
              new Set(mutation.ids).size !== mutation.ids.length ||
              mutation.ids.length !== items.length ||
              mutation.ids.some(
                (id) => !items.some((item) => item.itemId === id)
              )
            )
              this.invalid("Thứ tự phải chứa đúng một lần mỗi thành phần")
            const byId = new Map(items.map((item) => [item.itemId, item]))
            items = mutation.ids.map((id) => byId.get(id)!)
          }
          const draft = { items }
          await this.validateContent(tx, draft)
          const now = new Date()
          const publish = mutation.action === "publish"
          const result: Config = {
            ...config,
            version: version + 1,
            draft,
            ...(publish
              ? {
                  published: draft,
                  publishedVersion: version + 1,
                  publishedAt: now.toISOString(),
                }
              : {}),
          }
          const changed = await tx.homepageConfig.updateMany({
            where: { id: 1, version },
            data: {
              version: version + 1,
              draft,
              updatedAt: now,
              ...(publish
                ? {
                    published: draft,
                    publishedVersion: version + 1,
                    publishedAt: now,
                  }
                : {}),
            },
          })
          if (changed.count !== 1) this.conflict()
          if (mutation.action === "publish")
            await tx.auditLog.create({
              data: {
                id: randomUUID(),
                resourceType: "homepage",
                resourceId: 1n,
                actorId: mutation.actorId,
                action: "publish",
                previousStatus: config.published ? "Published" : "Unpublished",
                nextStatus: "Published",
                metadata: {
                  version: version + 1,
                  previousPublishedVersion: config.publishedVersion,
                },
                createdAt: now,
              },
            })
          return HomepageGetHomepageResponse.parse(result)
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
  private async validateContent(
    tx: Pick<Prisma.TransactionClient, "danhMuc">,
    content: Config["draft"]
  ) {
    const ids = new Set<string>()
    const categories = new Set<string>()
    for (const item of content.items) {
      if (ids.has(item.itemId)) this.invalid("ID thành phần bị trùng")
      ids.add(item.itemId)
      if (
        item.startsAt &&
        item.endsAt &&
        Date.parse(item.startsAt) >= Date.parse(item.endsAt)
      )
        this.invalid("Thời gian kết thúc phải sau bắt đầu")
      if (item.kind === "category-section") {
        if (
          !item.categoryIds.length ||
          new Set(item.categoryIds).size !== item.categoryIds.length ||
          item.imageUrl !== null ||
          item.targetUrl !== null
        )
          this.invalid("Khu vực danh mục không hợp lệ")
        for (const id of item.categoryIds) {
          validateHomepageId(id)
          categories.add(id)
        }
      } else if (!item.imageUrl || !item.targetUrl || item.categoryIds.length)
        this.invalid("Banner/quảng cáo không hợp lệ")
      for (const url of [item.imageUrl, item.targetUrl])
        if (url) {
          if (
            [...url].some(
              (char) =>
                char === "\\" ||
                char.charCodeAt(0) <= 32 ||
                char.charCodeAt(0) === 127
            ) ||
            /%0[ad]|%5c/i.test(url)
          )
            this.invalid("URL không hợp lệ")
          let parsed: URL
          try {
            parsed = new URL(url, "https://homepage.invalid")
          } catch {
            this.invalid("URL không hợp lệ")
          }
          if (
            parsed.username ||
            parsed.password ||
            (url.startsWith("/")
              ? parsed.origin !== "https://homepage.invalid"
              : parsed.protocol !== "https:")
          )
            this.invalid("URL không an toàn")
        }
    }
    if (
      categories.size &&
      (await tx.danhMuc.count({
        where: { idDanhMuc: { in: [...categories].map(BigInt) } },
      })) !== categories.size
    )
      this.invalid("Danh mục tham chiếu không tồn tại")
  }
  private invalid(message: string): never {
    throw new BadRequestException({ code: "VALIDATION_ERROR", message })
  }
  private conflict(): never {
    throw new ConflictException({
      code: "CONFLICT",
      message: "Phiên bản trang chủ đã thay đổi; vui lòng tải lại",
    })
  }
  private notFound(): never {
    throw new NotFoundException({
      code: "NOT_FOUND",
      message: "Không tìm thấy thành phần trang chủ",
    })
  }
}
