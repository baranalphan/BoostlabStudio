import Image from "next/image";
import { Container, Kicker, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import type { CmsLink, CmsMedia } from "@/types/boostlab";
import styles from "./CtaBlock.module.css";

type CtaBlockProps = {
  background: CmsMedia;
  heading: string;
  /**
   * `download` is the games page's closing panel — centred, tall, store badges.
   * `link` is the support page's — contained, left-aligned, heading + copy + button.
   */
  variant?: "download" | "link";
  label?: string;
  description?: string;
  downloadLinks?: CmsLink[];
  cta?: CmsLink;
};

/** The source's ComponentBlocksCtaBlock: a dark-scrimmed illustration with a closing
 *  line over it. */
export function CtaBlock({
  background,
  heading,
  variant = "download",
  label,
  description,
  downloadLinks,
  cta,
}: CtaBlockProps) {
  const isLink = variant === "link";

  const panel = (
    <div className={isLink ? `${styles.inner} ${styles.innerContained}` : styles.inner}>
      <div className={styles.background} aria-hidden="true">
        <Image
          src={background.url}
          alt={background.alt ?? ""}
          width={background.width ?? 2800}
          height={background.height ?? 1200}
          sizes="100vw"
        />
      </div>
      <div className={isLink ? `${styles.content} ${styles.contentStart}` : styles.content}>
        {label ? (
          <Reveal>
            <Kicker>{label}</Kicker>
          </Reveal>
        ) : null}

        {isLink ? (
          <h3 className={styles.headingLink}>
            <SplitText>{heading}</SplitText>
          </h3>
        ) : (
          <h2 className={styles.heading}>
            <SplitText>{heading}</SplitText>
          </h2>
        )}

        {description ? (
          <>
            <Spacer size="m" />
            <p className={styles.description}>
              <SplitText>{description}</SplitText>
            </p>
          </>
        ) : null}

        {cta ? (
          <>
            <Spacer size="m" />
            <Button href={cta.url} variant="secondary" withIcon>
              {cta.label}
            </Button>
          </>
        ) : null}

        {downloadLinks ? (
          <div className={styles.downloadLinks}>
            {downloadLinks.map((link) => (
              <div className={styles.downloadLink} key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer noopener">
                  <Image
                    src={`/sites/boostlab/download/${link.label === "App Store" ? "appstore" : "playstore"}.png`}
                    alt={link.label}
                    width={link.label === "App Store" ? 257 : 266}
                    height={74}
                  />
                </a>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <section className={styles.main}>
        <Container>
          <Spacer size="m" />
          {panel}
        </Container>
        <Spacer size="m" />
      </section>
    );
  }

  return (
    <section className={styles.main}>
      {panel}
      <Spacer size="xs" />
    </section>
  );
}
