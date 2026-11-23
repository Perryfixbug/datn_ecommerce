# LỊCH SỬ PROMPT AI

> Ghi lại các yêu cầu đã giao cho AI và kết quả thực hiện trong dự án vào file [Lịch sử prompt](.\prompt-history.md)

| ID    | Ngày       | Chủ đề        | Tóm tắt yêu cầu                 | Tóm tắt công việc AI đã thực hiện                                   | Liên kết        |
| ----- | ---------- | ------------- | ------------------------------- | ------------------------------------------------------------------- | --------------- |
| P-001 | 22/11/2026 | Xác thực      | Xây dựng API đăng nhập          | Tạo API đăng nhập, xác thực JWT và middleware phân quyền.           | [PR #12](URL)   |
| P-002 | 22/11/2026 | Sản phẩm      | Xây dựng API danh sách sản phẩm | Bổ sung API danh sách sản phẩm, phân trang và bộ lọc.               | [Commit](URL)   |
| P-003 | 23/11/2026 | Cơ sở dữ liệu | Kiểm tra và tối ưu Database     | Phân tích cấu trúc bảng, phát hiện index dư thừa và đề xuất tối ưu. | [Tài liệu](URL) |

## Quy định cập nhật

- Mỗi yêu cầu có ý nghĩa, có xảy ra chỉnh sửa file sẽ được AI thực hiện xong sẽ thêm một dòng mới vào bảng, nếu chỉ hỏi đáp thông thường thì không cần thêm dòng.
- ID được đánh số tuần tự: P-001, P-002, P-003...
- **Chủ đề:** Nhóm chức năng hoặc module liên quan.
- **Tóm tắt yêu cầu:** Mô tả ngắn gọn người dùng đã yêu cầu AI làm gì.
- **Tóm tắt công việc AI đã thực hiện:** Ghi lại những gì AI thực sự đã triển khai, chỉnh sửa hoặc tạo ra.
- **Liên kết:** Đính kèm link Pull Request, Commit, file hoặc cuộc hội thoại nếu có.
- Nếu không có liên kết, sử dụng dấu `-`.
- Không chỉnh sửa hoặc xóa các bản ghi cũ nếu không có yêu cầu.
- Không ghi lại các thông tin nhạy cảm như mật khẩu, API Key hoặc Access Token.
