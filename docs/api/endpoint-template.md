# Mẫu mô tả endpoint

Dùng mẫu này khi một operation đã được chốt để đưa vào TypeSpec và tài liệu API. Không điền giá trị suy đoán cho các mục chưa được duyệt.

## `<Tên operation>`

| Trường                  | Nội dung                                                    |
| ----------------------- | ----------------------------------------------------------- |
| Mã chức năng/use case   | `C-000`, `U0`                                               |
| Actor                   | Người mua / người bán / nhân viên sàn                       |
| Trạng thái              | `planned` / `specified` / `implemented` / `blocked`         |
| Nguồn                   | Link đến `functions.md`, overview hoặc quyết định nghiệp vụ |
| Method/path             | `GET /api/v1/...`                                           |
| Authentication          | TBD hoặc cơ chế đã duyệt                                    |
| Authorization/ownership | Quyền và tài nguyên actor được phép truy cập                |
| Idempotency/transaction | Có bắt buộc hay không và phạm vi khóa                       |

### Request

- Path parameters: tên, kiểu, ràng buộc.
- Query parameters: tên, kiểu, mặc định, giới hạn và thứ tự.
- Headers: chỉ liệt kê header đã được phê duyệt.
- Body: schema TypeSpec và quy tắc validation.

### Response thành công

- Status code.
- Schema response.
- Điều kiện dữ liệu rỗng hoặc `null`.
- Dữ liệu nhạy cảm được loại bỏ theo actor.

### Lỗi

- Authentication/authorization.
- Validation.
- Not found.
- Conflict hoặc sai trạng thái.
- Lỗi nghiệp vụ tích hợp nếu đã chốt provider.

### Quy tắc nghiệp vụ

- Trạng thái trước và sau.
- Ownership.
- Tính toàn vẹn dữ liệu.
- Side effects như thông báo, audit hoặc cập nhật tồn kho.

### Liên kết triển khai

- TypeSpec operation.
- OpenAPI được sinh.
- Controller/service.
- Test HTTP hoặc test nghiệp vụ.
