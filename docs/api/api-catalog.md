# Danh mục API

## Quy ước trạng thái

Danh mục này ánh xạ các mã trong `docs/specs/functions.md` với nhóm API dự kiến. `planned` không có nghĩa endpoint đã tồn tại. Endpoint duy nhất đã xác nhận trong contract hiện tại là `GET /api/v1/health`.

## Bề mặt API

| Audience | Prefix tài liệu | Actor         | Trạng thái hiện tại                                      |
| -------- | --------------- | ------------- | -------------------------------------------------------- |
| Shop     | `/api/v1`       | Người mua     | Health đã triển khai; nghiệp vụ còn planned              |
| Admin    | `/api/v1`       | Nhân viên sàn | Health đã triển khai; nghiệp vụ còn planned              |
| Seller   | `/api/v1`       | Người bán     | Chưa có entrypoint TypeSpec riêng; nghiệp vụ còn planned |

## Nhóm chức năng theo mã

| Dải mã      | Nhóm                           | Use case liên quan        | Tài liệu                                                    |
| ----------- | ------------------------------ | ------------------------- | ----------------------------------------------------------- |
| A-001–A-007 | Quản lý gian hàng              | U17                       | [Admin API](admin-api.md#1-quan-ly-gian-hang)               |
| A-008–A-012 | Quản lý tài khoản              | U23                       | [Admin API](admin-api.md#2-quan-ly-tai-khoan)               |
| A-013–A-016 | Kiểm duyệt sản phẩm            | U21                       | [Admin API](admin-api.md#3-kiem-duyet-san-pham)             |
| A-017–A-028 | Danh mục và trang chủ          | U19 và yêu cầu riêng      | [Admin API](admin-api.md#4-danh-muc-va-trang-chu)           |
| A-029–A-035 | Khiếu nại, báo cáo, khuyến mãi | U20, U22 và yêu cầu riêng | [Admin API](admin-api.md#5-khieu-nai-bao-cao-va-khuyen-mai) |
| A-036–A-039 | Báo cáo và giám sát            | U18                       | [Admin API](admin-api.md#6-bao-cao-va-giam-sat)             |
| C-001–C-011 | Tài khoản người mua            | U4                        | [Shop API](shop-api.md#1-tai-khoan-va-xac-thuc)             |
| C-012–C-028 | Khám phá và sản phẩm           | U1, U2                    | [Shop API](shop-api.md#2-kham-pha-va-san-pham)              |
| C-029–C-037 | Giỏ hàng, đặt hàng, thanh toán | U3, U5                    | [Shop API](shop-api.md#3-gio-hang-dat-hang-va-thanh-toan)   |
| C-038–C-045 | Đơn hàng, đánh giá, hoàn hàng  | U9, U10                   | [Shop API](shop-api.md#4-don-hang-danh-gia-va-hoan-hang)    |
| C-046–C-054 | Tin nhắn, thông báo, chatbot   | U8, U11 và yêu cầu riêng  | [Shop API](shop-api.md#5-tuong-tac-va-ho-tro)               |
| C-055–C-066 | Ví điện tử có điều kiện        | U7                        | [Shop API](shop-api.md#6-vi-dien-tu-co-dieu-kien)           |
| S-001–S-014 | Tài khoản, gian hàng, sản phẩm | U6, U12, U13              | [Seller API](seller-api.md#1-tai-khoan-va-gian-hang)        |
| S-015–S-028 | Biến thể, danh mục, tồn kho    | U13, U14                  | [Seller API](seller-api.md#2-san-pham-bien-the-va-ton-kho)  |
| S-029–S-044 | Đơn hàng, giao tiếp, yêu cầu   | U8, U9, U22               | [Seller API](seller-api.md#3-don-hang-va-yeu-cau)           |
| S-045–S-062 | Báo cáo và marketing           | U15, U16                  | [Seller API](seller-api.md#4-bao-cao-va-marketing)          |
| S-063–S-070 | Ví điện tử có điều kiện        | U7                        | [Seller API](seller-api.md#5-vi-dien-tu-co-dieu-kien)       |

## Endpoint đã tồn tại

| Method | Path             | Operation ID | Audience    | Nguồn                                          | Trạng thái    |
| ------ | ---------------- | ------------ | ----------- | ---------------------------------------------- | ------------- |
| `GET`  | `/api/v1/health` | `getHealth`  | Shop, admin | `packages/api-spec/typespec/common/health.tsp` | `implemented` |

## Quy tắc đọc danh mục

Một mã chức năng có thể được thực hiện bởi nhiều operation hoặc kết hợp trong một workflow. Không tạo endpoint riêng chỉ vì một dòng trong `functions.md`. Path, request/response, lỗi và quyền chỉ trở thành contract sau khi được chốt trong TypeSpec.
