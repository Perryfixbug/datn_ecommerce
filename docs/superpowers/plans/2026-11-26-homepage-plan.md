# Module trang chủ A-018–A-028

Triển khai theo yêu cầu tiếp tục; người dùng đã reset/seed, không lặp các lệnh đó.
Không tự áp dụng migration mới, không chỉnh Docker/provider.

Singleton HomepageConfig chứa JSON draft/published, version tăng sau mỗi chỉnh sửa.
Config giới hạn 100 thành phần, ba loại banner/ad/category-section; thứ tự là thứ tự mảng.
Media HTTPS hoặc đường dẫn nội bộ, target chỉ đường dẫn nội bộ; lịch bắt đầu/kết thúc nullable.
QuanTriVien chỉnh sửa và publish; NhanVienVanHanh chỉnh draft; KiemDuyetVien đọc/preview.
Publish kiểm tra draft, snapshot nguyên tử và ghi AuditLog; CRUD không audit.
Preview lọc enabled và lịch [startsAt, endsAt) tại at hoặc giờ server.
Không sửa bảng Banner cũ, không upload/rollback API hoặc storefront endpoint trong phạm vi này.

- [x] TypeSpec/codegen, schema và migration singleton.
- [x] Module, guard, service và controller theo schema generated.
- [x] Test gộp sau khi xong module; typecheck/lint/build và tài liệu/Changeset/prompt history.

Lượt test gộp đạt 97/97 test, 11/11 suite. Typecheck toàn monorepo, build API và Changesets đạt.
Lint ban đầu lỗi regex control-character; sửa kiểm tra mã ký tự và lint lại đạt.
Chưa áp dụng migration homepage, chưa integration PostgreSQL hoặc smoke test server thật.
