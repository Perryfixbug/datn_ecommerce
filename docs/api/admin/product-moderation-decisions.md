# Module kiểm duyệt sản phẩm A-013–A-016

Triển khai theo yêu cầu tiếp tục ngày 26/11/2026. Các quyết định dưới đây thay mục TBD
của A-013–A-016; không thay chính sách module khác.

## Quyền và hợp đồng

QuanTriVien/KiemDuyetVien đọc và xét duyệt; NhanVienVanHanh chỉ đọc.
Các chức vụ khác, người mua/người bán bị từ chối. Dùng AccessTokenGuard hiện có,
kiểm tra tài khoản hoạt động và chức vụ hiện tại trong DB.

Nguồn chuẩn packages/api-spec/typespec/admin-product-moderation.tsp và interface
ProductModeration trong admin.tsp. Prefix /api/v1/admin/product-moderation:
GET danh sách, GET /{productId}, POST /{productId}/approval, POST /{productId}/rejection.
Thành công 200; validation 400, token 401, thiếu quyền 403, không tồn tại 404,
sai trạng thái/phiên bản/cạnh tranh 409, lỗi nội bộ 500 theo envelope chung.

Danh sách mặc định status=ChoDuyet; lọc status, storeId, search tên/mã không phân biệt
hoa thường. Cursor ID giảm dần; limit mặc định 20, tối đa 100; total không theo cursor.
Chi tiết gồm nội dung, ảnh lưu nguyên định dạng text hiện tại, phân loại, danh mục và biến thể.
Giá VND nguyên dùng chuỗi bảo toàn Decimal. Không trả dữ liệu riêng tư người bán.

## Trạng thái

moderationStatus tách riêng visibility Hien/An/Khoa, gồm ChoDuyet/DaDuyet/TuChoi.
Chỉ ChoDuyet được duyệt hoặc từ chối; cả hai bắt buộc version đã đọc.
Version là số nguyên 0–2147483646, tăng sau quyết định; sai version trả 409.
Từ chối bắt buộc lý do 1–500 ký tự trước trim, không chỉ khoảng trắng; lưu đã trim.
Duyệt xóa lý do từ chối. Ghi reviewedAt/updatedAt, không sửa visibility/giá/tồn kho.
Kết quả, AuditLog và ThongBao HeThong ghi trong transaction Serializable.
Retry sai trạng thái không ghi thêm side effect. Không dùng Idempotency-Key hoặc email/provider ngoài.

Module này chưa có chỉnh sửa/nộp lại sản phẩm phía người bán. Khi triển khai các luồng đó,
mọi thay đổi nội dung liên quan phải tăng moderationVersion và đặt lại ChoDuyet;
không cho client tự quyết định đã duyệt. Đơn hàng/dữ liệu giao dịch cũ không thay đổi.

## Vận hành

Migration 20261126010000_add_admin_schema và 20261126020000_add_audit_log chỉ được tạo file, không tự áp dụng.
Sản phẩm cũ được đưa vào ChoDuyet; không tự phê duyệt, không đổi visibility.
Catalog công khai hiện chưa triển khai; sau này phải lọc đồng thời DaDuyet và Hien,
cùng các điều kiện hoạt động gian hàng/người bán. Không coi visibility Hien là đã được duyệt.
Chưa có DB test riêng: mock transaction không chứng minh rollback/isolation PostgreSQL thật.
