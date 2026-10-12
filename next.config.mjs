/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'youreverydaygourmet.aceorder.com.au',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
