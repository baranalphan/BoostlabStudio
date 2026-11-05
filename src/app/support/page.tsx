import type { Metadata } from "next";
import { Spacer } from "@/components/sites/boostlab/ui/Layout";
import { SupportHero } from "@/components/sites/boostlab/blocks/SupportHero";
import { ContactForm } from "@/components/sites/boostlab/blocks/ContactForm";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { webPage } from "@/lib/structuredData";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description:
    "Get in touch with Boostlab Game Studio for player support, general enquiries and investment opportunities.",
  path: "/support",
});

const contactPage = { "@context": "https://schema.org", ...webPage({ type: "ContactPage", path: "/support", name: "Support" }) };

export default function SupportPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactPage)} />
      {/* Clears the fixed header. */}
      <Spacer size="10rem" />
      <SupportHero />
      <ContactForm />
    </div>
  );
}
