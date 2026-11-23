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

| Chủ đề                | Cần quyết định                                                                        |
| --------------------- | ------------------------------------------------------------------------------------- |
| Audience seller       | Dùng entrypoint TypeSpec riêng hay bổ sung vào một entrypoint hiện có?                |
| Authentication        | Session, token hay cơ chế khác; vòng đời, refresh và logout.                          |
| Authorization         | Role/permission cụ thể của nhân viên; giới hạn thao tác với chính tài khoản của mình. |
| Error envelope        | Tên trường, mã lỗi ổn định, chi tiết validation và correlation ID.                    |
| Pagination            | Cursor hay offset; giới hạn mặc định/tối đa; thứ tự ổn định.                          |
| Search/filter         | Tập bộ lọc, cách chuẩn hóa chuỗi, xử lý không có kết quả.                             |
| ID/date/money         | Kiểu ID, timezone, tiền tệ, đơn vị tiền và quy tắc làm tròn.                          |
| Idempotency           | Operation nào bắt buộc khóa idempotency và thời hạn lưu khóa.                         |
| Nhiều gian hàng       | Tách đơn, phí vận chuyển, voucher, thanh toán và hoàn tiền.                           |
| Thanh toán/vận chuyển | Mô phỏng hay provider cụ thể; callback/webhook và trạng thái.                         |
| Ví điện tử            | Có triển khai hay không; PIN/OTP, nạp/rút, hoàn tiền và mở khóa.                      |
| Tệp và media          | Provider, định dạng, kích thước, quyền truy cập và thời hạn URL.                      |
| Chatbot/gợi ý         | Phạm vi dữ liệu, nguồn kiến thức, tiêu chí nghiệm thu và provider.                    |
| Livestream            | Provider, lưu trữ video, xem/bình luận từ phía người mua.                             |
| Hoàn hàng             | Mốc 15 ngày, xác nhận nhận hàng, thời điểm hoàn tiền và tranh chấp.                   |

## Mẫu response và lỗi

Chưa chốt envelope chính thức. Khi viết operation, phải mô tả riêng response thành công và lỗi thay vì tự áp dụng một schema chưa được duyệt. Các lỗi tối thiểu cần xem xét gồm xác thực, không đủ quyền, không tìm thấy, validation, xung đột trạng thái và lỗi nghiệp vụ.

## Phân trang và lọc

Các màn hình danh sách trong `functions.md` cần hỗ trợ lọc/tìm kiếm theo nghiệp vụ tương ứng, nhưng chưa được phép tự chọn query parameter hoặc chiến lược phân trang. Mỗi operation phải ghi rõ giới hạn và thứ tự sau khi chính sách được chốt.

## Tiền, ngày giờ và dữ liệu riêng tư

Không trả dữ liệu nhạy cảm vượt quá quyền của actor. Ngày thuần và thời điểm có múi giờ phải được phân biệt. Tiền tệ và làm tròn phải theo quyết định nghiệp vụ; không suy ra provider hoặc đơn vị tiền từ tên chức năng.
