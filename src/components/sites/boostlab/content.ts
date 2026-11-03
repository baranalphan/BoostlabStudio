/**
 * All of the site's copy, links and media in one place. Images and videos are served
 * from public/sites/boostlab.
 */

import type {
  CarouselCard,
  CmsLink,
  CmsMedia,
  ContactField,
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

/** Footer social icons. Links without a `url` are shown but not clickable yet. */
export const footer = {
  copyright: "Boostlab Studio",
  socials: [
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/idlereef" },
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
  title: "Dive into the worlds we drop",
  description:
    "We're a small studio making our own rules. Every realm we build sparks from a wild idea, gets sculpted by our squad of players, and hits the scene with its own raw attitude. Different genres, different vibes, same obsession with pure fun. We're just getting warmed up, plenty more heavy hitters on the way.",
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
      theme: "city",
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
      theme: "reef",
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
      theme: "desert",
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

export const supportContact = {
  kicker: "Contact",
  title: "Let's talk games",
  description:
    "Hit a bug, have feedback on one of our games or want to team up on what's next? Send us a message and our team will get back to you.",
  topics: ["Player support", "Bug reports", "Feedback", "Business & press"],
  emailLabel: "Or write to us directly",
  email: "info@boostlabgames.com",
  fields: {
    name: { label: "Name Surname", placeholder: "John Doe" },
    email: { label: "Email", placeholder: "you@example.com" },
    subject: { label: "Subject", placeholder: "What is it about?" },
    message: { label: "Message", placeholder: "Tell us how we can help." },
  } satisfies Record<ContactField, { label: string; placeholder: string }>,
  /** Max characters per field, enforced in the browser and again by the Server Action. */
  limits: { name: 100, email: 200, subject: 150, message: 5000 } satisfies Record<
    ContactField,
    number
  >,
  submit: "Send message",
  sending: "Sending…",
  success: "Thanks! Your message has been sent. We'll get back to you soon.",
  error: "Something went wrong and your message wasn't sent. Please try again.",
};
