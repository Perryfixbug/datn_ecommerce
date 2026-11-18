# Kế hoạch cập nhật Docker và CI

Mục tiêu: đồng bộ hạ tầng với storefront, admin và API; không thêm dịch vụ hay chạy migration.

- [x] Docker: giữ shared source, đóng gói frontend standalone và API production; Compose dùng mạng nội bộ.
- [x] CI: kiểm tra codegen, build Docker và E2E cho hai frontend; release chỉ tạo PR phiên bản private.
- [x] Cập nhật tài liệu, Changeset và kiểm chứng cấu hình, kiểm thử, build local theo môi trường cho phép.

## Kết quả kiểm chứng

- Compose hợp lệ; build production ba ứng dụng và lint đã qua.
- 89 unit test đã qua và đạt ngưỡng coverage hiện có. Node 26 local cần tắt Web Storage của Node để jsdom cung cấp localStorage; không đổi assertion hay ngưỡng. Docker/CI dùng Node 24.
- API deploy bằng đường dẫn tương đối đã qua với frozen lockfile; gói production trả health thành công ở HOST mặc định và HOST=0.0.0.0. Phép thử đường dẫn tuyệt đối gặp lỗi pnpm trên Windows.
- Codegen chạy thành công và output ổn định ở lần chạy lặp lại. codegen:check báo artifact chưa được Git theo dõi vì repository chưa có commit đầu tiên.
- Syncpack đã qua. Knip vẫn báo vấn đề ở baseline, gồm alias shared UI, generated/public entrypoint và dependency nền chưa dùng; giữ gate, không bỏ qua lỗi để làm xanh CI.
- Playwright đọc được 6 test cho mỗi frontend ở chế độ CI; chưa chạy browser E2E vì máy chưa có browser Playwright.
- Chưa build/chạy Docker image vì Docker Engine chưa chạy; chưa thực thi workflow trên GitHub.
