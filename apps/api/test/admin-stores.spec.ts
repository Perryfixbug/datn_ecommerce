import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { AdminStoresController } from "../src/modules/admin-stores/admin-stores.controller.js"
import { AdminStoresService } from "../src/modules/admin-stores/admin-stores.service.js"
import { StorePermissionsGuard } from "../src/modules/admin-stores/store-permissions.guard.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"

const now = new Date("2026-11-26T00:00:00Z")
const fixture = () => ({
  idCuaHang: 10n,
  idNguoiBan: 20n,
  maShop: "SHOP10",
  tenShop: "Nội thất",
  anh: null,
  tinh: "HCM",
  xa: "A",
  trangThai: "HoatDong",
  createdAt: now,
  updatedAt: now,
  moTa: null,
  diaChiChiTiet: "123",
  soDienThoai: "0900000000",
  ngayMoCuaHang: now,
  nguoiBan: {
    trangThaiXacMinh: "ChoDuyet",
    loaiThue: null,
    tenDoanhNghiep: null,
    maSoThue: null,
    lyDoTuChoi: null,
    thoiGianNop: now,
    thoiGianDuyet: null,
    soCCCD: "sensitive",
    nguoiDung: { hoTen: "Người bán", trangThai: "HoatDong" },
  },
})

describe("Admin stores HTTP", () => {
  let store = fixture()
  let job = "QuanTriVien"
  let active = true
  let token: string
  let customerToken: string
  let app: INestApplication
  const changes: unknown[] = []
  const audits: unknown[] = []
  const notices: unknown[] = []
  const db = {
    nguoiDung: {
      findUnique: async ({ where }: { where: { idNguoiDung: bigint } }) => ({
        trangThai: "HoatDong",
        authVersion: 0,
        vaiTro: where.idNguoiDung === 2n ? "NguoiMua" : "NhanVien",
      }),
    },
    nhanVienSan: {
      findUnique: jest.fn(async () => ({
        chucVu: job,
        nguoiDung: {
          trangThai: active ? "HoatDong" : "BiKhoa",
          vaiTro: "NhanVien",
        },
      })),
    },
    cuaHang: {
      findUnique: jest.fn(async () => store),
      findMany: jest.fn(async () => [store, { ...store, idCuaHang: 9n }]),
      count: jest.fn(async () => 2),
      updateMany: jest.fn(
        async (args: {
          where: { trangThai: string | { in: string[] }; nguoiBan?: unknown }
          data: { trangThai: string }
        }) => {
          const expected = args.where.trangThai
          const allowed =
            typeof expected === "string"
              ? store.trangThai === expected
              : expected.in.includes(store.trangThai)
          if (
            !allowed ||
            (args.where.nguoiBan &&
              (store.nguoiBan.trangThaiXacMinh !== "DaXacMinh" ||
                store.nguoiBan.nguoiDung.trangThai !== "HoatDong"))
          )
            return { count: 0 }
          changes.push(args)
          store.trangThai = args.data.trangThai
          return { count: 1 }
        }
      ),
    },
    nguoiBan: {
      updateMany: jest.fn(
        async (args: { data: { trangThaiXacMinh: string } }) => {
          if (store.nguoiBan.trangThaiXacMinh !== "ChoDuyet")
            return { count: 0 }
          changes.push(args)
          store.nguoiBan.trangThaiXacMinh = args.data.trangThaiXacMinh
          return { count: 1 }
        }
      ),
    },
    auditLog: {
      create: jest.fn(async (args: unknown) => {
        audits.push(args)
        return args
      }),
    },
    thongBao: {
      create: jest.fn(async (args: unknown) => {
        notices.push(args)
        return args
      }),
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => work(db),
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminStoresController],
      providers: [
        AdminStoresService,
        AccessTokenGuard,
        StorePermissionsGuard,
        Reflector,
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
    store = fixture()
    job = "QuanTriVien"
    active = true
    changes.length = 0
    audits.length = 0
    notices.length = 0
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await app?.close()
  })
  const get = (path: string) =>
    request(app.getHttpServer())
      .get("/api/v1/admin/stores" + path)
      .auth(token, { type: "bearer" })
  const post = (action: string, body = {}) =>
    request(app.getHttpServer())
      .post("/api/v1/admin/stores/10/" + action)
      .auth(token, { type: "bearer" })
      .send(body)

  it("requires a valid token and denies customers without changing data", async () => {
    await request(app.getHttpServer()).get("/api/v1/admin/stores").expect(401)
    await request(app.getHttpServer())
      .get("/api/v1/admin/stores")
      .auth("invalid", { type: "bearer" })
      .expect(401)
    await request(app.getHttpServer())
      .post("/api/v1/admin/stores/10/lock")
      .auth(customerToken, { type: "bearer" })
      .send({ reason: "Vi phạm" })
      .expect(403)
    expect(changes).toHaveLength(0)
  })
  it.each(["Unknown", "toString", "Quan ly danh muc demo"])(
    "denies unconfigured job %s",
    async (value) => {
      job = value
      await get("").expect(403)
      expect(db.cuaHang.findMany).not.toHaveBeenCalled()
    }
  )
  it("denies locked staff and enforces separate review/status permissions", async () => {
    active = false
    await get("").expect(403)
    active = true
    job = "KiemDuyetVien"
    await post("lock", { reason: "Vi phạm" }).expect(403)
    await get("").expect(200)
    job = "NhanVienVanHanh"
    await post("approval").expect(403)
    expect(changes).toHaveLength(0)
  })
  it("converts limit and returns stable pagination without exposing private data", async () => {
    const response = await get(
      "?limit=1&search=SHOP&status=HoatDong&verificationStatus=ChoDuyet"
    ).expect(200)
    expect(response.body).toMatchObject({
      total: 2,
      nextCursor: "10",
      items: [{ storeId: "10", sellerId: "20", name: "Nội thất" }],
    })
    expect(response.body.items).toHaveLength(1)
    expect(JSON.stringify(response.body)).not.toContain("sensitive")
    expect(db.cuaHang.count).toHaveBeenCalledWith({
      where: expect.objectContaining({
        trangThai: "HoatDong",
        nguoiBan: { trangThaiXacMinh: "ChoDuyet" },
      }),
    })
    await get("?cursor=9").expect(200)
    expect(db.cuaHang.findMany).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ idCuaHang: { lt: 9n } }),
      })
    )
  })
  it.each([
    "?limit=101",
    "?limit=1.5",
    "?limit=false",
    "?status=Other",
    "?cursor=9999999999999999999",
    "/0",
    "/abc",
    "/9999999999999999999",
  ])("rejects invalid input %s", async (path) => {
    await get(path).expect(400)
  })
  it("returns detail without identity documents", async () => {
    const response = await get("/10").expect(200)
    expect(response.body).toMatchObject({
      storeId: "10",
      address: "123",
      verification: { taxType: null },
    })
    expect(JSON.stringify(response.body)).not.toContain("sensitive")
  })
  it.each(["rejection", "lock"])(
    "requires a nonblank reason for %s",
    async (action) => {
      await post(action).expect(400)
      await post(action, { reason: "   " }).expect(400)
      expect(changes).toHaveLength(0)
    }
  )
  it.each([
    ["approval", "DaXacMinh"],
    ["rejection", "TuChoi"],
  ])(
    "reviews seller profile through %s and rejects duplicate requests",
    async (action, expected) => {
      const response = await post(action!, { reason: " Thiếu hồ sơ " }).expect(
        200
      )
      expect(response.body).toMatchObject({
        status: "HoatDong",
        verificationStatus: expected,
      })
      await post(action!, { reason: "Thiếu hồ sơ" }).expect(409)
      expect(audits).toHaveLength(1)
      expect(notices).toHaveLength(1)
      expect(store.trangThai).toBe("HoatDong")
    }
  )
  it("locks then unlocks to TamDong only with verified active seller", async () => {
    await post("lock", { reason: " Vi phạm " }).expect(200)
    await post("unlock").expect(409)
    store.nguoiBan.trangThaiXacMinh = "DaXacMinh"
    store.nguoiBan.nguoiDung.trangThai = "BiKhoa"
    await post("unlock").expect(409)
    store.nguoiBan.nguoiDung.trangThai = "HoatDong"
    const response = await post("unlock").expect(200)
    expect(response.body.status).toBe("TamDong")
    expect(audits).toHaveLength(2)
    expect(audits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({
            resourceType: "store",
            resourceId: 10n,
            actorId: 1n,
          }),
        }),
      ])
    )
    expect(notices).toHaveLength(2)
  })
})
