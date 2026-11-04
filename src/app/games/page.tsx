import type { Metadata } from "next";
import { GamesStage } from "@/components/sites/boostlab/blocks/GamesStage";
import { CtaBlock } from "@/components/sites/boostlab/blocks/CtaBlock";
import { gamesCta, gamesShowreel } from "@/components/sites/boostlab/content";
import { SITE_URL, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Games",
  description:
    "Explore the games from Boostlab Game Studio: Idle Reef, out now on Steam, plus Pyramid Diggers and Sins Simulator, coming soon.",
  path: "/games",
});

/** Our games as structured data, so search engines can show them as games. */
const gamesList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Games by Boostlab Game Studio",
  itemListElement: gamesShowreel.games.map((game, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoGame",
      name: game.title,
      image: `${SITE_URL}${game.poster.url}`,
      ...(game.url ? { url: game.url, gamePlatform: "PC", applicationCategory: "Game" } : {}),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  })),
};

export default function GamesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(gamesList)} />
      <GamesStage />
      <CtaBlock
        label={gamesCta.label}
        heading={gamesCta.heading}
        steamLink={gamesCta.steamLink}
      />
    </>
  );
}
