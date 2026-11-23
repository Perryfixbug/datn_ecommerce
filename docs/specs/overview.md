### **Mục tiêu của đề tài**

### Mục tiêu tổng quát: Xây dựng một sàn thương mại điện tử chuyên về nội thất theo mô hình đa người bán, có đầy đủ chức năng mua bán, quản lý và vận hành, đồng thời tích hợp chatbot tư vấn và hệ thống gợi ý sản phẩm.

Mục tiêu cụ thể:

- Khảo sát, phân tích nghiệp vụ và xác định yêu cầu của ba nhóm tác nhân chính: người mua, người bán và Nhân viên sàn.
- Xây dựng các chức năng cốt lõi cho người mua: tìm kiếm và lọc sản phẩm, xem chi tiết, giỏ hàng, đặt hàng, thanh toán, theo dõi đơn hàng, đánh giá sản phẩm, ví điện tử, nhắn tin và nhận thông báo.
- Xây dựng các chức năng cho người bán: quản lý sản phẩm và biến thể, danh mục, thông tin cửa hàng, đơn hàng, thống kê doanh thu và các công cụ marketing (livestream, bài viết, mã giảm giá).
- Xây dựng các chức năng cho Nhân viên sàn: quản lý gian hàng, tài khoản, danh mục, kiểm duyệt sản phẩm, khuyến mãi, xử lý khiếu nại và giám sát hoạt động toàn sàn.
- Tích hợp chatbot hỗ trợ tư vấn sản phẩm và giải đáp thắc mắc cho người dùng.
- Xây dựng hệ thống gợi ý sản phẩm dựa trên hành vi và sở thích của người dùng.
- Hoàn thiện tài liệu phân tích, thiết kế và kiểm thử hệ thống theo quy trình phát triển phần mềm.

**Đối tượng và phạm vi nghiên cứu**

Đối tượng nghiên cứu:

- Quy trình nghiệp vụ của một sàn thương mại điện tử đa người bán trong lĩnh vực nội thất.
- Các tác nhân sử dụng hệ thống: người mua, người bán, Nhân viên sàn.
- Các kỹ thuật xây dựng chatbot tư vấn và hệ thống gợi ý sản phẩm trong thương mại điện tử.

Phạm vi nghiên cứu:

- Về chức năng: hệ thống gồm 23 ca sử dụng (U1–U23), chia theo ba nhóm người dùng: người mua, người bán và Nhân viên sàn. Chatbot và hệ thống gợi ý được tích hợp như các thành phần hỗ trợ trải nghiệm mua sắm.
- Về sản phẩm: tập trung vào nhóm hàng nội thất (bàn, ghế, tủ, giường, sofa, đồ trang trí…).
- Về nền tảng: ứng dụng web.
- Về dữ liệu: sử dụng dữ liệu mẫu và dữ liệu thử nghiệm phục vụ mục đích học tập, chưa triển khai trên môi trường kinh doanh thực tế.
- Về thanh toán và vận chuyển: thực hiện ở mức mô phỏng hoặc tích hợp thử nghiệm.

### **Yêu cầu chức năng và phi chức năng**

Yêu cầu chức năng:

- Người mua: đăng ký, đăng nhập và quản lý tài khoản; tìm kiếm, lọc, xem chi tiết sản phẩm; quản lý giỏ hàng; đặt hàng và thanh toán; theo dõi đơn hàng; đánh giá sản phẩm; quản lý ví điện tử; nhắn tin với người bán; xem thông báo.
- Người bán: quản lý tài khoản và thông tin cửa hàng; quản lý sản phẩm, biến thể và danh mục; xử lý đơn hàng; theo dõi doanh thu và thống kê; áp dụng chính sách marketing (livestream, đăng bài, mã giảm giá); nhắn tin với người mua.
- Nhân viên sàn: quản lý gian hàng và tài khoản người dùng; quản lý danh mục toàn sàn; kiểm duyệt sản phẩm; quản lý khuyến mãi; xử lý khiếu nại, hoàn hàng và báo cáo vi phạm; thống kê và giám sát toàn hệ thống.
- Chatbot: tiếp nhận câu hỏi của người dùng, tư vấn sản phẩm và hỗ trợ tra cứu thông tin cơ bản.
- Hệ thống gợi ý: đề xuất sản phẩm phù hợp dựa trên lịch sử xem, tìm kiếm và mua hàng của người dùng.

Yêu cầu phi chức năng:

- Hiệu năng: thời gian phản hồi nhanh, chịu được nhiều người dùng truy cập đồng thời.
- Bảo mật: xác thực và phân quyền theo vai trò; mã hóa mật khẩu; bảo vệ thông tin cá nhân và giao dịch.
- Tính dễ sử dụng: giao diện trực quan, thân thiện, hiển thị tốt trên nhiều kích thước màn hình.
- Độ tin cậy và sẵn sàng: hoạt động ổn định, đảm bảo toàn vẹn dữ liệu đơn hàng và thanh toán.
- Khả năng mở rộng và bảo trì: kiến trúc rõ ràng, dễ nâng cấp, bổ sung chức năng.
- Tính tương thích: chạy được trên các trình duyệt phổ biến.

# **CHƯƠNG 1: XÁC ĐỊNH YÊU CẦU**

## **1.1. Xác định yêu cầu nghiệp vụ**

(Phần này chỉ tập trung vào nghiệp vụ người dùng, chưa xuất hiện hệ thống)

### **1.1.1. Xác định và mô tả các tác nhân**

(Mô tả các tác nhân)  
(Context diagram)

### **1.1.2. Xây dựng bảng thuật ngữ**

### **1.1.3. Xác định quy tắc nghiệp vụ (Business Rules)**

### **1.1.4. Xác định quy trình nghiệp vụ (Business Flow)**

(Vẽ BPMN \- Mô hình hóa quy trình)

### **1.1.5. Xây dựng sơ đồ luồng dữ liệu (DFD)**

## **1.2. Xác định yêu cầu hệ thống**

### **1.2.1. Xác định và mô tả các ca sử dụng**

#### **_a) Danh sách các ca sử dụng_**

| Mã ca | Tên ca                                  | Mô tả                                                                                                                                              |
| :---- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1    | Tìm kiếm và khám phá sản phẩm           | Người mua tìm kiếm, lọc và khám phá các sản phẩm nội thất trên sàn.                                                                                |
| U2    | Xem chi tiết sản phẩm                   | Người mua xem thông tin chi tiết, hình ảnh, giá bán, đánh giá và các thuộc tính của sản phẩm nội thất.                                             |
| U3    | Quản lý giỏ hàng                        | Người mua thêm, cập nhật số lượng hoặc xóa sản phẩm khỏi giỏ hàng.                                                                                 |
| U4    | Quản lý tài khoản (Người mua)           | Người mua thực hiện tất cả các thao tác liên quan đến tài khoản như: đăng ký, đăng nhập, quên mật khẩu, thay đổi thông tin.                        |
| U5    | Đặt hàng và thanh toán                  | Người mua tạo đơn hàng và thực hiện thanh toán cho các sản phẩm đã chọn.                                                                           |
| U6    | Đánh giá sản phẩm                       | Người mua đánh giá và nhận xét sản phẩm đã mua theo các điều kiện của hệ thống.                                                                    |
| U7    | Quản lý ví điện tử                      | Người dùng thực hiện các chức năng liên quan đến ví điện tử, chẳng hạn như xem số dư và lịch sử giao dịch, nếu hệ thống triển khai ví nội bộ.      |
| U8    | Nhắn tin                                | Người mua và người bán trao đổi thông tin với nhau thông qua hệ thống nhắn tin.                                                                    |
| U9    | Theo dõi và quản lý đơn hàng            | Người mua theo dõi trạng thái đơn hàng; người bán tiếp nhận và xử lý đơn hàng thuộc gian hàng của mình.                                            |
| U10   | Xem thông báo                           | Người mua, người bán, Nhân viên sàn đều có thể xem các thông báo đến từ hệ thống.                                                                  |
| U11   | Quản lý sản phẩm và biến thể            | Người bán thêm, cập nhật, xóa sản phẩm và quản lý các biến thể như màu sắc, kích thước của sản phẩm nội thất.                                      |
| U12   | Quản lý tài khoản (Người bán)           | Người bán thực hiện tất cả các thao tác liên quan đến tài khoản như: đăng ký, đăng nhập, quên mật khẩu, xác thực, thay đổi thông tin.              |
| U13   | Quản lý danh mục sản phẩm               | Người bán phân loại sản phẩm theo các danh mục được hệ thống cho phép.                                                                             |
| U14   | Quản lý thông tin cửa hàng              | Người bán cập nhật thông tin gian hàng, bao gồm tên cửa hàng, mô tả, hình ảnh và các thông tin liên quan.                                          |
| U15   | Theo dõi doanh thu và thống kê bán hàng | Người bán theo dõi doanh thu, số lượng đơn hàng, lượt truy cập và các chỉ số kinh doanh của gian hàng.                                             |
| U16   | Áp dụng các chính sách marketing        | Người bán có thể áp dụng 1 số chức năng hệ thống để giúp bán được nhiều hàng hơn như: livestream, đăng bài viết, thêm mã giảm giá.                 |
| U17   | Quản lý gian hàng toàn sàn              | Nhân viên sàn quản lý, giám sát và kiểm soát hoạt động của các gian hàng trên hệ thống.                                                            |
| U18   | Thống kê và giám sát hoạt động toàn sàn | Nhân viên sàn theo dõi các số liệu tổng hợp và tình hình hoạt động của toàn bộ hệ thống.                                                           |
| U19   | Quản lý trang chủ toàn sàn              | Nhân viên sàn theo dõi quản lý trang chủ của sàn bao gồm: hero, banner, carousel, danh mục.                                                        |
| U20   | Xử lý yêu cầu người dùng                | Nhân viên sàn tiếp nhận và xử lý khiếu nại báo cáo vi phạm từ người dùng.                                                                          |
| U21   | Kiểm duyệt sản phẩm                     | Nhân viên sàn kiểm tra và phê duyệt hoặc từ chối các sản phẩm được hệ thống đánh giá là không đủ tiêu chuẩn.                                       |
| U22   | Gửi khiếu nại, báo cáo                  | Người mua, người bán có thể gửi những báo cáo hoặc khiếu nại lên hệ thống.                                                                         |
| U23   | Quản lý tài khoản người dùng            | Nhân viên sàn quản lý tài khoản người mua và người bán, bao gồm xem thông tin, cập nhật trạng thái và xử lý các trường hợp vi phạm theo quyền hạn. |

#### **_b) Sơ đồ Usecase tổng quan_**

![][image3]

##### **_Hình .. Sơ đồ ca sử dụng tổng quan_**

### **1.2.2. Xếp ưu tiên các ca sử dụng**

#### **_a) Giai đoạn 1: Các ca sử dụng ưu tiên cao_**

Đây là các ca sử dụng cốt lõi, cần được triển khai trước để đảm bảo hệ thống có thể vận hành với các nghiệp vụ chính, bao gồm tìm kiếm sản phẩm, mua hàng, thanh toán, quản lý sản phẩm và xử lý đơn hàng.

- U1: Tìm kiếm và khám phá sản phẩm.
- U2: Xem chi tiết sản phẩm.
- U3: Quản lý giỏ hàng.
- U4: Quản lý tài khoản (Người mua).
- U5: Đặt hàng và thanh toán.
- U9: Theo dõi và quản lý đơn hàng.
- U10: Xem thông báo.
- U11: Quản lý sản phẩm và biến thể.
- U12: Quản lý tài khoản (Người bán).
- U14: Quản lý thông tin cửa hàng.
- U17: Quản lý gian hàng toàn sàn.
- U19: Quản lý danh mục sản phẩm toàn sàn.
- U21: Kiểm duyệt sản phẩm.
- U22: Quản lý tài khoản người dùng.

#### **_b) Giai đoạn 2: Các ca sử dụng ưu tiên trung bình_**

Đây là các ca sử dụng giúp hoàn thiện quy trình vận hành, nâng cao trải nghiệm người dùng, hỗ trợ hoạt động kinh doanh và tăng cường khả năng quản lý, giám sát của hệ thống.

- U6: Đánh giá sản phẩm.
- U8: Nhắn tin.
- U13: Quản lý danh mục sản phẩm.
- U15: Theo dõi doanh thu và thống kê bán hàng.
- U18: Thống kê và giám sát hoạt động toàn sàn.

#### **_c) Giai đoạn 3: Các ca sử dụng ưu tiên thấp_**

Đây là các ca sử dụng có tính chất mở rộng, bổ sung các tiện ích nâng cao hoặc phụ thuộc vào định hướng phát triển và nguồn lực triển khai của hệ thống. Các chức năng này có thể được xem xét phát triển sau khi các nghiệp vụ cốt lõi đã hoạt động ổn định.

- U22: Gửi báo cáo, khiếu nại
- U7: Quản lý ví điện tử.
- U16: Áp dụng các chính sách marketing.

### **1.2.3. Xây dựng biểu đồ ca sử dụng phân rã**

#### **_a) Giai đoạn 1_**

**U1) Tìm kiếm và khám phá sản phẩm.**

##### **_![][image4]Hình 1.2. Sơ đồ ca sử dụng tìm kiếm và khám phá sản phẩm_**

###### **_Bảng 1.1. Đặc tả ca sử dụng U1 – Tìm kiếm và khám phá sản phẩm_**

| Tên Use case         | Tìm kiếm và khám phá sản phẩm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Người mua đã truy cập vào sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Hậu điều kiện        | Người mua xem được sản phẩm, kết quả tìm kiếm hoặc trang cửa hàng.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Chuỗi sự kiện chính  | 1\. Người mua xem sản phẩm trên trang chủ. 2\. Hệ thống hiển thị danh sách sản phẩm trên trang chủ. 3\. Người mua nhập từ khóa vào ô tìm kiếm sản phẩm. 4\. Hệ thống hiển thị các từ khóa gợi ý tìm kiếm. 5\. Người mua chọn từ khóa gợi ý hoặc nhấn tìm kiếm. 6\. Hệ thống hiển thị danh sách sản phẩm tìm kiếm. 7\. Người mua lọc kết quả theo khoảng giá hoặc theo tỉnh thành của cửa hàng. 8\. Hệ thống hiển thị kết quả đã lọc. 9\. Người mua sắp xếp kết quả theo giá. 10\. Hệ thống hiển thị kết quả đã sắp xếp. 11\. Người mua chọn xem trang cửa hàng. 12\. Hệ thống hiển thị trang cửa hàng. |
| Ngoại lệ             | 6.1. Không có sản phẩm nào khớp với từ khóa. 6.1.1. Hệ thống thông báo: “Không tìm thấy sản phẩm phù hợp”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#####

**U2) Xem chi tiết sản phẩm.**  
![][image5]

##### **_Hình 1.3. Sơ đồ ca sử dụng xem chi tiết sản phẩm_**

###### **_Bảng 1.2. Đặc tả ca sử dụng U2 – Xem chi tiết sản phẩm_**

| Tên Use case         | Xem chi tiết sản phẩm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Người mua đã truy cập vào sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Hậu điều kiện        | Người mua xem được chi tiết sản phẩm và thực hiện thao tác mua.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Chuỗi sự kiện chính  | 1\. Người mua chọn một sản phẩm để xem chi tiết. 2\. Hệ thống hiển thị trang chi tiết sản phẩm. 3\. Người mua xem bộ ảnh sản phẩm. 4\. Hệ thống hiển thị các ảnh của sản phẩm. 5\. Người mua xem mô tả và thông số kỹ thuật. 6\. Hệ thống hiển thị mô tả và thông số kỹ thuật của sản phẩm. 7\. Người mua xem đánh giá sản phẩm. 8\. Hệ thống hiển thị các đánh giá của sản phẩm. 9\. Người mua chọn xem trang cửa hàng. 10\. Hệ thống hiển thị trang cửa hàng bán sản phẩm. 11\. Người mua chọn chat với người bán. 12\. Hệ thống mở khung trò chuyện với người bán. 13\. Người mua nhấn “Thêm vào giỏ hàng”. 14\. Hệ thống thêm sản phẩm vào giỏ hàng và thông báo thành công. 15\. Người mua nhấn “Mua ngay”. 16\. Hệ thống chuyển người mua tới trang đặt hàng. |
| Ngoại lệ             | 14.1. Người mua chưa đăng nhập. 14.1.1. Hệ thống thông báo: “Vui lòng đăng nhập để tiếp tục”. 14.2. Sản phẩm đã hết hàng. 14.2.1. Hệ thống thông báo: “Sản phẩm đã hết hàng”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**U3) Quản lý giỏ hàng.**  
![][image6]

##### **_Hình 1.4. Sơ đồ ca sử dụng quản lý giỏ hàng_**

#####

###### **_Bảng 1.3. Đặc tả ca sử dụng U3 – Quản lý giỏ hàng_**

| Tên Use case         | Quản lý giỏ hàng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Hậu điều kiện        | Giỏ hàng được cập nhật; sản phẩm được chọn chuyển sang đặt hàng.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Chuỗi sự kiện chính  | 1\. Người mua mở xem giỏ hàng. 2\. Hệ thống hiển thị các sản phẩm trong giỏ hàng. 3\. Người mua cập nhật số lượng sản phẩm. 4\. Hệ thống cập nhật số lượng và thành tiền. 5\. Người mua cập nhật biến thể sản phẩm. 6\. Hệ thống cập nhật biến thể và giá của sản phẩm. 7\. Người mua xóa sản phẩm khỏi giỏ. 8\. Hệ thống xóa sản phẩm và cập nhật giỏ hàng. 9\. Người mua chọn sản phẩm cần mua. 10\. Hệ thống tính tổng tiền các sản phẩm được chọn. 11\. Người mua nhấn “Mua ngay”. 12\. Hệ thống chuyển các sản phẩm được chọn sang trang đặt hàng. |
| Ngoại lệ             | 2.1. Giỏ hàng chưa có sản phẩm. 2.1.1. Hệ thống thông báo: “Giỏ hàng của bạn đang trống”. 4.1. Số lượng vượt quá tồn kho. 4.1.1. Hệ thống thông báo: “Số lượng vượt quá tồn kho hiện có”. 12.1. Người mua chưa chọn sản phẩm nào. 12.1.1. Hệ thống thông báo: “Vui lòng chọn sản phẩm cần mua”.                                                                                                                                                                                                                                                         |

#####

**U4) Quản lý tài khoản (Người mua).**  
![][image7]

##### **_Hình 1.5. Sơ đồ ca sử dụng quản lý tài khoản (người mua)_**

#####

###### **_Bảng 1.4. Đặc tả ca sử dụng U4 – Quản lý tài khoản (Người mua)_**

| Tên Use case         | Quản lý tài khoản (Người mua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Người mua đã truy cập vào sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Hậu điều kiện        | Tài khoản và thông tin của người mua được tạo hoặc cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Chuỗi sự kiện chính  | 1\. Người mua chọn đăng ký tài khoản và nhập email, mật khẩu. 2\. Hệ thống gửi mã OTP xác thực tới email. 3\. Người mua nhập OTP xác thực. 4\. Hệ thống xác thực OTP và tạo tài khoản. 5\. Người mua đăng nhập bằng email và mật khẩu. 6\. Hệ thống đăng nhập và chuyển tới trang chủ. 7\. Người mua vào quản lý hồ sơ cá nhân và cập nhật hồ sơ. 8\. Hệ thống lưu hồ sơ cá nhân. 9\. Người mua vào quản lý sổ địa chỉ để thêm, sửa, xóa địa chỉ hoặc đặt địa chỉ mặc định. 10\. Hệ thống cập nhật sổ địa chỉ. 11\. Người mua chọn đổi mật khẩu, nhập mật khẩu mới và OTP xác thực. 12\. Hệ thống cập nhật mật khẩu mới. 13\. Người mua chọn đăng xuất. 14\. Hệ thống kết thúc phiên đăng nhập. 15\. Người mua chọn quên mật khẩu khi đăng nhập lại và nhập email. 16\. Hệ thống gửi mã xác nhận và cho phép đặt lại mật khẩu. |
| Ngoại lệ             | 2.1. Email sai định dạng hoặc đã được đăng ký. 2.1.1. Hệ thống thông báo: “Email không hợp lệ hoặc đã tồn tại”. 4.1. OTP sai hoặc hết hạn. 4.1.1. Hệ thống thông báo: “Mã OTP không đúng hoặc đã hết hạn”. 6.1. Email hoặc mật khẩu không đúng. 6.1.1. Hệ thống thông báo: “Email hoặc mật khẩu không đúng”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

#####

**U5) Đặt hàng và thanh toán.**  
![][image8]

##### **_Hình 1.6. Sơ đồ ca sử dụng đặt hàng và thanh toán_**

#####

###### **_Bảng 1.5. Đặc tả ca sử dụng U5 – Đặt hàng và thanh toán_**

| Tên Use case         | Đặt hàng và thanh toán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đã chọn sản phẩm cần mua.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Đơn hàng được đặt và thanh toán thành công.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Chuỗi sự kiện chính  | 1\. Người mua nhấn “Đặt hàng”. 2\. Hệ thống hiển thị trang đặt hàng. 3\. Người mua chọn địa chỉ nhận hàng. 4\. Hệ thống cập nhật địa chỉ nhận hàng cho đơn. 5\. Người mua thêm địa chỉ mới. 6\. Hệ thống lưu và chọn địa chỉ mới cho đơn. 7\. Người mua áp dụng mã giảm giá cửa hàng. 8\. Hệ thống áp dụng mã và cập nhật tổng tiền. 9\. Người mua chọn phương thức thanh toán. 10\. Hệ thống ghi nhận phương thức thanh toán. 11\. Người mua thực hiện thanh toán. 12\. Hệ thống xác nhận thanh toán và thông báo đặt hàng thành công. |
| Ngoại lệ             | 8.1. Mã giảm giá không đủ điều kiện. 8.1.1. Hệ thống thông báo: “Mã giảm giá không áp dụng được cho đơn hàng này”. 12.1. Sản phẩm hết hàng hoặc không đủ số lượng. 12.1.1. Hệ thống thông báo: “Sản phẩm này hiện đang hết hàng/không đủ số lượng bạn yêu cầu, vui lòng thử lại sau”. 12.2. Thanh toán không thành công. 12.2.1. Hệ thống thông báo: “Thanh toán không thành công, vui lòng thử lại”.                                                                                                                                   |

#####

**U9) Theo dõi và quản lý đơn hàng.**  
![][image9]

##### **_Hình 1.7. Sơ đồ ca sử dụng theo dõi và quản lý đơn hàng_**

#####

###### **_Bảng 1.6. Đặc tả ca sử dụng U9 – Theo dõi và quản lý đơn hàng_**

| Tên Use case         | Theo dõi và quản lý đơn hàng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Người mua đã đặt hàng; người mua và người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Trạng thái đơn hàng được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Chuỗi sự kiện chính  | 1\. Người bán vào quản lý đơn hàng và duyệt đơn hàng. 2\. Hệ thống cập nhật trạng thái đơn hàng. 3\. Người mua xem lịch sử đơn hàng. 4\. Hệ thống hiển thị danh sách đơn hàng. 5\. Người mua xem chi tiết đơn hàng. 6\. Hệ thống hiển thị chi tiết đơn hàng. 7\. Người mua và người bán theo dõi trạng thái giao hàng. 8\. Hệ thống hiển thị trạng thái giao hàng. 9\. Người mua hủy đơn hàng, xác nhận đã nhận hàng hoặc gửi yêu cầu hoàn hàng kèm minh chứng. 10\. Hệ thống cập nhật trạng thái đơn hàng tương ứng. 11\. Người bán xử lý yêu cầu hoàn hàng. 12\. Hệ thống cập nhật kết quả xử lý và thông báo cho người mua. |
| Ngoại lệ             | 10.1. Đơn hàng đã được giao cho đơn vị vận chuyển khi người mua hủy. 10.1.1. Hệ thống thông báo: “Đơn hàng đã được bàn giao cho đơn vị vận chuyển, không thể hủy”. 10.2. Yêu cầu hoàn hàng quá thời hạn cho phép. 10.2.1. Hệ thống thông báo: “Đơn hàng đã quá thời hạn yêu cầu hoàn hàng”.                                                                                                                                                                                                                                                                                                                                    |

#####

**U10) Xem thông báo.**  
![][image10]

##### **_Hình 1.8. Sơ đồ ca sử dụng xem thông báo_**

######

###### **_Bảng 1.7. Đặc tả ca sử dụng U10 – Xem thông báo_**

| Tên Use case         | Xem thông báo                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Thông báo được xem và đánh dấu đã đọc.                                                                                                                                                                                                                                                                                                                                                                                    |
| Chuỗi sự kiện chính  | 1\. Người mua nhận thông báo. 2\. Hệ thống hiển thị số thông báo chưa đọc. 3\. Người mua xem danh sách thông báo. 4\. Hệ thống hiển thị danh sách thông báo. 5\. Người mua chọn một thông báo. 6\. Hệ thống chuyển tới mục được thông báo. 7\. Người mua đánh dấu thông báo đã đọc. 8\. Hệ thống cập nhật trạng thái đã đọc. 9\. Người mua đánh dấu đã đọc tất cả. 10\. Hệ thống cập nhật toàn bộ thông báo thành đã đọc. |
| Ngoại lệ             | 4.1. Chưa có thông báo nào. 4.1.1. Hệ thống thông báo: “Bạn chưa có thông báo nào”.                                                                                                                                                                                                                                                                                                                                       |

#####

**U11) Quản lý sản phẩm và biến thể.**  
![][image11]

##### **_Hình 1.9. Sơ đồ ca sử dụng quản lý sản phẩm và biến thể_**

#####

###### **_Bảng 1.8. Đặc tả ca sử dụng U11 – Quản lý sản phẩm và biến thể_**

| Tên Use case         | Quản lý sản phẩm và biến thể                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Hậu điều kiện        | Sản phẩm và biến thể được thêm, cập nhật hoặc xóa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Chuỗi sự kiện chính  | 1\. Người bán xem danh sách sản phẩm. 2\. Hệ thống hiển thị danh sách sản phẩm. 3\. Người bán chọn thêm sản phẩm và tải ảnh sản phẩm. 4\. Hệ thống hiển thị ảnh đã tải lên. 5\. Người bán nhập thông tin sản phẩm, thông số kỹ thuật và gắn thẻ trạng thái. 6\. Hệ thống ghi nhận thông tin sản phẩm. 7\. Người bán thêm biến thể và thiết lập giá. 8\. Hệ thống hiển thị danh sách biến thể. 9\. Người bán lưu sản phẩm. 10\. Hệ thống lưu sản phẩm và thông báo thành công. 11\. Người bán cập nhật sản phẩm hoặc xóa biến thể. 12\. Hệ thống lưu thay đổi. 13\. Người bán xóa sản phẩm. 14\. Hệ thống xóa sản phẩm khỏi danh sách. |
| Ngoại lệ             | 4.1. Ảnh sai định dạng hoặc vượt dung lượng. 4.1.1. Hệ thống thông báo: “Ảnh không hợp lệ”. 10.1. Thiếu thông tin bắt buộc. 10.1.1. Hệ thống thông báo: “Vui lòng nhập đầy đủ thông tin sản phẩm”.                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#####

**U12) Usecase quản lý tài khoản người bán**  
![][image12]

##### **_Hình 1.10. Sơ đồ ca sử dụng quản lý tài khoản người bán_**

#####

###### **_Bảng 1.9. Đặc tả ca sử dụng U12 – Quản lý tài khoản (Người bán)_**

| Tên Use case         | Quản lý tài khoản (Người bán)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Người bán đã truy cập kênh người bán.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Hậu điều kiện        | Tài khoản người bán được tạo, xác thực hoặc cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Chuỗi sự kiện chính  | 1\. Người bán đăng ký tài khoản. 2\. Hệ thống tạo tài khoản người bán. 3\. Người bán đăng nhập. 4\. Hệ thống chuyển tới trang chủ người bán. 5\. Người bán xác thực tài khoản bằng cách gửi hồ sơ cửa hàng. 6\. Hệ thống gửi hồ sơ tới quản trị sàn và thông báo chờ duyệt. 7\. Người bán cập nhật thông tin tài khoản. 8\. Hệ thống lưu thông tin tài khoản. 9\. Người bán đổi mật khẩu. 10\. Hệ thống cập nhật mật khẩu mới. 11\. Người bán chọn quên mật khẩu khi đăng nhập lại. 12\. Hệ thống gửi mã xác nhận và cho phép đặt lại mật khẩu. |
| Ngoại lệ             | 2.1. Email đã được đăng ký. 2.1.1. Hệ thống thông báo: “Email này đã được đăng ký”. 4.1. Email hoặc mật khẩu không đúng. 4.1.1. Hệ thống thông báo: “Email hoặc mật khẩu không đúng”.                                                                                                                                                                                                                                                                                                                                                           |

#####

**U14) Quản lý cửa hàng**  
![][image13]

##### **_Hình 1.11. Sơ đồ ca sử dụng quản lý cửa hàng_**

#####

###### **_Bảng 1.10. Đặc tả ca sử dụng U14 – Quản lý thông tin cửa hàng_**

| Tên Use case         | Quản lý thông tin cửa hàng                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Hậu điều kiện        | Thông tin và giao diện cửa hàng được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                       |
| Chuỗi sự kiện chính  | 1\. Người bán vào quản lý cửa hàng và xem thông tin cửa hàng. 2\. Hệ thống hiển thị thông tin cửa hàng. 3\. Người bán cập nhật thông tin cơ bản: avatar, tên, mô tả. 4\. Hệ thống lưu thông tin cơ bản. 5\. Người bán trang trí cửa hàng: thiết lập trang chủ cho giao diện điện thoại hoặc máy tính. 6\. Hệ thống lưu giao diện trang chủ cửa hàng. 7\. Người bán cập nhật danh mục sản phẩm hiển thị. 8\. Hệ thống lưu danh mục sản phẩm hiển thị. |
| Ngoại lệ             | 4.1. Tên cửa hàng trống hoặc ảnh không hợp lệ. 4.1.1. Hệ thống thông báo: “Thông tin cửa hàng không hợp lệ”.                                                                                                                                                                                                                                                                                                                                         |

#####

**U17) Quản lý gian hàng toàn sàn**  
![][image14]

##### **_Hình 1.12. Sơ đồ ca sử dụng quản lý gian hàng toàn sàn_**

#####

###### **_Bảng 1.11. Đặc tả ca sử dụng U17 – Quản lý gian hàng toàn sàn_**

| Tên Use case         | Quản lý gian hàng toàn sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Thông tin, trạng thái gian hàng được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Chuỗi sự kiện chính  | 1\. Nhân viên sàn xem danh sách gian hàng. 2\. Hệ thống hiển thị danh sách gian hàng. 3\. Nhân viên sàn tìm kiếm gian hàng. 4\. Hệ thống hiển thị kết quả tìm kiếm. 5\. Nhân viên sàn xem chi tiết gian hàng. 6\. Hệ thống hiển thị chi tiết gian hàng. 7\. Nhân viên sàn phê duyệt hoặc từ chối gian hàng đăng ký. 8\. Hệ thống cập nhật trạng thái gian hàng và thông báo cho người bán. 9\. Nhân viên sàn khóa hoặc mở gian hàng và nhập lý do khóa. 10\. Hệ thống cập nhật trạng thái gian hàng và thông báo cho người bán. |
| Ngoại lệ             | 10.1. Nhân viên sàn chưa nhập lý do khóa. 10.1.1. Hệ thống thông báo: “Vui lòng nhập lý do khóa gian hàng”.                                                                                                                                                                                                                                                                                                                                                                                                                     |

#####

**U19) Quản lý trang chủ toàn sàn**  
![][image15]

##### **_Hình 1.13. Sơ đồ ca sử dụng quản lý trang chủ toàn sàn_**

#####

###### **_Bảng 1.12. Đặc tả ca sử dụng U19 – Quản lý trang chủ toàn sàn_**

| Tên Use case         | Quản lý trang chủ toàn sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Trang chủ toàn sàn được cập nhật và xuất bản.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Chuỗi sự kiện chính  | 1\. Nhân viên sàn vào quản lý các thành phần trang chủ. 2\. Hệ thống hiển thị các thành phần của trang chủ. 3\. Nhân viên sàn thêm, sửa, xóa các banner và thiết lập thời gian hiển thị. 4\. Hệ thống cập nhật các banner. 5\. Nhân viên sàn thêm, sửa, xóa danh mục. 6\. Hệ thống cập nhật danh mục. 7\. Nhân viên sàn thêm, sửa, xóa quảng cáo và thiết lập thời gian hiển thị. 8\. Hệ thống cập nhật quảng cáo. 9\. Nhân viên sàn sắp xếp các thành phần. 10\. Hệ thống cập nhật thứ tự các thành phần. 11\. Nhân viên sàn xem trước trang chủ. 12\. Hệ thống hiển thị bản xem trước trang chủ. 13\. Nhân viên sàn xuất bản trang chủ. 14\. Hệ thống áp dụng trang chủ mới cho người dùng. |
| Ngoại lệ             | 4.1. Thời gian hiển thị không hợp lệ. 4.1.1. Hệ thống thông báo: “Thời gian hiển thị không hợp lệ”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

#####

**U21) Kiểm duyệt sản phẩm**  
![][image16]

##### **_Hình 1.14. Sơ đồ ca sử dụng kiểm duyệt sản phẩm_**

#####

###### **_Bảng 1.13. Đặc tả ca sử dụng U21 – Kiểm duyệt sản phẩm_**

| Tên Use case         | Kiểm duyệt sản phẩm                                                                                                                                                                                                                                                                                                                        |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Sản phẩm được phê duyệt hoặc từ chối.                                                                                                                                                                                                                                                                                                      |
| Chuỗi sự kiện chính  | 1\. Nhân viên sàn xem danh sách sản phẩm chờ duyệt. 2\. Hệ thống hiển thị danh sách sản phẩm chờ duyệt. 3\. Nhân viên sàn xem chi tiết sản phẩm. 4\. Hệ thống hiển thị chi tiết sản phẩm. 5\. Nhân viên sàn phê duyệt hoặc từ chối sản phẩm, nhập lý do nếu từ chối. 6\. Hệ thống cập nhật trạng thái sản phẩm và thông báo cho người bán. |
| Ngoại lệ             | 6.1. Từ chối nhưng chưa nhập lý do. 6.1.1. Hệ thống thông báo: “Vui lòng nhập lý do từ chối”.                                                                                                                                                                                                                                              |

#####

####

**U23) Quản lý tài khoản người dùng**  
![][image17]

##### **_Hình 1.15. Sơ đồ ca sử dụng quản lý tài khoản người dùng_**

###### **_Bảng 1.14. Đặc tả ca sử dụng U23 – Quản lý tài khoản người dùng_**

| Tên Use case         | Quản lý tài khoản người dùng                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                            |
| Hậu điều kiện        | Trạng thái tài khoản người dùng được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                         |
| Chuỗi sự kiện chính  | 1\. Nhân viên sàn chọn quản lý tài khoản người mua, người bán hoặc nhân viên sàn. 2\. Hệ thống hiển thị trang quản lý tài khoản tương ứng. 3\. Nhân viên sàn tìm kiếm tài khoản. 4\. Hệ thống hiển thị danh sách tài khoản. 5\. Nhân viên sàn xem chi tiết tài khoản. 6\. Hệ thống hiển thị chi tiết tài khoản. 7\. Nhân viên sàn khóa hoặc mở khóa tài khoản. 8\. Hệ thống cập nhật trạng thái tài khoản và thông báo cho người dùng. |
| Ngoại lệ             | 4.1. Không có tài khoản phù hợp. 4.1.1. Hệ thống thông báo: “Không tìm thấy tài khoản phù hợp”.                                                                                                                                                                                                                                                                                                                                        |

#####

####

#### **_b) Giai đoạn 2_**

**U6) Đánh giá sản phẩm.**  
![][image18]

##### **_Hình 1.16. Sơ đồ ca sử dụng đánh giá sản phẩm_**

###### **_Bảng 1.15. Đặc tả ca sử dụng U6 – Đánh giá sản phẩm_**

| Tên Use case         | Đánh giá sản phẩm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Người mua đã đăng nhập và có đơn hàng đã giao.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Đánh giá và phản hồi được lưu, hiển thị.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Chuỗi sự kiện chính  | 1\. Người mua chọn đánh giá sản phẩm. 2\. Hệ thống hiển thị biểu mẫu đánh giá sản phẩm. 3\. Người mua đánh giá sao, viết nhận xét và tải lên hình ảnh sản phẩm. 4\. Hệ thống lưu và hiển thị đánh giá sản phẩm. 5\. Người mua chọn đánh giá cửa hàng, đánh giá sao và viết nhận xét. 6\. Hệ thống lưu và hiển thị đánh giá cửa hàng. 7\. Người bán xem đánh giá của cửa hàng. 8\. Hệ thống hiển thị danh sách đánh giá của cửa hàng. 9\. Người bán phản hồi một đánh giá. 10\. Hệ thống lưu phản hồi và thông báo cho người mua. |
| Ngoại lệ             | 2.1. Đơn hàng đã quá thời hạn đánh giá. 2.1.1. Hệ thống thông báo: “Đơn hàng không còn trong thời hạn đánh giá”. 4.1. Người mua chưa đánh giá sao. 4.1.1. Hệ thống thông báo: “Vui lòng chọn số sao đánh giá”.                                                                                                                                                                                                                                                                                                                   |

**U8) Nhắn tin.**  
![][image19]

##### **_Hình 1.17. Sơ đồ ca sử dụng nhắn tin_**

###### **_Bảng 1.16. Đặc tả ca sử dụng U8 – Nhắn tin_**

| Tên Use case         | Nhắn tin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Người mua và người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Tin nhắn được gửi và nhận giữa hai bên.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Chuỗi sự kiện chính  | 1\. Người mua chọn chat với người bán và gửi tin nhắn. 2\. Hệ thống gửi tin nhắn tới người bán. 3\. Người bán xem danh sách cuộc trò chuyện. 4\. Hệ thống hiển thị danh sách cuộc trò chuyện. 5\. Người bán mở cuộc trò chuyện và trả lời. 6\. Hệ thống gửi tin trả lời tới người mua. 7\. Người mua xem danh sách cuộc trò chuyện và mở cuộc trò chuyện. 8\. Hệ thống hiển thị nội dung cuộc trò chuyện. 9\. Người bán cài đặt tin nhắn phản hồi tự động. 10\. Hệ thống lưu tin nhắn phản hồi tự động. |
| Ngoại lệ             | 2.1. Mất kết nối khi gửi tin nhắn. 2.1.1. Hệ thống thông báo: “Gửi tin nhắn thất bại, vui lòng thử lại”.                                                                                                                                                                                                                                                                                                                                                                                                |

**U13) Quản lý danh mục sản phẩm.**  
![][image20]

##### **_Hình 1.18. Sơ đồ ca sử dụng quản lý danh mục sản phẩm_**

###### **_Bảng 1.17. Đặc tả ca sử dụng U13 – Quản lý danh mục sản phẩm_**

| Tên Use case         | Quản lý danh mục sản phẩm                                                                                                                                                                                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                  |
| Hậu điều kiện        | Danh mục sản phẩm được cập nhật.                                                                                                                                                                                                                                         |
| Chuỗi sự kiện chính  | 1\. Người bán xem danh sách danh mục. 2\. Hệ thống hiển thị danh sách danh mục. 3\. Người bán thêm danh mục. 4\. Hệ thống lưu danh mục mới. 5\. Người bán sửa danh mục. 6\. Hệ thống lưu thay đổi. 7\. Người bán xóa danh mục. 8\. Hệ thống xóa danh mục khỏi danh sách. |
| Ngoại lệ             | 4.1. Tên danh mục trống hoặc đã tồn tại. 4.1.1. Hệ thống thông báo: “Tên danh mục không hợp lệ”.                                                                                                                                                                         |

**U15) Theo dõi doanh thu và thống kê bán hàng.**  
![][image21]

##### **_Hình 1.19. Sơ đồ ca sử dụng theo dõi doanh thu và thống kê bán hàng_**

###### **_Bảng 1.18. Đặc tả ca sử dụng U15 – Theo dõi doanh thu và thống kê bán hàng_**

| Tên Use case         | Theo dõi doanh thu và thống kê bán hàng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Người bán xem được báo cáo kinh doanh.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Chuỗi sự kiện chính  | 1\. Người bán xem báo cáo kinh doanh. 2\. Hệ thống hiển thị báo cáo kinh doanh. 3\. Người bán lọc theo mốc thời gian. 4\. Hệ thống cập nhật báo cáo theo mốc thời gian. 5\. Người bán xem báo cáo tài chính. 6\. Hệ thống hiển thị báo cáo tài chính. 7\. Người bán xem báo cáo vận hành. 8\. Hệ thống hiển thị báo cáo vận hành. 9\. Người bán xem báo cáo tăng trưởng. 10\. Hệ thống hiển thị báo cáo tăng trưởng. 11\. Người bán xem top 5 sản phẩm. 12\. Hệ thống hiển thị top 5 sản phẩm. 13\. Người bán xuất báo cáo ra Excel. 14\. Hệ thống tạo và tải về tệp Excel. |
| Ngoại lệ             | 4.1. Khoảng thời gian không hợp lệ. 4.1.1. Hệ thống thông báo: “Khoảng thời gian không hợp lệ, vui lòng chọn lại”.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

**U18) Thống kê và giám sát hoạt động toàn sàn.**  
![][image22]

##### **_Hình 1.20. Sơ đồ ca sử dụng thống kê và giám sát hoạt động toàn sàn_**

###### **_Bảng 1.19. Đặc tả ca sử dụng U18 – Thống kê và giám sát hoạt động toàn sàn_**

| Tên Use case         | Thống kê và giám sát hoạt động toàn sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Nhân viên sàn xem được thống kê toàn sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Chuỗi sự kiện chính  | 1\. Nhân viên sàn xem thống kê sàn. 2\. Hệ thống hiển thị thống kê sàn. 3\. Nhân viên sàn lọc theo mốc thời gian. 4\. Hệ thống cập nhật thống kê theo mốc thời gian. 5\. Nhân viên sàn xem thống kê tài chính. 6\. Hệ thống hiển thị thống kê tài chính. 7\. Nhân viên sàn xem thống kê vận hành. 8\. Hệ thống hiển thị thống kê vận hành. 9\. Nhân viên sàn xem thống kê tăng trưởng. 10\. Hệ thống hiển thị thống kê tăng trưởng. 11\. Nhân viên sàn xem xếp hạng sản phẩm và cửa hàng. 12\. Hệ thống hiển thị xếp hạng sản phẩm và cửa hàng. |
| Ngoại lệ             | 4.1. Khoảng thời gian không hợp lệ. 4.1.1. Hệ thống thông báo: “Khoảng thời gian không hợp lệ, vui lòng chọn lại”.                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### **_c) Giai đoạn 3_**

**U22) Gửi khiếu nại, báo cáo**  
**![][image23]**

##### **_Hình 1.21. Sơ đồ ca sử dụng gửi khiếu nại, báo cáo_**

#####

###### **_Bảng 1.20. Đặc tả ca sử dụng U22 – Gửi khiếu nại, báo cáo_**

| Tên Use case         | Gửi khiếu nại, báo cáo                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Người dùng đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Hậu điều kiện        | Khiếu nại, báo cáo được gửi tới sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Chuỗi sự kiện chính  | 1\. Người dùng vào gửi khiếu nại, báo cáo. 2\. Hệ thống hiển thị biểu mẫu khiếu nại, báo cáo. 3\. Người dùng báo cáo người dùng, báo cáo sản phẩm hoặc báo cáo gian hàng. 4\. Hệ thống ghi nhận báo cáo. 5\. Người dùng gửi khiếu nại. 6\. Hệ thống ghi nhận khiếu nại. 7\. Người dùng bổ sung thông tin khiếu nại, báo cáo. 8\. Hệ thống cập nhật thông tin khiếu nại, báo cáo. 9\. Người dùng xem lịch sử khiếu nại, báo cáo. 10\. Hệ thống hiển thị lịch sử khiếu nại, báo cáo. |
| Ngoại lệ             | 4.1. Đã có báo cáo chờ xử lý cho cùng đối tượng. 4.1.1. Hệ thống thông báo: “Bạn đã báo cáo đối tượng này, vui lòng chờ kết quả xử lý”.                                                                                                                                                                                                                                                                                                                                            |

#####

**U7) Quản lý ví điện tử**  
**![][image24]**

##### **_Hình 1.22. Sơ đồ ca sử dụng quản lý ví điện tử_**

#####

###### **_Bảng 1.21. Đặc tả ca sử dụng U7 – Quản lý ví điện tử_**

| Tên Use case         | Quản lý ví điện tử                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Người dùng đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Thông tin và số dư ví được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Chuỗi sự kiện chính  | 1\. Người dùng mở quản lý ví điện tử và xem số dư ví. 2\. Hệ thống hiển thị số dư ví. 3\. Người dùng xem lịch sử giao dịch. 4\. Hệ thống hiển thị lịch sử giao dịch. 5\. Người dùng thiết lập OTP cho ví. 6\. Hệ thống lưu thiết lập OTP. 7\. Người dùng liên kết tài khoản ngân hàng. 8\. Hệ thống lưu liên kết tài khoản ngân hàng. 9\. Người dùng nạp tiền vào ví bằng quét QR hoặc chuyển vào tài khoản hệ thống. 10\. Hệ thống cộng tiền vào số dư ví. 11\. Người dùng rút tiền khỏi ví và nhập OTP. 12\. Hệ thống chuyển tiền về tài khoản ngân hàng đã liên kết. |
| Ngoại lệ             | 12.1. OTP không đúng. 12.1.1. Hệ thống thông báo: “Mã OTP không đúng”. 12.2. Số dư không đủ. 12.2.1. Hệ thống thông báo: “Số dư ví không đủ để rút”.                                                                                                                                                                                                                                                                                                                                                                                                                    |

#####

**U16) Áp dụng các chính sách marketing.**  
![][image25]

##### **_Hình 1.23. Sơ đồ ca sử dụng áp dụng chính sách marketing_**

#####

###### **_Bảng 1.22. Đặc tả ca sử dụng U16 – Áp dụng các chính sách marketing_**

| Tên Use case         | Áp dụng các chính sách marketing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Hậu điều kiện        | Chương trình marketing được tạo và áp dụng.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Chuỗi sự kiện chính  | 1\. Người bán vào áp dụng các chính sách marketing. 2\. Hệ thống hiển thị các công cụ marketing. 3\. Người bán quản lý voucher. 4\. Hệ thống lưu voucher. 5\. Người bán thiết lập livestream. 6\. Hệ thống tạo phiên livestream. 7\. Người bán gắn link sản phẩm vào livestream. 8\. Hệ thống hiển thị sản phẩm trong livestream. 9\. Người bán quản lý nội dung livestream. 10\. Hệ thống cập nhật nội dung livestream. 11\. Người bán quản lý bài viết. 12\. Hệ thống lưu và hiển thị bài viết. 13\. Người bán theo dõi hiệu quả marketing. 14\. Hệ thống hiển thị hiệu quả marketing. |
| Ngoại lệ             | 12.1. Video trong bài viết không đúng định dạng hoặc dung lượng. 12.1.1. Hệ thống thông báo: “Video không hợp lệ”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

#####

### **1.2.4. Xây dựng kịch bản**

#### **_a) Giai đoạn 1_**

###### **_Bảng 1.23. Kịch bản xem trang chủ_**

| Tên Use case         | Xem trang chủ                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                         |
| Điều kiện tiên quyết | Người mua đã truy cập vào sàn.                                                                                                                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Người mua xem được danh sách sản phẩm nổi bật và sản phẩm gợi ý.                                                                                                                                                                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người mua truy cập trang chủ của sàn. 2\. Hệ thống hiển thị ô tìm kiếm và danh sách sản phẩm nổi bật, mỗi trang 30 sản phẩm. 3\. Người mua cuộn xuống mục “Gợi ý cho bạn”. 4\. Hệ thống hiển thị các sản phẩm được gợi ý theo lịch sử xem, tìm kiếm và mua hàng của người mua. 5\. Người mua chuyển sang trang tiếp theo của danh sách sản phẩm. 6\. Hệ thống hiển thị 30 sản phẩm tiếp theo. |
| Ngoại lệ             | 4.1. Thuật toán gợi ý theo đồ thị gặp sự cố. 4.1.1. Hệ thống tính điểm tương thích theo thuộc tính tĩnh của sản phẩm và hiển thị danh sách gợi ý thay thế.                                                                                                                                                                                                                                        |

###### **_Bảng 1.24. Kịch bản tìm kiếm sản phẩm_**

| Tên Use case         | Tìm kiếm sản phẩm                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người mua đang ở trang chủ hoặc trang bất kỳ có ô tìm kiếm.                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Người mua xem được danh sách sản phẩm và cửa hàng khớp với từ khóa.                                                                                                                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người mua nhập từ khóa “sofa” vào ô tìm kiếm. 2\. Hệ thống hiển thị danh sách từ khóa gợi ý phổ biến bắt đầu bằng “sofa”. 3\. Người mua chọn từ khóa gợi ý “sofa da” hoặc nhấn nút tìm kiếm. 4\. Hệ thống hiển thị danh sách sản phẩm và cửa hàng khớp với từ khóa; mỗi thẻ gồm ảnh, tên, giá bán, số lượng đã bán và số sao đánh giá. |
| Ngoại lệ             | 4.1. Không có sản phẩm nào khớp với từ khóa. 4.1.1. Hệ thống thông báo “Không tìm thấy sản phẩm phù hợp” và hiển thị các sản phẩm thay thế.                                                                                                                                                                                                |

###### **_Bảng 1.25. Kịch bản lọc và sắp xếp kết quả tìm kiếm_**

| Tên Use case         | Lọc và sắp xếp kết quả tìm kiếm                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Hệ thống đang hiển thị danh sách kết quả tìm kiếm.                                                                                                                                                                                                                                                                                                                                                        |
| Hậu điều kiện        | Danh sách kết quả được lọc và sắp xếp theo lựa chọn của người mua.                                                                                                                                                                                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người mua nhập khoảng giá từ 2.000.000đ đến 5.000.000đ và nhấn “Áp dụng”. 2\. Hệ thống hiển thị các sản phẩm có giá nằm trong khoảng đã chọn. 3\. Người mua chọn tỉnh/thành phố của cửa hàng là “Hà Nội”. 4\. Hệ thống hiển thị các sản phẩm thuộc cửa hàng ở Hà Nội trong khoảng giá đã chọn. 5\. Người mua chọn sắp xếp theo giá “Thấp nhất”. 6\. Hệ thống sắp xếp lại danh sách theo giá tăng dần. |
| Ngoại lệ             | 2.1. Giá “từ” lớn hơn giá “đến”. 2.1.1. Hệ thống thông báo “Khoảng giá không hợp lệ” và giữ nguyên danh sách. 4.1. Không có sản phẩm nào thỏa mãn điều kiện lọc. 4.1.1. Hệ thống thông báo “Không tìm thấy sản phẩm phù hợp”.                                                                                                                                                                             |

###### **_Bảng 1.26. Kịch bản xem trang cửa hàng_**

| Tên Use case         | Xem trang cửa hàng                                                                                                                                                                                                                                                             |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Người mua đang xem kết quả tìm kiếm hoặc trang chi tiết sản phẩm.                                                                                                                                                                                                              |
| Hậu điều kiện        | Người mua xem được trang cửa hàng.                                                                                                                                                                                                                                             |
| Kịch bản chính       | 1\. Người mua nhấn vào tên hoặc ảnh đại diện của cửa hàng. 2\. Hệ thống hiển thị trang cửa hàng gồm tên, đánh giá cửa hàng, danh sách danh mục và danh sách sản phẩm. 3\. Người mua chọn một danh mục của cửa hàng. 4\. Hệ thống hiển thị các sản phẩm thuộc danh mục đã chọn. |
| Ngoại lệ             | 2.1. Cửa hàng đang bị khóa hoặc ngừng hoạt động. 2.1.1. Hệ thống thông báo “Cửa hàng hiện không hoạt động”.                                                                                                                                                                    |

###### **_Bảng 1.27. Kịch bản xem thông tin chi tiết sản phẩm_**

| Tên Use case         | Xem thông tin chi tiết sản phẩm                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người mua đang xem danh sách sản phẩm.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Hậu điều kiện        | Người mua xem được đầy đủ thông tin của sản phẩm.                                                                                                                                                                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người mua chọn sản phẩm “Sofa da 3 chỗ” trong danh sách. 2\. Hệ thống hiển thị trang chi tiết gồm bộ ảnh, tên, các biến thể, giá, thông tin tóm tắt của cửa hàng. 3\. Người mua nhấn vào một ảnh trong bộ ảnh sản phẩm. 4\. Hệ thống phóng to ảnh và cho phép chuyển qua các ảnh còn lại. 5\. Người mua chọn mục “Mô tả và thông số kỹ thuật”. 6\. Hệ thống hiển thị mô tả chi tiết và thông số kỹ thuật (kích thước, chất liệu, màu sắc) của sản phẩm. |
| Ngoại lệ             | 2.1. Sản phẩm đã ngừng kinh doanh. 2.1.1. Hệ thống vẫn hiển thị thông tin sản phẩm nhưng khóa các nút “Thêm vào giỏ hàng” và “Mua ngay”.                                                                                                                                                                                                                                                                                                                    |

###### **_Bảng 1.28. Kịch bản xem đánh giá sản phẩm_**

| Tên Use case         | Xem đánh giá sản phẩm                                                                                                                                                                                                                                        |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Người mua đang ở trang chi tiết sản phẩm.                                                                                                                                                                                                                    |
| Hậu điều kiện        | Người mua xem được các đánh giá của sản phẩm.                                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người mua chọn mục “Đánh giá sản phẩm”. 2\. Hệ thống hiển thị điểm sao trung bình và danh sách đánh giá gồm số sao, nhận xét, hình ảnh và phản hồi của người bán. 3\. Người mua lọc đánh giá theo mức “5 sao”. 4\. Hệ thống hiển thị các đánh giá 5 sao. |
| Ngoại lệ             | 2.1. Sản phẩm chưa có đánh giá nào. 2.1.1. Hệ thống thông báo “Sản phẩm chưa có đánh giá”.                                                                                                                                                                   |

###### **_Bảng 1.29. Kịch bản chọn biến thể và số lượng_**

| Tên Use case         | Chọn biến thể và số lượng                                                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Người mua đang ở trang chi tiết sản phẩm.                                                                                                                                                                                                                |
| Hậu điều kiện        | Biến thể và số lượng được chọn, sẵn sàng thêm vào giỏ hàng hoặc mua ngay.                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người mua chọn biến thể màu “Nâu”, kích thước “2m”. 2\. Hệ thống cập nhật giá bán, ảnh và số lượng tồn kho của biến thể đã chọn. 3\. Người mua nhập số lượng là 2\. 4\. Hệ thống cập nhật số lượng và tạm tính thành tiền.                           |
| Ngoại lệ             | 2.1. Biến thể đã chọn hết hàng. 2.1.1. Hệ thống làm mờ biến thể và thông báo “Sản phẩm đã hết hàng”. 4.1. Số lượng vượt quá tồn kho của biến thể. 4.1.1. Hệ thống thông báo “Số lượng vượt quá tồn kho hiện có” và đặt lại số lượng bằng tồn kho tối đa. |

###### **_Bảng 1.30. Kịch bản thêm vào giỏ hàng_**

| Tên Use case         | Thêm vào giỏ hàng                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đã chọn biến thể, số lượng tại trang chi tiết sản phẩm.                                                                                                                                     |
| Hậu điều kiện        | Sản phẩm được thêm vào giỏ hàng.                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người mua nhấn “Thêm vào giỏ hàng”. 2\. Hệ thống thêm sản phẩm vào giỏ hàng, cộng dồn nếu sản phẩm cùng biến thể đã có, cập nhật số lượng trên biểu tượng giỏ hàng và thông báo “Đã thêm vào giỏ hàng”.           |
| Ngoại lệ             | 2.1. Người mua chưa đăng nhập. 2.1.1. Hệ thống thông báo “Vui lòng đăng nhập để tiếp tục” và chuyển tới trang đăng nhập. 2.2. Người mua chưa chọn biến thể. 2.2.1. Hệ thống thông báo “Vui lòng chọn phân loại hàng”. |

###### **_Bảng 1.31. Kịch bản mua ngay_**

| Tên Use case         | Mua ngay                                                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đã chọn biến thể, số lượng tại trang chi tiết sản phẩm.                                                         |
| Hậu điều kiện        | Sản phẩm được thêm vào giỏ hàng ở trạng thái được chọn.                                                                                   |
| Kịch bản chính       | 1\. Người mua nhấn “Mua ngay”. 2\. Hệ thống thêm sản phẩm vào giỏ hàng, chuyển tới trang giỏ hàng và đánh dấu chọn sẵn sản phẩm vừa thêm. |
| Ngoại lệ             | 2.1. Người mua chưa đăng nhập. 2.1.1. Hệ thống thông báo “Vui lòng đăng nhập để tiếp tục” và chuyển tới trang đăng nhập.                  |

###### **_Bảng 1.32. Kịch bản xem giỏ hàng và cập nhật số lượng_**

| Tên Use case         | Xem giỏ hàng và cập nhật số lượng                                                                                                                                                                                                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Số lượng sản phẩm trong giỏ hàng được cập nhật.                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người mua nhấn biểu tượng giỏ hàng trên thanh điều hướng. 2\. Hệ thống hiển thị danh sách sản phẩm theo từng cửa hàng gồm ảnh, tên, phân loại, đơn giá, số lượng và tạm tính. 3\. Người mua tăng số lượng của “Sofa da 3 chỗ” từ 1 lên 2\. 4\. Hệ thống cập nhật số lượng và thành tiền của sản phẩm. |
| Ngoại lệ             | 2.1. Giỏ hàng chưa có sản phẩm. 2.1.1. Hệ thống thông báo “Giỏ hàng của bạn đang trống”. 4.1. Số lượng vượt quá tồn kho. 4.1.1. Hệ thống thông báo “Số lượng vượt quá tồn kho hiện có”.                                                                                                                   |

###### **_Bảng 1.33. Kịch bản sửa phân loại sản phẩm_**

| Tên Use case         | Sửa phân loại sản phẩm                                                                                                                                                                                                                                                                               |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Giỏ hàng có ít nhất một sản phẩm.                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Phân loại của sản phẩm trong giỏ hàng được cập nhật.                                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người mua nhấn vào sản phẩm trong giỏ hàng. 2\. Hệ thống chuyển tới trang chi tiết sản phẩm với phân loại đang có trong giỏ hàng được chọn sẵn. 3\. Người mua đổi sang màu “Xám” và nhấn “Lưu”. 4\. Hệ thống cập nhật phân loại, đơn giá của sản phẩm trong giỏ hàng và quay lại trang giỏ hàng. |
| Ngoại lệ             | 4.1. Phân loại mới đã hết hàng. 4.1.1. Hệ thống thông báo “Sản phẩm đã hết hàng” và giữ nguyên phân loại cũ.                                                                                                                                                                                         |

###### **_Bảng 1.34. Kịch bản xóa sản phẩm khỏi giỏ hàng_**

| Tên Use case         | Xóa sản phẩm khỏi giỏ hàng                                                                                                                                                                                                                                                                                   |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Giỏ hàng có ít nhất một sản phẩm.                                                                                                                                                                                                                                                                            |
| Hậu điều kiện        | Các sản phẩm được chọn bị xóa khỏi giỏ hàng.                                                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người mua nhấn “Xóa” tại một sản phẩm. 2\. Hệ thống hiển thị hộp thoại xác nhận xóa. 3\. Người mua nhấn “Đồng ý”. 4\. Hệ thống xóa sản phẩm và cập nhật lại giỏ hàng. 5\. Người mua chọn nhiều sản phẩm cùng một cửa hàng và nhấn “Xóa”. 6\. Hệ thống xóa các sản phẩm đã chọn và cập nhật lại giỏ hàng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                                    |

###### **_Bảng 1.35. Kịch bản chọn sản phẩm và đặt hàng_**

| Tên Use case         | Chọn sản phẩm và đặt hàng                                                                                                                                                                                                            |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Giỏ hàng có ít nhất một sản phẩm khả dụng.                                                                                                                                                                                           |
| Hậu điều kiện        | Các sản phẩm được chọn được chuyển sang trang đặt hàng.                                                                                                                                                                              |
| Kịch bản chính       | 1\. Người mua tích chọn các sản phẩm cần mua. 2\. Hệ thống tính lại tổng tiền của các sản phẩm được chọn. 3\. Người mua nhấn “Đặt hàng”. 4\. Hệ thống chuyển các sản phẩm được chọn sang trang đặt hàng.                             |
| Ngoại lệ             | 2.1. Sản phẩm không khả dụng (hết hàng, ngừng kinh doanh, cửa hàng đóng cửa). 2.1.1. Hệ thống vô hiệu hóa ô chọn của sản phẩm đó. 4.1. Người mua chưa chọn sản phẩm nào. 4.1.1. Hệ thống thông báo “Vui lòng chọn sản phẩm cần mua”. |

###### **_Bảng 1.36. Kịch bản đăng ký tài khoản_**

| Tên Use case         | Đăng ký tài khoản                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Người mua chưa có tài khoản trên sàn.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Hậu điều kiện        | Tài khoản người mua được tạo.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người mua chọn “Đăng ký” và nhập email “an.nguyen@gmail.com”. 2\. Hệ thống kiểm tra email, tạo mật khẩu tạm thời 8 ký tự, gửi tới email và hiển thị ô nhập mật khẩu tạm thời. 3\. Người mua nhấn “Gửi lại” vì chưa nhận được email. 4\. Hệ thống tạo mật khẩu tạm thời mới, hủy mật khẩu cũ và gửi lại tới email. 5\. Người mua nhập mật khẩu tạm thời nhận được và nhấn “Xác nhận”. 6\. Hệ thống xác thực mật khẩu tạm thời, tạo tài khoản và chuyển tới trang đăng nhập. |
| Ngoại lệ             | 2.1. Email sai định dạng hoặc đã được đăng ký. 2.1.1. Hệ thống thông báo “Email không hợp lệ hoặc đã tồn tại”. 4.1. Chưa đủ 60 giây kể từ lần gửi trước. 4.1.1. Hệ thống khóa nút “Gửi lại” và hiển thị thời gian chờ còn lại. 6.1. Mật khẩu tạm thời sai hoặc đã quá 24 giờ. 6.1.1. Hệ thống thông báo “Mật khẩu tạm thời không đúng hoặc đã hết hạn”.                                                                                                                        |

###### **_Bảng 1.37. Kịch bản đăng nhập_**

| Tên Use case         | Đăng nhập                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Điều kiện tiên quyết | Người mua đã có tài khoản.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Người mua đăng nhập thành công và vào trang chủ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Kịch bản chính       | 1\. Người mua nhập email, mật khẩu và nhấn “Đăng nhập”. 2\. Hệ thống xác thực thông tin; vì đây là lần đăng nhập đầu tiên nên chuyển tới trang đổi mật khẩu lần đầu. 3\. Người mua nhập mật khẩu mới và nhập lại mật khẩu mới. 4\. Hệ thống kiểm tra theo thời gian thực các tiêu chí mật khẩu (8–16 ký tự, chữ hoa, chữ thường, chữ số, ký tự đặc biệt), tô xanh tiêu chí đạt và kích hoạt nút “Hoàn tất” khi hai mật khẩu trùng khớp. 5\. Người mua nhấn “Hoàn tất”. 6\. Hệ thống lưu mật khẩu mới và chuyển tới trang chủ. |
| Ngoại lệ             | 2.1. Email hoặc mật khẩu không đúng. 2.1.1. Hệ thống thông báo “Email hoặc mật khẩu không đúng”. 4.1. Mật khẩu mới chưa đạt tiêu chí hoặc hai mật khẩu không khớp. 4.1.1. Hệ thống tô đỏ tiêu chí chưa đạt và giữ nút “Hoàn tất” ở trạng thái vô hiệu.                                                                                                                                                                                                                                                                        |

###### **_Bảng 1.38. Kịch bản quên mật khẩu_**

| Tên Use case         | Quên mật khẩu                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Người mua đã có tài khoản và đang ở trang đăng nhập.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Mật khẩu của người mua được đặt lại.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Kịch bản chính       | 1\. Người mua chọn “Quên mật khẩu” và nhập email đã đăng ký. 2\. Hệ thống gửi mã OTP 6 chữ số tới email và hiển thị biểu mẫu gồm OTP, mật khẩu mới và xác nhận mật khẩu mới. 3\. Người mua nhấn “Gửi lại OTP” vì chưa nhận được email. 4\. Hệ thống gửi mã OTP mới tới email. 5\. Người mua nhập OTP, mật khẩu mới, xác nhận mật khẩu mới và nhấn “Đặt lại mật khẩu”. 6\. Hệ thống đối chiếu OTP, cập nhật mật khẩu mới và chuyển tới trang đăng nhập. |
| Ngoại lệ             | 2.1. Email chưa được đăng ký. 2.1.1. Hệ thống thông báo “Email không tồn tại trong hệ thống”. 4.1. Chưa đủ 60 giây kể từ lần gửi trước. 4.1.1. Hệ thống khóa nút “Gửi lại OTP” và hiển thị thời gian chờ còn lại. 6.1. OTP sai hoặc đã quá 15 phút. 6.1.1. Hệ thống thông báo “Mã OTP không đúng hoặc đã hết hạn”.                                                                                                                                     |

###### **_Bảng 1.39. Kịch bản cập nhật hồ sơ cá nhân_**

| Tên Use case         | Cập nhật hồ sơ cá nhân                                                                                                                                                                                                                                                                                                                                    |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Hồ sơ cá nhân của người mua được cập nhật.                                                                                                                                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người mua vào “Tài khoản của tôi” và chọn mục “Hồ sơ cá nhân”. 2\. Hệ thống hiển thị tên người dùng, giới tính, ngày sinh và số điện thoại. 3\. Người mua sửa tên, chọn giới tính “Nữ”, ngày sinh 15/08/2002, số điện thoại 0912345678 và nhấn “Lưu”. 4\. Hệ thống kiểm tra các trường thông tin, lưu hồ sơ và thông báo “Cập nhật hồ sơ thành công”. |
| Ngoại lệ             | 4.1. Tên trống hoặc quá 64 ký tự, ngày sinh không nhỏ hơn ngày hiện tại, hoặc số điện thoại không gồm 10 chữ số bắt đầu bằng 0\. 4.1.1. Hệ thống cảnh báo tại trường không hợp lệ và không lưu hồ sơ.                                                                                                                                                     |

###### **_Bảng 1.40. Kịch bản thêm địa chỉ_**

| Tên Use case         | Thêm địa chỉ                                                                                                                                                                                                                                                                               |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Địa chỉ mới được thêm vào sổ địa chỉ.                                                                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người mua vào mục “Sổ địa chỉ” và nhấn “Thêm địa chỉ mới”. 2\. Hệ thống hiển thị biểu mẫu gồm họ tên, số điện thoại người nhận, tỉnh/thành phố, phường/xã và địa chỉ chi tiết. 3\. Người mua nhập đầy đủ thông tin và nhấn “Lưu”. 4\. Hệ thống lưu địa chỉ và hiển thị lại sổ địa chỉ. |
| Ngoại lệ             | 2.1. Sổ địa chỉ đã có 10 địa chỉ. 2.1.1. Hệ thống thông báo “Bạn chỉ được lưu tối đa 10 địa chỉ”. 4.1. Thiếu thông tin bắt buộc hoặc số điện thoại không hợp lệ. 4.1.1. Hệ thống cảnh báo tại trường không hợp lệ và không lưu địa chỉ.                                                    |

###### **_Bảng 1.41. Kịch bản sửa địa chỉ_**

| Tên Use case         | Sửa địa chỉ                                                                                                                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Sổ địa chỉ có ít nhất một địa chỉ.                                                                                                                                                                                    |
| Hậu điều kiện        | Địa chỉ được cập nhật.                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người mua nhấn “Sửa” tại một địa chỉ. 2\. Hệ thống hiển thị biểu mẫu chứa thông tin hiện tại của địa chỉ. 3\. Người mua sửa địa chỉ chi tiết và nhấn “Lưu”. 4\. Hệ thống lưu thay đổi và hiển thị lại sổ địa chỉ. |
| Ngoại lệ             | 4.1. Thiếu thông tin bắt buộc hoặc số điện thoại không hợp lệ. 4.1.1. Hệ thống cảnh báo tại trường không hợp lệ và không lưu thay đổi.                                                                                |

###### **_Bảng 1.42. Kịch bản xóa địa chỉ_**

| Tên Use case         | Xóa địa chỉ                                                                                                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                 |
| Điều kiện tiên quyết | Sổ địa chỉ có ít nhất hai địa chỉ.                                                                                                                                        |
| Hậu điều kiện        | Địa chỉ bị xóa khỏi sổ địa chỉ.                                                                                                                                           |
| Kịch bản chính       | 1\. Người mua nhấn “Xóa” tại một địa chỉ. 2\. Hệ thống hiển thị hộp thoại xác nhận xóa. 3\. Người mua nhấn “Đồng ý”. 4\. Hệ thống xóa địa chỉ và hiển thị lại sổ địa chỉ. |
| Ngoại lệ             | 2.1. Sổ địa chỉ chỉ còn một địa chỉ. 2.1.1. Hệ thống thông báo “Không thể xóa địa chỉ duy nhất”.                                                                          |

###### **_Bảng 1.43. Kịch bản đặt địa chỉ mặc định_**

| Tên Use case         | Đặt địa chỉ mặc định                                                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                             |
| Điều kiện tiên quyết | Sổ địa chỉ có ít nhất một địa chỉ.                                                                                                                    |
| Hậu điều kiện        | Địa chỉ được chọn trở thành địa chỉ mặc định.                                                                                                         |
| Kịch bản chính       | 1\. Người mua nhấn “Đặt làm mặc định” tại một địa chỉ. 2\. Hệ thống đặt địa chỉ đó làm mặc định, bỏ mặc định ở địa chỉ cũ và hiển thị lại sổ địa chỉ. |
| Ngoại lệ             | Không có.                                                                                                                                             |

###### **_Bảng 1.44. Kịch bản đổi mật khẩu_**

| Tên Use case         | Đổi mật khẩu                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                         |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                                           |
| Hậu điều kiện        | Mật khẩu của người mua được thay đổi.                                                                                                                                                                                                                                                                                             |
| Kịch bản chính       | 1\. Người mua vào mục “Bảo mật” và chọn “Đổi mật khẩu”. 2\. Hệ thống hiển thị biểu mẫu gồm mật khẩu hiện tại, mật khẩu mới, nhập lại mật khẩu mới và các tiêu chí mật khẩu. 3\. Người mua nhập đủ ba trường và nhấn “Lưu”. 4\. Hệ thống kiểm tra mật khẩu hiện tại, cập nhật mật khẩu mới và thông báo “Đổi mật khẩu thành công”. |
| Ngoại lệ             | 4.1. Mật khẩu hiện tại không đúng. 4.1.1. Hệ thống thông báo “Mật khẩu hiện tại không đúng”. 4.2. Mật khẩu mới trùng mật khẩu đang dùng. 4.2.1. Hệ thống thông báo “Mật khẩu mới không được trùng mật khẩu hiện tại”.                                                                                                             |

###### **_Bảng 1.45. Kịch bản đăng xuất_**

| Tên Use case         | Đăng xuất                                                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                   |
| Hậu điều kiện        | Phiên đăng nhập của người mua kết thúc.                                                                                                   |
| Kịch bản chính       | 1\. Người mua chọn “Đăng xuất” trong menu tài khoản. 2\. Hệ thống hủy phiên đăng nhập và chuyển về trang chủ ở trạng thái chưa đăng nhập. |
| Ngoại lệ             | Không có.                                                                                                                                 |

###### **_Bảng 1.46. Kịch bản đặt hàng_**

| Tên Use case         | Đặt hàng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đã chọn sản phẩm trong giỏ hàng.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Hậu điều kiện        | Đơn hàng được tạo và chuyển sang bước thanh toán.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người mua nhấn “Đặt hàng” tại giỏ hàng. 2\. Hệ thống hiển thị trang đặt hàng gồm sản phẩm theo từng cửa hàng, địa chỉ mặc định, phương thức thanh toán và tổng tiền tạm tính. 3\. Người mua chọn phương thức thanh toán. 4\. Hệ thống ghi nhận phương thức thanh toán và cập nhật tổng tiền. 5\. Người mua nhấn “Xác nhận đặt hàng”. 6\. Hệ thống kiểm tra lại tồn kho, mã giảm giá và giá tiền, tạo đơn hàng, giữ số lượng tồn kho và tạo giao dịch thanh toán ở trạng thái chờ xử lý. |
| Ngoại lệ             | 6.1. Sản phẩm hết hàng hoặc không đủ số lượng. 6.1.1. Hệ thống thông báo “Sản phẩm này hiện đang hết hàng/không đủ số lượng bạn yêu cầu, vui lòng thử lại sau”.                                                                                                                                                                                                                                                                                                                             |

###### **_Bảng 1.47. Kịch bản chọn địa chỉ nhận hàng_**

| Tên Use case         | Chọn địa chỉ nhận hàng                                                                                                                                                                                                      |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người mua đang ở trang đặt hàng.                                                                                                                                                                                            |
| Hậu điều kiện        | Đơn hàng có địa chỉ nhận hàng.                                                                                                                                                                                              |
| Kịch bản chính       | 1\. Người mua nhấn “Thay đổi” tại mục địa chỉ nhận hàng. 2\. Hệ thống hiển thị danh sách địa chỉ trong sổ địa chỉ. 3\. Người mua chọn một địa chỉ khác và nhấn “Xác nhận”. 4\. Hệ thống cập nhật địa chỉ nhận hàng cho đơn. |
| Ngoại lệ             | 2.1. Sổ địa chỉ trống. 2.1.1. Hệ thống hiển thị biểu mẫu thêm địa chỉ mới và yêu cầu người mua thêm ít nhất một địa chỉ.                                                                                                    |

###### **_Bảng 1.48. Kịch bản thêm địa chỉ nhận hàng mới_**

| Tên Use case         | Thêm địa chỉ nhận hàng mới                                                                                                                                                                                                          |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Người mua đang ở trang đặt hàng.                                                                                                                                                                                                    |
| Hậu điều kiện        | Địa chỉ mới được lưu và chọn cho đơn hàng.                                                                                                                                                                                          |
| Kịch bản chính       | 1\. Người mua nhấn “Thêm địa chỉ mới” trong danh sách địa chỉ. 2\. Hệ thống hiển thị biểu mẫu địa chỉ. 3\. Người mua nhập đầy đủ thông tin và nhấn “Lưu”. 4\. Hệ thống lưu địa chỉ vào sổ địa chỉ và chọn địa chỉ này cho đơn hàng. |
| Ngoại lệ             | 4.1. Thiếu thông tin bắt buộc hoặc số điện thoại không hợp lệ. 4.1.1. Hệ thống cảnh báo tại trường không hợp lệ và không lưu địa chỉ.                                                                                               |

###### **_Bảng 1.49. Kịch bản áp dụng mã giảm giá cửa hàng_**

| Tên Use case         | Áp dụng mã giảm giá cửa hàng                                                                                                                                                                                                                                              |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Người mua đang ở trang đặt hàng.                                                                                                                                                                                                                                          |
| Hậu điều kiện        | Mã giảm giá được áp dụng và tổng tiền được cập nhật.                                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người mua nhấn “Chọn mã giảm giá” tại một cửa hàng. 2\. Hệ thống hiển thị các mã giảm giá của cửa hàng, khóa các mã không đủ điều kiện. 3\. Người mua chọn mã “GIAM10” và nhấn “Áp dụng”. 4\. Hệ thống áp dụng mã cho phần đơn của cửa hàng đó và cập nhật tổng tiền. |
| Ngoại lệ             | 4.1. Mã giảm giá không đủ điều kiện. 4.1.1. Hệ thống thông báo “Mã giảm giá không áp dụng được cho đơn hàng này”.                                                                                                                                                         |

###### **_Bảng 1.50. Kịch bản thanh toán bằng ví điện tử_**

| Tên Use case         | Thanh toán bằng ví điện tử                                                                                                                                                                                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Đơn hàng đã được tạo với phương thức ví điện tử; ví của người mua đã kích hoạt.                                                                                                                                                                                                 |
| Hậu điều kiện        | Đơn hàng được thanh toán và đặt thành công.                                                                                                                                                                                                                                     |
| Kịch bản chính       | 1\. Người mua nhấn “Thanh toán”. 2\. Hệ thống hiển thị ô nhập mã PIN ví. 3\. Người mua nhập mã PIN 6 chữ số. 4\. Hệ thống xác thực mã PIN, trừ tiền trong ví, chuyển đơn sang trạng thái đã thanh toán, xóa các sản phẩm đã mua khỏi giỏ hàng và thông báo đặt hàng thành công. |
| Ngoại lệ             | 4.1. Mã PIN không đúng. 4.1.1. Hệ thống thông báo “Mã PIN không đúng”; nếu sai quá 5 lần liên tiếp thì khóa ví trong 30 phút. 4.2. Số dư ví không đủ. 4.2.1. Hệ thống thông báo “Số dư ví không đủ, vui lòng nạp thêm hoặc chọn phương thức khác”.                              |

###### **_Bảng 1.51. Kịch bản thanh toán chuyển khoản (mã QR)_**

| Tên Use case         | Thanh toán chuyển khoản (mã QR)                                                                                                                                                                                                                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                          |
| Điều kiện tiên quyết | Đơn hàng đã được tạo với phương thức chuyển khoản.                                                                                                                                                                                                                                                                                                 |
| Hậu điều kiện        | Đơn hàng được thanh toán và đặt thành công.                                                                                                                                                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người mua nhấn “Thanh toán”. 2\. Hệ thống sinh mã QR gắn với mã đơn hàng và hiển thị thời hạn thanh toán 15 phút. 3\. Người mua quét mã QR bằng ứng dụng ngân hàng và chuyển khoản. 4\. Hệ thống nhận xác nhận từ ngân hàng, chuyển đơn sang trạng thái đã thanh toán, xóa các sản phẩm đã mua khỏi giỏ hàng và thông báo đặt hàng thành công. |
| Ngoại lệ             | 4.1. Quá 15 phút chưa nhận được tiền. 4.1.1. Hệ thống hủy giao dịch, hoàn lại tồn kho và thông báo “Thanh toán không thành công, vui lòng thử lại”.                                                                                                                                                                                                |

###### **_Bảng 1.52. Kịch bản thanh toán khi nhận hàng (COD)_**

| Tên Use case         | Thanh toán khi nhận hàng (COD)                                                                                                                                                     |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                          |
| Điều kiện tiên quyết | Đơn hàng đã được tạo với phương thức COD.                                                                                                                                          |
| Hậu điều kiện        | Đơn hàng được đặt thành công ở trạng thái thanh toán sau.                                                                                                                          |
| Kịch bản chính       | 1\. Người mua nhấn “Đặt hàng” với phương thức COD. 2\. Hệ thống chuyển đơn sang trạng thái thanh toán sau, xóa các sản phẩm đã mua khỏi giỏ hàng và thông báo đặt hàng thành công. |
| Ngoại lệ             | Không có.                                                                                                                                                                          |

###### **_Bảng 1.53. Kịch bản xem lịch sử đơn hàng_**

| Tên Use case         | Xem lịch sử đơn hàng                                                                                                                                                                                                                                                                                                                                       |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Người mua xem được danh sách đơn hàng.                                                                                                                                                                                                                                                                                                                     |
| Kịch bản chính       | 1\. Người mua vào mục “Đơn mua”. 2\. Hệ thống hiển thị danh sách đơn hàng theo thứ tự mới nhất, mỗi lần tải 10 đơn. 3\. Người mua chọn tab trạng thái “Đang giao”. 4\. Hệ thống hiển thị các đơn hàng đang giao. 5\. Người mua lọc theo thời gian đặt từ 01/10/2026 đến 20/10/2026. 6\. Hệ thống hiển thị các đơn hàng đặt trong khoảng thời gian đã chọn. |
| Ngoại lệ             | 2.1. Người mua chưa có đơn hàng nào. 2.1.1. Hệ thống thông báo “Bạn chưa có đơn hàng nào”. 6.1. Khoảng thời gian không hợp lệ. 6.1.1. Hệ thống thông báo “Khoảng thời gian không hợp lệ, vui lòng chọn lại”.                                                                                                                                               |

###### **_Bảng 1.54. Kịch bản xem chi tiết đơn hàng_**

| Tên Use case         | Xem chi tiết đơn hàng                                                                                                                                                                                                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                         |
| Điều kiện tiên quyết | Người mua đang xem danh sách đơn hàng.                                                                                                                                                                                                                                            |
| Hậu điều kiện        | Người mua xem được chi tiết đơn hàng.                                                                                                                                                                                                                                             |
| Kịch bản chính       | 1\. Người mua chọn một đơn hàng. 2\. Hệ thống hiển thị mã đơn, thời gian đặt, trạng thái, địa chỉ nhận hàng, phương thức thanh toán, danh sách sản phẩm và bảng tổng kết chi phí. 3\. Người mua nhấn vào một sản phẩm trong đơn. 4\. Hệ thống chuyển tới trang chi tiết sản phẩm. |
| Ngoại lệ             | 4.1. Sản phẩm đã hết hàng hoặc ngừng kinh doanh. 4.1.1. Hệ thống vẫn hiển thị thông tin sản phẩm nhưng khóa các thao tác đặt hàng, đánh giá.                                                                                                                                      |

###### **_Bảng 1.55. Kịch bản hủy đơn hàng_**

| Tên Use case         | Hủy đơn hàng                                                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Đơn hàng đang chờ cửa hàng xác nhận.                                                                                                                                                                                                                     |
| Hậu điều kiện        | Đơn hàng bị hủy.                                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người mua nhấn “Hủy đơn hàng” tại trang chi tiết đơn. 2\. Hệ thống hiển thị danh sách lý do hủy. 3\. Người mua chọn lý do và nhấn “Xác nhận”. 4\. Hệ thống hủy đơn, hoàn lại tồn kho, hoàn tiền vào ví nếu đã thanh toán và thông báo cho người bán. |
| Ngoại lệ             | 4.1. Cửa hàng đã xử lý hoặc đã bàn giao đơn cho đơn vị vận chuyển. 4.1.1. Hệ thống thông báo “Đơn hàng đã được bàn giao cho đơn vị vận chuyển, không thể hủy”.                                                                                           |

###### **_Bảng 1.56. Kịch bản xác nhận đã nhận hàng_**

| Tên Use case         | Xác nhận đã nhận hàng                                                                                                                                                                                                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Đơn hàng ở trạng thái đã giao.                                                                                                                                                                                                                                                                        |
| Hậu điều kiện        | Đơn hàng được hoàn tất.                                                                                                                                                                                                                                                                               |
| Kịch bản chính       | 1\. Người mua nhấn “Đã nhận được hàng”. 2\. Hệ thống hiển thị hộp thoại xác nhận và lưu ý sau khi xác nhận sẽ không thể yêu cầu hoàn hàng. 3\. Người mua nhấn “Đồng ý”. 4\. Hệ thống chuyển đơn sang trạng thái hoàn thành, giải ngân tiền tạm giữ cho người bán và khóa chức năng yêu cầu hoàn hàng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                             |

###### **_Bảng 1.57. Kịch bản yêu cầu hoàn hàng_**

| Tên Use case         | Yêu cầu hoàn hàng                                                                                                                                                                                                                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Đơn hàng đã giao không quá 15 ngày và người mua chưa xác nhận đã nhận hàng.                                                                                                                                                                                                                                                 |
| Hậu điều kiện        | Yêu cầu hoàn hàng được gửi, đơn chuyển sang trạng thái chờ xử lý.                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người mua nhấn “Yêu cầu hoàn hàng”. 2\. Hệ thống hiển thị biểu mẫu gồm lý do hoàn hàng, mô tả và ô tải lên bằng chứng. 3\. Người mua chọn lý do “Hàng bể vỡ”, nhập mô tả, tải lên 3 ảnh và 1 video rồi nhấn “Gửi”. 4\. Hệ thống lưu yêu cầu, chuyển đơn sang trạng thái chờ xử lý hoàn hàng và thông báo cho người bán. |
| Ngoại lệ             | 2.1. Đơn hàng đã quá 15 ngày kể từ khi giao. 2.1.1. Hệ thống thông báo “Đơn hàng đã quá thời hạn yêu cầu hoàn hàng”. 4.1. Chưa tải lên bằng chứng hoặc tệp sai định dạng, vượt dung lượng. 4.1.1. Hệ thống thông báo “Vui lòng tải lên hình ảnh hoặc video hợp lệ”.                                                         |

###### **_Bảng 1.58. Kịch bản xác nhận đơn hàng_**

| Tên Use case         | Xác nhận đơn hàng                                                                                                                                                                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                          |
| Điều kiện tiên quyết | Người bán đã đăng nhập; cửa hàng có đơn chờ xác nhận.                                                                                                                                                                                              |
| Hậu điều kiện        | Đơn hàng chuyển sang trạng thái chờ lấy hàng.                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người bán vào “Quản lý đơn hàng” và chọn tab “Chờ xác nhận”. 2\. Hệ thống hiển thị danh sách đơn chờ xác nhận. 3\. Người bán chọn một đơn và nhấn “Xác nhận”. 4\. Hệ thống chuyển đơn sang trạng thái chờ lấy hàng và thông báo cho người mua. |
| Ngoại lệ             | 4.1. Người mua đã hủy đơn trước đó. 4.1.1. Hệ thống thông báo “Đơn hàng đã bị hủy”.                                                                                                                                                                |

###### **_Bảng 1.59. Kịch bản từ chối đơn hàng_**

| Tên Use case         | Từ chối đơn hàng                                                                                                                                                                                                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Cửa hàng có đơn chờ xác nhận.                                                                                                                                                                                                                                                          |
| Hậu điều kiện        | Đơn hàng bị hủy.                                                                                                                                                                                                                                                                       |
| Kịch bản chính       | 1\. Người bán chọn một đơn chờ xác nhận và nhấn “Từ chối”. 2\. Hệ thống hiển thị ô nhập lý do từ chối. 3\. Người bán nhập lý do “Hết hàng trong kho” và nhấn “Xác nhận”. 4\. Hệ thống hủy đơn, hoàn lại tồn kho, hoàn tiền cho người mua nếu đã thanh toán và gửi thông báo kèm lý do. |
| Ngoại lệ             | 4.1. Người bán chưa nhập lý do. 4.1.1. Hệ thống thông báo “Vui lòng nhập lý do từ chối”.                                                                                                                                                                                               |

###### **_Bảng 1.60. Kịch bản cập nhật trạng thái giao hàng_**

| Tên Use case         | Cập nhật trạng thái giao hàng                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Đơn hàng đã được xác nhận.                                                                                                                                                                                                                                                                                                                                                                                                               |
| Hậu điều kiện        | Trạng thái giao hàng của đơn được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                              |
| Kịch bản chính       | 1\. Người bán chọn một đơn trong tab “Chờ lấy hàng”. 2\. Hệ thống hiển thị chi tiết đơn và các trạng thái giao hàng có thể chuyển. 3\. Người bán chọn trạng thái “Đang giao” và nhấn “Cập nhật”. 4\. Hệ thống cập nhật trạng thái đơn và thông báo cho người mua. 5\. Người bán chọn trạng thái “Đã giao” khi đơn vị vận chuyển giao xong. 6\. Hệ thống cập nhật trạng thái đã giao, ghi nhận thời điểm giao và thông báo cho người mua. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                                                                                                                                                                |

###### **_Bảng 1.61. Kịch bản xử lý yêu cầu hoàn hàng_**

| Tên Use case         | Xử lý yêu cầu hoàn hàng                                                                                                                                                                                                                                                       |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                     |
| Điều kiện tiên quyết | Có đơn hàng ở trạng thái chờ xử lý hoàn hàng.                                                                                                                                                                                                                                 |
| Hậu điều kiện        | Yêu cầu hoàn hàng được chấp nhận hoặc chuyển lên nhân viên sàn.                                                                                                                                                                                                               |
| Kịch bản chính       | 1\. Người bán chọn tab “Hoàn hàng” và chọn một yêu cầu. 2\. Hệ thống hiển thị lý do, mô tả và bằng chứng hình ảnh, video của người mua. 3\. Người bán nhấn “Chấp nhận hoàn hàng”. 4\. Hệ thống hoàn tiền về ví người mua, cập nhật trạng thái đơn và thông báo cho người mua. |
| Ngoại lệ             | 4.1. Người bán chọn “Từ chối” và gửi kháng cáo kèm bằng chứng. 4.1.1. Hệ thống chuyển hồ sơ khiếu nại lên nhân viên sàn và thông báo cho người mua.                                                                                                                           |

###### **_Bảng 1.62. Kịch bản xem danh sách thông báo_**

| Tên Use case         | Xem danh sách thông báo                                                                                                                                                                              |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                            |
| Điều kiện tiên quyết | Người mua đã đăng nhập.                                                                                                                                                                              |
| Hậu điều kiện        | Người mua xem được danh sách thông báo.                                                                                                                                                              |
| Kịch bản chính       | 1\. Người mua nhấn biểu tượng thông báo có hiển thị số thông báo chưa đọc. 2\. Hệ thống hiển thị danh sách thông báo gồm tiêu đề, nội dung tóm tắt và thời gian gửi, thông báo chưa đọc được tô đậm. |
| Ngoại lệ             | 2.1. Chưa có thông báo nào. 2.1.1. Hệ thống thông báo “Bạn chưa có thông báo nào”.                                                                                                                   |

###### **_Bảng 1.63. Kịch bản mở thông báo_**

| Tên Use case         | Mở thông báo                                                                                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                             |
| Điều kiện tiên quyết | Danh sách thông báo đang hiển thị.                                                                                                                                                    |
| Hậu điều kiện        | Thông báo được đánh dấu đã đọc.                                                                                                                                                       |
| Kịch bản chính       | 1\. Người mua nhấn vào thông báo “Đơn hàng \#A1023 đang được giao”. 2\. Hệ thống đánh dấu thông báo đã đọc, giảm số thông báo chưa đọc và chuyển tới trang chi tiết đơn hàng \#A1023. |
| Ngoại lệ             | Không có.                                                                                                                                                                             |

###### **_Bảng 1.64. Kịch bản đánh dấu đã đọc tất cả_**

| Tên Use case         | Đánh dấu đã đọc tất cả                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                             |
| Điều kiện tiên quyết | Có ít nhất một thông báo chưa đọc.                                                                                                    |
| Hậu điều kiện        | Toàn bộ thông báo được đánh dấu đã đọc.                                                                                               |
| Kịch bản chính       | 1\. Người mua nhấn “Đánh dấu đã đọc tất cả”. 2\. Hệ thống cập nhật toàn bộ thông báo thành đã đọc và đặt số thông báo chưa đọc về 0\. |
| Ngoại lệ             | Không có.                                                                                                                             |

###### **_Bảng 1.65. Kịch bản xem danh sách sản phẩm_**

| Tên Use case         | Xem danh sách sản phẩm                                                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                    |
| Hậu điều kiện        | Người bán xem được danh sách sản phẩm của cửa hàng.                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người bán vào “Quản lý sản phẩm”. 2\. Hệ thống hiển thị danh sách sản phẩm gồm ảnh, tên, giá, tồn kho và trạng thái. 3\. Người bán nhập tên sản phẩm cần tìm. 4\. Hệ thống hiển thị các sản phẩm khớp với tên đã nhập. |
| Ngoại lệ             | 2.1. Cửa hàng chưa có sản phẩm nào. 2.1.1. Hệ thống thông báo “Cửa hàng chưa có sản phẩm” và hiển thị nút “Thêm sản phẩm”.                                                                                                 |

###### **_Bảng 1.66. Kịch bản thêm sản phẩm_**

| Tên Use case         | Thêm sản phẩm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Người bán đã đăng nhập và cửa hàng đã được duyệt.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Sản phẩm mới được lưu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người bán nhấn “Thêm sản phẩm” và tải lên ảnh bìa cùng 4 ảnh sản phẩm. 2\. Hệ thống hiển thị các ảnh đã tải lên. 3\. Người bán nhập tên “Bàn ăn gỗ sồi 6 ghế”, chọn danh mục, nhập mô tả, thông số kỹ thuật và gắn thẻ “Có sẵn”, “Mới”. 4\. Hệ thống ghi nhận thông tin sản phẩm. 5\. Người bán thêm biến thể “Màu gỗ tự nhiên”, nhập giá và tồn kho. 6\. Hệ thống hiển thị danh sách biến thể. 7\. Người bán nhấn “Lưu”. 8\. Hệ thống lưu sản phẩm và thông báo “Thêm sản phẩm thành công”. |
| Ngoại lệ             | 2.1. Ảnh sai định dạng hoặc vượt dung lượng. 2.1.1. Hệ thống thông báo “Ảnh không hợp lệ”. 8.1. Thiếu thông tin bắt buộc hoặc chưa có biến thể nào. 8.1.1. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin sản phẩm”.                                                                                                                                                                                                                                                                         |

###### **_Bảng 1.67. Kịch bản cập nhật sản phẩm_**

| Tên Use case         | Cập nhật sản phẩm                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Cửa hàng có ít nhất một sản phẩm.                                                                                                                                                                                                           |
| Hậu điều kiện        | Thông tin sản phẩm được cập nhật.                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người bán nhấn “Sửa” tại một sản phẩm. 2\. Hệ thống hiển thị biểu mẫu chứa thông tin hiện tại của sản phẩm. 3\. Người bán sửa mô tả, thay ảnh bìa và nhấn “Lưu”. 4\. Hệ thống lưu thay đổi và thông báo “Cập nhật sản phẩm thành công”. |
| Ngoại lệ             | 4.1. Thiếu thông tin bắt buộc hoặc ảnh không hợp lệ. 4.1.1. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin sản phẩm”.                                                                                                                   |

###### **_Bảng 1.68. Kịch bản xóa sản phẩm_**

| Tên Use case         | Xóa sản phẩm                                                                                                                                                                                                              |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Cửa hàng có ít nhất một sản phẩm.                                                                                                                                                                                         |
| Hậu điều kiện        | Sản phẩm bị ẩn khỏi danh sách (xóa mềm).                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người bán nhấn “Xóa” tại một sản phẩm. 2\. Hệ thống hiển thị hộp thoại xác nhận xóa. 3\. Người bán nhấn “Đồng ý”. 4\. Hệ thống đánh dấu sản phẩm đã xóa, ẩn sản phẩm khỏi sàn và giữ lại dữ liệu cho các đơn hàng cũ. |
| Ngoại lệ             | 4.1. Sản phẩm đang có đơn hàng chưa hoàn tất. 4.1.1. Hệ thống thông báo “Sản phẩm đang có đơn hàng chưa hoàn tất, không thể xóa”.                                                                                         |

###### **_Bảng 1.69. Kịch bản thêm biến thể_**

| Tên Use case         | Thêm biến thể                                                                                                                                                                                                                                        |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Người bán đang thêm hoặc sửa sản phẩm.                                                                                                                                                                                                               |
| Hậu điều kiện        | Biến thể mới được thêm vào sản phẩm.                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người bán nhấn “Thêm biến thể”. 2\. Hệ thống hiển thị dòng nhập biến thể gồm phân loại, giá và tồn kho. 3\. Người bán nhập màu “Óc chó”, giá 8.500.000đ, tồn kho 10 và nhấn “Lưu”. 4\. Hệ thống lưu biến thể và hiển thị lại danh sách biến thể. |
| Ngoại lệ             | 4.1. Biến thể trùng phân loại đã có. 4.1.1. Hệ thống thông báo “Biến thể đã tồn tại”.                                                                                                                                                                |

###### **_Bảng 1.70. Kịch bản cập nhật giá và tồn kho_**

| Tên Use case         | Cập nhật giá và tồn kho                                                                                                                                                                   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                 |
| Điều kiện tiên quyết | Sản phẩm có ít nhất một biến thể.                                                                                                                                                         |
| Hậu điều kiện        | Giá và tồn kho của biến thể được cập nhật.                                                                                                                                                |
| Kịch bản chính       | 1\. Người bán chọn một biến thể và sửa giá, tồn kho. 2\. Hệ thống kiểm tra giá trị nhập vào. 3\. Người bán nhấn “Lưu”. 4\. Hệ thống lưu giá, tồn kho mới và cập nhật trên trang sản phẩm. |
| Ngoại lệ             | 2.1. Giá hoặc tồn kho nhỏ hơn 0\. 2.1.1. Hệ thống thông báo “Giá và tồn kho phải lớn hơn hoặc bằng 0”.                                                                                    |

###### **_Bảng 1.71. Kịch bản thiết lập giá sỉ_**

| Tên Use case         | Thiết lập giá sỉ                                                                                                                                                                                                                                          |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Sản phẩm có ít nhất một biến thể.                                                                                                                                                                                                                         |
| Hậu điều kiện        | Bảng giá sỉ của sản phẩm được lưu.                                                                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người bán chọn “Thiết lập giá sỉ”. 2\. Hệ thống hiển thị bảng khoảng số lượng và đơn giá tương ứng. 3\. Người bán nhập mức “từ 5 sản phẩm, giảm còn 7.900.000đ” và nhấn “Lưu”. 4\. Hệ thống lưu bảng giá sỉ và hiển thị trên trang chi tiết sản phẩm. |
| Ngoại lệ             | 4.1. Giá sỉ lớn hơn giá lẻ hoặc các khoảng số lượng chồng nhau. 4.1.1. Hệ thống thông báo “Thiết lập giá sỉ không hợp lệ”.                                                                                                                                |

###### **_Bảng 1.72. Kịch bản xóa biến thể_**

| Tên Use case         | Xóa biến thể                                                                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                       |
| Điều kiện tiên quyết | Sản phẩm có ít nhất hai biến thể.                                                                                                                                               |
| Hậu điều kiện        | Biến thể bị xóa khỏi sản phẩm.                                                                                                                                                  |
| Kịch bản chính       | 1\. Người bán nhấn “Xóa” tại một biến thể. 2\. Hệ thống hiển thị hộp thoại xác nhận xóa. 3\. Người bán nhấn “Đồng ý”. 4\. Hệ thống xóa biến thể và cập nhật danh sách biến thể. |
| Ngoại lệ             | 2.1. Sản phẩm chỉ còn một biến thể. 2.1.1. Hệ thống thông báo “Sản phẩm phải có ít nhất một biến thể”.                                                                          |

###### **_Bảng 1.73. Kịch bản đăng ký tài khoản_**

| Tên Use case         | Đăng ký tài khoản                                                                                                                                                                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Người bán chưa có tài khoản trên kênh người bán.                                                                                                                                                                                                                                             |
| Hậu điều kiện        | Tài khoản người bán được tạo.                                                                                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người bán chọn “Đăng ký” tại kênh người bán và nhập email. 2\. Hệ thống kiểm tra email, tạo mật khẩu tạm thời và gửi tới email. 3\. Người bán nhập mật khẩu tạm thời và nhấn “Xác nhận”. 4\. Hệ thống xác thực mật khẩu tạm thời, tạo tài khoản người bán và chuyển tới trang đăng nhập. |
| Ngoại lệ             | 2.1. Email sai định dạng hoặc đã được đăng ký. 2.1.1. Hệ thống thông báo “Email này đã được đăng ký”. 4.1. Mật khẩu tạm thời sai hoặc đã quá 24 giờ. 4.1.1. Hệ thống thông báo “Mật khẩu tạm thời không đúng hoặc đã hết hạn”.                                                               |

###### **_Bảng 1.74. Kịch bản đăng nhập_**

| Tên Use case         | Đăng nhập                                                                                                                                                                                                                                                                                                    |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                    |
| Điều kiện tiên quyết | Người bán đã có tài khoản.                                                                                                                                                                                                                                                                                   |
| Hậu điều kiện        | Người bán vào được trang chủ người bán.                                                                                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người bán nhập email, mật khẩu và nhấn “Đăng nhập”. 2\. Hệ thống xác thực thông tin; nếu là lần đầu đăng nhập thì chuyển tới trang đổi mật khẩu lần đầu. 3\. Người bán nhập mật khẩu mới đạt các tiêu chí, nhập lại và nhấn “Hoàn tất”. 4\. Hệ thống lưu mật khẩu mới và chuyển tới trang chủ người bán. |
| Ngoại lệ             | 2.1. Email hoặc mật khẩu không đúng. 2.1.1. Hệ thống thông báo “Email hoặc mật khẩu không đúng”. 4.1. Mật khẩu mới chưa đạt tiêu chí hoặc hai mật khẩu không khớp. 4.1.1. Hệ thống tô đỏ tiêu chí chưa đạt và giữ nút “Hoàn tất” ở trạng thái vô hiệu.                                                       |

###### **_Bảng 1.75. Kịch bản xác thực tài khoản (gửi hồ sơ cửa hàng)_**

| Tên Use case         | Xác thực tài khoản (gửi hồ sơ cửa hàng)                                                                                                                                                                                                                                                                          |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Người bán đã đăng nhập, cửa hàng chưa được duyệt.                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Hồ sơ cửa hàng được gửi tới nhân viên sàn và chờ duyệt.                                                                                                                                                                                                                                                          |
| Kịch bản chính       | 1\. Người bán chọn “Đăng ký cửa hàng”. 2\. Hệ thống hiển thị biểu mẫu gồm thông tin cửa hàng, thông tin thuế và giấy tờ định danh chủ sở hữu. 3\. Người bán nhập thông tin, tải lên ảnh căn cước hai mặt và nhấn “Gửi hồ sơ”. 4\. Hệ thống lưu hồ sơ, gửi tới nhân viên sàn và thông báo “Hồ sơ đang chờ duyệt”. |
| Ngoại lệ             | 4.1. Thiếu thông tin bắt buộc hoặc ảnh giấy tờ không hợp lệ. 4.1.1. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin hồ sơ”.                                                                                                                                                                                   |

###### **_Bảng 1.76. Kịch bản cập nhật thông tin tài khoản_**

| Tên Use case         | Cập nhật thông tin tài khoản                                                                                                                                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                    |
| Hậu điều kiện        | Thông tin tài khoản người bán được cập nhật.                                                                                                                                                                               |
| Kịch bản chính       | 1\. Người bán vào “Thông tin tài khoản”. 2\. Hệ thống hiển thị họ tên, số điện thoại và email của người bán. 3\. Người bán sửa số điện thoại và nhấn “Lưu”. 4\. Hệ thống lưu thông tin và thông báo “Cập nhật thành công”. |
| Ngoại lệ             | 4.1. Số điện thoại không hợp lệ. 4.1.1. Hệ thống thông báo “Số điện thoại không hợp lệ”.                                                                                                                                   |

###### **_Bảng 1.77. Kịch bản đổi mật khẩu_**

| Tên Use case         | Đổi mật khẩu                                                                                                                                                                                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                             |
| Hậu điều kiện        | Mật khẩu người bán được thay đổi.                                                                                                                                                                                                                                   |
| Kịch bản chính       | 1\. Người bán chọn “Đổi mật khẩu”. 2\. Hệ thống hiển thị biểu mẫu gồm mật khẩu hiện tại, mật khẩu mới và nhập lại mật khẩu mới. 3\. Người bán nhập đủ ba trường và nhấn “Lưu”. 4\. Hệ thống kiểm tra, cập nhật mật khẩu mới và thông báo “Đổi mật khẩu thành công”. |
| Ngoại lệ             | 4.1. Mật khẩu hiện tại không đúng hoặc mật khẩu mới trùng mật khẩu cũ. 4.1.1. Hệ thống thông báo lỗi tương ứng và không cập nhật mật khẩu.                                                                                                                          |

###### **_Bảng 1.78. Kịch bản quên mật khẩu_**

| Tên Use case         | Quên mật khẩu                                                                                                                                                                                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Người bán đã có tài khoản và đang ở trang đăng nhập.                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Mật khẩu người bán được đặt lại.                                                                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người bán chọn “Quên mật khẩu” và nhập email. 2\. Hệ thống gửi mã OTP 6 chữ số tới email và hiển thị biểu mẫu đặt lại mật khẩu. 3\. Người bán nhập OTP, mật khẩu mới, xác nhận mật khẩu mới và nhấn “Đặt lại mật khẩu”. 4\. Hệ thống đối chiếu OTP, cập nhật mật khẩu và chuyển tới trang đăng nhập. |
| Ngoại lệ             | 4.1. OTP sai hoặc đã quá 15 phút. 4.1.1. Hệ thống thông báo “Mã OTP không đúng hoặc đã hết hạn”.                                                                                                                                                                                                         |

###### **_Bảng 1.79. Kịch bản đăng xuất_**

| Tên Use case         | Đăng xuất                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                     |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                       |
| Hậu điều kiện        | Phiên đăng nhập của người bán kết thúc.                                                                       |
| Kịch bản chính       | 1\. Người bán chọn “Đăng xuất”. 2\. Hệ thống hủy phiên đăng nhập và chuyển về trang đăng nhập kênh người bán. |
| Ngoại lệ             | Không có.                                                                                                     |

###### **_Bảng 1.80. Kịch bản cập nhật thông tin cơ bản_**

| Tên Use case         | Cập nhật thông tin cơ bản                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                          |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                            |
| Hậu điều kiện        | Thông tin cơ bản của cửa hàng được cập nhật.                                                                                                                                                                                                                       |
| Kịch bản chính       | 1\. Người bán vào “Quản lý cửa hàng”. 2\. Hệ thống hiển thị avatar, tên và mô tả hiện tại của cửa hàng. 3\. Người bán đổi avatar, sửa tên thành “Nội thất Gỗ Việt”, sửa mô tả và nhấn “Lưu”. 4\. Hệ thống lưu thông tin cơ bản và thông báo “Cập nhật thành công”. |
| Ngoại lệ             | 4.1. Tên cửa hàng trống hoặc ảnh không hợp lệ. 4.1.1. Hệ thống thông báo “Thông tin cửa hàng không hợp lệ”.                                                                                                                                                        |

###### **_Bảng 1.81. Kịch bản trang trí cửa hàng_**

| Tên Use case         | Trang trí cửa hàng                                                                                                                                                                                                                                                                                                                                                     |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Giao diện trang chủ cửa hàng được cập nhật.                                                                                                                                                                                                                                                                                                                            |
| Kịch bản chính       | 1\. Người bán chọn “Trang trí cửa hàng” và chọn giao diện máy tính. 2\. Hệ thống hiển thị trình thiết kế trang chủ cửa hàng với các khối có sẵn. 3\. Người bán thêm khối banner, khối sản phẩm nổi bật và sắp xếp thứ tự. 4\. Hệ thống hiển thị bản xem trước theo bố cục đã chọn. 5\. Người bán nhấn “Lưu”. 6\. Hệ thống lưu giao diện và áp dụng cho trang cửa hàng. |
| Ngoại lệ             | 4.1. Ảnh banner sai định dạng hoặc vượt dung lượng. 4.1.1. Hệ thống thông báo “Ảnh không hợp lệ”.                                                                                                                                                                                                                                                                      |

###### **_Bảng 1.82. Kịch bản cập nhật danh mục hiển thị_**

| Tên Use case         | Cập nhật danh mục hiển thị                                                                                                                                                                                                                                             |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Cửa hàng đã có danh mục sản phẩm.                                                                                                                                                                                                                                      |
| Hậu điều kiện        | Danh mục hiển thị trên trang cửa hàng được cập nhật.                                                                                                                                                                                                                   |
| Kịch bản chính       | 1\. Người bán chọn “Danh mục hiển thị”. 2\. Hệ thống hiển thị danh sách danh mục của cửa hàng và trạng thái hiển thị. 3\. Người bán bật hiển thị danh mục “Bàn ăn”, tắt danh mục “Đèn trang trí” và nhấn “Lưu”. 4\. Hệ thống lưu thiết lập và cập nhật trang cửa hàng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                              |

###### **_Bảng 1.83. Kịch bản tìm kiếm và lọc gian hàng_**

| Tên Use case         | Tìm kiếm và lọc gian hàng                                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                 |
| Hậu điều kiện        | Nhân viên sàn xem được danh sách gian hàng cần tìm.                                                                                                                                                                         |
| Kịch bản chính       | 1\. Nhân viên sàn vào “Quản lý gian hàng”. 2\. Hệ thống hiển thị danh sách gian hàng. 3\. Nhân viên sàn lọc theo trạng thái “Đang hoạt động” và nhập tên gian hàng. 4\. Hệ thống hiển thị các gian hàng khớp với điều kiện. |
| Ngoại lệ             | 4.1. Không có gian hàng phù hợp. 4.1.1. Hệ thống thông báo “Không tìm thấy gian hàng phù hợp”.                                                                                                                              |

###### **_Bảng 1.84. Kịch bản xem chi tiết gian hàng_**

| Tên Use case         | Xem chi tiết gian hàng                                                                                                                                                                                                                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Danh sách gian hàng đang hiển thị.                                                                                                                                                                                                                                                                            |
| Hậu điều kiện        | Nhân viên sàn xem được hồ sơ và giao diện gian hàng.                                                                                                                                                                                                                                                          |
| Kịch bản chính       | 1\. Nhân viên sàn chọn một gian hàng. 2\. Hệ thống hiển thị hồ sơ gồm thông tin cửa hàng, thông tin thuế, định danh chủ sở hữu (đã che thông tin nhạy cảm). 3\. Nhân viên sàn nhấn “Xem với tư cách người mua”. 4\. Hệ thống hiển thị trang cửa hàng như người mua thấy, khóa chức năng nhắn tin và mua hàng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                                     |

###### **_Bảng 1.85. Kịch bản phê duyệt hồ sơ đăng ký cửa hàng_**

| Tên Use case         | Phê duyệt hồ sơ đăng ký cửa hàng                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Có hồ sơ đăng ký cửa hàng đang chờ duyệt.                                                                                                                                                                                                    |
| Hậu điều kiện        | Cửa hàng được kích hoạt.                                                                                                                                                                                                                     |
| Kịch bản chính       | 1\. Nhân viên sàn chọn tab “Chờ duyệt” và mở một hồ sơ. 2\. Hệ thống hiển thị chi tiết hồ sơ và giấy tờ đính kèm. 3\. Nhân viên sàn nhấn “Phê duyệt”. 4\. Hệ thống kích hoạt cửa hàng, ghi log và gửi email thông báo kết quả cho người bán. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                    |

###### **_Bảng 1.86. Kịch bản từ chối hồ sơ đăng ký cửa hàng_**

| Tên Use case         | Từ chối hồ sơ đăng ký cửa hàng                                                                                                                                                                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Có hồ sơ đăng ký cửa hàng đang chờ duyệt.                                                                                                                                                                                                                       |
| Hậu điều kiện        | Hồ sơ bị từ chối.                                                                                                                                                                                                                                               |
| Kịch bản chính       | 1\. Nhân viên sàn mở hồ sơ chờ duyệt và nhấn “Từ chối”. 2\. Hệ thống hiển thị ô nhập lý do từ chối. 3\. Nhân viên sàn nhập lý do “Ảnh căn cước bị mờ” và nhấn “Xác nhận”. 4\. Hệ thống cập nhật trạng thái hồ sơ, ghi log và gửi email kèm lý do cho người bán. |
| Ngoại lệ             | 4.1. Nhân viên sàn chưa nhập lý do. 4.1.1. Hệ thống thông báo “Vui lòng nhập lý do từ chối”.                                                                                                                                                                    |

###### **_Bảng 1.87. Kịch bản khóa gian hàng_**

| Tên Use case         | Khóa gian hàng                                                                                                                                                                                                                                                               |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Gian hàng đang hoạt động.                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Gian hàng bị khóa và ẩn khỏi sàn.                                                                                                                                                                                                                                            |
| Kịch bản chính       | 1\. Nhân viên sàn mở chi tiết gian hàng và nhấn “Khóa gian hàng”. 2\. Hệ thống hiển thị ô nhập lý do khóa. 3\. Nhân viên sàn nhập lý do và nhấn “Xác nhận”. 4\. Hệ thống chuyển gian hàng sang trạng thái đã khóa, ẩn sản phẩm khỏi sàn, ghi log và gửi email cho người bán. |
| Ngoại lệ             | 4.1. Nhân viên sàn chưa nhập lý do khóa. 4.1.1. Hệ thống thông báo “Vui lòng nhập lý do khóa gian hàng”.                                                                                                                                                                     |

###### **_Bảng 1.88. Kịch bản mở khóa gian hàng_**

| Tên Use case         | Mở khóa gian hàng                                                                                                                                                                                                                       |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Gian hàng đang bị khóa.                                                                                                                                                                                                                 |
| Hậu điều kiện        | Gian hàng hoạt động trở lại.                                                                                                                                                                                                            |
| Kịch bản chính       | 1\. Nhân viên sàn mở chi tiết gian hàng và nhấn “Mở khóa”. 2\. Hệ thống hiển thị hộp thoại xác nhận. 3\. Nhân viên sàn nhấn “Đồng ý”. 4\. Hệ thống chuyển gian hàng sang trạng thái đang hoạt động, ghi log và gửi email cho người bán. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                               |

###### **_Bảng 1.89. Kịch bản quản lý banner_**

| Tên Use case         | Quản lý banner                                                                                                                                                                                                                                                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                                                                                               |
| Hậu điều kiện        | Banner trang chủ được cập nhật.                                                                                                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Nhân viên sàn vào “Quản lý trang chủ” và chọn mục “Banner”. 2\. Hệ thống hiển thị danh sách banner kèm thời gian hiển thị. 3\. Nhân viên sàn thêm banner mới, tải ảnh và đặt thời gian hiển thị từ 01/11/2026 đến 11/11/2026. 4\. Hệ thống lưu banner và hiển thị lại danh sách. 5\. Nhân viên sàn xóa một banner đã hết hạn. 6\. Hệ thống xóa banner khỏi danh sách. |
| Ngoại lệ             | 4.1. Thời gian hiển thị không hợp lệ. 4.1.1. Hệ thống thông báo “Thời gian hiển thị không hợp lệ”.                                                                                                                                                                                                                                                                        |

###### **_Bảng 1.90. Kịch bản quản lý danh mục trang chủ_**

| Tên Use case         | Quản lý danh mục trang chủ                                                                                                                                                                                         |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                        |
| Hậu điều kiện        | Danh mục hiển thị trên trang chủ được cập nhật.                                                                                                                                                                    |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Danh mục”. 2\. Hệ thống hiển thị danh sách danh mục trên trang chủ. 3\. Nhân viên sàn thêm danh mục “Phòng ngủ” kèm ảnh đại diện. 4\. Hệ thống lưu danh mục và hiển thị lại danh sách. |
| Ngoại lệ             | 4.1. Tên danh mục trống hoặc đã tồn tại. 4.1.1. Hệ thống thông báo “Tên danh mục không hợp lệ”.                                                                                                                    |

###### **_Bảng 1.91. Kịch bản quản lý quảng cáo_**

| Tên Use case         | Quản lý quảng cáo                                                                                                                                                                                                                  |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                        |
| Hậu điều kiện        | Quảng cáo trên trang chủ được cập nhật.                                                                                                                                                                                            |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Quảng cáo”. 2\. Hệ thống hiển thị danh sách quảng cáo kèm thời gian hiển thị. 3\. Nhân viên sàn sửa ảnh và thời gian hiển thị của một quảng cáo. 4\. Hệ thống lưu quảng cáo và hiển thị lại danh sách. |
| Ngoại lệ             | 4.1. Thời gian hiển thị không hợp lệ. 4.1.1. Hệ thống thông báo “Thời gian hiển thị không hợp lệ”.                                                                                                                                 |

###### **_Bảng 1.92. Kịch bản sắp xếp các thành phần_**

| Tên Use case         | Sắp xếp các thành phần                                                                                                                                                                                                                              |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Trang chủ có ít nhất hai thành phần.                                                                                                                                                                                                                |
| Hậu điều kiện        | Thứ tự các thành phần trang chủ được cập nhật.                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Nhân viên sàn chọn “Sắp xếp bố cục”. 2\. Hệ thống hiển thị các thành phần (hero, banner, carousel, danh mục) theo thứ tự hiện tại. 3\. Nhân viên sàn kéo thả khối danh mục lên trên khối carousel. 4\. Hệ thống cập nhật thứ tự các thành phần. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                           |

###### **_Bảng 1.93. Kịch bản xem trước và xuất bản trang chủ_**

| Tên Use case         | Xem trước và xuất bản trang chủ                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Trang chủ có thay đổi chưa xuất bản.                                                                                                                                                                           |
| Hậu điều kiện        | Trang chủ mới được áp dụng cho người dùng.                                                                                                                                                                     |
| Kịch bản chính       | 1\. Nhân viên sàn nhấn “Xem trước”. 2\. Hệ thống hiển thị bản xem trước trang chủ trên giao diện máy tính và điện thoại. 3\. Nhân viên sàn nhấn “Xuất bản”. 4\. Hệ thống áp dụng trang chủ mới cho người dùng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                      |

###### **_Bảng 1.94. Kịch bản xem sản phẩm chờ duyệt_**

| Tên Use case         | Xem sản phẩm chờ duyệt                                                                                                                                                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                 |
| Hậu điều kiện        | Nhân viên sàn xem được chi tiết sản phẩm chờ duyệt.                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Nhân viên sàn vào “Kiểm duyệt sản phẩm”. 2\. Hệ thống hiển thị danh sách sản phẩm bị đánh giá chưa đủ tiêu chuẩn đang chờ duyệt. 3\. Nhân viên sàn chọn một sản phẩm. 4\. Hệ thống hiển thị chi tiết sản phẩm và lý do hệ thống gắn cờ. |
| Ngoại lệ             | 2.1. Không có sản phẩm chờ duyệt. 2.1.1. Hệ thống thông báo “Không có sản phẩm cần kiểm duyệt”.                                                                                                                                             |

###### **_Bảng 1.95. Kịch bản phê duyệt sản phẩm_**

| Tên Use case         | Phê duyệt sản phẩm                                                                                                    |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                         |
| Điều kiện tiên quyết | Nhân viên sàn đang xem chi tiết sản phẩm chờ duyệt.                                                                   |
| Hậu điều kiện        | Sản phẩm được hiển thị trên sàn.                                                                                      |
| Kịch bản chính       | 1\. Nhân viên sàn nhấn “Phê duyệt”. 2\. Hệ thống chuyển sản phẩm sang trạng thái đang bán và thông báo cho người bán. |
| Ngoại lệ             | Không có.                                                                                                             |

###### **_Bảng 1.96. Kịch bản từ chối sản phẩm_**

| Tên Use case         | Từ chối sản phẩm                                                                                                                                                                                                                                                |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Nhân viên sàn đang xem chi tiết sản phẩm chờ duyệt.                                                                                                                                                                                                             |
| Hậu điều kiện        | Sản phẩm bị từ chối và không hiển thị trên sàn.                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Nhân viên sàn nhấn “Từ chối”. 2\. Hệ thống hiển thị ô nhập lý do từ chối. 3\. Nhân viên sàn nhập lý do “Hình ảnh không đúng sản phẩm” và nhấn “Xác nhận”. 4\. Hệ thống chuyển sản phẩm sang trạng thái bị từ chối và gửi thông báo kèm lý do cho người bán. |
| Ngoại lệ             | 4.1. Nhân viên sàn chưa nhập lý do. 4.1.1. Hệ thống thông báo “Vui lòng nhập lý do từ chối”.                                                                                                                                                                    |

###### **_Bảng 1.97. Kịch bản tìm kiếm tài khoản_**

| Tên Use case         | Tìm kiếm tài khoản                                                                                                                                                                                                                                                                              |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Nhân viên sàn xem được danh sách tài khoản cần tìm.                                                                                                                                                                                                                                             |
| Kịch bản chính       | 1\. Nhân viên sàn vào “Quản lý người dùng” và chọn loại tài khoản “Người mua”. 2\. Hệ thống hiển thị ô tìm kiếm, chưa hiển thị danh sách tài khoản. 3\. Nhân viên sàn nhập số điện thoại “0912345678” và nhấn “Tìm kiếm”. 4\. Hệ thống hiển thị danh sách tài khoản khớp, 10 kết quả mỗi trang. |
| Ngoại lệ             | 4.1. Không có tài khoản phù hợp. 4.1.1. Hệ thống thông báo “Không tìm thấy tài khoản phù hợp”.                                                                                                                                                                                                  |

###### **_Bảng 1.98. Kịch bản xem chi tiết tài khoản_**

| Tên Use case         | Xem chi tiết tài khoản                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                         |
| Điều kiện tiên quyết | Danh sách kết quả tìm kiếm đang hiển thị.                                                                                             |
| Hậu điều kiện        | Nhân viên sàn xem được thông tin tài khoản.                                                                                           |
| Kịch bản chính       | 1\. Nhân viên sàn chọn một tài khoản. 2\. Hệ thống hiển thị thông tin tài khoản, che bớt các ký tự nhạy cảm như email, số điện thoại. |
| Ngoại lệ             | Không có.                                                                                                                             |

###### **_Bảng 1.99. Kịch bản khóa tài khoản_**

| Tên Use case         | Khóa tài khoản                                                                                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Tài khoản đang hoạt động.                                                                                                                                                                                                                          |
| Hậu điều kiện        | Tài khoản bị khóa.                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Nhân viên sàn nhấn “Khóa tài khoản”. 2\. Hệ thống hiển thị ô nhập lý do khóa. 3\. Nhân viên sàn nhập lý do và nhấn “Xác nhận”. 4\. Hệ thống khóa tài khoản, tạm khóa cửa hàng nếu là người bán, ghi log kèm lý do và thông báo cho người dùng. |
| Ngoại lệ             | 4.1. Nhân viên sàn chưa nhập lý do. 4.1.1. Hệ thống thông báo “Vui lòng nhập lý do khóa tài khoản”.                                                                                                                                                |

###### **_Bảng 1.100. Kịch bản mở khóa tài khoản_**

| Tên Use case         | Mở khóa tài khoản                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Tài khoản đang bị khóa.                                                                                                                                                                                       |
| Hậu điều kiện        | Tài khoản hoạt động trở lại.                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Nhân viên sàn nhấn “Mở khóa”. 2\. Hệ thống hiển thị ô nhập lý do mở khóa. 3\. Nhân viên sàn nhập lý do và nhấn “Xác nhận”. 4\. Hệ thống mở khóa tài khoản, ghi log kèm lý do và thông báo cho người dùng. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                     |

#### **_b) Giai đoạn 2_**

###### **_Bảng 1.101. Kịch bản đánh giá sản phẩm_**

| Tên Use case         | Đánh giá sản phẩm                                                                                                                                                                                                                                                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Người mua có đơn hàng đã giao không quá 15 ngày.                                                                                                                                                                                                                                                                                |
| Hậu điều kiện        | Đánh giá sản phẩm được lưu và hiển thị.                                                                                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người mua nhấn “Đánh giá” tại đơn hàng đã giao. 2\. Hệ thống hiển thị biểu mẫu gồm chọn số sao, ô nhận xét và ô tải ảnh cho từng sản phẩm. 3\. Người mua chọn 5 sao, viết nhận xét “Ghế chắc chắn, đúng màu”, tải lên 2 ảnh và nhấn “Gửi”. 4\. Hệ thống lọc từ khóa nhạy cảm, lưu đánh giá và hiển thị trên trang sản phẩm. |
| Ngoại lệ             | 2.1. Đơn hàng đã quá thời hạn đánh giá hoặc đang chờ xử lý hoàn hàng. 2.1.1. Hệ thống thông báo “Đơn hàng không còn trong thời hạn đánh giá”. 4.1. Người mua chưa chọn số sao. 4.1.1. Hệ thống thông báo “Vui lòng chọn số sao đánh giá”.                                                                                       |

###### **_Bảng 1.102. Kịch bản đánh giá cửa hàng_**

| Tên Use case         | Đánh giá cửa hàng                                                                                                                                                                                                                                               |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Người mua có ít nhất một đơn hàng với cửa hàng.                                                                                                                                                                                                                 |
| Hậu điều kiện        | Đánh giá cửa hàng được lưu và hiển thị.                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người mua vào trang cửa hàng và nhấn “Đánh giá cửa hàng”. 2\. Hệ thống hiển thị biểu mẫu gồm chọn số sao, ô nhận xét và ô tải ảnh. 3\. Người mua chọn 4 sao, viết nhận xét và nhấn “Gửi”. 4\. Hệ thống lưu đánh giá và cập nhật điểm đánh giá của cửa hàng. |
| Ngoại lệ             | 2.1. Người mua chưa có đơn hàng nào với cửa hàng. 2.1.1. Hệ thống thông báo “Bạn cần mua hàng tại cửa hàng để đánh giá”. 4.1. Người mua chưa chọn số sao. 4.1.1. Hệ thống thông báo “Vui lòng chọn số sao đánh giá”.                                            |

###### **_Bảng 1.103. Kịch bản xem đánh giá của cửa hàng_**

| Tên Use case         | Xem đánh giá của cửa hàng                                                                                                                                                                                   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                     |
| Hậu điều kiện        | Người bán xem được danh sách đánh giá.                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người bán vào “Quản lý đánh giá”. 2\. Hệ thống hiển thị danh sách đánh giá sản phẩm và cửa hàng. 3\. Người bán lọc các đánh giá “Chưa phản hồi”. 4\. Hệ thống hiển thị các đánh giá chưa được phản hồi. |
| Ngoại lệ             | 2.1. Cửa hàng chưa có đánh giá nào. 2.1.1. Hệ thống thông báo “Chưa có đánh giá nào”.                                                                                                                       |

###### **_Bảng 1.104. Kịch bản phản hồi đánh giá_**

| Tên Use case         | Phản hồi đánh giá                                                                                                                                                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Người bán đang xem danh sách đánh giá.                                                                                                                                                                                                 |
| Hậu điều kiện        | Phản hồi được lưu và người mua được thông báo.                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người bán nhấn “Phản hồi” tại một đánh giá. 2\. Hệ thống hiển thị ô nhập phản hồi. 3\. Người bán nhập “Cảm ơn anh đã ủng hộ cửa hàng” và nhấn “Gửi”. 4\. Hệ thống lưu phản hồi, hiển thị dưới đánh giá và thông báo cho người mua. |
| Ngoại lệ             | 4.1. Nội dung phản hồi trống. 4.1.1. Hệ thống thông báo “Vui lòng nhập nội dung phản hồi”.                                                                                                                                             |

###### **_Bảng 1.105. Kịch bản xem danh sách và mở cuộc trò chuyện_**

| Tên Use case         | Xem danh sách và mở cuộc trò chuyện                                                                                                                                                                                                                                           |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                          |
| Điều kiện tiên quyết | Người dùng đã đăng nhập.                                                                                                                                                                                                                                                      |
| Hậu điều kiện        | Người dùng xem được nội dung cuộc trò chuyện.                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người dùng nhấn biểu tượng “Chat” trên thanh điều hướng. 2\. Hệ thống hiển thị danh sách cuộc trò chuyện, cuộc có tin nhắn chưa đọc được tô đậm. 3\. Người dùng chọn một cuộc trò chuyện. 4\. Hệ thống hiển thị nội dung cuộc trò chuyện và đánh dấu các tin nhắn đã đọc. |
| Ngoại lệ             | 2.1. Chưa có cuộc trò chuyện nào. 2.1.1. Hệ thống thông báo “Bạn chưa có cuộc trò chuyện nào”.                                                                                                                                                                                |

###### **_Bảng 1.106. Kịch bản gửi tin nhắn_**

| Tên Use case         | Gửi tin nhắn                                                                                                                                                                                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Người dùng đang mở một cuộc trò chuyện.                                                                                                                                                                                                                                |
| Hậu điều kiện        | Tin nhắn được gửi tới bên kia.                                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người dùng nhập “Sản phẩm này còn màu xám không?” và nhấn “Gửi”. 2\. Hệ thống gửi tin nhắn tới bên kia theo thời gian thực và hiển thị trong khung chat. 3\. Người dùng chọn gửi hình ảnh và chọn một ảnh từ máy. 4\. Hệ thống tải ảnh lên và gửi ảnh tới bên kia. |
| Ngoại lệ             | 2.1. Mất kết nối khi gửi tin nhắn. 2.1.1. Hệ thống thông báo “Gửi tin nhắn thất bại, vui lòng thử lại”. 4.1. Ảnh sai định dạng hoặc vượt dung lượng. 4.1.1. Hệ thống thông báo “Ảnh không hợp lệ”.                                                                     |

###### **_Bảng 1.107. Kịch bản liên hệ người bán từ trang cửa hàng_**

| Tên Use case         | Liên hệ người bán từ trang cửa hàng                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                       |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đang ở trang cửa hàng.                                                                |
| Hậu điều kiện        | Khung trò chuyện với người bán được mở.                                                                         |
| Kịch bản chính       | 1\. Người mua nhấn “Chat ngay” tại trang cửa hàng. 2\. Hệ thống mở khung trò chuyện với người bán của cửa hàng. |
| Ngoại lệ             | 2.1. Người mua chưa đăng nhập. 2.1.1. Hệ thống thông báo “Vui lòng đăng nhập để tiếp tục”.                      |

###### **_Bảng 1.108. Kịch bản chat từ trang chi tiết sản phẩm_**

| Tên Use case         | Chat từ trang chi tiết sản phẩm                                                                                                                                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Người mua đã đăng nhập và đang ở trang chi tiết sản phẩm.                                                                                                                                                                                       |
| Hậu điều kiện        | Khung trò chuyện được mở kèm thẻ sản phẩm.                                                                                                                                                                                                      |
| Kịch bản chính       | 1\. Người mua nhấn “Chat với người bán” tại trang chi tiết sản phẩm. 2\. Hệ thống mở khung trò chuyện và tự đính kèm thẻ sản phẩm đang xem. 3\. Người mua nhập câu hỏi và nhấn “Gửi”. 4\. Hệ thống gửi tin nhắn kèm thẻ sản phẩm tới người bán. |
| Ngoại lệ             | 2.1. Người mua chưa đăng nhập. 2.1.1. Hệ thống thông báo “Vui lòng đăng nhập để tiếp tục”.                                                                                                                                                      |

###### **_Bảng 1.109. Kịch bản cài đặt tin nhắn phản hồi tự động_**

| Tên Use case         | Cài đặt tin nhắn phản hồi tự động                                                                                                                                                                                                                                                                                                   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                                             |
| Hậu điều kiện        | Tin nhắn phản hồi tự động được lưu.                                                                                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người bán vào “Cài đặt chat” và chọn “Phản hồi tự động”. 2\. Hệ thống hiển thị trạng thái bật/tắt và nội dung phản hồi hiện tại. 3\. Người bán bật phản hồi tự động, nhập nội dung “Shop sẽ phản hồi trong 30 phút” và nhấn “Lưu”. 4\. Hệ thống lưu thiết lập và tự gửi nội dung này khi người mua nhắn tin lần đầu trong ngày. |
| Ngoại lệ             | 4.1. Nội dung phản hồi trống. 4.1.1. Hệ thống thông báo “Vui lòng nhập nội dung phản hồi”.                                                                                                                                                                                                                                          |

###### **_Bảng 1.110. Kịch bản xem danh sách danh mục_**

| Tên Use case         | Xem danh sách danh mục                                                                                             |
| :------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                          |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                            |
| Hậu điều kiện        | Người bán xem được danh sách danh mục.                                                                             |
| Kịch bản chính       | 1\. Người bán vào “Quản lý danh mục”. 2\. Hệ thống hiển thị danh sách danh mục kèm số sản phẩm trong mỗi danh mục. |
| Ngoại lệ             | Không có.                                                                                                          |

###### **_Bảng 1.111. Kịch bản thêm danh mục_**

| Tên Use case         | Thêm danh mục                                                                                                                                                                                                                         |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                             |
| Điều kiện tiên quyết | Người bán đang xem danh sách danh mục.                                                                                                                                                                                                |
| Hậu điều kiện        | Danh mục mới được lưu.                                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người bán nhấn “Thêm danh mục”. 2\. Hệ thống hiển thị biểu mẫu nhập tên danh mục và chọn sản phẩm. 3\. Người bán nhập tên “Ghế thư giãn”, chọn 5 sản phẩm và nhấn “Lưu”. 4\. Hệ thống lưu danh mục mới và hiển thị lại danh sách. |
| Ngoại lệ             | 4.1. Tên danh mục trống hoặc đã tồn tại. 4.1.1. Hệ thống thông báo “Tên danh mục không hợp lệ”.                                                                                                                                       |

Bảng 1.112. Kịch bản sửa danh mục

| Tên Use case         | Sửa danh mục                                                                                                                                                                                                                        |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                           |
| Điều kiện tiên quyết | Cửa hàng có ít nhất một danh mục.                                                                                                                                                                                                   |
| Hậu điều kiện        | Danh mục được cập nhật.                                                                                                                                                                                                             |
| Kịch bản chính       | 1\. Người bán nhấn “Sửa” tại một danh mục. 2\. Hệ thống hiển thị biểu mẫu chứa tên và danh sách sản phẩm hiện tại. 3\. Người bán đổi tên, thêm hoặc bỏ sản phẩm và nhấn “Lưu”. 4\. Hệ thống lưu thay đổi và hiển thị lại danh sách. |
| Ngoại lệ             | 4.1. Tên danh mục trống hoặc đã tồn tại. 4.1.1. Hệ thống thông báo “Tên danh mục không hợp lệ”.                                                                                                                                     |

###### **_Bảng 1.113. Kịch bản xóa danh mục_**

| Tên Use case         | Xóa danh mục                                                                                                                                                                               |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                  |
| Điều kiện tiên quyết | Cửa hàng có ít nhất một danh mục.                                                                                                                                                          |
| Hậu điều kiện        | Danh mục bị xóa, sản phẩm trong danh mục không bị xóa.                                                                                                                                     |
| Kịch bản chính       | 1\. Người bán nhấn “Xóa” tại một danh mục. 2\. Hệ thống hiển thị hộp thoại xác nhận xóa. 3\. Người bán nhấn “Đồng ý”. 4\. Hệ thống xóa danh mục khỏi danh sách và giữ nguyên các sản phẩm. |
| Ngoại lệ             | Không có.                                                                                                                                                                                  |

###### **_Bảng 1.114. Kịch bản xem báo cáo kinh doanh_**

| Tên Use case         | Xem báo cáo kinh doanh                                                                                                                                                                                                                         |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                        |
| Hậu điều kiện        | Người bán xem được báo cáo kinh doanh.                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người bán vào “Báo cáo kinh doanh”. 2\. Hệ thống hiển thị báo cáo tài chính (doanh thu thực nhận, tiền tạm giữ, phí sàn), báo cáo vận hành (tổng đơn, đơn giao, đơn hủy, tỷ lệ hoàn) và báo cáo tăng trưởng (doanh thu, số đơn theo ngày). |
| Ngoại lệ             | 2.1. Cửa hàng chưa có đơn hàng nào. 2.1.1. Hệ thống hiển thị các chỉ số bằng 0 và thông báo “Chưa có dữ liệu”.                                                                                                                                 |

###### **_Bảng 1.115. Kịch bản lọc theo mốc thời gian_**

| Tên Use case         | Lọc theo mốc thời gian                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Người bán đang xem báo cáo kinh doanh.                                                                                                                                                                                           |
| Hậu điều kiện        | Báo cáo được cập nhật theo mốc thời gian.                                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người bán chọn mốc “30 ngày qua”. 2\. Hệ thống cập nhật toàn bộ báo cáo theo 30 ngày gần nhất. 3\. Người bán chọn khoảng tùy chọn từ 01/09/2026 đến 30/09/2026. 4\. Hệ thống cập nhật báo cáo theo khoảng thời gian đã chọn. |
| Ngoại lệ             | 4.1. Khoảng thời gian không hợp lệ. 4.1.1. Hệ thống thông báo “Khoảng thời gian không hợp lệ, vui lòng chọn lại”.                                                                                                                |

###### **_Bảng 1.116. Kịch bản xem top 5 sản phẩm_**

| Tên Use case         | Xem top 5 sản phẩm                                                                                                          |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                   |
| Điều kiện tiên quyết | Người bán đang xem báo cáo kinh doanh.                                                                                      |
| Hậu điều kiện        | Người bán xem được 5 sản phẩm bán chạy nhất.                                                                                |
| Kịch bản chính       | 1\. Người bán chọn mục “Top sản phẩm”. 2\. Hệ thống hiển thị 5 sản phẩm có doanh số cao nhất trong mốc thời gian đang chọn. |
| Ngoại lệ             | Không có.                                                                                                                   |

###### **_Bảng 1.117. Kịch bản xuất báo cáo ra Excel_**

| Tên Use case         | Xuất báo cáo ra Excel                                                                                             |
| :------------------- | :---------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                         |
| Điều kiện tiên quyết | Người bán đang xem báo cáo kinh doanh.                                                                            |
| Hậu điều kiện        | Tệp Excel báo cáo được tải về.                                                                                    |
| Kịch bản chính       | 1\. Người bán nhấn “Xuất Excel”. 2\. Hệ thống tạo tệp Excel theo mốc thời gian đang chọn và tải về máy người bán. |
| Ngoại lệ             | 2.1. Không có dữ liệu trong mốc thời gian đang chọn. 2.1.1. Hệ thống thông báo “Không có dữ liệu để xuất”.        |

###### **_Bảng 1.118. Kịch bản lọc thống kê theo mốc thời gian_**

| Tên Use case         | Lọc thống kê theo mốc thời gian                                                                                                                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Nhân viên sàn đã đăng nhập.                                                                                                                                                                                          |
| Hậu điều kiện        | Thống kê được cập nhật theo mốc thời gian.                                                                                                                                                                           |
| Kịch bản chính       | 1\. Nhân viên sàn vào “Thống kê sàn”. 2\. Hệ thống hiển thị thống kê từ khi sàn bắt đầu vận hành tới hiện tại. 3\. Nhân viên sàn chọn mốc “7 ngày qua”. 4\. Hệ thống cập nhật toàn bộ thống kê theo 7 ngày gần nhất. |
| Ngoại lệ             | 4.1. Khoảng thời gian tùy chọn không hợp lệ. 4.1.1. Hệ thống thông báo “Khoảng thời gian không hợp lệ, vui lòng chọn lại”.                                                                                           |

###### **_Bảng 1.119. Kịch bản xem thống kê tài chính_**

| Tên Use case         | Xem thống kê tài chính                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                     |
| Điều kiện tiên quyết | Nhân viên sàn đang ở trang thống kê sàn.                                                                                                          |
| Hậu điều kiện        | Nhân viên sàn xem được thống kê tài chính.                                                                                                        |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Tài chính”. 2\. Hệ thống hiển thị tổng giá trị giao dịch và tổng tiền trong ví người mua, người bán dưới dạng con số. |
| Ngoại lệ             | Không có.                                                                                                                                         |

###### **_Bảng 1.120. Kịch bản xem thống kê vận hành_**

| Tên Use case         | Xem thống kê vận hành                                                                                                  |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                          |
| Điều kiện tiên quyết | Nhân viên sàn đang ở trang thống kê sàn.                                                                               |
| Hậu điều kiện        | Nhân viên sàn xem được thống kê vận hành.                                                                              |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Vận hành”. 2\. Hệ thống hiển thị tổng số đơn hàng và tỷ lệ hủy đơn dưới dạng biểu đồ quạt. |
| Ngoại lệ             | Không có.                                                                                                              |

###### **_Bảng 1.121. Kịch bản xem thống kê tăng trưởng_**

| Tên Use case         | Xem thống kê tăng trưởng                                                                                                                                                                        |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                                                                                   |
| Điều kiện tiên quyết | Nhân viên sàn đang ở trang thống kê sàn.                                                                                                                                                        |
| Hậu điều kiện        | Nhân viên sàn xem được thống kê tăng trưởng.                                                                                                                                                    |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Tăng trưởng”. 2\. Hệ thống hiển thị tổng số người dùng, tổng số cửa hàng và số người dùng không truy cập trong sáu tháng liên tục dưới dạng biểu đồ cột hoặc đường. |
| Ngoại lệ             | Không có.                                                                                                                                                                                       |

###### **_Bảng 1.122. Kịch bản xem xếp hạng sản phẩm và cửa hàng_**

| Tên Use case         | Xem xếp hạng sản phẩm và cửa hàng                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Nhân viên sàn                                                                                                                    |
| Điều kiện tiên quyết | Nhân viên sàn đang ở trang thống kê sàn.                                                                                         |
| Hậu điều kiện        | Nhân viên sàn xem được bảng xếp hạng.                                                                                            |
| Kịch bản chính       | 1\. Nhân viên sàn chọn mục “Xếp hạng”. 2\. Hệ thống hiển thị bảng sản phẩm bán chạy nhất và bảng cửa hàng có doanh thu cao nhất. |
| Ngoại lệ             | Không có.                                                                                                                        |

#### **_c) Giai đoạn 3_**

###### **_Bảng 1.123. Kịch bản báo cáo vi phạm_**

| Tên Use case         | Báo cáo vi phạm                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                 |
| Điều kiện tiên quyết | Người dùng đã đăng nhập.                                                                                                                                                                                                                                                                                                             |
| Hậu điều kiện        | Báo cáo vi phạm được gửi tới sàn.                                                                                                                                                                                                                                                                                                    |
| Kịch bản chính       | 1\. Người dùng nhấn “Báo cáo” tại trang sản phẩm, trang cửa hàng hoặc hồ sơ người dùng. 2\. Hệ thống hiển thị biểu mẫu gồm loại vi phạm, mô tả và ô tải lên bằng chứng. 3\. Người dùng chọn loại vi phạm “Hàng giả”, nhập mô tả, tải ảnh và nhấn “Gửi”. 4\. Hệ thống ghi nhận báo cáo và thông báo “Đã gửi báo cáo, sàn sẽ xem xét”. |
| Ngoại lệ             | 4.1. Đã có báo cáo chờ xử lý cho cùng đối tượng. 4.1.1. Hệ thống thông báo “Bạn đã báo cáo đối tượng này, vui lòng chờ kết quả xử lý”.                                                                                                                                                                                               |

###### **_Bảng 1.124. Kịch bản gửi khiếu nại_**

| Tên Use case         | Gửi khiếu nại                                                                                                                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Người dùng đã đăng nhập và có đơn hàng liên quan.                                                                                                                                                                                                                                                                         |
| Hậu điều kiện        | Khiếu nại được gửi tới sàn.                                                                                                                                                                                                                                                                                               |
| Kịch bản chính       | 1\. Người dùng vào “Khiếu nại” và chọn “Tạo khiếu nại”. 2\. Hệ thống hiển thị biểu mẫu gồm đơn hàng liên quan, nội dung khiếu nại và ô tải lên bằng chứng. 3\. Người dùng chọn đơn hàng, nhập nội dung, tải bằng chứng và nhấn “Gửi”. 4\. Hệ thống ghi nhận khiếu nại, gửi tới nhân viên sàn và thông báo cho người dùng. |
| Ngoại lệ             | 4.1. Thiếu nội dung khiếu nại. 4.1.1. Hệ thống thông báo “Vui lòng nhập nội dung khiếu nại”.                                                                                                                                                                                                                              |

###### **_Bảng 1.125. Kịch bản bổ sung thông tin khiếu nại, báo cáo_**

| Tên Use case         | Bổ sung thông tin khiếu nại, báo cáo                                                                                                                                                                                                                              |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Khiếu nại hoặc báo cáo đang chờ xử lý.                                                                                                                                                                                                                            |
| Hậu điều kiện        | Thông tin khiếu nại, báo cáo được cập nhật.                                                                                                                                                                                                                       |
| Kịch bản chính       | 1\. Người dùng mở một khiếu nại đang chờ xử lý và nhấn “Bổ sung thông tin”. 2\. Hệ thống hiển thị ô nhập nội dung bổ sung và ô tải tệp. 3\. Người dùng nhập nội dung, tải thêm ảnh và nhấn “Gửi”. 4\. Hệ thống cập nhật thông tin và thông báo cho nhân viên sàn. |
| Ngoại lệ             | 2.1. Khiếu nại đã được xử lý xong. 2.1.1. Hệ thống thông báo “Khiếu nại đã đóng, không thể bổ sung”.                                                                                                                                                              |

###### **_Bảng 1.126. Kịch bản xem lịch sử khiếu nại, báo cáo_**

| Tên Use case         | Xem lịch sử khiếu nại, báo cáo                                                                                                                                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                             |
| Điều kiện tiên quyết | Người dùng đã đăng nhập.                                                                                                                                                                                         |
| Hậu điều kiện        | Người dùng xem được lịch sử khiếu nại, báo cáo.                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người dùng vào “Lịch sử khiếu nại, báo cáo”. 2\. Hệ thống hiển thị danh sách khiếu nại, báo cáo kèm trạng thái xử lý. 3\. Người dùng chọn một mục. 4\. Hệ thống hiển thị chi tiết nội dung và kết quả xử lý. |
| Ngoại lệ             | 2.1. Người dùng chưa gửi khiếu nại, báo cáo nào. 2.1.1. Hệ thống thông báo “Bạn chưa có khiếu nại, báo cáo nào”.                                                                                                 |

###### **_Bảng 1.127. Kịch bản kích hoạt ví_**

| Tên Use case         | Kích hoạt ví                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người dùng đã đăng nhập, ví chưa được kích hoạt.                                                                                                                                                                                                                                                                                      |
| Hậu điều kiện        | Ví được kích hoạt với mã PIN.                                                                                                                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người dùng vào “Ví điện tử” và nhấn “Kích hoạt ví”. 2\. Hệ thống gửi mã xác nhận tới email và hiển thị ô nhập mã. 3\. Người dùng nhập mã xác nhận. 4\. Hệ thống xác thực mã và hiển thị biểu mẫu tạo mã PIN. 5\. Người dùng nhập mã PIN 6 chữ số, nhập lại và nhấn “Xác nhận”. 6\. Hệ thống lưu mã PIN đã mã hóa và kích hoạt ví. |
| Ngoại lệ             | 4.1. Mã xác nhận sai hoặc hết hạn. 4.1.1. Hệ thống thông báo “Mã xác nhận không đúng hoặc đã hết hạn”. 6.1. Hai mã PIN không khớp hoặc không đủ 6 chữ số. 6.1.1. Hệ thống thông báo “Mã PIN không hợp lệ”.                                                                                                                            |

###### **_Bảng 1.128. Kịch bản xem số dư và lịch sử giao dịch_**

| Tên Use case         | Xem số dư và lịch sử giao dịch                                                                                                                                                                                         |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                   |
| Điều kiện tiên quyết | Ví đã được kích hoạt.                                                                                                                                                                                                  |
| Hậu điều kiện        | Người dùng xem được số dư và lịch sử giao dịch.                                                                                                                                                                        |
| Kịch bản chính       | 1\. Người dùng vào “Ví điện tử”. 2\. Hệ thống hiển thị trạng thái ví và số dư khả dụng. 3\. Người dùng chọn “Lịch sử giao dịch”. 4\. Hệ thống hiển thị danh sách giao dịch gồm loại, số tiền, thời gian và trạng thái. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                              |

###### **_Bảng 1.129. Kịch bản liên kết tài khoản ngân hàng_**

| Tên Use case         | Liên kết tài khoản ngân hàng                                                                                                                                                                                                |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Ví đã được kích hoạt.                                                                                                                                                                                                       |
| Hậu điều kiện        | Tài khoản ngân hàng được liên kết với ví.                                                                                                                                                                                   |
| Kịch bản chính       | 1\. Người dùng chọn “Liên kết ngân hàng”. 2\. Hệ thống hiển thị biểu mẫu gồm ngân hàng, số tài khoản và tên chủ tài khoản. 3\. Người dùng nhập thông tin và nhấn “Liên kết”. 4\. Hệ thống lưu liên kết tài khoản ngân hàng. |
| Ngoại lệ             | 4.1. Tên chủ tài khoản không khớp với số tài khoản. 4.1.1. Hệ thống thông báo “Thông tin tài khoản ngân hàng không hợp lệ”.                                                                                                 |

###### **_Bảng 1.130. Kịch bản nạp tiền vào ví_**

| Tên Use case         | Nạp tiền vào ví                                                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                                                      |
| Điều kiện tiên quyết | Ví đã được kích hoạt và không bị khóa.                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Số dư ví được cộng thêm.                                                                                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người dùng chọn “Nạp tiền” và nhập số tiền 1.000.000đ. 2\. Hệ thống tạo phiên thanh toán và hiển thị mã QR chuyển khoản. 3\. Người dùng quét mã QR và chuyển khoản. 4\. Hệ thống nhận xác nhận từ ngân hàng, cộng tiền vào số dư ví và gửi thông báo biến động số dư. |
| Ngoại lệ             | 2.1. Ví đang bị khóa. 2.1.1. Hệ thống thông báo “Ví đang bị khóa, không thể nạp tiền”. 4.1. Giao dịch ngân hàng thất bại hoặc quá thời hạn. 4.1.1. Hệ thống thông báo “Nạp tiền không thành công”.                                                                        |

###### **_Bảng 1.131. Kịch bản rút tiền khỏi ví_**

| Tên Use case         | Rút tiền khỏi ví                                                                                                                                                                                          |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                      |
| Điều kiện tiên quyết | Ví đã kích hoạt và đã liên kết tài khoản ngân hàng.                                                                                                                                                       |
| Hậu điều kiện        | Tiền được chuyển về tài khoản ngân hàng đã liên kết.                                                                                                                                                      |
| Kịch bản chính       | 1\. Người dùng chọn “Rút tiền” và nhập số tiền. 2\. Hệ thống hiển thị ô nhập mã PIN. 3\. Người dùng nhập mã PIN. 4\. Hệ thống trừ số dư, chuyển tiền về tài khoản ngân hàng đã liên kết và gửi thông báo. |
| Ngoại lệ             | 4.1. Mã PIN không đúng. 4.1.1. Hệ thống thông báo “Mã PIN không đúng”; nếu sai quá 5 lần liên tiếp thì khóa ví trong 30 phút. 4.2. Số dư không đủ. 4.2.1. Hệ thống thông báo “Số dư ví không đủ để rút”.  |

###### **_Bảng 1.132. Kịch bản đổi mã PIN_**

| Tên Use case         | Đổi mã PIN                                                                                                                                                                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Ví đã được kích hoạt.                                                                                                                                                                                                                       |
| Hậu điều kiện        | Mã PIN của ví được thay đổi.                                                                                                                                                                                                                |
| Kịch bản chính       | 1\. Người dùng chọn “Đổi mã PIN”. 2\. Hệ thống hiển thị biểu mẫu gồm mã PIN cũ, mã PIN mới và xác nhận mã PIN mới. 3\. Người dùng nhập đủ ba trường và nhấn “Lưu”. 4\. Hệ thống kiểm tra mã PIN cũ, lưu mã PIN mới và thông báo thành công. |
| Ngoại lệ             | 4.1. Mã PIN cũ không đúng hoặc mã PIN mới không khớp. 4.1.1. Hệ thống thông báo “Mã PIN không hợp lệ”.                                                                                                                                      |

###### **_Bảng 1.133. Kịch bản khôi phục mã PIN_**

| Tên Use case         | Khôi phục mã PIN                                                                                                                                                                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                               |
| Điều kiện tiên quyết | Ví đã được kích hoạt và người dùng quên mã PIN.                                                                                                                                                                                    |
| Hậu điều kiện        | Mã PIN mới được thiết lập.                                                                                                                                                                                                         |
| Kịch bản chính       | 1\. Người dùng chọn “Quên mã PIN”. 2\. Hệ thống gửi mã xác nhận tới email và hiển thị ô nhập mã. 3\. Người dùng nhập mã xác nhận, mã PIN mới và nhấn “Xác nhận”. 4\. Hệ thống xác thực mã, lưu mã PIN mới và thông báo thành công. |
| Ngoại lệ             | 4.1. Mã xác nhận sai hoặc hết hạn. 4.1.1. Hệ thống thông báo “Mã xác nhận không đúng hoặc đã hết hạn”.                                                                                                                             |

###### **_Bảng 1.134. Kịch bản khóa ví_**

| Tên Use case         | Khóa ví                                                                                                                                                                                                                             |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người mua, Người bán                                                                                                                                                                                                                |
| Điều kiện tiên quyết | Ví đang hoạt động.                                                                                                                                                                                                                  |
| Hậu điều kiện        | Ví bị khóa, mọi giao dịch qua ví bị chặn.                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người dùng chọn “Khóa ví”. 2\. Hệ thống hiển thị hộp thoại xác nhận và ô nhập mã PIN. 3\. Người dùng nhập mã PIN và nhấn “Xác nhận”. 4\. Hệ thống chuyển ví sang trạng thái đã khóa và chặn các giao dịch thanh toán, nạp tiền. |
| Ngoại lệ             | 4.1. Mã PIN không đúng. 4.1.1. Hệ thống thông báo “Mã PIN không đúng”.                                                                                                                                                              |

###### **_Bảng 1.135. Kịch bản tạo voucher_**

| Tên Use case         | Tạo voucher                                                                                                                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                       |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                                                         |
| Hậu điều kiện        | Voucher của cửa hàng được tạo.                                                                                                                                                                                                                                                                                  |
| Kịch bản chính       | 1\. Người bán vào “Marketing” và chọn “Voucher”. 2\. Hệ thống hiển thị danh sách voucher và nút “Tạo voucher”. 3\. Người bán nhấn “Tạo voucher”, nhập mã “GIAM10”, mức giảm 10%, đơn tối thiểu 3.000.000đ, số lượng 100, thời gian áp dụng và nhấn “Lưu”. 4\. Hệ thống lưu voucher và hiển thị trong danh sách. |
| Ngoại lệ             | 4.1. Mã voucher đã tồn tại hoặc thời gian áp dụng không hợp lệ. 4.1.1. Hệ thống thông báo “Thông tin voucher không hợp lệ”.                                                                                                                                                                                     |

###### **_Bảng 1.136. Kịch bản cập nhật, kết thúc voucher_**

| Tên Use case         | Cập nhật, kết thúc voucher                                                                                                                                                                                                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Cửa hàng có ít nhất một voucher.                                                                                                                                                                                                                                                                     |
| Hậu điều kiện        | Voucher được cập nhật hoặc kết thúc.                                                                                                                                                                                                                                                                 |
| Kịch bản chính       | 1\. Người bán nhấn “Sửa” tại một voucher. 2\. Hệ thống hiển thị thông tin hiện tại của voucher. 3\. Người bán tăng số lượng lên 200 và nhấn “Lưu”. 4\. Hệ thống lưu thay đổi. 5\. Người bán nhấn “Kết thúc” tại một voucher đang chạy. 6\. Hệ thống dừng voucher và không cho người mua áp dụng nữa. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                            |

###### **_Bảng 1.137. Kịch bản thiết lập livestream_**

| Tên Use case         | Thiết lập livestream                                                                                                                                                                                                                                                                 |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                            |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                              |
| Hậu điều kiện        | Phiên livestream được tạo.                                                                                                                                                                                                                                                           |
| Kịch bản chính       | 1\. Người bán chọn “Livestream” và nhấn “Tạo phiên live”. 2\. Hệ thống hiển thị biểu mẫu gồm tiêu đề, ảnh bìa và thời gian bắt đầu. 3\. Người bán nhập tiêu đề “Xả kho sofa cuối năm”, tải ảnh bìa và nhấn “Bắt đầu”. 4\. Hệ thống tạo phiên livestream và hiển thị khung phát sóng. |
| Ngoại lệ             | 4.1. Thiếu tiêu đề hoặc ảnh bìa không hợp lệ. 4.1.1. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin phiên live”.                                                                                                                                                                 |

###### **_Bảng 1.138. Kịch bản gắn sản phẩm vào livestream_**

| Tên Use case         | Gắn sản phẩm vào livestream                                                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                     |
| Điều kiện tiên quyết | Phiên livestream đang diễn ra.                                                                                                                                                                                                                |
| Hậu điều kiện        | Sản phẩm được ghim trong livestream.                                                                                                                                                                                                          |
| Kịch bản chính       | 1\. Người bán nhấn “Thêm sản phẩm” trong khung livestream. 2\. Hệ thống hiển thị danh sách sản phẩm đang bán của cửa hàng. 3\. Người bán chọn 3 sản phẩm và nhấn “Ghim”. 4\. Hệ thống hiển thị các sản phẩm đã ghim cho người xem livestream. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                     |

###### **_Bảng 1.139. Kịch bản quản lý nội dung livestream_**

| Tên Use case         | Quản lý nội dung livestream                                                                                                                                                                                                                                                                                            |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                                                              |
| Điều kiện tiên quyết | Phiên livestream đang diễn ra.                                                                                                                                                                                                                                                                                         |
| Hậu điều kiện        | Nội dung livestream được cập nhật.                                                                                                                                                                                                                                                                                     |
| Kịch bản chính       | 1\. Người bán xem khung bình luận của livestream. 2\. Hệ thống hiển thị bình luận của người xem theo thời gian thực. 3\. Người bán ẩn một bình luận vi phạm. 4\. Hệ thống ẩn bình luận khỏi khung chat của người xem. 5\. Người bán nhấn “Kết thúc live”. 6\. Hệ thống dừng phát sóng và lưu lại video của phiên live. |
| Ngoại lệ             | Không có.                                                                                                                                                                                                                                                                                                              |

###### **_Bảng 1.140. Kịch bản đăng bài viết_**

| Tên Use case         | Đăng bài viết                                                                                                                                                                                                                                                              |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                                                                                                                                  |
| Điều kiện tiên quyết | Người bán đã đăng nhập.                                                                                                                                                                                                                                                    |
| Hậu điều kiện        | Bài viết được đăng và hiển thị.                                                                                                                                                                                                                                            |
| Kịch bản chính       | 1\. Người bán chọn “Bài viết” và nhấn “Tạo bài viết”. 2\. Hệ thống hiển thị trình soạn thảo gồm nội dung, ảnh, video và sản phẩm đính kèm. 3\. Người bán nhập nội dung, tải video, gắn sản phẩm và nhấn “Đăng”. 4\. Hệ thống lưu và hiển thị bài viết trên trang cửa hàng. |
| Ngoại lệ             | 4.1. Video không đúng định dạng hoặc vượt dung lượng. 4.1.1. Hệ thống thông báo “Video không hợp lệ”.                                                                                                                                                                      |

###### **_Bảng 1.141. Kịch bản theo dõi hiệu quả marketing_**

| Tên Use case         | Theo dõi hiệu quả marketing                                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tác nhân chính       | Người bán                                                                                                                                                      |
| Điều kiện tiên quyết | Cửa hàng đã có ít nhất một chương trình marketing.                                                                                                             |
| Hậu điều kiện        | Người bán xem được hiệu quả marketing.                                                                                                                         |
| Kịch bản chính       | 1\. Người bán chọn “Hiệu quả marketing”. 2\. Hệ thống hiển thị số lượt dùng voucher, lượt xem livestream, lượt xem bài viết và doanh thu từ từng chương trình. |
| Ngoại lệ             | Không có.                                                                                                                                                      |

### **1.2.5. Xây dựng biểu đồ hoạt động**

### **1.2.6. Xây dựng giao diện sơ bộ**

###

# **CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG**

## **2.1. Phân tích tĩnh**

### **2.1.1. Xác định các lớp**

    Để xác định các lớp thực thể của hệ thống sàn thương mại điện tử chuyên biệt cho mặt hàng nội thất, sử dụng kỹ thuật trích danh từ từ các ca sử dụng và kịch bản tương ứng. Dựa trên các chức năng của ba tác nhân chính gồm Người mua, Người bán và Quản trị sàn, các danh từ thu được bao gồm:

Sàn thương mại điện tử, Người dùng, Người mua, Người bán, Nhân viên sàn, Tài khoản, Mã tài khoản, Họ tên, Ngày sinh, Giới tính, Email, Số điện thoại, Mật khẩu, Địa chỉ, Trạng thái tài khoản, Cửa hàng, Mã cửa hàng, Tên cửa hàng, Mô tả cửa hàng, Hình ảnh cửa hàng, Trạng thái cửa hàng, Sản phẩm, Mã sản phẩm, Tên sản phẩm, Mô tả sản phẩm, Hình ảnh sản phẩm, Giá bán, Số lượng tồn kho, Trạng thái sản phẩm, Biến thể sản phẩm, Màu sắc, Kích thước, Chất liệu, Danh mục sản phẩm, Mã danh mục, Tên danh mục, Danh mục cha, Danh mục con, Giỏ hàng, Chi tiết giỏ hàng, Số lượng sản phẩm, Đơn hàng, Mã đơn hàng, Ngày đặt hàng, Tổng tiền, Trạng thái đơn hàng, Chi tiết đơn hàng, Phương thức thanh toán, Giao dịch thanh toán, Mã giao dịch, Số tiền giao dịch, Trạng thái thanh toán, Ví điện tử, Số dư ví, Lịch sử giao dịch, Đánh giá sản phẩm, Điểm đánh giá, Nội dung nhận xét, Voucher, Mã voucher, Giá trị giảm giá, Điều kiện áp dụng, Thời gian bắt đầu, Thời gian kết thúc, Chương trình khuyến mãi, Livestream, Thời gian livestream, Bài viết, Nội dung bài viết, Banner, Quảng cáo, Thông báo, Tin nhắn, Cuộc trò chuyện, Yêu cầu hoàn hàng, Lý do hoàn hàng, Khiếu nại, Nội dung khiếu nại, Báo cáo vi phạm, Lý do báo cáo, Trạng thái xử lý, Lịch sử xử lý, Doanh thu, Thống kê bán hàng và Lịch sử hoạt động.  
Tiếp theo, tiến hành loại bỏ các danh từ nằm ngoài phạm vi hệ thống, các danh từ hoặc cụm từ trùng lặp, cũng như các danh từ chỉ thuộc tính thay vì đại diện cho một thực thể độc lập.

- Các danh từ chỉ thông tin cá nhân như họ tên, ngày sinh, giới tính, email, số điện thoại, mật khẩu và địa chỉ được xem là thuộc tính của lớp Người dùng hoặc các lớp liên quan, không cần xây dựng thành lớp thực thể riêng.
- Các danh từ chỉ thông tin sản phẩm như tên sản phẩm, mô tả, hình ảnh, giá bán, màu sắc, kích thước và chất liệu được xem là thuộc tính của lớp Sản phẩm hoặc Biến thể sản phẩm, tùy theo cách tổ chức dữ liệu.
- Các danh từ chỉ thông tin cửa hàng như tên cửa hàng, mô tả, hình ảnh và trạng thái cửa hàng được xem là thuộc tính của lớp Cửa hàng.
- Các danh từ chỉ thông tin danh mục như mã danh mục, tên danh mục và trạng thái danh mục được xem là thuộc tính của lớp Danh mục sản phẩm. Quan hệ danh mục cha và danh mục con được thể hiện bằng mối quan hệ giữa các danh mục.
- Các danh từ chỉ thông tin đơn hàng như ngày đặt hàng, tổng tiền và trạng thái đơn hàng được xem là thuộc tính của lớp Đơn hàng. Số lượng và đơn giá của từng sản phẩm trong đơn hàng được lưu trong lớp Chi tiết đơn hàng.
- Các danh từ chỉ thông tin thanh toán như số tiền giao dịch, phương thức thanh toán và trạng thái thanh toán được phân bổ vào các lớp Giao dịch thanh toán hoặc Đơn hàng tùy theo ý nghĩa nghiệp vụ.
- Các danh từ chỉ thông tin đánh giá, khiếu nại và báo cáo như điểm đánh giá, nội dung nhận xét, lý do khiếu nại và trạng thái xử lý được xem là thuộc tính của các lớp Đánh giá sản phẩm, Khiếu nại và Báo cáo vi phạm tương ứng.
- Các danh từ mang tính khái quát hoặc chỉ kết quả tổng hợp như Sàn thương mại điện tử, Doanh thu và Thống kê bán hàng không nhất thiết phải trở thành lớp thực thể độc lập. Doanh thu và thống kê có thể được tính toán từ dữ liệu đơn hàng, giao dịch và hoạt động kinh doanh; chỉ xây dựng lớp riêng khi có yêu cầu lưu trữ hoặc quản lý cụ thể.
- Các danh từ chỉ thao tác hoặc hành động như quản lý, tìm kiếm, cập nhật, phê duyệt, kiểm duyệt và xử lý không phải là lớp thực thể. Chúng thường được biểu diễn dưới dạng chức năng hoặc phương thức của hệ thống.

Sau khi loại bỏ các danh từ trùng lặp, các thuộc tính và các khái niệm không phù hợp với phạm vi hệ thống, những danh từ sau được xác định là các ứng viên lớp thực thể:

1. Người dùng (User)
2. Cửa hàng (Shop)
3. Sản phẩm (Product)
4. Biến thể sản phẩm (ProductVariant)
5. Danh mục sản phẩm (Category)
6. Giỏ hàng (Cart)
7. Đơn hàng (Order)
8. Giao dịch thanh toán (PaymentTransaction)
9. Ví điện tử (Wallet)
10. Giao dịch ví (WalletTransaction)
11. Đánh giá sản phẩm (ProductReview)
12. Voucher (Voucher)
13. Chương trình khuyến mãi (Promotion)
14. Livestream (Livestream)
15. Bài viết (Post)
16. Quảng cáo (Advertisement)
17. Thông báo (Notification)
18. Tin nhắn (Message)
19. Yêu cầu hoàn hàng (ReturnRequest)
20. Khiếu nại (Complaint)
21. Báo cáo vi phạm (ViolationReport)
22. Lịch sử xử lý (ProcessingHistory)
23. Cấu hình sàn (Config)

### **2.1.2. Xác định quan hệ giữa các lớp**

![][image26]

##### **_Hình 2.1. Biểu đồ_**

#### **_a) Nhóm người dùng và tài khoản_**

Người mua, Người bán, Nhân viên sàn kế thừa Người dùng. Ba tác nhân có chung các thuộc tính tài khoản như email, mật khẩu, họ tên, số điện thoại và trạng thái tài khoản. Vì vậy các thuộc tính này được đặt ở lớp cha Người dùng. Mỗi lớp con bổ sung thông tin và hành vi riêng theo vai trò.

- Người mua – Ví điện tử (1 – 0..1): mỗi người mua sở hữu tối đa một ví. Ví chỉ được tạo khi người mua kích hoạt, nên một người mua có thể chưa có ví.
- Người bán – Ví điện tử (1 – 0..1): tương tự, người bán sở hữu tối đa một ví để nhận tiền bán hàng và rút tiền.
- Ví điện tử – Giao dịch ví (1 – 0..\*), quan hệ hợp thành: một ví ghi nhận nhiều giao dịch (nạp, rút, thanh toán, nhận tiền, hoàn tiền). Mỗi giao dịch chỉ thuộc một ví và không tồn tại độc lập với ví đó.

#### **_b) Nhóm cửa hàng và sản phẩm_**

- Người bán – Cửa hàng (1 – 1..\*): người bán sở hữu cửa hàng. Mỗi cửa hàng chỉ có một chủ sở hữu.
- Cửa hàng – Sản phẩm (1 – 0..\*): một cửa hàng đăng bán nhiều sản phẩm. Mỗi sản phẩm chỉ thuộc một cửa hàng. Cửa hàng mới được duyệt có thể chưa có sản phẩm nào.
- Sản phẩm – Biến thể sản phẩm (1 – 1..\*), quan hệ hợp thành: mỗi sản phẩm có ít nhất một biến thể (màu sắc, kích thước, chất liệu). Mỗi biến thể có giá, tồn kho và giá sỉ riêng. Biến thể không tồn tại khi không có sản phẩm, nên đây là quan hệ hợp thành.
- Danh mục – Sản phẩm (1..\* – 0..\*): một sản phẩm thuộc một hoặc nhiều danh mục, một danh mục chứa nhiều sản phẩm.
- Cửa hàng – Voucher (1 – 0..\*): voucher do người bán tạo cho cửa hàng của mình.
- Voucher – Sản phẩm (0..\* – 1..\*): mỗi voucher áp dụng cho một hoặc nhiều sản phẩm. Một sản phẩm có thể được gắn nhiều voucher.

#### **_c) Nhóm mua hàng và thanh toán_**

- Người mua – Giỏ hàng (1 – 1): mỗi người mua có đúng một giỏ hàng.
- Giỏ hàng – Biến thể sản phẩm (0..\* – 0..\*): giỏ hàng chứa nhiều biến thể, mỗi biến thể có thể nằm trong giỏ của nhiều người. Đây là quan hệ nhiều – nhiều có thuộc tính riêng (số lượng). Vì vậy nó được tách thành lớp kết hợp Chi tiết giỏ hàng.
- Người mua – Đơn hàng (1 – 0..\*): người mua tạo nhiều đơn hàng. Mỗi đơn thuộc một người mua.
- Cửa hàng – Đơn hàng (1 – 0..\*): theo quy tắc nghiệp vụ, mỗi cửa hàng trong một lần đặt tạo thành một đơn hàng riêng. Vì vậy mỗi đơn hàng chỉ thuộc một cửa hàng.
- Đơn hàng – Biến thể sản phẩm (0..\* – 1..\*): một đơn hàng gồm một hoặc nhiều biến thể. Quan hệ này cần lưu số lượng và đơn giá tại thời điểm đặt, nên được tách thành lớp kết hợp Chi tiết đơn hàng. Nhờ đó giá trong đơn không bị thay đổi khi người bán sửa giá sản phẩm sau này.
- Người mua – Giao dịch thanh toán (1 – 0..\*): người mua thực hiện các giao dịch thanh toán (chuyển khoản QR, COD).
- Đơn hàng – Giao dịch thanh toán (1 – 0..1): mỗi đơn hàng có tối đa một giao dịch thanh toán. Đơn vừa tạo, chưa thanh toán thì chưa có giao dịch.
- Đơn hàng – Giao dịch ví (1 – 0..1): khi người mua thanh toán bằng ví, hệ thống ghi một giao dịch ví gắn với đơn hàng tương ứng.

#### **_d) Nhóm đánh giá và sau bán hàng_**

- Người mua – Đánh giá sản phẩm (1 – 0..\*) và Sản phẩm – Đánh giá sản phẩm (1 – 0..\*): người mua chỉ đánh giá được sản phẩm đã mua. Mỗi đánh giá gắn với đúng một người mua và một sản phẩm.
- Đơn hàng – Yêu cầu hoàn hàng (1 – 0..1): mỗi đơn hàng có tối đa một yêu cầu hoàn hàng, kèm lý do và bằng chứng.
- Người dùng – Khiếu nại (1 – 0..\*) và Người dùng – Báo cáo vi phạm (1 – 0..\*): người mua và người bán gửi khiếu nại hoặc báo cáo vi phạm. Một báo cáo vi phạm nhắm tới đúng một đối tượng: người dùng, cửa hàng hoặc sản phẩm.
- Lịch sử xử lý: quan hệ hợp thành với Yêu cầu hoàn hàng, Khiếu nại và Báo cáo vi phạm (1 – 0..\*). Mỗi lần xử lý được ghi lại một bản ghi. Quan hệ Nhân viên sàn – Lịch sử xử lý (1 – 0..\*) cho biết nhân viên nào đã thực hiện bước xử lý đó.

#### **_e) Nhóm tương tác và marketing_**

- Người dùng – Tin nhắn (1 – 0..\*): mỗi tin nhắn có một người gửi và một người nhận, đều là người dùng của hệ thống. Nếu muốn nhóm tin nhắn theo hội thoại, có thể bổ sung lớp Cuộc trò chuyện (1 – 0..\* Tin nhắn).
- Người dùng – Thông báo (1 – 0..\*): hệ thống gửi thông báo đến từng người dùng khi có sự kiện về đơn hàng, tiền, hoàn hàng hoặc đánh giá.
- Cửa hàng – Livestream (1 – 0..\*) và Livestream – Sản phẩm (0..\* – 0..\*): người bán tổ chức livestream cho cửa hàng và gắn các sản phẩm giới thiệu trong buổi phát.
- Cửa hàng – Bài viết (1 – 0..\*): người bán đăng bài viết quảng bá cho cửa hàng.
- Nhân viên sàn – Banner, Quảng cáo, Chương trình khuyến mãi (1 – 0..\*): nhân viên sàn quản lý các thành phần trên trang chủ và các chương trình khuyến mãi toàn sàn.
- Chương trình khuyến mãi – Sản phẩm (0..\* – 0..\*): một chương trình áp dụng cho nhiều sản phẩm, một sản phẩm có thể tham gia nhiều chương trình.

### **2.1.3. Xây dựng biểu đồ lớp**

![][image27]

##### **_Hình 2.2. Biểu đồ lớp phân tích tổng quan_**

Mô tả thuộc tính của các lớp

###### **_Bảng 2.1. Lớp NguoiDung (Người dùng) – lớp trừu tượng_**

| Thuộc tính | Mô tả                                        |
| ---------- | -------------------------------------------- |
| userId     | Mã người dùng                                |
| email      | Email đăng nhập, mỗi email chỉ một tài khoản |
| password   | Mật khẩu đăng nhập                           |
| fullName   | Họ tên người dùng                            |
| phone      | Số điện thoại                                |

######

###### **_Bảng 2.2. Lớp NguoiMua (Người mua)_**

| Thuộc tính | Mô tả        |
| ---------- | ------------ |
| buyerId    | Mã người mua |

######

###### **_Bảng 2.3. Lớp NguoiBan (Người bán)_**

| Thuộc tính | Mô tả        |
| ---------- | ------------ |
| sellerId   | Mã người bán |

###### **_Bảng 2.4: Lớp NhanVienSan (Nhân viên sàn)_**

| Thuộc tính | Mô tả        |
| ---------- | ------------ |
| staffId    | Mã nhân viên |
| position   | Chức vụ      |

###### **_Bảng 2.5. Lớp DiaChi (Địa chỉ)_**

| Thuộc tính    | Mô tả                    |
| ------------- | ------------------------ |
| addressId     | Mã địa chỉ               |
| receiverName  | Họ tên người nhận        |
| phone         | Số điện thoại người nhận |
| detailAddress | Địa chỉ chi tiết         |

###### **_Bảng 2.6. Lớp CuaHang (Cửa hàng)_**

| Thuộc tính       | Mô tả                                        |
| ---------------- | -------------------------------------------- |
| shopId           | Mã cửa hàng                                  |
| shopName         | Tên cửa hàng                                 |
| description      | Mô tả cửa hàng                               |
| warehouseAddress | Địa chỉ kho lấy hàng                         |
| status           | Chờ duyệt / Hoạt động / Bị từ chối / Bị khóa |

###### **_Bảng 2.7. Lớp DanhMucSanPham (Danh mục sản phẩm)_**

| Thuộc tính   | Mô tả        |
| ------------ | ------------ |
| categoryId   | Mã danh mục  |
| categoryName | Tên danh mục |

###### **_Bảng 2.8. Lớp SanPham (Sản phẩm)_**

| Thuộc tính  | Mô tả                                     |
| ----------- | ----------------------------------------- |
| productId   | Mã sản phẩm                               |
| productName | Tên sản phẩm                              |
| description | Mô tả chi tiết                            |
| images      | Bộ ảnh sản phẩm                           |
| status      | Chờ duyệt / Đang bán / Bị từ chối / Đã gỡ |

###### **_Bảng 2.9. Lớp BienTheSanPham (Biến thể sản phẩm)_**

| Thuộc tính | Mô tả        |
| ---------- | ------------ |
| variantId  | Mã biến thể  |
| color      | Màu sắc      |
| size       | Kích thước   |
| price      | Giá lẻ       |
| stock      | Số lượng còn |

###### **_Bảng 2.10. Lớp Voucher (Voucher)_**

| Thuộc tính    | Mô tả                          |
| ------------- | ------------------------------ |
| voucherId     | Mã voucher                     |
| code          | Mã người mua nhập khi đặt hàng |
| discountValue | Giá trị giảm                   |
| startDate     | Ngày bắt đầu                   |
| endDate       | Ngày kết thúc                  |

###### **_Bảng 2.11. Lớp GioHang (Giỏ hàng)_**

| Thuộc tính | Mô tả       |
| ---------- | ----------- |
| cartId     | Mã giỏ hàng |

###### **_Bảng 2.12. Lớp ChiTietGioHang (Chi tiết giỏ hàng)_**

| Thuộc tính | Mô tả    |
| ---------- | -------- |
| quantity   | Số lượng |

###### **_Bảng 2.13. Lớp DonHang (Đơn hàng)_**

| Thuộc tính      | Mô tả                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| orderId         | Mã đơn hàng                                                                                                          |
| orderDate       | Thời điểm đặt                                                                                                        |
| status          | Chờ thanh toán / Chờ xác nhận / Đang chuẩn bị / Đang giao / Đã giao / Hoàn thành / Đã hủy / các trạng thái hoàn hàng |
| shippingAddress | Địa chỉ nhận hàng                                                                                                    |
| totalAmount     | Tổng thanh toán                                                                                                      |

###### **_Bảng 2.14. Lớp ChiTietDonHang (Chi tiết đơn hàng)_**

| Thuộc tính | Mô tả           |
| ---------- | --------------- |
| quantity   | Số lượng        |
| unitPrice  | Đơn giá lúc mua |

###### **_Bảng 2.15. Lớp GiaoDichThanhToan (Giao dịch thanh toán)_**

| Thuộc tính    | Mô tả                                                 |
| ------------- | ----------------------------------------------------- |
| transactionId | Mã giao dịch                                          |
| method        | Chuyển khoản QR / COD / Ví điện tử                    |
| amount        | Số tiền                                               |
| status        | Chờ thanh toán / Thành công / Thất bại / Đã hoàn tiền |

###### **_Bảng 2.16. Lớp ViDienTu (Ví điện tử)_**

| Thuộc tính | Mô tả           |
| ---------- | --------------- |
| walletId   | Mã ví           |
| balance    | Số dư khả dụng  |
| pin        | Mã PIN 6 chữ số |

###### **_Bảng 2.17. Lớp GiaoDichVi (Giao dịch ví)_**

| Thuộc tính      | Mô tả                                                    |
| --------------- | -------------------------------------------------------- |
| transactionId   | Mã giao dịch ví                                          |
| type            | Nạp / Rút / Thanh toán / Nhận tiền / Hoàn tiền / Phí sàn |
| amount          | Số tiền                                                  |
| transactionTime | Thời điểm giao dịch                                      |

###### **_Bảng 2.18. Lớp DanhGiaSanPham (Đánh giá sản phẩm)_**

| Thuộc tính | Mô tả             |
| ---------- | ----------------- |
| reviewId   | Mã đánh giá       |
| rating     | Số sao từ 1 đến 5 |
| comment    | Nội dung nhận xét |

###### **_Bảng 2.19. Lớp YeuCauHoanHang (Yêu cầu hoàn hàng)_**

| Thuộc tính | Mô tả                                                              |
| ---------- | ------------------------------------------------------------------ |
| requestId  | Mã yêu cầu                                                         |
| reason     | Hàng lỗi / Bể vỡ / Sai mẫu / Thiếu hàng                            |
| evidence   | Ảnh / video bằng chứng                                             |
| status     | Chờ phản hồi / Đang tranh chấp / Người mua thắng / Người bán thắng |

###### **_Bảng 2:20. Lớp KhieuNai (Khiếu nại)_**

| Thuộc tính  | Mô tả                       |
| ----------- | --------------------------- |
| complaintId | Mã khiếu nại                |
| content     | Nội dung khiếu nại          |
| status      | Mới / Đang xử lý / Đã xử lý |

###### **_Bảng 2.21. Lớp BaoCaoViPham (Báo cáo vi phạm)_**

| Thuộc tính | Mô tả                                                  |
| ---------- | ------------------------------------------------------ |
| reportId   | Mã báo cáo                                             |
| target     | Đối tượng bị báo cáo: người bán / người mua / sản phẩm |
| reason     | Lý do báo cáo                                          |
| status     | Mới / Đang xử lý / Đã xử lý                            |

###### **_Bảng 2.22. Lớp LichSuXuLy (Lịch sử xử lý)_**

| Thuộc tính  | Mô tả           |
| ----------- | --------------- |
| historyId   | Mã lịch sử      |
| result      | Kết quả xử lý   |
| processedAt | Thời điểm xử lý |

###### **_Bảng 2.23. Lớp CuocTroChuyen (Cuộc trò chuyện)_**

| Thuộc tính     | Mô tả              |
| -------------- | ------------------ |
| conversationId | Mã cuộc trò chuyện |

###### **_Bảng 2.24. Lớp TinNhan (Tin nhắn)_**

| Thuộc tính | Mô tả         |
| ---------- | ------------- |
| messageId  | Mã tin nhắn   |
| content    | Nội dung      |
| sentAt     | Thời điểm gửi |

###### **_Bảng 2.25. Lớp ThongBao (Thông báo)_**

| Thuộc tính     | Mô tả        |
| -------------- | ------------ |
| notificationId | Mã thông báo |
| title          | Tiêu đề      |
| content        | Nội dung     |

###### **_Bảng 2.26. Lớp Livestream (Livestream)_**

| Thuộc tính   | Mô tả              |
| ------------ | ------------------ |
| livestreamId | Mã buổi livestream |
| title        | Tiêu đề            |
| startTime    | Thời gian bắt đầu  |

###### **_Bảng 2.27. Lớp BaiViet (Bài viết)_**

| Thuộc tính | Mô tả       |
| ---------- | ----------- |
| postId     | Mã bài viết |
| title      | Tiêu đề     |
| content    | Nội dung    |

###### **_Bảng 2.28. Lớp ChuongTrinhKhuyenMai (Chương trình khuyến mãi)_**

| Thuộc tính      | Mô tả            |
| --------------- | ---------------- |
| promotionId     | Mã chương trình  |
| name            | Tên chương trình |
| discountPercent | Mức giảm (%)     |
| startDate       | Ngày bắt đầu     |
| endDate         | Ngày kết thúc    |

###### **_Bảng 2.30. Lớp Banner (Banner)_**

| Thuộc tính | Mô tả            |
| ---------- | ---------------- |
| bannerId   | Mã banner        |
| image      | Ảnh banner       |
| link       | Liên kết khi bấm |

###### **_Bảng 2.31. Lớp QuangCao (Quảng cáo)_**

| Thuộc tính | Mô tả            |
| ---------- | ---------------- |
| adId       | Mã quảng cáo     |
| title      | Tiêu đề          |
| image      | Ảnh quảng cáo    |
| link       | Liên kết khi bấm |

## **2.2. Phân tích động**

### **2.2.1. Xây dựng biểu đồ tuần tự (Phân tích)**

![][image28]

##### **_Hình 2.6. Biểu đồ tuần tự lớp phân tích người mua tìm kiếm sản phẩm_**

![][image29]

##### **_Hình 2.7. Biểu đồ tuần tự lớp phân tích người mua xem chi tiết sản phẩm_**

![][image30]

##### **_Hình 2.8. Biểu đồ tuần tự lớp phân tích người mua xem và cập nhật giỏ hàng_**

![][image31]

##### **_Hình 2.9. Biểu đồ tuần tự lớp phân tích người mua đăng nhập_**

![][image32]

##### **_Hình 2.10. Biểu đồ tuần tự lớp phân tích người mua đặt hàng_**

![][image33]

##### **_Hình 2.11. Biểu đồ tuần tự lớp phân tích người mua đánh giá sản phẩm_**

![][image34]

##### **_Hình 2.12. Biểu đồ tuần tự lớp phân tích người dùng nạp tiền vào ví_**

![][image35]

##### **_Hình 2.13. Biểu đồ tuần tự lớp phân tích người mua chat với người bán_**

![][image36]

##### **_Hình 2.14. Biểu đồ tuần tự lớp phân tích người mua xem đơn hàng đã mua_**

![][image37]

##### **_Hình 2.15. Biểu đồ tuần tự lớp phân tích người mua quản lý thông báo_**

![][image38]

##### **_Hình 2.16. Biểu đồ tuần tự lớp phân tích người bán thêm sản phẩm_**

![][image39]

##### **_Hình 2.17. Biểu đồ tuần tự lớp phân tích người bán tạo cửa hàng_**

![][image40]

##### **_Hình 2.18. Biểu đồ tuần tự lớp phân tích người bán tạo danh mục sản phẩm_**

![][image41]

##### **_Hình 2.19. Biểu đồ tuần tự lớp phân tích người bán cập nhật thông tin cửa hàng_**

![][image42]

##### **_Hình 2.20. Biểu đồ tuần tự lớp phân tích người bán xem báo cáo thống kê_**

![][image43]

##### **_Hình 2.21. Biểu đồ tuần tự lớp phân tích người bán tạo voucher_**

![][image44]

##### **_Hình 2.22. Biểu đồ tuần tự lớp phân tích nhân viên sàn duyệt yêu cầu tạo cửa hàng_**

![][image45]

##### **_Hình 2.23. Biểu đồ tuần tự lớp phân tích nhân viên sàn xem thống kê toàn sàn_**

![][image46]

##### **_Hình 2.24. Biểu đồ tuần tự lớp phân tích nhân viên sàn cập nhật giao diện trang chủ_**

![][image47]

##### **_Hình 2.25. Biểu đồ tuần tự lớp phân tích nhân viên sàn duyệt sản phẩm mới_**

![][image48]

##### **_Hình 2.26. Biểu đồ tuần tự lớp phân tích người dùng gửi báo cáo vi phạm_**

![][image49]

##### **_Hình 2.27. Biểu đồ tuần tự lớp phân tích nhân viên sàn khóa tài khoản người dùng_**

# **CHƯƠNG 3: THIẾT KẾ HỆ THỐNG**

## **3.1. Thiết kế kiến trúc hệ thống**

Hệ thống thương mại điện tử kinh doanh nội thất được thiết kế theo mô hình kiến trúc phân lớp (Layered Architecture). Các thành phần được tổ chức thành những tầng riêng biệt, đảm bảo phân tách trách nhiệm giữa giao diện người dùng, xử lý yêu cầu, nghiệp vụ và truy cập dữ liệu. Việc chia tầng không phải để trừu tượng hóa mà để chặn lỗi theo cấu trúc. Hệ thống sẽ không phân tầng nếu không trả lời được câu hỏi: Tầng này ngăn lỗi gì? Hay lỗi này xảy ra do tầng nào?

![][image50]

##### **_Hình 3.1. Sơ đồ kiến trúc hệ thống_**

## **3.2. Xây dựng biểu đồ lớp thiết kế**

![][image51]

##### **_Hình 3\. . Biểu đồ lớp thiết kế tổng quan_**

| Bảng                 | Tên phương thức     | Mục đích                                                                                                                                   |
| :------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| NguoiDung            | register()          | Đăng ký tài khoản mới: kiểm tra tính hợp lệ và duy nhất của email/số điện thoại, mã hóa mật khẩu và lưu người dùng.                        |
|                      | login()             | Xác thực đăng nhập bằng email và mật khẩu; tăng failedLoginCount khi sai và khóa tạm thời (loginLockedUntil) nếu vượt quá số lần cho phép. |
|                      | logout()            | Kết thúc phiên đăng nhập hiện tại của người dùng.                                                                                          |
|                      | changePassword()    | Đổi mật khẩu sau khi xác minh mật khẩu cũ chính xác.                                                                                       |
|                      | resetPassword()     | Đặt lại mật khẩu mới khi quên mật khẩu, sau khi xác thực mã OTP hợp lệ.                                                                    |
|                      | updateProfile()     | Cập nhật thông tin cá nhân (họ tên, số điện thoại, giới tính, ngày sinh, ...).                                                             |
| NguoiMua             | placeOrder()        | Đặt hàng từ các mặt hàng được chọn trong giỏ hàng với địa chỉ giao hàng; tách thành các đơn hàng theo từng cửa hàng.                       |
|                      | cancelOrder()       | Hủy đơn hàng khi đơn còn ở trạng thái cho phép hủy.                                                                                        |
|                      | confirmReceived()   | Xác nhận đã nhận hàng, chuyển đơn hàng sang trạng thái hoàn tất.                                                                           |
|                      | requestReturn()     | Tạo yêu cầu hoàn hàng/hoàn tiền cho đơn hàng đã giao.                                                                                      |
|                      | writeReview()       | Viết đánh giá (số sao, nhận xét, hình ảnh) cho sản phẩm đã mua.                                                                            |
| NguoiBan             | createShop()        | Tạo cửa hàng mới của người bán và gửi đi chờ duyệt.                                                                                        |
|                      | confirmOrder()      | Xác nhận đơn hàng mà người mua đã đặt tại cửa hàng.                                                                                        |
|                      | shipOrder()         | Giao đơn hàng cho đơn vị vận chuyển, chuyển đơn sang trạng thái đang giao.                                                                 |
|                      | respondReturn()     | Phản hồi yêu cầu hoàn hàng của người mua: chấp nhận hoặc từ chối.                                                                          |
| NhanVienSan          | approveShop()       | Phê duyệt cửa hàng đang chờ duyệt, cho phép cửa hàng hoạt động.                                                                            |
|                      | rejectShop()        | Từ chối cửa hàng và ghi nhận lý do từ chối.                                                                                                |
|                      | reviewProduct()     | Kiểm duyệt sản phẩm: chấp thuận hoặc từ chối cho phép hiển thị.                                                                            |
|                      | lockAccount()       | Khóa tài khoản người dùng vi phạm và ghi nhận lý do.                                                                                       |
|                      | unlockAccount()     | Mở khóa tài khoản người dùng.                                                                                                              |
|                      | resolveDispute()    | Giải quyết tranh chấp hoàn hàng: xác định bên thắng (người mua hoặc người bán).                                                            |
| CuaHang              | submitForApproval() | Gửi hồ sơ cửa hàng lên sàn để chờ phê duyệt.                                                                                               |
|                      | updateInfo()        | Cập nhật thông tin cửa hàng (tên, mô tả, logo, địa chỉ kho, thông tin liên hệ, ...).                                                       |
|                      | lock()              | Khóa cửa hàng và ghi nhận lý do.                                                                                                           |
|                      | unlock()            | Mở khóa cửa hàng, cho phép hoạt động trở lại.                                                                                              |
| SanPham              | create()            | Tạo mới sản phẩm của cửa hàng.                                                                                                             |
|                      | update()            | Cập nhật thông tin sản phẩm.                                                                                                               |
|                      | remove()            | Gỡ sản phẩm khỏi cửa hàng/sàn.                                                                                                             |
|                      | getMinPrice()       | Lấy giá thấp nhất trong các biến thể của sản phẩm để hiển thị.                                                                             |
|                      | updateRating()      | Tính lại điểm đánh giá trung bình của sản phẩm dựa trên các đánh giá hiện có.                                                              |
| BienTheSanPham       | getPrice()          | Tính đơn giá theo số lượng mua (áp dụng giá bán sỉ khi đạt số lượng sỉ tối thiểu).                                                         |
|                      | updateStock()       | Tăng/giảm số lượng tồn kho của biến thể theo độ biến thiên delta.                                                                          |
|                      | isInStock()         | Kiểm tra tồn kho có đủ số lượng yêu cầu hay không.                                                                                         |
| DanhMucSanPham       | create()            | Tạo mới danh mục sản phẩm.                                                                                                                 |
|                      | update()            | Cập nhật thông tin danh mục.                                                                                                               |
|                      | delete()            | Xóa danh mục sản phẩm.                                                                                                                     |
|                      | addProduct()        | Thêm sản phẩm vào danh mục.                                                                                                                |
| GioHang              | addItem()           | Thêm biến thể sản phẩm vào giỏ hàng; nếu đã có thì cộng dồn số lượng.                                                                      |
|                      | updateQuantity()    | Cập nhật số lượng của một mặt hàng trong giỏ.                                                                                              |
|                      | changeVariant()     | Đổi biến thể (màu, kích cỡ, ...) của mặt hàng trong giỏ.                                                                                   |
|                      | removeItem()        | Xóa một mặt hàng khỏi giỏ hàng.                                                                                                            |
|                      | getItemsByShop()    | Nhóm các mặt hàng trong giỏ theo từng cửa hàng.                                                                                            |
| ChiTietGioHang       | getSubtotal()       | Tính thành tiền của mặt hàng trong giỏ (đơn giá × số lượng).                                                                               |
| DonHang              | calculateTotal()    | Tính tổng tiền đơn hàng \= tạm tính − giảm giá \+ phí vận chuyển.                                                                          |
|                      | cancel()            | Hủy đơn hàng và ghi nhận lý do hủy.                                                                                                        |
|                      | confirm()           | Xác nhận đơn hàng (người bán đã tiếp nhận).                                                                                                |
|                      | ship()              | Chuyển đơn hàng sang trạng thái đang giao.                                                                                                 |
|                      | markDelivered()     | Đánh dấu đơn hàng đã giao thành công.                                                                                                      |
|                      | complete()          | Hoàn tất đơn hàng sau khi người mua xác nhận hoặc hết thời hạn.                                                                            |
|                      | changeStatus()      | Chuyển trạng thái đơn hàng sang trạng thái mới nếu hợp lệ.                                                                                 |
| ChiTietDonHang       | getSubtotal()       | Tính thành tiền của dòng chi tiết đơn hàng (đơn giá × số lượng).                                                                           |
| Voucher              | isApplicable()      | Kiểm tra voucher có áp dụng được cho đơn hàng (thời hạn, số lượng, giá trị tối thiểu, trạng thái).                                         |
|                      | calculateDiscount() | Tính số tiền giảm giá theo loại và giá trị voucher.                                                                                        |
|                      | end()               | Kết thúc voucher, không cho sử dụng thêm.                                                                                                  |
| ChuongTrinhKhuyenMai | addProduct()        | Thêm sản phẩm vào chương trình khuyến mãi.                                                                                                 |
|                      | activate()          | Kích hoạt chương trình khuyến mãi.                                                                                                         |
|                      | end()               | Kết thúc chương trình khuyến mãi.                                                                                                          |
| ViDienTu             | activate()          | Kích hoạt ví điện tử và thiết lập mã PIN.                                                                                                  |
|                      | verifyPin()         | Xác thực mã PIN; đếm số lần nhập sai và khóa ví tạm thời khi vượt giới hạn.                                                                |
|                      | changePin()         | Đổi mã PIN sau khi xác thực mã PIN cũ.                                                                                                     |
|                      | resetPin()          | Đặt lại mã PIN khi người dùng quên.                                                                                                        |
|                      | linkBank()          | Liên kết tài khoản ngân hàng với ví.                                                                                                       |
|                      | deposit()           | Nạp tiền vào ví và tạo giao dịch ví.                                                                                                       |
|                      | withdraw()          | Rút tiền từ ví về tài khoản ngân hàng liên kết sau khi xác thực PIN; tạo giao dịch ví.                                                     |
|                      | pay()               | Thanh toán đơn hàng bằng số dư ví sau khi xác thực PIN; tạo giao dịch ví.                                                                  |
|                      | lock()              | Khóa ví điện tử.                                                                                                                           |
| GiaoDichVi           | complete()          | Đánh dấu giao dịch ví thành công và cập nhật số dư sau giao dịch.                                                                          |
|                      | fail()              | Đánh dấu giao dịch ví thất bại và ghi nhận lý do.                                                                                          |
| GiaoDichThanhToan    | generateQr()        | Sinh mã QR thanh toán cho đơn hàng.                                                                                                        |
|                      | confirmPaid()       | Xác nhận giao dịch đã thanh toán thành công và ghi nhận thời điểm thanh toán.                                                              |
|                      | markFailed()        | Đánh dấu giao dịch thanh toán thất bại.                                                                                                    |
|                      | refund()            | Hoàn tiền cho giao dịch thanh toán.                                                                                                        |
| YeuCauHoanHang       | submit()            | Gửi yêu cầu hoàn hàng kèm lý do, mô tả và bằng chứng.                                                                                      |
|                      | accept()            | Người bán chấp nhận yêu cầu hoàn hàng.                                                                                                     |
|                      | appeal()            | Người bán khiếu nại kết quả yêu cầu hoàn hàng kèm nội dung và bằng chứng.                                                                  |
|                      | resolve()           | Chốt kết quả giải quyết yêu cầu: bên thắng là người mua hoặc người bán.                                                                    |
| DanhGiaSanPham       | submit()            | Gửi đánh giá sản phẩm.                                                                                                                     |
|                      | reply()             | Người bán phản hồi đánh giá của người mua.                                                                                                 |
| DiaChi               | setDefault()        | Đặt địa chỉ làm địa chỉ mặc định.                                                                                                          |
|                      | update()            | Cập nhật thông tin địa chỉ.                                                                                                                |
|                      | delete()            | Xóa địa chỉ.                                                                                                                               |
| KhieuNai             | submit()            | Gửi khiếu nại lên sàn.                                                                                                                     |
|                      | addInfo()           | Bổ sung thông tin/nội dung cho khiếu nại.                                                                                                  |
|                      | close()             | Đóng khiếu nại kèm kết quả xử lý.                                                                                                          |
| BaoCaoViPham         | submit()            | Gửi báo cáo vi phạm.                                                                                                                       |
|                      | addInfo()           | Bổ sung thông tin/bằng chứng cho báo cáo.                                                                                                  |
|                      | close()             | Đóng báo cáo kèm kết quả xử lý.                                                                                                            |
| LichSuXuLy           | record()            | Ghi nhận lịch sử xử lý (hành động, trạng thái trước/sau, kết quả, thời điểm).                                                              |
| ThongBao             | markAsRead()        | Đánh dấu thông báo là đã đọc.                                                                                                              |
|                      | markAllAsRead()     | Đánh dấu tất cả thông báo của người dùng là đã đọc.                                                                                        |
| CuocTroChuyen        | getMessages()       | Lấy danh sách tin nhắn của cuộc trò chuyện.                                                                                                |
|                      | sendAutoReply()     | Gửi tin nhắn trả lời tự động.                                                                                                              |
| TinNhan              | send()              | Gửi tin nhắn.                                                                                                                              |
|                      | markAsRead()        | Đánh dấu tin nhắn là đã đọc.                                                                                                               |
| BaiViet              | publish()           | Đăng bài viết.                                                                                                                             |
|                      | update()            | Cập nhật nội dung bài viết.                                                                                                                |
|                      | delete()            | Xóa bài viết.                                                                                                                              |
| Livestream           | start()             | Bắt đầu phiên livestream.                                                                                                                  |
|                      | end()               | Kết thúc phiên livestream.                                                                                                                 |
|                      | pinProduct()        | Ghim sản phẩm hiển thị trong phiên livestream.                                                                                             |
| QuangCao             | publish()           | Đăng/kích hoạt quảng cáo.                                                                                                                  |
|                      | hide()              | Ẩn quảng cáo.                                                                                                                              |
| Banner               | publish()           | Đăng/kích hoạt banner.                                                                                                                     |
|                      | hide()              | Ẩn banner.                                                                                                                                 |

![][image52]

##### **_Hình 3.. Biểu đồ lớp thiết kế theo luồng người mua_**

##### **_Hình 3.. Biểu đồ lớp thiết kế theo luồng người bán_**

##### **_Hình 3.. Biểu đồ lớp thiết kế theo luồng nhân viên sàn_**

## **3.3. Xây dựng lược đồ cơ sở dữ liệu**

\- Thông tin bảng, giải nghĩa  
\- Đánh index  
![][image53]

## **3.4. Xây dựng biểu đồ tuần tự (thiết kế)**

![][image54]

## **3.5. Xây dựng biểu đồ triển khai**

![][image55]

##### **_Hình . Sơ đồ triển khai_**
