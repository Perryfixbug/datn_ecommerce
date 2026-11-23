# Shop API

Tài liệu này mô tả bề mặt API dự kiến cho actor người mua. Các nhóm dưới đây lấy từ mã `C-*` trong `docs/specs/functions.md`; chưa có operation nghiệp vụ tương ứng trong TypeSpec hiện tại.

## Trạng thái

- `GET /api/v1/health` là operation duy nhất đã triển khai.
- Các path bên dưới là nhóm endpoint đề xuất để thảo luận, chưa phải contract.
- Không suy ra guest checkout, provider thanh toán/vận chuyển hoặc ví nội bộ đã được bật.

## 1. Tài khoản và xác thực

Mã: `C-001–C-011`, use case `U4`.

| Chức năng                     | Operation dự kiến                     | Ghi chú                                            |
| ----------------------------- | ------------------------------------- | -------------------------------------------------- |
| C-001 Đăng ký tài khoản       | `POST /auth/register`                 | Email chưa tồn tại và luồng xác nhận cần chốt.     |
| C-002 Đăng nhập               | `POST /auth/login`                    | Cơ chế session/token chưa chốt.                    |
| C-003 Đăng xuất               | `POST /auth/logout`                   | Phụ thuộc cơ chế xác thực.                         |
| C-004 Khôi phục mật khẩu      | `POST /auth/password-recovery`        | Mã xác nhận và thời hạn cần chốt.                  |
| C-005 Xem hồ sơ               | `GET /me`                             | Chỉ trả dữ liệu thuộc tài khoản hiện tại.          |
| C-006 Cập nhật hồ sơ          | `PATCH /me`                           | Trường được phép sửa cần chốt.                     |
| C-007 Quản lý địa chỉ         | `GET/POST/PATCH/DELETE /me/addresses` | Cần quy tắc địa chỉ mặc định và snapshot đơn hàng. |
| C-008 Xác minh tài khoản      | `POST /auth/verify`                   | Chưa chốt loại mã và provider gửi mã.              |
| C-009 Xem thông báo tài khoản | `GET /me/notifications`               | Cần chốt phân trang và trạng thái đã đọc.          |
| C-010 Đổi mật khẩu            | `POST /me/password`                   | Phải xác thực phiên và mật khẩu hiện tại.          |
| C-011 Xóa/đóng tài khoản      | `POST /me/deactivation`               | Chính sách dữ liệu giao dịch cần chốt.             |

## 2. Khám phá và sản phẩm

Mã: `C-012–C-028`, use case `U1–U2`.

| Chức năng                                | Operation dự kiến                                  | Ghi chú                                                       |
| ---------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| C-012–C-019 Tìm kiếm, lọc, xem danh sách | `GET /products`                                    | Bộ lọc, sort và pagination cần đưa vào TypeSpec sau khi chốt. |
| C-020–C-024 Xem chi tiết sản phẩm        | `GET /products/{productId}`                        | Cần quy tắc sản phẩm đã ẩn, hết hàng hoặc chờ duyệt.          |
| C-025–C-028 Danh mục và đề xuất          | `GET /categories`, `GET /products/recommendations` | Gợi ý cần chính sách dữ liệu và tiêu chí nghiệm thu.          |

## 3. Giỏ hàng, đặt hàng và thanh toán

Mã: `C-029–C-037`, use case `U3`, `U5`.

| Chức năng                             | Operation dự kiến                   | Ghi chú                                                            |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| C-029–C-033 Xem và cập nhật giỏ hàng  | `GET/POST/PATCH/DELETE /cart/items` | Cần chốt giỏ hàng chỉ dành cho tài khoản đã xác thực.              |
| C-034 Thanh toán bằng ví              | `POST /checkout/payments/wallet`    | Chỉ dùng nếu xác nhận triển khai ví nội bộ.                        |
| C-035 Thanh toán qua phương thức khác | `POST /checkout/payments`           | Không chọn provider mặc định.                                      |
| C-036 COD                             | `POST /checkout/payments/cod`       | Cần chốt điều kiện áp dụng.                                        |
| C-037 Xác nhận đặt hàng               | `POST /orders`                      | Bắt buộc kiểm tra lại tồn kho, ưu đãi, phương thức và idempotency. |

Đơn chứa nhiều cửa hàng chưa có quyết định về tách đơn, phí vận chuyển, voucher, thanh toán và hoàn tiền; các operation checkout phải bị coi là `blocked` cho đến khi chốt.

## 4. Đơn hàng, đánh giá và hoàn hàng

Mã: `C-038–C-045`, use case `U9–U10`.

| Chức năng                       | Operation dự kiến                      | Ghi chú                                                                      |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| C-038–C-040 Xem và theo dõi đơn | `GET /orders`, `GET /orders/{orderId}` | Ownership bắt buộc; giữ snapshot giao dịch.                                  |
| C-041 Hủy đơn                   | `POST /orders/{orderId}/cancellation`  | Trạng thái cuối được hủy chưa thống nhất.                                    |
| C-042 Gửi yêu cầu hoàn hàng     | `POST /orders/{orderId}/returns`       | Nguồn nêu mốc 15 ngày và điều kiện nhận hàng; thời điểm hoàn tiền chưa chốt. |
| C-043–C-045 Đánh giá sản phẩm   | `POST/PATCH /orders/{orderId}/reviews` | Cần chốt một lần đánh giá, media và sửa/xóa.                                 |

## 5. Tương tác và hỗ trợ

Mã: `C-046–C-054`, use case `U8`, `U11` và yêu cầu riêng.

| Chức năng              | Operation dự kiến                                                              | Ghi chú                                                                 |
| ---------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| C-046–C-049 Trò chuyện | `GET/POST /conversations`, `GET/POST /conversations/{conversationId}/messages` | Cần chốt realtime hay polling, lưu trữ và kiểm soát dữ liệu.            |
| C-050–C-052 Thông báo  | `GET /notifications`, `POST /notifications/{notificationId}/read`              | Kênh gửi và trạng thái đọc cần chốt.                                    |
| C-053 Đề xuất sản phẩm | `GET /recommendations`                                                         | Chưa chốt dữ liệu hành vi và tiêu chí đánh giá.                         |
| C-054 Chatbot          | `POST /chatbot/messages`                                                       | `blocked`: chưa chốt kiến thức, dữ liệu riêng tư, provider và fallback. |

## 6. Ví điện tử có điều kiện

Mã: `C-055–C-066`, use case `U7`.

| Chức năng                           | Operation dự kiến                                                    | Ghi chú                                                    |
| ----------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| C-055–C-057 Kích hoạt và xem ví     | `POST /wallet/activation`, `GET /wallet`, `GET /wallet/transactions` | Chỉ triển khai nếu xác nhận ví nội bộ.                     |
| C-058 Liên kết ngân hàng            | `POST /wallet/bank-accounts`                                         | Dữ liệu tài khoản ngân hàng cần bảo vệ.                    |
| C-059 Nạp tiền                      | `POST /wallet/deposits`                                              | Cần callback/xác nhận và idempotency.                      |
| C-060 Rút tiền                      | `POST /wallet/withdrawals`                                           | PIN/OTP và trạng thái xử lý chưa thống nhất.               |
| C-061–C-065 PIN, khóa ví, giao dịch | `POST /wallet/pin`, `POST /wallet/lock`                              | Luồng mở khóa và giới hạn thử sai cần chốt.                |
| C-066 Hoàn tiền vào ví              | `POST /wallet/refunds`                                               | Phụ thuộc chính sách hoàn hàng và phương án không dùng ví. |

## Quy tắc triển khai

Mỗi nhóm trên phải được chuyển thành operation TypeSpec kèm model request/response/error, authorization và test HTTP. Không dùng bảng này để sinh tự động endpoint mà chưa được duyệt.
