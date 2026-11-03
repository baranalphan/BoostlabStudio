import Image from "next/image";
import { Container, Grid, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { TiltCard } from "../ui/TiltCard";
import { homeCards } from "../content";
import styles from "./Cards.module.css";

const SIZES = "(min-width: 48rem) 33vw, 100vw";

/**
 * The source's ComponentBlocksCards. Three 0.72:1 game artwork cards with the game's title
 * on top, under a centred heading. Hovering tilts the card towards the pointer, lights it
 * with a glare and holographic sheen, casts a glow in the artwork's own colours and
 * pushes the other cards back.
 */
export function Cards() {
  return (
    <section className={styles.main}>
      <Container className={styles.container}>
        <Grid>
          <div className={styles.item12}>
            <div className={styles.inner}>
              <div className={styles.titleWrapper}>
                <h2 className={styles.title}>
                  <SplitText>{homeCards.title}</SplitText>
                </h2>
              </div>

              <div className={styles.itemsWrapper}>
                {homeCards.cards.map((card, i) => {
                  const live = "url" in card;
                  return (
                    <TiltCard className={styles.card} key={card.title}>
                      <div className={styles.glow} aria-hidden="true">
                        <Image src={card.image.url} alt="" width={card.image.width} height={card.image.height} sizes={SIZES} />
                      </div>

                      <div className={styles.item} data-card-index>
                        {live ? (
                          <a
                            className={styles.cardLink}
                            href={card.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`${card.title} on Steam`}
                          />
                        ) : null}
                        <div className={styles.itemMedia}>
                          <Image
                            className={styles.itemImage}
                            src={card.image.url}
                            alt={card.image.alt}
                            width={card.image.width}
                            height={card.image.height}
                            sizes={SIZES}
                          />
                        </div>
                        <span className={styles.itemHolo} aria-hidden="true" />
                        <span className={styles.itemGlare} aria-hidden="true" />

                        <div className={styles.itemInner}>
                          <span className={styles.itemIndex} aria-hidden="true">
                            {String(i + 1).padStart(2, "0")} / {String(homeCards.cards.length).padStart(2, "0")}
                          </span>
                          <div className={styles.itemContent}>
                            <p className={styles.itemTitle}>
                              <SplitText delay={0.7}>{card.title}</SplitText>
                            </p>
                            <span className={styles.itemCta} data-live={live} aria-hidden="true">
                              {live ? "Play on Steam" : "Coming soon"}
                              <span className={styles.itemCtaIcon}>{live ? "↗" : "•"}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          </div>
        </Grid>
      </Container>
      <Spacer size="xs" />
    </section>
  );
}
