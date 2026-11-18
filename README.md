# Furniture Ecommerce

Monorepo cho thương mại điện tử nội thất: Next.js storefront/admin và NestJS modular monolith.

## Quy ước phát triển

Bộ tài liệu trong `.agent/rules/` là nguồn chuẩn cho quy ước phát triển của dự án. Đọc [quy tắc chung](.agent/rules/project-rules.md) và chọn rules theo phạm vi trong [AGENTS.md](AGENTS.md) trước khi thay đổi. TypeSpec vẫn là nguồn chuẩn riêng của hợp đồng HTTP; quy tắc không thay thế đặc tả hoặc kết quả kiểm chứng source/config thực tế.

## Cấu trúc

Chỉ có 4 package.json: root và apps/storefront, apps/admin, apps/api. Workspace chỉ gồm apps/\*. Mỗi app có scripts dev/build/start/test/typecheck/lint riêng. Root điều phối và quản lý dependency/tooling của source dùng chung.

Thư mục packages/ là source/config thông thường, không phải workspace package:

- ui: component, CSS và PostCSS dùng chung.
- api-spec: TypeSpec shop/admin và OpenAPI artifacts.
- api-contract: Zod schemas sinh từ OpenAPI.
- api-client: Axios/Query clients, hooks, server transport theo từng request.
- eslint-config, typescript-config: cấu hình dùng chung qua đường dẫn local.

Alias @shared/\* chỉ ánh xạ tới source trong tsconfig/Vitest, không phải npm package.

## Cài và chạy

Node >=22.18, pnpm 10.33.4 theo packageManager. Chạy ở root:

```sh
pnpm install
pnpm codegen
pnpm --filter storefront dev
pnpm --filter admin dev
pnpm --filter api dev
```

Cổng mặc định: storefront 3000, admin 3002, API 4000. Cấu hình frontend theo .env.example trước khi chạy. API skeleton chỉ có GET /api/v1/health, không cần database. pnpm dev chạy đồng thời cả ba app.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm --filter api test
pnpm --filter storefront build
pnpm clean
```

Root typecheck/lint bao gồm cả source dùng chung; các app cũng có thể chạy độc lập bằng filter. Turbo theo dõi packages/\*\* như dependency đầu vào toàn cục để tránh cache cũ khi source dùng chung đổi.

## Codegen

Sửa packages/api-spec/typespec rồi chạy pnpm codegen. Root script biên dịch TypeSpec thành OpenAPI, sau đó sinh Zod và frontend client từ OpenAPI, không cần backend đang chạy. Commit source và generated artifacts, không sửa generated files bằng tay.

pnpm codegen:check kiểm tra artifact khác Git sau khi regenerate. Trong lần refactor đầu, artifact chưa commit được báo là thay đổi đúng thiết kế.

## Changesets

Giữ Changesets cho nhóm, version/changelog theo ba app private, không publish npm. Khi thay đổi source dùng chung, tạo changeset cho các app bị ảnh hưởng.

```sh
pnpm changeset
pnpm changeset status
pnpm changeset:version
```

## node_modules và pnpm

Chỉ giữ node_modules ở root và ba app để pnpm resolve dependency. node_modules/.pnpm là virtual store chung; nhiều mục trong app là junction/symlink, không phải bản copy độc lập. packages/\* không còn node_modules. pnpm install có thể tạo lại các liên kết cần thiết; không xóa chúng thủ công để giảm dung lượng.

## Phạm vi

Đã refactor cấu trúc và cài thư viện nền, chưa triển khai auth/database/nghiệp vụ. Giao diện hiện vẫn là boilerplate. Prisma và Better Auth chỉ được cài; chưa có schema/migration/auth handlers. Chưa cài email/storage/payment SDK, Redis hoặc scheduler/outbox.

## Docker và CI

Docker Compose gồm storefront (3000), admin (3002) và API (4000). Frontend gọi API qua `http://api:4000` trong mạng Docker. Các cổng chỉ mở trên loopback của máy local. Dừng dev server đang dùng cùng cổng trước khi chạy:

```sh
docker compose config --quiet
docker compose up --build -d
docker compose ps
docker compose down
```

Không chạy database hay migration. Có thể đổi `STOREFRONT_PORT`, `ADMIN_PORT`, `API_PORT`; khi đổi cổng frontend, đặt `STOREFRONT_URL` hoặc `ADMIN_URL` tương ứng trước khi build vì `NEXT_PUBLIC_APP_URL` được nhúng vào bundle.

CI kiểm tra codegen, lint, typecheck, coverage, build ứng dụng và build ba Docker image. E2E chạy production build riêng cho storefront/admin. Release chỉ tạo PR cập nhật phiên bản các app private bằng Changesets, không publish npm. Repository cần cho phép GitHub Actions tạo PR.

Xem docs/architecture/refactor-scope.md để biết phạm vi hiện hành.
