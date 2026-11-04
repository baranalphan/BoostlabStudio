"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Container, Kicker } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { gamesShowreel } from "../content";
import styles from "./GamesJourney.module.css";

const { games, journey } = gamesShowreel;
const COUNT = games.length;

const clamp = (x: number) => Math.min(1, Math.max(0, x));

/**
 * "Our games" as a journey: the section pins to the screen and scrolling travels from
 * one game's chapter to the next, each with its logo, line, blurb and stills. Every game
 * gets the same screen's height of scrolling, counted from when the stage comes into view. While the journey holds the screen it decides
 * which game the whole stage shows, so the backdrop and its particles change as you
 * scroll: reef, then desert, then city.
 */
export function GamesJourney({
  onChange,
  onEngage,
}: {
  /** The chapter on screen changed (only reported while engaged). */
  onChange: (index: number) => void;
  /** The journey took over the screen, or let go of it. */
  onEngage: (engaged: boolean) => void;
}) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // Runs straight in the scroll event: it is one measurement and a few writes, and
    // waiting for an animation frame risked skipping updates if a frame never came.
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // The journey runs from the moment the track comes up into view until it lets go
      // of the screen: the whole track height, one equal share per game. The first share
      // is the stage sliding up into view, so the first game neither waits on an empty
      // stage nor gets that slide on top of its own share.
      const inView = rect.top < vh && rect.bottom > 0;
      const progress = clamp((vh - rect.top) / Math.max(1, rect.height));
      const raw = progress * COUNT;
      const index = inView ? Math.min(COUNT - 1, Math.floor(raw)) : -1;
      // How far through the current chapter (0–1): drives the stills' parallax.
      el.style.setProperty("--cp", index >= 0 ? clamp(raw - index).toFixed(4) : "0");
      setChapter(index);
      // The stage's game follows the journey as soon as the first chapter shows.
      setEngaged(inView);
    };
    // The first reading waits a tick, once the page has laid out.
    const first = window.setTimeout(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    onEngage(engaged);
  }, [engaged, onEngage]);

  useEffect(() => {
    if (engaged && chapter >= 0) onChange(chapter);
  }, [engaged, chapter, onChange]);

  return (
    <section className={styles.main} aria-labelledby={`${id}-title`}>
      <Container className={styles.intro}>
        <Reveal>
          <Kicker>{journey.label}</Kicker>
        </Reveal>
        <h2 className={styles.title} id={`${id}-title`}>
          <SplitText>{journey.title}</SplitText>
        </h2>
        <Reveal mode="slide" delay={0.2}>
          <p className={styles.hint} aria-hidden="true">
            {journey.hint}
            <span className={styles.hintArrow}>↓</span>
          </p>
        </Reveal>
      </Container>

      <div ref={track} className={styles.track} style={{ "--n": COUNT } as React.CSSProperties}>
        <div className={styles.pin}>
          {games.map((game, i) => {
            const state = i < chapter ? "past" : i === chapter ? "current" : "next";
            return (
              <article
                key={game.title}
                className={styles.chapter}
                data-state={state}
                aria-hidden={i !== chapter}
                style={{ "--accent": game.accent } as React.CSSProperties}
              >
                <div className={styles.copy}>
                  <h3 className={styles.heading}>
                    {game.logo ? (
                      <Image
                        className={styles.logo}
                        src={game.logo.url}
                        alt={game.title}
                        width={game.logo.width}
                        height={game.logo.height}
                        sizes="(min-width: 64rem) 28rem, 70vw"
                      />
                    ) : (
                      <span className={styles.wordmark}>{game.title}</span>
                    )}
                  </h3>
                  {/* Line by line, like the site's other copy, each time the game comes on. */}
                  <p className={styles.tagline}>
                    <SplitText animate={i === chapter} delay={0.1} lineStagger={0.06}>
                      {game.tagline}
                    </SplitText>
                  </p>
                  <p className={styles.blurb}>
                    <SplitText animate={i === chapter} delay={0.2} lineStagger={0.05}>
                      {game.blurb}
                    </SplitText>
                  </p>
                  <ul className={styles.tags}>
                    {game.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {game.url ? (
                    <div className={styles.cta}>
                      <Button href={game.url} newTab withIcon>
                        Play on Steam
                      </Button>
                    </div>
                  ) : null}
                </div>

                <div className={styles.visual} data-shots={game.shots ? game.shots.length : 0}>
                  {game.shots ? (
                    game.shots.map((shot, k) => (
                      <div className={styles.shot} data-k={k} key={shot}>
                        <Image
                          src={shot}
                          alt={k === 0 ? `${game.title} gameplay` : ""}
                          fill
                          sizes={k === 0 ? "(min-width: 64rem) 45vw, 90vw" : "(min-width: 64rem) 20vw, 45vw"}
                        />
                      </div>
                    ))
                  ) : (
                    <div className={styles.poster}>
                      <Image
                        src={game.poster.url}
                        alt={game.poster.alt ?? game.title}
                        fill
                        sizes="(min-width: 64rem) 30vw, 60vw"
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}
