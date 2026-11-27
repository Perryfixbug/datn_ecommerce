import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import type { INestApplication } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import request from "supertest"
import { AdminCasesController } from "../src/modules/admin-cases/admin-cases.controller.js"
import { AdminCasesService } from "../src/modules/admin-cases/admin-cases.service.js"
import { CasePermissionsGuard } from "../src/modules/admin-cases/case-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"
import { Prisma } from "../generated/prisma/client.js"
import { CasesGetAdminCaseResponse } from "../../../packages/api-contract/src/generated/admin.js"

const now = new Date("2026-11-26T00:00:00Z")
const fixture = (kind: string, id: string) => ({
  caseId: kind + ":" + id,
  kind,
  status: "ChoXuLy",
  requesterId: "2",
  requesterName: "Buyer",
  orderId: kind === "dispute" ? "3" : null,
  storeId: kind === "dispute" ? "4" : null,
  productId: kind === "report" ? "5" : null,
  createdAt: now,
  closedAt: null as Date | null,
  content: "Nội dung",
  evidence: null,
  outcome: null as string | null,
  reason: null as string | null,
  handlerId: null as string | null,
  privateField: "never expose",
})
describe("Admin cases HTTP", () => {
  let app: INestApplication
  let token: string
  let customerToken: string
  let job = "QuanTriVien"
  let rows = [
    fixture("complaint", "1"),
    fixture("dispute", "3:4"),
    fixture("report", "5"),
  ]
  let history: {
    idLichSuXuLy: bigint
    idNhanVien: bigint
    hanhDong: string
    ghiChu: string
    thoiGian: Date
  }[] = []
  let notifications = 0
  let failNotification = false
  let serializationConflict = false
  const raw = jest.fn(async (sql: Prisma.Sql) => {
    expect(sql.text).not.toContain("never expose")
    if (sql.text.includes('WHERE "caseId" ='))
      return rows.filter((row) => row.caseId === sql.values.at(-1))
    const [kind, , status] = sql.values
    const filtered = rows.filter(
      (row) =>
        (!kind || row.kind === kind) && (!status || row.status === status)
    )
    if (sql.text.includes("count(*)"))
      return [{ total: BigInt(filtered.length) }]
    const cursor = sql.values.at(-3)
    const limit = Number(sql.values.at(-1))
    return filtered
      .filter((row) => !cursor || row.caseId > String(cursor))
      .sort((a, b) => (a.caseId < b.caseId ? -1 : 1))
      .slice(0, limit)
  })
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
    $queryRaw: raw,
    khieuNai: {
      findUnique: async ({ where }: { where: { idKhieuNai: bigint } }) =>
        rows.some((row) => row.caseId === "complaint:" + where.idKhieuNai)
          ? { idNguoiGui: 2n }
          : null,
      updateMany: async ({
        data,
      }: {
        data: { ketQua: string; lyDoXuLy: string; thoiGianDong: Date }
      }) => {
        const row = rows[0]!
        if (row.status !== "ChoXuLy") return { count: 0 }
        Object.assign(row, {
          status: "DaXuLy",
          outcome: data.ketQua,
          reason: data.lyDoXuLy,
          handlerId: "1",
          closedAt: data.thoiGianDong,
        })
        return { count: 1 }
      },
    },
    lichSuXuLy: {
      findMany: jest.fn(async () => history),
      create: async ({ data }: { data: (typeof history)[number] }) => {
        history.push(data)
      },
    },
    thongBao: {
      create: async () => {
        if (failNotification) throw new Error("private SQL")
        notifications++
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      if (serializationConflict)
        throw new Prisma.PrismaClientKnownRequestError("conflict", {
          code: "P2034",
          clientVersion: "test",
        })
      const snapshot = rows.map((row) => ({ ...row }))
      const oldHistory = [...history]
      const oldNotifications = notifications
      try {
        return await work(db)
      } catch (error) {
        rows = snapshot
        history = oldHistory
        notifications = oldNotifications
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminCasesController],
      providers: [
        AdminCasesService,
        CasePermissionsGuard,
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
    rows = [
      fixture("complaint", "1"),
      fixture("dispute", "3:4"),
      fixture("report", "5"),
    ]
    history = []
    notifications = 0
    job = "QuanTriVien"
    failNotification = false
    serializationConflict = false
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const base = "/api/v1/admin/cases"
  const get = (path = "", access = token) =>
    request(app.getHttpServer())
      .get(base + path)
      .auth(access, { type: "bearer" })
  const resolve = (
    id = "complaint:1",
    body: unknown = { outcome: "ChapNhan", reason: " Lý do " }
  ) =>
    request(app.getHttpServer())
      .post(base + "/" + id + "/resolution")
      .auth(token, { type: "bearer" })
      .send(body)

  it("requires authentication and enforces staff permissions", async () => {
    await request(app.getHttpServer()).get(base).expect(401)
    await get("", customerToken).expect(403)
    job = "Unknown"
    await get().expect(403)
    job = "KiemDuyetVien"
    await get().expect(200)
    await resolve().expect(403)
    expect(history).toHaveLength(0)
    job = "NhanVienVanHanh"
    await resolve().expect(200)
  })
  it("paginates mixed kinds with independent total and filters", async () => {
    const first = await get("?limit=1").expect(200)
    expect(first.body).toMatchObject({
      total: 3,
      nextCursor: "complaint:1",
      items: [{ caseId: "complaint:1" }],
    })
    expect(first.body.items[0]).not.toHaveProperty("content")
    const second = await get("?cursor=complaint:1").expect(200)
    expect(
      second.body.items.map((row: { caseId: string }) => row.caseId)
    ).toEqual(["dispute:3:4", "report:5"])
    expect(second.body.total).toBe(3)
    const filtered = await get("?kind=report&status=ChoXuLy").expect(200)
    expect(filtered.body).toMatchObject({
      total: 1,
      nextCursor: null,
      items: [{ caseId: "report:5" }],
    })
    await resolve().expect(200)
    expect((await get("?status=DaXuLy")).body.total).toBe(1)
  })
  it("validates query, bigint keys and resolution body before writes", async () => {
    for (const query of [
      "limit=",
      "limit=x",
      "limit=1.5",
      "limit=101",
      "kind=unknown",
      "status=unknown",
      "cursor=complaint:9999999999999999999",
    ])
      await get("?" + query).expect(400)
    await get("/dispute:3").expect(400)
    await get("/complaint:9999999999999999999").expect(400)
    for (const body of [
      { outcome: "Other", reason: "x" },
      { outcome: "ChapNhan", reason: " " },
      { outcome: "ChapNhan", reason: "x".repeat(1001) },
      { outcome: "TuChoi" },
    ])
      await resolve("complaint:1", body).expect(400)
    expect(raw).not.toHaveBeenCalled()
  })
  it("returns detail and history without leaking extra database fields", async () => {
    for (const id of ["complaint:1", "report:5", "dispute:3:4"]) {
      const response = await get("/" + id).expect(200)
      expect(CasesGetAdminCaseResponse.safeParse(response.body).success).toBe(
        true
      )
      expect(response.body).not.toHaveProperty("privateField")
    }
    expect(db.lichSuXuLy.findMany).toHaveBeenLastCalledWith(
      expect.objectContaining({ where: { idDonHang: 3n, idCuaHang: 4n } })
    )
    await get("/complaint:99").expect(404)
  })
  it("resolves once with history and notification, refusing other case kinds", async () => {
    await resolve("report:5").expect(400)
    await resolve("dispute:3:4").expect(400)
    await resolve("complaint:99").expect(404)
    const response = await resolve().expect(200)
    expect(response.body).toMatchObject({
      status: "DaXuLy",
      outcome: "ChapNhan",
      reason: "Lý do",
      handlerId: "1",
      history: [{ action: "ChapNhan", reason: "Lý do" }],
    })
    await resolve().expect(409)
    expect(history).toHaveLength(1)
    expect(notifications).toBe(1)
  })
  it("rolls back when notification fails and reports serialization conflicts", async () => {
    failNotification = true
    const response = await resolve().expect(500)
    expect(JSON.stringify(response.body)).not.toContain("SQL")
    expect(rows[0]!.status).toBe("ChoXuLy")
    expect(history).toHaveLength(0)
    expect(notifications).toBe(0)
    failNotification = false
    serializationConflict = true
    await resolve().expect(409)
  })
})
