import { HomeHero } from "@/components/sites/boostlab/blocks/HomeHero";
import { Media } from "@/components/sites/boostlab/blocks/Media";
import { ScrollFloat } from "@/components/sites/boostlab/blocks/ScrollFloat";
import { Cards } from "@/components/sites/boostlab/blocks/Cards";
import { NewsList } from "@/components/sites/boostlab/blocks/NewsList";
import { homeAbout, homeExplore } from "@/components/sites/boostlab/content";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Media
        label={homeAbout.label}
        title={homeAbout.title}
        media={homeAbout.media}
        variation="LandscapeRight"
      />
      <ScrollFloat
        variant="gamesExplore"
        label={homeExplore.label}
        title={homeExplore.title}
        cta={homeExplore.cta}
      />
      <Cards />
      <NewsList />
    </>
  );
}
