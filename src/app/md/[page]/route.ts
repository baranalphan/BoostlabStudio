import { pageMarkdown } from "@/lib/agentContent";
import { AGENT_PAGES, isAgentPage } from "@/lib/agentPages";
import { SITE_URL } from "@/lib/seo";

/**
 * A page as Markdown, for AI agents. Reached as /index.md, /games.md and so on, or at the
 * page's own URL when the request asks for `Accept: text/markdown` (rewrites in
 * next.config.ts).
 */

// Rendered per request: the same URL answers HTML or Markdown depending on the Accept
// header, so no cache may keep this copy and hand it to a browser.
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!isAgentPage(page)) return new Response("Not found", { status: 404 });

  const { path } = AGENT_PAGES[page];
  return new Response(pageMarkdown(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "private, no-store",
      // Search engines should index the HTML page, not this copy.
      Link: `<${SITE_URL}${path === "/" ? "" : path}>; rel="canonical"`,
    },
  });
}
