import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactCompiler: true,
  // Fix for blocked cross-origin request during development
  experimental: {
    allowedDevOrigins: ['172.20.10.2'],
  } as any,
};

export default nextConfig;
