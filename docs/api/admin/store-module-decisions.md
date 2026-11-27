# Quyết định triển khai module gian hàng

Phạm vi A-001–A-007 được duyệt ngày 26/11/2026. Tài liệu này chốt các mục TBD
của nhóm gian hàng; không áp dụng cho các module admin còn lại.

## Quyền

Access token hiện có và tài khoản nhân viên còn HoatDong trong DB.

| chucVu          | Quyền                                            |
| --------------- | ------------------------------------------------ |
| QuanTriVien     | stores.read, stores.review, stores.manage-status |
| KiemDuyetVien   | stores.read, stores.review                       |
| NhanVienVanHanh | stores.read, stores.manage-status                |

Chức vụ khác bị từ chối; không tự cấp quyền hoặc sửa tài khoản có sẵn.

## Hợp đồng

Nguồn chuẩn: packages/api-spec/typespec/admin-stores.tsp và interface Stores trong admin.tsp.
Prefix /api/v1/admin/stores. GET danh sách/chi tiết; POST approval/rejection/lock/unlock.
Danh sách lọc search (tên/mã, không phân biệt hoa thường), status, verificationStatus.
Cursor là ID giảm dần; limit mặc định 20, tối đa 100. Total theo bộ lọc, không theo cursor.
Response loại bỏ mật khẩu, token, số CCCD và ảnh CCCD. Chi tiết có thông tin thuế phục vụ xét duyệt.
ID là chuỗi số nguyên dương trong miền PostgreSQL bigint. Lý do 1–500 ký tự, không chỉ khoảng trắng.
Request sai 400, thiếu/sai token 401, thiếu quyền 403, không có shop 404, sai trạng thái/cạnh tranh 409.
Thao tác thành công trả 200, lỗi theo error envelope chung.

## Nghiệp vụ

- Approval: hồ sơ người bán ChoDuyet → DaXacMinh, xóa lý do từ chối, ghi thời gian duyệt.
- Rejection: ChoDuyet → TuChoi, bắt buộc reason; ghi thời gian xét duyệt.
- Hai thao tác trên thay đổi hồ sơ người bán dùng chung cho các gian hàng, không đổi trạng thái shop.
- Lock: HoatDong/TamDong → BiKhoa, bắt buộc reason.
- Unlock: BiKhoa → TamDong, người bán DaXacMinh và tài khoản HoatDong.
- Retry sai trạng thái trả 409, không ghi thêm audit hoặc thông báo; chưa dùng Idempotency-Key.
- Ghi trạng thái, AuditLog và ThongBao HeThong trong cùng transaction Serializable.
- Không gửi email, gọi provider ngoài hoặc tự chuyển trạng thái đơn hàng/sản phẩm.

## Vận hành

Migration 20261126020000_add_audit_log phải được chủ dự án áp dụng trước khi dùng thao tác ghi.
Không chạy migration/seed trong quá trình triển khai. Test HTTP dùng Prisma mock,
không thay thế kiểm chứng isolation/rollback/ràng buộc bằng PostgreSQL test riêng.
