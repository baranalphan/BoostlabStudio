"use client";

import { useEffect } from "react";

/** Markdown copies an agent can ask for (see src/lib/agentPages.ts). */
const PAGES = { home: "/index.md", games: "/games.md", support: "/support.md", terms: "/terms.md" };

async function text(url: string) {
  const response = await fetch(url, { headers: { Accept: "text/markdown, text/plain" } });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return { content: [{ type: "text" as const, text: await response.text() }] };
}

const TOOLS: ModelContextTool[] = [
  {
    name: "get_site_overview",
    description:
      "Summary of Boostlab Game Studio: who we are, our games, how to contact us and links to every page.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: () => text("/llms.txt"),
  },
  {
    name: "get_page",
    description:
      "One page of the Boostlab Game Studio website as Markdown: home (studio and news), games (every game, its status and Steam link), support (how to reach us) or terms.",
    inputSchema: {
      type: "object",
      properties: { page: { type: "string", enum: Object.keys(PAGES), description: "Which page to read." } },
      required: ["page"],
    },
    annotations: { readOnlyHint: true },
    execute: ({ page }) => {
      const url = PAGES[page as keyof typeof PAGES];
      return url ? text(url) : Promise.reject(new Error(`Unknown page: ${String(page)}`));
    },
  },
];

/**
 * Registers read-only WebMCP tools for AI agents built into the browser. Renders nothing,
 * and does nothing in browsers without `navigator.modelContext`.
 */
export function AgentTools() {
  useEffect(() => {
    const context = navigator.modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    for (const tool of TOOLS) {
      try {
        context.registerTool(tool, { signal: controller.signal });
      } catch {
        // Already registered (e.g. a remount): the earlier registration stands.
      }
    }
    return () => {
      controller.abort();
      for (const tool of TOOLS) {
        try {
          context.unregisterTool?.(tool.name);
        } catch {
          // Gone already.
        }
      }
    };
  }, []);

  return null;
}
