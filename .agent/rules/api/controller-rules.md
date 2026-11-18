---
paths:
  - "apps/api/src/modules/**"
  - "apps/api/src/common/pipes/**"
  - "apps/api/test/**"
---

# Controller và validation

## Luồng xử lý

Controller NestJS được viết tay trong module sở hữu endpoint. Pipeline codegen chỉ sinh hợp đồng và client, không sinh controller.

1. Định nghĩa method, route, đầu vào, response và lỗi trong TypeSpec rồi sinh mã.
2. Gắn schema được sinh vào pipe đúng điểm nhận body/query/params; có schema chưa tự kiểm tra request.
3. Lấy danh tính từ ngữ cảnh đã xác thực khi auth được triển khai, gọi service/usecase của module.
4. Trả đúng status và kiểu response; dùng mapper khi cần chuyển đổi hoặc loại bỏ trường nội bộ.

Không truy vấn DB, tính tiền hoặc điều phối nhiều bước nghiệp vụ trong controller. Health đơn giản không cần service chỉ để chuyển tiếp response.

## Validation

- Dùng `src/common/pipes/zod-validation.pipe.ts` và schema từ `packages/api-contract`; không viết lại hợp đồng bằng `z.object`, DTO class-validator hoặc ép kiểu body bằng `as`.
- Ràng buộc độ dài, miền giá trị, định dạng và bắt buộc thuộc TypeSpec. Đọc output để xác nhận generator giữ ràng buộc cần dùng.
- Chỉ mở rộng schema được sinh cho ràng buộc liên trường chưa biểu diễn được trong pipeline. Đặt phần mở rộng có tên trong module, kiểm thử riêng, không thay schema gốc.
- Kiểm tra cần DB/trạng thái hiện tại thuộc service/usecase, không thuộc pipe.
- Chuẩn hóa lỗi ở pipe/filter khi có yêu cầu, không copy từng controller. Pipe hiện trả `VALIDATION_ERROR`, chưa có error envelope toàn API được thống nhất.

## Query và response

- Query/params ban đầu là chuỗi; type TypeScript không tự chuyển kiểu. Chuyển ở cấu hình sinh schema hoặc adapter/pipe phù hợp, kèm test HTTP; không sửa generated.
- Không dùng `Boolean(value)` hoặc `z.coerce.boolean()` cho query: chuỗi `"false"` cũng có thể thành `true`. Xử lý rõ giá trị hợp lệ theo hợp đồng.
- Với số, thử chuỗi rỗng, không phải số, ngoài miền và số thập phân khi yêu cầu số nguyên. Không mặc định `Number("")` hợp lệ.
- Mặc định thuộc đặc tả. Ưu tiên kết quả parse/hằng được sinh nếu có; nếu chưa hỗ trợ, giải quyết ở nguồn/cấu hình chung, không rải số mặc định qua controller.
- Khai báo kiểu response từ hợp đồng, không dùng `any`/ép kiểu che sai lệch. Kiểu không tự kiểm tra JSON runtime; chưa có response validator toàn cục.
- Kiểm tra status mặc định NestJS, nhất là POST; route TypeSpec phải khớp global prefix `api/v1` và decorator controller.
- Endpoint có input cần request hợp lệ và không hợp lệ qua HTTP. Test pipe riêng không phát hiện việc quên gắn pipe vào route.
