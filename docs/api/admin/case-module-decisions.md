# Quyết định module hồ sơ A-029–A-031

Người dùng đã đồng ý phạm vi này ngày 26/11/2026. Tài liệu này thay thế các mục TBD của ba API.

## Phạm vi và quyền

- GET danh sách/chi tiết tổng hợp KhieuNai, BaoCao sản phẩm và TranhChap hoàn hàng. Không mở rộng báo cáo sang đối tượng chưa có trong schema.
- QuanTriVien, NhanVienVanHanh được đọc và xử lý khiếu nại; KiemDuyetVien chỉ được đọc. Tài khoản phải là nhân viên đang hoạt động.
- POST resolution chỉ xử lý KhieuNai. Báo cáo và tranh chấp trả 400; A-032 dùng API reports riêng, A-033 chưa triển khai.
- Không hoàn tiền, khóa tài khoản/cửa hàng hoặc gọi dịch vụ bên ngoài.

## Định danh và phân trang

caseId là complaint:idKhieuNai, report:idBaoCao hoặc dispute:idDonHang:idCuaHang. Mỗi thành phần số là bigint dương không quá 9223372036854775807.

GET danh sách nhận cursor (caseId cuối trang), limit mặc định 20/tối đa 100, kind complaint/report/dispute và status ChoXuLy/DaXuLy. Thứ tự caseId tăng dần theo collation C (chuỗi, không phải thời gian hay thứ tự số). Cursor không cần còn tồn tại; total áp dụng bộ lọc nhưng không áp dụng cursor. Truy vấn tổng số và trang dùng cùng snapshot RepeatableRead. UNION và LIMIT thực hiện tại database, không tải toàn bảng về API.

DaKetLuan của BaoCao và DaPhanQuyet của TranhChap được ánh xạ thành DaXuLy; giữ nguyên dữ liệu gốc. Báo cáo liên kết productId/storeId; tranh chấp liên kết orderId/storeId; khiếu nại có orderId tùy chọn.

## Xử lý khiếu nại

Body: outcome ChapNhan/TuChoi; reason bắt buộc, có ký tự không trắng, tối đa 1000 ký tự. API trim lý do trước khi ghi.

Chỉ chuyển ChoXuLy sang DaXuLy. Transaction Serializable cập nhật có điều kiện, lưu kết quả/lý do/nhân viên/thời gian đóng, tạo LichSuXuLy và ThongBao loại HeThong cho người gửi. Gọi lại hồ sơ đã đóng hoặc xung đột Serializable trả 409, không lặp thông báo. Lỗi ghi bất kỳ bước nào làm rollback toàn bộ. Không ghi bản sao vào AuditLog.

Migration add_complaints tạo KhieuNai và mở rộng CHECK loại trừ của LichSuXuLy; không sửa migration cũ, không xóa dữ liệu. Migration đã áp dụng thành công; migrate status xác nhận database cập nhật đủ 6 migration.

## Response và lỗi

Tất cả thành công trả 200; danh sách dùng nextCursor/total/items. Chi tiết trả nội dung, bằng chứng nguyên trạng, kết quả, lý do, handlerId và lịch sử tăng dần theo thời gian/ID. Chỉ công khai ID/tên người gửi, không trả email, số điện thoại, mật khẩu hay hồ sơ riêng tư. Thời điểm dùng ISO 8601 UTC, giao diện có thể hiển thị Asia/Ho_Chi_Minh.

Lỗi theo envelope chung: 400 đầu vào sai/khác loại hồ sơ khi resolution; 401 token sai/thiếu; 403 thiếu quyền; 404 không tồn tại; 409 đã xử lý/xung đột; 500 lỗi nội bộ được che chi tiết database.

## Liên kết

- Đặc tả: packages/api-spec/typespec/admin-cases.tsp; namespace Furniture.Admin.Cases.
- Runtime: apps/api/src/modules/admin-cases; AdminCasesModule được import tại AppModule.
- Kiểm thử HTTP: apps/api/test/admin-cases.spec.ts, dùng Prisma mock; chưa kiểm thử tích hợp PostgreSQL thực cho migration/truy vấn UNION.
