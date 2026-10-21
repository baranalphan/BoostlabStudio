"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { TrailerModal } from "./TrailerModal";
import { gamesHero } from "../content";
import styles from "./GamesHero.module.css";

/**
 * The source's GamesHero: a full-bleed board illustration behind a 55% black scrim, with
 * the title, copy, a "Watch trailer" button that opens the trailer modal, and the store
 * badges (which hide above 1240px, where the header carries them instead).
 */
export function GamesHero() {
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <section className={styles.main}>
      <div className={styles.media} aria-hidden="true">
        <Image
          src={gamesHero.backgroundMedia.url}
          alt={gamesHero.backgroundMedia.alt ?? ""}
          width={gamesHero.backgroundMedia.width ?? 1535}
          height={gamesHero.backgroundMedia.height ?? 2048}
          sizes="100vw"
          preload
        />
      </div>

      <Container className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <SplitText skew>{gamesHero.title}</SplitText>
          </h1>
          <Spacer size="m" />
          <Reveal delay={0.3}>
            <p className={styles.description}>{gamesHero.description}</p>
          </Reveal>
          <Spacer size="m" />
          <div className={styles.ctas}>
            <Button variant="secondary" withIcon onClick={() => setTrailerOpen(true)}>
              {gamesHero.trailerButton}
            </Button>
            {gamesHero.downloadLinks.map((link) => (
              <div className={styles.downloadCta} key={link.label}>
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
      </Container>

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        video={gamesHero.modalVideo}
      />
    </section>
  );
}
