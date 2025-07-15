// my-clothing-store/frontend-nextjs/src/lib/api.ts

import axios from 'axios';

const api = axios.create({
    // Lấy URL của backend từ biến môi trường mà chúng ta đã setup trong docker-compose.yml
    baseURL: process.env.NEXT_PUBLIC_API_URL,

    // Rất quan trọng cho Laravel Sanctum:
    // Yêu cầu trình duyệt gửi kèm cookie xác thực trong mỗi request
    withCredentials: true,

    // Các header mặc định cho mọi request
    headers: {
        // Header này sẽ yêu cầu Localtunnel bỏ qua trang chờ
        'Bypass-Tunnel-Reminder': 'true',

        // Các header tiêu chuẩn cho API JSON
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Xuất ra instance đã cấu hình để các component khác có thể import và sử dụng
export default api;