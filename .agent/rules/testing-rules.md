---
paths:
  - "apps/api/**"
  - "apps/storefront/**"
  - "apps/admin/**"
  - "packages/api-client/**"
  - "packages/api-contract/**"
---

# Quy tắc kiểm thử

Frontend: Vitest + Testing Library + MSW, tests/unit/ và tests/mocks/; Playwright tại tests/e2e/. API: Jest/ts-jest ESM + Supertest, test/. Giữ convention _.test.ts(x) hoặc _.spec.ts và đọc cấu hình thực trước khi chọn lệnh.

- Test hành vi quan sát được và lỗi hồi quy; không chỉ mock toàn bộ implementation rồi kiểm tra lời gọi. Dùng test-utils/setup/MSW hiện có khi phù hợp.
- API hiện chỉ có health và validation pipe; các kiểm thử hiện tại phải chạy được mà không cần database hoặc dịch vụ ngoài.
- Khi thêm dữ liệu riêng tư, dùng ít nhất hai khách hàng có dữ liệu riêng để kiểm tra không đọc/sửa chéo. Kiểm tra trạng thái không đổi sau thao tác bị từ chối, đồng thời có trường hợp được phép thành công.
- Khi auth/admin được triển khai, kiểm tra cả unauthenticated và insufficient privilege. Không ghi test giả định role hoặc mã lỗi chưa được chốt.
- Với nghiệp vụ tiền/tồn kho/đơn hàng được yêu cầu, kiểm tra biên và đường lỗi theo quy tắc đã duyệt; không tự quyết định quy tắc sản phẩm qua test.
- Test database trong tương lai phải dùng DB test riêng được xác minh; chỉ thay đổi thiết lập đó khi được chấp thuận. Không chạy migration, seed hay reset trên DB người dùng để phục vụ kiểm thử.
- Coverage frontend cho logic được cấu hình: 90% lines/functions/statements, 80% branches; không tuyên bố đây là coverage toàn dự án.
- Chạy kiểm tra theo blast radius. Refactor shared client/UI cần xét cả hai frontend; sửa hợp đồng cần codegen và kiểm tra API/client liên quan. Tài liệu thuần không cần chạy lại mọi suite.
- Ghi rõ passed/failed/not run và lý do. So baseline trước khi quy lỗi cho thay đổi; không bỏ assertion hoặc đổi coverage chỉ để vượt lỗi môi trường.

## Chọn cấp kiểm thử

| Phạm vi                                    | Cách kiểm chứng                             |
| ------------------------------------------ | ------------------------------------------- |
| Tính toán, chuyển form, quy tắc trạng thái | Unit test input/output và biên              |
| Controller, pipe, status/response          | Nest testing module + Supertest qua HTTP    |
| Component/hook client                      | Testing Library + provider/test-utils + MSW |
| Routing, proxy và hành trình qua trang     | Playwright trên build production            |
| Truy vấn/ràng buộc DB khi tích hợp         | Integration test trên DB test đã xác nhận   |

Không dùng mock repository để khẳng định truy vấn DB lọc đúng quyền; không dùng test pipe để khẳng định route có validation.

## API và phân quyền

- Luồng hợp lệ phải kiểm tra status/body; dùng schema được sinh hoặc assertion cụ thể. TypeScript không kiểm tra JSON runtime.
- Endpoint có input cần test HTTP thiếu/sai dữ liệu và chuyển query, gồm chuỗi `"false"` khi có boolean; test pipe riêng chưa đủ.
- Tạo A/B với dữ liệu phân biệt cho tài nguyên riêng tư. Kiểm tra danh sách, chi tiết và thao tác ghi liên quan; một khách hàng không phát hiện việc bỏ điều kiện sở hữu.
- Khi A sửa/xóa dữ liệu B, kiểm tra cả mã lỗi và dữ liệu B nguyên vẹn; có đường thành công của chủ sở hữu để tránh test chỉ chứng minh mọi thao tác đều bị chặn.
- Không áp điều kiện sở hữu cho catalog công khai. Auth/admin khi triển khai cần cả chưa đăng nhập và thiếu quyền theo hợp đồng đã chốt.
- Tiền, tồn kho, giảm giá, trạng thái cần biên/đường lỗi theo quyết định sản phẩm. Transaction cần test không lưu dở dang khi thất bại.
- API hiện dùng Jest `--runInBand`, chưa có setup DB test. Không tự thêm migration hoặc thao tác xóa dữ liệu vào setup kiểm thử. Khi tích hợp DB test, xác nhận database riêng, phạm vi dọn dữ liệu và cách cô lập trước khi chạy song song.

## Frontend và assertion

- Kiểm tra hành vi qua role/label/text, không phụ thuộc CSS hoặc state nội bộ. Ưu tiên MSW ở biên HTTP khi test đường gọi client thực.
- Kiểm tra loading/empty/error/success và mutation phù hợp; sau mutation xác nhận dữ liệu hiển thị/cập nhật cache. Logic chuyển form sang request cần unit test riêng.
- Không ép render async Server Component bằng Testing Library nếu harness chưa hỗ trợ; thử logic riêng và luồng trang bằng Playwright khi cần.
- Session mock/`PREVIEW_AUTH` không chứng minh auth thật. Giữ bypass tắt trong test cổng bảo vệ theo cấu hình hiện tại.
- Test hồi quy nên thất bại với hành vi lỗi và qua sau sửa khi tái hiện an toàn được; không hủy thay đổi người dùng để thử. Mutation testing là lựa chọn, chưa là công cụ được cài.
- Tránh chỉ kiểm tra mock được gọi/snapshot lớn. Dùng fixture khiến bỏ điều kiện quan trọng sẽ làm test thất bại; đóng Nest app, dọn handler/mock/timer, không phụ thuộc thứ tự hoặc mạng ngoài.
- API tìm `apps/api/test/**/*.spec.ts`; frontend tìm `tests/unit/**/*.{test,spec}.{ts,tsx}`. Không đặt test cạnh source rồi mặc định runner tìm thấy.
- Chạy `pnpm --filter api test`, `pnpm --filter storefront test`, `pnpm --filter admin test` theo phạm vi. Shared source cần xét mọi app sử dụng; đo coverage bằng `test:coverage`.
- `pnpm test:e2e` theo cấu hình build production; chạy trực tiếp filter/app phải có build tương ứng. Không đổi sang dev server để vượt lỗi.
- Chỉ giảm kiểm thử trùng lặp khi đã xác minh cơ chế khác thực sự bảo đảm cùng hành vi. Hiện chưa có kiểm tra tự động toàn cục cho ranh giới module hoặc response runtime; typecheck/lint không thay thế test HTTP và test quyền truy cập.
- Không ghi số lượng test cố định thành cam kết lâu dài; báo kết quả thực tế và kiểm tra chưa chạy cùng lý do.
