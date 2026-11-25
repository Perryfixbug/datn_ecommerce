# Plan triển khai Auth JWT và Refresh Token

## Mục tiêu

Xây dựng module `auth` trong NestJS với login bằng email/password, JWT access token có `jti`, refresh token rotation lưu hash trong PostgreSQL, Redis blacklist access token và hạ tầng Redis trong Docker Compose.

## Quyết định đã xác nhận

- Access token là JWT có `jti`, thời hạn 15 phút.
- Refresh token có thời hạn 30 ngày, rotation sau mỗi lần refresh.
- Refresh token chỉ lưu hash trong PostgreSQL.
- Login dùng email/password.
- Vai trò dùng các giá trị hiện có: `NguoiMua`, `NguoiBan`, `NhanVien`.
- Redis dùng `ioredis`, Redis 7 Alpine.
- Blacklist key: `auth:access:blacklist:{jti}`; TTL bằng thời gian còn lại của access token.
- Logout revoke refresh token và blacklist access token.

## Phạm vi endpoint

- `POST /api/v1/auth/login`: kiểm tra email/password/trạng thái, tạo access token và refresh token.
- `POST /api/v1/auth/refresh`: kiểm tra refresh token hash, hết hạn/revoked, rotate trong transaction và trả token pair mới.
- `POST /api/v1/auth/logout`: revoke refresh token và blacklist access token hiện tại nếu hợp lệ.
- `GET /api/v1/auth/me`: endpoint kiểm tra guard và trả danh tính đã xác thực.

## Hợp đồng TypeSpec

- Thêm operation auth vào TypeSpec common/entrypoint phù hợp.
- Request login gồm `email`, `password`.
- Request refresh gồm `refreshToken`.
- Request logout nhận refresh token và lấy access token từ Bearer header.
- Response dùng `TokenPair` hiện có, kèm user public profile cho login/me.
- Khai báo các lỗi 401/403/409/validation theo error envelope dùng chung.
- Chạy `node scripts/codegen.mjs`; không sửa artifact generated bằng tay.

## Schema Prisma và migration

- Thêm model `RefreshToken` với:
  - `id` BigInt hoặc UUID theo convention ID hiện tại;
  - `tokenHash` unique;
  - `idNguoiDung` FK tới `NguoiDung`;
  - `expiresAt`, `revokedAt`, `replacedByTokenId`, `createdAt`;
  - index theo user, expiry và revoked state.
- Bổ sung relation trong `NguoiDung`.
- Tạo migration SQL mới bằng Prisma CLI; không chạy migration trên database người dùng.
- Cập nhật Prisma client.

## Module auth

- `AuthModule` sở hữu controller, service/usecase, token service, password service và guard.
- `AuthService` xử lý login/refresh/logout; không để truy vấn Prisma trong controller.
- `JwtTokenService` ký/xác minh JWT HS256 hoặc thuật toán được cấu hình rõ, bắt buộc `sub`, `jti`, `role`, `iat`, `exp`.
- Password dùng hàm hash/verify chuẩn đã có trong dependency; không lưu password thô.
- Refresh token tạo giá trị ngẫu nhiên cryptographically secure, chỉ lưu SHA-256 hash.
- `AccessTokenGuard` đọc Bearer token, xác minh JWT, kiểm tra Redis blacklist, gắn actor vào request context.
- `PermissionGuard`/decorator là nền tảng cho endpoint sau; không tự cấp permission nếu chưa có mapping nghiệp vụ.

## Redis infrastructure

- Thêm dependency `ioredis` vào `apps/api` và cập nhật lockfile.
- Tạo `RedisModule`/`RedisService` với DI, kết nối từ `REDIS_URL`, health lifecycle và disconnect.
- Redis không chứa refresh token; chỉ chứa blacklist access token và TTL.
- Thêm service `AccessTokenBlacklist` với `revoke(jti, ttlSeconds)` và `isRevoked(jti)`.
- Redis lỗi phải làm rõ fail-open/fail-closed; với auth guard chọn fail-closed để không cho phép xác thực khi không kiểm tra được blacklist.

## Docker và environment

- Thêm service `redis:7-alpine` vào `docker-compose.yml`.
- Chỉ expose `127.0.0.1:${REDIS_PORT:-6379}:6379`.
- Thêm volume `redis-data` và healthcheck `redis-cli ping`.
- API depends_on Redis healthy cùng PostgreSQL.
- API container nhận `REDIS_URL`, `JWT_SECRET`, `JWT_ACCESS_TTL_SECONDS`, `JWT_REFRESH_TTL_SECONDS`.
- Bổ sung các biến vào `apps/api/.env.example`, không ghi secret thật.

## Bootstrap và lỗi

- Đăng ký `RedisModule` và `AuthModule` trong `AppModule`.
- Giữ global `ApiExceptionFilter`, bảo đảm 401/403 không lộ thông tin nhạy cảm.
- Không log password, token thô, token hash hoặc JWT.
- Xác minh `helmet`, global prefix và route đều hoạt động.

## Kiểm thử và kiểm chứng

Dù có thể chưa thêm test theo yêu cầu trước đó, auth là vùng bảo mật nên plan này yêu cầu ít nhất kiểm chứng hiện hành:

- Typecheck API và shared.
- Prisma validate/generate.
- Codegen TypeSpec/OpenAPI/client.
- Build API.
- Kiểm tra Compose config.
- Smoke test login/refresh/logout bằng database và Redis local đã được xác nhận.

Nếu không được phép thêm test, vẫn phải chạy các kiểm chứng trên và báo rõ phần chưa kiểm tra được.

## Rủi ro cần theo dõi

- Email hiện có unique theo cặp `[email, vaiTro]`, nên cùng email có thể tồn tại nhiều role. Login cần quy định xử lý khi nhiều bản ghi khớp; kế hoạch này sẽ trả lỗi conflict thay vì tự chọn role.
- `soDienThoai` không dùng cho login.
- Refresh rotation cần transaction để tránh hai request refresh đồng thời cùng sử dụng một token.
- Redis blacklist chỉ bảo vệ endpoint có gắn `AccessTokenGuard`; health và endpoint public không cần guard.
- Không triển khai guest checkout, OAuth, email verification, password reset hoặc thay đổi provider ngoài phạm vi.
