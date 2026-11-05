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
    // Not inlineCss: tried for PageSpeed's "render-blocking requests" note, but it tripled
    // the HTML (the CSS is sent twice) and measured no faster, so stylesheets stay cached
    // files.
  },
  images: {
    // Serve AVIF where the browser supports it (smallest), falling back to WebP.
    formats: ["image/avif", "image/webp"],
  },
  // Files in public/ are served with no cache lifetime by default, so every visit
  // downloaded the videos and fonts again. Their names carry no hash: when replacing one,
  // give the new file a new name so visitors don't keep the old copy.
  async headers() {
    return [
      {
        source: "/sites/boostlab/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/sites/boostlab/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
