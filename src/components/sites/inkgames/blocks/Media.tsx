import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container, Kicker, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import type { CmsLink, CmsMedia, MediaVariation } from "@/types/inkgames";
import styles from "./Media.module.css";

const variationClass: Record<MediaVariation, string> = {
  LandscapeRight: styles.landscapeRight,
  LandscapeCenter: styles.landscapeCenter,
  LandscapeRightBottom: styles.landscapeRightBottom,
  PortraitRight: styles.landscapeRight,
};

/**
 * The source's ComponentBlocksMedia. A text column on the left and a perspective-tilted
 * media card on the right (or centred), with the card's crop and placement switching per
 * `variation`.
 */
export function Media({
  label,
  title,
  description,
  cta,
  media,
  variation = "LandscapeRight",
  priority = false,
}: {
  label?: string;
  title: string;
  description?: string;
  cta?: CmsLink;
  media: CmsMedia;
  variation?: MediaVariation;
  priority?: boolean;
}) {
  const isVideo = media.mime.startsWith("video");
  const perspective = variation !== "LandscapeRightBottom";

  return (
    <section className={styles.main}>
      <Container className={cn(styles.container, variationClass[variation])}>
        <div className={styles.contentWrapper}>
          {label ? (
            <Reveal>
              <Kicker>{label}</Kicker>
            </Reveal>
          ) : null}
          <Spacer size="m" />
          <h2 className={styles.title}>
            <SplitText>{title}</SplitText>
          </h2>
          {description ? (
            <>
              <Spacer size="m" />
              <Reveal delay={0.2}>
                <p className={styles.body}>{description}</p>
              </Reveal>
            </>
          ) : null}
          {cta ? (
            <>
              <Spacer size="m" />
              <Reveal delay={0.3}>
                <Button href={cta.url} newTab={cta.newTab} variant="secondary" withIcon>
                  {cta.label}
                </Button>
              </Reveal>
            </>
          ) : null}
        </div>

        <div className={styles.imageWrapper}>
          <div className={cn(styles.mediaOuter, perspective && styles.perspective)}>
            <div className={styles.mediaInner}>
              <div className={cn(styles.mediaFill, perspective && styles.scaleUp)}>
                {isVideo ? (
                  <video
                    src={media.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={media.alt ?? undefined}
                  />
                ) : (
                  <Image
                    src={media.url}
                    alt={media.alt ?? ""}
                    width={media.width ?? 1600}
                    height={media.height ?? 1200}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    preload={priority}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
