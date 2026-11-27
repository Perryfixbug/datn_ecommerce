CREATE TABLE "KhieuNai" (
  "idKhieuNai" BIGINT NOT NULL,
  "idNguoiGui" BIGINT NOT NULL,
  "idDonHang" BIGINT,
  "idNhanVien" BIGINT,
  "noiDung" TEXT NOT NULL,
  "bangChung" TEXT,
  "trangThai" VARCHAR(30) NOT NULL DEFAULT 'ChoXuLy',
  "ketQua" VARCHAR(30),
  "lyDoXuLy" VARCHAR(1000),
  "thoiGianGui" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "thoiGianDong" TIMESTAMP(0),
  "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "pk_khieunai" PRIMARY KEY ("idKhieuNai"),
  CONSTRAINT "KhieuNai_idNguoiGui_fkey" FOREIGN KEY ("idNguoiGui") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "KhieuNai_idDonHang_fkey" FOREIGN KEY ("idDonHang") REFERENCES "DonHang"("idDonHang") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "KhieuNai_idNhanVien_fkey" FOREIGN KEY ("idNhanVien") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "ck_khieunai_trangthai" CHECK ("trangThai" IN ('ChoXuLy', 'DaXuLy')),
  CONSTRAINT "ck_khieunai_ketqua" CHECK (
    ("trangThai" = 'ChoXuLy' AND "ketQua" IS NULL AND "lyDoXuLy" IS NULL AND "thoiGianDong" IS NULL AND "idNhanVien" IS NULL)
    OR ("trangThai" = 'DaXuLy' AND "ketQua" IS NOT NULL AND "ketQua" IN ('ChapNhan', 'TuChoi') AND "lyDoXuLy" IS NOT NULL AND length(trim("lyDoXuLy")) > 0 AND "thoiGianDong" IS NOT NULL AND "idNhanVien" IS NOT NULL)
  )
);
CREATE INDEX "ix_khieunai_tt_id" ON "KhieuNai"("trangThai", "idKhieuNai");
CREATE INDEX "ix_khieunai_nguoigui" ON "KhieuNai"("idNguoiGui");
CREATE INDEX "ix_khieunai_donhang" ON "KhieuNai"("idDonHang");
CREATE INDEX "ix_khieunai_nhanvien" ON "KhieuNai"("idNhanVien");
ALTER TABLE "LichSuXuLy" ADD COLUMN "idKhieuNai" BIGINT;
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "LichSuXuLy_idKhieuNai_fkey" FOREIGN KEY ("idKhieuNai") REFERENCES "KhieuNai"("idKhieuNai") ON DELETE NO ACTION ON UPDATE NO ACTION;
CREATE INDEX "ix_lsxl_khieunai" ON "LichSuXuLy"("idKhieuNai", "thoiGian");
ALTER TABLE "LichSuXuLy" DROP CONSTRAINT "ck_lsxl_loaitru";
ALTER TABLE "LichSuXuLy" ADD CONSTRAINT "ck_lsxl_loaitru" CHECK (
  ("idKhieuNai" IS NOT NULL AND "idBaoCao" IS NULL AND "idDonHang" IS NULL AND "idCuaHang" IS NULL)
  OR ("idKhieuNai" IS NULL AND "idBaoCao" IS NOT NULL AND "idDonHang" IS NULL AND "idCuaHang" IS NULL)
  OR ("idKhieuNai" IS NULL AND "idBaoCao" IS NULL AND "idDonHang" IS NOT NULL AND "idCuaHang" IS NOT NULL)
);
