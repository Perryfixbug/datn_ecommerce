# Đặc tả cơ sở dữ liệu

Nguồn đối chiếu: `today.vpp` (22/11/2026). Khi có khác biệt, mô hình VPP được ưu tiên. Tài liệu phản ánh mô hình thiết kế, không khẳng định đã triển khai database hoặc migration.

- Cột `Kiểu vật lý` giữ kiểu và độ dài trong VPP; tên kiểu liệt kê logic được chú thích ở từng bảng và liệt kê ở cuối tài liệu. Các trường liệt kê được lưu bằng `VARCHAR(30)` với CHECK tương ứng.
- `—` trong cột `Mặc định` nghĩa là VPP không khai báo giá trị mặc định; không đồng nghĩa với `DEFAULT NULL`. `CURRENT_TIMESTAMP` không tự hàm ý `ON UPDATE CURRENT_TIMESTAMP`.
- Unique một cột gồm thuộc tính `unique=T` trên cột và unique index; bảng index chỉ liệt kê đối tượng `DBIndex` thực có trong VPP. Không bổ sung index suy diễn từ PK/FK.
- `Không khai báo` nghĩa là thuộc tính không được lưu trong VPP; không tự suy diễn quy tắc xóa/cập nhật hoặc tên constraint SQL. FK không có tên được nhận diện bằng ID của mô hình.
- Cả 27 bảng đều có `DDLClauses="DEFAULT CHARSET = utf8mb4"` trong VPP; giữ nguyên metadata này, không chuyển đổi sang cấu hình PostgreSQL.

Ký hiệu: **PK** khóa chính, **FK** khóa ngoại, **U** unique một cột, **U1/U2** unique ghép (cùng nhãn là cùng một ràng buộc). Kiểu liệt kê xem mục cuối.

## a) Người dùng và ví

### NguoiDung

| Cột             | Kiểu vật lý  | Key | Null     | Unique | Quan hệ | Mặc định          |
| --------------- | ------------ | --- | -------- | ------ | ------- | ----------------- |
| idNguoiDung     | BIGINT(16)   | PK  | NOT NULL |        |         | —                 |
| email           | VARCHAR(255) |     | NOT NULL | U1     |         | —                 |
| soDienThoai     | VARCHAR(10)  |     | NOT NULL | U2     |         | —                 |
| matKhauHash     | VARCHAR(255) |     | NOT NULL |        |         | —                 |
| hoTen           | VARCHAR(100) |     | NOT NULL |        |         | —                 |
| ngaySinh        | DATE         |     | NULL     |        |         | —                 |
| gioiTinh        | VARCHAR(30)  |     | NULL     |        |         | —                 |
| vaiTro          | VARCHAR(30)  |     | NOT NULL | U1, U2 |         | —                 |
| trangThai       | VARCHAR(30)  |     | NOT NULL |        |         | —                 |
| lanDangNhapCuoi | DATETIME     |     | NULL     |        |         | —                 |
| createdAt       | DATETIME     |     | NOT NULL |        |         | CURRENT_TIMESTAMP |
| updatedAt       | DATETIME     |     | NOT NULL |        |         | CURRENT_TIMESTAMP |

Unique ghép: U1 (email, vaiTro); U2 (soDienThoai, vaiTro)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_nguoidung`.
- Kiểu liệt kê logic: `gioiTinh` → `GioiTinh`; `vaiTro` → `VaiTro`; `trangThai` → `TrangThaiTaiKhoan`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                    | Biểu thức                                             |
| ------------------------ | ----------------------------------------------------- |
| `ck_nguoidung_gioitinh`  | `gioiTinh IS NULL OR gioiTinh IN ('Nam','Nu','Khac')` |
| `ck_nguoidung_vaitro`    | `vaiTro IN ('NguoiMua','NguoiBan','NhanVien')`        |
| `ck_nguoidung_trangthai` | `trangThai IN ('HoatDong','BiKhoa')`                  |

| Index (tên lưu trong VPP)       | Cột theo thứ tự         | Unique         |
| ------------------------------- | ----------------------- | -------------- |
| `email`                         | `email`, `vaiTro`       | Có             |
| `soDienThoai`                   | `soDienThoai`, `vaiTro` | Có             |
| `ix_nguoidung_vaitro_trangthai` | `vaiTro`, `trangThai`   | Không khai báo |

### NguoiMua

| Cột           | Kiểu vật lý | Key    | Null     | Unique | Quan hệ                 | Mặc định          |
| ------------- | ----------- | ------ | -------- | ------ | ----------------------- | ----------------- |
| idNguoiMua    | BIGINT(16)  | PK, FK | NOT NULL |        | → NguoiDung.idNguoiDung | —                 |
| hangThanhVien | VARCHAR(30) |        | NOT NULL |        |                         | 'Dong'            |
| diemTichLuy   | INT         |        | NOT NULL |        |                         | 0                 |
| updatedAt     | DATETIME    |        | NOT NULL |        |                         | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_nguoimua`.
- Kiểu liệt kê logic: `hangThanhVien` → `HangThanhVien`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK              | Biểu thức                                           |
| ------------------ | --------------------------------------------------- |
| `ck_nguoimua_hang` | `hangThanhVien IN ('Dong','Bac','Vang','KimCuong')` |
| `ck_nguoimua_diem` | `diemTichLuy >= 0`                                  |

| Index (tên lưu trong VPP) | Cột theo thứ tự | Unique         |
| ------------------------- | --------------- | -------------- |
| `ix_nguoimua_hang`        | `hangThanhVien` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                             | ON DELETE | ON UPDATE      | Identifying |
| ------------------ | -------------------------------------------- | --------- | -------------- | ----------- |
| `mlzKj4WGAqACAwdL` | (`idNguoiMua`) → `NguoiDung` (`idNguoiDung`) | Restrict  | Không khai báo | Có          |

### NguoiBan

| Cột              | Kiểu vật lý  | Key    | Null     | Unique | Quan hệ                 | Mặc định          |
| ---------------- | ------------ | ------ | -------- | ------ | ----------------------- | ----------------- |
| idNguoiBan       | BIGINT(16)   | PK, FK | NOT NULL |        | → NguoiDung.idNguoiDung | —                 |
| soCCCD           | VARCHAR(12)  |        | NULL     | U      |                         | —                 |
| matTruocCCCD     | VARCHAR(255) |        | NULL     |        |                         | —                 |
| matSauCCCD       | VARCHAR(255) |        | NULL     |        |                         | —                 |
| loaiThue         | VARCHAR(30)  |        | NULL     |        |                         | —                 |
| tenDoanhNghiep   | VARCHAR(255) |        | NULL     |        |                         | —                 |
| maSoThue         | VARCHAR(14)  |        | NULL     | U      |                         | —                 |
| trangThaiXacMinh | VARCHAR(30)  |        | NOT NULL |        |                         | 'ChuaNop'         |
| lyDoTuChoi       | VARCHAR(500) |        | NULL     |        |                         | —                 |
| thoiGianNop      | DATETIME     |        | NULL     |        |                         | —                 |
| thoiGianDuyet    | DATETIME     |        | NULL     |        |                         | —                 |
| updatedAt        | DATETIME     |        | NOT NULL |        |                         | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_nguoiban`.
- Kiểu liệt kê logic: `loaiThue` → `LoaiThue`; `trangThaiXacMinh` → `TrangThaiXacMinh`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                    | Biểu thức                                                                     |
| ------------------------ | ----------------------------------------------------------------------------- |
| `ck_nguoiban_loaithue`   | `loaiThue IS NULL OR loaiThue IN ('CaNhan','HoKinhDoanh','DoanhNghiep')`      |
| `ck_nguoiban_xacminh`    | `trangThaiXacMinh IN ('ChuaNop','ChoDuyet','DaXacMinh','TuChoi')`             |
| `ck_nguoiban_tendn`      | `loaiThue IS NULL OR loaiThue <> 'DoanhNghiep' OR tenDoanhNghiep IS NOT NULL` |
| `ck_nguoiban_lydotuchoi` | `trangThaiXacMinh <> 'TuChoi' OR lyDoTuChoi IS NOT NULL`                      |

| Index (tên lưu trong VPP) | Cột theo thứ tự                   | Unique         |
| ------------------------- | --------------------------------- | -------------- |
| `soCCCD`                  | `soCCCD`                          | Có             |
| `maSoThue`                | `maSoThue`                        | Có             |
| `ix_nguoiban_xacminh`     | `trangThaiXacMinh`, `thoiGianNop` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                             | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | -------------------------------------------- | -------------- | -------------- | ----------- |
| `hlzKj4WGAqACAwdP` | (`idNguoiBan`) → `NguoiDung` (`idNguoiDung`) | Không khai báo | Không khai báo | Có          |

### NhanVienSan

| Cột        | Kiểu vật lý | Key    | Null     | Unique | Quan hệ                 | Mặc định          |
| ---------- | ----------- | ------ | -------- | ------ | ----------------------- | ----------------- |
| idNhanVien | BIGINT(16)  | PK, FK | NOT NULL |        | → NguoiDung.idNguoiDung | —                 |
| chucVu     | VARCHAR(50) |        | NOT NULL |        |                         | —                 |
| ngayVaoLam | DATE        |        | NOT NULL |        |                         | —                 |
| updatedAt  | DATETIME    |        | NOT NULL |        |                         | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_nhanviensan`.

| FK (ID trong VPP)  | Cột nguồn → đích                             | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | -------------------------------------------- | -------------- | -------------- | ----------- |
| `xlzKj4WGAqACAwdS` | (`idNhanVien`) → `NguoiDung` (`idNguoiDung`) | Không khai báo | Không khai báo | Có          |

### ViDienTu

| Cột             | Kiểu vật lý   | Key    | Null     | Unique | Quan hệ                 | Mặc định          |
| --------------- | ------------- | ------ | -------- | ------ | ----------------------- | ----------------- |
| idNguoiDung     | BIGINT(16)    | PK, FK | NOT NULL |        | → NguoiDung.idNguoiDung | —                 |
| soDu            | DECIMAL(15,0) |        | NOT NULL |        |                         | 0                 |
| trangThai       | VARCHAR(30)   |        | NOT NULL |        |                         | 'HoatDong'        |
| maPinHash       | VARCHAR(255)  |        | NULL     |        |                         | —                 |
| soLanNhapSaiPin | INT           |        | NOT NULL |        |                         | 0                 |
| khoaTamDen      | DATETIME      |        | NULL     |        |                         | —                 |
| version         | INT           |        | NOT NULL |        |                         | 0                 |
| createdAt       | DATETIME      |        | NOT NULL |        |                         | CURRENT_TIMESTAMP |
| updatedAt       | DATETIME      |        | NOT NULL |        |                         | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_vidientu`.
- Kiểu liệt kê logic: `trangThai` → `TrangThaiVi`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                   | Biểu thức                            |
| ----------------------- | ------------------------------------ |
| `ck_vidientu_sodu`      | `soDu >= 0`                          |
| `ck_vidientu_trangthai` | `trangThai IN ('HoatDong','BiKhoa')` |
| `ck_vidientu_saipin`    | `soLanNhapSaiPin BETWEEN 0 AND 5`    |

| FK (ID trong VPP)  | Cột nguồn → đích                              | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | --------------------------------------------- | -------------- | -------------- | ----------- |
| `JlzKj4WGAqACAwdV` | (`idNguoiDung`) → `NguoiDung` (`idNguoiDung`) | Không khai báo | Không khai báo | Có          |

### GiaoDichVi

| Cột                 | Kiểu vật lý   | Key | Null     | Unique | Quan hệ                                                    | Mặc định |
| ------------------- | ------------- | --- | -------- | ------ | ---------------------------------------------------------- | -------- |
| idGiaoDich          | BIGINT(16)    | PK  | NOT NULL |        |                                                            | —        |
| maGiaoDich          | VARCHAR(20)   |     | NULL     | U      |                                                            | —        |
| idNguoiDung         | BIGINT(16)    | FK  | NOT NULL |        | → ViDienTu.idNguoiDung                                     | —        |
| idDonHang           | BIGINT(16)    | FK  | NULL     | U1     | → DonHang.idDonHang; → DonHangRieng (idDonHang, idCuaHang) | —        |
| idCuaHang           | BIGINT(16)    | FK  | NULL     | U1     | → DonHangRieng (idDonHang, idCuaHang)                      | —        |
| loai                | VARCHAR(30)   |     | NOT NULL | U1     |                                                            | —        |
| soTien              | DECIMAL(15,0) |     | NOT NULL |        |                                                            | —        |
| trangThai           | VARCHAR(30)   |     | NOT NULL |        |                                                            | —        |
| thoiGian            | DATETIME      |     | NOT NULL |        |                                                            | —        |
| ghiChu              | VARCHAR(255)  |     | NULL     |        |                                                            | —        |
| nganHangNhan        | VARCHAR(100)  |     | NULL     |        |                                                            | —        |
| soTaiKhoanNhan      | VARCHAR(30)   |     | NULL     |        |                                                            | —        |
| tenChuTaiKhoanNhan  | VARCHAR(100)  |     | NULL     |        |                                                            | —        |
| thoiGianHoanTat     | DATETIME      |     | NULL     |        |                                                            | —        |
| noiDungChuyenKhoan  | VARCHAR(100)  |     | NULL     |        |                                                            | —        |
| maThamChieuNganHang | VARCHAR(50)   |     | NULL     |        |                                                            | —        |

FK ghép: (idDonHang, idCuaHang) → DonHangRieng (idDonHang, idCuaHang)

Unique ghép: U1 (idDonHang, idCuaHang, loai)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_giaodichvi`.
- Kiểu liệt kê logic: `loai` → `LoaiGiaoDichVi`; `trangThai` → `TrangThaiGiaoDich`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK               | Biểu thức                                                                                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ck_gdvi_loai`      | `loai IN ('Nap','Rut','ThanhToan','NhanTien','PhiSan','HoanTien')`                                                                                                                                                                              |
| `ck_gdvi_sotien`    | `soTien > 0`                                                                                                                                                                                                                                    |
| `ck_gdvi_trangthai` | `trangThai IN ('DangXuLy','ThanhCong','ThatBai')`                                                                                                                                                                                               |
| `ck_gdvi_loai_khoa` | `(loai = 'ThanhToan' AND idDonHang IS NOT NULL AND idCuaHang IS NULL) OR (loai IN ('NhanTien','PhiSan','HoanTien') AND idDonHang IS NOT NULL AND idCuaHang IS NOT NULL) OR (loai IN ('Nap','Rut') AND idDonHang IS NULL AND idCuaHang IS NULL)` |

| Index (tên lưu trong VPP) | Cột theo thứ tự                  | Unique         |
| ------------------------- | -------------------------------- | -------------- |
| `idDonHang`               | `idDonHang`, `idCuaHang`, `loai` | Có             |
| `ix_gdvi_vi_thoigian`     | `idNguoiDung`, `thoiGian`        | Không khai báo |
| `ix_gdvi_trangthai`       | `trangThai`, `loai`              | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                       | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ---------------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `wVzKj4WGAqACAweW` | (`idNguoiDung`) → `ViDienTu` (`idNguoiDung`)                           | Không khai báo | Không khai báo | Không khai báo |
| `IVzKj4WGAqACAweZ` | (`idDonHang`) → `DonHang` (`idDonHang`)                                | Không khai báo | Không khai báo | Không khai báo |
| `YVzKj4WGAqACAwec` | (`idDonHang`, `idCuaHang`) → `DonHangRieng` (`idDonHang`, `idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |

## b) Cửa hàng và sản phẩm

### CuaHang

| Cột           | Kiểu vật lý  | Key | Null     | Unique | Quan hệ               | Mặc định          |
| ------------- | ------------ | --- | -------- | ------ | --------------------- | ----------------- |
| idCuaHang     | BIGINT(16)   | PK  | NOT NULL |        |                       | —                 |
| idNguoiBan    | BIGINT(16)   | FK  | NOT NULL |        | → NguoiBan.idNguoiBan | —                 |
| maShop        | VARCHAR(20)  |     | NULL     | U      |                       | —                 |
| tenShop       | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| anh           | VARCHAR(255) |     | NULL     |        |                       | —                 |
| tinh          | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| xa            | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| diaChiChiTiet | VARCHAR(255) |     | NOT NULL |        |                       | —                 |
| soDienThoai   | VARCHAR(15)  |     | NOT NULL |        |                       | —                 |
| moTa          | TEXT         |     | NULL     |        |                       | —                 |
| ngayMoCuaHang | DATE         |     | NOT NULL |        |                       | —                 |
| trangThai     | VARCHAR(30)  |     | NOT NULL |        |                       | 'HoatDong'        |
| createdAt     | DATETIME     |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |
| updatedAt     | DATETIME     |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_cuahang`.
- Kiểu liệt kê logic: `trangThai` → `TrangThaiCuaHang`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                  | Biểu thức                                      |
| ---------------------- | ---------------------------------------------- |
| `ck_cuahang_trangthai` | `trangThai IN ('HoatDong','TamDong','BiKhoa')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự | Unique         |
| ------------------------- | --------------- | -------------- |
| `maShop`                  | `maShop`        | Có             |
| `ix_cuahang_nguoiban`     | `idNguoiBan`    | Không khai báo |
| `ix_cuahang_trangthai`    | `trangThai`     | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                           | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------ | -------------- | -------------- | -------------- |
| `plzKj4WGAqACAwdY` | (`idNguoiBan`) → `NguoiBan` (`idNguoiBan`) | Không khai báo | Không khai báo | Không khai báo |

### SanPham

| Cột        | Kiểu vật lý  | Key | Null     | Unique | Quan hệ             | Mặc định          |
| ---------- | ------------ | --- | -------- | ------ | ------------------- | ----------------- |
| idSanPham  | BIGINT(16)   | PK  | NOT NULL | U1     |                     | —                 |
| maSanPham  | VARCHAR(20)  |     | NULL     | U      |                     | —                 |
| idCuaHang  | BIGINT(16)   | FK  | NOT NULL | U1     | → CuaHang.idCuaHang | —                 |
| idDanhMuc  | BIGINT(16)   | FK  | NOT NULL |        | → DanhMuc.idDanhMuc | —                 |
| tenSanPham | VARCHAR(200) |     | NOT NULL |        |                     | —                 |
| moTa       | TEXT         |     | NULL     |        |                     | —                 |
| phanLoai   | VARCHAR(100) |     | NULL     |        |                     | —                 |
| anh        | TEXT         |     | NULL     |        |                     | —                 |
| trangThai  | VARCHAR(30)  |     | NOT NULL |        |                     | 'Hien'            |
| createdAt  | DATETIME     |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |
| updatedAt  | DATETIME     |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |

Unique ghép: U1 (idSanPham, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_sanpham`.
- Kiểu liệt kê logic: `trangThai` → `TrangThaiSanPham`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                  | Biểu thức                           |
| ---------------------- | ----------------------------------- |
| `ck_sanpham_trangthai` | `trangThai IN ('Hien','An','Khoa')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự          | Unique         |
| ------------------------- | ------------------------ | -------------- |
| `idSanPham`               | `idSanPham`, `idCuaHang` | Có             |
| `ix_sanpham_cuahang_tt`   | `idCuaHang`, `trangThai` | Không khai báo |
| `ix_sanpham_danhmuc_tt`   | `idDanhMuc`, `trangThai` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                        | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------- | -------------- | -------------- | -------------- |
| `1lzKj4WGAqACAwdh` | (`idCuaHang`) → `CuaHang` (`idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |
| `NlzKj4WGAqACAwdk` | (`idDanhMuc`) → `DanhMuc` (`idDanhMuc`) | Không khai báo | Không khai báo | Không khai báo |

### BienThe

| Cột        | Kiểu vật lý   | Key | Null     | Unique | Quan hệ             | Mặc định          |
| ---------- | ------------- | --- | -------- | ------ | ------------------- | ----------------- |
| idBienThe  | BIGINT(16)    | PK  | NOT NULL |        |                     | —                 |
| idSanPham  | BIGINT(16)    | FK  | NOT NULL | U1     | → SanPham.idSanPham | —                 |
| thuocTinh  | VARCHAR(255)  |     | NOT NULL | U1     |                     | —                 |
| tenBienThe | VARCHAR(200)  |     | NOT NULL |        |                     | —                 |
| anh        | VARCHAR(255)  |     | NULL     |        |                     | —                 |
| gia        | DECIMAL(15,0) |     | NOT NULL |        |                     | —                 |
| tonKho     | INT           |     | NOT NULL |        |                     | 0                 |
| version    | INT           |     | NOT NULL |        |                     | 0                 |
| createdAt  | DATETIME      |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |
| updatedAt  | DATETIME      |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |

Unique ghép: U1 (idSanPham, thuocTinh)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_bienthe`.

| CHECK               | Biểu thức     |
| ------------------- | ------------- |
| `ck_bienthe_gia`    | `gia >= 0`    |
| `ck_bienthe_tonkho` | `tonKho >= 0` |

| Index (tên lưu trong VPP) | Cột theo thứ tự          | Unique         |
| ------------------------- | ------------------------ | -------------- |
| `idSanPham`               | `idSanPham`, `thuocTinh` | Có             |
| `ix_bienthe_sanpham`      | `idSanPham`              | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                        | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------- | -------------- | -------------- | -------------- |
| `tlzKj4WGAqACAwdn` | (`idSanPham`) → `SanPham` (`idSanPham`) | Không khai báo | Không khai báo | Không khai báo |

### DanhMuc

| Cột          | Kiểu vật lý  | Key | Null     | Unique | Quan hệ                  | Mặc định          |
| ------------ | ------------ | --- | -------- | ------ | ------------------------ | ----------------- |
| idDanhMuc    | BIGINT(16)   | PK  | NOT NULL |        |                          | —                 |
| idDanhMucCha | BIGINT(16)   | FK  | NULL     | U1     | → DanhMuc.idDanhMuc      | —                 |
| idNhanVien   | BIGINT(16)   | FK  | NOT NULL |        | → NhanVienSan.idNhanVien | —                 |
| tenDanhMuc   | VARCHAR(100) |     | NOT NULL | U1     |                          | —                 |
| createdAt    | DATETIME     |     | NOT NULL |        |                          | CURRENT_TIMESTAMP |
| updatedAt    | DATETIME     |     | NOT NULL |        |                          | CURRENT_TIMESTAMP |

Unique ghép: U1 (idDanhMucCha, tenDanhMuc)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_danhmuc`.

| Index (tên lưu trong VPP) | Cột theo thứ tự              | Unique         |
| ------------------------- | ---------------------------- | -------------- |
| `idDanhMucCha`            | `idDanhMucCha`, `tenDanhMuc` | Có             |
| `ix_danhmuc_cha`          | `idDanhMucCha`               | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                              | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------------- | -------------- | -------------- | -------------- |
| `ZlzKj4WGAqACAwdb` | (`idDanhMucCha`) → `DanhMuc` (`idDanhMuc`)    | Không khai báo | Không khai báo | Không khai báo |
| `llzKj4WGAqACAwde` | (`idNhanVien`) → `NhanVienSan` (`idNhanVien`) | Không khai báo | Không khai báo | Không khai báo |

### DanhMucShop

| Cột              | Kiểu vật lý  | Key | Null     | Unique | Quan hệ                                                       | Mặc định          |
| ---------------- | ------------ | --- | -------- | ------ | ------------------------------------------------------------- | ----------------- |
| idDanhMucShop    | BIGINT(16)   | PK  | NOT NULL | U1     |                                                               | —                 |
| idCuaHang        | BIGINT(16)   | FK  | NOT NULL | U1, U2 | → CuaHang.idCuaHang; → DanhMucShop (idDanhMucShop, idCuaHang) | —                 |
| idDanhMucShopCha | BIGINT(16)   | FK  | NULL     | U2     | → DanhMucShop (idDanhMucShop, idCuaHang)                      | —                 |
| tenDanhMuc       | VARCHAR(100) |     | NOT NULL | U2     |                                                               | —                 |
| createdAt        | DATETIME     |     | NOT NULL |        |                                                               | CURRENT_TIMESTAMP |
| updatedAt        | DATETIME     |     | NOT NULL |        |                                                               | CURRENT_TIMESTAMP |

FK ghép: (idDanhMucShopCha, idCuaHang) → DanhMucShop (idDanhMucShop, idCuaHang)

Unique ghép: U1 (idDanhMucShop, idCuaHang); U2 (idCuaHang, idDanhMucShopCha, tenDanhMuc)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_danhmucshop`.

| Index (tên lưu trong VPP) | Cột theo thứ tự                               | Unique         |
| ------------------------- | --------------------------------------------- | -------------- |
| `idDanhMucShop`           | `idDanhMucShop`, `idCuaHang`                  | Có             |
| `idCuaHang`               | `idCuaHang`, `idDanhMucShopCha`, `tenDanhMuc` | Có             |
| `ix_dms_shop`             | `idCuaHang`                                   | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                                 | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | -------------------------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `dlzKj4WGAqACAwdq` | (`idCuaHang`) → `CuaHang` (`idCuaHang`)                                          | Không khai báo | Không khai báo | Không khai báo |
| `9lzKj4WGAqACAwdt` | (`idCuaHang`, `idDanhMucShopCha`) → `DanhMucShop` (`idCuaHang`, `idDanhMucShop`) | Không khai báo | Không khai báo | Không khai báo |

### ChiTietDanhMuc

| Cột           | Kiểu vật lý | Key    | Null     | Unique | Quan hệ                                                                    | Mặc định          |
| ------------- | ----------- | ------ | -------- | ------ | -------------------------------------------------------------------------- | ----------------- |
| idSanPham     | BIGINT(16)  | PK, FK | NOT NULL |        | → SanPham (idSanPham, idCuaHang)                                           | —                 |
| idDanhMucShop | BIGINT(16)  | PK, FK | NOT NULL |        | → DanhMucShop (idDanhMucShop, idCuaHang)                                   | —                 |
| idCuaHang     | BIGINT(16)  | FK     | NOT NULL |        | → SanPham (idSanPham, idCuaHang); → DanhMucShop (idDanhMucShop, idCuaHang) | —                 |
| createdAt     | DATETIME    |        | NOT NULL |        |                                                                            | CURRENT_TIMESTAMP |

PK ghép: (idSanPham, idDanhMucShop)

FK ghép: (idSanPham, idCuaHang) → SanPham (idSanPham, idCuaHang); (idDanhMucShop, idCuaHang) → DanhMucShop (idDanhMucShop, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_chitietdanhmuc`.

| Index (tên lưu trong VPP) | Cột theo thứ tự              | Unique         |
| ------------------------- | ---------------------------- | -------------- |
| `ix_ctdm_danhmuc`         | `idDanhMucShop`, `idSanPham` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                              | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ----------------------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `jlzKj4WGAqACAwdw` | (`idSanPham`, `idCuaHang`) → `SanPham` (`idSanPham`, `idCuaHang`)             | Không khai báo | Không khai báo | Không khai báo |
| `TlzKj4WGAqACAwdz` | (`idDanhMucShop`, `idCuaHang`) → `DanhMucShop` (`idDanhMucShop`, `idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |

### Voucher

| Cột         | Kiểu vật lý   | Key | Null     | Unique | Quan hệ             | Mặc định          |
| ----------- | ------------- | --- | -------- | ------ | ------------------- | ----------------- |
| idVoucher   | BIGINT(16)    | PK  | NOT NULL | U1     |                     | —                 |
| idCuaHang   | BIGINT(16)    | FK  | NOT NULL | U1, U2 | → CuaHang.idCuaHang | —                 |
| code        | VARCHAR(30)   |     | NULL     | U, U2  |                     | —                 |
| tenVoucher  | VARCHAR(100)  |     | NOT NULL |        |                     | —                 |
| loaiGiam    | VARCHAR(30)   |     | NOT NULL |        |                     | —                 |
| giaTri      | DECIMAL(15,2) |     | NOT NULL |        |                     | —                 |
| giamToiDa   | DECIMAL(15,0) |     | NULL     |        |                     | —                 |
| donToiThieu | DECIMAL(15,0) |     | NOT NULL |        |                     | 0                 |
| soLuong     | INT           |     | NOT NULL |        |                     | —                 |
| batDau      | DATETIME      |     | NOT NULL |        |                     | —                 |
| ketThuc     | DATETIME      |     | NOT NULL |        |                     | —                 |
| trangThai   | VARCHAR(30)   |     | NOT NULL |        |                     | 'DangChay'        |
| createdAt   | DATETIME      |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |
| updatedAt   | DATETIME      |     | NOT NULL |        |                     | CURRENT_TIMESTAMP |

Unique ghép: U1 (idVoucher, idCuaHang); U2 (idCuaHang, code)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_voucher`.
- Kiểu liệt kê logic: `loaiGiam` → `LoaiGiam`; `trangThai` → `TrangThaiVoucher`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                  | Biểu thức                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `ck_voucher_loaigiam`  | `loaiGiam IN ('PhanTram','SoTien')`                        |
| `ck_voucher_giatri`    | `giaTri > 0 AND (loaiGiam <> 'PhanTram' OR giaTri <= 100)` |
| `ck_voucher_soluong`   | `soLuong >= 0`                                             |
| `ck_voucher_thoigian`  | `ketThuc > batDau`                                         |
| `ck_voucher_trangthai` | `trangThai IN ('DangChay','TamDung')`                      |

| Index (tên lưu trong VPP) | Cột theo thứ tự                     | Unique         |
| ------------------------- | ----------------------------------- | -------------- |
| `idVoucher`               | `idVoucher`, `idCuaHang`            | Có             |
| `idCuaHang`               | `idCuaHang`, `code`                 | Có             |
| `ix_voucher_shop_tt_time` | `idCuaHang`, `trangThai`, `ketThuc` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                        | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------- | -------------- | -------------- | -------------- |
| `LlzKj4WGAqACAwd2` | (`idCuaHang`) → `CuaHang` (`idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |

## c) Mua hàng và thanh toán

### ChiTietGioHang

| Cột        | Kiểu vật lý | Key    | Null     | Unique | Quan hệ               | Mặc định          |
| ---------- | ----------- | ------ | -------- | ------ | --------------------- | ----------------- |
| idNguoiMua | BIGINT(16)  | PK, FK | NOT NULL |        | → NguoiMua.idNguoiMua | —                 |
| idBienThe  | BIGINT(16)  | PK, FK | NOT NULL |        | → BienThe.idBienThe   | —                 |
| soLuong    | INT         |        | NOT NULL |        |                       | —                 |
| ngayThem   | DATETIME    |        | NOT NULL |        |                       | —                 |
| updatedAt  | DATETIME    |        | NOT NULL |        |                       | CURRENT_TIMESTAMP |

PK ghép: (idNguoiMua, idBienThe)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_chitietgiohang`.

| CHECK             | Biểu thức     |
| ----------------- | ------------- |
| `ck_ctgh_soluong` | `soLuong > 0` |

| Index (tên lưu trong VPP) | Cột theo thứ tự | Unique         |
| ------------------------- | --------------- | -------------- |
| `ix_ctgh_bienthe`         | `idBienThe`     | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                           | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | ------------------------------------------ | -------------- | -------------- | ----------- |
| `blzKj4WGAqACAwd5` | (`idNguoiMua`) → `NguoiMua` (`idNguoiMua`) | Cascade        | Không khai báo | Có          |
| `7lzKj4WGAqACAwd8` | (`idBienThe`) → `BienThe` (`idBienThe`)    | Không khai báo | Không khai báo | Có          |

### DiaChi

| Cột           | Kiểu vật lý  | Key | Null     | Unique | Quan hệ               | Mặc định          |
| ------------- | ------------ | --- | -------- | ------ | --------------------- | ----------------- |
| idDiaChi      | BIGINT(16)   | PK  | NOT NULL |        |                       | —                 |
| idNguoiMua    | BIGINT(16)   | FK  | NOT NULL |        | → NguoiMua.idNguoiMua | —                 |
| nguoiNhan     | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| soDienThoai   | VARCHAR(15)  |     | NOT NULL |        |                       | —                 |
| tinh          | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| xa            | VARCHAR(100) |     | NOT NULL |        |                       | —                 |
| diaChiChiTiet | VARCHAR(255) |     | NOT NULL |        |                       | —                 |
| loaiDiaChi    | VARCHAR(30)  |     | NOT NULL |        |                       | —                 |
| macDinh       | BOOLEAN      |     | NOT NULL |        |                       | FALSE             |
| createdAt     | DATETIME     |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |
| updatedAt     | DATETIME     |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_diachi`.
- Kiểu liệt kê logic: `loaiDiaChi` → `LoaiDiaChi`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK            | Biểu thức                               |
| ---------------- | --------------------------------------- |
| `ck_diachi_loai` | `loaiDiaChi IN ('NhaRieng','VanPhong')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự | Unique         |
| ------------------------- | --------------- | -------------- |
| `ix_diachi_nguoimua`      | `idNguoiMua`    | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                           | ON DELETE | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------ | --------- | -------------- | -------------- |
| `nlzKj4WGAqACAwd_` | (`idNguoiMua`) → `NguoiMua` (`idNguoiMua`) | Cascade   | Không khai báo | Không khai báo |

### DonHang

| Cột                | Kiểu vật lý   | Key | Null     | Unique | Quan hệ               | Mặc định          |
| ------------------ | ------------- | --- | -------- | ------ | --------------------- | ----------------- |
| idDonHang          | BIGINT(16)    | PK  | NOT NULL |        |                       | —                 |
| maDonHang          | VARCHAR(20)   |     | NULL     | U      |                       | —                 |
| idNguoiMua         | BIGINT(16)    | FK  | NOT NULL |        | → NguoiMua.idNguoiMua | —                 |
| thoiGianDat        | DATETIME      |     | NOT NULL |        |                       | —                 |
| tenNguoiNhan       | VARCHAR(100)  |     | NOT NULL |        |                       | —                 |
| soDienThoaiNhan    | VARCHAR(10)   |     | NOT NULL |        |                       | —                 |
| tinh               | VARCHAR(100)  |     | NOT NULL |        |                       | —                 |
| xa                 | VARCHAR(100)  |     | NOT NULL |        |                       | —                 |
| diaChiChiTiet      | VARCHAR(255)  |     | NOT NULL |        |                       | —                 |
| phuongThuc         | VARCHAR(30)   |     | NOT NULL |        |                       | —                 |
| soTien             | DECIMAL(15,0) |     | NOT NULL |        |                       | —                 |
| trangThai          | VARCHAR(30)   |     | NOT NULL |        |                       | 'Cho'             |
| hanThanhToan       | DATETIME      |     | NULL     |        |                       | —                 |
| maDoiSoat          | VARCHAR(30)   |     | NULL     | U      |                       | —                 |
| noiDungChuyenKhoan | VARCHAR(100)  |     | NULL     |        |                       | —                 |
| thoiGianThanhCong  | DATETIME      |     | NULL     |        |                       | —                 |
| createdAt          | DATETIME      |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |
| updatedAt          | DATETIME      |     | NOT NULL |        |                       | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_donhang`.
- Kiểu liệt kê logic: `phuongThuc` → `PhuongThucThanhToan`; `trangThai` → `TrangThaiThanhToan`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                   | Biểu thức                                          |
| ----------------------- | -------------------------------------------------- |
| `ck_donhang_phuongthuc` | `phuongThuc IN ('Vi','QR','COD')`                  |
| `ck_donhang_sotien`     | `soTien >= 0`                                      |
| `ck_donhang_trangthai`  | `trangThai IN ('Cho','ThanhCong','ThatBai','Huy')` |

| Index (tên lưu trong VPP)  | Cột theo thứ tự             | Unique         |
| -------------------------- | --------------------------- | -------------- |
| `maDoiSoat`                | `maDoiSoat`                 | Có             |
| `ix_donhang_nguoimua_time` | `idNguoiMua`, `thoiGianDat` | Không khai báo |
| `ix_donhang_tt_han`        | `trangThai`, `hanThanhToan` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                           | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------ | -------------- | -------------- | -------------- |
| `XlzKj4WGAqACAweC` | (`idNguoiMua`) → `NguoiMua` (`idNguoiMua`) | Không khai báo | Không khai báo | Không khai báo |

### DonHangRieng

| Cột               | Kiểu vật lý   | Key    | Null     | Unique | Quan hệ                                               | Mặc định          |
| ----------------- | ------------- | ------ | -------- | ------ | ----------------------------------------------------- | ----------------- |
| idDonHang         | BIGINT(16)    | PK, FK | NOT NULL |        | → DonHang.idDonHang                                   | —                 |
| idCuaHang         | BIGINT(16)    | PK, FK | NOT NULL |        | → CuaHang.idCuaHang; → Voucher (idVoucher, idCuaHang) | —                 |
| maDonHangRieng    | VARCHAR(20)   |        | NULL     | U      |                                                       | —                 |
| idVoucher         | BIGINT(16)    | FK     | NULL     |        | → Voucher (idVoucher, idCuaHang)                      | —                 |
| trangThaiDon      | VARCHAR(30)   |        | NOT NULL |        |                                                       | 'ChoXacNhan'      |
| phiVanChuyen      | DECIMAL(15,0) |        | NOT NULL |        |                                                       | 0                 |
| tyLeHoaHong       | DECIMAL(5,2)  |        | NOT NULL |        |                                                       | —                 |
| ngayGiaoDuKien    | DATE          |        | NULL     |        |                                                       | —                 |
| thoiGianGiao      | DATETIME      |        | NULL     |        |                                                       | —                 |
| hanNhanHang       | DATETIME      |        | NULL     |        |                                                       | —                 |
| thoiGianNhan      | DATETIME      |        | NULL     |        |                                                       | —                 |
| nguoiXacNhanNhan  | VARCHAR(30)   |        | NULL     |        |                                                       | —                 |
| thoiGianHuy       | DATETIME      |        | NULL     |        |                                                       | —                 |
| lyDoHuy           | VARCHAR       |        | NULL     |        |                                                       | —                 |
| trangThaiHoanTien | VARCHAR(30)   |        | NOT NULL |        |                                                       | 'Khong'           |
| soTienHoan        | DECIMAL(15,0) |        | NULL     |        |                                                       | —                 |
| hanNhanHoan       | DATETIME      |        | NULL     |        |                                                       | —                 |
| version           | INT           |        | NOT NULL |        |                                                       | 0                 |
| createdAt         | DATETIME      |        | NOT NULL |        |                                                       | CURRENT_TIMESTAMP |
| updatedAt         | DATETIME      |        | NOT NULL |        |                                                       | CURRENT_TIMESTAMP |

PK ghép: (idDonHang, idCuaHang)

FK ghép: (idVoucher, idCuaHang) → Voucher (idVoucher, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_donhangrieng`.
- Kiểu liệt kê logic: `trangThaiDon` → `TrangThaiDonHangRieng`; `nguoiXacNhanNhan` → `NguoiXacNhan`; `trangThaiHoanTien` → `TrangThaiHoanTien`. Kiểu vật lý và CHECK giữ theo VPP.
- `lyDoHuy`: VPP ghi `typeName="VARCHAR"`, `type=34` và không khai báo độ dài; không suy diễn thành `VARCHAR(500)`.

| CHECK                 | Biểu thức                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ck_dhr_trangthaidon` | `trangThaiDon IN ('ChoXacNhan','DangChuanBi','DangGiao','DaGiao','DaNhan','DaHuy','DangHoanHang','DaHoanTien')` |
| `ck_dhr_tyle`         | `tyLeHoaHong BETWEEN 0 AND 100`                                                                                 |
| `ck_dhr_nguoixacnhan` | `nguoiXacNhanNhan IS NULL OR nguoiXacNhanNhan IN ('NguoiMua','HeThong')`                                        |
| `ck_dhr_hoantien`     | `trangThaiHoanTien IN ('Khong','ChoKichHoatVi','DaHoan','QuaHan')`                                              |

| Index (tên lưu trong VPP) | Cột theo thứ tự                          | Unique         |
| ------------------------- | ---------------------------------------- | -------------- |
| `ix_dhr_shop_tt`          | `idCuaHang`, `trangThaiDon`, `createdAt` | Không khai báo |
| `ix_dhr_voucher`          | `idVoucher`, `idCuaHang`                 | Không khai báo |
| `ix_dhr_hannhan`          | `trangThaiDon`, `hanNhanHang`            | Không khai báo |
| `ix_dhr_hoantien`         | `trangThaiHoanTien`, `hanNhanHoan`       | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                  | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ----------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `PlzKj4WGAqACAweF` | (`idDonHang`) → `DonHang` (`idDonHang`)                           | Cascade        | Không khai báo | Có             |
| `vlzKj4WGAqACAweI` | (`idCuaHang`) → `CuaHang` (`idCuaHang`)                           | Không khai báo | Không khai báo | Có             |
| `flzKj4WGAqACAweL` | (`idCuaHang`, `idVoucher`) → `Voucher` (`idCuaHang`, `idVoucher`) | Không khai báo | Không khai báo | Không khai báo |

### ChiTietDonHang

| Cột           | Kiểu vật lý   | Key    | Null     | Unique | Quan hệ                               | Mặc định          |
| ------------- | ------------- | ------ | -------- | ------ | ------------------------------------- | ----------------- |
| idDonHang     | BIGINT(16)    | PK, FK | NOT NULL |        | → DonHangRieng (idDonHang, idCuaHang) | —                 |
| idCuaHang     | BIGINT(16)    | PK, FK | NOT NULL |        | → DonHangRieng (idDonHang, idCuaHang) | —                 |
| idBienThe     | BIGINT(16)    | PK, FK | NOT NULL |        | → BienThe.idBienThe                   | —                 |
| tenSanPham    | VARCHAR(200)  |        | NOT NULL |        |                                       | —                 |
| tenBienThe    | VARCHAR(200)  |        | NOT NULL |        |                                       | —                 |
| soLuong       | INT           |        | NOT NULL |        |                                       | —                 |
| donGia        | DECIMAL(15,0) |        | NOT NULL |        |                                       | —                 |
| giamGiaPhanBo | DECIMAL(15,0) |        | NOT NULL |        |                                       | 0                 |
| createdAt     | DATETIME      |        | NOT NULL |        |                                       | CURRENT_TIMESTAMP |

PK ghép: (idDonHang, idCuaHang, idBienThe)

FK ghép: (idDonHang, idCuaHang) → DonHangRieng (idDonHang, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_chitietdonhang`.

| CHECK             | Biểu thức            |
| ----------------- | -------------------- |
| `ck_ctdh_soluong` | `soLuong > 0`        |
| `ck_ctdh_giamgia` | `giamGiaPhanBo >= 0` |

| Index (tên lưu trong VPP) | Cột theo thứ tự | Unique         |
| ------------------------- | --------------- | -------------- |
| `ix_ctdh_bienthe`         | `idBienThe`     | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                       | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | ---------------------------------------------------------------------- | -------------- | -------------- | ----------- |
| `_lzKj4WGAqACAweO` | (`idDonHang`, `idCuaHang`) → `DonHangRieng` (`idDonHang`, `idCuaHang`) | Không khai báo | Không khai báo | Có          |
| `gVzKj4WGAqACAweT` | (`idBienThe`) → `BienThe` (`idBienThe`)                                | Không khai báo | Không khai báo | Có          |

## d) Đánh giá và sau bán hàng

### DanhGia

| Cột             | Kiểu vật lý | Key    | Null     | Unique | Quan hệ                                            | Mặc định          |
| --------------- | ----------- | ------ | -------- | ------ | -------------------------------------------------- | ----------------- |
| idDonHang       | BIGINT(16)  | PK, FK | NOT NULL |        | → ChiTietDonHang (idDonHang, idCuaHang, idBienThe) | —                 |
| idCuaHang       | BIGINT(16)  | PK, FK | NOT NULL |        | → ChiTietDonHang (idDonHang, idCuaHang, idBienThe) | —                 |
| idBienThe       | BIGINT(16)  | PK, FK | NOT NULL |        | → ChiTietDonHang (idDonHang, idCuaHang, idBienThe) | —                 |
| soSao           | INT         |        | NOT NULL |        |                                                    | —                 |
| noiDung         | TEXT        |        | NULL     |        |                                                    | —                 |
| anh             | TEXT        |        | NULL     |        |                                                    | —                 |
| thoiGianDanhGia | DATETIME    |        | NOT NULL |        |                                                    | —                 |
| phanHoiShop     | TEXT        |        | NULL     |        |                                                    | —                 |
| thoiGianPhanHoi | DATETIME    |        | NULL     |        |                                                    | —                 |
| updatedAt       | DATETIME    |        | NOT NULL |        |                                                    | CURRENT_TIMESTAMP |

PK ghép: (idDonHang, idCuaHang, idBienThe)

FK ghép: (idDonHang, idCuaHang, idBienThe) → ChiTietDonHang (idDonHang, idCuaHang, idBienThe)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_danhgia`.

| CHECK              | Biểu thức               |
| ------------------ | ----------------------- |
| `ck_danhgia_sosao` | `soSao BETWEEN 1 AND 5` |

| Index (tên lưu trong VPP) | Cột theo thứ tự      | Unique         |
| ------------------------- | -------------------- | -------------- |
| `ix_danhgia_bienthe_sao`  | `idBienThe`, `soSao` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                                                   | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | -------------------------------------------------------------------------------------------------- | -------------- | -------------- | ----------- |
| `EVzKj4WGAqACAweh` | (`idDonHang`, `idCuaHang`, `idBienThe`) → `ChiTietDonHang` (`idDonHang`, `idCuaHang`, `idBienThe`) | Không khai báo | Không khai báo | Có          |

### HoanHang

| Cột             | Kiểu vật lý  | Key    | Null     | Unique | Quan hệ                               | Mặc định          |
| --------------- | ------------ | ------ | -------- | ------ | ------------------------------------- | ----------------- |
| idDonHang       | BIGINT(16)   | PK, FK | NOT NULL |        | → DonHangRieng (idDonHang, idCuaHang) | —                 |
| idCuaHang       | BIGINT(16)   | PK, FK | NOT NULL |        | → DonHangRieng (idDonHang, idCuaHang) | —                 |
| maHoanHang      | VARCHAR(20)  |        | NULL     | U      |                                       | —                 |
| lyDoHoan        | VARCHAR(200) |        | NOT NULL |        |                                       | —                 |
| moTa            | TEXT         |        | NULL     |        |                                       | —                 |
| bangChung       | TEXT         |        | NULL     |        |                                       | —                 |
| trangThai       | VARCHAR(30)  |        | NOT NULL |        |                                       | 'ChoNguoiBan'     |
| thoiGianGui     | DATETIME     |        | NOT NULL |        |                                       | —                 |
| hanPhanHoi      | DATETIME     |        | NOT NULL |        |                                       | —                 |
| thoiGianPhanHoi | DATETIME     |        | NULL     |        |                                       | —                 |
| ketQua          | VARCHAR(30)  |        | NULL     |        |                                       | —                 |
| lyDoTuChoi      | VARCHAR(500) |        | NULL     |        |                                       | —                 |
| cachXuLy        | VARCHAR(30)  |        | NULL     |        |                                       | —                 |
| thoiGianHoanTat | DATETIME     |        | NULL     |        |                                       | —                 |
| updatedAt       | DATETIME     |        | NOT NULL |        |                                       | CURRENT_TIMESTAMP |

PK ghép: (idDonHang, idCuaHang)

FK ghép: (idDonHang, idCuaHang) → DonHangRieng (idDonHang, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_hoanhang`.
- Kiểu liệt kê logic: `trangThai` → `TrangThaiYeuCauHoan`; `ketQua` → `KetQuaXuLy`; `cachXuLy` → `CachXuLy`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                   | Biểu thức                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| `ck_hoanhang_trangthai` | `trangThai IN ('ChoNguoiBan','DaChapNhan','DangTranhChap','HoanTat')` |
| `ck_hoanhang_ketqua`    | `ketQua IS NULL OR ketQua IN ('NguoiMuaThang','NguoiBanThang')`       |
| `ck_hoanhang_cachxuly`  | `cachXuLy IS NULL OR cachXuLy IN ('TuDong','NguoiBan','NhanVien')`    |

| Index (tên lưu trong VPP) | Cột theo thứ tự           | Unique         |
| ------------------------- | ------------------------- | -------------- |
| `ix_hoanhang_tt_han`      | `trangThai`, `hanPhanHoi` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                       | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | ---------------------------------------------------------------------- | -------------- | -------------- | ----------- |
| `UVzKj4WGAqACAweo` | (`idDonHang`, `idCuaHang`) → `DonHangRieng` (`idDonHang`, `idCuaHang`) | Không khai báo | Không khai báo | Có          |

### TranhChap

| Cột                | Kiểu vật lý   | Key    | Null     | Unique | Quan hệ                           | Mặc định          |
| ------------------ | ------------- | ------ | -------- | ------ | --------------------------------- | ----------------- |
| idDonHang          | BIGINT(16)    | PK, FK | NOT NULL |        | → HoanHang (idDonHang, idCuaHang) | —                 |
| idCuaHang          | BIGINT(16)    | PK, FK | NOT NULL |        | → HoanHang (idDonHang, idCuaHang) | —                 |
| maTranhChap        | VARCHAR(20)   |        | NULL     | U      |                                   | —                 |
| idNhanVien         | BIGINT(16)    | FK     | NULL     |        | → NhanVienSan.idNhanVien          | —                 |
| trangThaiTranhChap | VARCHAR(30)   |        | NOT NULL |        |                                   | 'ChoXuLy'         |
| ketQua             | VARCHAR(30)   |        | NULL     |        |                                   | —                 |
| lyDoPhanQuyet      | VARCHAR(1000) |        | NULL     |        |                                   | —                 |
| thoiGianMo         | DATETIME      |        | NOT NULL |        |                                   | —                 |
| thoiDiemPhanXu     | DATETIME      |        | NULL     |        |                                   | —                 |
| updatedAt          | DATETIME      |        | NOT NULL |        |                                   | CURRENT_TIMESTAMP |

PK ghép: (idDonHang, idCuaHang)

FK ghép: (idDonHang, idCuaHang) → HoanHang (idDonHang, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_tranhchap`.
- Kiểu liệt kê logic: `trangThaiTranhChap` → `TrangThaiTranhChap`; `ketQua` → `KetQuaXuLy`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                    | Biểu thức                                                       |
| ------------------------ | --------------------------------------------------------------- |
| `ck_tranhchap_trangthai` | `trangThaiTranhChap IN ('ChoXuLy','DaPhanQuyet')`               |
| `ck_tranhchap_ketqua`    | `ketQua IS NULL OR ketQua IN ('NguoiMuaThang','NguoiBanThang')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự                    | Unique         |
| ------------------------- | ---------------------------------- | -------------- |
| `ix_tranhchap_nv_tt`      | `idNhanVien`, `trangThaiTranhChap` | Không khai báo |
| `ix_tranhchap_tt_mo`      | `trangThaiTranhChap`, `thoiGianMo` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                   | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------------------------------ | -------------- | -------------- | -------------- |
| `MVzKj4WGAqACAwet` | (`idDonHang`, `idCuaHang`) → `HoanHang` (`idDonHang`, `idCuaHang`) | Không khai báo | Không khai báo | Có             |
| `sVzKj4WGAqACAwey` | (`idNhanVien`) → `NhanVienSan` (`idNhanVien`)                      | Không khai báo | Không khai báo | Không khai báo |

### BaoCao

| Cột          | Kiểu vật lý | Key | Null     | Unique | Quan hệ                  | Mặc định          |
| ------------ | ----------- | --- | -------- | ------ | ------------------------ | ----------------- |
| idBaoCao     | BIGINT(16)  | PK  | NOT NULL |        |                          | —                 |
| maBaoCao     | VARCHAR(20) |     | NULL     | U      |                          | —                 |
| idNguoiMua   | BIGINT(16)  | FK  | NOT NULL |        | → NguoiMua.idNguoiMua    | —                 |
| idSanPham    | BIGINT(16)  | FK  | NOT NULL |        | → SanPham.idSanPham      | —                 |
| idNhanVien   | BIGINT(16)  | FK  | NULL     |        | → NhanVienSan.idNhanVien | —                 |
| lyDo         | VARCHAR(30) |     | NOT NULL |        |                          | —                 |
| moTa         | TEXT        |     | NULL     |        |                          | —                 |
| bangChung    | TEXT        |     | NULL     |        |                          | —                 |
| trangThai    | VARCHAR(30) |     | NOT NULL |        |                          | 'ChoXuLy'         |
| thoiGianGui  | DATETIME    |     | NOT NULL |        |                          | —                 |
| ketQua       | VARCHAR(30) |     | NULL     |        |                          | —                 |
| thoiGianDong | DATETIME    |     | NULL     |        |                          | —                 |
| updatedAt    | DATETIME    |     | NOT NULL |        |                          | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_baocao`.
- Kiểu liệt kê logic: `lyDo` → `LyDoViPham`; `trangThai` → `TrangThaiBaoCao`; `ketQua` → `KetQuaBaoCao`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK                 | Biểu thức                                              |
| --------------------- | ------------------------------------------------------ |
| `ck_baocao_lydo`      | `lyDo IN ('HangGia','HangCam','MoTaSai','Khac')`       |
| `ck_baocao_trangthai` | `trangThai IN ('ChoXuLy','DaKetLuan')`                 |
| `ck_baocao_ketqua`    | `ketQua IS NULL OR ketQua IN ('ViPham','KhongViPham')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự           | Unique         |
| ------------------------- | ------------------------- | -------------- |
| `ix_baocao_sanpham`       | `idSanPham`               | Không khai báo |
| `ix_baocao_nguoimua`      | `idNguoiMua`              | Không khai báo |
| `ix_baocao_nv_tt`         | `idNhanVien`, `trangThai` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                              | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------------- | -------------- | -------------- | -------------- |
| `8VzKj4WGAqACAwe1` | (`idNguoiMua`) → `NguoiMua` (`idNguoiMua`)    | Không khai báo | Không khai báo | Không khai báo |
| `CVzKj4WGAqACAwe4` | (`idSanPham`) → `SanPham` (`idSanPham`)       | Không khai báo | Không khai báo | Không khai báo |
| `iVzKj4WGAqACAwe7` | (`idNhanVien`) → `NhanVienSan` (`idNhanVien`) | Không khai báo | Không khai báo | Không khai báo |

### LichSuXuLy

| Cột          | Kiểu vật lý   | Key | Null     | Unique | Quan hệ                            | Mặc định |
| ------------ | ------------- | --- | -------- | ------ | ---------------------------------- | -------- |
| idLichSuXuLy | BIGINT(16)    | PK  | NOT NULL |        |                                    | —        |
| idDonHang    | BIGINT(16)    | FK  | NULL     |        | → TranhChap (idDonHang, idCuaHang) | —        |
| idCuaHang    | BIGINT(16)    | FK  | NULL     |        | → TranhChap (idDonHang, idCuaHang) | —        |
| idBaoCao     | BIGINT(16)    | FK  | NULL     |        | → BaoCao.idBaoCao                  | —        |
| idNhanVien   | BIGINT(16)    | FK  | NOT NULL |        | → NhanVienSan.idNhanVien           | —        |
| hanhDong     | VARCHAR(100)  |     | NOT NULL |        |                                    | —        |
| ghiChu       | VARCHAR(1000) |     | NULL     |        |                                    | —        |
| thoiGian     | DATETIME      |     | NOT NULL |        |                                    | —        |

FK ghép: (idDonHang, idCuaHang) → TranhChap (idDonHang, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_lichsuxuly`.

| CHECK             | Biểu thức                                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `ck_lsxl_loaitru` | `(idDonHang IS NOT NULL AND idCuaHang IS NOT NULL AND idBaoCao IS NULL) OR (idDonHang IS NULL AND idCuaHang IS NULL AND idBaoCao IS NOT NULL)` |

| Index (tên lưu trong VPP) | Cột theo thứ tự                      | Unique         |
| ------------------------- | ------------------------------------ | -------------- |
| `ix_lsxl_tranhchap`       | `idDonHang`, `idCuaHang`, `thoiGian` | Không khai báo |
| `ix_lsxl_baocao`          | `idBaoCao`, `thoiGian`               | Không khai báo |
| `ix_lsxl_nhanvien`        | `idNhanVien`                         | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                    | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `SVzKj4WGAqACAwe.` | (`idDonHang`, `idCuaHang`) → `TranhChap` (`idDonHang`, `idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |
| `KVzKj4WGAqACAwfD` | (`idBaoCao`) → `BaoCao` (`idBaoCao`)                                | Không khai báo | Không khai báo | Không khai báo |
| `qVzKj4WGAqACAwfG` | (`idNhanVien`) → `NhanVienSan` (`idNhanVien`)                       | Không khai báo | Không khai báo | Không khai báo |

## e) Tương tác và marketing

### CuocTroChuyen

| Cột             | Kiểu vật lý | Key    | Null     | Unique | Quan hệ               | Mặc định          |
| --------------- | ----------- | ------ | -------- | ------ | --------------------- | ----------------- |
| idNguoiMua      | BIGINT(16)  | PK, FK | NOT NULL |        | → NguoiMua.idNguoiMua | —                 |
| idCuaHang       | BIGINT(16)  | PK, FK | NOT NULL |        | → CuaHang.idCuaHang   | —                 |
| thoiGianTinCuoi | DATETIME    |        | NULL     |        |                       | —                 |
| createdAt       | DATETIME    |        | NOT NULL |        |                       | CURRENT_TIMESTAMP |
| updatedAt       | DATETIME    |        | NOT NULL |        |                       | CURRENT_TIMESTAMP |

PK ghép: (idNguoiMua, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_cuoctrochuyen`.

| Index (tên lưu trong VPP) | Cột theo thứ tự                 | Unique         |
| ------------------------- | ------------------------------- | -------------- |
| `ix_cuoctc_shop_time`     | `idCuaHang`, `thoiGianTinCuoi`  | Không khai báo |
| `ix_cuoctc_mua_time`      | `idNguoiMua`, `thoiGianTinCuoi` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                           | ON DELETE      | ON UPDATE      | Identifying |
| ------------------ | ------------------------------------------ | -------------- | -------------- | ----------- |
| `aVzKj4WGAqACAwfJ` | (`idNguoiMua`) → `NguoiMua` (`idNguoiMua`) | Không khai báo | Không khai báo | Có          |
| `6VzKj4WGAqACAwfM` | (`idCuaHang`) → `CuaHang` (`idCuaHang`)    | Không khai báo | Không khai báo | Có          |

### TinNhan

| Cột        | Kiểu vật lý | Key | Null     | Unique | Quan hệ                                 | Mặc định |
| ---------- | ----------- | --- | -------- | ------ | --------------------------------------- | -------- |
| idTinNhan  | BIGINT(16)  | PK  | NOT NULL |        |                                         | —        |
| idNguoiMua | BIGINT(16)  | FK  | NOT NULL |        | → CuocTroChuyen (idNguoiMua, idCuaHang) | —        |
| idCuaHang  | BIGINT(16)  | FK  | NOT NULL |        | → CuocTroChuyen (idNguoiMua, idCuaHang) | —        |
| noiDung    | TEXT        |     | NOT NULL |        |                                         | —        |
| thoiGian   | DATETIME    |     | NOT NULL |        |                                         | —        |
| benGui     | VARCHAR(30) |     | NOT NULL |        |                                         | —        |
| daDoc      | BOOLEAN     |     | NOT NULL |        |                                         | FALSE    |

FK ghép: (idNguoiMua, idCuaHang) → CuocTroChuyen (idNguoiMua, idCuaHang)

**Ràng buộc và index trong VPP**

- Tên PK: `pk_tinnhan`.
- Kiểu liệt kê logic: `benGui` → `BenGui`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK               | Biểu thức                          |
| ------------------- | ---------------------------------- |
| `ck_tinnhan_bengui` | `benGui IN ('NguoiMua','CuaHang')` |

| Index (tên lưu trong VPP) | Cột theo thứ tự                       | Unique         |
| ------------------------- | ------------------------------------- | -------------- |
| `ix_tinnhan_cuoc_time`    | `idNguoiMua`, `idCuaHang`, `thoiGian` | Không khai báo |
| `ix_tinnhan_chuadoc`      | `idNguoiMua`, `idCuaHang`, `daDoc`    | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                                                          | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | ------------------------------------------------------------------------- | -------------- | -------------- | -------------- |
| `GVzKj4WGAqACAwfP` | (`idNguoiMua`, `idCuaHang`) → `CuocTroChuyen` (`idNguoiMua`, `idCuaHang`) | Không khai báo | Không khai báo | Không khai báo |

### ThongBao

| Cột              | Kiểu vật lý  | Key | Null     | Unique | Quan hệ                 | Mặc định |
| ---------------- | ------------ | --- | -------- | ------ | ----------------------- | -------- |
| idThongBao       | BIGINT(16)   | PK  | NOT NULL |        |                         | —        |
| idNguoiDung      | BIGINT(16)   | FK  | NOT NULL |        | → NguoiDung.idNguoiDung | —        |
| loai             | VARCHAR(30)  |     | NOT NULL |        |                         | —        |
| tieuDe           | VARCHAR(200) |     | NOT NULL |        |                         | —        |
| noiDung          | TEXT         |     | NOT NULL |        |                         | —        |
| daDoc            | BOOLEAN      |     | NOT NULL |        |                         | FALSE    |
| thoiGianGui      | DATETIME     |     | NOT NULL |        |                         | —        |
| doiTuongLienQuan | VARCHAR(50)  |     | NULL     |        |                         | —        |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_thongbao`.
- Kiểu liệt kê logic: `loai` → `LoaiThongBao`. Kiểu vật lý và CHECK giữ theo VPP.

| CHECK              | Biểu thức                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| `ck_thongbao_loai` | `loai IN ('DonHang','ThanhToan','HoanTien','TranhChap','TinNhan','HeThong')` |

| Index (tên lưu trong VPP)  | Cột theo thứ tự                       | Unique         |
| -------------------------- | ------------------------------------- | -------------- |
| `ix_thongbao_user_chuadoc` | `idNguoiDung`, `daDoc`, `thoiGianGui` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                              | ON DELETE | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------------- | --------- | -------------- | -------------- |
| `WVzKj4WGAqACAwfU` | (`idNguoiDung`) → `NguoiDung` (`idNguoiDung`) | Cascade   | Không khai báo | Không khai báo |

### Banner

| Cột        | Kiểu vật lý  | Key | Null     | Unique | Quan hệ                  | Mặc định          |
| ---------- | ------------ | --- | -------- | ------ | ------------------------ | ----------------- |
| idBanner   | BIGINT(16)   | PK  | NOT NULL |        |                          | —                 |
| idNhanVien | BIGINT(16)   | FK  | NOT NULL |        | → NhanVienSan.idNhanVien | —                 |
| tieuDe     | VARCHAR(200) |     | NOT NULL |        |                          | —                 |
| anh        | VARCHAR(255) |     | NOT NULL |        |                          | —                 |
| thuTu      | INT          |     | NOT NULL |        |                          | —                 |
| batDau     | DATETIME     |     | NOT NULL |        |                          | —                 |
| ketThuc    | DATETIME     |     | NOT NULL |        |                          | —                 |
| dangHien   | BOOLEAN      |     | NOT NULL |        |                          | TRUE              |
| createdAt  | DATETIME     |     | NOT NULL |        |                          | CURRENT_TIMESTAMP |
| updatedAt  | DATETIME     |     | NOT NULL |        |                          | CURRENT_TIMESTAMP |

**Ràng buộc và index trong VPP**

- Tên PK: `pk_banner`.

| CHECK                | Biểu thức          |
| -------------------- | ------------------ |
| `ck_banner_thoigian` | `ketThuc > batDau` |

| Index (tên lưu trong VPP) | Cột theo thứ tự                          | Unique         |
| ------------------------- | ---------------------------------------- | -------------- |
| `ix_banner_hien`          | `dangHien`, `thuTu`, `batDau`, `ketThuc` | Không khai báo |

| FK (ID trong VPP)  | Cột nguồn → đích                              | ON DELETE      | ON UPDATE      | Identifying    |
| ------------------ | --------------------------------------------- | -------------- | -------------- | -------------- |
| `2VzKj4WGAqACAwfX` | (`idNhanVien`) → `NhanVienSan` (`idNhanVien`) | Không khai báo | Không khai báo | Không khai báo |

## Kiểu liệt kê

| Tên                   | Giá trị                                                                            |
| --------------------- | ---------------------------------------------------------------------------------- |
| GioiTinh              | Nam, Nu, Khac                                                                      |
| VaiTro                | NguoiMua, NguoiBan, NhanVien                                                       |
| TrangThaiTaiKhoan     | HoatDong, BiKhoa                                                                   |
| HangThanhVien         | Dong, Bac, Vang, KimCuong                                                          |
| LoaiThue              | CaNhan, HoKinhDoanh, DoanhNghiep                                                   |
| TrangThaiXacMinh      | ChuaNop, ChoDuyet, DaXacMinh, TuChoi                                               |
| TrangThaiVi           | HoatDong, BiKhoa                                                                   |
| TrangThaiCuaHang      | HoatDong, TamDong, BiKhoa                                                          |
| TrangThaiSanPham      | Hien, An, Khoa                                                                     |
| LoaiGiam              | PhanTram, SoTien                                                                   |
| TrangThaiVoucher      | DangChay, TamDung                                                                  |
| LoaiDiaChi            | NhaRieng, VanPhong                                                                 |
| PhuongThucThanhToan   | Vi, QR, COD                                                                        |
| TrangThaiThanhToan    | Cho, ThanhCong, ThatBai, Huy                                                       |
| TrangThaiDonHangRieng | ChoXacNhan, DangChuanBi, DangGiao, DaGiao, DaNhan, DaHuy, DangHoanHang, DaHoanTien |
| NguoiXacNhan          | NguoiMua, HeThong                                                                  |
| TrangThaiHoanTien     | Khong, ChoKichHoatVi, DaHoan, QuaHan                                               |
| LoaiGiaoDichVi        | Nap, Rut, ThanhToan, NhanTien, PhiSan, HoanTien                                    |
| TrangThaiGiaoDich     | DangXuLy, ThanhCong, ThatBai                                                       |
| TrangThaiYeuCauHoan   | ChoNguoiBan, DaChapNhan, DangTranhChap, HoanTat                                    |
| KetQuaXuLy            | NguoiMuaThang, NguoiBanThang                                                       |
| CachXuLy              | TuDong, NguoiBan, NhanVien                                                         |
| TrangThaiTranhChap    | ChoXuLy, DaPhanQuyet                                                               |
| LyDoViPham            | HangGia, HangCam, MoTaSai, Khac                                                    |
| TrangThaiBaoCao       | ChoXuLy, DaKetLuan                                                                 |
| KetQuaBaoCao          | ViPham, KhongViPham                                                                |
| BenGui                | NguoiMua, CuaHang                                                                  |
| LoaiThongBao          | DonHang, ThanhToan, HoanTien, TranhChap, TinNhan, HeThong                          |
