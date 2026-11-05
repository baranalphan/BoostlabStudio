import type { Metadata } from "next";
import { GamesStage } from "@/components/sites/boostlab/blocks/GamesStage";
import { CtaBlock } from "@/components/sites/boostlab/blocks/CtaBlock";
import { gamesCta } from "@/components/sites/boostlab/content";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { gamesItemList } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata({
  title: "Games",
  description:
    "Explore the games from Boostlab Game Studio: Idle Reef, out now on Steam, plus Pyramid Diggers and Sins Simulator, coming soon.",
  path: "/games",
});

/** Our games as structured data, so search engines can show them as games. */
const gamesList = { "@context": "https://schema.org", ...gamesItemList() };

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
