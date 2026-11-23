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

it("creates the locked staff account and furniture categories only once", async () => {
  const nguoiDung = new Map<bigint, Record<string, unknown>>()
  const nhanVienSan = new Map<bigint, Record<string, unknown>>()
  const danhMuc = new Map<bigint, Record<string, unknown>>()
  const create = (table: Map<bigint, Record<string, unknown>>) =>
    jest.fn(async ({ data }: { data: Record<string, unknown> }) => {
      const record = { idDanhMucCha: null, ...data }
      table.set(
        (data.idDanhMuc ?? data.idNhanVien ?? data.idNguoiDung) as bigint,
        record
      )
      return record
    })
  const db = {
    nguoiDung: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNguoiDung: bigint } }) =>
          nguoiDung.get(where.idNguoiDung) ?? null
      ),
      findFirst: jest.fn(async () => null),
      create: create(nguoiDung),
    },
    nhanVienSan: {
      findUnique: jest.fn(
        async ({ where }: { where: { idNhanVien: bigint } }) =>
          nhanVienSan.get(where.idNhanVien) ?? null
      ),
      create: create(nhanVienSan),
    },
    danhMuc: {
      findUnique: jest.fn(
        async ({ where }: { where: { idDanhMuc: bigint } }) =>
          danhMuc.get(where.idDanhMuc) ?? null
      ),
      findFirst: jest.fn(async () => null),
      create: create(danhMuc),
    },
  }

  await seedDemoData(db)
  await seedDemoData(db)

  expect(nguoiDung.size).toBe(1)
  expect(nhanVienSan.size).toBe(1)
  expect(danhMuc.size).toBe(3)
  const account = [...nguoiDung.values()][0]
  expect(account).toMatchObject({ vaiTro: "NhanVien", trangThai: "BiKhoa" })
  expect(account.matKhauHash).not.toEqual(expect.stringContaining("password"))
  expect([...danhMuc.values()].map((row) => row.tenDanhMuc)).toEqual([
    "Bàn",
    "Ghế",
    "Tủ",
  ])
  expect(db.nguoiDung.create).toHaveBeenCalledTimes(1)
  expect(db.danhMuc.create).toHaveBeenCalledTimes(3)
})
