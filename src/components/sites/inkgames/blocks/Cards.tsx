import { Container, Grid, Kicker, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { R3FBlock } from "../three/R3FBlock";
import { CardsScene } from "../three/CardsScene";
import { homeCards } from "../content";
import styles from "./Cards.module.css";

/**
 * The source's ComponentBlocksCards. Three 0.72:1 cards, each a live 3d scene behind the
 * card's label and title, under a centred heading and a CTA.
 */
export function Cards() {
  return (
    <section className={styles.main}>
      <Container className={styles.container}>
        <Grid>
          <div className={styles.item12}>
            <div className={styles.inner}>
              <div className={styles.titleWrapper}>
                <Reveal>
                  <Kicker>{homeCards.label}</Kicker>
                </Reveal>
                <h2 className={styles.title}>
                  <SplitText>{homeCards.title}</SplitText>
                </h2>
              </div>

              <div className={styles.itemsWrapper}>
                {homeCards.cards.map((card) => (
                  <div className={styles.item} key={card.cardVariant} data-card-index>
                    <R3FBlock>
                      <CardsScene variant={card.cardVariant} />
                    </R3FBlock>
                    <div className={styles.itemInner}>
                      <div className={styles.itemContent}>
                        <Reveal delay={0.6}>
                          <Kicker>{card.label}</Kicker>
                        </Reveal>
                        <p className={styles.itemTitle}>
                          <SplitText delay={0.7}>{card.title}</SplitText>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button href={homeCards.cta.url} variant="secondary" withIcon>
                {homeCards.cta.label}
              </Button>
            </div>
          </div>
        </Grid>
      </Container>
      <Spacer size="xs" />
    </section>
  );
}
