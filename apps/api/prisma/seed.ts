import { pathToFileURL } from "node:url"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js"
import { PasswordService } from "../src/modules/auth/password.service.js"

export const DEMO_PASSWORD = "Demo@12345"

const staffId = 900000000001n
const staffEmail = "seed-admin@example.test"
const staffPhone = "0000000001"
const buyerId = 900000000002n
const buyerEmail = "seed-buyer@example.test"
const buyerPhone = "0000000002"
const sellerId = 900000000003n
const sellerEmail = "seed-seller@example.test"
const sellerPhone = "0000000003"
const storeId = 900000000201n

const categories = [
  { idDanhMuc: 900000000101n, tenDanhMuc: "Bàn" },
  { idDanhMuc: 900000000102n, tenDanhMuc: "Ghế" },
  { idDanhMuc: 900000000103n, tenDanhMuc: "Tủ" },
]

const products = [
  {
    idSanPham: 900000000301n,
    maSanPham: "DEMO-BAN-01",
    idDanhMuc: 900000000101n,
    tenSanPham: "Bàn ăn gỗ Oak",
    moTa: "Bàn ăn gỗ sồi demo cho màn hình kiểm duyệt sản phẩm.",
    phanLoai: "Bàn ăn",
    anh: "/images/demo/dining-table.jpg",
    trangThai: "An",
    moderationStatus: "ChoDuyet",
  },
  {
    idSanPham: 900000000302n,
    maSanPham: "DEMO-GHE-01",
    idDanhMuc: 900000000102n,
    tenSanPham: "Ghế thư giãn Linen",
    moTa: "Ghế thư giãn demo đã được duyệt.",
    phanLoai: "Ghế thư giãn",
    anh: "/images/demo/lounge-chair.jpg",
    trangThai: "Hien",
    moderationStatus: "DaDuyet",
  },
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

type SeedDb = Pick<
  PrismaClient,
  | "nguoiDung"
  | "nguoiMua"
  | "nguoiBan"
  | "nhanVienSan"
  | "cuaHang"
  | "danhMuc"
  | "sanPham"
  | "bienThe"
  | "baoCao"
  | "khieuNai"
  | "homepageConfig"
>

async function ensureAccount(
  db: SeedDb,
  id: bigint,
  email: string,
  phone: string,
  name: string,
  role: "NhanVien" | "NguoiMua" | "NguoiBan",
  passwordHash: string
) {
  const existing = await db.nguoiDung.findUnique({
    where: { idNguoiDung: id },
  })
  if (existing) {
    const isLegacyStaff =
      id === staffId &&
      existing.email === "seed-staff@example.invalid" &&
      existing.soDienThoai === "0000000000" &&
      existing.vaiTro === "NhanVien"
    if (
      !isLegacyStaff &&
      (existing.email !== email ||
        existing.soDienThoai !== phone ||
        existing.vaiTro !== role)
    )
      throw new Error("ID tai khoan demo da duoc su dung")
    await db.nguoiDung.update({
      where: { idNguoiDung: id },
      data: {
        email,
        soDienThoai: phone,
        hoTen: name,
        vaiTro: role,
        matKhauHash: passwordHash,
        trangThai: "HoatDong",
      },
    })
    return
  }

  const emailUsed = await db.nguoiDung.findFirst({
    where: { OR: [{ email }, { soDienThoai: phone }] },
  })
  if (emailUsed) throw new Error("Thong tin tai khoan demo da duoc su dung")
  await db.nguoiDung.create({
    data: {
      idNguoiDung: id,
      email,
      soDienThoai: phone,
      matKhauHash: passwordHash,
      hoTen: name,
      vaiTro: role,
      trangThai: "HoatDong",
    },
  })
}

export async function seedDemoData(db: SeedDb) {
  const passwordHash = await new PasswordService().hash(DEMO_PASSWORD)

  await ensureAccount(
    db,
    staffId,
    staffEmail,
    staffPhone,
    "Quản trị viên demo",
    "NhanVien",
    passwordHash
  )
  await ensureAccount(
    db,
    buyerId,
    buyerEmail,
    buyerPhone,
    "Người mua demo",
    "NguoiMua",
    passwordHash
  )
  await ensureAccount(
    db,
    sellerId,
    sellerEmail,
    sellerPhone,
    "Người bán demo",
    "NguoiBan",
    passwordHash
  )

  const buyer = await db.nguoiMua.findUnique({
    where: { idNguoiMua: buyerId },
  })
  if (!buyer) await db.nguoiMua.create({ data: { idNguoiMua: buyerId } })

  const seller = await db.nguoiBan.findUnique({
    where: { idNguoiBan: sellerId },
  })
  if (!seller) {
    await db.nguoiBan.create({
      data: {
        idNguoiBan: sellerId,
        loaiThue: "HoKinhDoanh",
        tenDoanhNghiep: "Nội thất Ánh Dương",
        trangThaiXacMinh: "DaXacMinh",
      },
    })
  }

  const staff = await db.nhanVienSan.findUnique({
    where: { idNhanVien: staffId },
  })
  if (staff && staff.chucVu === "Quan ly danh muc demo") {
    await db.nhanVienSan.update({
      where: { idNhanVien: staffId },
      data: { chucVu: "QuanTriVien" },
    })
  } else if (staff && staff.chucVu !== "QuanTriVien") {
    throw new Error("ID nhan vien demo da duoc su dung")
  }
  if (!staff) {
    await db.nhanVienSan.create({
      data: {
        idNhanVien: staffId,
        chucVu: "QuanTriVien",
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
      await db.danhMuc.create({ data: { ...category, idNhanVien: staffId } })
    }
  }

  const store = await db.cuaHang.findUnique({ where: { idCuaHang: storeId } })
  if (!store) {
    await db.cuaHang.create({
      data: {
        idCuaHang: storeId,
        idNguoiBan: sellerId,
        maShop: "DEMO-SHOP",
        tenShop: "Nội thất Ánh Dương",
        tinh: "Thành phố Hồ Chí Minh",
        xa: "Phường Sài Gòn",
        diaChiChiTiet: "1 Nguyễn Huệ",
        soDienThoai: "0900000003",
        moTa: "Gian hàng demo nội thất.",
        ngayMoCuaHang: new Date("2026-11-23T00:00:00.000Z"),
        trangThai: "HoatDong",
      },
    })
  }

  for (const product of products) {
    const existing = await db.sanPham.findUnique({
      where: { idSanPham: product.idSanPham },
    })
    if (!existing) {
      await db.sanPham.create({
        data: { ...product, idCuaHang: storeId, moderationVersion: 0 },
      })
    }
  }

  const approvedVariant = await db.bienThe.findUnique({
    where: { idBienThe: 900000000401n },
  })
  if (!approvedVariant) {
    await db.bienThe.create({
      data: {
        idBienThe: 900000000401n,
        idSanPham: 900000000302n,
        thuocTinh: "Màu sắc",
        tenBienThe: "Be Linen",
        gia: 3_250_000,
        tonKho: 12,
      },
    })
  }

  const report = await db.baoCao.findUnique({
    where: { idBaoCao: 900000000501n },
  })
  if (!report) {
    await db.baoCao.create({
      data: {
        idBaoCao: 900000000501n,
        maBaoCao: "DEMO-REPORT-01",
        idNguoiMua: buyerId,
        idSanPham: 900000000301n,
        lyDo: "MoTaSai",
        moTa: "Báo cáo demo chờ nhân viên xử lý.",
        trangThai: "ChoXuLy",
        thoiGianGui: new Date("2026-11-26T00:00:00.000Z"),
      },
    })
  }

  const complaint = await db.khieuNai.findUnique({
    where: { idKhieuNai: 900000000601n },
  })
  if (!complaint) {
    await db.khieuNai.create({
      data: {
        idKhieuNai: 900000000601n,
        idNguoiGui: buyerId,
        noiDung: "Khiếu nại demo chờ nhân viên xử lý.",
        trangThai: "ChoXuLy",
        thoiGianGui: new Date("2026-11-26T00:00:00.000Z"),
      },
    })
  }

  const homepage = await db.homepageConfig.findUnique({ where: { id: 1 } })
  const draft = {
    items: [
      {
        itemId: "900000000701",
        kind: "category-section",
        title: "Nội thất phòng khách",
        imageUrl: null,
        targetUrl: null,
        categoryIds: ["900000000102"],
        enabled: true,
        startsAt: null,
        endsAt: null,
      },
    ],
  }
  if (!homepage) {
    await db.homepageConfig.create({ data: { id: 1, version: 0, draft } })
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
      "Da tao/kiem tra tai khoan demo: seed-admin@example.test, seed-buyer@example.test, seed-seller@example.test; tat ca dung mat khau Demo@12345"
    )
  } finally {
    await db.$disconnect()
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Loi khong xac dinh"
    console.error("Seed that bai:", message)
    process.exitCode = 1
  })
}
