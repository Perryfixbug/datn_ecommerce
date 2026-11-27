# Module kiểm duyệt sản phẩm A-013–A-016

Theo yêu cầu triển khai tiếp, giữ nguyên thay đổi các module trước.
Không chạy migration/seed; không thêm dependency/provider ngoài.

QuanTriVien/KiemDuyetVien được đọc và duyệt; NhanVienVanHanh chỉ đọc.
Hàng đợi mặc định ChoDuyet, lọc status/storeId/search, cursor ID giảm dần, limit 20–100.
moderationStatus tách khỏi Hien/An/Khoa, chỉ ChoDuyet → DaDuyet/TuChoi.
Request quyết định bắt buộc version để tránh xét duyệt nội dung cũ; từ chối cần reason.
Migration đưa sản phẩm cũ vào ChoDuyet, không tự phê duyệt hoặc đổi visibility.
Ghi kết quả, audit và thông báo cùng transaction Serializable, retry/xung đột trả 409.
Không thêm API người bán/chỉnh sửa/nộp lại; các luồng đó khi triển khai phải tăng version và đặt ChoDuyet.

- [x] TypeSpec/codegen và Prisma/migration.
- [x] Guard, controller/service, mapper trả hợp đồng generated.
- [x] Viết xong module rồi test gộp, typecheck/lint/build, tài liệu và prompt history.

Kết quả: 72/72 test, 9/9 suite đạt trong một lượt chạy gộp.
Typecheck toàn monorepo, lint API, build API, Prettier và Changesets đạt.
Không áp dụng migration/seed, chưa kiểm chứng integration PostgreSQL và smoke test server thật.
