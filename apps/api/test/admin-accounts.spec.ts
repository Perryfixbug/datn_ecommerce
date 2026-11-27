import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { AdminAccountsController } from "../src/modules/admin-accounts/admin-accounts.controller.js"
import { AdminAccountsService } from "../src/modules/admin-accounts/admin-accounts.service.js"
import { AccountPermissionsGuard } from "../src/modules/admin-accounts/account-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"

const now = new Date("2026-11-26T00:00:00Z")
const fixture = (id: bigint, role: string) => ({
  idNguoiDung: id,
  hoTen: "Account " + id,
  email: "account" + id + "@example.test",
  soDienThoai: "0900000000",
  vaiTro: role,
  trangThai: "HoatDong",
  authVersion: 0,
  createdAt: now,
  updatedAt: now,
  lanDangNhapCuoi: null,
  matKhauHash: "private-hash",
})
describe("Admin accounts HTTP and token revocation", () => {
  let app: INestApplication
  let jwt: JwtService
  let staffToken: string
  let buyerToken: string
  let job = "QuanTriVien"
  let rows = [
    fixture(1n, "NhanVien"),
    fixture(2n, "NguoiMua"),
    fixture(3n, "NhanVien"),
  ]
  const audit: unknown[] = []
  const notices: unknown[] = []
  let revoked = false
  let failNotice = false
  type Where = {
    idNguoiDung?: bigint | { lt: bigint }
    vaiTro?: string | { in: string[] }
    trangThai?: string
    AND?: Where[]
    OR?: unknown[]
    authVersion?: number
  }
  const matches = (row: (typeof rows)[number], where: Where): boolean =>
    (!where.idNguoiDung ||
      (typeof where.idNguoiDung === "bigint"
        ? row.idNguoiDung === where.idNguoiDung
        : row.idNguoiDung < where.idNguoiDung.lt)) &&
    (!where.vaiTro ||
      (typeof where.vaiTro === "string"
        ? row.vaiTro === where.vaiTro
        : where.vaiTro.in.includes(row.vaiTro))) &&
    (!where.trangThai || row.trangThai === where.trangThai) &&
    (!where.AND || where.AND.every((part) => matches(row, part)))
  const db = {
    nhanVienSan: {
      findUnique: async () => ({
        chucVu: job,
        nguoiDung: { trangThai: rows[0]!.trangThai, vaiTro: "NhanVien" },
      }),
    },
    nguoiDung: {
      findUnique: async ({ where }: { where: Where }) =>
        rows.find((row) => matches(row, where)) ?? null,
      findFirst: async ({ where }: { where: Where }) =>
        rows.find((row) => matches(row, where)) ?? null,
      findMany: jest.fn(
        async ({ where, take }: { where: Where; take: number }) =>
          rows
            .filter((row) => matches(row, where))
            .sort((a, b) => Number(b.idNguoiDung - a.idNguoiDung))
            .slice(0, take)
      ),
      count: jest.fn(
        async ({ where }: { where: Where }) =>
          rows.filter((row) => matches(row, where)).length
      ),
      updateMany: async ({
        where,
        data,
      }: {
        where: Where
        data: { trangThai: string; authVersion?: { increment: number } }
      }) => {
        const row = rows.find((item) => matches(item, where))
        if (!row) return { count: 0 }
        row.trangThai = data.trangThai
        if (data.authVersion) row.authVersion += data.authVersion.increment
        return { count: 1 }
      },
    },
    refreshToken: {
      updateMany: async () => {
        revoked = true
        return { count: 1 }
      },
    },
    auditLog: {
      create: async (value: unknown) => {
        audit.push(value)
        return value
      },
    },
    thongBao: {
      create: async (value: unknown) => {
        if (failNotice) throw new Error("DB failure")
        notices.push(value)
        return value
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      const snapshot = structuredClone(rows)
      const oldAudit = audit.length
      const oldNotices = notices.length
      const oldRevoked = revoked
      try {
        return await work(db)
      } catch (error) {
        rows = snapshot
        audit.length = oldAudit
        notices.length = oldNotices
        revoked = oldRevoked
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminAccountsController],
      providers: [
        AdminAccountsService,
        AccountPermissionsGuard,
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
    jwt = module.get(JwtService)
    staffToken = await jwt.signAccessToken({
      id: "1",
      role: "NhanVien",
      name: "Staff",
      email: "staff@example.test",
    })
    buyerToken = await jwt.signAccessToken({
      id: "2",
      role: "NguoiMua",
      name: "Buyer",
      email: "buyer@example.test",
    })
  })
  beforeEach(() => {
    rows = [
      fixture(1n, "NhanVien"),
      fixture(2n, "NguoiMua"),
      fixture(3n, "NhanVien"),
    ]
    job = "QuanTriVien"
    audit.length = 0
    notices.length = 0
    revoked = false
    failNotice = false
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const get = (path = "", token = staffToken) =>
    request(app.getHttpServer())
      .get("/api/v1/admin/accounts" + path)
      .auth(token, { type: "bearer" })
  const post = (
    id: string,
    action: string,
    body: unknown = { reason: " Kiểm tra " }
  ) =>
    request(app.getHttpServer())
      .post("/api/v1/admin/accounts/" + id + "/" + action)
      .auth(staffToken, { type: "bearer" })
      .send(body)

  it("requires authentication and denies customers and unknown jobs", async () => {
    await request(app.getHttpServer()).get("/api/v1/admin/accounts").expect(401)
    await get("", "invalid").expect(401)
    await get("", buyerToken).expect(403)
    job = "Unknown"
    await get().expect(403)
    expect(db.nguoiDung.findMany).not.toHaveBeenCalled()
  })
  it("applies the same customer-only scope to list, count and detail", async () => {
    job = "NhanVienVanHanh"
    const response = await get().expect(200)
    expect(response.body.total).toBe(1)
    expect(
      response.body.items.map((row: { accountId: string }) => row.accountId)
    ).toEqual(["2"])
    await get("/3").expect(404)
    await get("/2").expect(200)
    await post("2", "lock").expect(403)
    expect(rows[1]!.trangThai).toBe("HoatDong")
  })
  it("paginates, filters and excludes sensitive fields", async () => {
    const response = await get("?limit=1").expect(200)
    expect(response.body).toMatchObject({
      total: 3,
      nextCursor: "3",
      items: [{ accountId: "3" }],
    })
    const next = await get(
      "?cursor=3&role=NguoiMua&status=HoatDong&search=account"
    ).expect(200)
    expect(next.body.items).toHaveLength(1)
    expect(JSON.stringify(next.body)).not.toContain("private-hash")
    expect(db.nguoiDung.count).toHaveBeenLastCalledWith({
      where: expect.objectContaining({
        OR: expect.arrayContaining([
          expect.objectContaining({ email: expect.anything() }),
        ]),
      }),
    })
    const detail = await get("/2").expect(200)
    expect(detail.body).toMatchObject({ accountId: "2", lastLoginAt: null })
    expect(detail.body.authVersion).toBeUndefined()
  })
  it.each([
    "?limit=",
    "?limit=false",
    "?limit=1.2",
    "?limit=101",
    "?role=Other",
    "?status=false",
    "?search=%20",
    "/0",
    "/abc",
    "/9999999999999999999",
  ])("validates %s through HTTP", async (path) => {
    await get(path).expect(400)
  })
  it("requires reasons and protects self/staff without changing data", async () => {
    await post("2", "lock", {}).expect(400)
    await post("2", "unlock", { reason: " " }).expect(400)
    await post("1", "lock").expect(403)
    await post("3", "lock").expect(403)
    await post("99", "lock").expect(404)
    await get("/99").expect(404)
    expect(audit).toHaveLength(0)
    expect(rows.every((row) => row.trangThai === "HoatDong")).toBe(true)
  })
  it("revokes sessions on lock and never revives old access tokens on unlock", async () => {
    await get("", buyerToken).expect(403)
    await post("2", "lock").expect(200)
    expect(revoked).toBe(true)
    expect(rows[1]!.authVersion).toBe(1)
    await get("", buyerToken).expect(401)
    await post("2", "lock").expect(409)
    await post("2", "unlock").expect(200)
    await get("", buyerToken).expect(401)
    const fresh = await jwt.signAccessToken(
      { id: "2", role: "NguoiMua", name: "Buyer", email: "buyer@example.test" },
      1
    )
    await get("", fresh).expect(403)
    expect(audit).toHaveLength(2)
    expect(audit).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({
            resourceType: "account",
            resourceId: 2n,
            actorId: 1n,
          }),
        }),
      ])
    )
    expect(notices).toHaveLength(2)
  })
  it("propagates transaction failure without a success response", async () => {
    failNotice = true
    const response = await post("2", "lock").expect(500)
    expect(response.body.error.code).toBe("INTERNAL_ERROR")
    expect(JSON.stringify(response.body)).not.toContain("DB failure")
    expect(rows[1]!.trangThai).toBe("HoatDong")
    expect(audit).toHaveLength(0)
    expect(revoked).toBe(false)
  })
})
