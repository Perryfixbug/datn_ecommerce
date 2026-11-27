# A-009 Tìm kiếm tài khoản

> Trạng thái triển khai: **ĐÃ LÀM**: đã có hợp đồng, module NestJS và kiểm thử liên quan. Xem [bảng tiến độ và mức kiểm chứng](../admin-api.md#tổng-quan-tiến-độ).

| Trường                  | Nội dung                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| Mã chức năng/use case   | `A-009`, `U23`                                                                   |
| Actor                   | Nhân viên sàn; quyền cụ thể TBD                                                  |
| Trạng thái              | `specified`                                                                      |
| Nguồn                   | [Admin API](../admin-api.md); [Quy ước API dùng chung](../common-conventions.md) |
| Method/path             | `GET` `/api/v1/admin/accounts`                                                   |
| Authentication          | Access token; vòng đời token và logout TBD                                       |
| Authorization/ownership | Permission cụ thể TBD; backend kiểm tra quyền và phạm vi dữ liệu                 |
| Idempotency/transaction | TBD; thao tác thay đổi trạng thái phải tránh ghi nhận lặp khi retry              |

### Quyết định triển khai

Các mục TBD bên dưới được thay bởi [quyết định module tài khoản](account-module-decisions.md).
TypeSpec tại packages/api-spec/typespec/admin-accounts.tsp; controller/service tại
apps/api/src/modules/admin-accounts/; kiểm thử HTTP tại apps/api/test/admin-accounts.spec.ts.

### Request

- Path parameters: `query search/filter TBD; account summary`
- Query parameters: dùng cursor pagination khi là danh sách; bộ lọc, giới hạn mặc định/tối đa và thứ tự ổn định TBD.
- Headers: `Authorization: Bearer <accessToken>`; `Idempotency-Key` chỉ dùng khi chính sách được chốt.
- Body: `query search/filter TBD; account summary`; schema TypeSpec chưa được chốt.

### Response thành công

- Status code: `200`.
- Schema response: `list response`
- Danh sách dùng `{ "nextCursor": "...", "total": 0, "items": [] }`; `nextCursor` là `null` khi hết trang.
- ID trả về dạng `string`; thời gian theo `Asia/Ho_Chi_Minh`; tiền tệ VND; loại bỏ dữ liệu riêng tư theo quyền actor.

### Lỗi

- `401` nếu thiếu hoặc không hợp lệ access token; `403` nếu thiếu permission.
- `400 VALIDATION_ERROR` nếu request không hợp lệ.
- `404 NOT_FOUND` nếu tài nguyên không tồn tại hoặc không thuộc phạm vi truy cập.
- `409 CONFLICT` nếu sai trạng thái, xung đột phiên bản hoặc retry không hợp lệ.
- Chi tiết lỗi dùng error envelope chung; mã nghiệp vụ cụ thể TBD.

### Quy tắc nghiệp vụ

- Trạng thái trước/sau, điều kiện chuyển trạng thái và lý do bắt buộc: TBD theo nghiệp vụ của `A-009`.
- Ownership và ma trận quyền: chưa được chốt trong `functions.md`.
- Dữ liệu giao dịch cũ phải giữ được khi tài nguyên không còn hoạt động.
- Side effects (audit, thông báo, cập nhật dữ liệu liên quan): cần chốt trước khi triển khai.

### Liên kết triển khai

- TypeSpec operation: chưa có.
- OpenAPI được sinh: chưa có.
- Controller/service: chưa có.
- Test HTTP hoặc test nghiệp vụ: chưa có.
