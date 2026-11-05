import type { Metadata } from "next";
import { Container, Kicker, Spacer } from "@/components/sites/boostlab/ui/Layout";
import { supportContact, terms } from "@/components/sites/boostlab/content";
import { SITE_NAME, SITE_URL, jsonLd, pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: terms.title,
  description: `The terms for using the ${SITE_NAME} website.`,
  path: "/terms",
});

const termsPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/terms#webpage`,
  name: terms.title,
  url: `${SITE_URL}/terms`,
  dateModified: terms.updated,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const updated = new Date(`${terms.updated}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function TermsPage() {
  return (
    <Container className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(termsPage)} />
      {/* Clears the fixed header. */}
      <Spacer size="14rem" />
      <article className={styles.article}>
        <Kicker>{terms.kicker}</Kicker>
        <Spacer size="m" />
        <h1 className={styles.title}>{terms.title}</h1>
        <Spacer size="s" />
        <p className={styles.updated}>
          Last updated <time dateTime={terms.updated}>{updated}</time>
        </p>
        <Spacer size="m" />
        <p className={styles.body}>{terms.intro}</p>
        {terms.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className={styles.body}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <section className={styles.section}>
          <h2 className={styles.heading}>Contact</h2>
          <p className={styles.body}>
            Questions about these terms? Write to us at{" "}
            <a href={`mailto:${supportContact.email}`}>{supportContact.email}</a>.
          </p>
        </section>
      </article>
      <Spacer size="l" />
    </Container>
  );
}
