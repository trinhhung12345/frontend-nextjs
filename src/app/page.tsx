// frontend-nextjs/src/app/page.tsx

'use client'; // Rất quan trọng! Đánh dấu đây là Client Component để có thể dùng hooks và event.

import { useState } from 'react';
import api from '@/lib/api'; // Import instance axios đã cấu hình sẵn

export default function Home() {
  // State để lưu trữ tin nhắn từ backend
  const [message, setMessage] = useState<string>('');
  // State để báo lỗi
  const [error, setError] = useState<string>('');
  // State để hiển thị trạng thái loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hàm xử lý việc gọi API
  const handleTestApiCall = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // Sử dụng 'api' để gọi. Nó đã có sẵn baseURL và header bypass tunnel
      const response = await api.get('/hello');

      // Cập nhật state với tin nhắn từ backend
      setMessage(response.data.message);

    } catch (err: any) {
      // Xử lý lỗi
      console.error('API call failed:', err);
      setError('Không thể kết nối tới backend. Hãy kiểm tra console (F12) để xem chi tiết.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Kiểm tra kết nối Frontend - Backend</h1>

          <button
              onClick={handleTestApiCall}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Đang tải...' : 'Gọi API Test'}
          </button>

          {/* Hiển thị kết quả */}
          <div className="mt-8 p-6 border rounded-lg w-full max-w-2xl text-left bg-gray-50">
            <h2 className="font-semibold mb-2">Kết quả từ Backend:</h2>
            {message && (
                <p className="text-green-600 font-mono">{message}</p>
            )}
            {error && (
                <p className="text-red-600 font-mono">{error}</p>
            )}
            {!message && !error && (
                <p className="text-gray-500">Hãy nhấn nút để xem kết quả...</p>
            )}
          </div>
        </div>
      </main>
  );
}