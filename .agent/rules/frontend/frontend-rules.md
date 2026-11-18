---
paths:
  - "apps/storefront/**"
  - "apps/admin/**"
  - "packages/ui/**"
  - "packages/api-client/**"
---

# Frontend Next.js và UI dùng chung

Cả storefront và admin dùng Next.js App Router. Giữ tuyến trong app/, component trong components/, helper trong lib/, routing đa ngôn ngữ theo i18n/ hiện có.

- Mặc định Server Components; chỉ đặt use client ở ranh giới cần tương tác, hook hoặc browser API. Không import server-only code vào Client Components.
- Backend NestJS là nơi xử lý nghiệp vụ và database. Route handler/proxy Next.js phục vụ giao tiếp/session theo thiết kế hiện có, không trở thành backend nghiệp vụ thứ hai.
- Dùng client/transport và hook đang có trong packages/api-client; giữ query key, invalidation, cancellation và cách báo lỗi khi refactor. Non-2xx phải đi vào luồng lỗi, không nuốt lỗi rồi trả thành công.
- TanStack Query quản lý dữ liệu máy chủ ở client; Zustand chỉ giữ trạng thái UI cục bộ. Không tạo Context/store sao chép server state nếu chưa có nhu cầu thực.
- Giữ ranh giới request cho server transport; không đưa cookie/token sang state dùng chung giữa người dùng.
- UI tái sử dụng thật sự đặt ở packages/ui, dùng alias @shared/\* đã cấu hình. Mã giao tiếp API dùng client/hook trong packages/api-client, mã riêng của app giữ trong app đó; không đưa nghiệp vụ chỉ một app dùng vào shared UI.
- Dùng semantic token, component và icon library hiện có; giữ khả năng truy cập, trạng thái loading/empty/error và bố cục responsive. Văn bản giao diện theo quy ước next-intl/messages của app, không ép mọi ngôn ngữ hiển thị thành tiếng Việt.
- Helper tính toán/biến đổi nên kiểm thử độc lập khi có logic. Khi đổi form, giữ field errors, trạng thái gửi và hợp đồng payload; không lặp lại nguồn schema HTTP viết tay.
- Không coi màn hình demo, cookie helper hoặc session mock hiện tại là luồng thương mại điện tử/xác thực đã hoàn thành.

## Ranh giới API và màn hình

- Client/hook che HTTP, query key và invalidation, không viết lại kiểu hợp đồng bằng interface thủ công.
- Form có kiểu trạng thái riêng khi cần; chuyển chuỗi rỗng, số, nullable và lựa chọn UI sang request ở helper của màn hình/app. Transport chung không biết hình dạng form.
- Không để mỗi component tự phát minh URL, query key hoặc invalidation. Dùng client/hook hiện có; chỉ thêm wrapper khi có logic thực sự.
- Ánh xạ enum sang nhãn/màu nên có kiểm tra đầy đủ kiểu để phát hiện giá trị mới sau codegen.
- Tách form/bảng/dialog theo trách nhiệm; giữ route trong `app/` theo App Router và dùng routing next-intl. Chỉ thêm Provider khi có nhu cầu chia sẻ trạng thái rõ ràng, không mặc định mỗi trang cần một Provider.
- Logic thuần ở helper `.ts`, test đặt trong `tests/unit/` theo cấu hình runner. Bộ lọc/phân trang ở URL khi cần chia sẻ/quay lại và giữ hành vi reset trang đã thống nhất.
