# Ma trận truy vết API

## Mục đích

Ma trận này dùng để kiểm tra một yêu cầu từ tài liệu chức năng đã đi qua đủ các lớp hay chưa. Một ô trống là khoảng trống cần xử lý, không phải lý do để tự tạo contract.

## Chuỗi truy vết

```text
functions.md
  -> api-catalog.md và tài liệu audience
  -> TypeSpec
  -> OpenAPI generated
  -> Zod/API client generated
  -> NestJS controller/service
  -> test HTTP/nghiệp vụ
```

## Nguồn hiện tại

| Lớp             | Đường dẫn                                                                                                    | Trạng thái                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Chức năng       | [`docs/specs/functions.md`](../specs/functions.md)                                                           | Có 23 use case, mã A/C/S; là thiết kế nghiệp vụ. |
| Tổng quan       | [`docs/specs/overview.md`](../specs/overview.md)                                                             | Có phạm vi và actor.                             |
| TypeSpec shop   | [`packages/api-spec/typespec/shop.tsp`](../../packages/api-spec/typespec/shop.tsp)                           | Chỉ có health.                                   |
| TypeSpec admin  | [`packages/api-spec/typespec/admin.tsp`](../../packages/api-spec/typespec/admin.tsp)                         | Chỉ có health.                                   |
| TypeSpec common | [`packages/api-spec/typespec/common/health.tsp`](../../packages/api-spec/typespec/common/health.tsp)         | Có operation health.                             |
| OpenAPI shop    | [`packages/api-spec/generated/shop-openapi.yaml`](../../packages/api-spec/generated/shop-openapi.yaml)       | Chỉ có `GET /api/v1/health`.                     |
| OpenAPI admin   | [`packages/api-spec/generated/admin-openapi.yaml`](../../packages/api-spec/generated/admin-openapi.yaml)     | Chỉ có `GET /api/v1/health`.                     |
| API runtime     | [`apps/api/src/modules/health/health.controller.ts`](../../apps/api/src/modules/health/health.controller.ts) | Handler health đã có.                            |
| Test            | [`apps/api/test/health.spec.ts`](../../apps/api/test/health.spec.ts)                                         | Có test health.                                  |
| Database        | [`docs/specs/database/DB_Schema.md`](../specs/database/DB_Schema.md)                                         | Nguồn mô hình dữ liệu; chưa phải HTTP contract.  |

## Trạng thái coverage theo audience

| Audience | Mã chức năng | Tài liệu | TypeSpec           | OpenAPI/client | Handler/test |
| -------- | ------------ | -------- | ------------------ | -------------- | ------------ |
| Admin    | A-001–A-039  | Có       | Chưa có            | Chưa có        | Chưa có      |
| Shop     | C-001–C-066  | Có       | Chưa có            | Chưa có        | Chưa có      |
| Seller   | S-001–S-070  | Có       | Chưa có entrypoint | Chưa có        | Chưa có      |
| Common   | Health       | Có       | Có                 | Có             | Có           |

## Các khoảng trống cần đóng

1. Chốt entrypoint và tag cho seller API.
2. Chốt authentication, authorization và ma trận quyền nhân viên.
3. Chốt error model, pagination, filter và quy ước ID/date/money.
4. Chốt các chính sách nhiều gian hàng, hủy/hoàn hàng và state machine đơn hàng.
5. Chốt ví nội bộ, PIN/OTP, provider thanh toán/vận chuyển và media.
6. Chốt chatbot, gợi ý, livestream và dữ liệu riêng tư.
7. Chuyển từng nhóm chức năng đã duyệt thành TypeSpec, sau đó chạy codegen.
8. Viết handler và test; không coi generated client là implementation backend.

## Kiểm tra khi bổ sung operation

- Mã chức năng và nguồn nghiệp vụ có trong tài liệu.
- Operation có request/response/error rõ ràng.
- Có auth, permission, ownership và trạng thái.
- Có test HTTP và test workflow khi có side effect.
- `pnpm codegen:check` không phát hiện artifact lệch TypeSpec.
