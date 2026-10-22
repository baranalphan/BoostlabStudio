"use client";

import { useEffect, useState } from "react";
import { SplitText } from "../ui/SplitText";
import { HeroCoins, HeroCore, HeroDie, HeroGem, HeroSparks } from "../art/SupportHeroArt";
import { supportHero } from "../content";
import styles from "./SupportHero.module.css";

/**
 * The source's SupportHero: a flush-left h1 and, opposite it, five artwork layers
 * stacked on one canvas. Each layer starts at scale(0) with transform-origin at its
 * bottom-right and pops to scale(0.95) on a 0.8s back-ease, staggered 0.2 / 0.25 /
 * 0.275 / 0.3 / 0.325s — the declared values from the source's stylesheet.
 *
 * Below 1240px the section stacks: heading first, artwork right-aligned at 60% width.
 */
export function SupportHero() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>
          <SplitText shrink>{supportHero.title}</SplitText>
        </h1>
      </div>
      <div className={styles.imageWrapper} data-shown={shown ? "true" : "false"}>
        <HeroCore className={styles.layer} />
        <HeroGem className={styles.layer} />
        <HeroDie className={styles.layer} />
        <HeroCoins className={styles.layer} />
        <HeroSparks className={styles.layer} />
      </div>
    </section>
  );
}
