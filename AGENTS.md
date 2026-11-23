# Hướng dẫn dự án thương mại điện tử nội thất

Monorepo gồm storefront và trang quản trị Next.js, dùng chung API NestJS theo kiến trúc modular monolith.

## Cấu trúc

```text
apps/storefront              # Next.js: cửa hàng, cổng 3000
apps/admin                   # Next.js: quản trị, cổng 3002
apps/api                     # NestJS: nghiệp vụ và API, cổng 4000
packages/ui                  # Component, CSS và cấu hình PostCSS
packages/api-spec            # TypeSpec shop/admin và OpenAPI được sinh
packages/api-contract        # Schema Zod được sinh và hợp đồng dùng chung
packages/api-client          # Client, hooks và transport gọi API
packages/eslint-config       # Cấu hình ESLint dùng chung
packages/typescript-config   # Cấu hình TypeScript dùng chung
scripts/                     # Công cụ điều phối tại root
docs/                       # Tài liệu kiến trúc và phạm vi
```

Frontend đặt tuyến trang trong `app/`, component trong `components/`, tài nguyên tĩnh trong `public/`. Backend đặt module nghiệp vụ trong `apps/api/src/modules/`.

## Quy ước chung

### Rules và skills theo phạm vi

Bộ tài liệu trong `.agent/rules/` là nguồn chuẩn cho quy ước phát triển của dự án. Trước khi sửa, đọc quy tắc chung và các quy tắc tương ứng dưới đây; không duy trì hoặc tra cứu bộ rules song song tại vị trí khác. Trường `paths` trong rules mô tả phạm vi áp dụng, không bảo đảm công cụ tự nạp tài liệu. Đây là hướng dẫn làm việc, không đồng nghĩa mọi quy tắc đã được công cụ tự động kiểm soát.

| Phạm vi                               | Tài liệu cần đọc                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| Toàn dự án                            | [Quy tắc chung](.agent/rules/project-rules.md)                                                |
| Đặc tả và artifact API                | [Codegen](.agent/rules/codegen-rules.md), [TypeSpec](.agent/rules/api-spec/typespec-rules.md) |
| Backend NestJS                        | [Kiến trúc API](.agent/rules/api/api-rules.md)                                                |
| Controller, pipe và đầu vào HTTP      | [Controller và validation](.agent/rules/api/controller-rules.md)                              |
| Service, usecase và ánh xạ response   | [Service, usecase và mapper](.agent/rules/api/usecase-rules.md)                               |
| Session, quyền và dữ liệu riêng tư    | [Xác thực và phân quyền](.agent/rules/api/auth-rules.md)                                      |
| Storefront, admin và shared UI/client | [Frontend Next.js](.agent/rules/frontend/frontend-rules.md)                                   |
| Thay đổi hành vi hoặc kiểm thử        | [Kiểm thử](.agent/rules/testing-rules.md)                                                     |

### Nguyên tắc áp dụng

- Viết tài liệu và chú thích mới bằng tiếng Việt; giữ nguyên tên API, lệnh và định danh kỹ thuật.
- Dùng TypeScript strict, thụt lề hai dấu cách, nháy kép, không chấm phẩy, xuống dòng LF; tuân theo Prettier và ESLint.
- Tên tệp dùng kebab-case; component/class dùng PascalCase; hook theo mẫu `useThing`. Giữ tên tệp đặc biệt theo framework.
- Giữ nguyên thay đổi không liên quan của người dùng. Không dùng lệnh Git phá hủy để dọn worktree.

## Lịch sử prompt

- Đọc và tuân thủ quy định tại `docs/prompts/README.md`.
- Sau khi hoàn tất yêu cầu có chỉnh sửa file, trước phản hồi cuối, thêm đúng một dòng vào `docs/prompts/prompt-history.md` theo mẫu trong README.
- Không ghi các lượt chỉ hỏi đáp hoặc chỉ sửa chính `prompt-history.md`.
- Dùng ID tiếp theo trong lịch sử thực tế; nếu chưa có bản ghi, bắt đầu từ P-001. Không lấy các dòng ví dụ trong README làm lịch sử.
- Ghi kết quả thực tế, không ghi thông tin nhạy cảm và không sửa hoặc xóa bản ghi cũ khi chưa được yêu cầu.

## Nguyên tắc chia sẻ mã

1. Hợp đồng HTTP và ràng buộc đầu vào thuộc TypeSpec; không tạo thêm nguồn DTO/schema viết tay song song.
2. Mã dùng ở nhiều ứng dụng mới đưa vào thư mục dùng chung phù hợp; mã chỉ dùng một nơi nằm trong ứng dụng đó.
3. Root quản lý thư viện và lệnh cho mã dùng chung. Frontend dùng alias `@shared/*`; cấu hình dùng đường dẫn tương đối.

## Kiến trúc và codegen

- NestJS chịu trách nhiệm nghiệp vụ và truy cập cơ sở dữ liệu; frontend không truy cập database trực tiếp.
- Ưu tiên Server Components, routing bằng next-intl, token giao diện dùng chung. Dùng TanStack Query cho trạng thái máy chủ, Zustand cho trạng thái giao diện cục bộ.
- TypeSpec là nguồn chuẩn của hợp đồng HTTP. Sửa `packages/api-spec/typespec` rồi chạy `pnpm codegen`: TypeSpec → OpenAPI → Zod và API client; cả schema và client đều được sinh từ OpenAPI.
- Commit cả đặc tả và mã được sinh; không sửa artifact bằng tay. Khi xung đột, giải quyết đặc tả trước rồi sinh lại. Không giả định backend handler được sinh tự động.
- Ưu tiên kiểm soát bằng codegen, lint, typecheck và kiểm thử. Không mô tả công cụ hoặc quy tắc chưa triển khai như thể đã hoạt động.

## Môi trường local và lệnh chính

Dùng Node >=22.18 và pnpm 10.33.4 theo `packageManager`. Cấu hình biến môi trường theo `.env.example` của từng app; không commit secret.

```sh
pnpm install
pnpm codegen
pnpm dev                       # Chạy cả ba ứng dụng
pnpm --filter storefront dev   # Chỉ chạy storefront
pnpm --filter admin dev
pnpm --filter api dev
pnpm typecheck                 # Kiểm tra shared source và apps
pnpm lint
pnpm test
pnpm build
pnpm format
pnpm codegen:check             # So artifact được sinh với Git
```

API hiện chỉ có `GET /api/v1/health`, không cần database. Frontend vẫn có màn hình boilerplate; không coi chúng là nghiệp vụ hoàn chỉnh.

## Kiểm thử và hoàn tất thay đổi

Frontend dùng Vitest, Testing Library, MSW trong `tests/unit/` và Playwright trong `tests/e2e/`. API dùng Jest/ts-jest và Supertest trong `test/`. Tên tệp theo `*.test.ts(x)` hoặc `*.spec.ts`.

Coverage frontend cho logic được cấu hình: 90% dòng/hàm/câu lệnh, 80% nhánh. Dùng `pnpm test:coverage` để đo; `pnpm test:e2e` chạy Playwright với bản build production. Thêm kiểm thử hồi quy khi sửa lỗi.

Chạy các kiểm tra liên quan trước khi hoàn tất; thay đổi hợp đồng phải chạy codegen. Báo rõ lệnh đã chạy, lỗi thực tế và kiểm tra chưa thực hiện; không hạ yêu cầu kiểm thử để che lỗi môi trường.

## Commit, PR và Changesets

Dùng Conventional Commits như `feat(api): add product endpoint` hoặc `fix(ui): improve badge contrast`; tiêu đề tối đa 100 ký tự. PR nêu phạm vi, issue liên quan, kết quả kiểm tra và ảnh chụp khi thay đổi giao diện.

Giữ Changesets cho ba app private, không publish npm. Chạy `pnpm changeset` và chọn app bị ảnh hưởng, kể cả khi sửa mã dùng chung. Kiểm tra bằng `pnpm changeset status`; chỉ chạy `pnpm changeset:version` khi thực hiện đợt cập nhật phiên bản.

## Phạm vi và quyết định cần xác nhận

Prisma và Better Auth mới được cài, chưa tích hợp. PostgreSQL là lựa chọn database; chưa triển khai schema, migration, auth handlers hoặc nghiệp vụ. Chưa triển khai payment/email/storage provider, Redis, scheduler hoặc outbox.

Không tự chỉnh Docker, Compose, CI/deploy, provision dịch vụ hay chạy migration; phần hạ tầng do chủ dự án phụ trách. Cấu hình cũ có thể còn đường dẫn trước refactor và cần được rà soát trước khi dùng.

Dừng và hỏi người dùng trước khi chốt điều chưa thống nhất: provider, pre-order, guest checkout, thay đổi mô hình package hoặc thêm thư mục cấp cao nhất. Không tự cài thêm dịch vụ hay abstraction chỉ để dự phòng.
