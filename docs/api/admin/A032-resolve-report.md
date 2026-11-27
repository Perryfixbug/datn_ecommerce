# A-032 Xử lý báo cáo vi phạm

> Trạng thái triển khai: **ĐÃ LÀM**: đã có hợp đồng, module NestJS và kiểm thử liên quan. Xem [bảng tiến độ và mức kiểm chứng](../admin-api.md#tổng-quan-tiến-độ).

- Trạng thái: đã triển khai source, TypeSpec và kiểm thử HTTP.
- Method/path: `POST /api/v1/admin/reports/{reportId}/resolution`.
- Quyền: QuanTriVien và KiemDuyetVien; NhanVienVanHanh chỉ đọc hồ sơ.
- Request: reportId dạng bigint dương; body outcome ViPham/KhongViPham, reason bắt buộc tối đa 1000 ký tự.
- Thành công: 200, trả kết luận và nhân viên/thời gian xử lý; chỉ chuyển ChoXuLy sang DaKetLuan.
- Chi tiết response, lỗi và transaction: [Quyết định module báo cáo](report-module-decisions.md).
- Không tự ẩn sản phẩm hoặc khóa tài khoản/cửa hàng; không tạo AuditLog trùng LichSuXuLy.
- TypeSpec: `packages/api-spec/typespec/admin-reports.tsp`; operation `Furniture.Admin.Reports.resolveAdminReport`.
- Runtime: `apps/api/src/modules/admin-reports/`; kiểm thử: `apps/api/test/admin-reports.spec.ts`.
