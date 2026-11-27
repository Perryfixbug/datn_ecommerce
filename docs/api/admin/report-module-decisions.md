# Quyết định A-032: kết luận báo cáo sản phẩm

Phạm vi được người dùng xác nhận ngày 26/11/2026. Chỉ xử lý BaoCao sản phẩm hiện có, không mở rộng báo cáo gian hàng/người dùng.

## HTTP và quyền

- POST /api/v1/admin/reports/{reportId}/resolution, thành công trả 200.
- Bearer access token; tài khoản nhân viên phải đang hoạt động. QuanTriVien và KiemDuyetVien được kết luận; NhanVienVanHanh chỉ đọc qua A-029/A-030, không được gọi thao tác này.
- reportId là chuỗi bigint dương không quá 9223372036854775807.
- Body gồm outcome ViPham/KhongViPham và reason bắt buộc, không chỉ chứa khoảng trắng, tối đa 1000 ký tự. Lý do được trim trước khi lưu.
- Response gồm reportId, status DaKetLuan, outcome, reason, handlerId và closedAt (ISO 8601 UTC).

## Transaction và dữ liệu

Chỉ chuyển ChoXuLy sang DaKetLuan. Transaction Serializable cập nhật có điều kiện trạng thái, ghi kết quả/nhân viên/thời gian đóng vào BaoCao, ghi kết quả và lý do vào LichSuXuLy, tạo ThongBao loại HeThong cho người mua đã gửi báo cáo. Ghi thất bại ở bất kỳ bước nào đều rollback. Báo cáo đã kết luận hoặc xung đột transaction trả 409, không lặp lịch sử/thông báo.

Không tạo AuditLog trùng lịch sử, không tự ẩn sản phẩm, khóa tài khoản/cửa hàng, hoàn tiền hay gọi provider. Không thay đổi trạng thái của báo cáo khác hoặc sản phẩm liên quan. Không cần migration mới.

A-030 tiếp tục hiển thị kết quả và lịch sử báo cáo; lý do kết luận nằm tại history[].reason, không thêm cột lý do vào BaoCao. Trạng thái tổng hợp DaXuLy ánh xạ từ DaKetLuan.

## Lỗi và triển khai

Envelope lỗi chung: 400 VALIDATION_ERROR, 401 token thiếu/sai/tài khoản không hoạt động, 403 không đủ quyền, 404 báo cáo không tồn tại, 409 đã kết luận/xung đột, 500 lỗi nội bộ che chi tiết DB.

- TypeSpec: packages/api-spec/typespec/admin-reports.tsp; operation Furniture.Admin.Reports.resolveAdminReport.
- NestJS: apps/api/src/modules/admin-reports; được đăng ký tại AppModule.
- HTTP tests: apps/api/test/admin-reports.spec.ts, Prisma mock; không khẳng định kiểm thử tích hợp PostgreSQL thực.
- Migration 20261126040000_add_complaints của A-029–A-031 đã áp dụng thành công; migrate status xác nhận database cập nhật đủ 6 migration trước khi triển khai A-032. Không reset hoặc seed lại.
