/**
 * The pages that have a Markdown copy for AI agents. Kept free of imports so
 * next.config.ts can read it to set up the rewrites and Link headers.
 */

export const AGENT_PAGES = {
  home: { path: "/", markdown: "/index.md", title: "Home", summary: "Who we are and our latest news." },
  games: {
    path: "/games",
    markdown: "/games.md",
    title: "Games",
    summary: "Every game we make, with its status and store link.",
  },
  support: {
    path: "/support",
    markdown: "/support.md",
    title: "Support",
    summary: "How to reach us for player support, bug reports, feedback and business.",
  },
  terms: { path: "/terms", markdown: "/terms.md", title: "Terms of Use", summary: "The terms for using the site." },
} as const;

export type AgentPage = keyof typeof AGENT_PAGES;

export function isAgentPage(value: string): value is AgentPage {
  return Object.hasOwn(AGENT_PAGES, value);
}

