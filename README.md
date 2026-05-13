# Auto Hide & History Cleaner

**Auto Hide & History Cleaner** là một tiện ích mở rộng (extension) mạnh mẽ cho trình duyệt Chrome, được thiết kế để bảo vệ quyền riêng tư và tối ưu hóa trải nghiệm duyệt web của bạn một cách tự động.

## 🚀 Tính năng chính

-   **Xóa lịch sử thông minh:** Tự động phát hiện và xóa lịch sử duyệt web dựa trên danh sách tên miền (Blacklist) hoặc từ khóa cụ thể ngay khi bạn truy cập.
-   **Dọn dẹp dữ liệu duyệt web:** Tự động xóa Cache và Cookies của các trang web nằm trong danh sách hạn chế để đảm bảo không để lại dấu vết.
-   **Ẩn phần tử giao diện (Auto Hide):** Sử dụng CSS Injection để ẩn các thành phần không mong muốn trên trang web (như quảng cáo, banner, overlay) thông qua Class, ID hoặc HTML Tag.
-   **Chặn Click quảng cáo:** Ngăn chặn hành vi click vào các liên kết chứa từ khóa quảng cáo đã thiết lập.
-   **Tự động đóng Tab quảng cáo:** Phát hiện và đóng ngay lập tức các tab mới mở nếu URL của chúng chứa các từ khóa rác hoặc quảng cáo (Pop-under).
-   **Ngụy trang tiêu đề trang (Page Title):** Cho phép thay đổi tiêu đề (Title) của tab hiện tại thành một nội dung khác để tăng tính riêng tư khi làm việc.

## 🛠 Cấu trúc dự án

-   `manifest.json`: Tệp cấu hình chính của extension (Manifest V3).
-   `background.js`: Xử lý các tác vụ chạy ngầm như theo dõi lịch sử, quản lý tab và dọn dẹp dữ liệu.
-   `content.js`: Thực thi các kịch bản trên trang web để ẩn phần tử và chặn click.
-   `popup.html` & `popup.js`: Giao diện điều khiển và logic quản lý danh sách bộ lọc.
-   `style.css`: Chứa các quy tắc CSS tùy chỉnh.
-   `LICENSE.txt`: Quy định về bản quyền sử dụng phần mềm.

## 📥 Cài đặt

1.  Tải mã nguồn về máy tính của bạn.
2.  Mở trình duyệt Chrome và truy cập đường dẫn: `chrome://extensions/`.
3.  Bật chế độ **Developer mode** (Chế độ dành cho nhà phát triển) ở góc trên bên phải.
4.  Nhấn nút **Load unpacked** (Tải tiện ích đã giải nén) và chọn thư mục chứa mã nguồn của dự án này.

## ⚙️ Cách sử dụng

1.  Nhấn vào biểu tượng extension trên thanh công cụ.
2.  Bật/Tắt extension bằng nút gạt ở phía trên cùng.
3.  **Quản lý danh sách:**
    * **Tên miền (Blacklist):** Nhập domain cần xóa lịch sử tự động.
    * **Từ khóa xóa lịch sử:** Nhập từ khóa để quét URL.
    * **Từ khóa quảng cáo:** Nhập các dấu hiệu của link quảng cáo để chặn click/đóng tab.
    * **Ẩn phần tử:** Thêm Selector (Class, ID, Tag) để ẩn nội dung trên web.
4.  **Thay đổi tiêu đề:** Nhập tiêu đề mới vào ô "Đổi Title trang" và nhấn **Lưu cấu hình**.

## 📄 Bản quyền

Dự án này thuộc bản quyền của **Bui Cong Quynh**. Vui lòng tham khảo tệp [LICENSE.txt](./LICENSE.txt) để biết thêm chi tiết.

---
*Phát triển bởi BuiCongQuynh - 2026*
