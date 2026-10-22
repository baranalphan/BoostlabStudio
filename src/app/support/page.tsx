import type { Metadata } from "next";
import { Spacer } from "@/components/sites/boostlab/ui/Layout";
import { SupportHero } from "@/components/sites/boostlab/blocks/SupportHero";
import { DepartmentLinks } from "@/components/sites/boostlab/blocks/DepartmentLinks";
import { FAQs } from "@/components/sites/boostlab/blocks/FAQs";
import { CtaBlock } from "@/components/sites/boostlab/blocks/CtaBlock";
import { supportCta } from "@/components/sites/boostlab/content";

const description =
  "Boostlab is redefining how play and rewards connect. Our hit game Prize Kingdoms brings that experience to life with fun, rewards, and real cash prizes.";

export const metadata: Metadata = {
  title: "Support | Boostlab",
  description,
  openGraph: {
    title: "Support | Boostlab",
    description,
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Boostlab",
    description,
    images: [{ url: "/sites/boostlab/images/meta_image_0a45c42195.png", alt: "Boostlab" }],
  },
};

export default function SupportPage() {
  return (
    <>
      {/* Clears the fixed header — the source opens this page with a 10rem spacer. */}
      <Spacer size="10rem" />
      <SupportHero />
      <DepartmentLinks />
      <FAQs />
      <CtaBlock
        variant="link"
        background={supportCta.backgroundMedia}
        heading={supportCta.heading}
        description={supportCta.description}
        cta={supportCta.cta}
      />
    </>
  );
}
