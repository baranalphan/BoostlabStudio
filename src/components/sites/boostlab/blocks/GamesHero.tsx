import { gamesHero } from "../content";
import styles from "./GamesHero.module.css";

/**
 * The games page hero: a full-screen, looping Boostlab video with no overlay or copy.
 */
export function GamesHero() {
  return (
    <section className={styles.main}>
      {/* The hero is video only; this gives the page its heading for search and screen
          readers without changing the design. */}
      <h1 className="sr-only">Games by Boostlab Game Studio</h1>
      <video
        className={styles.video}
        src={gamesHero.video.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={gamesHero.video.alt ?? undefined}
      />
    </section>
  );
}
