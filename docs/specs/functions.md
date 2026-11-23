# Danh sách thiết kế chức năng hệ thống

## 1. Phạm vi và quy ước

Nguồn: [overview.md](overview.md), gồm yêu cầu chức năng, 23 ca sử dụng U1–U23, các kịch bản và mô hình lớp. Tài liệu này phân rã yêu cầu phục vụ thiết kế màn hình, xử lý nghiệp vụ và ca kiểm thử; không mô tả hiện trạng triển khai.

| Hệ thống con             | Mã    | Tác nhân      |
| ------------------------ | ----- | ------------- |
| Quản trị và vận hành sàn | A-123 | Nhân viên sàn |
| Mua sắm                  | C-123 | Người mua     |
| Quản lý kinh doanh       | S-123 | Người bán     |

- Mã gồm tiền tố và ba chữ số tăng liên tục, độc lập theo hệ thống con; không thể hiện ưu tiên triển khai. Giữ mã ổn định khi bổ sung yêu cầu.
- Một chức năng là một thao tác nghiệp vụ, không nhất thiết là một màn hình hoặc một API riêng.
- Cột nguồn ghi ca sử dụng và số bảng của Chương 1, ví dụ “U4; 1.36” tương ứng U4 và Bảng 1.36. “YC” là phần yêu cầu chức năng; “Lớp” là mô hình lớp Chương 2–3.
- **Cần làm rõ**: nguồn chưa đủ luồng hoặc chính sách; phần phân rã chưa phải quyết định nghiệp vụ đã chốt.
- **Có điều kiện**: phụ thuộc xác nhận triển khai ví nội bộ. Thanh toán và vận chuyển chỉ mô phỏng hoặc tích hợp thử nghiệm, không mặc định provider.
- Chức năng dùng chung được liệt kê theo từng vai trò để thể hiện quyền sử dụng, không yêu cầu xây dựng backend riêng cho mỗi hệ thống con.

## 2. Nhân viên sàn — A

Nhân viên sàn phải đăng nhập và có quyền phù hợp. Nguồn dùng đăng nhập làm tiền điều kiện nhưng chưa đặc tả luồng xác thực, cấp tài khoản hoặc phân quyền nhân viên; không tự bổ sung chính sách cấp quyền.

### 2.1. Quản lý gian hàng

| Mã    | Chức năng                | Mô tả và ràng buộc chính                                         | Nguồn     |
| ----- | ------------------------ | ---------------------------------------------------------------- | --------- |
| A-001 | Xem danh sách gian hàng  | Hiển thị các gian hàng và trạng thái để phục vụ quản lý.         | U17       |
| A-002 | Tìm kiếm, lọc gian hàng  | Tìm gian hàng, lọc theo các điều kiện trên trang quản lý.        | U17; 1.83 |
| A-003 | Xem chi tiết gian hàng   | Xem thông tin cửa hàng và hồ sơ đăng ký liên quan.               | U17; 1.84 |
| A-004 | Phê duyệt hồ sơ cửa hàng | Duyệt hồ sơ, cập nhật trạng thái và thông báo người bán.         | U17; 1.85 |
| A-005 | Từ chối hồ sơ cửa hàng   | Ghi lý do, cập nhật trạng thái hồ sơ và thông báo người bán.     | U17; 1.86 |
| A-006 | Khóa gian hàng           | Bắt buộc lý do khóa; cập nhật trạng thái và thông báo người bán. | U17; 1.87 |
| A-007 | Mở khóa gian hàng        | Khôi phục hoạt động và thông báo người bán.                      | U17; 1.88 |

### 2.2. Quản lý tài khoản

| Mã    | Chức năng               | Mô tả và ràng buộc chính                                         | Nguồn         |
| ----- | ----------------------- | ---------------------------------------------------------------- | ------------- |
| A-008 | Xem danh sách tài khoản | Xem danh sách người mua, người bán hoặc nhân viên theo quyền.    | U23           |
| A-009 | Tìm kiếm tài khoản      | Tra cứu tài khoản, xử lý khi không có kết quả phù hợp.           | U23; 1.97     |
| A-010 | Xem chi tiết tài khoản  | Xem thông tin và trạng thái; bảo vệ dữ liệu riêng tư theo quyền. | U23; 1.98; YC |
| A-011 | Khóa tài khoản          | Cập nhật trạng thái khóa và thông báo người dùng.                | U23; 1.99     |
| A-012 | Mở khóa tài khoản       | Khôi phục trạng thái hoạt động và thông báo người dùng.          | U23; 1.100    |

### 2.3. Kiểm duyệt sản phẩm

| Mã    | Chức năng                       | Mô tả và ràng buộc chính                                              | Nguồn     |
| ----- | ------------------------------- | --------------------------------------------------------------------- | --------- |
| A-013 | Xem sản phẩm chờ duyệt          | Hiển thị hàng đợi kiểm duyệt; tiêu chí đưa vào hàng đợi cần xác nhận. | U21; 1.94 |
| A-014 | Xem chi tiết sản phẩm cần duyệt | Kiểm tra nội dung, ảnh, thông số và thông tin sản phẩm.               | U21       |
| A-015 | Phê duyệt sản phẩm              | Cập nhật kết quả duyệt và thông báo người bán.                        | U21; 1.95 |
| A-016 | Từ chối sản phẩm                | Bắt buộc lý do từ chối; cập nhật trạng thái, thông báo người bán.     | U21; 1.96 |

### 2.4. Danh mục và trang chủ toàn sàn

Danh mục phân loại chung toàn sàn khác với danh mục được chọn để hiển thị trang chủ, và khác danh mục riêng cửa hàng.

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                                                                        | Nguồn     |
| ----- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- | --------- |
| A-017 | Quản lý danh mục toàn sàn    | **Cần làm rõ:** xem, thêm, sửa, xóa phân loại chung; chưa chốt phân cấp và điều kiện xóa danh mục đang sử dụng. | YC        |
| A-018 | Xem cấu hình trang chủ       | Xem các thành phần được cấu hình cho trang chủ.                                                                 | U19       |
| A-019 | Thêm banner                  | Tạo banner, thiết lập thời gian hiển thị hợp lệ.                                                                | U19; 1.89 |
| A-020 | Cập nhật banner              | Sửa nội dung và lịch hiển thị banner.                                                                           | U19; 1.89 |
| A-021 | Xóa banner                   | Loại banner khỏi cấu hình trang chủ.                                                                            | U19; 1.89 |
| A-022 | Quản lý danh mục trang chủ   | Thêm, sửa, xóa mục danh mục hiển thị; quan hệ với danh mục toàn sàn cần làm rõ.                                 | U19; 1.90 |
| A-023 | Thêm quảng cáo               | Tạo quảng cáo và lịch hiển thị hợp lệ.                                                                          | U19; 1.91 |
| A-024 | Cập nhật quảng cáo           | Sửa nội dung và thời gian hiển thị.                                                                             | U19; 1.91 |
| A-025 | Xóa quảng cáo                | Loại quảng cáo khỏi cấu hình trang chủ.                                                                         | U19; 1.91 |
| A-026 | Sắp xếp thành phần trang chủ | Thay đổi thứ tự các thành phần hiển thị.                                                                        | U19; 1.92 |
| A-027 | Xem trước trang chủ          | Xem cấu hình trước khi áp dụng cho người mua.                                                                   | U19; 1.93 |
| A-028 | Xuất bản trang chủ           | Áp dụng cấu hình mới cho người dùng.                                                                            | U19; 1.93 |

### 2.5. Khiếu nại, báo cáo và tranh chấp

U20 thiếu bảng đặc tả riêng. Nhóm dưới được phân rã từ U20, luồng hoàn hàng và các lớp yêu cầu/lịch sử xử lý; cần xác nhận chi tiết trước khi triển khai.

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                                                                   | Nguồn              |
| ----- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| A-029 | Xem danh sách yêu cầu        | **Cần làm rõ:** tiếp nhận khiếu nại, báo cáo và tranh chấp hoàn hàng.                                      | U20                |
| A-030 | Xem hồ sơ yêu cầu            | **Cần làm rõ:** xem người gửi, đối tượng/đơn hàng, nội dung và bằng chứng bổ sung.                         | U20; U22; Lớp      |
| A-031 | Xử lý khiếu nại              | **Cần làm rõ:** ghi kết quả xem xét, cập nhật trạng thái và phản hồi người gửi.                            | U20; Lớp           |
| A-032 | Xử lý báo cáo vi phạm        | **Cần làm rõ:** xem xét báo cáo sản phẩm/gian hàng/người dùng, ghi kết quả và biện pháp theo quyền.        | U20; U22; Lớp      |
| A-033 | Phân xử tranh chấp hoàn hàng | **Cần làm rõ:** nhận kháng cáo, xem bằng chứng hai bên và ra quyết định; chính sách hoàn tiền chưa đầy đủ. | U20; U9; 1.61; Lớp |
| A-034 | Tra cứu lịch sử xử lý        | Xem hành động, người xử lý, trạng thái trước/sau, kết quả và thời điểm; giao diện tra cứu cần làm rõ.      | Lớp LichSuXuLy     |

### 2.6. Khuyến mãi toàn sàn

| Mã    | Chức năng                   | Mô tả và ràng buộc chính                                                                                                       | Nguồn                        |
| ----- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| A-035 | Quản lý khuyến mãi toàn sàn | **Cần làm rõ:** quản lý chương trình của sàn; chưa chốt loại ưu đãi, nguồn tài trợ, đối tượng và quan hệ với voucher cửa hàng. | YC; Lớp ChuongTrinhKhuyenMai |

### 2.7. Thống kê và giám sát

| Mã    | Chức năng                       | Mô tả và ràng buộc chính                                | Nguồn      |
| ----- | ------------------------------- | ------------------------------------------------------- | ---------- |
| A-036 | Xem thống kê tổng quan          | Xem số liệu tổng hợp và tình hình hoạt động toàn sàn.   | U18        |
| A-037 | Lọc thống kê theo thời gian     | Chọn mốc/khoảng thời gian; từ chối khoảng không hợp lệ. | U18; 1.118 |
| A-038 | Xem thống kê tài chính          | Xem số liệu tài chính toàn sàn trong kỳ đã chọn.        | U18; 1.119 |
| A-039 | Xem thống kê vận hành           | Theo dõi đơn hàng và tình hình vận hành toàn sàn.       | U18; 1.120 |
| A-040 | Xem thống kê tăng trưởng        | Theo dõi biến động chỉ số tăng trưởng theo thời gian.   | U18; 1.121 |
| A-041 | Xem xếp hạng sản phẩm, cửa hàng | Xem xếp hạng theo số liệu của kỳ thống kê.              | U18; 1.122 |

### 2.8. Thông báo

| Mã    | Chức năng               | Mô tả và ràng buộc chính                                     | Nguồn     |
| ----- | ----------------------- | ------------------------------------------------------------ | --------- |
| A-042 | Xem danh sách thông báo | Xem thông báo dành cho tài khoản nhân viên.                  | U10       |
| A-043 | Xem chi tiết thông báo  | Mở nội dung/đối tượng liên quan theo quyền, đánh dấu đã đọc. | U10; 1.63 |
| A-044 | Đánh dấu tất cả đã đọc  | Đánh dấu toàn bộ thông báo của tài khoản đã đọc.             | U10; 1.64 |

## 3. Người mua — C

Khách chưa đăng nhập được khám phá và xem sản phẩm theo U1–U2. Các thao tác với tài khoản, giỏ, đơn, ví, tin nhắn và yêu cầu hỗ trợ phải xác thực theo tiền điều kiện; không suy ra có guest checkout.

### 3.1. Tài khoản và địa chỉ

| Mã    | Chức năng              | Mô tả và ràng buộc chính                                                                 | Nguồn    |
| ----- | ---------------------- | ---------------------------------------------------------------------------------------- | -------- |
| C-001 | Đăng ký tài khoản      | Kiểm tra email hợp lệ/chưa tồn tại, nhập thông tin và tạo tài khoản theo luồng xác nhận. | U4; 1.36 |
| C-002 | Xác nhận đăng ký       | Nhập OTP qua email; từ chối mã sai hoặc hết hạn.                                         | U4       |
| C-003 | Đăng nhập              | Xác thực email/mật khẩu, xử lý thông tin không đúng.                                     | U4; 1.37 |
| C-004 | Khôi phục mật khẩu     | Nhận mã xác nhận, xác thực mã và đặt lại mật khẩu.                                       | U4; 1.38 |
| C-005 | Cập nhật hồ sơ cá nhân | Xem, chỉnh sửa thông tin hồ sơ theo biểu mẫu tài khoản.                                  | U4; 1.39 |
| C-006 | Thêm địa chỉ           | Lưu địa chỉ nhận hàng mới cho tài khoản.                                                 | U4; 1.40 |
| C-007 | Sửa địa chỉ            | Cập nhật địa chỉ đã lưu thuộc tài khoản hiện tại.                                        | U4; 1.41 |
| C-008 | Xóa địa chỉ            | Xóa địa chỉ khỏi sổ địa chỉ cá nhân.                                                     | U4; 1.42 |
| C-009 | Đặt địa chỉ mặc định   | Chọn địa chỉ được ưu tiên khi đặt hàng.                                                  | U4; 1.43 |
| C-010 | Đổi mật khẩu           | Thay mật khẩu theo bước xác thực của luồng.                                              | U4; 1.44 |
| C-011 | Đăng xuất              | Kết thúc phiên đăng nhập người mua.                                                      | U4; 1.45 |

### 3.2. Khám phá sản phẩm và cửa hàng

| Mã    | Chức năng                           | Mô tả và ràng buộc chính                                                                                             | Nguồn    |
| ----- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| C-012 | Xem trang chủ                       | Xem thành phần trang chủ, sản phẩm nổi bật và phân trang; kịch bản hiển thị 30 sản phẩm mỗi trang.                   | U1; 1.23 |
| C-013 | Xem sản phẩm gợi ý                  | Gợi ý theo lịch sử xem/tìm kiếm/mua; dự phòng bằng điểm tương thích thuộc tính tĩnh nếu thuật toán đồ thị gặp sự cố. | YC; 1.23 |
| C-014 | Xem gợi ý từ khóa                   | Hiển thị từ khóa gợi ý khi nhập tìm kiếm.                                                                            | U1; 1.24 |
| C-015 | Tìm kiếm sản phẩm, cửa hàng         | Tìm theo từ khóa; hiển thị thông tin kết quả và trạng thái không tìm thấy.                                           | U1; 1.24 |
| C-016 | Lọc kết quả tìm kiếm                | Lọc theo khoảng giá, tỉnh/thành phố cửa hàng; từ chối khoảng giá không hợp lệ.                                       | U1; 1.25 |
| C-017 | Sắp xếp kết quả tìm kiếm            | Sắp xếp theo giá tăng hoặc giảm.                                                                                     | U1; 1.25 |
| C-018 | Xem trang cửa hàng                  | Xem thông tin, đánh giá, danh mục, sản phẩm; thông báo nếu cửa hàng bị khóa/ngừng hoạt động.                         | U1; 1.26 |
| C-019 | Xem sản phẩm theo danh mục cửa hàng | Chọn danh mục và xem các sản phẩm tương ứng của cửa hàng.                                                            | U1; 1.26 |

### 3.3. Chi tiết sản phẩm và giỏ hàng

| Mã    | Chức năng                   | Mô tả và ràng buộc chính                                                      | Nguồn    |
| ----- | --------------------------- | ----------------------------------------------------------------------------- | -------- |
| C-020 | Xem chi tiết sản phẩm       | Xem tên, giá, bộ ảnh, mô tả và thông số kỹ thuật nội thất.                    | U2; 1.27 |
| C-021 | Xem đánh giá sản phẩm       | Xem số sao và nhận xét của người mua.                                         | U2; 1.28 |
| C-022 | Chọn biến thể, số lượng     | Chọn màu sắc/kích thước/phân loại, cập nhật giá và kiểm tra tồn kho biến thể. | U2; 1.29 |
| C-023 | Thêm vào giỏ                | Thêm sản phẩm/biến thể với số lượng đã chọn; yêu cầu đăng nhập và đủ tồn kho. | U2; 1.30 |
| C-024 | Mua ngay                    | Chuyển sản phẩm đã chọn sang đặt hàng; kiểm tra đăng nhập và tồn kho.         | U2; 1.31 |
| C-025 | Xem giỏ hàng                | Xem sản phẩm thuộc giỏ tài khoản; có trạng thái giỏ trống.                    | U3; 1.32 |
| C-026 | Cập nhật số lượng trong giỏ | Tính lại thành tiền; chặn số lượng vượt tồn kho.                              | U3; 1.32 |
| C-027 | Đổi biến thể trong giỏ      | Đổi phân loại, cập nhật giá và kiểm tra số lượng khả dụng.                    | U3; 1.33 |
| C-028 | Xóa sản phẩm khỏi giỏ       | Loại dòng hàng và tính lại tổng tiền.                                         | U3; 1.34 |
| C-029 | Chọn sản phẩm để đặt hàng   | Chọn dòng cần mua, tính tổng và chuyển đặt hàng; chặn nếu chưa chọn sản phẩm. | U3; 1.35 |

### 3.4. Đặt hàng và thanh toán

| Mã    | Chức năng                   | Mô tả và ràng buộc chính                                                                                        | Nguồn        |
| ----- | --------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------ |
| C-030 | Kiểm tra thông tin đặt hàng | Xem sản phẩm, số lượng và bảng chi phí trước xác nhận.                                                          | U5; 1.46     |
| C-031 | Chọn địa chỉ nhận hàng      | Chọn địa chỉ đã lưu cho đơn đang đặt.                                                                           | U5; 1.47     |
| C-032 | Thêm địa chỉ khi đặt hàng   | Nhập địa chỉ mới và sử dụng cho đơn.                                                                            | U5; 1.48     |
| C-033 | Áp dụng voucher cửa hàng    | Chọn/nhập mã, kiểm tra điều kiện và tính lại tổng tiền.                                                         | U5; 1.49     |
| C-034 | Thanh toán bằng ví          | **Có điều kiện:** xác thực, kiểm tra số dư/trạng thái ví và ghi nhận giao dịch.                                 | U5; U7; 1.50 |
| C-035 | Thanh toán chuyển khoản QR  | Hiển thị QR/thông tin chuyển khoản, tiếp nhận kết quả thử nghiệm và xử lý thất bại.                             | U5; 1.51     |
| C-036 | Thanh toán khi nhận hàng    | Chọn COD và ghi nhận phương thức thanh toán.                                                                    | U5; 1.52     |
| C-037 | Xác nhận đặt hàng           | Kiểm tra lại tồn kho, ưu đãi, phương thức thanh toán; ghi kết quả đặt hàng, báo thiếu hàng/thanh toán thất bại. | U5; 1.46     |

### 3.5. Theo dõi đơn và hoàn hàng

| Mã    | Chức năng                  | Mô tả và ràng buộc chính                                                                                                | Nguồn          |
| ----- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------- |
| C-038 | Xem lịch sử đơn hàng       | Xem đơn mới nhất trước, tải 10 đơn/lần theo kịch bản; lọc trạng thái và khoảng thời gian.                               | U9; 1.53       |
| C-039 | Xem chi tiết đơn hàng      | Xem mã, thời điểm đặt, trạng thái, địa chỉ, thanh toán, sản phẩm và chi phí.                                            | U9; 1.54       |
| C-040 | Hủy đơn hàng               | Chọn lý do, kiểm tra trạng thái cho phép; hoàn tồn kho/tiền đã trả. Ranh giới trạng thái được hủy cần xác nhận ở mục 6. | U9; 1.55       |
| C-041 | Xác nhận đã nhận hàng      | Với đơn đã giao, xác nhận hoàn tất, giải ngân tiền tạm giữ và khóa yêu cầu hoàn hàng theo kịch bản.                     | U9; 1.56       |
| C-042 | Gửi yêu cầu hoàn hàng      | Đơn đã giao không quá 15 ngày, chưa xác nhận nhận hàng; gửi lý do, mô tả và bằng chứng hợp lệ.                          | U9; 1.57       |
| C-043 | Theo dõi kết quả hoàn hàng | Xem trạng thái/thông báo chấp nhận hoặc chuyển tranh chấp lên sàn; cách xem hồ sơ cần làm rõ.                           | U9; 1.57; 1.61 |

### 3.6. Đánh giá

| Mã    | Chức năng                | Mô tả và ràng buộc chính                                                                                    | Nguồn     |
| ----- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | --------- |
| C-044 | Đánh giá sản phẩm đã mua | Chọn sao, viết nhận xét, tải ảnh; đơn đã giao không quá 15 ngày, không chờ hoàn hàng; lọc từ khóa nhạy cảm. | U6; 1.101 |
| C-045 | Đánh giá cửa hàng        | Gửi sao/nhận xét/ảnh; bắt buộc đã có đơn với cửa hàng và đã chọn sao.                                       | U6; 1.102 |

### 3.7. Nhắn tin, thông báo và chatbot

| Mã    | Chức năng                 | Mô tả và ràng buộc chính                                                                                                                   | Nguồn         |
| ----- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| C-046 | Xem danh sách trò chuyện  | Hiển thị cuộc trò chuyện, phân biệt cuộc có tin chưa đọc.                                                                                  | U8; 1.105     |
| C-047 | Xem nội dung trò chuyện   | Mở lịch sử với người bán và đánh dấu tin nhắn đã đọc.                                                                                      | U8; 1.105     |
| C-048 | Gửi tin nhắn              | Gửi nội dung trong cuộc trò chuyện với người bán, kiểm tra nội dung/tệp theo luồng.                                                        | U8; 1.106     |
| C-049 | Liên hệ từ trang cửa hàng | Mở/tiếp tục trò chuyện với người bán từ trang cửa hàng.                                                                                    | U8; 1.107     |
| C-050 | Liên hệ từ trang sản phẩm | Mở trò chuyện kèm ngữ cảnh sản phẩm đang xem.                                                                                              | U2; U8; 1.108 |
| C-051 | Xem danh sách thông báo   | Xem thông báo của tài khoản và trạng thái đọc.                                                                                             | U10; 1.62     |
| C-052 | Xem chi tiết thông báo    | Mở nội dung, đánh dấu đã đọc và truy cập đối tượng liên quan theo quyền.                                                                   | U10; 1.63     |
| C-053 | Đánh dấu tất cả đã đọc    | Cập nhật trạng thái toàn bộ thông báo của tài khoản.                                                                                       | U10; 1.64     |
| C-054 | Trao đổi với chatbot      | **Cần làm rõ:** gửi câu hỏi, nhận tư vấn sản phẩm/thông tin cơ bản; chưa chốt kiến thức, dữ liệu riêng tư và xử lý khi không trả lời được. | YC chatbot    |

### 3.8. Khiếu nại và báo cáo

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                                                             | Nguồn      |
| ----- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ---------- |
| C-055 | Báo cáo vi phạm              | Báo cáo sản phẩm/cửa hàng/người dùng kèm loại, mô tả, bằng chứng; chặn báo cáo trùng đang chờ xử lý. | U22; 1.123 |
| C-056 | Gửi khiếu nại                | Chọn đơn liên quan, nhập nội dung không trống và bằng chứng để gửi sàn.                              | U22; 1.124 |
| C-057 | Bổ sung thông tin yêu cầu    | Bổ sung nội dung/bằng chứng khi yêu cầu chờ xử lý; chặn nếu đã đóng.                                 | U22; 1.125 |
| C-058 | Xem lịch sử, kết quả yêu cầu | Xem danh sách, trạng thái, nội dung chi tiết và kết quả xử lý.                                       | U22; 1.126 |

### 3.9. Ví điện tử — có điều kiện

Chỉ áp dụng khi xác nhận triển khai ví nội bộ. PIN và OTP trong nguồn chưa đồng nhất; dưới đây phản ánh kịch bản chi tiết, không chốt cơ chế xác thực cuối cùng.

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                                                       | Nguồn     |
| ----- | ---------------------------- | ---------------------------------------------------------------------------------------------- | --------- |
| C-059 | Kích hoạt ví                 | Xác nhận email, tạo PIN 6 chữ số; kiểm tra mã xác nhận và hai lần nhập PIN.                    | U7; 1.127 |
| C-060 | Xem số dư, lịch sử giao dịch | Xem số dư và giao dịch thuộc ví cá nhân.                                                       | U7; 1.128 |
| C-061 | Liên kết ngân hàng           | Nhập ngân hàng, số tài khoản, tên chủ; cách xác minh phụ thuộc giải pháp thử nghiệm được chọn. | U7; 1.129 |
| C-062 | Nạp tiền vào ví              | Tạo phiên/QR, chỉ cộng tiền khi có xác nhận thành công; xử lý thất bại/hết hạn.                | U7; 1.130 |
| C-063 | Rút tiền khỏi ví             | Xác thực, kiểm tra số dư/trạng thái và chuyển tiền về ngân hàng liên kết.                      | U7; 1.131 |
| C-064 | Đổi PIN                      | Kiểm tra PIN cũ, PIN mới và xác nhận trước khi lưu.                                            | U7; 1.132 |
| C-065 | Khôi phục PIN                | Xác thực mã email và đặt PIN mới; chặn mã sai/hết hạn.                                         | U7; 1.133 |
| C-066 | Chủ động khóa ví             | Xác thực, xác nhận khóa để chặn giao dịch; nguồn chưa có luồng mở khóa chủ động.               | U7; 1.134 |

## 4. Người bán — S

Ngoài đăng ký/đăng nhập/khôi phục mật khẩu, các thao tác phải được xác thực và giới hạn trong dữ liệu tài khoản/gian hàng sở hữu. Quyền kinh doanh trước và sau duyệt hồ sơ cần xác nhận, không mặc định đăng ký xong được bán hàng.

### 4.1. Tài khoản và hồ sơ

| Mã    | Chức năng          | Mô tả và ràng buộc chính                                          | Nguồn     |
| ----- | ------------------ | ----------------------------------------------------------------- | --------- |
| S-001 | Đăng ký người bán  | Tạo tài khoản, kiểm tra thông tin bắt buộc và email chưa đăng ký. | U12; 1.73 |
| S-002 | Đăng nhập          | Xác thực email/mật khẩu để vào kênh người bán.                    | U12; 1.74 |
| S-003 | Gửi hồ sơ cửa hàng | Nhập thông tin, gửi hồ sơ đến sàn và nhận trạng thái chờ duyệt.   | U12; 1.75 |
| S-004 | Cập nhật tài khoản | Xem và sửa thông tin tài khoản người bán.                         | U12; 1.76 |
| S-005 | Đổi mật khẩu       | Thay mật khẩu theo bước xác thực của luồng.                       | U12; 1.77 |
| S-006 | Khôi phục mật khẩu | Nhận mã xác nhận, xác thực và đặt lại mật khẩu.                   | U12; 1.78 |
| S-007 | Đăng xuất          | Kết thúc phiên đăng nhập.                                         | U12; 1.79 |

### 4.2. Thông tin và giao diện cửa hàng

| Mã    | Chức năng                   | Mô tả và ràng buộc chính                                    | Nguồn     |
| ----- | --------------------------- | ----------------------------------------------------------- | --------- |
| S-008 | Xem thông tin cửa hàng      | Hiển thị thông tin gian hàng hiện tại.                      | U14       |
| S-009 | Cập nhật thông tin cửa hàng | Sửa avatar, tên, mô tả; chặn tên trống và ảnh không hợp lệ. | U14; 1.80 |
| S-010 | Trang trí cửa hàng          | Cấu hình trang chủ cửa hàng cho máy tính và điện thoại.     | U14; 1.81 |
| S-011 | Cập nhật danh mục hiển thị  | Chọn/cập nhật danh mục xuất hiện trên giao diện cửa hàng.   | U14; 1.82 |

### 4.3. Sản phẩm và biến thể

| Mã    | Chức năng               | Mô tả và ràng buộc chính                                                                                                | Nguồn                  |
| ----- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| S-012 | Xem danh sách sản phẩm  | Hiển thị sản phẩm thuộc gian hàng.                                                                                      | U11; 1.65              |
| S-013 | Thêm sản phẩm           | Cửa hàng đã duyệt; nhập thông tin, danh mục, thông số, thẻ, ảnh và ít nhất một biến thể; kiểm tra dữ liệu/tệp hợp lệ.   | U11; 1.66              |
| S-014 | Cập nhật sản phẩm       | Sửa nội dung/ảnh, kiểm tra dữ liệu bắt buộc; điều kiện duyệt lại cần xác nhận.                                          | U11; 1.67              |
| S-015 | Xóa sản phẩm            | Xác nhận xóa mềm, ẩn khỏi sàn nhưng giữ đơn cũ; chặn nếu có đơn chưa hoàn tất.                                          | U11; 1.68              |
| S-016 | Thêm biến thể           | Nhập phân loại, giá và tồn kho; chặn biến thể trùng phân loại.                                                          | U11; 1.69              |
| S-017 | Cập nhật giá và tồn kho | Sửa giá/tồn kho biến thể; các giá trị phải lớn hơn hoặc bằng 0.                                                         | U11; 1.70              |
| S-018 | Thiết lập giá sỉ        | Cấu hình đơn giá theo khoảng số lượng; chặn khoảng chồng nhau hoặc giá sỉ cao hơn giá lẻ; hiển thị trên trang sản phẩm. | U11; 1.71              |
| S-019 | Xóa biến thể            | Loại khỏi lựa chọn kinh doanh, bảo toàn thông tin giao dịch cũ.                                                         | U11; 1.72; YC toàn vẹn |

### 4.4. Danh mục riêng cửa hàng

| Mã    | Chức năng     | Mô tả và ràng buộc chính                                      | Nguồn      |
| ----- | ------------- | ------------------------------------------------------------- | ---------- |
| S-020 | Xem danh mục  | Hiển thị danh mục kèm số sản phẩm của từng mục.               | U13; 1.110 |
| S-021 | Thêm danh mục | Nhập tên, chọn sản phẩm; chặn tên trống/trùng trong cửa hàng. | U13; 1.111 |
| S-022 | Sửa danh mục  | Đổi tên, thêm/bỏ sản phẩm, kiểm tra tên hợp lệ.               | U13; 1.112 |
| S-023 | Xóa danh mục  | Xác nhận xóa danh mục nhưng giữ sản phẩm.                     | U13; 1.113 |

### 4.5. Đơn hàng và hoàn hàng

| Mã    | Chức năng             | Mô tả và ràng buộc chính                                                                  | Nguồn         |
| ----- | --------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| S-024 | Xem danh sách đơn     | Xem đơn thuộc cửa hàng theo trạng thái, gồm chờ xác nhận, chờ lấy hàng và hoàn hàng.      | U9; 1.58–1.61 |
| S-025 | Xem chi tiết đơn      | Xem sản phẩm, giao nhận và trạng thái để xử lý.                                           | U9; 1.60      |
| S-026 | Xác nhận đơn          | Chuyển sang chờ lấy hàng, báo người mua; chặn nếu đơn đã hủy.                             | U9; 1.58      |
| S-027 | Từ chối đơn           | Bắt buộc lý do; hủy đơn, hoàn tồn kho/tiền đã trả và báo người mua.                       | U9; 1.59      |
| S-028 | Cập nhật giao hàng    | Chuyển chờ lấy hàng → đang giao → đã giao; ghi thời điểm giao, gửi thông báo.             | U9; 1.60      |
| S-029 | Xem yêu cầu hoàn hàng | Xem lý do, mô tả và bằng chứng ảnh/video.                                                 | U9; 1.61      |
| S-030 | Chấp nhận hoàn hàng   | Cập nhật đơn, hoàn tiền và báo người mua; phụ thuộc chính sách ví/hoàn tiền cần xác nhận. | U9; 1.61      |
| S-031 | Kháng cáo hoàn hàng   | Gửi phản đối kèm bằng chứng, chuyển tranh chấp tới nhân viên sàn và báo người mua.        | U9; 1.61      |

### 4.6. Đánh giá và nhắn tin

| Mã    | Chức năng                | Mô tả và ràng buộc chính                                            | Nguồn     |
| ----- | ------------------------ | ------------------------------------------------------------------- | --------- |
| S-032 | Xem đánh giá             | Xem đánh giá sản phẩm/cửa hàng, lọc chưa phản hồi.                  | U6; 1.103 |
| S-033 | Phản hồi đánh giá        | Gửi phản hồi không trống, hiển thị dưới đánh giá và báo người mua.  | U6; 1.104 |
| S-034 | Xem danh sách trò chuyện | Xem cuộc trò chuyện và trạng thái chưa đọc.                         | U8; 1.105 |
| S-035 | Xem nội dung trò chuyện  | Mở lịch sử và đánh dấu tin nhắn đã đọc.                             | U8; 1.105 |
| S-036 | Gửi tin nhắn             | Gửi nội dung cho người mua trong cuộc trò chuyện có quyền truy cập. | U8; 1.106 |
| S-037 | Cấu hình trả lời tự động | Thiết lập nội dung phản hồi tự động của cửa hàng.                   | U8; 1.109 |

### 4.7. Thông báo và yêu cầu hỗ trợ

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                                                 | Nguồn      |
| ----- | ---------------------------- | ---------------------------------------------------------------------------------------- | ---------- |
| S-038 | Xem danh sách thông báo      | Xem thông báo của tài khoản người bán.                                                   | U10; 1.62  |
| S-039 | Xem chi tiết thông báo       | Mở nội dung, đánh dấu đã đọc, truy cập đối tượng liên quan theo quyền.                   | U10; 1.63  |
| S-040 | Đánh dấu tất cả đã đọc       | Cập nhật trạng thái toàn bộ thông báo của tài khoản.                                     | U10; 1.64  |
| S-041 | Báo cáo vi phạm              | Báo cáo sản phẩm/cửa hàng/người dùng, gửi bằng chứng; chặn báo cáo trùng đang chờ xử lý. | U22; 1.123 |
| S-042 | Gửi khiếu nại                | Chọn đơn liên quan, nhập nội dung và bằng chứng gửi sàn.                                 | U22; 1.124 |
| S-043 | Bổ sung thông tin yêu cầu    | Thêm nội dung/bằng chứng khi yêu cầu chờ xử lý, chặn nếu đã đóng.                        | U22; 1.125 |
| S-044 | Xem lịch sử, kết quả yêu cầu | Xem danh sách, trạng thái, nội dung và kết quả xử lý.                                    | U22; 1.126 |

### 4.8. Doanh thu và thống kê

| Mã    | Chức năng                  | Mô tả và ràng buộc chính                               | Nguồn      |
| ----- | -------------------------- | ------------------------------------------------------ | ---------- |
| S-045 | Xem tổng quan kinh doanh   | Xem báo cáo gian hàng, hiển thị 0 khi chưa có dữ liệu. | U15; 1.114 |
| S-046 | Xem tài chính              | Theo dõi doanh thu thực nhận, tiền tạm giữ, phí sàn.   | U15; 1.114 |
| S-047 | Xem vận hành               | Theo dõi tổng đơn, đơn giao/hủy, tỷ lệ hoàn.           | U15; 1.114 |
| S-048 | Xem tăng trưởng            | Theo dõi doanh thu và số đơn theo ngày.                | U15; 1.114 |
| S-049 | Lọc báo cáo theo thời gian | Chọn mốc/khoảng tùy chọn, chặn khoảng không hợp lệ.    | U15; 1.115 |
| S-050 | Xem top sản phẩm           | Hiển thị 5 sản phẩm doanh số cao nhất trong kỳ.        | U15; 1.116 |
| S-051 | Xuất báo cáo Excel         | Xuất số liệu theo bộ lọc hiện tại ra tệp Excel.        | U15; 1.117 |

### 4.9. Marketing

| Mã    | Chức năng                     | Mô tả và ràng buộc chính                                                               | Nguồn                   |
| ----- | ----------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| S-052 | Tạo voucher                   | Thiết lập mã giảm giá và điều kiện áp dụng của cửa hàng.                               | U16; 1.135              |
| S-053 | Cập nhật voucher              | Sửa cấu hình theo điều kiện cho phép; giới hạn sửa khi đã sử dụng cần làm rõ.          | U16; 1.136              |
| S-054 | Kết thúc voucher              | Dừng hiệu lực để không áp dụng cho giao dịch mới.                                      | U16; 1.136              |
| S-055 | Thiết lập, bắt đầu livestream | Nhập thông tin/ảnh bìa, kiểm tra trường bắt buộc và bắt đầu phiên phát.                | U16; 1.137              |
| S-056 | Gắn sản phẩm livestream       | Chọn sản phẩm đang bán và ghim cho người xem.                                          | U16; 1.138              |
| S-057 | Quản lý bình luận livestream  | Xem bình luận thời gian thực, ẩn bình luận vi phạm.                                    | U16; 1.139              |
| S-058 | Kết thúc livestream           | Dừng phát, lưu video theo kịch bản; giải pháp lưu trữ chưa chọn.                       | U16; 1.139              |
| S-059 | Đăng bài viết                 | Soạn nội dung, đính kèm ảnh/video/sản phẩm; kiểm tra tệp trước khi đăng.               | U16; 1.140              |
| S-060 | Cập nhật bài viết             | Sửa nội dung; điều kiện sửa cần làm rõ.                                                | U16; Lớp BaiViet.update |
| S-061 | Xóa bài viết                  | Gỡ bài thuộc cửa hàng; điều kiện và tác động cần làm rõ.                               | U16; Lớp BaiViet.delete |
| S-062 | Xem hiệu quả marketing        | Theo dõi lượt dùng voucher, lượt xem livestream/bài viết, doanh thu từng chương trình. | U16; 1.141              |

### 4.10. Ví điện tử — có điều kiện

Dùng cùng nghiệp vụ ví người mua, chỉ truy cập ví tài khoản người bán. Không suy ra thêm lịch đối soát hoặc cơ chế rút doanh thu ngoài nguồn.

| Mã    | Chức năng                    | Mô tả và ràng buộc chính                                             | Nguồn     |
| ----- | ---------------------------- | -------------------------------------------------------------------- | --------- |
| S-063 | Kích hoạt ví                 | Xác nhận email, tạo và xác nhận PIN 6 chữ số.                        | U7; 1.127 |
| S-064 | Xem số dư, lịch sử giao dịch | Xem số dư và giao dịch ví người bán.                                 | U7; 1.128 |
| S-065 | Liên kết ngân hàng           | Khai báo ngân hàng, số tài khoản và tên chủ.                         | U7; 1.129 |
| S-066 | Nạp tiền                     | Tạo phiên/QR, chỉ cộng tiền sau xác nhận thành công.                 | U7; 1.130 |
| S-067 | Rút tiền                     | Xác thực, kiểm tra số dư/trạng thái và chuyển về ngân hàng liên kết. | U7; 1.131 |
| S-068 | Đổi PIN                      | Kiểm tra PIN cũ và xác nhận PIN mới.                                 | U7; 1.132 |
| S-069 | Khôi phục PIN                | Xác thực mã email và đặt PIN mới.                                    | U7; 1.133 |
| S-070 | Chủ động khóa ví             | Xác thực và khóa giao dịch; luồng mở khóa chủ động chưa có đặc tả.   | U7; 1.134 |

## 5. Đối chiếu với ca sử dụng nguồn

| Ca sử dụng                  | Mã chức năng                                                         |
| --------------------------- | -------------------------------------------------------------------- |
| U1 — Tìm kiếm, khám phá     | C-012–C-019                                                          |
| U2 — Chi tiết sản phẩm      | C-020–C-024, C-050                                                   |
| U3 — Giỏ hàng               | C-025–C-029                                                          |
| U4 — Tài khoản người mua    | C-001–C-011                                                          |
| U5 — Đặt hàng, thanh toán   | C-030–C-037                                                          |
| U6 — Đánh giá               | C-044–C-045, S-032–S-033                                             |
| U7 — Ví điện tử             | C-059–C-066, S-063–S-070                                             |
| U8 — Nhắn tin               | C-046–C-050, S-034–S-037                                             |
| U9 — Theo dõi, quản lý đơn  | C-038–C-043, S-024–S-031; liên quan A-033                            |
| U10 — Thông báo             | A-042–A-044, C-051–C-053, S-038–S-040                                |
| U11 — Sản phẩm, biến thể    | S-012–S-019                                                          |
| U12 — Tài khoản người bán   | S-001–S-007                                                          |
| U13 — Danh mục cửa hàng     | S-020–S-023                                                          |
| U14 — Thông tin cửa hàng    | S-008–S-011                                                          |
| U15 — Doanh thu, thống kê   | S-045–S-051                                                          |
| U16 — Marketing             | S-052–S-062                                                          |
| U17 — Gian hàng toàn sàn    | A-001–A-007                                                          |
| U18 — Thống kê toàn sàn     | A-036–A-041                                                          |
| U19 — Trang chủ toàn sàn    | A-018–A-028                                                          |
| U20 — Xử lý yêu cầu         | A-029–A-034                                                          |
| U21 — Kiểm duyệt sản phẩm   | A-013–A-016                                                          |
| U22 — Khiếu nại, báo cáo    | C-055–C-058, S-041–S-044                                             |
| U23 — Tài khoản người dùng  | A-008–A-012                                                          |
| YC chưa có ca sử dụng riêng | A-017: danh mục toàn sàn; A-035: khuyến mãi toàn sàn; C-054: chatbot |

Tổng cộng **180 chức năng**: **44** Nhân viên sàn, **66** Người mua, **70** Người bán. Tổng bao gồm chức năng có điều kiện và cần làm rõ, không đồng nghĩa toàn bộ đã được duyệt triển khai.

## 6. Nội dung cần xác nhận

| Chủ đề                 | Khoảng trống/mâu thuẫn nguồn và quyết định cần xác nhận                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ví nội bộ              | U7 ghi “nếu hệ thống triển khai ví nội bộ”, nhưng kịch bản sau dùng ví cho thanh toán/hoàn tiền. Cần xác nhận phạm vi ví và phương án hoàn tiền, giải ngân nếu không có ví.                                        |
| PIN và OTP             | Đặc tả U7 dùng OTP khi rút tiền; Bảng 1.131 dùng PIN, khóa 30 phút nếu sai quá 5 lần liên tiếp. Cần chốt cơ chế xác thực và mở khóa ví bị chủ động khóa.                                                           |
| Hủy đơn                | U9 chặn sau bàn giao vận chuyển; Bảng 1.55 giới hạn đơn chờ xác nhận và chặn khi cửa hàng đã xử lý. Cần thống nhất trạng thái cuối được hủy và xử lý hủy đồng thời xác nhận.                                       |
| Hoàn hàng              | Nguồn có mốc 15 ngày và khóa hoàn hàng sau xác nhận nhận hàng; chấp nhận hoàn hàng dẫn tới hoàn tiền ngay, chưa mô tả xác nhận nhận lại hàng. Cần chốt thời điểm hoàn tiền và quy trình tranh chấp.                |
| Quyền đánh giá         | Bảng 1.101 cho đánh giá trong 15 ngày, chặn đơn chờ hoàn hàng; Bảng 1.54 còn khóa đánh giá khi sản phẩm hết hàng/ngừng kinh doanh. Cần xác nhận có thật sự giới hạn đánh giá theo trạng thái kinh doanh hay không. |
| Đơn nhiều cửa hàng     | Chưa rõ cách tách đơn, tính vận chuyển, voucher, thanh toán và hoàn tiền khi giỏ chứa hàng nhiều người bán. Không tự chọn mô hình xử lý.                                                                           |
| U20                    | Chưa có bảng đặc tả riêng; cần chốt trạng thái yêu cầu, kết quả hợp lệ, quyền phân xử và thông báo kết quả.                                                                                                        |
| Kiểm duyệt             | Danh sách U21 nhắc sản phẩm bị hệ thống đánh giá không đủ tiêu chuẩn, kịch bản lại dùng sản phẩm mới/chờ duyệt. Cần chốt phạm vi kiểm duyệt và điều kiện duyệt lại.                                                |
| Danh mục               | Cần làm rõ quan hệ giữa danh mục chung toàn sàn, danh mục cửa hàng và lựa chọn hiển thị trang chủ.                                                                                                                 |
| Khuyến mãi toàn sàn    | Chưa có luồng đầy đủ; cần chốt cách quản lý, nguồn tài trợ, cộng dồn ưu đãi và quan hệ voucher cửa hàng.                                                                                                           |
| Tài khoản nhân viên    | Thiếu luồng cấp tài khoản, xác thực, phân quyền; cần chốt quyền khóa chính mình/nhân viên khác. Không mặc định mọi nhân viên có toàn quyền.                                                                        |
| Hồ sơ cửa hàng         | Bảng 1.66 yêu cầu cửa hàng được duyệt mới thêm sản phẩm; cần bổ sung quy định cho các thao tác còn lại và luồng gửi lại hồ sơ bị từ chối.                                                                          |
| Livestream và bài viết | Người bán có chức năng phát/đăng nhưng phía người mua thiếu kịch bản xem, bình luận, mua từ nội dung. Chưa coi các thao tác tương tác này là phạm vi đã chốt.                                                      |
| Chatbot, gợi ý         | Thiếu tiêu chí nghiệm thu, nguồn kiến thức, chính sách dùng lịch sử hành vi và giới hạn tra cứu dữ liệu cá nhân. Chưa chốt provider hoặc giải pháp triển khai.                                                     |
| Báo cáo                | Cần thống nhất công thức doanh thu, doanh số, phí sàn, tỷ lệ hoàn và cách quy doanh thu về từng chương trình marketing.                                                                                            |
| Tích hợp, tải tệp      | Chưa chọn provider thanh toán/email/storage/livestream/vận chuyển; nhiều luồng chưa có giới hạn định dạng/dung lượng cụ thể. Cần xác nhận chế độ mô phỏng và giới hạn trước triển khai.                            |

## 7. Ràng buộc thiết kế chung

- Kiểm tra xác thực, vai trò và quyền sở hữu ở backend; người mua/người bán chỉ truy cập dữ liệu thuộc quyền của mình.
- Kiểm tra dữ liệu đầu vào và trạng thái trước mọi thao tác; có kết quả rõ ràng khi danh sách rỗng, dữ liệu không còn khả dụng hoặc xử lý thất bại.
- Bảo đảm toàn vẹn giữa đơn, tồn kho, thanh toán, hoàn tiền và số dư ví. Gửi lại thao tác hoặc nhận lại kết quả thanh toán không được gây ghi nhận tiền/tồn kho nhiều lần.
- Giữ dữ liệu đơn/giao dịch cũ khi sản phẩm không còn kinh doanh; không diễn giải chức năng xóa thành xóa lịch sử giao dịch.
- Liên kết mã chức năng với màn hình, ca kiểm thử và tiêu chí nghiệm thu ở bước thiết kế tiếp theo. Các mục chưa rõ phải được xác nhận trước khi triển khai.
- Tài liệu không tự bổ sung pre-order, guest checkout, provider hay thay đổi kiến trúc/package.
