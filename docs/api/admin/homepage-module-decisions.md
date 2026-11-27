# Module trang chủ A-018–A-028

Theo yêu cầu tiếp tục sau khi người dùng đã reset DB và seed ngày 26/11/2026.
Không chạy lại reset/seed và không tự áp dụng migration mới.

## Cấu trúc và quyền

HomepageConfig singleton id=1 chứa draft, published, version, publishedVersion, publishedAt.
JSON được kiểm tra bằng hợp đồng TypeSpec/generated Zod, không có schema HTTP viết tay riêng.
Bảng Banner cũ không sử dụng trong module mới, không tự chuyển hoặc xóa dữ liệu cũ.
QuanTriVien đọc/chỉnh sửa/xuất bản; NhanVienVanHanh đọc/chỉnh draft; KiemDuyetVien đọc/preview.
Các chức vụ khác bị từ chối; kiểm tra trạng thái/chức vụ hiện tại từ DB qua guards.

## Hợp đồng

Nguồn chuẩn packages/api-spec/typespec/admin-homepage.tsp, interface Homepage trong admin.tsp.
Prefix /api/v1/admin/homepage; GET cấu hình, GET /preview?at=ISO8601.
CRUD POST/PATCH/DELETE cho banners, ads, category-sections; PATCH/DELETE nhận itemId.
POST /order nhận toàn bộ itemIds; POST /publish nhận version.
POST/PATCH gửi version trong body; DELETE gửi version trong query. Mọi lệnh ghi kiểm tra
version toàn cấu hình và tăng một lần khi thành công, bao gồm publish; stale/retry trả 409.
PATCH thay thế đầy đủ dữ liệu thành phần. Thành công 200; lỗi 400/401/403/404/409/500.

Tối đa 100 thành phần, thứ tự hiển thị là thứ tự mảng. Reorder phải chứa đúng một lần
mỗi ID trong draft, không thiếu/thừa/trùng. ID là chuỗi số nguyên dương trong miền bigint.
Banner/ad có title, imageUrl, targetUrl, enabled, startsAt/endsAt nullable.
Media là HTTPS (có phần đường dẫn) hoặc đường dẫn nội bộ, target chỉ đường dẫn nội bộ;
cấm protocol-relative, credential trong URL, backslash và ký tự điều khiển. Không fetch URL,
không upload hoặc chọn storage provider. Client vẫn phải escape text và render URL an toàn.
Category-section có title và 1–30 categoryIds không trùng, phải tồn tại trong DanhMuc.
Tên dài 1–200 trước trim, không chỉ khoảng trắng. Bắt đầu phải trước kết thúc khi có cả hai.
Preview chỉ trả enabled và thời điểm thuộc [startsAt, endsAt); không truyền at dùng giờ server.

## Xuất bản và audit

CRUD/reorder không ghi audit. Publish kiểm tra lại toàn draft và danh mục tham chiếu,
copy snapshot published rồi ghi AuditLog resourceType=homepage/action=publish cùng transaction
Serializable. Snapshot không đổi khi sửa/xóa draft về sau. Giữ snapshot hiện tại, chưa có
lịch sử đầy đủ hoặc API rollback; muốn quay lại nội dung cũ phải chỉnh draft và xuất bản lại.
Không tự gửi thông báo hoặc thêm scheduler/cache/provider.
Không có API storefront đọc trang chủ trong phạm vi Admin API này.

## Vận hành

Migration 20261126030000_add_homepage tạo bảng và bản ghi rỗng phiên bản 0.
Chủ dự án áp dụng trước khi dùng module; thiếu bản ghi cấu hình trả 404, không tự tạo khi GET.
Không đổi dữ liệu seed hiện có. Kiểm thử HTTP dùng DB mock và mô phỏng rollback,
không chứng minh isolation/rollback/ràng buộc trên PostgreSQL thật.
