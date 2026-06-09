/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint chạy riêng qua `npm run lint` (giữ CI tách khỏi build).
  // Type-check vẫn bật trong `next build`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
