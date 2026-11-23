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

## Chạy local

Cần Node >=22.18, pnpm 10.33.4 và Docker Compose cho PostgreSQL. Thực hiện từ root repository:

1. Cài dependency và sinh hợp đồng API:

   ```sh
   pnpm install
   pnpm codegen
   ```

2. Tạo `apps/api/.env` theo [mẫu](apps/api/.env.example). Đổi `POSTGRES_PASSWORD` và cập nhật mật khẩu tương ứng trong `DATABASE_URL`; giữ `POSTGRES_USER`, `POSTGRES_DB` và cổng local `55432` như mẫu nếu dùng seed demo. Tạo `apps/storefront/.env.local` và `apps/admin/.env.local` theo `.env.example` của từng app: `BACKEND_URL=http://localhost:4000`, `NEXT_PUBLIC_APP_URL` lần lượt là `http://localhost:3000` và `http://localhost:3002`. Không commit các file môi trường.

3. Chạy riêng PostgreSQL và kiểm tra trạng thái:

   ```sh
   docker compose up -d --no-deps --wait postgres
   docker compose ps postgres
   ```

4. Với **database mới, trống**, kiểm tra và áp dụng migration đã có. Không dùng `migrate reset` hoặc `db push` trên database có dữ liệu; cần đánh giá baseline trước khi migrate DB hiện hữu.

   ```sh
   pnpm --filter api exec prisma migrate status
   pnpm --filter api exec prisma migrate deploy
   ```

5. Tùy chọn: tạo nhân viên demo bị khóa và ba danh mục gốc Bàn, Ghế, Tủ. Lệnh chỉ nhận kết nối PostgreSQL local đúng cấu hình mẫu; chạy lại không nhân đôi dữ liệu.

   ```sh
   pnpm --filter api prisma:seed
   ```

6. Chạy các ứng dụng trong các terminal riêng, hoặc dùng `pnpm dev` để chạy đồng thời:

   ```sh
   pnpm --filter api dev
   pnpm --filter storefront dev
   pnpm --filter admin dev
   ```

Storefront: `http://localhost:3000`; admin: `http://localhost:3002`; API: `http://localhost:4000/api/v1/health`. API cần database hoạt động ngay khi khởi động; endpoint health chỉ xác nhận ứng dụng đang chạy, không kiểm tra DB mỗi request. Dừng riêng PostgreSQL bằng `docker compose stop postgres` sau khi dừng API. Không dùng `docker compose down -v` nếu muốn giữ dữ liệu.

Các lệnh kiểm tra từ root:

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

Prisma đã có schema, migration PostgreSQL, kết nối runtime NestJS và seed demo local; seed không chạy tự động khi khởi động API. Better Auth chưa tích hợp, tài khoản demo bị khóa không thể đăng nhập. API mới có endpoint health; frontend vẫn là boilerplate, chưa có nghiệp vụ hoàn chỉnh. Chưa tích hợp email/storage/payment provider, Redis hoặc scheduler/outbox. Xem [hướng dẫn API](apps/api/README.md) và [đặc tả database](docs/specs/database/DB_Schema.md).

## Docker và CI

Docker Compose có PostgreSQL (cổng host 55432), storefront (3000), admin (3002) và API (4000); các cổng chỉ mở trên loopback. **Luồng chạy ở trên là database bằng Docker, ứng dụng chạy trên host.** Compose hiện chưa truyền `DATABASE_URL` cho service API và không khai báo phụ thuộc API vào PostgreSQL, nên không dùng `docker compose up --build -d` để khởi động toàn bộ stack khi chưa cấu hình hai phần này. `DATABASE_URL` trong container phải trỏ đến `postgres:5432`, không phải `127.0.0.1:55432`. Frontend trong Docker dùng `http://api:4000`.

Có thể đổi `STOREFRONT_PORT`, `ADMIN_PORT`, `API_PORT`; khi đổi cổng frontend, đặt `STOREFRONT_URL` hoặc `ADMIN_URL` tương ứng trước khi build vì `NEXT_PUBLIC_APP_URL` được nhúng vào bundle. Seed demo dùng cố định cổng database host 55432.

CI kiểm tra codegen, lint, typecheck, coverage, build ứng dụng và build ba Docker image. E2E chạy production build riêng cho storefront/admin. Release chỉ tạo PR cập nhật phiên bản các app private bằng Changesets, không publish npm. Repository cần cho phép GitHub Actions tạo PR.

Xem [quy tắc dự án](.agent/rules/project-rules.md) và [AGENTS.md](AGENTS.md) để biết phạm vi hiện hành.
