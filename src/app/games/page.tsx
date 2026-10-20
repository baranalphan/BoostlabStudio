import type { Metadata } from "next";
import { GamesHero } from "@/components/sites/inkgames/blocks/GamesHero";
import { Media } from "@/components/sites/inkgames/blocks/Media";
import { ScrollFloat } from "@/components/sites/inkgames/blocks/ScrollFloat";
import { CardCarousel } from "@/components/sites/inkgames/blocks/CardCarousel";
import { ScrollList } from "@/components/sites/inkgames/blocks/ScrollList";
import { CtaBlock } from "@/components/sites/inkgames/blocks/CtaBlock";
import { ScrollAnim } from "@/components/sites/inkgames/blocks/ScrollAnim";
import { gamesAbout, gamesTabs } from "@/components/sites/inkgames/content";

const description =
  "INK Games is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.";

export const metadata: Metadata = {
  title: "Prize Kingdoms | INK Games",
  description,
  openGraph: {
    title: "Prize Kingdoms | INK Games",
    description,
    images: [{ url: "/sites/inkgames/images/meta_image_0a45c42195.png", alt: "INK Games" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prize Kingdoms | INK Games",
    description,
    images: [{ url: "/sites/inkgames/images/meta_image_0a45c42195.png", alt: "INK Games" }],
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
