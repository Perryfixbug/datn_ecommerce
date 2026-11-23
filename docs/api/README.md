# Tài liệu API

## Trạng thái tài liệu

Tài liệu này được sinh từ [danh sách thiết kế chức năng](../specs/functions.md) và dùng để chuẩn bị hợp đồng HTTP. `functions.md` mô tả nghiệp vụ và ca sử dụng, không phải danh sách endpoint đã triển khai.

| Trạng thái    | Ý nghĩa                                                          |
| ------------- | ---------------------------------------------------------------- |
| `implemented` | Có trong TypeSpec/OpenAPI và có handler tương ứng trong API.     |
| `specified`   | Đã có trong TypeSpec/OpenAPI nhưng chưa xác nhận handler đầy đủ. |
| `planned`     | Được đề xuất từ chức năng, chưa được thêm vào TypeSpec.          |
| `blocked`     | Chưa thể chốt vì chính sách hoặc phạm vi còn thiếu.              |

Hiện tại API thực tế chỉ có `GET /api/v1/health`, trạng thái `implemented` ở cả shop và admin. Các chức năng A, C và S trong tài liệu bên dưới chưa được coi là endpoint đã tồn tại.

## Tài liệu

- [Danh mục API](api-catalog.md): ánh xạ mã chức năng, use case, actor và trạng thái.
- [Quy ước dùng chung](common-conventions.md): các quy ước cần chốt trước khi đưa vào TypeSpec.
- [Shop API](shop-api.md): bề mặt API dự kiến cho người mua.
- [Admin API](admin-api.md): bề mặt API dự kiến cho nhân viên sàn.
- [Seller API](seller-api.md): bề mặt API dự kiến cho người bán.
- [Mẫu mô tả endpoint](endpoint-template.md): mẫu chuẩn cho từng operation.
- [Ma trận truy vết](traceability-matrix.md): liên kết từ yêu cầu đến contract, mã nguồn và kiểm thử.

## Nguồn chuẩn và nguyên tắc

- TypeSpec trong `packages/api-spec/typespec` là nguồn chuẩn của hợp đồng HTTP.
- OpenAPI, Zod và API client trong vùng `generated` là artifact được sinh; không sửa trực tiếp.
- Backend NestJS phải thực thi xác thực, phân quyền, ownership, validation và kiểm tra trạng thái.
- Không tự bổ sung provider thanh toán, vận chuyển, email, storage hoặc livestream.
- Không suy ra pre-order hoặc guest checkout từ chức năng khám phá sản phẩm.
- Những quyết định chưa có trong nguồn được ghi `TBD`, không biến thành yêu cầu đã duyệt.

## Phạm vi sinh tài liệu lần này

Lần này chỉ tạo tài liệu thiết kế API và ma trận đối chiếu. Chưa sửa TypeSpec, OpenAPI, schema Zod, API client, controller hoặc service nghiệp vụ. Việc triển khai contract sẽ thực hiện sau khi chốt path, quyền, model lỗi và các chính sách còn thiếu.
