import { HomeHero } from "@/components/sites/boostlab/blocks/HomeHero";
import { Media } from "@/components/sites/boostlab/blocks/Media";
import { NewsList } from "@/components/sites/boostlab/blocks/NewsList";
import { homeAbout } from "@/components/sites/boostlab/content";
import { SITE_NAME, SITE_URL, jsonLd } from "@/lib/seo";
import { gamesItemList, webPage } from "@/lib/structuredData";

/** The home page and the games it introduces, for search engines and AI agents. */
const homeData = {
  "@context": "https://schema.org",
  "@graph": [
    webPage({ path: "/", name: SITE_NAME, about: { "@id": `${SITE_URL}/#organization` } }),
    gamesItemList(),
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeData)} />
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
