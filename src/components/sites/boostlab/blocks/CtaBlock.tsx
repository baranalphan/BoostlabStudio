import Image from "next/image";
import { Kicker, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { gamesCta } from "../content";
import styles from "./CtaBlock.module.css";

/** The source's ComponentBlocksCtaBlock: a dark-scrimmed board illustration with the
 *  closing line and the store badges. */
export function CtaBlock() {
  return (
    <section className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.background} aria-hidden="true">
          <Image
            src={gamesCta.backgroundMedia.url}
            alt={gamesCta.backgroundMedia.alt ?? ""}
            width={gamesCta.backgroundMedia.width ?? 2800}
            height={gamesCta.backgroundMedia.height ?? 1200}
            sizes="100vw"
          />
        </div>
        <div className={styles.content}>
          <Reveal>
            <Kicker>{gamesCta.label}</Kicker>
          </Reveal>
          <h2 className={styles.heading}>
            <SplitText>{gamesCta.heading}</SplitText>
          </h2>
          <div className={styles.downloadLinks}>
            {gamesCta.downloadLinks.map((link) => (
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
        </div>
      </div>
      <Spacer size="xs" />
    </section>
  );
}
