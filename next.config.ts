import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/products',
        destination: '/',
      },
      {
        source: '/products/:id',
        destination: '/',
      },
      {
        source: '/dealership',
        destination: '/',
      },
      {
        source: '/contact',
        destination: '/',
      },
      {
        source: '/privacy',
        destination: '/',
      },
      {
        source: '/terms',
        destination: '/',
      },
      {
        source: '/free-delivery',
        destination: '/',
      },
      {
        source: '/returns-policy',
        destination: '/',
      },
      {
        source: '/not-found',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
