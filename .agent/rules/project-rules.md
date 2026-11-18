# Quy tắc chung

## Nguồn chuẩn và phạm vi

Bộ tài liệu trong `.agent/rules/` là nguồn chuẩn cho quy ước phát triển của dự án thương mại điện tử nội thất. Quy tắc được xác lập theo kiến trúc, hợp đồng và công cụ của repository này; không yêu cầu tham chiếu repository khác để áp dụng.

- Đọc quy tắc chung này và quy tắc chuyên biệt theo bảng trong `AGENTS.md` trước khi sửa. `AGENTS.md` là điểm vào và chỉ mục, không duy trì một bộ rules song song ở vị trí khác.
- `README.md` mô tả cách chạy; `docs/architecture/refactor-scope.md` ghi quyết định kiến trúc/phạm vi hiện hành. Quyết định refactor mới nhất ưu tiên hơn mô hình package cũ trong `PLAN.md`.
- TypeSpec là nguồn chuẩn của hợp đồng HTTP, không được thay bằng diễn giải trong rules. Source/config và kết quả chạy lệnh dùng để xác minh hiện trạng, không mặc định mọi quy tắc đã được công cụ kiểm soát.
- Khi quyết định được duyệt hoặc cấu hình thực tế thay đổi, cập nhật quy tắc liên quan cùng thay đổi. Nếu tài liệu mâu thuẫn về quyết định chưa rõ, hỏi người dùng thay vì tự chọn một kiến trúc mới.

## Quy ước chung

- Tài liệu, chú thích mới và phần giải thích được sửa viết bằng tiếng Việt; giữ định danh, đường dẫn, lệnh và cú pháp theo công cụ. Không dịch artifact bằng tay.
- Chỉ root và apps/storefront, apps/admin, apps/api có package.json. packages/\* là source/config, không thêm manifest hoặc node_modules ở đó. Không xóa virtual store hay liên kết pnpm cần dùng ở root/apps.
- Dependency shared đặt ở root; dependency riêng của app đặt tại app đó. Không tự nâng phiên bản hoặc đổi lockfile ngoài yêu cầu.
- TypeScript strict, thụt lề hai dấu cách, nháy kép, không chấm phẩy, xuống dòng LF; Prettier và ESLint là cấu hình chuẩn cho mã TypeScript. Giữ cú pháp riêng của TypeSpec và các định dạng khác. Không format toàn repository khi chỉ sửa một vùng.
- Tên tệp dùng kebab-case, component/class dùng PascalCase, hook theo mẫu `useThing`; giữ tên tệp đặc biệt theo framework.
- Không tạo abstraction/package mới chỉ để dự phòng. Giữ convention đã có và thay đổi nhỏ nhất đáp ứng yêu cầu.
- Giữ Changesets cho app private bị ảnh hưởng, kể cả khi đổi shared source; không publish npm.
- Không đọc/in secret thực; dùng .env.example và định nghĩa biến trong source để khảo sát. Không đưa token, cookie hoặc thông tin cá nhân vào log.
- Giữ thay đổi có sẵn của người dùng; không tự commit, push hoặc dùng reset/clean/restore để dọn worktree.
- Docker/Compose/CI/deploy, provision dịch vụ và migration nằm ngoài phạm vi mặc định. Không tự chạy seed/reset DB.
- Khi cần quyết định chưa chốt về provider, auth, pre-order, guest checkout hoặc thay đổi cấu trúc cấp cao, dừng và hỏi người dùng; không biến đề xuất thành yêu cầu đã thống nhất.
