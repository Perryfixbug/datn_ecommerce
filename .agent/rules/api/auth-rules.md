---
paths:
  - "apps/api/**"
  - "apps/storefront/lib/auth*"
  - "apps/admin/lib/auth*"
  - "packages/api-client/src/lib/**"
  - "packages/api-client/src/transport/**"
---

# Xác thực, phân quyền và dữ liệu riêng tư

Better Auth đã cài nhưng chưa có tích hợp xác thực hoàn chỉnh. File auth và màn hình hiện có có thể là boilerplate; không suy ra khả năng bảo mật từ tên file. Thiết kế xác thực phải được xác nhận theo yêu cầu storefront/admin của dự án trước khi triển khai.

- Trước khi triển khai, xác nhận mô hình session, vai trò, customer/admin và guest checkout còn chưa chốt. Không thêm bypass đăng nhập, tài khoản đặc quyền hay provider giả để làm luồng chạy được.
- Khi có xác thực, API lấy danh tính từ ngữ cảnh đã xác minh; không tin customerId/role trong body hoặc query để cấp quyền.
- Kiểm tra quyền trên từng tài nguyên riêng tư. Với đơn hàng, địa chỉ và dữ liệu cá nhân, truy vấn phải bị giới hạn theo chủ thể có quyền; không áp quy tắc này vào catalog công khai.
- Ẩn nút hoặc bảo vệ route frontend không thay thế authorization ở API. Shop/admin có đặc tả riêng không tự bảo vệ endpoint.
- Chọn 401/403/404 theo hợp đồng đã thống nhất và yêu cầu tránh tiết lộ sự tồn tại của tài nguyên riêng tư; không tự áp dụng một mã lỗi cho mọi trường hợp.
- Server transport phải giữ ngữ cảnh từng request; không lưu token/cookie của người dùng vào singleton/global state để tránh rò rỉ chéo request.
- Không log credential hoặc chuyển dữ liệu chỉ dành cho admin vào response shop. Với cơ chế auth được chọn sau này, local và production nên dùng cùng đường xử lý xác thực, khác cấu hình kết nối; không tự provision môi trường.

Kiểm thử khi triển khai: chưa đăng nhập, khách hàng A truy cập dữ liệu B, người dùng thường truy cập chức năng admin; thao tác bị từ chối phải không làm đổi dữ liệu.

## Phạm vi truy cập

- Phân biệt danh tính, vai trò và quyền tài nguyên. Đăng nhập hoặc biết ID không có nghĩa được xem mọi đơn hàng.
- Kiểm tra quyền và ghi dữ liệu trong cùng luồng an toàn; tránh kiểm tra một bản ghi rồi ghi bản khác theo ID client gửi.
- Danh sách, tổng số, tìm kiếm và lỗi không được lộ dữ liệu riêng tư. Chốt 401/403/404 trong TypeSpec, không tự dùng 404 cho mọi lỗi.
- Gọi từ app admin hoặc có prefix admin không xác nhận quyền; API kiểm tra từng thao tác được bảo vệ.
- Khi có auth thật, rà CSRF, cookie, CORS, forwarding header theo cơ chế đã chọn; không coi cấu hình demo là chuẩn production hoặc tự chốt provider.
- Transport chỉ gửi credential tới đích API cấu hình phù hợp request; không chuyển cookie/token tới URL tùy ý từ người dùng.
