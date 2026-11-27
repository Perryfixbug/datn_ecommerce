# A-029 Danh sách yêu cầu/khiếu nại

> Trạng thái triển khai: **ĐÃ LÀM**: đã có hợp đồng, module NestJS và kiểm thử liên quan. Xem [bảng tiến độ và mức kiểm chứng](../admin-api.md#tổng-quan-tiến-độ).

- Trạng thái: đã triển khai source, TypeSpec và kiểm thử HTTP; migration khiếu nại đã áp dụng thành công.
- Method/path: `GET /api/v1/admin/cases`.
- Authentication: Bearer access token, kiểm tra tài khoản đang hoạt động.
- Quyền, request/response, trạng thái, lỗi và transaction: [Quyết định module hồ sơ](case-module-decisions.md).
- TypeSpec operation: `Furniture.Admin.Cases.listAdminCases`; schema nguồn `packages/api-spec/typespec/admin-cases.tsp`.
- OpenAPI: `packages/api-spec/generated/admin-openapi.yaml`; Zod/client được sinh bằng `pnpm codegen`.
- Controller/service: `apps/api/src/modules/admin-cases/`.
- Test HTTP: `apps/api/test/admin-cases.spec.ts`.
