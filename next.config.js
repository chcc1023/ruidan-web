/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //basePath: '/home', 
  images: {
    unoptimized: true,  // 设置为 true 可以避免图片优化服务的问题
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ai2049.com',
      },
    ],
  }, 
};

module.exports = nextConfig; 