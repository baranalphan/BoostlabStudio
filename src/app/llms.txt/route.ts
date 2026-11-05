import { llmsTxt } from "@/lib/agentContent";

export const dynamic = "force-static";

/** A short guide to the site for AI agents (https://llmstxt.org). */
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
