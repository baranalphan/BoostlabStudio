/**
 * Content lifted verbatim from the source's RSC flight payload (the Strapi response it
 * ships with each page). Media URLs are rewritten to the locally downloaded copies —
 * see docs/research/inkgames/page-brief.md for the source → local asset map.
 */

import type {
  CarouselCard,
  CmsLink,
  CmsMedia,
  GamesTab,
  NewsItem,
  ScrollListSection,
} from "@/types/inkgames";

const IMG = "/sites/inkgames/images";
const VID = "/sites/inkgames/videos";

export const DASHBOARD_URL = "https://dashboard.inkgames.com";

export const header = {
  links: [
    { label: "Games", url: "/games" },
    { label: "Studio", url: "/studio" },
    { label: "Support", url: "/support" },
  ] satisfies CmsLink[],
  loginLink: { label: "Login", url: `${DASHBOARD_URL}/login`, newTab: true } satisfies CmsLink,
  signUpLink: { label: "Sign up", url: `${DASHBOARD_URL}/sign-up`, newTab: true } satisfies CmsLink,
  inkIDLink: { label: "Ink ID", url: `${DASHBOARD_URL}/sign-up`, newTab: true } satisfies CmsLink,
};

export const cookies = {
  text: "This website uses cookies.",
  moreButton: { label: "Learn More", url: "/privacy" } satisfies CmsLink,
};

export const footer = {
  address: {
    title: "Find us",
    description: "INK Games\n3200 Palm Way 122\nAustin, Texas\n78756",
  },
  inkLinks: {
    title: "INKGames",
    links: [
      { label: "Games", url: "/games" },
      { label: "INK HQ", url: "/studio" },
      { label: "Support", url: "/support" },
      { label: "Invest", url: "mailto:invest@inkgames.com" },
      { label: "INK ID", url: `${DASHBOARD_URL}/sign-up` },
    ] satisfies CmsLink[],
  },
  socialLinks: {
    title: "Follow",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/inkgames", newTab: true },
      { label: "X", url: "https://x.com/inkgames", newTab: true },
      { label: "TikTok", url: "https://www.tiktok.com/@inkgames", newTab: true },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/ink-games", newTab: true },
    ] satisfies CmsLink[],
  },
  contactLinks: {
    title: "Contact",
    links: [
      { label: "Info", url: "mailto:info@inkgames.com" },
      { label: "Support", url: "/support" },
      { label: "Invest", url: "mailto:investor@inkhq.com" },
      { label: "HQ", url: "mailto:info@inkgames.com" },
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
  label: "InkGames",
  title: "Defining the next generation of gaming",
  cta: { label: "Explore", url: "/games" } satisfies CmsLink,
  media: {
    mime: "image/jpeg",
    alt: "someone working on a tablet",
    url: `${IMG}/ink_about_image_16bea9b81d.jpg`,
    width: 872,
    height: 1108,
  } satisfies CmsMedia,
};

export const homeExplore = {
  label: "InkGames",
  title: "Explore the world of prize kingdoms",
  cta: { label: "Explore", url: "/games" } satisfies CmsLink,
};

export const homeCards = {
  label: "InkPay",
  title: "Play. Win. Earn.",
  cta: { label: "Create your Ink ID", url: `${DASHBOARD_URL}/sign-up` } satisfies CmsLink,
  cards: [
    { label: "Play", title: "Build your kingdom", cardVariant: "play" },
    { label: "Win", title: "Crush your oponents", cardVariant: "win" },
    { label: "Earn", title: "Earn real rewards", cardVariant: "earn" },
  ] as const,
};

export const homeNews = {
  label: "Updates",
  title: "Latest from  Ink Games",
  news: [
    {
      date: "2025-05-14",
      title: "Partnerships",
      description: "INK Games Join Forces with PayOS",
      url: "https://www.theglobeandmail.com/investing/markets/markets-news/GetNews/32402875/inkpay-and-ink-games-join-forces-with-payos-brings-aidriven-payments-to-life/",
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
      description: "INK Games Launches Revolutionary Monetization Features",
      url: "https://imanetwork.org/ink-games-launches-revolutionary-monetization-features-into-free-to-earn-flagship-mobile-title-prize-kingdoms/",
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

export const homeHq = {
  label: "InkHQ",
  title: "Step inside the Ink HQ",
  cta: { label: "Explore", url: "/studio" } satisfies CmsLink,
  media: {
    mime: "video/mp4",
    alt: "ink studio presentation",
    url: `${VID}/inkstudio_02eda12a0e.mp4`,
  } satisfies CmsMedia,
};

/* --------------------------------------------------------------------- games */

export const downloadLinks = [
  { label: "App Store", url: "https://apps.apple.com/us/app/prize-kingdoms/id1554511237" },
  {
    label: "Play Store",
    url: "https://play.google.com/store/apps/details?id=com.inkgames.prizekingdoms&hl=en_GB",
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
    alt: "ink games trailer",
    url: `${VID}/inkgames_ad2339efda.mp4`,
  } satisfies CmsMedia,
  downloadLinks,
};

export const gamesAbout = {
  label: "Explore",
  title: "Explore the world of Prize Kingdoms",
  description:
    "Prize Kingdoms is the first mobile game with a built-in sweepstakes engine, combining dice rolls, kingdom building, and real-world prizes. Collect tickets, gems, and coins to upgrade your kingdom and unlock powerful boosters. Play with friends, raid their kingdoms, and complete collectible card sets to earn even more rewards. Every roll brings you closer to fortune.",
  media: {
    mime: "image/jpeg",
    alt: "someone working on a tablet",
    url: `${IMG}/ink_about_image_16bea9b81d.jpg`,
    width: 872,
    height: 1108,
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
        "Track your progress in real-time through your personal INK Dashboard, where you can view your INK Cash balance, see your referrals, and instantly cash out via Stripe. Whether you’re chasing loot or crushing quests, your time in the Kingdom now comes with real value.",
      sectionId: "section2",
    },
    {
      title: "Earn",
      description:
        "With every roll, you’re not just playing—you’re earning. Prize Kingdoms is powered by INK’s Payment and Tracking Engine, letting you collect INK Cash as you play, win sweepstakes, and complete in-game quests.",
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

export const gamesInkPay = {
  label: "InkPay",
  title: "gaming that pays you back.",
  description:
    "The INKPAY App is the first peer-to-peer payment app that lets anyone turn their connections into cash. With a little help from AI.",
  cta: { label: "Explore", url: "/inkpay" } satisfies CmsLink,
};
