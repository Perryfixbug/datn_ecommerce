# A-014 Chi tiết sản phẩm chờ duyệt

| Trường                  | Nội dung                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| Mã chức năng/use case   | `A-014`, `U21`                                                                   |
| Actor                   | Nhân viên sàn; quyền cụ thể TBD                                                  |
| Trạng thái              | `specified`                                                                      |
| Nguồn                   | [Admin API](../admin-api.md); [Quy ước API dùng chung](../common-conventions.md) |
| Method/path             | `GET` `/api/v1/admin/product-moderation/{productId}`                             |
| Authentication          | Access token; vòng đời token và logout TBD                                       |
| Authorization/ownership | Permission cụ thể TBD; backend kiểm tra quyền và phạm vi dữ liệu                 |
| Idempotency/transaction | TBD; thao tác thay đổi trạng thái phải tránh ghi nhận lặp khi retry              |

### Request

- Path parameters: `productId: string`
- Query parameters: dùng cursor pagination khi là danh sách; bộ lọc, giới hạn mặc định/tối đa và thứ tự ổn định TBD.
- Headers: `Authorization: Bearer <accessToken>`; `Idempotency-Key` chỉ dùng khi chính sách được chốt.
- Body: `productId: string`; schema TypeSpec chưa được chốt.

### Response thành công

- Status code: `200`.
- Schema response: `moderation detail object`
- Danh sách dùng `{ "nextCursor": "...", "total": 0, "items": [] }`; `nextCursor` là `null` khi hết trang.
- ID trả về dạng `string`; thời gian theo `Asia/Ho_Chi_Minh`; tiền tệ VND; loại bỏ dữ liệu riêng tư theo quyền actor.

### Lỗi

- `401` nếu thiếu hoặc không hợp lệ access token; `403` nếu thiếu permission.
- `400 VALIDATION_ERROR` nếu request không hợp lệ.
- `404 NOT_FOUND` nếu tài nguyên không tồn tại hoặc không thuộc phạm vi truy cập.
- `409 CONFLICT` nếu sai trạng thái, xung đột phiên bản hoặc retry không hợp lệ.
- Chi tiết lỗi dùng error envelope chung; mã nghiệp vụ cụ thể TBD.

### Quy tắc nghiệp vụ

- Trạng thái trước/sau, điều kiện chuyển trạng thái và lý do bắt buộc: TBD theo nghiệp vụ của `A-014`.
- Ownership và ma trận quyền: chưa được chốt trong `functions.md`.
- Dữ liệu giao dịch cũ phải giữ được khi tài nguyên không còn hoạt động.
- Side effects (audit, thông báo, cập nhật dữ liệu liên quan): cần chốt trước khi triển khai.

### Liên kết triển khai

- TypeSpec operation: chưa có.
- OpenAPI được sinh: chưa có.
- Controller/service: chưa có.
- Test HTTP hoặc test nghiệp vụ: chưa có.
