"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CarouselCard } from "@/types/boostlab";
import { Container, Kicker } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { ChevronIcon } from "../icons/ChevronIcon";
import { gamesCarousel } from "../content";
import { ThemeBackdrop, ThemeParticles } from "./CarouselThemes";
import styles from "./CardCarousel.module.css";

const GAMES: CarouselCard[] = gamesCarousel.cards;
const N = GAMES.length;
/** The ring holds the list three times so it closes into a full cylinder. */
const SLOTS = Array.from({ length: N * 3 }, (_, i) => ({ game: GAMES[i % N], copy: i >= N }));
const COUNT = SLOTS.length;
/** Degrees between neighbouring cards. The ring radius in the stylesheet is derived from it. */
const SPACING = 34;
/** Share of the remaining distance covered each frame while the ring glides to a card. */
const FOLLOW = 0.085;
/** Extra degrees the neighbours are shoved aside while the front card is hovered. */
const PUSH = 11;
/** Share of the remaining hover lift covered each frame. */
const FOCUS_EASE = 0.12;
const AUTOPLAY_MS = 4500;
/** Open on the released game. */
const START = Math.max(0, GAMES.findIndex((game) => game.url));

const SIZES = "(max-width: 768px) 62vw, 30vw";
const mod = (x: number, m: number) => ((x % m) + m) % m;
/** A slot's signed distance from the front, wrapped into [-COUNT/2, COUNT/2). */
const wrap = (x: number) => mod(x + COUNT / 2, COUNT) - COUNT / 2;

type Drag = { id: number; x: number; from: number; lastX: number; lastT: number; velocity: number; moved: boolean };

/**
 * "Our games" as a stage: the cards stand on a 3D cylinder that can be dragged, flung,
 * stepped with the arrows or left to turn on its own. The whole section turns into the
 * front game's world (see CarouselThemes). Hovering the front card lifts it towards the
 * viewer, shoves its neighbours aside and turns it over to show its spec sheet.
 */
export function CardCarousel() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  // focus: 0 at rest, 1 while the front card is hovered (lifted, neighbours pushed away).
  const motion = useRef({ current: START, target: START, focus: 0, focusTarget: 0, frame: 0 });
  const drag = useRef<Drag | null>(null);
  const swallowClick = useRef(false);
  const still = useRef(false);

  const [front, setFront] = useState(START);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  // Bumped on every manual move so autoplay and its progress bar start over.
  const [round, setRound] = useState(0);

  const game = GAMES[mod(front, N)];
  const theme = game.theme ?? "reef";
  const autoplay = visible && !hovered && !flipped;

  /** Writes every card's angle and depth straight to the DOM — no re-render per frame. */
  const paint = useCallback(() => {
    const { current, focus } = motion.current;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const offset = wrap(i - current);
      const distance = Math.abs(offset);
      const push = Math.sign(offset) * Math.min(distance, 1) * focus * PUSH;
      el.style.setProperty("--a", (offset * SPACING + push).toFixed(3));
      el.style.setProperty("--o", distance.toFixed(3));
      el.style.setProperty("--lift", (focus * Math.max(0, 1 - distance * 2)).toFixed(3));
      el.style.setProperty("--dim", (focus * Math.min(distance, 1)).toFixed(3));
      el.style.zIndex = String(100 - Math.round(distance * 10));
    });
    const next = mod(Math.round(current), COUNT);
    setFront((f) => (f === next ? f : next));
  }, []);

  const run = useCallback(() => {
    const m = motion.current;
    if (m.frame) return;
    const step = () => {
      if (!drag.current) {
        m.current += (m.target - m.current) * (still.current ? 1 : FOLLOW);
        if (Math.abs(m.target - m.current) < 0.0005) m.current = m.target;
      }
      m.focus += (m.focusTarget - m.focus) * (still.current ? 1 : FOCUS_EASE);
      if (Math.abs(m.focusTarget - m.focus) < 0.001) m.focus = m.focusTarget;
      paint();
      const moving = drag.current || m.current !== m.target || m.focus !== m.focusTarget;
      m.frame = moving ? requestAnimationFrame(step) : 0;
    };
    m.frame = requestAnimationFrame(step);
  }, [paint]);

  const setFocus = useCallback(
    (on: boolean) => {
      const target = on ? 1 : 0;
      if (motion.current.focusTarget === target) return;
      motion.current.focusTarget = target;
      run();
    },
    [run],
  );

  const step = useCallback(
    (delta: number) => {
      motion.current.target = Math.round(motion.current.target) + delta;
      setFlipped(false);
      run();
    },
    [run],
  );

  const goToSlot = useCallback(
    (slot: number) => {
      const m = motion.current;
      m.target = Math.round(m.current + wrap(slot - m.current));
      setFlipped(false);
      setRound((r) => r + 1);
      run();
    },
    [run],
  );

  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    const m = motion.current;
    return () => {
      observer.disconnect();
      cancelAnimationFrame(m.frame);
    };
  }, []);

  // Turns one card at a time while the section is on screen and nobody is interacting.
  useEffect(() => {
    if (!autoplay || still.current) return;
    const id = window.setTimeout(() => step(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, front, round, step]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    swallowClick.current = false;
    const now = performance.now();
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      from: motion.current.current,
      lastX: event.clientX,
      lastT: now,
      velocity: 0,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d && event.pointerType === "mouse") {
      // Lift the front card while the mouse rests on it.
      const slot = (event.target as HTMLElement).closest<HTMLElement>("[data-slot]");
      setFocus(Boolean(slot) && Number(slot?.dataset.slot) === front);
    }
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      // Capture only once it's clearly a drag, so a plain click still reaches the card link.
      d.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setFlipped(false);
      setFocus(false);
      run();
    }
    const now = performance.now();
    d.velocity = (event.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = event.clientX;
    d.lastT = now;
    const width = cards.current[0]?.offsetWidth ?? 300;
    motion.current.current = d.from - dx / (width * 0.9);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    swallowClick.current = true;
    // Carry on for roughly another 200ms at release speed, then settle on the nearest card.
    const width = cards.current[0]?.offsetWidth ?? 300;
    const fling = -(d.velocity * 200) / (width * 0.9);
    motion.current.target = Math.round(motion.current.current + fling);
    setRound((r) => r + 1);
    run();
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (swallowClick.current) {
      swallowClick.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const slot = (event.target as HTMLElement).closest<HTMLElement>("[data-slot]");
    if (!slot) return;
    const i = Number(slot.dataset.slot);
    if (i !== front) {
      // A side card is a target to spin to, not a link.
      event.preventDefault();
      goToSlot(i);
    } else if (!SLOTS[i].game.url) {
      // No store page yet: tapping the front card turns it over instead.
      setFlipped((f) => !f);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
      setRound((r) => r + 1);
    }
  };

  return (
    <section ref={section} className={styles.main} data-theme={theme}>
      {/* The whole section becomes the front game's world: aquarium, desert, crime city. */}
      <ThemeBackdrop theme={theme} />
      <ThemeParticles theme={theme} running={visible} />

      <Container>
        <div className={styles.titleWrapper}>
          <Reveal>
            <Kicker>{gamesCarousel.label}</Kicker>
          </Reveal>
          <h2 className={styles.title}>
            <SplitText>{gamesCarousel.title}</SplitText>
          </h2>
        </div>
      </Container>

      <div className={styles.arena}>
        <div
          className={styles.stage}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${gamesCarousel.title}. Use the arrow keys or drag to spin.`}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => {
            setHovered(false);
            setFocus(false);
          }}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
        >
          {SLOTS.map(({ game: card, copy }, i) => {
            const live = Boolean(card.url);
            const offset = wrap(i - START);
            const status = live ? "Out now" : "In development";
            return (
              <div
                key={i}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className={styles.slot}
                data-slot={i}
                data-front={i === front}
                data-flipped={i === front && flipped}
                aria-hidden={copy || undefined}
                style={
                  {
                    "--a": offset * SPACING,
                    "--o": Math.abs(offset),
                    zIndex: 100 - Math.round(Math.abs(offset) * 10),
                  } as React.CSSProperties
                }
              >
                <div className={styles.turn}>
                  <div className={styles.faceFront}>
                    {card.video ? (
                      <video
                        className={styles.faceMedia}
                        src={card.video}
                        poster={card.image.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={card.image.alt ?? card.title}
                      />
                    ) : (
                      <Image
                        className={styles.faceMedia}
                        src={card.image.url}
                        alt={card.image.alt ?? ""}
                        width={card.image.width ?? 900}
                        height={card.image.height ?? 900}
                        sizes={SIZES}
                        draggable={false}
                      />
                    )}
                    <span className={styles.shade} />
                  </div>

                  <div className={styles.faceBack} aria-hidden="true">
                    <Image
                      className={styles.backArt}
                      src={card.image.url}
                      alt=""
                      width={card.image.width ?? 900}
                      height={card.image.height ?? 900}
                      sizes="20vw"
                      draggable={false}
                    />
                    <div className={styles.backInner}>
                      <p className={styles.backTop}>Boostlab Studio</p>
                      <p className={styles.backTitle}>{card.title}</p>
                      <dl className={styles.backMeta}>
                        <div>
                          <dt>Status</dt>
                          <dd>{status}</dd>
                        </div>
                        <div>
                          <dt>Store</dt>
                          <dd>{live ? "Steam" : "TBA"}</dd>
                        </div>
                      </dl>
                      <span className={styles.backCta} data-live={live}>
                        {live ? "Play on Steam ↗" : "Coming soon"}
                      </span>
                    </div>
                  </div>
                </div>

                {card.url ? (
                  <a
                    className={styles.cardLink}
                    href={card.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${card.title} on Steam`}
                    tabIndex={copy ? -1 : undefined}
                    draggable={false}
                    onFocus={() => i !== front && goToSlot(i)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.paginationButton}
          aria-label="Previous game"
          onClick={() => {
            step(-1);
            setRound((r) => r + 1);
          }}
        >
          <ChevronIcon className={styles.paginationIcon} />
        </button>

        <div className={styles.now} aria-live="polite">
          <span key={game.title} className={styles.nowTitle}>
            {game.title}
          </span>
          <span className={styles.progress}>
            <span key={`${front}-${round}`} className={styles.progressFill} data-running={autoplay} />
          </span>
        </div>

        <button
          type="button"
          className={styles.paginationButton}
          aria-label="Next game"
          onClick={() => {
            step(1);
            setRound((r) => r + 1);
          }}
        >
          <ChevronIcon className={cn(styles.paginationIcon, styles.flip)} />
        </button>
      </div>
      <p className={styles.hint} aria-hidden="true">
        ← Drag to spin →
      </p>
    </section>
  );
}
