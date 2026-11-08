import type { Metadata } from "next";
import { QrLanding } from "@/components/sites/boostlab/blocks/QrLanding";
import { qrLanding } from "@/components/sites/boostlab/content";

/** Only the codes printed on the stickers exist; any other /q/<code> is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return qrLanding.codes.map((code) => ({ code }));
}

/** Reachable only by scanning a sticker: kept out of search results, and without a
 *  canonical URL so the root layout's one doesn't point crawlers back at the home page. */
export const metadata: Metadata = {
  // Absolute, so the layout's template doesn't turn it into "Boostlab | Boostlab Game Studio".
  title: { absolute: "Boostlab" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function QrPage() {
  return <QrLanding />;
}
