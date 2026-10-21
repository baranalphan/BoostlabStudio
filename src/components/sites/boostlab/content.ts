/**
 * Content lifted verbatim from the source's RSC flight payload (the Strapi response it
 * ships with each page). Media URLs are rewritten to the locally downloaded copies —
 * see docs/research/boostlab/page-brief.md for the source → local asset map.
 */

import type {
  CarouselCard,
  CmsLink,
  CmsMedia,
  GamesTab,
  NewsItem,
  ScrollListSection,
} from "@/types/boostlab";

const IMG = "/sites/boostlab/images";
const VID = "/sites/boostlab/videos";

export const header = {
  logo: {
    url: "/sites/boostlab/images/boostlab-logo.png",
    alt: "Boostlab",
    width: 510,
    height: 570,
  },
  links: [
    { label: "Games", url: "/games" },
    { label: "Support", url: "/support" },
  ] satisfies CmsLink[],
};

export const cookies = {
  text: "This website uses cookies.",
  moreButton: { label: "Learn More", url: "/privacy" } satisfies CmsLink,
};

export const footer = {
  address: {
    title: "Find us",
    description: "Boostlab\n3200 Palm Way 122\nAustin, Texas\n78756",
  },
  boostlabLinks: {
    title: "Boostlab",
    links: [
      { label: "Games", url: "/games" },
      { label: "Support", url: "/support" },
      { label: "Invest", url: "mailto:invest@boostlab.com" },
    ] satisfies CmsLink[],
  },
  socialLinks: {
    title: "Follow",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/boostlab", newTab: true },
      { label: "X", url: "https://x.com/boostlab", newTab: true },
      { label: "TikTok", url: "https://www.tiktok.com/@boostlab", newTab: true },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/boostlab", newTab: true },
    ] satisfies CmsLink[],
  },
  contactLinks: {
    title: "Contact",
    links: [
      { label: "Info", url: "mailto:info@boostlab.com" },
      { label: "Support", url: "/support" },
      { label: "Invest", url: "mailto:investor@boostlab.com" },
      { label: "HQ", url: "mailto:info@boostlab.com" },
    ] satisfies CmsLink[],
  },
  legalLinks: {
    title: "Legal",
    links: [
      { label: "Privacy", url: "/privacy" },
      { label: "Terms & Conditions", url: "/terms-and-conditions" },
    ] satisfies CmsLink[],
  },
};

/* ------------------------------------------------------------------ homepage */

export const homeHero = {
  title: "Join the new era of gaming",
};

export const homeAbout = {
  label: "Boostlab",
  title: "Defining the next generation of gaming",
  media: {
    mime: "image/gif",
    alt: "Boostlab Studio",
    url: `${IMG}/BoostlabLogoGIF.gif`,
    width: 800,
    height: 800,
  } satisfies CmsMedia,
};

export const homeExplore = {
  label: "Boostlab",
  title: "Explore the world of prize kingdoms",
  cta: { label: "Explore", url: "/games" } satisfies CmsLink,
};

export const homeCards = {
  label: "BoostlabPay",
  title: "Play. Win. Earn.",
  cards: [
    { label: "Play", title: "Build your kingdom", cardVariant: "play" },
    { label: "Win", title: "Crush your oponents", cardVariant: "win" },
    { label: "Earn", title: "Earn real rewards", cardVariant: "earn" },
  ] as const,
};

export const homeNews = {
  label: "Updates",
  title: "Latest from  Boostlab",
  news: [
    {
      date: "2025-05-14",
      title: "Partnerships",
      description: "Boostlab Joins Forces with PayOS",
      url: "#",
      image: {
        mime: "image/jpeg",
        alt: "octopus character digging up a treasure",
        url: `${IMG}/hq11_64ae94f607.jpg`,
        width: 900,
        height: 900,
      },
    },
    {
      date: "2024-07-31",
      title: "Updates",
      description: "Boostlab Launches Revolutionary Monetization Features",
      url: "#",
      image: {
        mime: "image/png",
        alt: null,
        url: `${IMG}/Screenshot_2025_06_25_at_15_16_04_23efeb94fd.png`,
        width: 535,
        height: 405,
      },
    },
  ] satisfies NewsItem[],
};

/* --------------------------------------------------------------------- games */

export const downloadLinks = [
  { label: "App Store", url: "https://apps.apple.com/us/app/prize-kingdoms/id1554511237" },
  {
    label: "Play Store",
    url: "https://play.google.com/store/apps/details?id=com.boostlab.prizekingdoms&hl=en_GB",
  },
] satisfies CmsLink[];

export const gamesHero = {
  title: "Prize Kingdoms",
  description:
    "The Octo King has summoned you—will you rise to the challenge? Enter Prize Kingdoms, where you’ll build your empire, battle rivals, and win real prizes across hundreds of epic game boards!",
  trailerButton: "Watch trailer",
  backgroundMedia: {
    mime: "image/jpeg",
    alt: "game illustration with coins and dice",
    url: `${IMG}/906f01514ed04cbd5afb3094f5ed12a14271aa62_c288ac521b.jpg`,
    width: 1535,
    height: 2048,
  } satisfies CmsMedia,
  modalVideo: {
    mime: "video/mp4",
    alt: "Boostlab trailer",
    url: `${VID}/boostlab_trailer_ad2339efda.mp4`,
  } satisfies CmsMedia,
  downloadLinks,
};

export const gamesAbout = {
  label: "Explore",
  title: "Explore the world of Prize Kingdoms",
  description:
    "Prize Kingdoms is the first mobile game with a built-in sweepstakes engine, combining dice rolls, kingdom building, and real-world prizes. Collect tickets, gems, and coins to upgrade your kingdom and unlock powerful boosters. Play with friends, raid their kingdoms, and complete collectible card sets to earn even more rewards. Every roll brings you closer to fortune.",
  media: {
    mime: "image/gif",
    alt: "Boostlab Studio",
    url: `${IMG}/BoostlabLogoGIF.gif`,
    width: 800,
    height: 800,
  } satisfies CmsMedia,
};

export const gamesTabs = {
  title: "Games",
  tabs: [
    {
      label: "Epic boards",
      title: "Epic Boards.",
      description:
        "Travel across dynamic, beautifully crafted game boards, each with its own unique theme, challenges, and rewards. Roll the dice to explore new territories, unlock surprises, and build your path to fortune.",
      tabVariant: "board",
    },
    {
      label: "Prize vault",
      title: "Prize vault.",
      description:
        "Dive into the Prize Vault—your gateway to real-world prizes and exclusive sweepstakes. From gift cards to gadgets, there’s always something exciting waiting to be claimed.",
      tabVariant: "prize",
    },
    {
      label: "Card Sets & Events",
      title: "Card Sets & Events",
      description:
        "Complete limited-time card sets, discover hidden card packs, and climb the ranks in daily tournaments. With live events constantly rotating, there’s always a new challenge and fresh rewards to chase. The more you collect, the more you win.",
      tabVariant: "reward",
    },
    {
      label: "Team up",
      title: "Team up.",
      description:
        "Join or create your own club and team up with players from around the world. Raid rival kingdoms, collect trophies, and climb the weekly club leaderboards to earn massive loot.",
      tabVariant: "team",
    },
  ] satisfies GamesTab[],
};

export const gamesCarousel = {
  label: "Explore",
  title: "Explore the Kingdoms Beyond",
  cards: [
    {
      label: "Play",
      title: "Build your kingdom",
      image: {
        mime: "image/png",
        alt: "illustration of a zeppelin with explosions",
        url: `${IMG}/build_card_cb0d5fdafb.png`,
        width: 552,
        height: 836,
      },
      video: {
        mime: "video/mp4",
        alt: "gameplay video",
        url: `${VID}/Build_Your_Kingdom_14_58_24_f7fecf8066.mp4`,
      },
    },
    {
      label: "Win",
      title: "Crush your opponents",
      image: {
        mime: "image/png",
        alt: "octopus character with an ax",
        url: `${IMG}/win_card_a5c48cdd69.png`,
        width: 906,
        height: 902,
      },
      video: {
        mime: "video/mp4",
        alt: "gameplay video",
        url: `${VID}/Crush_your_opponent_22a9330ddd.mp4`,
      },
    },
    {
      label: "Earn",
      title: "Earn real rewards",
      image: {
        mime: "image/png",
        alt: "illustration of a zeppelin over a city in a canyon",
        url: `${IMG}/earn_card_f99e5b347b.png`,
        width: 899,
        height: 957,
      },
      video: {
        mime: "video/mp4",
        alt: "gameplay video",
        url: `${VID}/Real_Rewards_4ee38d0c58.mp4`,
      },
    },
  ] satisfies CarouselCard[],
};

export const gamesScrollList = {
  label: "Explore",
  sections: [
    {
      title: "Play",
      description:
        "With our flagship title Prize Kingdoms, we’re merging everything we’ve learned - innovative gameplay, deep social loops, and cutting-edge platform tech - intoone unforgettable experience. This is more than a game. This is the next evolution of mobile gaming.",
      sectionId: "section1",
    },
    {
      title: "Win",
      description:
        "Track your progress in real-time through your personal Boostlab Dashboard, where you can view your Boostlab Cash balance, see your referrals, and instantly cash out via Stripe. Whether you’re chasing loot or crushing quests, your time in the Kingdom now comes with real value.",
      sectionId: "section2",
    },
    {
      title: "Earn",
      description:
        "With every roll, you’re not just playing—you’re earning. Prize Kingdoms is powered by Boostlab’s Payment and Tracking Engine, letting you collect Boostlab Cash as you play, win sweepstakes, and complete in-game quests.",
      sectionId: "section3",
    },
  ] satisfies ScrollListSection[],
};

export const gamesCta = {
  label: "Play",
  heading: "your adventure begins here.",
  downloadLinks,
  backgroundMedia: {
    mime: "image/jpeg",
    alt: "illustration with dice and a sky",
    url: `${IMG}/Container_d353c1105e.jpg`,
    width: 2800,
    height: 1200,
  } satisfies CmsMedia,
};

export const gamesBoostlabPay = {
  label: "BoostlabPay",
  title: "gaming that pays you back.",
  description:
    "The BOOSTLABPAY App is the first peer-to-peer payment app that lets anyone turn their connections into cash. With a little help from AI.",
  cta: { label: "Explore", url: "/boostlabpay" } satisfies CmsLink,
};
