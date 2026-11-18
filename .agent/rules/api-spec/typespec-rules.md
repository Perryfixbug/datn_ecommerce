---
paths:
  - "packages/api-spec/**"
---

# Quy tắc TypeSpec

- Giữ hai entrypoint typespec/shop.tsp và typespec/admin.tsp. Mô hình thực sự dùng chung đặt ở common/ theo cấu trúc hiện có; thêm import ở đúng entrypoint sử dụng.
- Tách đặc tả theo tài nguyên khi cần, không dựng sẵn hàng loạt tệp chưa dùng. Model dùng PascalCase, trường dùng camelCase; tên operation rõ nghĩa và ổn định cho client được sinh.
- Đưa ràng buộc HTTP về độ dài, miền giá trị, bắt buộc và định dạng vào đặc tả. Không lặp lại thành một bộ schema viết tay độc lập ở API hoặc frontend.
- Viết @doc bằng tiếng Việt cho ý nghĩa, đơn vị, trạng thái và ràng buộc không hiển nhiên. Không áp dụng quy tắc bỏ chấm phẩy TypeScript vào cú pháp TypeSpec.
- Chọn kiểu số theo miền dữ liệu; số lượng nguyên dùng kiểu nguyên phù hợp. Tiền tệ, đơn vị, độ chính xác, làm tròn và cách biểu diễn qua JSON phải được thống nhất trước khi triển khai và ghi rõ trong đặc tả.
- Với endpoint nghiệp vụ, mô tả rõ response và lỗi thực sự có thể trả về; dùng model lỗi có tên nếu cần dùng chung. Không thêm quy ước phân trang/error envelope chưa được duyệt chỉ để chuẩn hóa trước.
- Tách dữ liệu công khai cho shop khỏi dữ liệu quản trị. Việc tách OpenAPI không thay thế kiểm tra quyền tại backend.
- Sau khi sửa, chạy pnpm codegen tại root và rà artifact; không dùng pnpm --filter api-spec vì đây không phải workspace package.

## Tính tương thích và ngữ nghĩa

- Hiện hai entrypoint dùng `common/health.tsp`. Chỉ dùng chung model khi shop/admin cùng ngữ nghĩa và tập trường; không dùng model admin rồi để shop ẩn trường.
- Operation ID ảnh hưởng hàm client, hook và query key. Đổi tên, method, route, trường bắt buộc hoặc enum phải rà consumer, không coi là sửa tài liệu thuần.
- Phân biệt optional, trường vắng mặt và `null`; không đổi thành chuỗi rỗng tùy ý. Enum không tự bảo đảm chuyển trạng thái nghiệp vụ hợp lệ.
- Kiểm tra miền số và giới hạn số nguyên an toàn JavaScript trước khi chọn `int64`. Chọn `int32`, `int64` hoặc kiểu số khác theo miền dữ liệu thực và khả năng biểu diễn của API/client, không áp một kiểu cho mọi trường.
- Phân biệt ngày thuần và thời điểm có múi giờ, ghi ngữ nghĩa trong `@doc`. Tiền tệ và làm tròn phải theo quyết định nghiệp vụ được duyệt của dự án.
- Khai báo lỗi thực tế trong return union, gồm xác thực/phân quyền khi cần. Model lỗi có tên tránh sinh kiểu trùng cho từng operation.
- TypeSpec không tự đổi NestJS exception/status. Sau codegen phải cập nhật controller/pipe viết tay và test HTTP; kiểm tra coercion/default/refinement thực tế thay vì chỉ đọc kiểu.
