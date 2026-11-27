# Đối chiếu kiểm thử API đã triển khai

Phạm vi: A-001–A-032, auth và health. Không tạo test cho A-033 đã bỏ qua hoặc A-034 trở đi chưa triển khai.

## Kiểm thử theo chức năng

| Mã/API      | Route (tiền tố /api/v1)                                        | File tại apps/api/test                         | Hành vi được kiểm tra                                                                                                        |
| ----------- | -------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| A-001–A-003 | GET /admin/stores và /{storeId}                                | admin-stores.spec.ts                           | Danh sách, lọc, cursor, chi tiết và loại dữ liệu riêng tư                                                                    |
| A-004–A-007 | POST /admin/stores/{storeId}/approval,rejection,lock,unlock    | admin-stores.spec.ts                           | Quyền riêng theo thao tác, trạng thái, lý do, lịch sử/audit theo triển khai                                                  |
| A-008–A-010 | GET /admin/accounts và /{accountId}                            | admin-accounts.spec.ts                         | Danh sách, tìm kiếm, bộ lọc, phân trang, phạm vi người mua/người bán và dữ liệu nhạy cảm                                     |
| A-011–A-012 | POST /admin/accounts/{accountId}/lock,unlock                   | admin-accounts.spec.ts                         | Lý do, cấm tự khóa/khóa nhân viên, thu hồi phiên, lỗi transaction                                                            |
| A-013–A-014 | GET /admin/product-moderation và /{productId}                  | product-moderation.spec.ts                     | Danh sách, chi tiết, quyền và validation                                                                                     |
| A-015–A-016 | POST /admin/product-moderation/{productId}/approval,rejection  | product-moderation.spec.ts                     | Kết quả duyệt/từ chối, version, lý do, xung đột và lỗi transaction                                                           |
| A-017       | GET/POST /admin/catalog/categories; PATCH/DELETE /{categoryId} | admin-categories.spec.ts                       | CRUD, tìm kiếm/cha, trùng tên, chu trình, tham chiếu và lỗi DB                                                               |
| A-018       | GET /admin/homepage                                            | homepage.spec.ts                               | Cấu hình draft/published và quyền đọc                                                                                        |
| A-019–A-021 | POST /admin/homepage/banners; PATCH/DELETE /{itemId}           | homepage.spec.ts                               | CRUD banner, URL, lịch hiển thị, version và quyền                                                                            |
| A-022       | POST /admin/homepage/category-sections; PATCH/DELETE /{itemId} | homepage.spec.ts                               | CRUD section, danh mục tồn tại, ID trùng và kiểm tra lại lúc publish                                                         |
| A-023–A-025 | POST /admin/homepage/ads; PATCH/DELETE /{itemId}               | homepage.spec.ts                               | CRUD quảng cáo và dùng chung validation/version với media                                                                    |
| A-026       | POST /admin/homepage/order                                     | homepage.spec.ts                               | Thứ tự đầy đủ, ID trùng/thiếu, version cũ                                                                                    |
| A-027       | GET /admin/homepage/preview                                    | homepage.spec.ts                               | Mốc đầu/cuối lịch hiển thị, enabled và query thời gian sai                                                                   |
| A-028       | POST /admin/homepage/publish                                   | homepage.spec.ts                               | Quyền publish, snapshot độc lập draft, version, audit lỗi gây rollback                                                       |
| A-029       | GET /admin/cases                                               | admin-cases.spec.ts                            | Loại hồ sơ, trạng thái, cursor, tổng số và dữ liệu tóm tắt                                                                   |
| A-030       | GET /admin/cases/{caseId}                                      | admin-cases.spec.ts                            | Ba loại hồ sơ, lịch sử, ID ghép, 404 và không lộ trường DB ngoài hợp đồng                                                    |
| A-031       | POST /admin/cases/{caseId}/resolution                          | admin-cases.spec.ts                            | Chỉ khiếu nại, quyền, lý do, ngăn xử lý lặp, lịch sử/thông báo và rollback                                                   |
| A-032       | POST /admin/reports/{reportId}/resolution                      | admin-reports.spec.ts                          | Quyền quản trị/kiểm duyệt, hai kết quả, lý do, xử lý lặp và rollback                                                         |
| Auth        | POST /auth/login,refresh,logout; GET /auth/me                  | auth-http.spec.ts; auth-account-status.spec.ts | Validation HTTP, mật khẩu/JWT thật, refresh rotation, hết hạn, logout blacklist, authVersion, không lộ hash và lỗi lưu phiên |
| Health      | GET /health                                                    | health.spec.ts                                 | AppModule thật, HTTP 200 và cấu trúc response không cần hạ tầng                                                              |

## Bảo vệ route và hỗ trợ

admin-route-auth.spec.ts dùng AppModule và metadata của NestJS để dò 35 route quản trị đang đăng ký, gửi HTTP không có token và yêu cầu tất cả trả 401 trước khi gọi DB. Test này không thay thế đường thành công, quyền theo chức vụ và validation trong từng suite nghiệp vụ.

validation.spec.ts kiểm tra ZodValidationPipe; prisma.spec.ts kiểm tra vòng đời kết nối; database-migration.spec.ts và seed.spec.ts kiểm tra artifact/schema/seed tĩnh, không thực thi reset hay migration lên DB.

## Cách chạy và giới hạn

Chạy một lượt sau khi hoàn thành thay đổi: pnpm --filter api test. Kiểm tra kiểu: pnpm --filter api typecheck; lint: pnpm --filter api lint.

Các suite nghiệp vụ dùng DB/Redis giả lập, không ghi dữ liệu local và không xác nhận SQL, FK/CHECK hoặc cạnh tranh transaction trên PostgreSQL thực. Muốn kiểm thử tích hợp cần DB test riêng đã được xác nhận; không tự dùng DB hiện tại làm nơi xóa/seed dữ liệu test.

Auth POST hiện trả 201 theo controller NestJS (chưa có HttpCode), trong khi đặc tả sinh khai báo 200. Test auth ghi nhận status thực tế 201, không coi sai lệch hợp đồng này là đã sửa; cần chuẩn hóa auth trong thay đổi riêng. Các POST quản trị dùng 200.
