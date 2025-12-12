import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Port backend Anda
        pathname: '/storage/**', // Sesuaikan dengan folder public backend
      },
      // Tambahkan ini jika menggunakan Unsplash juga
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
