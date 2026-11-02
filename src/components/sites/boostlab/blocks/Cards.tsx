import Image from "next/image";
import { Container, Grid, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { homeCards } from "../content";
import styles from "./Cards.module.css";

/**
 * The source's ComponentBlocksCards. Three 0.72:1 game artwork cards with the game's title
 * on top, under a centred heading. Hovering lifts the card, zooms the artwork
 * and sweeps a highlight across it.
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
                {homeCards.cards.map((card) => (
                  <div className={styles.item} key={card.title} data-card-index>
                    {"url" in card ? (
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
                        sizes="(min-width: 48rem) 33vw, 100vw"
                      />
                      <span className={styles.itemShine} aria-hidden="true" />
                    </div>
                    <div className={styles.itemInner}>
                      <div className={styles.itemContent}>
                        <p className={styles.itemTitle}>
                          <SplitText delay={0.7}>{card.title}</SplitText>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>
      </Container>
      <Spacer size="xs" />
    </section>
  );
}
