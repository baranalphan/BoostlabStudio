/**
 * All of the site's copy, links and media in one place. Images and videos are served
 * from public/sites/boostlab.
 */

import type {
  CarouselCard,
  CmsLink,
  CmsMedia,
  DepartmentLink,
  NewsItem,
} from "@/types/boostlab";

const IMG = "/sites/boostlab/images";
const VID = "/sites/boostlab/videos";

/** Steam store pages, tagged with the Boostlab curator so visits are attributed to us. */
const IDLE_REEF_STEAM = "https://store.steampowered.com/app/5188560/Idle_Reef/?curator_clanid=46610619";

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

/** Footer social icons. Links without a `url` are shown but not clickable yet. */
export const footer = {
  copyright: "Boostlab Studio",
  socials: [
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/idlereef?rpxt=dm84OG10eHZnZDQ=" },
    { label: "Steam", icon: "steam", url: "https://store.steampowered.com/curator/46610619" },
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/company/boostlab-info/" },
    { label: "Discord", icon: "discord" },
  ] as { label: string; icon: "instagram" | "steam" | "linkedin" | "discord"; url?: string }[],
};

/* ------------------------------------------------------------------ homepage */

export const homeHero = {
  title: "All in for gaming",
};

export const homeAbout = {
  label: "Boostlab",
  title: "A studio which brings all to the table",
  media: {
    mime: "video/mp4",
    alt: "Animated Boostlab Studio logo",
    url: `${VID}/boostlab-logo.mp4`,
    width: 800,
    height: 800,
    animation: true,
  } satisfies CmsMedia,
};

export const homeCards = {
  title: "The goods.",
  cards: [
    {
      title: "Sins Simulator",
      image: { url: `${IMG}/sins-simulator-vertical.png`, alt: "Sins Simulator", width: 1496, height: 1792 },
    },
    {
      title: "Idle Reef",
      url: IDLE_REEF_STEAM,
      image: { url: `${IMG}/idle-reef-logo-blue.png`, alt: "Idle Reef logo", width: 1080, height: 1080 },
    },
    {
      title: "Pyramid Diggers",
      image: { url: `${IMG}/pyramid-4.png`, alt: "Pyramid Diggers", width: 1496, height: 1792 },
    },
  ] as const,
};

export const homeNews = {
  label: "Updates",
  title: "Latest from  Boostlab",
  news: [
    {
      date: "2026-09-15",
      title: "Partnerships",
      description: "Boostlab Studio partners with PlayWay S.A.",
      image: {
        mime: "image/png",
        alt: "Boostlab logo",
        url: `${IMG}/boostlab-logo-bg.png`,
        width: 1920,
        height: 1080,
      },
    },
    {
      date: "2026-10-31",
      title: "Release",
      description: "Idle Reef is now available on Steam",
      image: {
        mime: "image/png",
        alt: "Idle Reef",
        url: `${IMG}/idle-reef-logo-blue.png`,
        width: 1080,
        height: 1080,
      },
    },
    {
      title: "Upcoming",
      description: "Pyramid Diggers is coming soon",
      image: {
        mime: "image/png",
        alt: "Pyramid Diggers",
        url: `${IMG}/pyramid-4.png`,
        width: 1496,
        height: 1792,
      },
    },
    {
      title: "Upcoming",
      description: "Sins Simulator is coming soon",
      image: {
        mime: "image/png",
        alt: "Sins Simulator",
        url: `${IMG}/sins-simulator-vertical.png`,
        width: 1496,
        height: 1792,
      },
    },
  ] satisfies NewsItem[],
};

/* --------------------------------------------------------------------- games */

export const gamesHero = {
  video: {
    mime: "video/mp4",
    alt: "Boostlab",
    url: `${VID}/boostlab-wide.mp4`,
    width: 1920,
    height: 1040,
  } satisfies CmsMedia,
};

export const gamesAbout = {
  label: "Boostlab Studio",
  title: "Explore the worlds we build",
  description:
    "We're a small, independent studio making the games we want to play. Every world we build starts as a crazy idea, gets shaped by our players and ships with its own personality. Different genres, different worlds, the same obsession with fun. This is just the beginning, and there are plenty more games on the way.",
  media: {
    mime: "video/mp4",
    alt: "We are Boostlab",
    url: `${VID}/we-are-boostlab.mp4`,
    width: 1492,
    height: 1920,
  } satisfies CmsMedia,
};

export const gamesCarousel = {
  label: "Explore",
  title: "Our games",
  cards: [
    {
      title: "Sins Simulator",
      image: {
        mime: "image/png",
        alt: "Sins Simulator",
        url: `${IMG}/sins-simulator-vertical.png`,
        width: 1496,
        height: 1792,
      },
    },
    {
      title: "Idle Reef",
      url: IDLE_REEF_STEAM,
      image: {
        mime: "image/jpeg",
        alt: "Idle Reef",
        url: `${IMG}/idle-reef.jpg`,
        width: 748,
        height: 896,
      },
    },
    {
      title: "Pyramid Diggers",
      image: {
        mime: "image/png",
        alt: "Pyramid Diggers",
        url: `${IMG}/pyramid-4.png`,
        width: 1496,
        height: 1792,
      },
    },
  ] satisfies CarouselCard[],
};

export const gamesCta = {
  label: "Play",
  heading: "Find our games on Steam.",
  steamLink: {
    label: "Download on Steam",
    url: "https://store.steampowered.com/curator/46610619",
    newTab: true,
  } satisfies CmsLink,
};

/* ------------------------------------------------------------------- support */

export const supportHero = {
  title: "How can we help?",
};

export const supportDepartments = {
  items: [
    {
      title: "For general",
      description: "Connect with us.",
      cta: { label: "info@boostlab.com", url: "mailto:info@boostlab.com" },
    },
    {
      title: "For support",
      description: "Need assistance? Reach out to our support team.",
      cta: { label: "support@boostlab.com", url: "mailto:support@boostlab.com" },
    },
    {
      title: "For investment",
      description: "Unlock potential. Enquire about investment opportunities today.",
      cta: { label: "investor@boostlab.com", url: "mailto:investor@boostlab.com" },
    },
  ] satisfies DepartmentLink[],
};
