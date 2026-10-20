"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Container, Grid, Kicker } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { R3FBlock } from "../three/R3FBlock";
import { ScrollAnimScene } from "../three/ScrollAnimScene";
import { gamesInkPay } from "../content";
import styles from "./ScrollAnim.module.css";

/**
 * The source's ComponentBlocksScrollAnim: a 160vh pay-green section whose inner 100vh
 * stage pins while coins rain past the coin-eyed octo.
 */
export function ScrollAnim() {
  const { ref, progress } = useScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className={styles.main}>
      <div className={styles.pinned}>
        <R3FBlock>
          <ScrollAnimScene progress={progress} />
        </R3FBlock>
        <Container className={styles.container}>
          <Grid className={styles.grid}>
            <div className={styles.item}>
              <div className={styles.contentWrapper}>
                <Reveal>
                  <Kicker>{gamesInkPay.label}</Kicker>
                </Reveal>
                <h2 className={styles.title}>
                  <SplitText>{gamesInkPay.title}</SplitText>
                </h2>
                <Reveal delay={0.2}>
                  <p className={styles.description}>{gamesInkPay.description}</p>
                </Reveal>
                <Reveal delay={0.3}>
                  <Button href={gamesInkPay.cta.url} variant="secondary" withIcon>
                    {gamesInkPay.cta.label}
                  </Button>
                </Reveal>
              </div>
            </div>
          </Grid>
        </Container>
      </div>
    </section>
  );
}
