# Module gian hàng

Thiết kế đã duyệt: quyền theo chức vụ, cursor ID giảm dần, duyệt hồ sơ
người bán dùng chung, mở khóa về TamDong. Audit/thông báo cùng transaction.
Không chạy migration/seed. Viết xong module rồi chạy test gộp.

- [x] TypeSpec/codegen và Prisma audit.
- [x] Guard, controller, service.
- [x] Test, typecheck, lint và tài liệu.

Kết quả: lượt test API đầu đạt 37/38, suite health lỗi dependency ConfigModule
của auth có sẵn. Sau sửa import và mock hạ tầng, chạy lại health đạt 1/1.
Typecheck toàn monorepo, lint API, build API và changeset status đạt.
Chưa áp dụng migration; chưa chạy integration PostgreSQL hoặc kiểm chứng rollback thực tế.
