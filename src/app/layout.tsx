import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Header } from "@/components/sites/boostlab/layout/Header";
import { Footer } from "@/components/sites/boostlab/layout/Footer";
import { Cookies } from "@/components/sites/boostlab/layout/Cookies";
import { PageLoader } from "@/components/sites/boostlab/layout/PageLoader";
import { SmoothScroll } from "@/components/sites/boostlab/layout/SmoothScroll";
import { R3FCanvas } from "@/components/sites/boostlab/three/R3FCanvas";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // Resolves the relative OG/Twitter image paths. Point NEXT_PUBLIC_SITE_URL at the
  // deployed origin; Vercel supplies VERCEL_URL automatically.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: "Boostlab",
  description:
    "Boostlab is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
  openGraph: {
    title: "Boostlab",
    description:
      "Boostlab is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boostlab",
    description:
      "Boostlab is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <PageLoader />
        <Cookies />
        <Header />
        <R3FCanvas />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
