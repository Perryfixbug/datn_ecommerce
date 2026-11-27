import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { ProductModerationController } from "../src/modules/product-moderation/product-moderation.controller.js"
import { ProductModerationService } from "../src/modules/product-moderation/product-moderation.service.js"
import { ModerationPermissionsGuard } from "../src/modules/product-moderation/moderation-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"
import { Prisma } from "../generated/prisma/client.js"

const now = new Date("2026-11-26T00:00:00Z")
const fixture = (id: bigint) => ({
  idSanPham: id,
  maSanPham: "SP" + id,
  tenSanPham: "Ghế",
  anh: "chair.jpg",
  idCuaHang: 20n,
  idDanhMuc: 30n,
  trangThai: "An",
  moderationStatus: "ChoDuyet",
  moderationVersion: 0,
  createdAt: now,
  updatedAt: now,
  moTa: "Gỗ",
  phanLoai: "Gỗ sồi",
  rejectionReason: null as string | null,
  reviewedAt: null as Date | null,
  cuaHang: { tenShop: "Shop", idNguoiBan: 40n },
  danhMuc: { tenDanhMuc: "Ghế" },
  danhSachBienThe: [
    {
      idBienThe: 50n,
      tenBienThe: "Nhỏ",
      thuocTinh: "S",
      anh: null,
      gia: new Prisma.Decimal("999999999999999"),
      tonKho: 2,
    },
  ],
})
describe("Product moderation HTTP", () => {
  let app: INestApplication
  let token: string
  let customerToken: string
  let job = "KiemDuyetVien"
  let active = true
  let failNotice = false
  let rows = [fixture(10n), fixture(9n)]
  const events: unknown[] = []
  const notices: unknown[] = []
  type Where = {
    idSanPham?: bigint | { lt: bigint }
    moderationStatus?: string
    moderationVersion?: number
    idCuaHang?: bigint
    OR?: unknown[]
  }
  const matches = (row: (typeof rows)[number], where: Where) =>
    (!where.idSanPham ||
      (typeof where.idSanPham === "bigint"
        ? row.idSanPham === where.idSanPham
        : row.idSanPham < where.idSanPham.lt)) &&
    (!where.moderationStatus ||
      row.moderationStatus === where.moderationStatus) &&
    (where.moderationVersion === undefined ||
      row.moderationVersion === where.moderationVersion) &&
    (!where.idCuaHang || row.idCuaHang === where.idCuaHang)
  const db = {
    nguoiDung: {
      findUnique: async ({ where }: { where: { idNguoiDung: bigint } }) => ({
        trangThai: active ? "HoatDong" : "BiKhoa",
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
    sanPham: {
      count: jest.fn(
        async ({ where }: { where: Where }) =>
          rows.filter((row) => matches(row, where)).length
      ),
      findMany: jest.fn(
        async ({ where, take }: { where: Where; take: number }) =>
          rows.filter((row) => matches(row, where)).slice(0, take)
      ),
      findUnique: async ({ where }: { where: Where }) =>
        rows.find((row) => matches(row, where)) ?? null,
      updateMany: async ({
        where,
        data,
      }: {
        where: Where
        data: {
          moderationStatus: string
          rejectionReason: string | null
          reviewedAt: Date
        }
      }) => {
        const row = rows.find((item) => matches(item, where))
        if (!row) return { count: 0 }
        row.moderationStatus = data.moderationStatus
        row.moderationVersion++
        row.rejectionReason = data.rejectionReason
        row.reviewedAt = data.reviewedAt
        return { count: 1 }
      },
    },
    auditLog: {
      create: async (value: unknown) => {
        events.push(value)
        return value
      },
    },
    thongBao: {
      create: async (value: unknown) => {
        if (failNotice) throw new Error("private SQL failure")
        notices.push(value)
        return value
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      const snapshot = rows.map((row) => ({ ...row }))
      const eventCount = events.length
      const noticeCount = notices.length
      try {
        return await work(db)
      } catch (error) {
        rows = snapshot
        events.length = eventCount
        notices.length = noticeCount
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductModerationController],
      providers: [
        ProductModerationService,
        ModerationPermissionsGuard,
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
    rows = [fixture(10n), fixture(9n)]
    job = "KiemDuyetVien"
    active = true
    failNotice = false
    events.length = 0
    notices.length = 0
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const get = (path = "", access = token) =>
    request(app.getHttpServer())
      .get("/api/v1/admin/product-moderation" + path)
      .auth(access, { type: "bearer" })
  const post = (action: string, body: unknown = { version: 0 }, id = "10") =>
    request(app.getHttpServer())
      .post("/api/v1/admin/product-moderation/" + id + "/" + action)
      .auth(token, { type: "bearer" })
      .send(body)

  it("requires authentication and enforces read/review jobs without writes", async () => {
    await request(app.getHttpServer())
      .get("/api/v1/admin/product-moderation")
      .expect(401)
    await get("", "invalid").expect(401)
    await get("", customerToken).expect(403)
    active = false
    await get().expect(401)
    active = true
    job = "Unknown"
    await get().expect(403)
    job = "NhanVienVanHanh"
    await get().expect(200)
    await post("approval").expect(403)
    expect(rows[0]!.moderationStatus).toBe("ChoDuyet")
    expect(events).toHaveLength(0)
  })
  it("defaults to pending and paginates with filters and matching total", async () => {
    rows[1]!.moderationStatus = "DaDuyet"
    const pending = await get().expect(200)
    expect(pending.body.total).toBe(1)
    expect(pending.body.items[0].moderationStatus).toBe("ChoDuyet")
    rows[1]!.moderationStatus = "ChoDuyet"
    const first = await get("?limit=1&storeId=20&search=SP").expect(200)
    expect(first.body).toMatchObject({
      total: 2,
      nextCursor: "10",
      items: [{ productId: "10", visibility: "An", version: 0 }],
    })
    const next = await get("?cursor=10").expect(200)
    expect(
      next.body.items.map((row: { productId: string }) => row.productId)
    ).toEqual(["9"])
    expect(db.sanPham.count).toHaveBeenCalledWith({
      where: expect.objectContaining({ moderationStatus: "ChoDuyet" }),
    })
    expect(db.sanPham.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          idCuaHang: 20n,
          OR: expect.any(Array),
        }),
      })
    )
  })
  it("returns content, media and precise VND variant prices", async () => {
    const response = await get("/10").expect(200)
    expect(response.body).toMatchObject({
      description: "Gỗ",
      image: "chair.jpg",
      categoryName: "Ghế",
      variants: [{ variantId: "50", price: "999999999999999", stock: 2 }],
    })
    expect(response.body.cuaHang).toBeUndefined()
    await get("/99").expect(404)
  })
  it.each([
    "?limit=",
    "?limit=false",
    "?limit=1.5",
    "?limit=101",
    "?status=Other",
    "?search=%20",
    "?storeId=0",
    "?cursor=9999999999999999999",
    "/abc",
  ])("validates request %s", async (path) => {
    await get(path).expect(400)
  })
  it("validates decision version and reason", async () => {
    await post("approval", {}).expect(400)
    await post("approval", { version: 0.5 }).expect(400)
    await post("approval", { version: -1 }).expect(400)
    await post("approval", { version: 2147483647 }).expect(400)
    await post("rejection", { version: 0, reason: " " }).expect(400)
    await post("rejection", { version: 0, reason: "x".repeat(501) }).expect(400)
    expect(events).toHaveLength(0)
  })
  it.each([
    ["approval", "DaDuyet"],
    ["rejection", "TuChoi"],
  ])(
    "records %s once without changing visibility or another product",
    async (action, status) => {
      job = "QuanTriVien"
      const response = await post(action!, {
        version: 0,
        reason: " Thiếu ảnh ",
      }).expect(200)
      expect(response.body).toMatchObject({
        productId: "10",
        moderationStatus: status,
        version: 1,
      })
      expect(rows[0]!.trangThai).toBe("An")
      expect(rows[1]!.moderationStatus).toBe("ChoDuyet")
      await post(action!, { version: 0, reason: "Thiếu ảnh" }).expect(409)
      expect(events).toHaveLength(1)
      expect(events).toEqual([
        expect.objectContaining({
          data: expect.objectContaining({
            resourceType: "product",
            resourceId: 10n,
            actorId: 1n,
            metadata: { version: 1 },
          }),
        }),
      ])
      expect(notices).toHaveLength(1)
      if (action === "rejection")
        expect(rows[0]!.rejectionReason).toBe("Thiếu ảnh")
    }
  )
  it("rejects stale versions and missing products with no side effects", async () => {
    await post("approval", { version: 1 }).expect(409)
    await post("approval", { version: 0 }, "99").expect(404)
    expect(events).toHaveLength(0)
    expect(notices).toHaveLength(0)
  })
  it("does not return success or internal errors when transaction fails", async () => {
    failNotice = true
    const response = await post("approval").expect(500)
    expect(response.body.error.code).toBe("INTERNAL_ERROR")
    expect(JSON.stringify(response.body)).not.toContain("SQL")
    expect(rows[0]!.moderationStatus).toBe("ChoDuyet")
    expect(events).toHaveLength(0)
  })
})
