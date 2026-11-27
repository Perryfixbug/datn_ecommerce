# Module danh mục toàn sàn A-017

Theo phương án người dùng duyệt ngày 26/11/2026; thay các mục blocked/TBD của A-017.

## Quyền và hợp đồng

QuanTriVien tạo/sửa/xóa; KiemDuyetVien và NhanVienVanHanh chỉ đọc.
Chức vụ khác hoặc người mua/người bán bị từ chối. Dùng access token và trạng thái/chức vụ DB hiện tại.
Nguồn chuẩn packages/api-spec/typespec/admin-categories.tsp và interface Categories trong admin.tsp.

GET /api/v1/admin/catalog/categories trả danh sách phẳng có parentId để dựng cây.
Cursor ID giảm dần; limit mặc định 20, tối đa 100. Tùy chọn parentId lọc con trực tiếp;
không truyền parentId thì đọc mọi cấp, search tên không phân biệt hoa thường.
Total theo bộ lọc không theo cursor; không có endpoint cây không phân trang riêng.

POST cùng path tạo danh mục, PATCH /{categoryId} cập nhật, DELETE /{categoryId} xóa.
POST/PATCH gửi name và parentId bắt buộc (null là gốc); PATCH là cập nhật tên và cha mong muốn.
Tên 1–100 ký tự trước trim, không chỉ khoảng trắng. ID nguyên dương trong miền PostgreSQL bigint.
Thành công 200; lỗi validation 400, token 401, thiếu quyền 403, danh mục/cha không tồn tại 404,
trùng tên/chu trình/tham chiếu/cạnh tranh 409, lỗi nội bộ 500 theo envelope chung.

## Bất biến

Tên lưu đã trim, so trùng chính xác (phân biệt hoa thường) trong cùng cấp kể cả cấp gốc.
Không tự làm cha; không chuyển vào hậu duệ hoặc nhánh cha đang có chu trình.
Không xóa danh mục còn con hoặc bất kỳ sản phẩm nào tham chiếu; không tự di chuyển/xóa sản phẩm.
Không thay dữ liệu giao dịch cũ. Thay đổi tên/cha không đổi nhân viên tạo ban đầu.

Mỗi thao tác ghi dùng transaction Serializable gồm kiểm tra bất biến và ghi danh mục.
Danh mục không cần audit riêng. Kiểm tra predicate cùng cấp gốc để chặn tạo trùng đồng thời qua API;
serialization failure trả 409, không tự retry. Unique cha/tên hiện có vẫn giữ nguyên.
Ghi trực tiếp DB ngoài API không được bảo vệ bởi predicate ứng dụng ở cấp gốc.
Không gửi thông báo do không có đối tượng nhận cụ thể; không thêm email/provider ngoài.
DELETE lặp sau khi xóa trả 404; POST chưa có Idempotency-Key, trùng tên trả 409.

## Vận hành và kiểm thử

Module danh mục không bổ sung bảng hoặc migration riêng; migration audit chưa áp dụng đã được bỏ.
Không chạy migration/seed hoặc sửa dữ liệu có sẵn trong đợt triển khai.
Test HTTP dùng DB mock và mô phỏng transaction; chưa chứng minh rollback/isolation hoặc
truy vấn/ràng buộc trên PostgreSQL thật. Cần DB test riêng để kiểm chứng cạnh tranh tạo trùng/chuyển cha.
