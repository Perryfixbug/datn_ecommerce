# Admin API

Tài liệu theo dõi API quản trị. Các route bên dưới dùng tiền tố chung `/api/v1`. Cập nhật trạng thái ngày 26/11/2026.

## Quy ước trạng thái

| Trạng thái       | Ý nghĩa                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ĐÃ LÀM**       | Có TypeSpec, OpenAPI/Zod/client được sinh, controller/service/guard NestJS và kiểm thử liên quan. Không đồng nghĩa đã nghiệm thu DB thực hoặc hoàn thiện giao diện. |
| **CHƯA LÀM**     | Chưa có handler nghiệp vụ và hợp đồng triển khai; tài liệu hoặc bảng DB có sẵn không tính là đã làm API.                                                            |
| **CẦN XÁC NHẬN** | Chưa làm vì quyền, phạm vi, công thức hoặc tác động chưa chốt, hay tài liệu mâu thuẫn.                                                                              |
| **TẠM BỎ QUA**   | Chưa làm; người dùng yêu cầu bỏ qua, không tiếp tục nếu chưa có yêu cầu mới.                                                                                        |

CẦN XÁC NHẬN và TẠM BỎ QUA đều thuộc CHƯA LÀM. Một mã chức năng có thể dùng chung endpoint với mã khác; số mã không phải số route HTTP.

## Tổng quan tiến độ

| Mã          | Phạm vi                      | Trạng thái       | Căn cứ hoặc điều còn thiếu                                                                       |
| ----------- | ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| A-001–A-007 | Gian hàng                    | **ĐÃ LÀM**       | admin-stores; [quyết định](admin/store-module-decisions.md).                                     |
| A-008–A-012 | Tài khoản                    | **ĐÃ LÀM**       | admin-accounts; [quyết định](admin/account-module-decisions.md).                                 |
| A-013–A-016 | Kiểm duyệt sản phẩm          | **ĐÃ LÀM**       | product-moderation; [quyết định](admin/product-moderation-decisions.md).                         |
| A-017       | Danh mục                     | **ĐÃ LÀM**       | admin-categories, không audit; [quyết định](admin/category-module-decisions.md).                 |
| A-018–A-028 | Trang chủ                    | **ĐÃ LÀM**       | homepage; [quyết định](admin/homepage-module-decisions.md).                                      |
| A-029–A-031 | Hồ sơ tổng hợp và khiếu nại  | **ĐÃ LÀM**       | admin-cases; [quyết định](admin/case-module-decisions.md).                                       |
| A-032       | Kết luận báo cáo sản phẩm    | **ĐÃ LÀM**       | admin-reports; [quyết định](admin/report-module-decisions.md). Không tự ẩn/khóa.                 |
| A-033       | Tranh chấp hoàn hàng         | **TẠM BỎ QUA**   | Người dùng yêu cầu bỏ qua; quyền và tác động tài chính chưa được duyệt.                          |
| A-034       | Summary hoặc lịch sử xử lý   | **CẦN XÁC NHẬN** | admin-api mô tả summary, functions.md mô tả LichSuXuLy; đề xuất tra cứu lịch sử chưa được duyệt. |
| A-035       | Khuyến mãi toàn sàn          | **CẦN XÁC NHẬN** | Loại ưu đãi, tài trợ, cộng dồn và quyền chưa chốt.                                               |
| A-036–A-038 | Báo cáo/thống kê             | **CẦN XÁC NHẬN** | Chưa chốt metric, công thức, thời gian và quyền; cách chia chức năng khác functions.md.          |
| A-039       | Audit hoặc thống kê vận hành | **CẦN XÁC NHẬN** | admin-api mô tả audit, functions.md mô tả thống kê vận hành; chưa có API đọc AuditLog.           |

**Theo 39 mã trong tài liệu này: 32 đã làm, 7 chưa làm (1 tạm bỏ qua, 6 cần xác nhận).**

functions.md còn có A-040–A-041 về tăng trưởng/xếp hạng, chưa có trong danh sách API này và chưa triển khai. Không tự ánh xạ lại mã trước khi xác nhận nguồn chuẩn.

## Mức kiểm chứng

Bảng đối chiếu từng API với suite và giới hạn kiểm thử: [Kiểm thử API đã triển khai](admin/test-coverage.md).

- Kết quả gần nhất sau A-032: 108/108 test, 13 suite; typecheck toàn monorepo, lint/build API đạt. Đây là kết quả trước lần cập nhật tài liệu này, không phải lần chạy mới.
- Database local đã áp dụng đủ 6 migration, gồm schema quản trị, AuditLog chung, HomepageConfig và KhieuNai; migrate status đã xác nhận cập nhật. Không còn chờ áp dụng những migration này trên DB local đã kiểm tra.
- Test HTTP nghiệp vụ sử dụng Prisma mock; chưa xác nhận tích hợp PostgreSQL thực cho từng luồng. Migration thành công không thay thế kiểm thử nghiệp vụ trên DB.
- Trạng thái chỉ phản ánh backend và hợp đồng, không xác nhận frontend admin hoàn thiện.

## 1. Quản lý gian hàng

Mã: `A-001–A-007`, use case `U17`.

| Chức năng                            | Operation dự kiến                                  | Ghi chú                                           |
| ------------------------------------ | -------------------------------------------------- | ------------------------------------------------- |
| A-001–A-003 Danh sách, lọc, chi tiết | `GET /admin/stores`, `GET /admin/stores/{storeId}` | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-004 Phê duyệt hồ sơ                | `POST /admin/stores/{storeId}/approval`            | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-005 Từ chối hồ sơ                  | `POST /admin/stores/{storeId}/rejection`           | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-006 Khóa gian hàng                 | `POST /admin/stores/{storeId}/lock`                | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-007 Mở khóa gian hàng              | `POST /admin/stores/{storeId}/unlock`              | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |

## 2. Quản lý tài khoản

Mã: `A-008–A-012`, use case `U23`.

| Chức năng                                 | Operation dự kiến                                        | Ghi chú                                           |
| ----------------------------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| A-008–A-010 Danh sách, tìm kiếm, chi tiết | `GET /admin/accounts`, `GET /admin/accounts/{accountId}` | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-011 Khóa tài khoản                      | `POST /admin/accounts/{accountId}/lock`                  | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-012 Mở khóa tài khoản                   | `POST /admin/accounts/{accountId}/unlock`                | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |

## 3. Kiểm duyệt sản phẩm

Mã: `A-013–A-016`, use case `U21`.

| Chức năng                | Operation dự kiến                                      | Ghi chú                                           |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------------- |
| A-013 Hàng đợi duyệt     | `GET /admin/product-moderation`                        | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-014 Chi tiết chờ duyệt | `GET /admin/product-moderation/{productId}`            | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-015 Phê duyệt          | `POST /admin/product-moderation/{productId}/approval`  | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-016 Từ chối            | `POST /admin/product-moderation/{productId}/rejection` | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |

## 4. Danh mục và trang chủ

Mã: `A-017–A-028`, use case `U19` và yêu cầu riêng.

| Chức năng                | Operation dự kiến                                     | Ghi chú                                           |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------- |
| A-017 Danh mục toàn sàn  | `GET/POST/PATCH/DELETE /admin/catalog/categories`     | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-018 Cấu hình trang chủ | `GET /admin/homepage`                                 | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-019–A-021 Banner       | `POST/PATCH/DELETE /admin/homepage/banners`           | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-022 Danh mục trang chủ | `POST/PATCH/DELETE /admin/homepage/category-sections` | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-023–A-025 Quảng cáo    | `POST/PATCH/DELETE /admin/homepage/ads`               | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-026 Sắp xếp            | `POST /admin/homepage/order`                          | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-027 Xem trước          | `GET /admin/homepage/preview`                         | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |
| A-028 Xuất bản           | `POST /admin/homepage/publish`                        | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ. |

## 5. Khiếu nại, báo cáo và khuyến mãi

Mã: `A-029–A-035`, use case `U20`, `U22` và yêu cầu riêng.

| Chức năng                            | Operation dự kiến                                  | Ghi chú                                              |
| ------------------------------------ | -------------------------------------------------- | ---------------------------------------------------- |
| A-029–A-030 Danh sách, hồ sơ yêu cầu | `GET /admin/cases`, `GET /admin/cases/{caseId}`    | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ.    |
| A-031 Xử lý khiếu nại                | `POST /admin/cases/{caseId}/resolution`            | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ.    |
| A-032 Báo cáo vi phạm                | `POST /admin/reports/{reportId}/resolution`        | **ĐÃ LÀM**; xem quyết định module ở bảng tiến độ.    |
| A-033 Tranh chấp hoàn hàng           | `POST /admin/return-disputes/{disputeId}/decision` | **TẠM BỎ QUA** theo yêu cầu người dùng.              |
| A-034 Báo cáo tổng hợp               | `GET /admin/reports/summary`                       | **CẦN XÁC NHẬN**; xem điểm chưa chốt ở bảng tiến độ. |
| A-035 Khuyến mãi toàn sàn            | `GET/POST/PATCH /admin/promotions`                 | **CẦN XÁC NHẬN**; xem điểm chưa chốt ở bảng tiến độ. |

## 6. Báo cáo và giám sát

Mã: `A-036–A-039`, use case `U18`.

| Chức năng                    | Operation dự kiến                 | Ghi chú                                              |
| ---------------------------- | --------------------------------- | ---------------------------------------------------- |
| A-036–A-038 Báo cáo vận hành | `GET /admin/analytics/operations` | **CẦN XÁC NHẬN**; xem điểm chưa chốt ở bảng tiến độ. |
| A-039 Audit/giám sát         | `GET /admin/audit-events`         | **CẦN XÁC NHẬN**; xem điểm chưa chốt ở bảng tiến độ. |

## Quy tắc triển khai

Ma trận quyền phải được duyệt trước khi thêm TypeSpec. Các operation thay đổi trạng thái phải mô tả trạng thái trước/sau và lý do khi bắt buộc. Chỉ bổ sung audit hoặc thông báo khi nghiệp vụ cần; không mặc định áp dụng cho mọi module CRUD.

## Tài liệu chi tiết theo mã

Các mô tả chi tiết dùng [mẫu endpoint](endpoint-template.md) và [quy ước dùng chung](common-conventions.md). Những mục chưa đủ chính sách vẫn giữ `blocked` hoặc `TBD`.

- [# A-001 Danh sách gian hàng](admin/A001-list-stores.md)
- [# A-002 Lọc gian hàng](admin/A002-filter-stores.md)
- [# A-003 Chi tiết gian hàng](admin/A003-get-store-details.md)
- [# A-004 Phê duyệt hồ sơ gian hàng](admin/A004-approve-store.md)
- [# A-005 Từ chối hồ sơ gian hàng](admin/A005-reject-store.md)
- [# A-006 Khóa gian hàng](admin/A006-lock-store.md)
- [# A-007 Mở khóa gian hàng](admin/A007-unlock-store.md)
- [# A-008 Danh sách tài khoản](admin/A008-list-accounts.md)
- [# A-009 Tìm kiếm tài khoản](admin/A009-search-accounts.md)
- [# A-010 Chi tiết tài khoản](admin/A010-get-account-details.md)
- [# A-011 Khóa tài khoản](admin/A011-lock-account.md)
- [# A-012 Mở khóa tài khoản](admin/A012-unlock-account.md)
- [# A-013 Hàng đợi kiểm duyệt sản phẩm](admin/A013-list-product-moderation.md)
- [# A-014 Chi tiết sản phẩm chờ duyệt](admin/A014-get-product-moderation-details.md)
- [# A-015 Phê duyệt sản phẩm](admin/A015-approve-product.md)
- [# A-016 Từ chối sản phẩm](admin/A016-reject-product.md)
- [# A-017 Quản lý danh mục toàn sàn](admin/A017-manage-catalog-categories.md)
- [# A-018 Xem cấu hình trang chủ](admin/A018-get-homepage-config.md)
- [# A-019 Tạo banner trang chủ](admin/A019-create-homepage-banner.md)
- [# A-020 Cập nhật banner trang chủ](admin/A020-update-homepage-banner.md)
- [# A-021 Xóa banner trang chủ](admin/A021-delete-homepage-banner.md)
- [# A-022 Quản lý danh mục trang chủ](admin/A022-manage-homepage-category-sections.md)
- [# A-023 Tạo quảng cáo trang chủ](admin/A023-create-homepage-ad.md)
- [# A-024 Cập nhật quảng cáo trang chủ](admin/A024-update-homepage-ad.md)
- [# A-025 Xóa quảng cáo trang chủ](admin/A025-delete-homepage-ad.md)
- [# A-026 Sắp xếp trang chủ](admin/A026-reorder-homepage.md)
- [# A-027 Xem trước trang chủ](admin/A027-preview-homepage.md)
- [# A-028 Xuất bản trang chủ](admin/A028-publish-homepage.md)
- [# A-029 Danh sách yêu cầu/khiếu nại](admin/A029-list-cases.md)
- [# A-030 Chi tiết yêu cầu/khiếu nại](admin/A030-get-case-details.md)
- [# A-031 Xử lý khiếu nại](admin/A031-resolve-case.md)
- [# A-032 Xử lý báo cáo vi phạm](admin/A032-resolve-report.md)
- [# A-033 Quyết định tranh chấp hoàn hàng](admin/A033-decide-return-dispute.md)
- [# A-034 Báo cáo tổng hợp](admin/A034-get-report-summary.md)
- [# A-035 Khuyến mãi toàn sàn](admin/A035-manage-promotions.md)
- [# A-036 Báo cáo vận hành](admin/A036-get-operations-analytics.md)
- [# A-037 Báo cáo vận hành theo metric](admin/A037-get-operations-analytics-by-metric.md)
- [# A-038 Báo cáo vận hành theo khoảng thời gian](admin/A038-get-operations-analytics-by-time-range.md)
- [# A-039 Audit và giám sát](admin/A039-list-audit-events.md)
