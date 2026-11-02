import type { Metadata } from "next";

/**
 * Site-wide SEO settings. Set NEXT_PUBLIC_SITE_URL to the production domain
 * (e.g. https://boostlab.studio) so canonical URLs, the sitemap and share cards point
 * at it. On Vercel the production domain is picked up automatically.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Boostlab Game Studio";

export const SITE_DESCRIPTION =
  "Boostlab Game Studio is an independent studio making the games we want to play: Idle Reef, Pyramid Diggers, Sins Simulator and plenty more on the way.";

export const SOCIAL_LINKS = {
  steam: "https://store.steampowered.com/curator/46610619",
  instagram: "https://www.instagram.com/idlereef",
  linkedin: "https://www.linkedin.com/company/boostlab-info/",
};

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Boostlab Game Studio logo",
};

/**
 * Builds a page's metadata. Next.js replaces (rather than merges) nested fields like
 * `openGraph` between segments, so every page gets the full set from here.
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
}: {
  /** Page name; the layout's template appends " | Boostlab Game Studio". Omit on home. */
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** Serialises JSON-LD for a <script> tag, escaping `<` so the payload can't close it. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
