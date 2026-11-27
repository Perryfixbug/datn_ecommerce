# Quyết định module tài khoản A-008–A-012

Triển khai tiếp theo kế hoạch người dùng xác nhận ngày 26/11/2026.
Tài liệu này thay các mục TBD của A-008–A-012; các module khác không thay đổi.

## Quyền và phạm vi

QuanTriVien đọc mọi tài khoản, khóa/mở khóa người mua/người bán.
NhanVienVanHanh chỉ đọc người mua/người bán; KiemDuyetVien và chức vụ khác không có quyền.
Không đổi trạng thái bản thân hoặc bất kỳ tài khoản nhân viên nào qua module này.
Danh sách, total và chi tiết đều có điều kiện phạm vi tại truy vấn DB.
Tài nguyên ngoài phạm vi đọc trả 404, thao tác không có quyền trả 403.

## Hợp đồng

Nguồn chuẩn packages/api-spec/typespec/admin-accounts.tsp, interface Accounts trong admin.tsp.
GET /api/v1/admin/accounts và /{accountId}; POST /{accountId}/lock, /{accountId}/unlock.
Tìm tên/email/điện thoại, không phân biệt hoa thường với tên/email, lọc role/status.
Cursor ID giảm dần; limit mặc định 20, tối đa 100. Total không bị giới hạn bởi cursor.
ID chuỗi số nguyên dương trong miền PostgreSQL bigint. Lý do cả khóa/mở khóa bắt buộc,
không chỉ khoảng trắng, dài 1–500 ký tự trước trim; lưu lý do đã trim.
Response chỉ gồm ID/tên/email/điện thoại/vai trò/trạng thái/thời gian;
không trả mật khẩu, token, authVersion, CCCD, ví hoặc địa chỉ giao hàng.
Thành công trả 200; lỗi 400/401/403/404/409/500 theo error envelope.

## Trạng thái và phiên

Khóa HoatDong → BiKhoa; mở khóa BiKhoa → HoatDong. Sai trạng thái/retry trả 409.
Transaction Serializable ghi trạng thái, AuditLog và ThongBao HeThong.
Khi khóa: tăng authVersion, thu hồi mọi refresh token chưa bị thu hồi trong cùng transaction.
Không thay đổi đơn hàng, sản phẩm, trạng thái cửa hàng hoặc dữ liệu giao dịch cũ.
Không gọi email/provider ngoài, không dùng Idempotency-Key trong đợt này.

AccessTokenGuard kiểm tra trạng thái, vai trò và authVersion hiện tại từ DB cho mọi route
được bảo vệ. Token cũ không hợp lệ sau khi khóa rồi mở khóa. JWT chưa có authVersion
cũng bị từ chối; người dùng cần đăng nhập lại sau khi cập nhật.
Login/refresh khóa bản ghi người dùng bằng update có điều kiện trạng thái/authVersion
trước ghi refresh token trong transaction, tránh cấp phiên mới vượt qua thao tác khóa.
Request đã vượt qua guard trước lúc khóa có thể đang chạy; không hủy request đang thực thi.

## Vận hành và kiểm chứng

Chủ dự án phải áp dụng migration 20261126010000_add_admin_schema và 20261126020000_add_audit_log trước khi chạy phiên bản này,
vì auth cũng đọc cột authVersion. Không chạy migration/seed trong quá trình triển khai.
Không có DB test riêng: test dùng mock tại biên DB và mô phỏng transaction;
không coi đó là bằng chứng isolation, rollback hay truy vấn phân quyền trên PostgreSQL thật.
