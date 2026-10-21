"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Container, Grid, Kicker } from "../ui/Layout";
import { R3FBlock } from "../three/R3FBlock";
import { ScrollListScene } from "../three/ScrollListScene";
import { gamesScrollList } from "../content";
import styles from "./ScrollList.module.css";

const COUNT = gamesScrollList.sections.length;

/**
 * The source's ComponentBlocksScrollList: a 300vh section with a pinned 100vh stage.
 * Scrolling fills each heading top-to-bottom in turn, swaps the framed 3d scene, and
 * advances the copy alongside a progress bar.
 */
export function ScrollList() {
  const [section, setSection] = useState(0);
  const sectionProgress = useRef(0);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);

  const { ref } = useScrollProgress<HTMLElement>({
    onChange: (p) => {
      // Spread the section's progress over the three items, then fill each heading from
      // 0 → 100% as its slice passes.
      const scaled = p * COUNT;
      const index = Math.min(Math.floor(scaled), COUNT - 1);
      const within = Math.min(Math.max(scaled - index, 0), 1);
      sectionProgress.current = within;
      setSection((prev) => (prev === index ? prev : index));

      headings.current.forEach((node, i) => {
        if (!node) return;
        const fill = i < index ? 100 : i > index ? 0 : within * 100;
        node.style.setProperty("--fillAmount", `${fill}%`);
      });
      bar.current?.style.setProperty("--scrollProgress", `${p * 100}%`);
    },
  });

  return (
    <section ref={ref} className={styles.main}>
      <div className={styles.pinned}>
        <Container>
          <Grid className={styles.grid}>
            <div className={styles.headings}>
              <Kicker className={styles.kicker}>{gamesScrollList.label}</Kicker>
              <ul className={styles.sections}>
                {gamesScrollList.sections.map((item, i) => (
                  <li className={styles.sectionsItem} key={item.sectionId}>
                    <h2
                      ref={(node) => {
                        headings.current[i] = node;
                      }}
                    >
                      {item.title}
                    </h2>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.frameColumn}>
              <div className={styles.frameWrapper}>
                <div className={styles.frame}>
                  <Image
                    src="/sites/boostlab/games/wonderland-blur.jpg"
                    alt=""
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 45vw"
                  />
                  <R3FBlock>
                    <ScrollListScene section={section} progress={sectionProgress} />
                  </R3FBlock>
                </div>
              </div>
            </div>

            <div className={styles.descriptionColumn}>
              <div className={styles.descriptionWrapper}>
                <div className={styles.scrollbar} ref={bar} aria-hidden="true" />
                <div className={styles.description}>
                  {gamesScrollList.sections.map((item, i) => (
                    <div
                      className={styles.descriptionInner}
                      key={item.sectionId}
                      data-active={i === section ? "true" : "false"}
                    >
                      <Kicker>{item.title}</Kicker>
                      <p className={styles.descriptionBody}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </div>
    </section>
  );
}
