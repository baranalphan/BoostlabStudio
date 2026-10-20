"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, Grid, Kicker } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { homeNews } from "../content";
import styles from "./NewsList.module.css";

/** `2025-05-14` → `05.14.25`, the format the source prints. */
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${m}.${d}.${y.slice(2)}`;
}

export function NewsList() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className={styles.main}>
      <Container className={styles.container}>
        <Grid>
          <div className={styles.titleColumn}>
            <Reveal>
              <Kicker className={styles.label}>{homeNews.label}</Kicker>
            </Reveal>
            <h2 className={styles.title}>
              <SplitText>{homeNews.title}</SplitText>
            </h2>
          </div>
        </Grid>

        <ul className={styles.list}>
          {homeNews.news.map((item, i) => (
            <li key={item.url} style={{ display: "contents" }}>
              <a
                className={styles.line}
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
              >
                <span className={styles.cap}>{formatDate(item.date)}</span>
                <span className={styles.cap}>{item.title}</span>
                <span className={styles.body}>{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {homeNews.news.map((item, i) => (
        <div
          key={item.url}
          className={styles.image}
          data-shown={hovered === i ? "true" : "false"}
          aria-hidden="true"
        >
          <div className={styles.imageInner}>
            <Image
              src={item.image.url}
              alt=""
              width={item.image.width ?? 900}
              height={item.image.height ?? 900}
              sizes="25vw"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
