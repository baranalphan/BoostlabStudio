"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Kicker, Spacer, Container } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { gamesShowreel } from "../content";
import styles from "./Showreel.module.css";

const { games } = gamesShowreel;
const COUNT = games.length;
/** A light 16:9 still for a game (its first shot), falling back to the full poster. Used
 *  as the video's poster frame and to seed the ambilight. */
const stillOf = (game: (typeof games)[number]) => game.shots?.[0] ?? game.poster.url;
/** How long a game without a video stays on stage before the next one comes in. */
const STILL_MS = 6000;

/** Gap between the screen's edge and the progress light that runs round it, in px. */
const TRACE_GAP = 9;
/** Resting pose of the screen (degrees): turned a little towards the copy on its left. */
const REST = { rx: 4, ry: -9 };
/** How far the pointer can tip the screen either way (degrees). */
const TILT = { rx: 7, ry: 9 };
/** Share of the remaining tilt covered each frame. */
const FOLLOW = 0.1;

/**
 * The showreel that opens the games page. A row of game logos sits beside a tilted
 * 16:9 screen: hovering or clicking a logo puts that game's clip on screen, and a light
 * runs once round the screen's edge before the reel moves on to the next game. Games
 * without a clip show their artwork for STILL_MS instead.
 *
 * The selected game is owned by GamesStage, which shares it with the "Our games"
 * journey and the backdrop; at the top of the page this reel is their clock.
 */
export function Showreel({
  headingLevel: Heading = "h2",
  active,
  onSelect,
  held,
  running,
}: {
  /** h1 when the block opens the page, so the page keeps a single main heading. */
  headingLevel?: "h1" | "h2";
  /** Index into gamesShowreel.games. */
  active: number;
  onSelect: (index: number) => void;
  /** The journey below has the screen: don't move on. */
  held: boolean;
  /** False while the stage is off screen: playback stops. */
  running: boolean;
}) {
  const id = useId();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const ambiRef = useRef<HTMLCanvasElement>(null);
  const traceRef = useRef<SVGRectElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const posters = useRef<HTMLImageElement[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0, r: 0 });
  const elapsed = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  // Plays only while the stage is running and the reel itself is on screen.
  const live = running && inView;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  // While the pointer is over the list the reel holds on the hovered game.
  const [hovering, setHovering] = useState(false);
  const holding = hovering || held;
  // Clips that failed to load (e.g. not uploaded yet) fall back to the poster and its timer.
  const [broken, setBroken] = useState<number[]>([]);
  const hasVideo = (i: number) => Boolean(games[i].video) && !broken.includes(i);
  // The game whose clip the visitor paused; picking another game plays again.
  const [pausedIndex, setPausedIndex] = useState<number | null>(null);
  const paused = pausedIndex === active;
  // Clips start muted (browsers only autoplay silent video); the choice then sticks.
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = muted;
    });
  }, [muted, active]);

  const rewind = () => {
    const video = videoRefs.current[active];
    if (video) video.currentTime = Math.max(0, video.currentTime - 10);
  };

  /** Draws the progress light round the screen: the lit stretch, and the spark at its head. */
  const paintTrace = useCallback((progress: number) => {
    const trace = traceRef.current;
    const spark = sparkRef.current;
    if (!trace || !spark) return;
    trace.style.strokeDashoffset = String(1 - progress);
    const length = trace.getTotalLength();
    if (!length) return;
    const point = trace.getPointAtLength(progress * length);
    spark.setAttribute("cx", point.x.toFixed(2));
    spark.setAttribute("cy", point.y.toFixed(2));
    spark.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
  }, []);

  // The light follows the screen's real size and corner radius.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const measure = () =>
      setBox({
        w: screen.offsetWidth,
        h: screen.offsetHeight,
        r: parseFloat(getComputedStyle(screen).borderTopLeftRadius) || 0,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  // A newly selected game always starts from the top.
  useEffect(() => {
    elapsed.current = 0;
    paintTrace(0);
    videoRefs.current.forEach((video, i) => {
      if (video && i !== active) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active, paintTrace]);

  useEffect(() => {
    const video = videoRefs.current[active];
    if (!live) {
      video?.pause();
      return;
    }

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const advance = () => onSelect((active + 1) % COUNT);
    const report = (progress: number) => {
      paintTrace(progress);
    };
    let frame = 0;

    if (video) {
      const onEnded = () => {
        if (holding || still) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          advance();
        }
      };
      const tick = () => {
        if (video.duration) report(video.currentTime / video.duration);
        frame = requestAnimationFrame(tick);
      };
      video.addEventListener("ended", onEnded);
      // A paused clip also holds the reel: it can't reach its end.
      if (paused) video.pause();
      else video.play().catch(() => {});
      frame = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(frame);
        video.removeEventListener("ended", onEnded);
        video.pause();
      };
    }

    // With reduced motion a still stays put until the visitor picks another game.
    if (still) return;
    let last = performance.now();
    const tick = (now: number) => {
      if (!holding) elapsed.current += now - last;
      last = now;
      const progress = Math.min(elapsed.current / STILL_MS, 1);
      report(progress);
      if (progress >= 1) advance();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, holding, live, paused, onSelect, paintTrace, broken]);

  /*
   * Ambilight: the current picture, shrunk to a few dozen pixels on a canvas that is blown
   * up and blurred behind the screen, so the light around it is the clip's own colours,
   * live. Each frame only blends 10% of the new picture in, so cuts and game changes
   * wash over smoothly instead of flashing.
   */
  useEffect(() => {
    const canvas = ambiRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !live) return;
    if (!posters.current.length) {
      posters.current = games.map((item) => {
        const img = new window.Image();
        img.src = stillOf(item);
        return img;
      });
    }
    let frame = 0;
    let first = true;
    const draw = () => {
      const video = videoRefs.current[active];
      const poster = posters.current[active];
      ctx.globalAlpha = first ? 1 : 0.1;
      if (video && video.readyState >= 2) {
        // Sample only what the stage shows, so a clip's baked-in bars don't dim the glow.
        const zoom = games[active].videoZoom ?? 1;
        const sw = video.videoWidth / zoom;
        const sh = video.videoHeight / zoom;
        const sx = (video.videoWidth - sw) / 2;
        const sy = (video.videoHeight - sh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        first = false;
      } else if (poster.complete && poster.naturalWidth) {
        ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);
        first = false;
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active, live]);

  /*
   * The screen floats at a slight angle; with a mouse over it, it turns to follow the
   * pointer and a glare slides across the glass. CSS reads --rx / --ry (degrees),
   * --gx / --gy (glare position, %) and --hover (0–1).
   */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    type Pose = { rx: number; ry: number; gx: number; gy: number; h: number };
    const set = (v: Pose) => {
      wrap.style.setProperty("--rx", v.rx.toFixed(3));
      wrap.style.setProperty("--ry", v.ry.toFixed(3));
      wrap.style.setProperty("--gx", `${v.gx.toFixed(2)}%`);
      wrap.style.setProperty("--gy", `${v.gy.toFixed(2)}%`);
      wrap.style.setProperty("--hover", v.h.toFixed(3));
    };
    const rest: Pose = { ...REST, gx: 18, gy: 0, h: 0 };
    set(rest);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const target: Pose = { ...rest };
    const current: Pose = { ...rest };
    let frame = 0;
    const tick = () => {
      let settled = true;
      for (const key of Object.keys(target) as (keyof Pose)[]) {
        current[key] += (target[key] - current[key]) * FOLLOW;
        if (Math.abs(target[key] - current[key]) > 0.01) settled = false;
      }
      set(current);
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      Object.assign(target, {
        rx: (0.5 - py) * 2 * TILT.rx,
        ry: (px - 0.5) * 2 * TILT.ry,
        gx: px * 100,
        gy: py * 100,
        h: 1,
      });
      kick();
    };
    const onLeave = () => {
      Object.assign(target, rest);
      kick();
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + COUNT) % COUNT;
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  const game = games[active];

  return (
    <section
      ref={sectionRef}
      className={styles.main}
      aria-labelledby={`${id}-title`}
      style={{ "--accent": game.accent } as React.CSSProperties}
    >
      <Container className={styles.container}>
        <div className={styles.head}>
          <Reveal>
            <Kicker>{gamesShowreel.label}</Kicker>
          </Reveal>
          <Spacer size="m" />
          <Heading className={styles.title} id={`${id}-title`}>
            <SplitText>{gamesShowreel.title}</SplitText>
          </Heading>
        </div>

        <div className={styles.side}>
          {/*
           * The games stacked one under the other, each its logo with its name beside
           * it. The selected one lights up in colour; the others wait greyed out.
           */}
          <div
            className={styles.picker}
            role="tablist"
            aria-label="Games"
            aria-orientation="vertical"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onKeyDown={onKeyDown}
          >
            {games.map((item, i) => (
              <button
                key={item.title}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-stage`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tile}
                data-cutout={item.icon.cutout || undefined}
                style={{ "--accent": item.accent } as React.CSSProperties}
                onClick={() => onSelect(i)}
                onMouseEnter={() => onSelect(i)}
              >
                {/* The logo comes in with its name, unclipped so it can grow and glow. */}
                <Reveal mode="rise" delay={0.1 + i * 0.08} className={styles.tileIconReveal}>
                  <span className={styles.tileIcon}>
                    <Image src={item.icon.url} alt="" fill sizes="5rem" />
                  </span>
                </Reveal>
                <span className={styles.tileName}>
                  <Reveal mode="slide" delay={0.1 + i * 0.08}>
                    {item.title}
                  </Reveal>
                </span>
              </button>
            ))}
          </div>

        </div>

        <div className={styles.stageWrap} ref={wrapRef}>
          <canvas ref={ambiRef} className={styles.ambilight} width={64} height={36} aria-hidden="true" />

          <div className={styles.float}>
            <div className={styles.screen} ref={screenRef}>
              <div
                className={styles.stage}
                id={`${id}-stage`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${active}`}
              >
                {games.map((item, i) => (
                  <div
                    className={styles.layer}
                    data-active={i === active}
                    aria-hidden={i !== active}
                    key={item.title}
                  >
                    {hasVideo(i) ? (
                      <video
                        ref={(node) => {
                          videoRefs.current[i] = node;
                        }}
                        className={styles.media}
                        style={
                          item.videoZoom ? ({ "--zoom": item.videoZoom } as React.CSSProperties) : undefined
                        }
                        src={item.video}
                        poster={stillOf(item)}
                        muted
                        playsInline
                        preload={i === active ? "auto" : "none"}
                        aria-label={item.poster.alt ?? undefined}
                        onError={() => setBroken((list) => (list.includes(i) ? list : [...list, i]))}
                      />
                    ) : (
                      // No clip yet: the artwork, dimmed over a blurred copy of itself, with a
                      // "coming soon" card on top.
                      <div className={styles.media}>
                        <Image className={styles.backdrop} src={item.poster.url} alt="" fill sizes="20vw" />
                        <Image
                          className={styles.still}
                          src={item.poster.url}
                          alt={item.poster.alt ?? ""}
                          fill
                          sizes="(min-width: 64rem) 30vw, 60vw"
                        />
                        <span className={styles.soon}>
                          <span className={styles.soonKicker}>Gameplay video</span>
                          <span className={styles.soonTitle}>Coming soon</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {/* A band of light sweeps the glass each time the game changes. */}
                <span className={styles.shine} key={active} aria-hidden="true" />
                <span className={styles.glare} aria-hidden="true" />

                {hasVideo(active) ? (
                  <div className={styles.controls}>
                    <button
                      type="button"
                      className={styles.control}
                      aria-label="Back 10 seconds"
                      onClick={rewind}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 12a8 8 0 1 0 2.35-5.65" />
                        <path d="M4 3v4.5h4.5" />
                        <text x="12" y="15.2" textAnchor="middle">
                          10
                        </text>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={styles.control}
                      aria-label={paused ? "Play video" : "Pause video"}
                      onClick={() => setPausedIndex(paused ? null : active)}
                    >
                      {paused ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path className={styles.solid} d="M8 5.5v13l10.5-6.5z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path className={styles.solid} d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      className={styles.control}
                      aria-label={muted ? "Turn sound on" : "Turn sound off"}
                      aria-pressed={!muted}
                      onClick={() => setMuted((m) => !m)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path className={styles.solid} d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                        {muted ? (
                          <path d="M16 9.5l5 5M21 9.5l-5 5" />
                        ) : (
                          <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
                        )}
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>

              {/* Progress: a light that runs once round the screen per game. */}
              {box.w ? (
                <svg
                  className={styles.tracer}
                  width={box.w + TRACE_GAP * 2}
                  height={box.h + TRACE_GAP * 2}
                  aria-hidden="true"
                >
                  <rect
                    className={styles.track}
                    x={TRACE_GAP / 2}
                    y={TRACE_GAP / 2}
                    width={box.w + TRACE_GAP}
                    height={box.h + TRACE_GAP}
                    rx={box.r + TRACE_GAP / 2}
                  />
                  <rect
                    ref={traceRef}
                    className={styles.trace}
                    x={TRACE_GAP / 2}
                    y={TRACE_GAP / 2}
                    width={box.w + TRACE_GAP}
                    height={box.h + TRACE_GAP}
                    rx={box.r + TRACE_GAP / 2}
                    pathLength={1}
                  />
                  <circle ref={sparkRef} className={styles.spark} r={3.5} />
                </svg>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
