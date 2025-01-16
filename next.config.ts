import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nicovideo.cdn.nimg.jp',
        port: '',
        pathname: '/thumbnails/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'secure-dcdn.cdn.nimg.jp',
        port: '',
        pathname: '/nicoaccount/usericon/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
