"use client";

import { useEffect, useRef, useState } from "react";
import { gamesShowreel } from "../content";
import { Showreel } from "./Showreel";
import { GamesJourney } from "./GamesJourney";
import { ThemeBackdrop, ThemeParticles } from "./CarouselThemes";
import styles from "./GamesStage.module.css";

const { games } = gamesShowreel;
/** Where the pan starts: past the painting's mostly empty top, so the showreel already
 *  sits over the lit part of the scene. */
const PAN_FROM = 0.3;
/** Extra black below the header, so its buttons don't sit right on the backdrop's edge. */
const NAV_GAP = "0.3rem";

/**
 * The top of the games page: the showreel and the "Our games" journey stand on one
 * backdrop and show one game at a time. At the top the reel is the clock; once the
 * journey takes over the screen, scrolling picks the game instead and the reel waits.
 * Either way the backdrop and its particles follow.
 *
 * The backdrop stays on screen while the page scrolls past it, and pans from the top of
 * the painting to the bottom as you go (--pan, 0–1): sky over the showreel, ground by
 * the end of the journey.
 */
export function GamesStage() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // The journey holds the screen: the reel waits.
  const [journeying, setJourneying] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setRunning(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The black band at the top (--nav-h) takes the header's measured height plus a little
  // breathing room (NAV_GAP), so the backdrop starts just below the header's buttons
  // instead of touching them.
  useEffect(() => {
    const node = root.current;
    const header = document.querySelector<HTMLElement>("body > header");
    if (!node || !header) return;
    const sync = () =>
      node.style.setProperty("--nav-h", `calc(${header.getBoundingClientRect().height}px + ${NAV_GAP})`);
    sync();
    if (!("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    // Runs straight in the scroll event (see GamesJourney): one measurement, one write.
    const update = () => {
      const rect = node.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      node.style.setProperty("--pan", (PAN_FROM + progress * (1 - PAN_FROM)).toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const game = games[active];

  return (
    <div ref={root} className={styles.main}>
      <ThemeBackdrop theme={game.theme} />
      <ThemeParticles theme={game.theme} running={running} />
      <Showreel
        headingLevel="h1"
        active={active}
        onSelect={setActive}
        held={journeying}
        running={running}
      />
      <GamesJourney onChange={setActive} onEngage={setJourneying} />
    </div>
  );
}
