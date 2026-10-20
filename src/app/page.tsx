import { HomeHero } from "@/components/sites/inkgames/blocks/HomeHero";
import { Media } from "@/components/sites/inkgames/blocks/Media";
import { ScrollFloat } from "@/components/sites/inkgames/blocks/ScrollFloat";
import { Cards } from "@/components/sites/inkgames/blocks/Cards";
import { NewsList } from "@/components/sites/inkgames/blocks/NewsList";
import { homeAbout, homeExplore, homeHq } from "@/components/sites/inkgames/content";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Media
        label={homeAbout.label}
        title={homeAbout.title}
        cta={homeAbout.cta}
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
      <Media
        label={homeHq.label}
        title={homeHq.title}
        cta={homeHq.cta}
        media={homeHq.media}
        variation="LandscapeCenter"
      />
    </>
  );
}
