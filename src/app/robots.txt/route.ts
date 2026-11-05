import { SITE_URL } from "@/lib/seo";

/**
 * Written by hand rather than with a robots.ts metadata route, which has no way to add
 * the Content-Signal line (https://contentsignals.org): search engines and AI assistants
 * answering a question may use the site; training AI models on it is not allowed.
 */
export function GET() {
  const body = [
    "# Content signals: search = indexing and search results; ai-input = AI answers that",
    "# draw on the page in real time; ai-train = training or fine-tuning AI models.",
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    "",
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
