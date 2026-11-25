# Quy ước API dùng chung

Tài liệu này là danh sách quy ước cần chốt trước khi thêm operation vào TypeSpec. Các mục ghi `TBD` không được coi là quyết định triển khai.

## Đã xác nhận

- API dùng prefix `/api/v1`.
- TypeSpec là nguồn chuẩn; OpenAPI và client được sinh tự động.
- Backend kiểm tra xác thực, vai trò, quyền sở hữu, dữ liệu đầu vào và trạng thái nghiệp vụ.
- Dữ liệu công khai của shop phải tách khỏi dữ liệu quản trị.
- Thao tác liên quan đơn hàng, tồn kho, thanh toán, hoàn tiền và ví phải bảo toàn tính toàn vẹn, không ghi nhận lặp khi retry.
- Dữ liệu giao dịch cũ phải giữ được khi sản phẩm hoặc gian hàng không còn hoạt động.

## Cần chốt trước khi triển khai

| STT | Chủ đề                | Đã chọn / Cần quyết định                                                                                                              |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Audience seller       | Bổ sung Seller API vào entrypoint TypeSpec hiện có; không tạo entrypoint seller riêng.                                                |
| 02  | Authentication        | Token gồm `accessToken` và `refreshToken`; TBD: vòng đời, refresh và logout.                                                          |
| 03  | Authorization         | Permission; TBD: tập quyền cụ thể và giới hạn thao tác với chính tài khoản của mình.                                                  |
| 04  | Error envelope        | Response thường, list response và error envelope dùng các mẫu bên dưới.                                                               |
| 05  | Pagination            | Cursor; TBD: giới hạn mặc định/tối đa và thứ tự ổn định.                                                                              |
| 06  | Search/filter         | TBD: Tập bộ lọc, cách chuẩn hóa chuỗi, xử lý không có kết quả.                                                                        |
| 07  | ID/date/money         | Frontend dùng ID dạng `string`; backend validate/chuyển sang `bigint`. Timezone `Asia/Ho_Chi_Minh`; tiền tệ VND; làm tròn đến 1 đồng. |
| 08  | Idempotency           | TBD: Operation nào bắt buộc khóa idempotency và thời hạn lưu khóa.                                                                    |
| 09  | Nhiều gian hàng       | TBD: Tách đơn, phí vận chuyển, voucher, thanh toán và hoàn tiền.                                                                      |
| 10  | Thanh toán/vận chuyển | TBD: Mô phỏng hay provider cụ thể; callback/webhook và trạng thái.                                                                    |
| 11  | Ví điện tử            | TBD: Có triển khai hay không; PIN/OTP, nạp/rút, hoàn tiền và mở khóa.                                                                 |
| 12  | Tệp và media          | TBD: Provider, định dạng, kích thước, quyền truy cập và thời hạn URL.                                                                 |
| 13  | Chatbot/gợi ý         | TBD: Phạm vi dữ liệu, nguồn kiến thức, tiêu chí nghiệm thu và provider.                                                               |
| 14  | Livestream            | TBD: Provider, lưu trữ video, xem/bình luận từ phía người mua.                                                                        |
| 15  | Hoàn hàng             | TBD: Mốc 15 ngày, xác nhận nhận hàng, thời điểm hoàn tiền và tranh chấp.                                                              |

## Mẫu response và lỗi

### Response thường

Response thành công cho một tài nguyên hoặc kết quả đơn dùng trực tiếp object dữ liệu, không bọc thêm `data`:

```json
{
  "id": "123456789012345678",
  "name": "Bàn ăn gỗ"
}
```

### List response

Mọi response danh sách dùng cùng cấu trúc. `nextCursor` là `null` khi không còn trang tiếp theo; `total` là tổng số bản ghi sau khi áp dụng filter, không phải số item trong trang hiện tại:

```json
{
  "nextCursor": "eyJpZCI6MTIzNDU2Nzg5MDEyMzQ1Njc4fQ",
  "total": 125,
  "items": [
    {
      "id": "123456789012345678",
      "name": "Bàn ăn gỗ"
    }
  ]
}
```

List rỗng trả `items: []`, `total: 0` và `nextCursor: null`.

### Error response

Lỗi dùng HTTP status phù hợp và một envelope ổn định:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu đầu vào không hợp lệ",
    "details": [
      {
        "field": "email",
        "code": "INVALID_FORMAT",
        "message": "Email không đúng định dạng"
      }
    ],
    "correlationId": "req_01JABC123"
  }
}
```

`code` là mã ổn định cho client; `details` là tùy chọn và chỉ dùng cho thông tin validation hoặc nghiệp vụ an toàn; `correlationId` dùng để truy vết log và không chứa secret.

## Phân trang và lọc

Các màn hình danh sách trong `functions.md` cần hỗ trợ lọc/tìm kiếm theo nghiệp vụ tương ứng và dùng phân trang Cursor. Mỗi operation phải ghi rõ query parameter, giới hạn mặc định/tối đa và thứ tự ổn định.

## Tiền, ngày giờ và dữ liệu riêng tư

Không trả dữ liệu nhạy cảm vượt quá quyền của actor. ID truyền qua HTTP luôn là chuỗi thập phân; frontend giữ kiểu `string`, backend validate miền số rồi chuyển sang `bigint`, response trả lại dạng chuỗi để tránh mất chính xác JavaScript. Ngày thuần dùng `YYYY-MM-DD`; thời điểm dùng ISO 8601 có offset và được quy đổi theo timezone `Asia/Ho_Chi_Minh` khi hiển thị. Tiền tệ là VND, giá trị API là số nguyên đồng; mọi phép làm tròn thực hiện đến 1 đồng.
