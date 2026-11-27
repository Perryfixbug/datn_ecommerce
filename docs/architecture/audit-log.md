# Audit log dùng chung

AuditLog thay StoreAuditEvent, AccountAuditEvent và ProductModerationEvent.
resourceType là store/account/product, resourceId là ID đối tượng, actorId tham chiếu nhân viên.
action, previousStatus, nextStatus và reason lưu quyết định; metadata.version dùng cho kiểm duyệt.
Không lưu credential, CCCD hoặc toàn bộ hồ sơ cá nhân vào metadata.
Không FK tới đối tượng để giữ log khi đối tượng bị xóa; danh mục không ghi audit.
Mỗi module ghi trực tiếp bằng transaction hiện có, không thêm service/repository audit chung.

Theo yêu cầu reset local, các migration audit lẻ và migration gộp đã được bỏ.
Migration 20261126010000_add_admin_schema bổ sung authVersion và trạng thái kiểm duyệt;
20261126020000_add_audit_log tạo thẳng AuditLog, không tạo hoặc chuyển dữ liệu từ bảng audit riêng.
Lịch sử mới dùng cho reset local; không áp dụng trực tiếp lên môi trường có lịch sử migration cũ.
LichSuXuLy là lịch sử xử lý tranh chấp/báo cáo nghiệp vụ, không thuộc ba bảng audit kỹ thuật này.

Người dùng đã cho phép reset DB local. scripts/reset-local-db.mjs chỉ chấp nhận
PostgreSQL localhost, database furniture_ecommerce, schema public; không chạy seed.
Lần reset trong đợt này bị chặn vì PostgreSQL 127.0.0.1:55432 trả ECONNREFUSED.
Chưa xác minh migration trên PostgreSQL thật, chưa tạo lại schema thành công.
