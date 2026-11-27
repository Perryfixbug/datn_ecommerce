import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { AdminCategoriesController } from "../src/modules/admin-categories/admin-categories.controller.js"
import { AdminCategoriesService } from "../src/modules/admin-categories/admin-categories.service.js"
import { CategoryPermissionsGuard } from "../src/modules/admin-categories/category-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"

const now = new Date("2026-11-26T00:00:00Z")
const fixture = (id: bigint, parent: bigint | null = null) => ({
  idDanhMuc: id,
  idDanhMucCha: parent,
  tenDanhMuc: "Category " + id,
  idNhanVien: 1n,
  createdAt: now,
  updatedAt: now,
})
describe("Admin categories HTTP", () => {
  let app: INestApplication
  let token: string
  let customerToken: string
  let job = "QuanTriVien"
  let referenced = false
  let failDelete = false
  let rows = [fixture(10n), fixture(9n, 10n), fixture(8n)]
  type Where = {
    idDanhMuc?: bigint | { lt?: bigint; not?: bigint }
    idDanhMucCha?: bigint | null
    tenDanhMuc?: string | { contains: string }
  }
  const matches = (row: (typeof rows)[number], where: Where) =>
    (!where.idDanhMuc ||
      (typeof where.idDanhMuc === "bigint"
        ? row.idDanhMuc === where.idDanhMuc
        : (!where.idDanhMuc.lt || row.idDanhMuc < where.idDanhMuc.lt) &&
          row.idDanhMuc !== where.idDanhMuc.not)) &&
    (where.idDanhMucCha === undefined ||
      row.idDanhMucCha === where.idDanhMucCha) &&
    (!where.tenDanhMuc ||
      (typeof where.tenDanhMuc === "string"
        ? row.tenDanhMuc === where.tenDanhMuc
        : row.tenDanhMuc
            .toLowerCase()
            .includes(where.tenDanhMuc.contains.toLowerCase())))
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
        nguoiDung: { vaiTro: "NhanVien", trangThai: "HoatDong" },
      }),
    },
    danhMuc: {
      count: async ({ where }: { where: Where }) =>
        rows.filter((row) => matches(row, where)).length,
      findMany: jest.fn(
        async ({ where, take }: { where: Where; take: number }) =>
          rows.filter((row) => matches(row, where)).slice(0, take)
      ),
      findUnique: async ({ where }: { where: Where }) =>
        rows.find((row) => matches(row, where)) ?? null,
      findFirst: async ({ where }: { where: Where }) =>
        rows.find((row) => matches(row, where)) ?? null,
      create: async ({ data }: { data: (typeof rows)[number] }) => {
        rows.push(data)
        return data
      },
      update: async ({
        where,
        data,
      }: {
        where: Where
        data: Partial<(typeof rows)[number]>
      }) => {
        const row = rows.find((item) => matches(item, where))!
        Object.assign(row, data)
        return row
      },
      delete: async ({ where }: { where: Where }) => {
        if (failDelete) throw new Error("private SQL")
        const index = rows.findIndex((row) => matches(row, where))
        return rows.splice(index, 1)[0]
      },
    },
    sanPham: { count: async () => (referenced ? 1 : 0) },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      const snapshot = rows.map((row) => ({ ...row }))
      try {
        return await work(db)
      } catch (error) {
        rows = snapshot
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminCategoriesController],
      providers: [
        AdminCategoriesService,
        CategoryPermissionsGuard,
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
    customerToken = await jwt.signAccessToken({
      id: "2",
      role: "NguoiMua",
      name: "Buyer",
      email: "buyer@example.test",
    })
  })
  beforeEach(() => {
    rows = [fixture(10n), fixture(9n, 10n), fixture(8n)]
    job = "QuanTriVien"
    referenced = false
    failDelete = false
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const base = "/api/v1/admin/catalog/categories"
  const get = (path = "", access = token) =>
    request(app.getHttpServer())
      .get(base + path)
      .auth(access, { type: "bearer" })
  const create = (body: unknown) =>
    request(app.getHttpServer())
      .post(base)
      .auth(token, { type: "bearer" })
      .send(body)
  const update = (id: string, body: unknown) =>
    request(app.getHttpServer())
      .patch(base + "/" + id)
      .auth(token, { type: "bearer" })
      .send(body)
  const remove = (id: string) =>
    request(app.getHttpServer())
      .delete(base + "/" + id)
      .auth(token, { type: "bearer" })

  it("requires auth and denies writes for read-only jobs", async () => {
    await request(app.getHttpServer()).get(base).expect(401)
    await get("", "invalid").expect(401)
    await get("", customerToken).expect(403)
    job = "Unknown"
    await get().expect(403)
    for (const value of ["KiemDuyetVien", "NhanVienVanHanh"]) {
      job = value
      await get().expect(200)
      await create({ name: "New", parentId: null }).expect(403)
      await update("8", { name: "New", parentId: null }).expect(403)
      await remove("8").expect(403)
    }
    expect(rows).toHaveLength(3)
  })
  it("returns parent links with cursor, parent and search filters", async () => {
    const first = await get("?limit=1").expect(200)
    expect(first.body).toMatchObject({
      total: 3,
      nextCursor: "10",
      items: [{ categoryId: "10", parentId: null }],
    })
    const second = await get("?cursor=10").expect(200)
    expect(second.body.items).toHaveLength(2)
    const filtered = await get("?parentId=10&search=category").expect(200)
    expect(filtered.body).toMatchObject({
      total: 1,
      nextCursor: null,
      items: [{ categoryId: "9", parentId: "10" }],
    })
  })
  it.each([
    "?limit=",
    "?limit=false",
    "?limit=1.5",
    "?limit=101",
    "?parentId=0",
    "?search=%20",
    "?cursor=9999999999999999999",
  ])("rejects query %s", async (path) => {
    await get(path).expect(400)
  })
  it("validates bodies and bigint params", async () => {
    await create({ name: " ", parentId: null }).expect(400)
    await create({ name: "x".repeat(101), parentId: null }).expect(400)
    await create({ name: "New" }).expect(400)
    await update("abc", { name: "New", parentId: null }).expect(400)
    await remove("9999999999999999999").expect(400)
  })
  it("creates trimmed root and child names and rejects duplicates", async () => {
    const root = await create({ name: " New ", parentId: null }).expect(200)
    expect(root.body).toMatchObject({ name: "New", parentId: null })
    await create({ name: "New", parentId: null }).expect(409)
    await create({ name: "Child", parentId: "10" }).expect(200)
    await create({ name: " Child ", parentId: "10" }).expect(409)
    await create({ name: "Child", parentId: "8" }).expect(200)
  })
  it("moves and renames while blocking self-parent, descendant cycles and missing parents", async () => {
    await update("10", { name: "Root", parentId: "10" }).expect(409)
    await update("10", { name: "Root", parentId: "9" }).expect(409)
    await update("8", { name: "Root", parentId: "99" }).expect(404)
    await update("99", { name: "Root", parentId: null }).expect(404)
    await update("8", { name: "Category 10", parentId: null }).expect(409)
    const moved = await update("9", { name: "Moved", parentId: null }).expect(
      200
    )
    expect(moved.body).toMatchObject({ name: "Moved", parentId: null })
    expect(rows.find((row) => row.idDanhMuc === 10n)!.tenDanhMuc).toBe(
      "Category 10"
    )
  })
  it("blocks deleting referenced nodes and deletes an unused leaf", async () => {
    await remove("10").expect(409)
    referenced = true
    await remove("8").expect(409)
    referenced = false
    await remove("8").expect(200)
    expect(rows.map((row) => row.idDanhMuc)).toEqual([10n, 9n])
    await remove("8").expect(404)
  })
  it("propagates database failure without leaking SQL or returning success", async () => {
    failDelete = true
    const response = await remove("8").expect(500)
    expect(response.body.error.code).toBe("INTERNAL_ERROR")
    expect(JSON.stringify(response.body)).not.toContain("SQL")
    expect(rows).toHaveLength(3)
  })
})
