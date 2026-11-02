import type { Metadata } from "next";
import { Spacer } from "@/components/sites/boostlab/ui/Layout";
import { SupportHero } from "@/components/sites/boostlab/blocks/SupportHero";
import { DepartmentLinks } from "@/components/sites/boostlab/blocks/DepartmentLinks";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description:
    "Get in touch with Boostlab Game Studio for player support, general enquiries and investment opportunities.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      {/* Clears the fixed header — the source opens this page with a 10rem spacer. */}
      <Spacer size="10rem" />
      <SupportHero />
      <DepartmentLinks />
    </>
  );
}
