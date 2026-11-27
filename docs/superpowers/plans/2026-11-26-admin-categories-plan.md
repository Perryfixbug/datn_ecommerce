# Module danh mục toàn sàn A-017

Thiết kế được duyệt: QuanTriVien ghi; KiemDuyetVien/NhanVienVanHanh chỉ đọc.
Danh sách phẳng có parentId để dựng cây, cursor ID giảm dần, limit 20–100.
Tạo/cập nhật gửi name và parentId (null là gốc), tên trim; trùng tên chính xác trong cùng cấp bị chặn.
Cấm tự làm cha và chu trình; không xóa khi còn con hoặc sản phẩm.
Không ghi audit danh mục theo yêu cầu cập nhật; giữ transaction Serializable bảo vệ bất biến.
Kiểm tra trùng cấp gốc bằng predicate trong transaction Serializable để chống tạo trùng đồng thời.
Không chạy migration/seed, không thêm provider hoặc chuyển sản phẩm tự động.

- [x] TypeSpec/codegen; bỏ schema và migration audit danh mục chưa áp dụng.
- [x] Module/guard/controller/service.
- [x] Test gộp sau khi viết xong; typecheck/lint/build và tài liệu/lịch sử.

Kết quả: 86/86 test, 10/10 suite đạt trong một lượt chạy gộp.
Typecheck toàn monorepo, lint/build API, Prettier, Changesets và git diff --check đạt.
Chưa áp dụng migration/seed hoặc kiểm chứng integration PostgreSQL/rollback thực tế.
