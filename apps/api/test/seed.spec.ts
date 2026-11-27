import "reflect-metadata"
import { jest } from "@jest/globals"
import { assertLocalSeedTarget, seedDemoData } from "../prisma/seed.js"

const localUrl =
  "postgresql://app_user:secret@127.0.0.1:55432/furniture_ecommerce?schema=public"

it.each([
  undefined,
  "postgresql://app_user:secret@localhost:5432/furniture_ecommerce",
  "postgresql://app_user:secret@127.0.0.1:55432/production",
  "postgresql://app_user:secret@remote.example:55432/furniture_ecommerce",
  "postgresql://postgres:secret@127.0.0.1:55432/furniture_ecommerce",
  "postgresql://app_user:secret@127.0.0.1:55432/furniture_ecommerce?schema=other",
])("rejects non-local seed target without leaking the URL", (url) => {
  expect(() => assertLocalSeedTarget(url)).toThrow(
    "Seed chi duoc chay tren PostgreSQL local"
  )
})

it("accepts only the local compose database", () => {
  expect(() => assertLocalSeedTarget(localUrl)).not.toThrow()
})

it("creates real demo accounts and module seed data only once", async () => {
  const nguoiDung = new Map<bigint, Record<string, unknown>>()
  const nguoiMua = new Map<bigint, Record<string, unknown>>()
  const nguoiBan = new Map<bigint, Record<string, unknown>>()
  const nhanVienSan = new Map<bigint, Record<string, unknown>>()
  const cuaHang = new Map<bigint, Record<string, unknown>>()
  const danhMuc = new Map<bigint, Record<string, unknown>>()
  const sanPham = new Map<bigint, Record<string, unknown>>()
  const bienThe = new Map<bigint, Record<string, unknown>>()
  const baoCao = new Map<bigint, Record<string, unknown>>()
  const khieuNai = new Map<bigint, Record<string, unknown>>()
  const homepageConfig = new Map<number, Record<string, unknown>>()

  const create = (
    table: Map<bigint | number, Record<string, unknown>>,
    key: string
  ) =>
    jest.fn(async ({ data }: { data: Record<string, unknown> }) => {
      const record = { idDanhMucCha: null, ...data }
      table.set(data[key] as bigint | number, record)
      return record
    })

  const db = {
    nguoiDung: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNguoiDung: bigint } }) =>
          nguoiDung.get(where.idNguoiDung) ?? null
      ),
      findFirst: jest.fn(async () => null),
      create: create(nguoiDung, "idNguoiDung"),
      update: jest.fn(
        async ({
          where,
          data,
        }: {
          where: { idNguoiDung: bigint }
          data: Record<string, unknown>
        }) => {
          const row = nguoiDung.get(where.idNguoiDung)
          if (row) Object.assign(row, data)
          return row
        }
      ),
    },
    nguoiMua: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNguoiMua: bigint } }) =>
          nguoiMua.get(where.idNguoiMua) ?? null
      ),
      create: create(nguoiMua, "idNguoiMua"),
    },
    nguoiBan: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNguoiBan: bigint } }) =>
          nguoiBan.get(where.idNguoiBan) ?? null
      ),
      create: create(nguoiBan, "idNguoiBan"),
    },
    nhanVienSan: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNhanVien: bigint } }) =>
          nhanVienSan.get(where.idNhanVien) ?? null
      ),
      create: create(nhanVienSan, "idNhanVien"),
      update: jest.fn(
        async ({
          where,
          data,
        }: {
          where: { idNhanVien: bigint }
          data: Record<string, unknown>
        }) => {
          const row = nhanVienSan.get(where.idNhanVien)
          if (row) Object.assign(row, data)
          return row
        }
      ),
    },
    cuaHang: {
      findUnique: jest.fn(
        async ({ where }: { where: { idCuaHang: bigint } }) =>
          cuaHang.get(where.idCuaHang) ?? null
      ),
      create: create(cuaHang, "idCuaHang"),
    },
    danhMuc: {
      findUnique: jest.fn(
        async ({ where }: { where: { idDanhMuc: bigint } }) =>
          danhMuc.get(where.idDanhMuc) ?? null
      ),
      findFirst: jest.fn(async () => null),
      create: create(danhMuc, "idDanhMuc"),
    },
    sanPham: {
      findUnique: jest.fn(
        async ({ where }: { where: { idSanPham: bigint } }) =>
          sanPham.get(where.idSanPham) ?? null
      ),
      create: create(sanPham, "idSanPham"),
    },
    bienThe: {
      findUnique: jest.fn(
        async ({ where }: { where: { idBienThe: bigint } }) =>
          bienThe.get(where.idBienThe) ?? null
      ),
      create: create(bienThe, "idBienThe"),
    },
    baoCao: {
      findUnique: jest.fn(
        async ({ where }: { where: { idBaoCao: bigint } }) =>
          baoCao.get(where.idBaoCao) ?? null
      ),
      create: create(baoCao, "idBaoCao"),
    },
    khieuNai: {
      findUnique: jest.fn(
        async ({ where }: { where: { idKhieuNai: bigint } }) =>
          khieuNai.get(where.idKhieuNai) ?? null
      ),
      create: create(khieuNai, "idKhieuNai"),
    },
    homepageConfig: {
      findUnique: jest.fn(async () => homepageConfig.get(1) ?? null),
      create: create(homepageConfig, "id"),
    },
  }

  await seedDemoData(db as never)
  await seedDemoData(db as never)

  expect(nguoiDung.size).toBe(3)
  expect(nhanVienSan.size).toBe(1)
  expect(danhMuc.size).toBe(3)
  expect(cuaHang.size).toBe(1)
  expect(sanPham.size).toBe(2)
  expect(bienThe.size).toBe(1)
  expect(baoCao.size).toBe(1)
  expect(khieuNai.size).toBe(1)
  expect(homepageConfig.size).toBe(1)
  for (const account of nguoiDung.values()) {
    expect(account).toMatchObject({ trangThai: "HoatDong" })
    expect(account.matKhauHash).toEqual(expect.stringMatching(/^scrypt:/))
  }
  expect(nhanVienSan.values().next().value).toMatchObject({
    chucVu: "QuanTriVien",
  })
})
