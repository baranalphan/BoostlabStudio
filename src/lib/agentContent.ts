import {
  footer,
  gamesShowreel,
  homeAbout,
  homeNews,
  supportContact,
  terms,
} from "@/components/sites/boostlab/content";
import { AGENT_PAGES, type AgentPage } from "./agentPages";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";

/**
 * Plain-text versions of the site for AI agents: /llms.txt and a Markdown copy of each
 * page. Everything is built from content.ts, so it stays in step with the pages.
 */

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

function gamesMarkdown() {
  return gamesShowreel.games
    .map((game) =>
      [
        `### ${game.title}`,
        "",
        `*${game.tagline}*`,
        "",
        game.blurb,
        "",
        `- Genre: ${game.tags.join(", ")}`,
        `- Status: ${game.url ? "Out now on Steam" : "Coming soon"}`,
        ...(game.url ? [`- Store page: ${game.url}`] : []),
      ].join("\n"),
    )
    .join("\n\n");
}

function newsMarkdown() {
  return homeNews.news
    .map((item) => `- ${item.date ? `${item.date} · ` : ""}${item.title}: ${item.description}`)
    .join("\n");
}

const PAGE_MARKDOWN: Record<AgentPage, () => string> = {
  home: () =>
    [
      `# ${SITE_NAME}`,
      "",
      `> ${SITE_DESCRIPTION}`,
      "",
      `## ${homeAbout.title}`,
      "",
      homeAbout.description,
      "",
      `## ${homeNews.title.replace(/\s+/g, " ")}`,
      "",
      newsMarkdown(),
      "",
      "## Our games",
      "",
      gamesMarkdown(),
    ].join("\n"),
  games: () => [`# Games by ${SITE_NAME}`, "", gamesMarkdown()].join("\n"),
  support: () =>
    [
      `# Support | ${SITE_NAME}`,
      "",
      `## ${supportContact.title}`,
      "",
      supportContact.description,
      "",
      `We help with: ${supportContact.topics.join(", ")}.`,
      "",
      `- Email: ${supportContact.email}`,
      `- Contact form: ${url("/support")}`,
    ].join("\n"),
  terms: () =>
    [
      `# ${terms.title} | ${SITE_NAME}`,
      "",
      `Last updated: ${terms.updated}`,
      "",
      terms.intro,
      "",
      ...terms.sections.flatMap((section) => [`## ${section.heading}`, "", ...section.body.flatMap((p) => [p, ""])]),
      `Questions about these terms: ${supportContact.email}`,
    ].join("\n"),
};

/** A page as Markdown, with a footer pointing back at the HTML original. */
export function pageMarkdown(page: AgentPage) {
  const { path } = AGENT_PAGES[page];
  return `${PAGE_MARKDOWN[page]().trimEnd()}\n\n---\n\nSource: ${url(path)}\n`;
}

/** /llms.txt: what the site is and where its key pages are (https://llmstxt.org). */
export function llmsTxt() {
  const pages = Object.values(AGENT_PAGES)
    .map((page) => `- [${page.title}](${url(page.markdown)}): ${page.summary}`)
    .join("\n");
  const games = gamesShowreel.games
    .map((game) => `- [${game.title}](${game.url ?? url("/games.md")}): ${game.tagline} ${game.url ? "Out now on Steam." : "Coming soon."}`)
    .join("\n");
  const profiles = footer.socials
    .flatMap((social) => (social.url ? [`- [${social.label}](${social.url})`] : []))
    .join("\n");

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Contact: ${supportContact.email}. Each page below links to a Markdown copy; the HTML pages also return Markdown when requested with \`Accept: text/markdown\`.`,
    "",
    "## Pages",
    "",
    pages,
    "",
    "## Games",
    "",
    games,
    "",
    "## Optional",
    "",
    profiles,
    "",
  ].join("\n");
}
