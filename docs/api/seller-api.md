# Seller API

Tài liệu này tách riêng actor người bán (`S-*`) khỏi shop và admin. Hiện chưa có entrypoint TypeSpec seller riêng; việc bổ sung entrypoint là quyết định cần chốt trước khi triển khai contract.

## Trạng thái

- Toàn bộ operation seller dưới đây là `planned`.
- Quyền ownership phải giới hạn trong gian hàng và dữ liệu thuộc người bán hiện tại.
- Các chức năng ví, livestream, media và thanh toán có điều kiện hoặc còn thiếu provider.

## 1. Tài khoản và gian hàng

Mã: `S-001–S-014`, use case `U6`, `U12`, `U13`.

| Chức năng                       | Operation dự kiến                                          | Ghi chú                                                   |
| ------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| S-001–S-004 Tài khoản người bán | `GET/PATCH /seller/me`, `POST /seller/me/password`         | Luồng auth dùng chung nhưng quyền seller cần chốt.        |
| S-005–S-010 Hồ sơ gian hàng     | `GET/PATCH /seller/store`, `POST /seller/store/submission` | Hồ sơ phải được duyệt trước khi thêm sản phẩm theo nguồn. |
| S-011–S-014 Danh mục cửa hàng   | `GET/POST/PATCH/DELETE /seller/catalog/categories`         | Quan hệ với danh mục toàn sàn chưa chốt.                  |

## 2. Sản phẩm, biến thể và tồn kho

Mã: `S-015–S-028`, use case `U13`, `U14`.

| Chức năng                             | Operation dự kiến                                                          | Ghi chú                                                |
| ------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| S-015–S-020 Sản phẩm                  | `GET/POST/PATCH/DELETE /seller/products`                                   | Xóa phải giữ dữ liệu giao dịch và kiểm tra trạng thái. |
| S-021–S-024 Biến thể                  | `GET/POST/PATCH/DELETE /seller/products/{productId}/variants`              | Cần chốt SKU, giá, thuộc tính và tồn kho.              |
| S-025–S-028 Tồn kho và trạng thái bán | `GET/PATCH /seller/inventory`, `POST /seller/products/{productId}/publish` | Không tự suy ra pre-order hoặc quy tắc hết hàng.       |

## 3. Đơn hàng và yêu cầu

Mã: `S-029–S-044`, use case `U8`, `U9`, `U22`.

| Chức năng                          | Operation dự kiến                                                                            | Ghi chú                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| S-029–S-036 Danh sách và xử lý đơn | `GET /seller/orders`, `GET /seller/orders/{orderId}`, `POST /seller/orders/{orderId}/status` | Cần chốt state machine và mốc bàn giao vận chuyển.       |
| S-037–S-041 Nhắn tin/thông báo     | `GET/POST /seller/conversations`, `GET /seller/notifications`                                | Cần chốt realtime, retention và quyền dữ liệu.           |
| S-042–S-044 Khiếu nại              | `POST /seller/cases`, `POST /seller/cases/{caseId}/evidence`, `GET /seller/cases`            | Chặn bổ sung sau khi đóng; trạng thái do U22 quyết định. |

## 4. Báo cáo và marketing

Mã: `S-045–S-062`, use case `U15`, `U16`.

| Chức năng                         | Operation dự kiến                                                                                                                        | Ghi chú                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| S-045–S-051 Doanh thu và thống kê | `GET /seller/analytics/overview`, `GET /seller/analytics/reports`, `GET /seller/analytics/top-products`, `POST /seller/analytics/export` | Công thức doanh thu, phí và hoàn cần chốt; export cần giới hạn. |
| S-052–S-054 Voucher               | `GET/POST/PATCH /seller/vouchers`, `POST /seller/vouchers/{voucherId}/end`                                                               | Điều kiện sửa sau khi sử dụng chưa chốt.                        |
| S-055–S-058 Livestream            | `POST /seller/livestreams`, `POST /seller/livestreams/{streamId}/products`, `POST /seller/livestreams/{streamId}/end`                    | Provider, lưu video và phía người mua chưa chốt.                |
| S-059–S-062 Bài viết và hiệu quả  | `GET/POST/PATCH/DELETE /seller/posts`, `GET /seller/marketing/analytics`                                                                 | Điều kiện sửa/xóa và tác động cần chốt.                         |

## 5. Ví điện tử có điều kiện

Mã: `S-063–S-070`, use case `U7`.

| Chức năng                               | Operation dự kiến                                                                         | Ghi chú                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| S-063–S-064 Kích hoạt, số dư, giao dịch | `POST /seller/wallet/activation`, `GET /seller/wallet`, `GET /seller/wallet/transactions` | Chỉ triển khai nếu xác nhận ví nội bộ.            |
| S-065 Liên kết ngân hàng                | `POST /seller/wallet/bank-accounts`                                                       | Cần bảo vệ thông tin tài khoản.                   |
| S-066 Nạp tiền                          | `POST /seller/wallet/deposits`                                                            | Cần xác nhận giao dịch thành công và idempotency. |
| S-067 Rút tiền                          | `POST /seller/wallet/withdrawals`                                                         | PIN/OTP, trạng thái và provider chưa chốt.        |
| S-068–S-070 PIN và khóa ví              | `POST /seller/wallet/pin`, `POST /seller/wallet/lock`                                     | Luồng mở khóa chưa có trong nguồn.                |

## Quy tắc ownership

Mọi `storeId`, `productId`, `orderId`, `caseId` và `walletId` từ client phải được đối chiếu với actor hiện tại ở backend. Không dùng ID trong request để bỏ qua kiểm tra quyền sở hữu.
