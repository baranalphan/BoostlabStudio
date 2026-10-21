import type { Metadata } from "next";
import { GamesHero } from "@/components/sites/boostlab/blocks/GamesHero";
import { Media } from "@/components/sites/boostlab/blocks/Media";
import { ScrollFloat } from "@/components/sites/boostlab/blocks/ScrollFloat";
import { CardCarousel } from "@/components/sites/boostlab/blocks/CardCarousel";
import { ScrollList } from "@/components/sites/boostlab/blocks/ScrollList";
import { CtaBlock } from "@/components/sites/boostlab/blocks/CtaBlock";
import { ScrollAnim } from "@/components/sites/boostlab/blocks/ScrollAnim";
import { gamesAbout, gamesTabs } from "@/components/sites/boostlab/content";

const description =
  "Boostlab is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.";

export const metadata: Metadata = {
  title: "Prize Kingdoms | Boostlab",
  description,
  openGraph: {
    title: "Prize Kingdoms | Boostlab",
    description,
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prize Kingdoms | Boostlab",
    description,
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
};

export default function GamesPage() {
  return (
    <>
      <GamesHero />
      <Media
        label={gamesAbout.label}
        title={gamesAbout.title}
        description={gamesAbout.description}
        media={gamesAbout.media}
        variation="LandscapeRightBottom"
      />
      <ScrollFloat variant="gamesTabs" tabs={gamesTabs.tabs} />
      <CardCarousel />
      <ScrollList />
      <CtaBlock />
      <ScrollAnim />
    </>
  );
}
