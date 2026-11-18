---
paths:
  - "apps/api/**"
---

# Kiến trúc API NestJS

Hiện trạng: NestJS ESM trên Express; module tại src/modules/, thành phần chung tại src/common/. GET /api/v1/health là endpoint nền. Prisma/Better Auth mới cài, chưa có tích hợp database hoặc auth.

- Dùng module, provider và DI của NestJS. Controller được viết tay trong module nghiệp vụ và phải khớp đặc tả HTTP.
- Controller tiếp nhận đầu vào đã kiểm tra, gọi service/usecase và trả HTTP response. Không đặt truy vấn DB hoặc nghiệp vụ phức tạp trực tiếp trong controller.
- Nghiệp vụ nằm trong module sở hữu nó. Chỉ tách repository, usecase hoặc mapper khi có nhu cầu thực; không bắt buộc mỗi endpoint có đầy đủ mọi lớp.
- Module khác dùng public provider/export thay vì truy cập chi tiết nội bộ tùy tiện. Tránh vòng phụ thuộc; không đưa code NestJS/Prisma vào shared UI hoặc frontend bundle.
- Hợp đồng HTTP xuất phát từ TypeSpec và schema generated; kiểm tra src/common/pipes/zod-validation.pipe.ts trước khi bổ sung validation. Controller hiện viết tay và phải được đối chiếu đặc tả.
- Với ESM, theo kiểu import .js hiện có cho module tương đối trong API. Kiểm tra tsconfig và build output trước khi đổi đường dẫn; start hiện trỏ dist/apps/api/src/main.js.
- Khi triển khai cập nhật nhiều dữ liệu, xác định ranh giới transaction theo tính nguyên tử nghiệp vụ. Không tự thêm schema, migration, repository nền hoặc outbox khi chưa thuộc yêu cầu.
- Tính tiền, giảm giá, trạng thái đơn và tồn kho phải được xác minh phía API khi được triển khai; không tin giá trị do frontend tự tính.

## Ranh giới module và DI

- Chỉ thêm lớp khi chỉ rõ lỗi hoặc sự phức tạp nó ngăn chặn. Controller, service/usecase, repository và mapper nằm trong module sở hữu; không dựng cây phân lớp toàn cục khi chưa có nhu cầu thực.
- Dùng NestJS provider và constructor injection. Chỉ export provider dành cho module khác, không import file nội bộ để đi vòng public API.
- Không tự tạo service bằng `new` trong controller hoặc dùng global giữ dependency có trạng thái. Xem lại trách nhiệm trước khi dùng `forwardRef` giải quyết vòng phụ thuộc.
- Dùng class token cho provider cụ thể; khi cần interface/adapter, khai báo injection token có tên, phạm vi và nơi sở hữu rõ ràng. Không dùng token để đi vòng ranh giới module.
- Điều kiện quyền nằm trong truy vấn/thao tác phù hợp, không chỉ lọc sau khi đọc dữ liệu riêng tư. Danh sách, tổng số và chi tiết dùng cùng phạm vi.
- Không trả lỗi SQL, Prisma hoặc stack trace ra response.

Đọc [controller-rules.md](controller-rules.md), [usecase-rules.md](usecase-rules.md), [auth-rules.md](auth-rules.md) và [testing-rules.md](../testing-rules.md) theo phạm vi. Đây là quy ước review, chưa được dependency-cruiser hay CI tự động bảo đảm.
