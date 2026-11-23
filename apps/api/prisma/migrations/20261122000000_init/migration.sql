-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "NguoiDung" (
    "idNguoiDung" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "soDienThoai" VARCHAR(10) NOT NULL,
    "matKhauHash" VARCHAR(255) NOT NULL,
    "hoTen" VARCHAR(100) NOT NULL,
    "ngaySinh" DATE,
    "gioiTinh" VARCHAR(30),
    "vaiTro" VARCHAR(30) NOT NULL,
    "trangThai" VARCHAR(30) NOT NULL,
    "lanDangNhapCuoi" TIMESTAMP(0),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_nguoidung" PRIMARY KEY ("idNguoiDung")
);

-- CreateTable
CREATE TABLE "NguoiMua" (
    "idNguoiMua" BIGINT NOT NULL,
    "hangThanhVien" VARCHAR(30) NOT NULL DEFAULT 'Dong',
    "diemTichLuy" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_nguoimua" PRIMARY KEY ("idNguoiMua")
);

-- CreateTable
CREATE TABLE "NguoiBan" (
    "idNguoiBan" BIGINT NOT NULL,
    "soCCCD" VARCHAR(12),
    "matTruocCCCD" VARCHAR(255),
    "matSauCCCD" VARCHAR(255),
    "loaiThue" VARCHAR(30),
    "tenDoanhNghiep" VARCHAR(255),
    "maSoThue" VARCHAR(14),
    "trangThaiXacMinh" VARCHAR(30) NOT NULL DEFAULT 'ChuaNop',
    "lyDoTuChoi" VARCHAR(500),
    "thoiGianNop" TIMESTAMP(0),
    "thoiGianDuyet" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_nguoiban" PRIMARY KEY ("idNguoiBan")
);

-- CreateTable
CREATE TABLE "NhanVienSan" (
    "idNhanVien" BIGINT NOT NULL,
    "chucVu" VARCHAR(50) NOT NULL,
    "ngayVaoLam" DATE NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_nhanviensan" PRIMARY KEY ("idNhanVien")
);

-- CreateTable
CREATE TABLE "ViDienTu" (
    "idNguoiDung" BIGINT NOT NULL,
    "soDu" DECIMAL(15,0) NOT NULL DEFAULT 0,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'HoatDong',
    "maPinHash" VARCHAR(255),
    "soLanNhapSaiPin" INTEGER NOT NULL DEFAULT 0,
    "khoaTamDen" TIMESTAMP(0),
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_vidientu" PRIMARY KEY ("idNguoiDung")
);

-- CreateTable
CREATE TABLE "GiaoDichVi" (
    "idGiaoDich" BIGINT NOT NULL,
    "maGiaoDich" VARCHAR(20),
    "idNguoiDung" BIGINT NOT NULL,
    "idDonHang" BIGINT,
    "idCuaHang" BIGINT,
    "loai" VARCHAR(30) NOT NULL,
    "soTien" DECIMAL(15,0) NOT NULL,
    "trangThai" VARCHAR(30) NOT NULL,
    "thoiGian" TIMESTAMP(0) NOT NULL,
    "ghiChu" VARCHAR(255),
    "nganHangNhan" VARCHAR(100),
    "soTaiKhoanNhan" VARCHAR(30),
    "tenChuTaiKhoanNhan" VARCHAR(100),
    "thoiGianHoanTat" TIMESTAMP(0),
    "noiDungChuyenKhoan" VARCHAR(100),
    "maThamChieuNganHang" VARCHAR(50),

    CONSTRAINT "pk_giaodichvi" PRIMARY KEY ("idGiaoDich")
);

-- CreateTable
CREATE TABLE "CuaHang" (
    "idCuaHang" BIGINT NOT NULL,
    "idNguoiBan" BIGINT NOT NULL,
    "maShop" VARCHAR(20),
    "tenShop" VARCHAR(100) NOT NULL,
    "anh" VARCHAR(255),
    "tinh" VARCHAR(100) NOT NULL,
    "xa" VARCHAR(100) NOT NULL,
    "diaChiChiTiet" VARCHAR(255) NOT NULL,
    "soDienThoai" VARCHAR(15) NOT NULL,
    "moTa" TEXT,
    "ngayMoCuaHang" DATE NOT NULL,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'HoatDong',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_cuahang" PRIMARY KEY ("idCuaHang")
);

-- CreateTable
CREATE TABLE "SanPham" (
    "idSanPham" BIGINT NOT NULL,
    "maSanPham" VARCHAR(20),
    "idCuaHang" BIGINT NOT NULL,
    "idDanhMuc" BIGINT NOT NULL,
    "tenSanPham" VARCHAR(200) NOT NULL,
    "moTa" TEXT,
    "phanLoai" VARCHAR(100),
    "anh" TEXT,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'Hien',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_sanpham" PRIMARY KEY ("idSanPham")
);

-- CreateTable
CREATE TABLE "BienThe" (
    "idBienThe" BIGINT NOT NULL,
    "idSanPham" BIGINT NOT NULL,
    "thuocTinh" VARCHAR(255) NOT NULL,
    "tenBienThe" VARCHAR(200) NOT NULL,
    "anh" VARCHAR(255),
    "gia" DECIMAL(15,0) NOT NULL,
    "tonKho" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_bienthe" PRIMARY KEY ("idBienThe")
);

-- CreateTable
CREATE TABLE "DanhMuc" (
    "idDanhMuc" BIGINT NOT NULL,
    "idDanhMucCha" BIGINT,
    "idNhanVien" BIGINT NOT NULL,
    "tenDanhMuc" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_danhmuc" PRIMARY KEY ("idDanhMuc")
);

-- CreateTable
CREATE TABLE "DanhMucShop" (
    "idDanhMucShop" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "idDanhMucShopCha" BIGINT,
    "tenDanhMuc" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_danhmucshop" PRIMARY KEY ("idDanhMucShop")
);

-- CreateTable
CREATE TABLE "ChiTietDanhMuc" (
    "idSanPham" BIGINT NOT NULL,
    "idDanhMucShop" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_chitietdanhmuc" PRIMARY KEY ("idSanPham","idDanhMucShop")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "idVoucher" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "code" VARCHAR(30),
    "tenVoucher" VARCHAR(100) NOT NULL,
    "loaiGiam" VARCHAR(30) NOT NULL,
    "giaTri" DECIMAL(15,2) NOT NULL,
    "giamToiDa" DECIMAL(15,0),
    "donToiThieu" DECIMAL(15,0) NOT NULL DEFAULT 0,
    "soLuong" INTEGER NOT NULL,
    "batDau" TIMESTAMP(0) NOT NULL,
    "ketThuc" TIMESTAMP(0) NOT NULL,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'DangChay',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_voucher" PRIMARY KEY ("idVoucher")
);

-- CreateTable
CREATE TABLE "ChiTietGioHang" (
    "idNguoiMua" BIGINT NOT NULL,
    "idBienThe" BIGINT NOT NULL,
    "soLuong" INTEGER NOT NULL,
    "ngayThem" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_chitietgiohang" PRIMARY KEY ("idNguoiMua","idBienThe")
);

-- CreateTable
CREATE TABLE "DiaChi" (
    "idDiaChi" BIGINT NOT NULL,
    "idNguoiMua" BIGINT NOT NULL,
    "nguoiNhan" VARCHAR(100) NOT NULL,
    "soDienThoai" VARCHAR(15) NOT NULL,
    "tinh" VARCHAR(100) NOT NULL,
    "xa" VARCHAR(100) NOT NULL,
    "diaChiChiTiet" VARCHAR(255) NOT NULL,
    "loaiDiaChi" VARCHAR(30) NOT NULL,
    "macDinh" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_diachi" PRIMARY KEY ("idDiaChi")
);

-- CreateTable
CREATE TABLE "DonHang" (
    "idDonHang" BIGINT NOT NULL,
    "maDonHang" VARCHAR(20),
    "idNguoiMua" BIGINT NOT NULL,
    "thoiGianDat" TIMESTAMP(0) NOT NULL,
    "tenNguoiNhan" VARCHAR(100) NOT NULL,
    "soDienThoaiNhan" VARCHAR(10) NOT NULL,
    "tinh" VARCHAR(100) NOT NULL,
    "xa" VARCHAR(100) NOT NULL,
    "diaChiChiTiet" VARCHAR(255) NOT NULL,
    "phuongThuc" VARCHAR(30) NOT NULL,
    "soTien" DECIMAL(15,0) NOT NULL,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'Cho',
    "hanThanhToan" TIMESTAMP(0),
    "maDoiSoat" VARCHAR(30),
    "noiDungChuyenKhoan" VARCHAR(100),
    "thoiGianThanhCong" TIMESTAMP(0),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_donhang" PRIMARY KEY ("idDonHang")
);

-- CreateTable
CREATE TABLE "DonHangRieng" (
    "idDonHang" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "maDonHangRieng" VARCHAR(20),
    "idVoucher" BIGINT,
    "trangThaiDon" VARCHAR(30) NOT NULL DEFAULT 'ChoXacNhan',
    "phiVanChuyen" DECIMAL(15,0) NOT NULL DEFAULT 0,
    "tyLeHoaHong" DECIMAL(5,2) NOT NULL,
    "ngayGiaoDuKien" DATE,
    "thoiGianGiao" TIMESTAMP(0),
    "hanNhanHang" TIMESTAMP(0),
    "thoiGianNhan" TIMESTAMP(0),
    "nguoiXacNhanNhan" VARCHAR(30),
    "thoiGianHuy" TIMESTAMP(0),
    "lyDoHuy" VARCHAR,
    "trangThaiHoanTien" VARCHAR(30) NOT NULL DEFAULT 'Khong',
    "soTienHoan" DECIMAL(15,0),
    "hanNhanHoan" TIMESTAMP(0),
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_donhangrieng" PRIMARY KEY ("idDonHang","idCuaHang")
);

-- CreateTable
CREATE TABLE "ChiTietDonHang" (
    "idDonHang" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "idBienThe" BIGINT NOT NULL,
    "tenSanPham" VARCHAR(200) NOT NULL,
    "tenBienThe" VARCHAR(200) NOT NULL,
    "soLuong" INTEGER NOT NULL,
    "donGia" DECIMAL(15,0) NOT NULL,
    "giamGiaPhanBo" DECIMAL(15,0) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_chitietdonhang" PRIMARY KEY ("idDonHang","idCuaHang","idBienThe")
);

-- CreateTable
CREATE TABLE "DanhGia" (
    "idDonHang" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "idBienThe" BIGINT NOT NULL,
    "soSao" INTEGER NOT NULL,
    "noiDung" TEXT,
    "anh" TEXT,
    "thoiGianDanhGia" TIMESTAMP(0) NOT NULL,
    "phanHoiShop" TEXT,
    "thoiGianPhanHoi" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_danhgia" PRIMARY KEY ("idDonHang","idCuaHang","idBienThe")
);

-- CreateTable
CREATE TABLE "HoanHang" (
    "idDonHang" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "maHoanHang" VARCHAR(20),
    "lyDoHoan" VARCHAR(200) NOT NULL,
    "moTa" TEXT,
    "bangChung" TEXT,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'ChoNguoiBan',
    "thoiGianGui" TIMESTAMP(0) NOT NULL,
    "hanPhanHoi" TIMESTAMP(0) NOT NULL,
    "thoiGianPhanHoi" TIMESTAMP(0),
    "ketQua" VARCHAR(30),
    "lyDoTuChoi" VARCHAR(500),
    "cachXuLy" VARCHAR(30),
    "thoiGianHoanTat" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_hoanhang" PRIMARY KEY ("idDonHang","idCuaHang")
);

-- CreateTable
CREATE TABLE "TranhChap" (
    "idDonHang" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "maTranhChap" VARCHAR(20),
    "idNhanVien" BIGINT,
    "trangThaiTranhChap" VARCHAR(30) NOT NULL DEFAULT 'ChoXuLy',
    "ketQua" VARCHAR(30),
    "lyDoPhanQuyet" VARCHAR(1000),
    "thoiGianMo" TIMESTAMP(0) NOT NULL,
    "thoiDiemPhanXu" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_tranhchap" PRIMARY KEY ("idDonHang","idCuaHang")
);

-- CreateTable
CREATE TABLE "BaoCao" (
    "idBaoCao" BIGINT NOT NULL,
    "maBaoCao" VARCHAR(20),
    "idNguoiMua" BIGINT NOT NULL,
    "idSanPham" BIGINT NOT NULL,
    "idNhanVien" BIGINT,
    "lyDo" VARCHAR(30) NOT NULL,
    "moTa" TEXT,
    "bangChung" TEXT,
    "trangThai" VARCHAR(30) NOT NULL DEFAULT 'ChoXuLy',
    "thoiGianGui" TIMESTAMP(0) NOT NULL,
    "ketQua" VARCHAR(30),
    "thoiGianDong" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_baocao" PRIMARY KEY ("idBaoCao")
);

-- CreateTable
CREATE TABLE "LichSuXuLy" (
    "idLichSuXuLy" BIGINT NOT NULL,
    "idDonHang" BIGINT,
    "idCuaHang" BIGINT,
    "idBaoCao" BIGINT,
    "idNhanVien" BIGINT NOT NULL,
    "hanhDong" VARCHAR(100) NOT NULL,
    "ghiChu" VARCHAR(1000),
    "thoiGian" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "pk_lichsuxuly" PRIMARY KEY ("idLichSuXuLy")
);

-- CreateTable
CREATE TABLE "CuocTroChuyen" (
    "idNguoiMua" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "thoiGianTinCuoi" TIMESTAMP(0),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_cuoctrochuyen" PRIMARY KEY ("idNguoiMua","idCuaHang")
);

-- CreateTable
CREATE TABLE "TinNhan" (
    "idTinNhan" BIGINT NOT NULL,
    "idNguoiMua" BIGINT NOT NULL,
    "idCuaHang" BIGINT NOT NULL,
    "noiDung" TEXT NOT NULL,
    "thoiGian" TIMESTAMP(0) NOT NULL,
    "benGui" VARCHAR(30) NOT NULL,
    "daDoc" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_tinnhan" PRIMARY KEY ("idTinNhan")
);

-- CreateTable
CREATE TABLE "ThongBao" (
    "idThongBao" BIGINT NOT NULL,
    "idNguoiDung" BIGINT NOT NULL,
    "loai" VARCHAR(30) NOT NULL,
    "tieuDe" VARCHAR(200) NOT NULL,
    "noiDung" TEXT NOT NULL,
    "daDoc" BOOLEAN NOT NULL DEFAULT false,
    "thoiGianGui" TIMESTAMP(0) NOT NULL,
    "doiTuongLienQuan" VARCHAR(50),

    CONSTRAINT "pk_thongbao" PRIMARY KEY ("idThongBao")
);

-- CreateTable
CREATE TABLE "Banner" (
    "idBanner" BIGINT NOT NULL,
    "idNhanVien" BIGINT NOT NULL,
    "tieuDe" VARCHAR(200) NOT NULL,
    "anh" VARCHAR(255) NOT NULL,
    "thuTu" INTEGER NOT NULL,
    "batDau" TIMESTAMP(0) NOT NULL,
    "ketThuc" TIMESTAMP(0) NOT NULL,
    "dangHien" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_banner" PRIMARY KEY ("idBanner")
);

-- CreateIndex
CREATE INDEX "ix_nguoidung_vaitro_trangthai" ON "NguoiDung"("vaiTro", "trangThai");

-- CreateIndex
CREATE UNIQUE INDEX "uq_nguoidung_email" ON "NguoiDung"("email", "vaiTro");

-- CreateIndex
CREATE UNIQUE INDEX "uq_nguoidung_sodienthoai" ON "NguoiDung"("soDienThoai", "vaiTro");

-- CreateIndex
CREATE INDEX "ix_nguoimua_hang" ON "NguoiMua"("hangThanhVien");

-- CreateIndex
CREATE UNIQUE INDEX "uq_nguoiban_socccd" ON "NguoiBan"("soCCCD");

-- CreateIndex
CREATE UNIQUE INDEX "uq_nguoiban_masothue" ON "NguoiBan"("maSoThue");

-- CreateIndex
CREATE INDEX "ix_nguoiban_xacminh" ON "NguoiBan"("trangThaiXacMinh", "thoiGianNop");

-- CreateIndex
CREATE UNIQUE INDEX "uq_giaodichvi_magiaodich" ON "GiaoDichVi"("maGiaoDich");

-- CreateIndex
CREATE INDEX "ix_gdvi_vi_thoigian" ON "GiaoDichVi"("idNguoiDung", "thoiGian");

-- CreateIndex
CREATE INDEX "ix_gdvi_trangthai" ON "GiaoDichVi"("trangThai", "loai");

-- CreateIndex
CREATE UNIQUE INDEX "uq_giaodichvi_iddonhang" ON "GiaoDichVi"("idDonHang", "idCuaHang", "loai");

-- CreateIndex
CREATE UNIQUE INDEX "uq_cuahang_mashop" ON "CuaHang"("maShop");

-- CreateIndex
CREATE INDEX "ix_cuahang_nguoiban" ON "CuaHang"("idNguoiBan");

-- CreateIndex
CREATE INDEX "ix_cuahang_trangthai" ON "CuaHang"("trangThai");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sanpham_masanpham" ON "SanPham"("maSanPham");

-- CreateIndex
CREATE INDEX "ix_sanpham_cuahang_tt" ON "SanPham"("idCuaHang", "trangThai");

-- CreateIndex
CREATE INDEX "ix_sanpham_danhmuc_tt" ON "SanPham"("idDanhMuc", "trangThai");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sanpham_idsanpham" ON "SanPham"("idSanPham", "idCuaHang");

-- CreateIndex
CREATE INDEX "ix_bienthe_sanpham" ON "BienThe"("idSanPham");

-- CreateIndex
CREATE UNIQUE INDEX "uq_bienthe_idsanpham" ON "BienThe"("idSanPham", "thuocTinh");

-- CreateIndex
CREATE INDEX "ix_danhmuc_cha" ON "DanhMuc"("idDanhMucCha");

-- CreateIndex
CREATE UNIQUE INDEX "uq_danhmuc_iddanhmuccha" ON "DanhMuc"("idDanhMucCha", "tenDanhMuc");

-- CreateIndex
CREATE INDEX "ix_dms_shop" ON "DanhMucShop"("idCuaHang");

-- CreateIndex
CREATE UNIQUE INDEX "uq_danhmucshop_iddanhmucshop" ON "DanhMucShop"("idDanhMucShop", "idCuaHang");

-- CreateIndex
CREATE UNIQUE INDEX "uq_danhmucshop_idcuahang" ON "DanhMucShop"("idCuaHang", "idDanhMucShopCha", "tenDanhMuc");

-- CreateIndex
CREATE INDEX "ix_ctdm_danhmuc" ON "ChiTietDanhMuc"("idDanhMucShop", "idSanPham");

-- CreateIndex
CREATE UNIQUE INDEX "uq_voucher_code" ON "Voucher"("code");

-- CreateIndex
CREATE INDEX "ix_voucher_shop_tt_time" ON "Voucher"("idCuaHang", "trangThai", "ketThuc");

-- CreateIndex
CREATE UNIQUE INDEX "uq_voucher_idvoucher" ON "Voucher"("idVoucher", "idCuaHang");

-- CreateIndex
CREATE UNIQUE INDEX "uq_voucher_idcuahang" ON "Voucher"("idCuaHang", "code");

-- CreateIndex
CREATE INDEX "ix_ctgh_bienthe" ON "ChiTietGioHang"("idBienThe");

-- CreateIndex
CREATE INDEX "ix_diachi_nguoimua" ON "DiaChi"("idNguoiMua");

-- CreateIndex
CREATE UNIQUE INDEX "uq_donhang_madonhang" ON "DonHang"("maDonHang");

-- CreateIndex
CREATE UNIQUE INDEX "uq_donhang_madoisoat" ON "DonHang"("maDoiSoat");

-- CreateIndex
CREATE INDEX "ix_donhang_nguoimua_time" ON "DonHang"("idNguoiMua", "thoiGianDat");

-- CreateIndex
CREATE INDEX "ix_donhang_tt_han" ON "DonHang"("trangThai", "hanThanhToan");

-- CreateIndex
CREATE UNIQUE INDEX "uq_donhangrieng_madonhangrieng" ON "DonHangRieng"("maDonHangRieng");

-- CreateIndex
CREATE INDEX "ix_dhr_shop_tt" ON "DonHangRieng"("idCuaHang", "trangThaiDon", "createdAt");

-- CreateIndex
CREATE INDEX "ix_dhr_voucher" ON "DonHangRieng"("idVoucher", "idCuaHang");

-- CreateIndex
CREATE INDEX "ix_dhr_hannhan" ON "DonHangRieng"("trangThaiDon", "hanNhanHang");

-- CreateIndex
CREATE INDEX "ix_dhr_hoantien" ON "DonHangRieng"("trangThaiHoanTien", "hanNhanHoan");

-- CreateIndex
CREATE INDEX "ix_ctdh_bienthe" ON "ChiTietDonHang"("idBienThe");

-- CreateIndex
CREATE INDEX "ix_danhgia_bienthe_sao" ON "DanhGia"("idBienThe", "soSao");

-- CreateIndex
CREATE UNIQUE INDEX "uq_hoanhang_mahoanhang" ON "HoanHang"("maHoanHang");

-- CreateIndex
CREATE INDEX "ix_hoanhang_tt_han" ON "HoanHang"("trangThai", "hanPhanHoi");

-- CreateIndex
CREATE UNIQUE INDEX "uq_tranhchap_matranhchap" ON "TranhChap"("maTranhChap");

-- CreateIndex
CREATE INDEX "ix_tranhchap_nv_tt" ON "TranhChap"("idNhanVien", "trangThaiTranhChap");

-- CreateIndex
CREATE INDEX "ix_tranhchap_tt_mo" ON "TranhChap"("trangThaiTranhChap", "thoiGianMo");

-- CreateIndex
CREATE UNIQUE INDEX "uq_baocao_mabaocao" ON "BaoCao"("maBaoCao");

-- CreateIndex
CREATE INDEX "ix_baocao_sanpham" ON "BaoCao"("idSanPham");

-- CreateIndex
CREATE INDEX "ix_baocao_nguoimua" ON "BaoCao"("idNguoiMua");

-- CreateIndex
CREATE INDEX "ix_baocao_nv_tt" ON "BaoCao"("idNhanVien", "trangThai");

-- CreateIndex
CREATE INDEX "ix_lsxl_tranhchap" ON "LichSuXuLy"("idDonHang", "idCuaHang", "thoiGian");

-- CreateIndex
CREATE INDEX "ix_lsxl_baocao" ON "LichSuXuLy"("idBaoCao", "thoiGian");

-- CreateIndex
CREATE INDEX "ix_lsxl_nhanvien" ON "LichSuXuLy"("idNhanVien");

-- CreateIndex
CREATE INDEX "ix_cuoctc_shop_time" ON "CuocTroChuyen"("idCuaHang", "thoiGianTinCuoi");

-- CreateIndex
CREATE INDEX "ix_cuoctc_mua_time" ON "CuocTroChuyen"("idNguoiMua", "thoiGianTinCuoi");

-- CreateIndex
CREATE INDEX "ix_tinnhan_cuoc_time" ON "TinNhan"("idNguoiMua", "idCuaHang", "thoiGian");

-- CreateIndex
CREATE INDEX "ix_tinnhan_chuadoc" ON "TinNhan"("idNguoiMua", "idCuaHang", "daDoc");

-- CreateIndex
CREATE INDEX "ix_thongbao_user_chuadoc" ON "ThongBao"("idNguoiDung", "daDoc", "thoiGianGui");

-- CreateIndex
CREATE INDEX "ix_banner_hien" ON "Banner"("dangHien", "thuTu", "batDau", "ketThuc");

-- AddForeignKey
ALTER TABLE "NguoiMua" ADD CONSTRAINT "NguoiMua_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NguoiBan" ADD CONSTRAINT "NguoiBan_idNguoiBan_fkey" FOREIGN KEY ("idNguoiBan") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhanVienSan" ADD CONSTRAINT "NhanVienSan_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViDienTu" ADD CONSTRAINT "ViDienTu_idNguoiDung_fkey" FOREIGN KEY ("idNguoiDung") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "GiaoDichVi_idNguoiDung_fkey" FOREIGN KEY ("idNguoiDung") REFERENCES "ViDienTu"("idNguoiDung") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "GiaoDichVi_idDonHang_fkey" FOREIGN KEY ("idDonHang") REFERENCES "DonHang"("idDonHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "GiaoDichVi_idDonHang_idCuaHang_fkey" FOREIGN KEY ("idDonHang", "idCuaHang") REFERENCES "DonHangRieng"("idDonHang", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CuaHang" ADD CONSTRAINT "CuaHang_idNguoiBan_fkey" FOREIGN KEY ("idNguoiBan") REFERENCES "NguoiBan"("idNguoiBan") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SanPham" ADD CONSTRAINT "SanPham_idCuaHang_fkey" FOREIGN KEY ("idCuaHang") REFERENCES "CuaHang"("idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SanPham" ADD CONSTRAINT "SanPham_idDanhMuc_fkey" FOREIGN KEY ("idDanhMuc") REFERENCES "DanhMuc"("idDanhMuc") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BienThe" ADD CONSTRAINT "BienThe_idSanPham_fkey" FOREIGN KEY ("idSanPham") REFERENCES "SanPham"("idSanPham") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DanhMuc" ADD CONSTRAINT "DanhMuc_idDanhMucCha_fkey" FOREIGN KEY ("idDanhMucCha") REFERENCES "DanhMuc"("idDanhMuc") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DanhMuc" ADD CONSTRAINT "DanhMuc_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DanhMucShop" ADD CONSTRAINT "DanhMucShop_idCuaHang_fkey" FOREIGN KEY ("idCuaHang") REFERENCES "CuaHang"("idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DanhMucShop" ADD CONSTRAINT "DanhMucShop_idCuaHang_idDanhMucShopCha_fkey" FOREIGN KEY ("idCuaHang", "idDanhMucShopCha") REFERENCES "DanhMucShop"("idCuaHang", "idDanhMucShop") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietDanhMuc" ADD CONSTRAINT "ChiTietDanhMuc_idSanPham_idCuaHang_fkey" FOREIGN KEY ("idSanPham", "idCuaHang") REFERENCES "SanPham"("idSanPham", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietDanhMuc" ADD CONSTRAINT "ChiTietDanhMuc_idDanhMucShop_idCuaHang_fkey" FOREIGN KEY ("idDanhMucShop", "idCuaHang") REFERENCES "DanhMucShop"("idDanhMucShop", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_idCuaHang_fkey" FOREIGN KEY ("idCuaHang") REFERENCES "CuaHang"("idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietGioHang" ADD CONSTRAINT "ChiTietGioHang_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiMua"("idNguoiMua") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietGioHang" ADD CONSTRAINT "ChiTietGioHang_idBienThe_fkey" FOREIGN KEY ("idBienThe") REFERENCES "BienThe"("idBienThe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DiaChi" ADD CONSTRAINT "DiaChi_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiMua"("idNguoiMua") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonHang" ADD CONSTRAINT "DonHang_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiMua"("idNguoiMua") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "DonHangRieng_idDonHang_fkey" FOREIGN KEY ("idDonHang") REFERENCES "DonHang"("idDonHang") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "DonHangRieng_idCuaHang_fkey" FOREIGN KEY ("idCuaHang") REFERENCES "CuaHang"("idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "DonHangRieng_idCuaHang_idVoucher_fkey" FOREIGN KEY ("idCuaHang", "idVoucher") REFERENCES "Voucher"("idCuaHang", "idVoucher") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_idDonHang_idCuaHang_fkey" FOREIGN KEY ("idDonHang", "idCuaHang") REFERENCES "DonHangRieng"("idDonHang", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_idBienThe_fkey" FOREIGN KEY ("idBienThe") REFERENCES "BienThe"("idBienThe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DanhGia" ADD CONSTRAINT "DanhGia_idDonHang_idCuaHang_idBienThe_fkey" FOREIGN KEY ("idDonHang", "idCuaHang", "idBienThe") REFERENCES "ChiTietDonHang"("idDonHang", "idCuaHang", "idBienThe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HoanHang" ADD CONSTRAINT "HoanHang_idDonHang_idCuaHang_fkey" FOREIGN KEY ("idDonHang", "idCuaHang") REFERENCES "DonHangRieng"("idDonHang", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TranhChap" ADD CONSTRAINT "TranhChap_idDonHang_idCuaHang_fkey" FOREIGN KEY ("idDonHang", "idCuaHang") REFERENCES "HoanHang"("idDonHang", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TranhChap" ADD CONSTRAINT "TranhChap_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiMua"("idNguoiMua") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_idSanPham_fkey" FOREIGN KEY ("idSanPham") REFERENCES "SanPham"("idSanPham") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "LichSuXuLy_idDonHang_idCuaHang_fkey" FOREIGN KEY ("idDonHang", "idCuaHang") REFERENCES "TranhChap"("idDonHang", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "LichSuXuLy_idBaoCao_fkey" FOREIGN KEY ("idBaoCao") REFERENCES "BaoCao"("idBaoCao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "LichSuXuLy_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CuocTroChuyen" ADD CONSTRAINT "CuocTroChuyen_idNguoiMua_fkey" FOREIGN KEY ("idNguoiMua") REFERENCES "NguoiMua"("idNguoiMua") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CuocTroChuyen" ADD CONSTRAINT "CuocTroChuyen_idCuaHang_fkey" FOREIGN KEY ("idCuaHang") REFERENCES "CuaHang"("idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TinNhan" ADD CONSTRAINT "TinNhan_idNguoiMua_idCuaHang_fkey" FOREIGN KEY ("idNguoiMua", "idCuaHang") REFERENCES "CuocTroChuyen"("idNguoiMua", "idCuaHang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ThongBao" ADD CONSTRAINT "ThongBao_idNguoiDung_fkey" FOREIGN KEY ("idNguoiDung") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Ràng buộc CHECK theo DB_Schema.md; Prisma schema chưa biểu diễn trực tiếp.
ALTER TABLE "NguoiDung" ADD CONSTRAINT "ck_nguoidung_gioitinh" CHECK ("gioiTinh" IS NULL OR "gioiTinh" IN ('Nam','Nu','Khac'));
ALTER TABLE "NguoiDung" ADD CONSTRAINT "ck_nguoidung_vaitro" CHECK ("vaiTro" IN ('NguoiMua','NguoiBan','NhanVien'));
ALTER TABLE "NguoiDung" ADD CONSTRAINT "ck_nguoidung_trangthai" CHECK ("trangThai" IN ('HoatDong','BiKhoa'));
ALTER TABLE "NguoiMua" ADD CONSTRAINT "ck_nguoimua_hang" CHECK ("hangThanhVien" IN ('Dong','Bac','Vang','KimCuong'));
ALTER TABLE "NguoiMua" ADD CONSTRAINT "ck_nguoimua_diem" CHECK ("diemTichLuy" >= 0);
ALTER TABLE "NguoiBan" ADD CONSTRAINT "ck_nguoiban_loaithue" CHECK ("loaiThue" IS NULL OR "loaiThue" IN ('CaNhan','HoKinhDoanh','DoanhNghiep'));
ALTER TABLE "NguoiBan" ADD CONSTRAINT "ck_nguoiban_xacminh" CHECK ("trangThaiXacMinh" IN ('ChuaNop','ChoDuyet','DaXacMinh','TuChoi'));
ALTER TABLE "NguoiBan" ADD CONSTRAINT "ck_nguoiban_tendn" CHECK ("loaiThue" IS NULL OR "loaiThue" <> 'DoanhNghiep' OR "tenDoanhNghiep" IS NOT NULL);
ALTER TABLE "NguoiBan" ADD CONSTRAINT "ck_nguoiban_lydotuchoi" CHECK ("trangThaiXacMinh" <> 'TuChoi' OR "lyDoTuChoi" IS NOT NULL);
ALTER TABLE "ViDienTu" ADD CONSTRAINT "ck_vidientu_sodu" CHECK ("soDu" >= 0);
ALTER TABLE "ViDienTu" ADD CONSTRAINT "ck_vidientu_trangthai" CHECK ("trangThai" IN ('HoatDong','BiKhoa'));
ALTER TABLE "ViDienTu" ADD CONSTRAINT "ck_vidientu_saipin" CHECK ("soLanNhapSaiPin" BETWEEN 0 AND 5);
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "ck_gdvi_loai" CHECK ("loai" IN ('Nap','Rut','ThanhToan','NhanTien','PhiSan','HoanTien'));
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "ck_gdvi_sotien" CHECK ("soTien" > 0);
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "ck_gdvi_trangthai" CHECK ("trangThai" IN ('DangXuLy','ThanhCong','ThatBai'));
ALTER TABLE "GiaoDichVi" ADD CONSTRAINT "ck_gdvi_loai_khoa" CHECK (("loai" = 'ThanhToan' AND "idDonHang" IS NOT NULL AND "idCuaHang" IS NULL) OR ("loai" IN ('NhanTien','PhiSan','HoanTien') AND "idDonHang" IS NOT NULL AND "idCuaHang" IS NOT NULL) OR ("loai" IN ('Nap','Rut') AND "idDonHang" IS NULL AND "idCuaHang" IS NULL));
ALTER TABLE "CuaHang" ADD CONSTRAINT "ck_cuahang_trangthai" CHECK ("trangThai" IN ('HoatDong','TamDong','BiKhoa'));
ALTER TABLE "SanPham" ADD CONSTRAINT "ck_sanpham_trangthai" CHECK ("trangThai" IN ('Hien','An','Khoa'));
ALTER TABLE "BienThe" ADD CONSTRAINT "ck_bienthe_gia" CHECK ("gia" >= 0);
ALTER TABLE "BienThe" ADD CONSTRAINT "ck_bienthe_tonkho" CHECK ("tonKho" >= 0);
ALTER TABLE "Voucher" ADD CONSTRAINT "ck_voucher_loaigiam" CHECK ("loaiGiam" IN ('PhanTram','SoTien'));
ALTER TABLE "Voucher" ADD CONSTRAINT "ck_voucher_giatri" CHECK ("giaTri" > 0 AND ("loaiGiam" <> 'PhanTram' OR "giaTri" <= 100));
ALTER TABLE "Voucher" ADD CONSTRAINT "ck_voucher_soluong" CHECK ("soLuong" >= 0);
ALTER TABLE "Voucher" ADD CONSTRAINT "ck_voucher_thoigian" CHECK ("ketThuc" > "batDau");
ALTER TABLE "Voucher" ADD CONSTRAINT "ck_voucher_trangthai" CHECK ("trangThai" IN ('DangChay','TamDung'));
ALTER TABLE "ChiTietGioHang" ADD CONSTRAINT "ck_ctgh_soluong" CHECK ("soLuong" > 0);
ALTER TABLE "DiaChi" ADD CONSTRAINT "ck_diachi_loai" CHECK ("loaiDiaChi" IN ('NhaRieng','VanPhong'));
ALTER TABLE "DonHang" ADD CONSTRAINT "ck_donhang_phuongthuc" CHECK ("phuongThuc" IN ('Vi','QR','COD'));
ALTER TABLE "DonHang" ADD CONSTRAINT "ck_donhang_sotien" CHECK ("soTien" >= 0);
ALTER TABLE "DonHang" ADD CONSTRAINT "ck_donhang_trangthai" CHECK ("trangThai" IN ('Cho','ThanhCong','ThatBai','Huy'));
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "ck_dhr_trangthaidon" CHECK ("trangThaiDon" IN ('ChoXacNhan','DangChuanBi','DangGiao','DaGiao','DaNhan','DaHuy','DangHoanHang','DaHoanTien'));
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "ck_dhr_tyle" CHECK ("tyLeHoaHong" BETWEEN 0 AND 100);
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "ck_dhr_nguoixacnhan" CHECK ("nguoiXacNhanNhan" IS NULL OR "nguoiXacNhanNhan" IN ('NguoiMua','HeThong'));
ALTER TABLE "DonHangRieng" ADD CONSTRAINT "ck_dhr_hoantien" CHECK ("trangThaiHoanTien" IN ('Khong','ChoKichHoatVi','DaHoan','QuaHan'));
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ck_ctdh_soluong" CHECK ("soLuong" > 0);
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ck_ctdh_giamgia" CHECK ("giamGiaPhanBo" >= 0);
ALTER TABLE "DanhGia" ADD CONSTRAINT "ck_danhgia_sosao" CHECK ("soSao" BETWEEN 1 AND 5);
ALTER TABLE "HoanHang" ADD CONSTRAINT "ck_hoanhang_trangthai" CHECK ("trangThai" IN ('ChoNguoiBan','DaChapNhan','DangTranhChap','HoanTat'));
ALTER TABLE "HoanHang" ADD CONSTRAINT "ck_hoanhang_ketqua" CHECK ("ketQua" IS NULL OR "ketQua" IN ('NguoiMuaThang','NguoiBanThang'));
ALTER TABLE "HoanHang" ADD CONSTRAINT "ck_hoanhang_cachxuly" CHECK ("cachXuLy" IS NULL OR "cachXuLy" IN ('TuDong','NguoiBan','NhanVien'));
ALTER TABLE "TranhChap" ADD CONSTRAINT "ck_tranhchap_trangthai" CHECK ("trangThaiTranhChap" IN ('ChoXuLy','DaPhanQuyet'));
ALTER TABLE "TranhChap" ADD CONSTRAINT "ck_tranhchap_ketqua" CHECK ("ketQua" IS NULL OR "ketQua" IN ('NguoiMuaThang','NguoiBanThang'));
ALTER TABLE "BaoCao" ADD CONSTRAINT "ck_baocao_lydo" CHECK ("lyDo" IN ('HangGia','HangCam','MoTaSai','Khac'));
ALTER TABLE "BaoCao" ADD CONSTRAINT "ck_baocao_trangthai" CHECK ("trangThai" IN ('ChoXuLy','DaKetLuan'));
ALTER TABLE "BaoCao" ADD CONSTRAINT "ck_baocao_ketqua" CHECK ("ketQua" IS NULL OR "ketQua" IN ('ViPham','KhongViPham'));
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "ck_lsxl_loaitru" CHECK (("idDonHang" IS NOT NULL AND "idCuaHang" IS NOT NULL AND "idBaoCao" IS NULL) OR ("idDonHang" IS NULL AND "idCuaHang" IS NULL AND "idBaoCao" IS NOT NULL));
ALTER TABLE "TinNhan" ADD CONSTRAINT "ck_tinnhan_bengui" CHECK ("benGui" IN ('NguoiMua','CuaHang'));
ALTER TABLE "ThongBao" ADD CONSTRAINT "ck_thongbao_loai" CHECK ("loai" IN ('DonHang','ThanhToan','HoanTien','TranhChap','TinNhan','HeThong'));
ALTER TABLE "Banner" ADD CONSTRAINT "ck_banner_thoigian" CHECK ("ketThuc" > "batDau");
