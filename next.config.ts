// frontend-nextjs/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Giữ lại cấu hình cũ
  output: 'standalone',

  // ==========================================================
  // THÊM KHỐI CẤU HÌNH NÀY VÀO
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // LƯU Ý: Sau này khi bạn dùng Cloudinary, bạn sẽ thêm nó vào đây
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
  // ==========================================================
};

export default nextConfig;