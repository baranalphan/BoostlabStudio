/**
 * Original artwork for the support hero.
 *
 * The source stacks five of its own game-character illustrations on one 615×667 canvas
 * and scales them in one after another. The geometry, stacking order and motion are
 * reproduced; the drawings themselves are original Boostlab shapes built from the
 * palette in globals.css, so every layer shares the same canvas and the layers line up
 * exactly as the source's do.
 */

type LayerProps = React.SVGProps<SVGSVGElement>;

const canvas = {
  viewBox: "0 0 615 667",
  width: 615,
  height: 667,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
} as const;

/** Layer 1 — the prize core. In flow, so it sets the size of the whole stack. */
export function HeroCore(props: LayerProps) {
  return (
    <svg {...canvas} {...props}>
      <defs>
        <radialGradient id="bhGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A1FF4F" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#A1FF4F" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#A1FF4F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bhTop" x1="280" y1="300" x2="580" y2="472">
          <stop offset="0%" stopColor="#E4FFC9" />
          <stop offset="100%" stopColor="#A1FF4F" />
        </linearGradient>
        <linearGradient id="bhLeft" x1="280" y1="386" x2="430" y2="622">
          <stop offset="0%" stopColor="#6FCB20" />
          <stop offset="100%" stopColor="#295500" />
        </linearGradient>
        <linearGradient id="bhRight" x1="580" y1="386" x2="430" y2="622">
          <stop offset="0%" stopColor="#8CE93C" />
          <stop offset="100%" stopColor="#3C7A06" />
        </linearGradient>
      </defs>
      <ellipse cx="430" cy="455" rx="275" ry="245" fill="url(#bhGlow)" />
      <path d="M430 300 580 386 430 472 280 386Z" fill="url(#bhTop)" />
      <path d="M280 386 430 472 430 622 280 536Z" fill="url(#bhLeft)" />
      <path d="M580 386 430 472 430 622 580 536Z" fill="url(#bhRight)" />
      <path d="M430 300 580 386 430 472 280 386Z" stroke="#FAFBFD" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M355 429v150M505 429v150" stroke="#0A0E11" strokeOpacity="0.18" strokeWidth="3" />
      <circle cx="430" cy="386" r="26" fill="#0A0E11" fillOpacity="0.25" />
      <circle cx="430" cy="386" r="14" fill="#FAFBFD" fillOpacity="0.85" />
    </svg>
  );
}

/** Layer 2 — a stack of coins. */
export function HeroCoins(props: LayerProps) {
  return (
    <svg {...canvas} {...props}>
      <g transform="translate(86 404)">
        <ellipse cx="62" cy="96" rx="62" ry="26" fill="#2C2C2C" />
        <path d="M0 62v34a62 26 0 0 0 124 0V62Z" fill="#7A5A12" />
        <ellipse cx="62" cy="62" rx="62" ry="26" fill="#E9C457" />
        <path d="M0 40v12a62 26 0 0 0 124 0V40Z" fill="#9A7518" />
        <ellipse cx="62" cy="40" rx="62" ry="26" fill="#F3D97C" />
        <ellipse cx="62" cy="40" rx="38" ry="15" fill="#C8A23A" />
        <path d="M62 29v22M52 36h20" stroke="#FFF4CF" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Layer 3 — a die. */
export function HeroDie(props: LayerProps) {
  return (
    <svg {...canvas} {...props}>
      <g transform="translate(60 118) rotate(-12 62 62)">
        <rect x="0" y="0" width="124" height="124" rx="28" fill="#397CFF" />
        <rect x="0" y="0" width="124" height="124" rx="28" fill="#0A0E11" fillOpacity="0.18" />
        <rect x="6" y="4" width="112" height="112" rx="24" fill="#5B93FF" />
        <g fill="#FAFBFD">
          <circle cx="36" cy="36" r="11" />
          <circle cx="88" cy="36" r="11" />
          <circle cx="62" cy="62" r="11" />
          <circle cx="36" cy="88" r="11" />
          <circle cx="88" cy="88" r="11" />
        </g>
      </g>
    </svg>
  );
}

/** Layer 4 — a gem. */
export function HeroGem(props: LayerProps) {
  return (
    <svg {...canvas} {...props}>
      <g transform="translate(318 74)">
        <path d="M54 0h50l36 44-61 86L18 44Z" fill="#C74FFF" />
        <path d="M54 0 79 44 18 44Z" fill="#E4A6FF" />
        <path d="M104 0 79 44 140 44Z" fill="#9A2BD6" />
        <path d="M18 44h122L79 130Z" fill="#4C0070" fillOpacity="0.45" />
        <path d="M79 44v86" stroke="#FAFBFD" strokeOpacity="0.4" strokeWidth="3" />
        <path d="M54 0h50L79 44Z" fill="#F2D4FF" />
      </g>
    </svg>
  );
}

/** Layer 5 — sparks. */
export function HeroSparks(props: LayerProps) {
  const spark = (x: number, y: number, s: number, o: number) => (
    <path
      key={`${x}-${y}`}
      d="M0-1C0-.45.45 0 1 0 .45 0 0 .45 0 1 0 .45-.45 0-1 0-.45 0 0-.45 0-1Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="#FAFBFD"
      fillOpacity={o}
    />
  );
  return (
    <svg {...canvas} {...props}>
      {spark(527, 150, 46, 0.9)}
      {spark(236, 566, 30, 0.7)}
      {spark(585, 418, 22, 0.55)}
      {spark(146, 262, 18, 0.5)}
      {spark(404, 606, 14, 0.4)}
    </svg>
  );
}
