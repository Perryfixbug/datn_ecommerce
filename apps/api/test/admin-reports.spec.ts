import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import type { INestApplication } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import request from "supertest"
import { AdminReportsController } from "../src/modules/admin-reports/admin-reports.controller.js"
import { AdminReportsService } from "../src/modules/admin-reports/admin-reports.service.js"
import { ReportPermissionsGuard } from "../src/modules/admin-reports/report-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"
import { Prisma } from "../generated/prisma/client.js"
import { ReportsResolveAdminReportResponse } from "../../../packages/api-contract/src/generated/admin.js"

describe("Admin report resolution HTTP", () => {
  let app: INestApplication
  let token: string
  let buyerToken: string
  let job = "QuanTriVien"
  let active = true
  let state = "ChoXuLy"
  let fail: "history" | "notification" | "conflict" | null = null
  let history: unknown[] = []
  let notifications: unknown[] = []
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
        nguoiDung: {
          vaiTro: "NhanVien",
          trangThai: active ? "HoatDong" : "BiKhoa",
        },
      }),
    },
    baoCao: {
      findUnique: jest.fn(async ({ where }: { where: { idBaoCao: bigint } }) =>
        where.idBaoCao === 5n ? { idNguoiMua: 2n } : null
      ),
      updateMany: jest.fn(
        async ({
          where,
          data,
        }: {
          where: { idBaoCao: bigint; trangThai: string }
          data: { trangThai: string }
        }) => {
          if (where.idBaoCao !== 5n || state !== where.trangThai)
            return { count: 0 }
          state = data.trangThai
          return { count: 1 }
        }
      ),
    },
    lichSuXuLy: {
      create: async ({ data }: { data: unknown }) => {
        if (fail === "history") throw new Error("private SQL")
        history.push(data)
      },
    },
    thongBao: {
      create: async ({ data }: { data: unknown }) => {
        if (fail === "notification") throw new Error("private SQL")
        notifications.push(data)
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      if (fail === "conflict")
        throw new Prisma.PrismaClientKnownRequestError("conflict", {
          code: "P2034",
          clientVersion: "test",
        })
      const before = {
        state,
        history: [...history],
        notifications: [...notifications],
      }
      try {
        return await work(db)
      } catch (error) {
        state = before.state
        history = before.history
        notifications = before.notifications
        throw error
      }
    },
  }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminReportsController],
      providers: [
        AdminReportsService,
        ReportPermissionsGuard,
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
    buyerToken = await jwt.signAccessToken({
      id: "2",
      role: "NguoiMua",
      name: "Buyer",
      email: "buyer@example.test",
    })
  })
  beforeEach(() => {
    job = "QuanTriVien"
    active = true
    state = "ChoXuLy"
    history = []
    notifications = []
    fail = null
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const base = "/api/v1/admin/reports/"
  const resolve = (
    id = "5",
    body: unknown = { outcome: "ViPham", reason: " Lý do " },
    access = token
  ) =>
    request(app.getHttpServer())
      .post(base + id + "/resolution")
      .auth(access, { type: "bearer" })
      .send(body)

  it("requires valid active staff and denies operations staff", async () => {
    await request(app.getHttpServer())
      .post(base + "5/resolution")
      .send({})
      .expect(401)
    await resolve("5", {}, "invalid").expect(401)
    await resolve("5", {}, buyerToken).expect(403)
    for (const value of ["NhanVienVanHanh", "Unknown"]) {
      job = value
      await resolve().expect(403)
    }
    job = "QuanTriVien"
    active = false
    await resolve().expect(401)
    expect(state).toBe("ChoXuLy")
    expect(history).toHaveLength(0)
  })
  it("validates id, outcome and required reason before accessing reports", async () => {
    for (const id of ["0", "abc", "report:5", "9999999999999999999"])
      await resolve(id).expect(400)
    for (const body of [
      {},
      { outcome: "ChapNhan", reason: "x" },
      { outcome: "ViPham", reason: " " },
      { outcome: "ViPham", reason: "x".repeat(1001) },
    ])
      await resolve("5", body).expect(400)
    expect(db.baoCao.findUnique).not.toHaveBeenCalled()
    expect(db.baoCao.updateMany).not.toHaveBeenCalled()
  })
  it("allows administrators to conclude violations once with trimmed reason and notification", async () => {
    await resolve("99").expect(404)
    const response = await resolve().expect(200)
    expect(
      ReportsResolveAdminReportResponse.safeParse(response.body).success
    ).toBe(true)
    expect(response.body).toMatchObject({
      reportId: "5",
      status: "DaKetLuan",
      outcome: "ViPham",
      reason: "Lý do",
      handlerId: "1",
    })
    expect(state).toBe("DaKetLuan")
    expect(history).toEqual([
      expect.objectContaining({
        idBaoCao: 5n,
        idNhanVien: 1n,
        hanhDong: "ViPham",
        ghiChu: "Lý do",
      }),
    ])
    expect(notifications).toEqual([
      expect.objectContaining({
        idNguoiDung: 2n,
        doiTuongLienQuan: "report:5",
        loai: "HeThong",
      }),
    ])
    await resolve().expect(409)
    expect(history).toHaveLength(1)
    expect(notifications).toHaveLength(1)
  })
  it("allows moderators to conclude non-violations", async () => {
    job = "KiemDuyetVien"
    const response = await resolve("5", {
      outcome: "KhongViPham",
      reason: "Không vi phạm",
    }).expect(200)
    expect(response.body.outcome).toBe("KhongViPham")
    expect(history).toEqual([
      expect.objectContaining({ hanhDong: "KhongViPham" }),
    ])
  })
  it("rolls back history and notification failures and returns conflicts", async () => {
    for (const step of ["history", "notification"] as const) {
      fail = step
      const response = await resolve().expect(500)
      expect(JSON.stringify(response.body)).not.toContain("SQL")
      expect(state).toBe("ChoXuLy")
      expect(history).toHaveLength(0)
      expect(notifications).toHaveLength(0)
    }
    fail = "conflict"
    await resolve().expect(409)
  })
})
