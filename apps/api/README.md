# API skeleton

`DatabaseModule` cung cấp `PrismaService` qua DI. Module nghiệp vụ cần import `DatabaseModule` để inject provider này. Runtime đọc `.env` tại thư mục làm việc hoặc `apps/api/.env`; biến môi trường có sẵn được ưu tiên. URL phải dùng `postgres:` hoặc `postgresql:`, có host và tên database. Không log URL/mật khẩu.

Ứng dụng kết nối khi khởi tạo, dừng khởi động nếu không kết nối được và ngắt kết nối khi đóng ứng dụng. `main.ts` đã bật shutdown hooks. Health vẫn chỉ là liveness, không kiểm tra database mỗi request. Các lệnh dev/build/typecheck/test tự sinh Prisma Client trước khi chạy. Runtime production cần được cấp `DATABASE_URL`; không chạy migration tự động khi khởi động.

Seed demo chỉ chạy thủ công trên PostgreSQL local `127.0.0.1:55432/furniture_ecommerce`, user `app_user`, schema `public`. Script từ chối URL khác và không chạy khi khởi động API hoặc migrate. Chạy từ root:

```sh
pnpm --filter api prisma:seed
```

Seed tạo `NguoiDung` vai trò `NhanVien` ở trạng thái `BiKhoa`, bản ghi `NhanVienSan` và ba danh mục gốc Bàn, Ghế, Tủ. Mật khẩu là chuỗi ngẫu nhiên không công bố và tài khoản không đăng nhập được; auth chưa tích hợp. ID demo cố định; chạy lại không tạo trùng hay đổi dữ liệu đã có. Không tạo ví, giao dịch hoặc dữ liệu bán hàng. Không chạy lệnh này trên database production.

NestJS modular monolith. Run from the repository root:

- pnpm --filter api dev
- pnpm --filter api build
- pnpm --filter api test

Health: GET http://localhost:4000/api/v1/health. This is liveness only, not database readiness.

Prisma đã có schema PostgreSQL theo `docs/specs/database/DB_Schema.md`, migration khởi tạo đã áp dụng trên PostgreSQL local và tích hợp runtime NestJS. Có seed demo chỉ dùng local; chưa có auth handlers.

Add business modules incrementally under src/modules. Keep provider integrations under src/infrastructure when implemented; do not create empty modules ahead of time. Runtime validation is provided by the Zod pipe; there is no class-validator DTO source of truth.

## Prisma: bước 1

- `prisma/schema.prisma`: 27 model, giữ tên bảng/cột theo đặc tả.
- `prisma.config.ts`: đọc `apps/api/.env` nếu có; biến môi trường đã tồn tại được ưu tiên. Không cần `DATABASE_URL` cho validate/generate. Cấu hình này chỉ dùng cho CLI, không cấu hình kết nối runtime của NestJS.
- `.env.example`: URL minh họa, không phải thông tin đăng nhập thật. Không commit `.env`.
- Client ESM được sinh vào `generated/prisma`, không commit; sinh lại sau khi sửa schema.

Chạy từ root, không truy cập database:

```sh
pnpm --filter api exec prisma format
pnpm --filter api prisma:validate
pnpm --filter api prisma:generate
```

### Ánh xạ PostgreSQL

- `BIGINT(16)` → `bigint`, không tự tăng; `16` là độ rộng hiển thị của mô hình nguồn, không phải độ dài lưu trữ. Ứng dụng phải cấp ID trước khi tạo dữ liệu.
- `DATETIME` → `timestamp(0)` không múi giờ; `DATE` → `date`. Cần thống nhất quy ước múi giờ trước khi tích hợp nghiệp vụ. Không dùng `@updatedAt` vì mô hình chỉ khai báo default thời điểm tạo.
- Các kiểu liệt kê giữ `varchar(30)` và giá trị mặc định, không đổi sang PostgreSQL enum. `lyDoHuy` giữ `varchar` không giới hạn do nguồn không khai báo độ dài. Metadata `utf8mb4` không áp dụng cho PostgreSQL.
- Tên unique index có tiền tố `uq_<bảng>_` để không trùng giữa các bảng trong PostgreSQL; giữ nguyên tập cột, thứ tự và khả năng nhận NULL. Unique trên cột và unique index cùng một cột được biểu diễn một lần.
- Giữ các hành vi FK được khai báo (`Restrict`/`Cascade`). Hành vi không khai báo dùng `NoAction` cho cả xóa và cập nhật. Quan hệ ghép giữ nguyên thứ tự cột nguồn/đích trong đặc tả.
- 49 CHECK được lưu bằng ghi chú `// CHECK` ở từng model và SQL trong migration khởi tạo. Chỉ được thực thi sau khi áp dụng migration; không dùng `db push` thay migration.

Bước 1 xác minh schema và sinh client. Bước 3, 4 đã kiểm tra kết nối, áp dụng migration và đối chiếu ràng buộc trên PostgreSQL local. Better Auth chưa tích hợp.

## PostgreSQL local bằng Docker

Service `postgres` dùng PostgreSQL 18, chỉ mở `127.0.0.1:55432` và lưu dữ liệu trong volume `postgres-data` tại `/var/lib/postgresql`. Compose yêu cầu `apps/api/.env` có `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD`; Prisma dùng `DATABASE_URL` cùng thông tin đăng nhập. Không commit hoặc in nội dung `.env`.

Chạy riêng database từ root:

```sh
docker compose up -d --no-deps --wait postgres
docker compose ps postgres
docker compose stop postgres
```

`DATABASE_URL` trong `.env` dùng `127.0.0.1:55432` khi chạy trên host. Khi chạy API trong Docker, URL phải dùng hostname `postgres:5432`, không dùng localhost.

Đổi `POSTGRES_PASSWORD` trong file không tự đổi mật khẩu của database đã khởi tạo trên volume. Không dùng `docker compose down -v` để sửa thông tin đăng nhập vì sẽ xóa dữ liệu. Các giá trị `POSTGRES_*` là cấu hình khởi tạo local; phân quyền ứng dụng production cần thiết kế riêng. Khởi động service chỉ tạo database trống, không tạo 27 bảng, không migrate hoặc seed.

## Migration: bước 2

`prisma/migrations/20261122000000_init/migration.sql` gồm 27 bảng, 271 cột, 42 FK, 22 unique, 39 index thường và 49 CHECK. `migration_lock.toml` khóa provider PostgreSQL; Prisma Config chỉ rõ thư mục migrations.

SQL nền được sinh offline bằng lệnh sau, sau đó bổ sung CHECK từ đặc tả (không chạy lại với output trỏ vào migration đã bổ sung vì sẽ ghi đè CHECK):

```sh
pnpm --filter api exec prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script
```

Migration đã được áp dụng trên PostgreSQL local bằng `prisma migrate deploy` và đối chiếu 27 bảng, 271 cột, 42 FK, 49 CHECK cùng các index. Không dùng `migrate reset`, `db push` hoặc áp dụng migration này lên database có sẵn bảng khi chưa đánh giá baseline. `test/database-migration.spec.ts` kiểm tra cấu trúc migration so với đặc tả.
