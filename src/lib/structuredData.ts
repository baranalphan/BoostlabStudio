import { gamesShowreel } from "@/components/sites/boostlab/content";
import { SITE_URL } from "./seo";

/** Our games as schema.org VideoGames in a list, so search engines and agents see them as games. */
export function gamesItemList() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/games#list`,
    name: "Games by Boostlab Game Studio",
    itemListElement: gamesShowreel.games.map((game, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoGame",
        name: game.title,
        description: game.blurb,
        genre: game.tags,
        image: `${SITE_URL}${game.poster.url}`,
        ...(game.url ? { url: game.url, gamePlatform: "PC", applicationCategory: "Game" } : {}),
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

/** The page itself, tied to the site and the studio declared in the root layout. */
export function webPage({
  type = "WebPage",
  path,
  name,
  about,
}: {
  type?: "WebPage" | "ContactPage";
  path: string;
  name: string;
  about?: { "@id": string };
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(about ? { about } : {}),
  };
}
