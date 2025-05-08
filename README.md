# Website Cá Nhân của Hieu Ngo

Đây là mã nguồn cho website cá nhân của Hieu Ngo, giới thiệu các dự án, bài viết, buổi nói chuyện và kinh nghiệm chuyên môn.

## Yêu cầu

Để chạy dự án này (trên máy tính của bạn), bạn cần:

*   Một trình duyệt web hiện đại (ví dụ: Chrome, Firefox, Edge, Safari).
*   (Tùy chọn nhưng khuyến khích cho việc phát triển) Một trình soạn thảo mã nguồn như [VS Code](https://code.visualstudio.com/).
*   (Tùy chọn nhưng cần thiết nếu bạn muốn chạy server Python) [Python](https://www.python.org/downloads/) đã được cài đặt.
*   (Tùy chọn nếu bạn muốn chạy server Node.js) [Node.js và npm](https://nodejs.org/) đã được cài đặt.

## Cách chạy dự án

Vì dự án sử dụng JavaScript `fetch()` để tải các phần nội dung từ các file HTML riêng biệt, bạn **cần chạy nó thông qua một server web**. Mở trực tiếp file `index.html` bằng trình duyệt (qua `file:///`) sẽ gây ra lỗi CORS và nội dung sẽ không tải được.

Dưới đây là một vài cách phổ biến để khởi động một server web:

**Cách 1: Sử dụng Python (Khuyến khích nếu bạn có Python)**

1.  Mở Terminal (macOS/Linux) hoặc Command Prompt/PowerShell (Windows).
2.  Di chuyển đến thư mục gốc của dự án (thư mục chứa file `index.html`):
    ```bash
    cd /đường/dẫn/đến/thư/mục/dự/án
    ```
3.  Chạy lệnh sau:
    *   Nếu bạn dùng Python 3:
        ```bash
        python -m http.server
        ```
    *   Nếu bạn dùng Python 2 (ít phổ biến hơn hiện nay):
        ```bash
        python -m SimpleHTTPServer
        ```
4.  Terminal sẽ hiển thị một địa chỉ, thường là `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...` (port có thể khác).
5.  Mở trình duyệt web của bạn và truy cập vào địa chỉ: `http://localhost:8000` (hoặc `http://127.0.0.1:8000`). Nếu server khởi động trên một port khác, hãy sử dụng port đó.

**Cách 2: Sử dụng VS Code và tiện ích "Live Server" (Dễ dàng nếu bạn dùng VS Code)**

1.  Cài đặt tiện ích [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) của Ritwick Dey trong VS Code.
2.  Mở thư mục dự án trong VS Code.
3.  Nhấp chuột phải vào file `index.html` trong Explorer panel.
4.  Chọn "Open with Live Server".
    *   Hoặc, tìm nút "Go Live" ở thanh trạng thái dưới cùng của VS Code và nhấp vào đó.
5.  Trình duyệt mặc định của bạn sẽ tự động mở với một địa chỉ như `http://127.0.0.1:5500/index.html` (port có thể khác).

**Cách 3: Sử dụng Node.js/npm và gói `serve`**

1.  Mở Terminal (macOS/Linux) hoặc Command Prompt/PowerShell (Windows).
2.  Di chuyển đến thư mục gốc của dự án.
3.  Chạy lệnh:
    ```bash
    npx serve
    ```
    (Lệnh này sẽ tạm thời tải về và chạy gói `serve`. Nếu bạn muốn cài đặt nó toàn cục, hãy chạy `npm install -g serve` một lần, sau đó chỉ cần chạy `serve`.)
4.  Terminal sẽ hiển thị các địa chỉ như `Serving on http://localhost:3000`.
5.  Mở trình duyệt web của bạn và truy cập `http://localhost:3000`.

Sau khi server khởi động, bạn sẽ có thể xem website và tất cả các phần nội dung sẽ được tải chính xác.

## Cấu trúc thư mục
├── index.html # File HTML chính, chứa sidebar và khu vực nội dung chính
├── style.css # File CSS cho toàn bộ website
├── script.js # File JavaScript chính để tải nội dung và xử lý tương tác
├── images/ # Thư mục chứa hình ảnh chung (vd: profile.jpg)
│ ├── profile.jpg
│ └── talks/ # (Ví dụ) Thư mục con cho hình ảnh của các buổi nói chuyện
│ └── talk_placeholder_1.jpg
└── sections/ # Thư mục chứa các file HTML cho từng phần nội dung
├── about.html
├── articles.html
├── activities.html
├── projects.html
├── publications.html
└── talks.html

## Triển khai (Deployment)

Dự án này được thiết kế để dễ dàng triển khai lên các nền tảng hosting tĩnh như [GitHub Pages](https://pages.github.com/).

Nếu sử dụng GitHub Pages cho một repository của tổ chức có tên `YourOrganizationName.github.io`, các file trong nhánh `main` sẽ được tự động phục vụ tại `https://YourOrganizationName.github.io`.
