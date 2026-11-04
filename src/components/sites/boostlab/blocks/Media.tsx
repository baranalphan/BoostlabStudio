import { cn } from "@/lib/utils";
import { Container, Kicker, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import type { SiteMedia } from "@/types/boostlab";
import styles from "./Media.module.css";

/**
 * Text and a perspective-tilted video card sit side by side, centred as one unit.
 */
export function Media({
  label,
  title,
  description,
  media,
  headingLevel: Heading = "h2",
}: {
  label?: string;
  title: string;
  description?: string;
  /** A looping video; the card takes its aspect ratio, so nothing is cut off. */
  media: SiteMedia & { width: number; height: number };
  /** h1 when the block opens the page (games), so the page keeps a single main heading. */
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section className={styles.main}>
      <Container className={cn(styles.container, styles.landscapeRight)}>
        <div className={styles.contentWrapper}>
          {label ? (
            <Reveal>
              <Kicker>{label}</Kicker>
            </Reveal>
          ) : null}
          <Spacer size="m" />
          <Heading className={styles.title}>
            <SplitText>{title}</SplitText>
          </Heading>
          {description ? (
            <>
              <Spacer size="m" />
              {/* The body rises in line by line right behind the title, on a tight stagger. */}
              <p className={styles.body}>
                <SplitText delay={0.15} lineStagger={0.04} className={styles.bodyLines}>
                  {description}
                </SplitText>
              </p>
            </>
          ) : null}
        </div>

        <div
          className={cn(styles.imageWrapper, styles.ratioWrapper)}
          style={{ "--media-ratio": `${media.width} / ${media.height}` } as React.CSSProperties}
        >
          <div className={cn(styles.mediaOuter, styles.perspective)}>
            <div className={styles.mediaInner}>
              <div className={styles.mediaFill}>
                <video
                  src={media.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={media.alt ?? undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
