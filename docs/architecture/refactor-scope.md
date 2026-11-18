# Phạm vi refactor nền tảng

## Quyết định mới nhất

- Chỉ root và apps/storefront, apps/admin, apps/api có package.json.
- packages/\* là source/config thông thường, không có manifest, node_modules hoặc scripts độc lập.
- Root sở hữu dependency dùng chung và codegen/lint/typecheck cho shared source.
- Apps dùng @shared/\* qua alias local, config bằng relative imports.
- Changesets version/changelog theo app private; shared-source change phải chọn app bị ảnh hưởng.
- apps/app đã đổi thành storefront; apps/landing và remove-app script đã xóa.

## Chưa triển khai

Database/schema/migration, auth handlers, nghiệp vụ, provider adapters, payment/email/storage, scheduler/outbox và Redis. Các quyết định provider/pre-order/guest checkout sẽ hỏi khi tới phần tương ứng.

## Docker và CI

Theo phạm vi được duyệt, Compose và Dockerfile phục vụ storefront/admin/API. Build giữ shared source ở packages/\*; frontend dùng standalone với tracing root tại repository. API mặc định bind loopback khi chạy local, nhận HOST=0.0.0.0 trong container.

CI kiểm tra codegen, lint/typecheck/test/build và build Docker image. E2E có matrix cho hai frontend; release chỉ tạo PR phiên bản private, không publish npm. Đây là cấu hình kiểm tra, không khẳng định workflow đã chạy thành công trên GitHub.

Không provision database, migrate, tạo bucket, SMTP, reverse proxy hoặc secret. Root/app node_modules còn lại là dependency graph pnpm cần để resolve, không phải các module dư đã bị bỏ quên.
