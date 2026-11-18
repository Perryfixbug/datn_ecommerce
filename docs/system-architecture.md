# System Architecture

Repository có root package.json và ba workspace apps: storefront/admin (Next.js), api (NestJS Express modular monolith). packages/\* là shared source/config, không phải pnpm package.

## Boundary

Frontend không đọc database/Prisma; UI không chứa business rules hoặc gọi API. API không import React/Query. NestJS hiện chỉ có liveness, chưa database/auth/nghiệp vụ.

TypeSpec là HTTP source of truth; Prisma sẽ là persistence source of truth sau này. Root codegen chạy TypeSpec -> OpenAPI -> Zod/client từ file local. Shared source được frontend import qua @shared alias; backend dùng đường dẫn relative để build ESM không cần runtime alias resolver.

Root sở hữu dependency shared, lint/typecheck và codegen. Apps sở hữu dependency đặc thù và dev/build/start/test riêng. Turbo globalDependencies bao gồm packages/\*\* để shared-source change làm mất hiệu lực cache app.

Changesets theo dõi private apps; shared changes chọn các app ảnh hưởng. Không có version độc lập cho UI/contract.

README là hướng dẫn hiện hành; các guides cũ chỉ tham khảo frontend template. Xem architecture/refactor-scope.md về hạ tầng chưa thay đổi.
