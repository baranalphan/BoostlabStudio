import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Header } from "@/components/sites/boostlab/layout/Header";
import { Footer } from "@/components/sites/boostlab/layout/Footer";
import { SmoothScroll } from "@/components/sites/boostlab/layout/SmoothScroll";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // Resolves every relative URL below (canonical, OG image) against the live domain.
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  keywords: [
    "Boostlab",
    "Boostlab Game Studio",
    "indie game studio",
    "indie games",
    "Steam games",
    "Idle Reef",
    "Pyramid Diggers",
    "Sins Simulator",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "games",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...pageMetadata({ path: "/" }),
};

/** Who we are, for search engines: the studio, its logo and its official profiles. */
const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Boostlab Studio",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: "info@boostlabgames.com",
      sameAs: Object.values(SOCIAL_LINKS),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
