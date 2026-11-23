import { randomBytes } from "node:crypto"
import { pathToFileURL } from "node:url"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js"

const staffId = 900000000001n
const staffEmail = "seed-staff@example.invalid"
const staffPhone = "0000000000"
const categories = [
  { idDanhMuc: 900000000101n, tenDanhMuc: "Bàn" },
  { idDanhMuc: 900000000102n, tenDanhMuc: "Ghế" },
  { idDanhMuc: 900000000103n, tenDanhMuc: "Tủ" },
]

export function assertLocalSeedTarget(connectionString: string | undefined) {
  try {
    const url = new URL(connectionString ?? "")
    if (
      !["postgres:", "postgresql:"].includes(url.protocol) ||
      url.hostname !== "127.0.0.1" ||
      url.port !== "55432" ||
      url.pathname !== "/furniture_ecommerce" ||
      url.username !== "app_user" ||
      url.password.length === 0 ||
      (url.searchParams.has("schema") &&
        url.searchParams.get("schema") !== "public") ||
      url.searchParams.has("host") ||
      url.searchParams.has("hostaddr") ||
      url.searchParams.has("service")
    ) {
      throw new Error()
    }
  } catch {
    throw new Error("Seed chi duoc chay tren PostgreSQL local")
  }
}

type SeedDb = Pick<PrismaClient, "nguoiDung" | "nhanVienSan" | "danhMuc">

export async function seedDemoData(db: SeedDb) {
  const account = await db.nguoiDung.findUnique({
    where: { idNguoiDung: staffId },
  })
  if (
    account &&
    (account.email !== staffEmail ||
      account.soDienThoai !== staffPhone ||
      account.vaiTro !== "NhanVien" ||
      account.trangThai !== "BiKhoa")
  ) {
    throw new Error("ID nhan vien demo da duoc su dung")
  }
  if (!account) {
    const emailUsed = await db.nguoiDung.findFirst({
      where: { OR: [{ email: staffEmail }, { soDienThoai: staffPhone }] },
    })
    if (emailUsed) throw new Error("Thong tin nhan vien demo da duoc su dung")
    await db.nguoiDung.create({
      data: {
        idNguoiDung: staffId,
        email: staffEmail,
        soDienThoai: staffPhone,
        matKhauHash: randomBytes(48).toString("hex"),
        hoTen: "Nhan vien demo",
        vaiTro: "NhanVien",
        trangThai: "BiKhoa",
      },
    })
  }

  const staff = await db.nhanVienSan.findUnique({
    where: { idNhanVien: staffId },
  })
  if (staff && staff.chucVu !== "Quan ly danh muc demo") {
    throw new Error("ID nhan vien demo da duoc su dung")
  }
  if (!staff) {
    await db.nhanVienSan.create({
      data: {
        idNhanVien: staffId,
        chucVu: "Quan ly danh muc demo",
        ngayVaoLam: new Date("2026-11-23T00:00:00.000Z"),
      },
    })
  }

  for (const category of categories) {
    const existing = await db.danhMuc.findUnique({
      where: { idDanhMuc: category.idDanhMuc },
    })
    if (
      existing &&
      (existing.tenDanhMuc !== category.tenDanhMuc ||
        existing.idNhanVien !== staffId ||
        existing.idDanhMucCha !== null)
    ) {
      throw new Error("ID danh muc demo da duoc su dung")
    }
    if (!existing) {
      const nameUsed = await db.danhMuc.findFirst({
        where: { tenDanhMuc: category.tenDanhMuc, idDanhMucCha: null },
      })
      if (nameUsed) throw new Error("Ten danh muc demo da duoc su dung")
      await db.danhMuc.create({ data: { ...category, idNhanVien: staffId } })
    }
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL
  assertLocalSeedTarget(connectionString)
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
  try {
    await db.$connect()
    await db.$transaction(async (transaction) => seedDemoData(transaction))
    console.log(
      "Da tao/kiem tra nhan vien demo bi khoa va 3 danh muc: Ban, Ghe, Tu"
    )
  } finally {
    await db.$disconnect()
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch(() => {
    console.error(
      "Seed that bai; kiem tra ket noi, schema va du lieu trung lap"
    )
    process.exitCode = 1
  })
}
