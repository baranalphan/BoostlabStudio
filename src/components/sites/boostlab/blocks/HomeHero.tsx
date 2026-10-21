import { Container } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { R3FBlock } from "../three/R3FBlock";
import { HeroScene } from "../three/HeroScene";
import { homeHero } from "../content";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <SplitText skew lineStagger={0.1}>
              {homeHero.title}
            </SplitText>
          </h1>
        </div>
        <R3FBlock>
          <HeroScene />
        </R3FBlock>
        <div className={styles.blur} aria-hidden="true" />
      </Container>
    </section>
  );
}
