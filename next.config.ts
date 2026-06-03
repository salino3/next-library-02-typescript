import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // reactStrictMode: false,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
