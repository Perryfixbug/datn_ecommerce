---
paths:
  - "packages/api-spec/**"
  - "packages/api-contract/**"
  - "packages/api-client/**"
  - "scripts/codegen.mjs"
  - "scripts/check-generated.mjs"
---

# Quy tắc sinh mã

TypeSpec trong packages/api-spec/typespec là nguồn chuẩn cho hợp đồng HTTP. Hai entrypoint shop.tsp và admin.tsp tạo đặc tả riêng cho cửa hàng và quản trị.

| Đường dẫn                                   | Nguồn sinh                         |
| ------------------------------------------- | ---------------------------------- |
| packages/api-spec/generated/\*-openapi.yaml | TypeSpec                           |
| packages/api-contract/src/generated/\*\*    | Orval Zod từ OpenAPI               |
| packages/api-client/src/generated/\*\*      | Orval React Query/Axios từ OpenAPI |

Không sửa trực tiếp các vùng trên. Những file ngoài generated như src/lib/axios-instance.ts, src/transport/server.ts và hooks là mã viết tay; không xóa chúng khi tái sinh.

1. Đọc scripts/codegen.mjs và cấu hình Orval trước khi đổi pipeline.
2. Sửa đặc tả hoặc cấu hình nguồn, chạy pnpm codegen từ root; không cần API đang chạy.
3. Rà cả hai audience, import/export và artifact cũ còn sót khi xóa/đổi operation. Pipeline hiện không có bước xóa toàn bộ output; không giả định file cũ tự biến mất. Nếu cần xóa, xác minh đúng artifact không còn được sinh và phạm vi đường dẫn trước khi thao tác.
4. Commit đặc tả cùng artifact. Khi có xung đột, giải quyết nguồn rồi sinh lại, không trộn thủ công mã generated hay ghi đè thay đổi người khác.
5. Chạy typecheck và kiểm thử liên quan. pnpm codegen:check tái sinh rồi so với Git; diff chưa commit không tự chứng minh generator sai.

Pipeline chỉ sinh OpenAPI, Zod và React Query/Axios client; controller, route và handler NestJS phải được triển khai, đối chiếu đặc tả và kiểm thử riêng. Chỉ dùng lệnh codegen đã khai báo trong `package.json` của repository.

## Nguồn và kiểm chứng

- `packages/api-contract/orval.config.ts` sở hữu cách sinh Zod; `packages/api-client/orval.config.ts` sở hữu client. Cả hai lấy từ OpenAPI, client không được sinh từ Zod.
- Generator thiếu ràng buộc thì kiểm tra cấu hình/output và sửa nguồn phù hợp, không thay schema bằng bản viết tay. Mọi tệp trong các vùng generated nêu trên đều không được sửa thủ công.
- Rà operation ID, error model, nullable/default, import/export và artifact cũ khi bỏ operation; pipeline chưa tự dọn toàn bộ output.
- `pnpm codegen:check` chạy lại codegen rồi so trạng thái Git của generated, có thể ghi artifact; không coi là lệnh chỉ đọc. Nó không chứng minh NestJS gắn pipe hoặc route đúng hợp đồng.
- Không tự thêm xóa đệ quy/dọn output khi chỉ sửa tài liệu. Không format toàn repository hoặc làm OpenAPI lệch output TypeSpec.
