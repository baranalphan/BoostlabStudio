import type { Metadata } from "next";
import { GamesHero } from "@/components/sites/boostlab/blocks/GamesHero";
import { Media } from "@/components/sites/boostlab/blocks/Media";
import { CardCarousel } from "@/components/sites/boostlab/blocks/CardCarousel";
import { CtaBlock } from "@/components/sites/boostlab/blocks/CtaBlock";
import { gamesAbout, gamesCarousel, gamesCta } from "@/components/sites/boostlab/content";
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
  itemListElement: gamesCarousel.cards.map((game, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoGame",
      name: game.title,
      image: `${SITE_URL}${game.image.url}`,
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
      <GamesHero />
      <Media
        label={gamesAbout.label}
        title={gamesAbout.title}
        description={gamesAbout.description}
        media={gamesAbout.media}
      />
      <CardCarousel />
      <CtaBlock
        label={gamesCta.label}
        heading={gamesCta.heading}
        steamLink={gamesCta.steamLink}
      />
    </>
  );
}
