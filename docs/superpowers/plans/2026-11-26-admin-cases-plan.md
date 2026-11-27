# Kế hoạch A-029–A-031

Thiết kế đã được người dùng đồng ý: tổng hợp khiếu nại, báo cáo sản phẩm và tranh chấp hoàn hàng; chỉ xử lý khiếu nại ở A-031.

1. Thêm hợp đồng TypeSpec, model KhieuNai và migration mở rộng LichSuXuLy; chưa áp dụng migration.
2. Sinh hợp đồng/client; thêm module NestJS với guard, validation, truy vấn phân trang ổn định và transaction xử lý khiếu nại.
3. Hoàn thành kiểm thử HTTP trọng tâm rồi chạy một lượt kiểm thử toàn API; kiểm tra typecheck, lint, build.
4. Cập nhật tài liệu API, changeset và lịch sử prompt theo kết quả thực tế.

Danh sách dùng thứ tự caseId tăng dần theo collation C, cursor độc lập với trạng thái cập nhật; total không phụ thuộc cursor. Chỉ chọn tên và ID người gửi, không đọc hồ sơ riêng tư. Xử lý khiếu nại dùng Serializable, kiểm tra trạng thái, lưu kết quả/lý do/nhân viên, lịch sử và thông báo trong cùng transaction.
