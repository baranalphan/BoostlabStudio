"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GameTheme } from "@/types/boostlab";
import styles from "./CarouselThemes.module.css";

const FX = "/sites/boostlab/images/fx";

/* ------------------------------------------------------------------------------------ */
/* Backdrops: one painted scene per theme, cross-faded by the active game.               */
/* Built by scripts/build-theme-fx.mjs from the art in BoostlabStudioAssets/Games.       */
/* ------------------------------------------------------------------------------------ */

/**
 * The painting (bloom baked in), as an optimised image: phones get a smaller one, and
 * browsers that can take AVIF get that. It covers the screen (see .photo), so it is as
 * wide as the screen, or 2304 / 1856 of its height on screens narrower than the painting.
 */
function Photo({ theme, first }: { theme: GameTheme; first: boolean }) {
  return (
    <span className={styles.photo}>
      <Image
        src={`${FX}/${theme}/bg.webp`}
        alt=""
        fill
        sizes="(max-aspect-ratio: 1856/2304) 81vh, 100vw"
        // The scene on screen first is the page's largest image.
        loading={first ? "eager" : "lazy"}
        fetchPriority={first ? "high" : "low"}
      />
    </span>
  );
}

type SceneProps = { first: boolean };

function Reef({ first }: SceneProps) {
  return (
    <>
      <Photo theme="reef" first={first} />
      <span className={styles.reefCaustics} />
    </>
  );
}

function Desert({ first }: SceneProps) {
  return <Photo theme="desert" first={first} />;
}

function City({ first }: SceneProps) {
  return (
    <>
      <Photo theme="city" first={first} />
      <span className={styles.neon} />
      <span className={styles.sirenRed} />
      <span className={styles.sirenBlue} />
    </>
  );
}

const SCENES: Record<GameTheme, (props: SceneProps) => React.JSX.Element> = { reef: Reef, desert: Desert, city: City };
const THEMES = Object.keys(SCENES) as GameTheme[];

/**
 * `ref` is the viewport-sized frame: GamesStage sets the painting's pan (--pan) on it.
 *
 * The painting on screen first is the page's largest image, so it loads with high
 * priority, and the other scenes wait until the page has loaded: their paintings would
 * otherwise download alongside it and slow it down.
 */
export function ThemeBackdrop({ theme, ref }: { theme: GameTheme; ref?: React.Ref<HTMLDivElement> }) {
  const [first] = useState(theme);
  const [wanted, setWanted] = useState<GameTheme[]>([theme]);
  // A scene picked before the rest have loaded comes in straight away.
  if (!wanted.includes(theme)) setWanted([...wanted, theme]);

  useEffect(() => {
    // Safari has no requestIdleCallback: a short timeout stands in for it.
    const hasIdle = typeof window.requestIdleCallback === "function";
    let pending = 0;
    const all = () => setWanted(THEMES);
    const later = () => {
      pending = hasIdle ? window.requestIdleCallback(all, { timeout: 2000 }) : window.setTimeout(all, 500);
    };
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      window.removeEventListener("load", later);
      if (hasIdle) window.cancelIdleCallback(pending);
      else window.clearTimeout(pending);
    };
  }, []);

  return (
    <div className={styles.scenes} aria-hidden="true">
      <div ref={ref} className={styles.frame}>
        {THEMES.map((key) => {
          const Scene = SCENES[key];
          return (
            <div key={key} className={`${styles.scene} ${styles[key]}`} data-on={key === theme}>
              {wanted.includes(key) ? <Scene first={key === first} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------ */
/* Particles. Two canvases — one behind the cards for depth, one in front so things      */
/* swim and fall over the artwork.                                                       */
/* ------------------------------------------------------------------------------------ */

/** How a falling item moves: notes flutter, coins spin, pills tumble, bags sway. */
type Motion = "flutter" | "spin" | "tumble" | "sway";

type LootSpec = {
  file: string;
  motion: Motion;
  /** Longest side on screen, in px, for an item falling in front of the cards. */
  size: [number, number];
  /** Share of the shower. */
  weight: number;
  glow?: string;
};

const GOLD_GLOW = "rgba(255, 196, 90, 0.7)";

/** What rains down in each theme that has a shower. */
const LOOT: Partial<Record<GameTheme, LootSpec[]>> = {
  desert: [
    { file: "desert/treasure-coin", motion: "spin", size: [34, 56], weight: 0.6, glow: GOLD_GLOW },
    { file: "desert/treasure-ankh", motion: "tumble", size: [44, 66], weight: 0.13, glow: GOLD_GLOW },
    { file: "desert/treasure-scarab", motion: "tumble", size: [40, 62], weight: 0.14, glow: GOLD_GLOW },
    { file: "desert/treasure-vase", motion: "tumble", size: [44, 66], weight: 0.13, glow: GOLD_GLOW },
  ],
  city: [
    { file: "city/bill-1", motion: "flutter", size: [80, 118], weight: 0.13 },
    { file: "city/bill-2", motion: "flutter", size: [80, 118], weight: 0.12 },
    { file: "city/bill-3", motion: "flutter", size: [76, 110], weight: 0.11 },
    { file: "city/coin-1", motion: "spin", size: [36, 52], weight: 0.11, glow: "rgba(255, 200, 80, 0.55)" },
    { file: "city/coin-2", motion: "spin", size: [34, 48], weight: 0.09, glow: "rgba(255, 170, 70, 0.5)" },
    ...[1, 2, 3, 4, 5].map(
      (n): LootSpec => ({ file: `city/pill-${n}`, motion: "tumble", size: [30, 44], weight: 0.052 }),
    ),
    { file: "city/bag-1", motion: "sway", size: [52, 74], weight: 0.05 },
    { file: "city/bag-2", motion: "sway", size: [52, 74], weight: 0.05 },
    { file: "city/diamond", motion: "spin", size: [44, 64], weight: 0.08, glow: "rgba(140, 220, 255, 0.8)" },
  ],
};

/** The reef's swimmers. `facing` is the way the art points: 1 = right, -1 = left. */
const FISH: [id: string, facing: 1 | -1][] = [
  ["13", 1],
  ["17", 1],
  ["20", 1],
  ["24", 1],
  ["33", 1],
  ["34", 1],
  ["7", -1],
  ["21", -1],
  ["42", -1],
  ["49", -1],
  ["52", -1],
  ["56", -1],
  ["57", -1],
];
const JELLIES = ["2", "31", "48"];

type Kind = "bubble" | "rain" | "loot" | "fish" | "jelly" | "seahorse";

type Particle = {
  kind: Kind;
  theme: GameTheme;
  front: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Longest side for sprites, radius for bubbles, length for rain. */
  size: number;
  rot: number;
  spin: number;
  phase: number;
  alpha: number;
  /** Index into the theme's sprite list. */
  variant: number;
  /** Swimming direction for fish: 1 = right, -1 = left. */
  dir: 1 | -1;
};

type Sprites = {
  loot: HTMLImageElement[];
  fish: HTMLImageElement[];
  jelly: HTMLImageElement[];
  seahorse: HTMLImageElement[];
};

const MAX_PARTICLES = 700;
/** Canvas pixels per layer, so a large, high-density screen doesn't get a huge canvas. */
const MAX_CANVAS_PIXELS = 4_000_000;
/** Pixel density cap: moving decoration doesn't need full retina sharpness, and two
 *  screen-sized canvases redrawn every frame cost in proportion to their pixels. */
const MAX_DPR = 1.5;
/** The section height the spawn rates were tuned for; taller stages spawn proportionally more. */
const BASE_HEIGHT = 1300;
const cache = new Map<GameTheme, Sprites>();

/** Each theme's sprites load the first time that theme is shown. */
function getSprites(theme: GameTheme): Sprites {
  let set = cache.get(theme);
  if (!set) {
    const load = (file: string) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = `${FX}/${file}.webp`;
      return img;
    };
    const reef = theme === "reef";
    set = {
      loot: (LOOT[theme] ?? []).map((spec) => load(spec.file)),
      fish: reef ? FISH.map(([id]) => load(`reef/fish-${id}`)) : [],
      jelly: reef ? JELLIES.map((id) => load(`reef/jelly-${id}`)) : [],
      seahorse: reef ? [load("reef/seahorse-11")] : [],
    };
    cache.set(theme, set);
  }
  return set;
}

const ready = (img: HTMLImageElement | undefined): img is HTMLImageElement =>
  Boolean(img && img.complete && img.naturalWidth > 0);
const between = (min: number, max: number) => min + Math.random() * (max - min);

function pickWeighted(specs: LootSpec[]) {
  let roll = Math.random() * specs.reduce((sum, s) => sum + s.weight, 0);
  for (const [i, spec] of specs.entries()) {
    roll -= spec.weight;
    if (roll < 0) return i;
  }
  return 0;
}

function make(kind: Kind, theme: GameTheme, w: number, h: number, prewarm = false): Particle {
  // Sprites are sized for a 1600px-wide section and shrink with it, to about half on phones.
  const scale = Math.min(1, Math.max(0.55, w / 1600));
  const p: Particle = {
    kind,
    theme,
    front: false,
    x: Math.random() * w,
    y: 0,
    vx: 0,
    vy: 0,
    size: 1,
    rot: 0,
    spin: between(-1, 1),
    phase: Math.random() * Math.PI * 2,
    alpha: 1,
    variant: 0,
    dir: Math.random() < 0.5 ? 1 : -1,
  };
  switch (kind) {
    case "bubble":
      p.front = Math.random() < 0.35;
      p.size = p.front ? between(3, 10) : between(1.5, 6);
      p.y = prewarm ? Math.random() * h : h + p.size;
      p.vy = -between(35, 95) * (p.front ? 1.2 : 0.8);
      break;
    case "rain":
      p.size = between(12, 26);
      p.y = prewarm ? Math.random() * h : -30;
      p.vx = -90;
      p.vy = between(700, 1000);
      p.alpha = between(0.08, 0.22);
      break;
    case "loot": {
      const specs = LOOT[theme] ?? [];
      p.variant = pickWeighted(specs);
      const [min, max] = specs[p.variant].size;
      p.front = Math.random() < 0.6;
      p.size = between(min, max) * (p.front ? 1 : 0.6) * scale;
      p.alpha = p.front ? 1 : 0.7;
      p.y = prewarm ? Math.random() * h * 0.8 : -p.size;
      p.vy = specs[p.variant].motion === "flutter" ? between(45, 85) : between(60, 110);
      p.rot = Math.random() * Math.PI * 2;
      p.spin = between(1.2, 3.2) * (Math.random() < 0.5 ? -1 : 1);
      break;
    }
    case "fish":
      // In the water behind the cards, weaving between them.
      p.variant = Math.floor(Math.random() * FISH.length);
      p.size = between(55, 105) * scale;
      p.vx = p.dir * between(35, 90);
      p.y = between(0.12, 0.86) * h;
      p.x = prewarm ? Math.random() * w : p.dir === 1 ? -p.size : w + p.size;
      break;
    case "jelly":
      p.variant = Math.floor(Math.random() * JELLIES.length);
      p.size = between(120, 180) * scale;
      p.vy = -between(14, 30);
      p.y = prewarm ? between(0.3, 1) * h : h + p.size;
      break;
    case "seahorse":
      p.size = between(70, 100) * scale;
      p.vx = p.dir * between(10, 22);
      p.y = between(0.35, 0.8) * h;
      p.x = prewarm ? between(0.1, 0.9) * w : p.dir === 1 ? -p.size : w + p.size;
      break;
  }
  return p;
}

/** Particles per second for each theme, before scaling to the section's width. */
const RATES: Record<GameTheme, [Kind, number][]> = {
  reef: [
    ["bubble", 22],
    ["fish", 0.85],
    ["jelly", 0.12],
    ["seahorse", 0.03],
  ],
  desert: [["loot", 6]],
  city: [
    ["rain", 55],
    ["loot", 7],
  ],
};

/** How many of each to place on screen the moment a theme appears. */
const PREWARM: Partial<Record<Kind, number>> = { bubble: 60, rain: 22, loot: 16, fish: 12, jelly: 3, seahorse: 1 };

const SWIMMERS: Kind[] = ["fish", "jelly", "seahorse"];

/** Draws an image centred on the origin, longest side = size. */
function drawSprite(ctx: CanvasRenderingContext2D, img: HTMLImageElement, size: number) {
  const ratio = img.naturalWidth / img.naturalHeight;
  const w = ratio >= 1 ? size : size * ratio;
  const h = ratio >= 1 ? size / ratio : size;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
}

/** Longest side of a sprite in its pre-rendered glow, and the room left round it for the glow. */
const GLOW_SPRITE = 128;
const GLOW_PAD = 40;
const glows = new Map<HTMLImageElement, Map<string, HTMLCanvasElement>>();

/**
 * A sprite with its glow, rendered once and then reused. Canvas shadowBlur is costly on
 * every draw (a blur pass per item per frame), and a shower of glowing coins made the
 * page stutter; drawing a ready-made glow is a plain image copy.
 */
function glowOf(img: HTMLImageElement, color: string, blur: number) {
  let byColor = glows.get(img);
  if (!byColor) glows.set(img, (byColor = new Map()));
  const key = `${color}/${blur}`;
  let canvas = byColor.get(key);
  if (!canvas) {
    const ratio = img.naturalWidth / img.naturalHeight;
    const w = ratio >= 1 ? GLOW_SPRITE : GLOW_SPRITE * ratio;
    const h = ratio >= 1 ? GLOW_SPRITE / ratio : GLOW_SPRITE;
    canvas = document.createElement("canvas");
    canvas.width = Math.ceil(w + GLOW_PAD * 2);
    canvas.height = Math.ceil(h + GLOW_PAD * 2);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.drawImage(img, GLOW_PAD, GLOW_PAD, w, h);
    }
    byColor.set(key, canvas);
  }
  return canvas;
}

/** drawSprite for a sprite with a glow: the sprite itself still comes out `size` long. */
function drawGlowSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  size: number,
  color: string,
  blur: number,
) {
  const glow = glowOf(img, color, blur);
  const scale = size / GLOW_SPRITE;
  const w = glow.width * scale;
  const h = glow.height * scale;
  ctx.drawImage(glow, -w / 2, -h / 2, w, h);
}

function draw(ctx: CanvasRenderingContext2D, p: Particle, t: number, art: Sprites) {
  ctx.globalAlpha = Math.max(0, p.alpha);
  if (p.kind === "bubble") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(170, 225, 255, 0.10)";
    ctx.fill();
    ctx.lineWidth = Math.max(0.8, p.size * 0.14);
    ctx.strokeStyle = "rgba(200, 240, 255, 0.65)";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.35, p.y - p.size * 0.35, p.size * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
    return;
  }
  if (p.kind === "rain") {
    ctx.strokeStyle = "#a9b8ff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.vx * 0.02, p.y + p.size);
    ctx.stroke();
    return;
  }

  const list = p.kind === "loot" ? art.loot : p.kind === "fish" ? art.fish : p.kind === "jelly" ? art.jelly : art.seahorse;
  const img = list[p.variant];
  if (!ready(img)) return;

  ctx.save();
  ctx.translate(p.x, p.y);
  if (p.kind === "loot") {
    const spec = LOOT[p.theme]?.[p.variant];
    ctx.rotate(p.rot);
    if (spec?.motion === "spin") {
      // Turning edge-on and back, like a coin flipped in the air.
      ctx.scale(Math.max(0.08, Math.abs(Math.cos(t * p.spin + p.phase))), 1);
    } else if (spec?.motion === "flutter") {
      // A note flipping over as it drifts down.
      ctx.scale(Math.cos(t * p.spin * 0.6 + p.phase), 1);
    }
    if (p.front && spec?.glow) {
      drawGlowSprite(ctx, img, p.size, spec.glow, 20);
      ctx.restore();
      return;
    }
  } else if (p.kind === "fish") {
    // Point the art the way it swims, and wiggle a little as the tail beats.
    const flip = FISH[p.variant][1] === p.dir ? 1 : -1;
    const beat = Math.sin(t * 7 + p.phase) * 0.035;
    ctx.rotate(Math.sin(t * 1.3 + p.phase) * 0.05);
    ctx.scale(flip * (1 + beat), 1 - beat);
  } else if (p.kind === "jelly") {
    // The bell pulses: squashes as it pushes, stretches as it glides. A soft glow keeps the
    // translucent body readable against the blue.
    const pulse = Math.sin(t * 2.2 + p.phase);
    ctx.scale(1 + pulse * 0.06, 1 - pulse * 0.08);
    drawGlowSprite(ctx, img, p.size, "rgba(255, 170, 230, 0.55)", 12);
    ctx.restore();
    return;
  } else {
    ctx.scale(p.dir, 1);
    ctx.rotate(Math.sin(t * 1.1 + p.phase) * 0.08);
  }
  drawSprite(ctx, img, p.size);
  ctx.restore();
}

function move(p: Particle, t: number, dt: number) {
  switch (p.kind) {
    case "bubble":
      p.x += Math.sin(t * 2 + p.phase) * 18 * dt;
      break;
    case "loot": {
      const motion = LOOT[p.theme]?.[p.variant]?.motion;
      if (motion === "flutter") {
        p.x += Math.sin(t * 1.4 + p.phase) * 55 * dt;
        p.rot = Math.sin(t * 1.1 + p.phase) * 0.6;
      } else if (motion === "sway") {
        p.x += Math.sin(t * 1.2 + p.phase) * 30 * dt;
        p.rot = Math.sin(t * 0.9 + p.phase) * 0.35;
        p.vy = Math.min(p.vy + 40 * dt, 160);
      } else {
        p.x += Math.sin(t * 1.2 + p.phase) * 18 * dt;
        p.vy = Math.min(p.vy + 160 * dt, 320);
        if (motion === "tumble") p.rot += p.spin * 0.5 * dt;
      }
      break;
    }
    case "fish":
      p.y += Math.sin(t * 0.9 + p.phase) * 10 * dt;
      break;
    case "jelly":
      p.x += Math.sin(t * 0.5 + p.phase) * 8 * dt;
      break;
    case "seahorse":
      p.y += Math.sin(t * 1.4 + p.phase) * 14 * dt;
      break;
    default:
      break;
  }
  // Jellies rise in pulses rather than at a constant rate.
  const pace = p.kind === "jelly" ? Math.max(0, Math.sin(t * 2.2 + p.phase)) * 1.6 : 1;
  p.x += p.vx * dt;
  p.y += p.vy * dt * pace;
}

/**
 * The swimming, falling and rising bits of each theme. The canvases stay on screen while
 * the stage scrolls, so falling things always drop from the top of the window. When the theme changes, the old
 * particles fade out over a second while the new theme's start, so scenes cross-fade.
 */
export function ThemeParticles({ theme, running }: { theme: GameTheme; running: boolean }) {
  const back = useRef<HTMLCanvasElement>(null);
  const front = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const backCanvas = back.current;
    const frontCanvas = front.current;
    if (!running || !backCanvas || !frontCanvas) return;
    // Purely decorative motion: skip it entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const backCtx = backCanvas.getContext("2d");
    const frontCtx = frontCanvas.getContext("2d");
    if (!backCtx || !frontCtx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const box = backCanvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR, Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, w * h)));
      for (const [canvas, ctx] of [
        [backCanvas, backCtx],
        [frontCanvas, frontCtx],
      ] as const) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(backCanvas);

    const particles: Particle[] = [];
    const owed = new Map<Kind, number>();
    let seeded: GameTheme | null = null;
    let last = performance.now();
    let frame = 0;

    const add = (p: Particle) => {
      if (particles.length < MAX_PARTICLES) particles.push(p);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const current = themeRef.current;
      // Narrow sections (phones) get proportionally fewer particles, taller ones more, so
      // the screen looks equally busy wherever you are on the stage.
      const density = Math.min(1, Math.max(0.35, w / 1600)) * Math.max(1, h / BASE_HEIGHT);

      // A freshly shown theme starts already in motion rather than from an empty screen.
      if (seeded !== current) {
        seeded = current;
        getSprites(current);
        for (const [kind] of RATES[current]) {
          const count = Math.round((PREWARM[kind] ?? 0) * density);
          for (let i = 0; i < count; i++) add(make(kind, current, w, h, true));
        }
      }

      for (const [kind, rate] of RATES[current]) {
        const total = (owed.get(kind) ?? 0) + rate * density * dt;
        const whole = Math.floor(total);
        owed.set(kind, total - whole);
        for (let i = 0; i < whole; i++) add(make(kind, current, w, h));
      }

      backCtx.clearRect(0, 0, w, h);
      frontCtx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.theme !== current) p.alpha -= dt * 1.2;
        move(p, t, dt);

        const margin = SWIMMERS.includes(p.kind) ? p.size + 40 : 80;
        const gone = p.alpha <= 0 || p.y < -margin || p.y > h + margin || p.x < -margin || p.x > w + margin;
        if (gone) {
          particles.splice(i, 1);
          continue;
        }
        draw(p.front ? frontCtx : backCtx, p, t, getSprites(p.theme));
      }
      backCtx.globalAlpha = 1;
      frontCtx.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      backCtx.clearRect(0, 0, w, h);
      frontCtx.clearRect(0, 0, w, h);
    };
  }, [running]);

  return (
    <>
      <div className={styles.particlesBack} aria-hidden="true">
        <canvas ref={back} className={styles.canvas} />
      </div>
      <div className={styles.particlesFront} aria-hidden="true">
        <canvas ref={front} className={styles.canvas} />
      </div>
    </>
  );
}
