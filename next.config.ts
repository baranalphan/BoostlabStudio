import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  // Hostinger's build machines are small: Turbopack stalled there for 16 minutes, so
  // production builds use Webpack (see package.json) with its lower-memory mode and a
  // single worker for prerendering.
  experimental: {
    webpackMemoryOptimizations: true,
    cpus: 1,
  },
  images: {
    // Serve AVIF where the browser supports it (smallest), falling back to WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
