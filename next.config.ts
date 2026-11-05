import type { NextConfig } from "next";
import { AGENT_PAGES } from "./src/lib/agentPages";

const agentPages = Object.entries(AGENT_PAGES).map(([key, page]) => ({
  ...page,
  /** Where the Markdown copy is actually rendered (src/app/md/[page]/route.ts). */
  handler: `/md/${key}`,
}));

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
  // AI agents get a Markdown copy of each page: at /index.md, /games.md and so on, or at
  // the page's own URL when they ask for it with `Accept: text/markdown`.
  async rewrites() {
    return {
      beforeFiles: agentPages.flatMap((page) => [
        { source: page.markdown, destination: page.handler },
        {
          source: page.path,
          has: [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }],
          destination: page.handler,
        },
      ]),
      afterFiles: [],
      fallback: [],
    };
  },
  // Each page points agents at the site guide and at its own Markdown copy (RFC 8288).
  async headers() {
    return agentPages.map((page) => ({
      source: page.path,
      headers: [
        {
          key: "Link",
          value: `</llms.txt>; rel="describedby"; type="text/plain", <${page.markdown}>; rel="alternate"; type="text/markdown"`,
        },
      ],
    }));
  },
  // Hostinger serves public/ straight from its own static server, bypassing Next, so
  // headers() never reaches those files and they go out with no cache lifetime at all.
  // Fonts and videos therefore live in src/assets and are imported: the bundler copies
  // them to /_next/static/media under a content-hashed name, which is served with a
  // one-year immutable cache. Replacing a file changes its hash, so no stale copies.
  // Fonts are picked up from the url() in globals.css; videos need the rules below.
  turbopack: {
    rules: {
      "*.mp4": { type: "asset" },
    },
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.mp4$/i,
      type: "asset/resource",
      // The server build needs only the URL; the browser build writes the file once.
      generator: { filename: "static/media/[name].[contenthash:8][ext]", emit: !isServer },
    });
    return config;
  },
};

export default nextConfig;
