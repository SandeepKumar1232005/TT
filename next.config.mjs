/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1
  },

  // Enable gzip compression
  compress: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp'],
  },

  // Production optimizations
  poweredByHeader: false,
};

export default nextConfig;
