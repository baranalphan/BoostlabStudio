/**
 * All of the site's copy, links and media in one place. Images are served from
 * public/sites/boostlab; videos are imported from src/assets/boostlab/videos so they get
 * a hashed, long-cached URL (see next.config.ts).
 */

import type {
  SiteLink,
  SiteMedia,
  ContactField,
  NewsItem,
  ShowreelGame,
} from "@/types/boostlab";
import weAreBoostlabVideo from "@/assets/boostlab/videos/we-are-boostlab.mp4";
import idleReefVideo from "@/assets/boostlab/videos/idle-reef-trailer.mp4";
import pyramidDiggersVideo from "@/assets/boostlab/videos/pyramid-diggers.mp4";

const IMG = "/sites/boostlab/images";

/** Steam store pages, tagged with the Boostlab curator so visits are attributed to us. */
const IDLE_REEF_STEAM = "https://store.steampowered.com/app/5188560/Idle_Reef/?curator_clanid=46610619";

export const header = {
  logo: {
    url: "/sites/boostlab/images/boostlab-logo-seffaf.webp",
    alt: "Boostlab",
    width: 214,
    height: 240,
  },
  links: [
    { label: "Games", url: "/games" },
    { label: "Support", url: "/support" },
  ] satisfies SiteLink[],
};

/** Footer social icons. Links without a `url` are shown but not clickable yet. */
export const footer = {
  copyright: "Boostlab Studio",
  legal: [{ label: "Terms", url: "/terms" }] satisfies SiteLink[],
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
  label: "Boostlab Studio",
  title: "Dive into the worlds we drop",
  description:
    "We're a small studio making our own rules. Every realm we build sparks from a wild idea, gets sculpted by our squad of players, and hits the scene with its own raw attitude. Different genres, different vibes, same obsession with pure fun. We're just getting warmed up, plenty more heavy hitters on the way.",
  media: {
    mime: "video/mp4",
    alt: "We are Boostlab",
    url: weAreBoostlabVideo,
    width: 1120,
    height: 1440,
  } satisfies SiteMedia,
};

export const homeNews = {
  label: "Updates",
  title: "Latest from  Boostlab",
  news: [
    {
      date: "2026-09-15",
      title: "Partnerships",
      description: "Boostlab Studio partners with PlayWay S.A.",
    },
    {
      date: "2026-10-31",
      title: "Release",
      description: "Idle Reef is now available on Steam",
    },
    {
      title: "Upcoming",
      description: "Pyramid Diggers is coming soon",
    },
    {
      title: "Upcoming",
      description: "Sins Simulator is coming soon",
    },
  ] satisfies NewsItem[],
};

/* --------------------------------------------------------------------- games */

/**
 * The showreel that opens the games page. To add a game's clip, drop the MP4 in
 * src/assets/boostlab/videos, import it at the top of this file and set `video` to the
 * import; the poster keeps showing until it loads.
 */
export const gamesShowreel = {
  label: "Showreel",
  title: "See them in action",
  /** The scroll journey under the showreel. */
  journey: {
    label: "Explore",
    title: "Our games",
    hint: "Scroll to travel",
  },
  games: [
    {
      title: "Idle Reef",
      accent: "#4cb8ff",
      theme: "reef",
      video: idleReefVideo,
      icon: { url: `${IMG}/idle-reef-icon-cutout.webp`, cutout: true },
      tagline: "Your desktop. Now an aquarium.",
      blurb:
        "Idle Reef turns the screen you work on into a living reef. Hatch eggs, discover new fish and earn points while you work.",
      tags: ["Idle", "Desktop aquarium"],
      url: IDLE_REEF_STEAM,
      logo: { url: `${IMG}/idle-reef-logo.webp`, width: 779, height: 577 },
      shots: [`${IMG}/shots/idle-reef-2.webp`, `${IMG}/shots/idle-reef-1.webp`, `${IMG}/shots/idle-reef-3.webp`],
      poster: {
        mime: "image/jpeg",
        alt: "Idle Reef",
        url: `${IMG}/idle-reef.jpg`,
        width: 748,
        height: 896,
      },
    },
    {
      title: "Pyramid Diggers",
      accent: "#f0a64a",
      theme: "desert",
      video: pyramidDiggersVideo,
      // The clip is 2:1 letterboxed to 1920 × 1080 (60 px bars top and bottom): 1080 / 960,
      // plus a hair so no dark edge row survives scaling.
      videoZoom: 1.13,
      icon: { url: `${IMG}/pyramid-diggers-icon.webp`, cutout: true },
      tagline: "Raise a wonder, block by block.",
      blurb:
        "Lead your workers across the desert, haul stone and raise monuments until your pyramid touches the sky. Just keep an eye on what's up there.",
      tags: ["Building", "Ancient Egypt"],
      logo: { url: `${IMG}/pyramid-diggers-logo.webp`, width: 952, height: 700 },
      shots: [`${IMG}/shots/pyramid-1.webp`, `${IMG}/shots/pyramid-2.webp`, `${IMG}/shots/pyramid-3.webp`],
      poster: {
        mime: "image/webp",
        alt: "Pyramid Diggers",
        url: `${IMG}/pyramid-diggers-poster.webp`,
        width: 1496,
        height: 1792,
      },
    },
    {
      title: "Sins Simulator",
      accent: "#ff4d5e",
      theme: "city",
      // No clip: the reel shows the "coming soon" card.
      icon: { url: `${IMG}/sins-simulator-icon.webp`, cutout: true },
      tagline: "Content rated: spicy.",
      blurb:
        "A rain-soaked city where every deal is a risk. Hustle your way up from the street and build an empire after dark.",
      tags: ["Simulation", "Crime"],
      logo: { url: `${IMG}/sins-simulator-logo.webp`, width: 1000, height: 478 },
      shots: [`${IMG}/shots/sins-0.webp`, `${IMG}/shots/sins-2.webp`, `${IMG}/shots/sins-1.webp`],
      poster: {
        mime: "image/webp",
        alt: "Sins Simulator",
        url: `${IMG}/sins-simulator-poster.webp`,
        width: 1496,
        height: 1792,
      },
    },
  ] as ShowreelGame[],
};

export const gamesCta = {
  label: "Play",
  heading: "Find our games on Steam.",
  steamLink: {
    label: "Download on Steam",
    url: "https://store.steampowered.com/curator/46610619",
    newTab: true,
  } satisfies SiteLink,
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

/* --------------------------------------------------------------------- terms */

/** The Terms of Use page. Bump `updated` whenever the wording changes. */
export const terms = {
  kicker: "Legal",
  title: "Terms of Use",
  updated: "2026-11-05",
  intro:
    "These terms apply to boostlabgames.com (the \"site\"), run by Boostlab Studio (\"Boostlab\", \"we\", \"us\"). By using the site you agree to them. If you don't agree, please don't use the site.",
  sections: [
    {
      heading: "About the site",
      body: [
        "The site introduces our studio and our games. We don't sell anything on it: our games are distributed through third-party stores such as Steam.",
      ],
    },
    {
      heading: "Games and purchases",
      body: [
        "Buying, downloading and playing our games happens on those stores and is governed by their own terms (for Steam, the Steam Subscriber Agreement) and by any licence that comes with the game.",
        "Details of upcoming games, such as features, content and release dates, may change before launch.",
      ],
    },
    {
      heading: "Our content",
      body: [
        "Game names, logos, artwork, screenshots, videos, text and code on the site belong to Boostlab or its licensors. You may link to the site and share our pages, but you may not copy, sell or reuse the content commercially without our written permission, except where the law allows it.",
        "For press, streaming or content-creator requests, get in touch through the support page.",
      ],
    },
    {
      heading: "Contacting us",
      body: [
        "When you send a message through the support page we receive your name, email address and message, and use them to reply to you. Please don't send anything unlawful, abusive or unsolicited advertising.",
      ],
    },
    {
      heading: "Using the site",
      body: [
        "Don't try to disrupt or overload the site, get into parts of it that aren't public, or use it for anything unlawful.",
      ],
    },
    {
      heading: "Links to other sites",
      body: [
        "The site links to services we don't run, such as Steam, Instagram and LinkedIn. Their own terms and privacy policies apply there, and we aren't responsible for their content.",
      ],
    },
    {
      heading: "No warranty",
      body: [
        "We work to keep the site accurate and available, but it is provided \"as is\". To the extent the law allows, we aren't liable for any loss that comes from using it or from relying on what it says.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "We may update these terms from time to time. The date at the top shows when they last changed, and continuing to use the site means you accept the current version.",
      ],
    },
  ],
};
