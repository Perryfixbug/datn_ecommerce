---
paths:
  - "apps/api/src/modules/**"
  - "apps/api/test/**"
---

# Service, usecase và mapper

Áp dụng cho nghiệp vụ trong `apps/api/src/modules/`. Các quy tắc dữ liệu và transaction áp dụng khi chức năng tương ứng được triển khai, không khẳng định các module thương mại điện tử đã tồn tại.

## Service và usecase

- Bắt đầu với service của module. Tách usecase khi luồng nhiều bước/dependency hoặc transaction cần tên riêng; không bắt buộc một class `execute` cho mọi endpoint.
- Input nội bộ có thể là type riêng diễn đạt nghiệp vụ, không tạo nguồn DTO/schema HTTP song song TypeSpec.
- Không nhận `Request`/`Response` Express để đọc cookie/gửi response trong nghiệp vụ. Controller truyền danh tính đã xác minh và dữ liệu đã kiểm tra.
- Không tạo chuỗi usecase gọi lẫn nhau chỉ để tái sử dụng; tách hàm thuần/service có trách nhiệm rõ khi cần.
- Ánh xạ lỗi nghiệp vụ sang lỗi hợp đồng có chủ đích. Không bắt mọi lỗi rồi trả danh sách rỗng hoặc thành công giả.

## Dữ liệu và transaction

- Controller không dùng Prisma. Khi tích hợp, service đơn giản có thể dùng provider dữ liệu của module; tách repository khi giúp gom truy vấn hoặc ngăn thiếu điều kiện quyền.
- Không dựng repository CRUD tổng quát/interface cho mọi model chỉ để dự phòng thay ORM.
- Áp dụng điều kiện quyền nhất quán cho đọc, ghi và tổng số. Không tin `customerId`/role client gửi để quyết định phạm vi.
- Ghi nhiều bản ghi cần ranh giới nguyên tử rõ. Nếu có repository, truyền ngữ cảnh transaction theo thiết kế, không để mỗi nơi mở transaction độc lập.
- Với cập nhật cạnh tranh như trừ tồn kho, tránh chỉ đọc rồi ghi thiếu bảo vệ; chọn transaction/cập nhật có điều kiện theo yêu cầu đã duyệt và kiểm thử tương ứng.
- Không giữ transaction mở lúc gọi payment/email/storage; không tự thêm retry, queue hoặc outbox khi chưa được duyệt.

## Hàm thuần và mapper

- Tách phép tính/quy tắc nhiều nhánh để thử không cần NestJS/DB. Nhận dữ liệu tối thiểu, tránh phụ thuộc giờ thực/global khi cần kết quả xác định.
- Không bắt hàm thuần phụ thuộc Prisma nếu chỉ cần vài trường; không tạo entity class khi chưa có bất biến cần quản lý.
- Mapper nằm trong module, trả kiểu response được sinh. Chọn rõ trường công khai, không spread bản ghi DB chứa trường nhạy cảm.
- Chuyển ngày giờ, số, nullable theo hợp đồng; không để `Date`, `Decimal`, `bigint` vô tình quyết định JSON.
- Mapper không gọi DB, gây tác dụng phụ hoặc tính lại giá cuối/trạng thái/quyền; các kết quả đó thuộc service/usecase.
- Endpoint trả dữ liệu đơn giản đúng hợp đồng không cần mapper riêng.
