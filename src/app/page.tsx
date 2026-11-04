import { HomeHero } from "@/components/sites/boostlab/blocks/HomeHero";
import { Media } from "@/components/sites/boostlab/blocks/Media";
import { NewsList } from "@/components/sites/boostlab/blocks/NewsList";
import { homeAbout } from "@/components/sites/boostlab/content";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Media
        label={homeAbout.label}
        title={homeAbout.title}
        description={homeAbout.description}
        media={homeAbout.media}
      />
      <NewsList />
    </>
  );
}
