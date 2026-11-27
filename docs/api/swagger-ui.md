# Swagger UI local

API phục vụ tài liệu trực tiếp từ OpenAPI được sinh bởi TypeSpec:

- http://localhost:4000/docs/admin/ cho quản trị.
- http://localhost:4000/docs/shop/ cho cửa hàng.
- Mỗi trang cung cấp file openapi.yaml tại cùng đường dẫn, ví dụ /docs/admin/openapi.yaml.

Chạy pnpm codegen khi thay đổi TypeSpec, sau đó khởi động lại API bằng pnpm --filter api dev. Không thêm decorator Swagger vào controller và không sinh hợp đồng từ NestJS.

Ngoài production, tài liệu được bật tự động. NODE_ENV=production tắt cả Swagger UI và endpoint đặc tả. Không tự bật tài liệu production hoặc sửa cơ chế xác thực của API.

Build API chép hai file đặc tả vào apps/api/dist/openapi; bản build đọc file được đóng gói, không cần source TypeSpec. Các tài nguyên Swagger UI được phục vụ từ dependency local, không phụ thuộc CDN. Không lưu token Authorize qua lần tải lại trang và không gửi đặc tả đến validator bên ngoài.

Nút Try it out gửi request thật đến API cùng origin; thao tác ghi sẽ thay đổi database đang kết nối. Token nhập vào Authorize phải có quyền phù hợp. Tài liệu phản ánh hợp đồng, không tự chứng minh handler khớp đặc tả; sai lệch auth POST 201/200 đã ghi tại bảng kiểm thử vẫn chưa được sửa trong thay đổi này.
