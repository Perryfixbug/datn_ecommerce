import "reflect-metadata"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { HomepageController } from "../src/modules/homepage/homepage.controller.js"
import { HomepageService } from "../src/modules/homepage/homepage.service.js"
import { HomepagePermissionsGuard } from "../src/modules/homepage/homepage-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"
import type { Config } from "../src/modules/homepage/homepage.service.js"

const empty = () => ({
  id: 1,
  version: 0,
  draft: { items: [] } as Config["draft"],
  published: null as Config["published"],
  publishedVersion: null as number | null,
  publishedAt: null as Date | null,
})
const media = {
  title: " Banner ",
  imageUrl: "https://example.test/banner.jpg",
  targetUrl: "/products",
  enabled: true,
  startsAt: null,
  endsAt: null,
}
describe("Homepage HTTP", () => {
  let app: INestApplication
  let token: string
  let customer: string
  let row = empty()
  let job = "QuanTriVien"
  let categoriesExist = true
  let failAudit = false
  const logs: unknown[] = []
  const db = {
    nguoiDung: {
      findUnique: async ({ where }: { where: { idNguoiDung: bigint } }) => ({
        trangThai: "HoatDong",
        authVersion: 0,
        vaiTro: where.idNguoiDung === 1n ? "NhanVien" : "NguoiMua",
      }),
    },
    nhanVienSan: {
      findUnique: async () => ({
        chucVu: job,
        nguoiDung: { trangThai: "HoatDong", vaiTro: "NhanVien" },
      }),
    },
    homepageConfig: {
      findUnique: async () => structuredClone(row),
      updateMany: async ({
        where,
        data,
      }: {
        where: { version: number }
        data: Partial<typeof row>
      }) => {
        if (where.version !== row.version) return { count: 0 }
        Object.assign(row, structuredClone(data))
        return { count: 1 }
      },
    },
    danhMuc: {
      count: async ({ where }: { where: { idDanhMuc: { in: bigint[] } } }) =>
        categoriesExist ? where.idDanhMuc.in.length : 0,
    },
    auditLog: {
      create: async (value: unknown) => {
        if (failAudit) throw new Error("private SQL")
        logs.push(value)
        return value
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      const before = structuredClone(row)
      const length = logs.length
      try {
        return await work(db)
      } catch (error) {
        row = before
        logs.length = length
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [HomepageController],
      providers: [
        HomepageService,
        HomepagePermissionsGuard,
        AccessTokenGuard,
        JwtService,
        {
          provide: ConfigService,
          useValue: { get: () => "test-secret-at-least-32-characters-long" },
        },
        { provide: PrismaService, useValue: db },
        {
          provide: RedisService,
          useValue: { isBlacklisted: async () => false },
        },
      ],
    }).compile()
    app = module.createNestApplication()
    app.setGlobalPrefix("api/v1")
    app.useGlobalFilters(new ApiExceptionFilter())
    await app.init()
    const jwt = module.get(JwtService)
    token = await jwt.signAccessToken({
      id: "1",
      role: "NhanVien",
      name: "Staff",
      email: "staff@example.test",
    })
    customer = await jwt.signAccessToken({
      id: "2",
      role: "NguoiMua",
      name: "Buyer",
      email: "buyer@example.test",
    })
  })
  beforeEach(() => {
    row = empty()
    job = "QuanTriVien"
    categoriesExist = true
    failAudit = false
    logs.length = 0
  })
  afterAll(async () => {
    await app?.close()
  })
  const base = "/api/v1/admin/homepage"
  const get = (path = "", access = token) =>
    request(app.getHttpServer())
      .get(base + path)
      .auth(access, { type: "bearer" })
  const post = (path: string, body: unknown) =>
    request(app.getHttpServer())
      .post(base + path)
      .auth(token, { type: "bearer" })
      .send(body)
  const patchItem = (path: string, body: unknown) =>
    request(app.getHttpServer())
      .patch(base + path)
      .auth(token, { type: "bearer" })
      .send(body)
  const remove = (path: string) =>
    request(app.getHttpServer())
      .delete(base + path)
      .auth(token, { type: "bearer" })

  it("enforces authentication and separate read/edit/publish permissions", async () => {
    await request(app.getHttpServer()).get(base).expect(401)
    await get("", "invalid").expect(401)
    await get("", customer).expect(403)
    job = "Unknown"
    await get().expect(403)
    job = "KiemDuyetVien"
    await get().expect(200)
    await get("/preview").expect(200)
    await post("/banners", { ...media, version: 0 }).expect(403)
    job = "NhanVienVanHanh"
    await post("/banners", { ...media, version: 0 }).expect(200)
    await post("/publish", { version: 1 }).expect(403)
    expect(logs).toHaveLength(0)
  })
  it.each(["banners", "ads", "category-sections"])(
    "supports create/update/delete for %s without CRUD audit",
    async (route) => {
      const input =
        route === "category-sections"
          ? {
              title: "Categories",
              categoryIds: ["10"],
              enabled: true,
              startsAt: null,
              endsAt: null,
            }
          : media
      const created = await post("/" + route, { ...input, version: 0 }).expect(
        200
      )
      const id = created.body.draft.items[0].itemId
      expect(created.body.version).toBe(1)
      const changed = await patchItem("/" + route + "/" + id, {
        ...input,
        title: "Changed",
        version: 1,
      }).expect(200)
      expect(changed.body.draft.items[0].title).toBe("Changed")
      await remove("/" + route + "/" + id + "?version=2").expect(200)
      expect(row.draft.items).toHaveLength(0)
      expect(logs).toHaveLength(0)
      await remove("/" + route + "/" + id + "?version=3").expect(404)
    }
  )
  it("validates version, booleans, paths, URLs and schedules", async () => {
    await post("/banners", media).expect(400)
    await post("/banners", { ...media, version: 0.5 }).expect(400)
    await post("/banners", { ...media, version: 0, enabled: "false" }).expect(
      400
    )
    await post("/banners", {
      ...media,
      version: 0,
      imageUrl: "javascript:alert(1)",
    }).expect(400)
    await post("/banners", {
      ...media,
      version: 0,
      imageUrl: "https://user:pass@example.test/a",
    }).expect(400)
    await post("/banners", {
      ...media,
      version: 0,
      targetUrl: "//evil.test",
    }).expect(400)
    await post("/banners", {
      ...media,
      version: 0,
      targetUrl: "/%5cevil.test",
    }).expect(400)
    await post("/banners", {
      ...media,
      version: 0,
      startsAt: "2026-11-27T00:00:00Z",
      endsAt: "2026-11-26T00:00:00Z",
    }).expect(400)
    await remove("/banners/abc?version=0").expect(400)
    await remove("/banners/9999999999999999999?version=0").expect(400)
    await remove("/banners/1?version=").expect(400)
    await get("/preview?at=invalid").expect(400)
    expect(row.version).toBe(0)
  })
  it("checks category references and unique category IDs", async () => {
    const input = {
      title: "Categories",
      enabled: true,
      startsAt: null,
      endsAt: null,
      version: 0,
    }
    await post("/category-sections", {
      ...input,
      categoryIds: ["10", "10"],
    }).expect(400)
    categoriesExist = false
    await post("/category-sections", { ...input, categoryIds: ["10"] }).expect(
      400
    )
    expect(row.version).toBe(0)
  })
  it("reorders exact IDs and rejects stale versions and wrong item kinds", async () => {
    await post("/banners", { ...media, version: 0 }).expect(200)
    await post("/ads", { ...media, version: 1 }).expect(200)
    const ids = row.draft.items.map((item) => item.itemId)
    await post("/order", { version: 2, itemIds: [ids[0], ids[0]] }).expect(400)
    await post("/order", { version: 2, itemIds: ["1"] }).expect(400)
    await post("/order", { version: 2, itemIds: [...ids].reverse() }).expect(
      200
    )
    expect(row.draft.items.map((item) => item.itemId)).toEqual(
      [...ids].reverse()
    )
    await post("/banners", { ...media, version: 2 }).expect(409)
    await patchItem("/ads/" + ids[0], { ...media, version: 3 }).expect(404)
  })
  it("previews enabled items inside schedule boundaries", async () => {
    await post("/banners", {
      ...media,
      version: 0,
      startsAt: "2026-11-26T00:00:00Z",
      endsAt: "2026-11-27T00:00:00Z",
    }).expect(200)
    await post("/ads", { ...media, version: 1, enabled: false }).expect(200)
    const start = await get("/preview?at=2026-11-26T00:00:00Z").expect(200)
    expect(start.body.items).toHaveLength(1)
    const end = await get("/preview?at=2026-11-27T00:00:00Z").expect(200)
    expect(end.body.items).toHaveLength(0)
  })
  it("publishes a snapshot with audit and leaves it unchanged after draft edits", async () => {
    await post("/banners", { ...media, version: 0 }).expect(200)
    const id = row.draft.items[0]!.itemId
    const published = await post("/publish", { version: 1 }).expect(200)
    expect(published.body).toMatchObject({
      version: 2,
      publishedVersion: 2,
      published: { items: [{ title: "Banner" }] },
    })
    await post("/publish", { version: 1 }).expect(409)
    await patchItem("/banners/" + id, {
      ...media,
      version: 2,
      title: "Draft",
    }).expect(200)
    const config = await get().expect(200)
    expect(config.body.published.items[0].title).toBe("Banner")
    expect(config.body.draft.items[0].title).toBe("Draft")
    expect(logs).toEqual([
      expect.objectContaining({
        data: expect.objectContaining({
          resourceType: "homepage",
          action: "publish",
          actorId: 1n,
        }),
      }),
    ])
  })
  it("revalidates deleted categories at publication", async () => {
    await post("/category-sections", {
      title: "Categories",
      categoryIds: ["10"],
      enabled: true,
      startsAt: null,
      endsAt: null,
      version: 0,
    }).expect(200)
    categoriesExist = false
    await post("/publish", { version: 1 }).expect(400)
    expect(row.published).toBeNull()
    expect(logs).toHaveLength(0)
  })
  it("does not publish successfully when audit fails", async () => {
    failAudit = true
    const response = await post("/publish", { version: 0 }).expect(500)
    expect(JSON.stringify(response.body)).not.toContain("SQL")
    expect(row.version).toBe(0)
    expect(row.published).toBeNull()
  })
})
