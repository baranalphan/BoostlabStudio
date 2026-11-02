import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container, Kicker, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import type { CmsMedia } from "@/types/boostlab";
import styles from "./Media.module.css";

/**
 * The source's ComponentBlocksMedia. Text and a perspective-tilted media card sit side
 * by side, centred as one unit.
 */
export function Media({
  label,
  title,
  description,
  media,
}: {
  label?: string;
  title: string;
  description?: string;
  media: CmsMedia;
}) {
  const isVideo = media.mime.startsWith("video");
  // GIFs and looping logo animations share the same framed, uncropped treatment.
  const isGif = media.url.endsWith(".gif") || Boolean(media.animation);
  // Other videos get a card in the video's own aspect ratio instead of the 1.5:1 crop,
  // so nothing is cut off.
  const ownRatio = isVideo && !isGif && media.width && media.height;

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
        </div>

        <div
          className={cn(styles.imageWrapper, isGif && styles.gifWrapper, ownRatio && styles.ratioWrapper)}
          style={
            ownRatio
              ? ({ "--media-ratio": `${media.width} / ${media.height}` } as React.CSSProperties)
              : undefined
          }
        >
          <div className={cn(styles.mediaOuter, styles.perspective)}>
            <div className={styles.mediaInner}>
              <div
                className={cn(
                  styles.mediaFill,
                  !isGif && !ownRatio && styles.scaleUp,
                  isGif && styles.mediaFillGif
                )}
              >
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
                    unoptimized={media.url.endsWith(".gif")}
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
