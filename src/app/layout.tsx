import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Header } from "@/components/sites/inkgames/layout/Header";
import { Footer } from "@/components/sites/inkgames/layout/Footer";
import { Cookies } from "@/components/sites/inkgames/layout/Cookies";
import { PageLoader } from "@/components/sites/inkgames/layout/PageLoader";
import { SmoothScroll } from "@/components/sites/inkgames/layout/SmoothScroll";
import { R3FCanvas } from "@/components/sites/inkgames/three/R3FCanvas";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0E11",
};

export const metadata: Metadata = {
  // Resolves the relative OG/Twitter image paths. Point NEXT_PUBLIC_SITE_URL at the
  // deployed origin; Vercel supplies VERCEL_URL automatically.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: "INK Games",
  description:
    "INK Games is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
  openGraph: {
    title: "INK Games",
    description:
      "INK Games is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
    images: [{ url: "/sites/inkgames/images/meta_image_0a45c42195.png", alt: "INK Games" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "INK Games",
    description:
      "INK Games is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.",
    images: [{ url: "/sites/inkgames/images/meta_image_0a45c42195.png", alt: "INK Games" }],
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
