# Admin API

Tài liệu này mô tả bề mặt API dự kiến cho nhân viên sàn. Mọi operation đều yêu cầu xác thực và quyền phù hợp; `functions.md` chưa chốt ma trận quyền nhân viên.

## Trạng thái

- `GET /api/v1/health` là operation duy nhất đã triển khai.
- Các path dưới đây là đề xuất, chưa có trong TypeSpec.
- Không mặc định mọi nhân viên có toàn quyền hoặc được khóa chính mình/nhân viên khác.

## 1. Quản lý gian hàng

Mã: `A-001–A-007`, use case `U17`.

| Chức năng                            | Operation dự kiến                                  | Ghi chú                                     |
| ------------------------------------ | -------------------------------------------------- | ------------------------------------------- |
| A-001–A-003 Danh sách, lọc, chi tiết | `GET /admin/stores`, `GET /admin/stores/{storeId}` | Bộ lọc và dữ liệu hồ sơ cần chốt.           |
| A-004 Phê duyệt hồ sơ                | `POST /admin/stores/{storeId}/approval`            | Cập nhật trạng thái và thông báo người bán. |
| A-005 Từ chối hồ sơ                  | `POST /admin/stores/{storeId}/rejection`           | Bắt buộc lý do.                             |
| A-006 Khóa gian hàng                 | `POST /admin/stores/{storeId}/lock`                | Bắt buộc lý do và quyền phù hợp.            |
| A-007 Mở khóa gian hàng              | `POST /admin/stores/{storeId}/unlock`              | Cần chốt điều kiện mở lại.                  |

## 2. Quản lý tài khoản

Mã: `A-008–A-012`, use case `U23`.

| Chức năng                                 | Operation dự kiến                                        | Ghi chú                                |
| ----------------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| A-008–A-010 Danh sách, tìm kiếm, chi tiết | `GET /admin/accounts`, `GET /admin/accounts/{accountId}` | Phải lọc dữ liệu riêng tư theo quyền.  |
| A-011 Khóa tài khoản                      | `POST /admin/accounts/{accountId}/lock`                  | Chính sách khóa và thông báo cần chốt. |
| A-012 Mở khóa tài khoản                   | `POST /admin/accounts/{accountId}/unlock`                | Cần kiểm tra trạng thái hiện tại.      |

## 3. Kiểm duyệt sản phẩm

Mã: `A-013–A-016`, use case `U21`.

| Chức năng                | Operation dự kiến                                      | Ghi chú                              |
| ------------------------ | ------------------------------------------------------ | ------------------------------------ |
| A-013 Hàng đợi duyệt     | `GET /admin/product-moderation`                        | Tiêu chí đưa vào hàng đợi chưa chốt. |
| A-014 Chi tiết chờ duyệt | `GET /admin/product-moderation/{productId}`            | Kiểm tra nội dung, ảnh, thông số.    |
| A-015 Phê duyệt          | `POST /admin/product-moderation/{productId}/approval`  | Ghi kết quả và thông báo.            |
| A-016 Từ chối            | `POST /admin/product-moderation/{productId}/rejection` | Bắt buộc lý do.                      |

## 4. Danh mục và trang chủ

Mã: `A-017–A-028`, use case `U19` và yêu cầu riêng.

| Chức năng                | Operation dự kiến                                     | Ghi chú                                                  |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------------- |
| A-017 Danh mục toàn sàn  | `GET/POST/PATCH/DELETE /admin/catalog/categories`     | `blocked`: phân cấp và xóa danh mục đang dùng chưa chốt. |
| A-018 Cấu hình trang chủ | `GET /admin/homepage`                                 | Cấu trúc component cần chốt.                             |
| A-019–A-021 Banner       | `POST/PATCH/DELETE /admin/homepage/banners`           | Cần thời gian hiển thị hợp lệ và media policy.           |
| A-022 Danh mục trang chủ | `POST/PATCH/DELETE /admin/homepage/category-sections` | Quan hệ với danh mục toàn sàn chưa chốt.                 |
| A-023–A-025 Quảng cáo    | `POST/PATCH/DELETE /admin/homepage/ads`               | Nội dung, lịch và quyền xuất bản cần chốt.               |
| A-026 Sắp xếp            | `POST /admin/homepage/order`                          | Cần idempotency và kiểm tra phiên bản cấu hình.          |
| A-027 Xem trước          | `GET /admin/homepage/preview`                         | Cần mô hình draft/published.                             |
| A-028 Xuất bản           | `POST /admin/homepage/publish`                        | Cần audit và rollback policy.                            |

## 5. Khiếu nại, báo cáo và khuyến mãi

Mã: `A-029–A-035`, use case `U20`, `U22` và yêu cầu riêng.

| Chức năng                            | Operation dự kiến                                  | Ghi chú                                                |
| ------------------------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| A-029–A-030 Danh sách, hồ sơ yêu cầu | `GET /admin/cases`, `GET /admin/cases/{caseId}`    | `blocked`: trạng thái và loại yêu cầu chưa chốt.       |
| A-031 Xử lý khiếu nại                | `POST /admin/cases/{caseId}/resolution`            | Cần quyền và trạng thái chuyển tiếp.                   |
| A-032 Báo cáo vi phạm                | `POST /admin/reports/{reportId}/resolution`        | Phạm vi biện pháp theo quyền chưa chốt.                |
| A-033 Tranh chấp hoàn hàng           | `POST /admin/return-disputes/{disputeId}/decision` | Chính sách hoàn tiền và bằng chứng chưa đầy đủ.        |
| A-034 Báo cáo tổng hợp               | `GET /admin/reports/summary`                       | Công thức chỉ số cần chốt.                             |
| A-035 Khuyến mãi toàn sàn            | `GET/POST/PATCH /admin/promotions`                 | `blocked`: loại ưu đãi, tài trợ và cộng dồn chưa chốt. |

## 6. Báo cáo và giám sát

Mã: `A-036–A-039`, use case `U18`.

| Chức năng                    | Operation dự kiến                 | Ghi chú                                             |
| ---------------------------- | --------------------------------- | --------------------------------------------------- |
| A-036–A-038 Báo cáo vận hành | `GET /admin/analytics/operations` | Chưa chốt metric và khoảng thời gian.               |
| A-039 Audit/giám sát         | `GET /admin/audit-events`         | Phải chốt retention, dữ liệu nhạy cảm và quyền đọc. |

## Quy tắc triển khai

Ma trận quyền phải được duyệt trước khi thêm TypeSpec. Các operation thay đổi trạng thái phải mô tả trạng thái trước/sau, lý do bắt buộc, audit event và thông báo nếu có.
