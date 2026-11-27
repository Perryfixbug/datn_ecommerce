# Module tài khoản A-008–A-012

Thực hiện theo xác nhận tiếp tục triển khai; không chạy migration/seed hoặc thêm dependency.
QuanTriVien đọc mọi tài khoản và khóa/mở người mua/người bán.
NhanVienVanHanh chỉ đọc người mua/người bán. Không đổi trạng thái bản thân hoặc nhân viên.
Tìm tên/email/điện thoại, lọc role/status, cursor ID giảm dần, limit 20–100.
Không trả credential, CCCD, ví, địa chỉ giao hàng. Khóa/mở cần reason 1–500 ký tự không trắng.
Transaction Serializable ghi trạng thái, audit, thông báo và thu hồi refresh token khi khóa.
authVersion tăng khi khóa, guard so DB; token cũ không sống lại khi mở khóa.
Login/refresh dùng transaction cùng phiên bản để chống cạnh tranh với thao tác khóa.

- [x] TypeSpec/codegen và schema/migration audit, authVersion.
- [x] Module accounts và cập nhật auth/caller liên quan.
- [x] Chạy test gộp sau khi xong module, typecheck/build và tài liệu.

Kiểm thử API: 55/55 test, 8/8 suite đạt. Typecheck toàn monorepo và build API đạt.
Lint lượt đầu báo tham số mock không sử dụng; đã bỏ tham số và lint lại đạt.
Prettier, git diff --check và changeset status đạt.
Chưa chạy migration, integration PostgreSQL hoặc smoke test server thật.

Test mock không chứng minh isolation/rollback PostgreSQL thực tế.
