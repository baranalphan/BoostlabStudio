# INK Games — source brief

Source: `https://inkgames.com/` and `https://inkgames.com/games/`
Captured: 2026-10-20, desktop viewport 1497×784 (window 1512×900), plus mobile checks.

## Stack observed on the source

| Thing | Evidence |
|---|---|
| Next.js App Router + RSC | `self.__next_f.push` flight payload, `/_next/static/chunks/app/...` |
| styled-components (SSR) | `<style data-styled>` blob in HTML; class ids `index-style__Name-sc-hash` |
| Strapi CMS | content blocks in the flight payload; media on `webadm.inkgames.com/uploads/...` |
| Lenis smooth scroll | `<html class="lenis">` |
| GSAP + ScrollTrigger | `GSAP` client component in layout flight, `gsap.timeline()` in chunks |
| react-three-fiber + drei | `/3d/models/*.glb`, `/3d/images/hdr/dawn.jpg`, `R3FBlockMain` / `R3FCanvasMain` nodes |
| Swiper | second stylesheet on `/games/` is swiper's |

The declared (not computed) CSS was recovered verbatim from the SSR'd styled-components
`<style>` block, and the R3F scene graphs were recovered from the JS chunks, so the
numbers below are the source's own values, not measurements inferred from one rendering.

## Design tokens (source values)

Root: `html { font-size: 62.5% }` → `1rem = 10px`. `body { background:#0A0E11; color:#FAFBFD }`.

Colors
```
white #FFFFFF   darkWhite #FAFBFD   black #000000      inkBlack #0A0E11
prizePurple #C74FFF        darkPrizePurple #4C0070
cooldownGrey #9FAFBD       darkCooldownGrey #374B5C
overdriveBlue #397CFF      darkOverdriveBlue #002B7D
payGreen #A1FF4F           darkPayGreen #295500
softBlue #E9F4FB
darkGrey1 #373737  darkGrey2 #272727  lightGrey1 #D9D9D9  lightGrey2 #EFEFEF  lightGrey3 #FAFAFA
```

Breakpoints (px): tiny 320, mobile 375, mobileM 402, mobileL 640, tabletP 768,
tabletL 1024, desk 1240, deskM 1440, deskL 1800, contained 1920, deskXL 2000.

Fluid helper — every size interpolates against `V = min(100vw, 100vh * 16/9)`:
```
fluid(min,max,bpMin,bpMax) =
  min(max, max(min, calc(min + (max-min) * ((V - bpMin) / (bpMax-bpMin)))))
```
Type scale uses two stops (mobileM→tabletP, then tabletP→contained):

| Token | mobile | ≥768 | line-height | letter-spacing |
|---|---|---|---|---|
| Heading1 | 86→170 | 170→225 | 0.88 | 0.03em |
| Heading2 | 75→100 | 100→150 | 0.87 | 0.04em |
| Heading3 | 55→75 | 75→85 | 0.9 | 0.07em |
| Heading4 | 43→34 | 34→43 | 0.86 | 0.05em |
| Heading5 | 20 | 20→24 | 1.2 | — |
| Body | 15→17 | 17 | 1.33 | 0.01em |
| Cap (mono) | 14→15 | 15 | 1 | -0.007em |

Headings: `RuderPlakatLL` 400, uppercase. Body: `PPNeueMontreal` 400/500.
Caps/buttons: `PPNeueMontrealMono` 500, uppercase.

Spacing tokens (`spacing(name)` → fluid rem):
`xs 5 · s 10 · m [15→20] (402→768) · l [50→60] (768→1440) · xl 80 · radiusS 5 · radiusL [5→10]`

Container: `max-width 196rem; margin 0 auto;` side padding = fluid(15→20, 402→768).
Grid: 12 columns, column-gap = spacing(m).

## Shared chrome

**Header** — `position:fixed; z-index:30`, starts at `opacity:0` and fades in after the
page loader. Padding-top = spacing(m). Grid `1fr auto 1fr` from 1024px, flex below.
Logo 3.2rem tall. Nav shows ≥1024px. "Login" (ghost) + "Sign up" (white→#A1FF4F on hover)
≥768px; "Ink ID" below. Burger toggle <1024px. It hides on scroll-down, shows on scroll-up.

**Buttons** — two stacked label copies; on hover the inner slides `translateY(-100%)` and the
hover copy slides in from `translateY(100%)`, 0.5s `cubic-bezier(.175,.885,.32,1.275)`.
Variants: `primary` (white → payGreen), `secondary` (#272727/#373737 → white),
`ghost` (transparent, border #373737 on hover), `simple`, `simple-underline`.

**Cookie banner** — fixed, bottom spacing(m), centered, max-width 50rem, `#272727` on
`#373737` border, radius 0.5rem. Text + "Learn More" link, "Accept"/"Deny" buttons.

**Footer** — `#FFFFFF` on `#000000`. The dark page panel scrolls over it. Four link
columns (INKGAMES / FOLLOW / CONTACT) in the 12-col grid, then FIND US + LEGAL, then the
octo mark (57→76px wide).

**Page loader** — full-screen `#0A0E11` with the octo mark filled by a gradient, wiped away
with a `linear-gradient(to bottom, black 50%, transparent 50%)` mask animated on
`mask-position`.

**SplitText** — headings are split into lines; each line is `overflow:hidden` and its inner
span starts at `translateY(105%)`, transitioning on
`transform 0.8s cubic-bezier(.2,.715,.205,.99)` with a per-line delay.

## `/` — homepage

Flight payload block order:

1. **HomeHero** — `h1` "Join the new era of gaming", `height:100vh`, max-width 1000px,
   centered, `margin-bottom:5vh`. Behind it an R3F scene: 15 floating objects
   (dice/coin/gem/fueltank/zepplin/bunny/trophy/ticket/plane) around a centred
   `octo-glow` sprite with a `wonderland` board plane behind it. Entry = GSAP
   `fromTo(y:-1 → 0, stagger .1, back.out)` + scale 0→1; idle = per-object sin/cos drift.
   A `backdrop-filter: blur(10px)` strip masks the bottom 15%.
2. **Media** (`LandscapeRight`) — label INKGAMES, h2 "Defining the next generation of gaming",
   CTA Explore → `/games`. Image `ink_about_image` at 70% width, absolute right, `min-height:100vh`,
   wrapped in a `perspective:150px` / `rotateY(-2deg) rotateX(2deg) translateZ(-25px)` card.
3. **ScrollFloat** (`gamesExplore`) — `height:160vh`, pinned inner `100vh`,
   `#C74FFF` on `#4C0070`. h2 "Explore the world of prize kingdoms" + Explore CTA.
   R3F: a large `beach` board plane that travels and shrinks across the scroll, plus
   dice/plane/octo-coin that fall from `+y` to `-y` driven by scroll progress.
4. **Cards** — label INKPAY, h2 "Play. Win. Earn.", three cards (`aspect-ratio .72115`,
   3 cols ≥768px) each a stencil-masked R3F scene over a blurred board image
   (`magic-blur` / `egypt-blur` / `wonderland-blur`), tilting to follow the pointer
   (±π/8). CTA "Create your Ink ID".
5. **NewsList** — label UPDATES, h2 "Latest from Ink Games". Rows become a
   `0.5fr 1fr 3fr` subgrid ≥1240px with `border-radius:5rem` hover (`#272727`/`#373737`),
   and a fixed 25%-wide preview image on the right wiped in with `clip-path`.
6. **Media** (`LandscapeCenter`) — label INKHQ, h2 "Step inside the Ink HQ", autoplay
   muted loop video `inkstudio.mp4` centred at 70% width, CTA Explore → `/studio`.

## `/games/` — Prize Kingdoms

1. **GamesHero** — full-bleed background image + `rgba(0,0,0,.55)` scrim, h1
   "Prize Kingdoms" (`max-width:10ch`), body copy, "Watch trailer" → modal playing
   `inkgames_ad2339efda.mp4`. App Store / Play Store badges (hidden ≥1240px, where the
   header shows them instead).
2. **Media** (`LandscapeRightBottom`) — "Explore the world of Prize Kingdoms" + long copy,
   image `aspect-ratio 1.3/1`, 50% width aligned to the bottom-right ≥1024px.
3. **ScrollFloat** (`gamesTabs`) — `height:160vh`, 4 tabs. Each tab swaps heading, copy,
   section colors and the R3F object set:
   | tab | bg | text |
   |---|---|---|
   | Epic boards | `#9FAFBD` | `#374B5C` |
   | Prize vault | `#A1FF4F` | `#295500` |
   | Card Sets & Events | `#C74FFF` | `#4C0070` |
   | Team up | `#397CFF` | `#002B7D` |
   Tab bar: `rgba(255,255,255,.2)` pill, horizontally scrollable with a right-edge mask
   below 768px.
4. **CardCarousel** — "Explore the Kingdoms Beyond". Swiper, slides `aspect-ratio 375/520`,
   `perspective:200vw` ≥1240px. Inactive slides `scale(.7) rotateY(0)`; the active slide is
   `scale(1) rotateY(180deg)` — a card flip whose back face is the gameplay video.
   Prev/next buttons 3.5rem, `#272727`/`#373737`, hover inverts to white.
5. **ScrollList** — `height:300vh`, pinned. PLAY / WIN / EARN headings fill top-to-bottom
   with `background-clip:text` driven by `--fillAmount`; an R3F framed scene
   (`wonderland-blur` backdrop + dice → chest → coins) swaps per section; the body copy
   sits next to a 0.3rem scroll-progress bar.
6. **CtaBlock** — `Container_d353c1105e.jpg` background with a `rgba(0,0,0,.55)` scrim,
   "your adventure begins here." + store badges, padding 185→279 (320→2000).
7. **ScrollAnim** (`game`) — `height:160vh`, `#A1FF4F` on `#295500`, "gaming that pays you
   back." + copy + Explore → `/inkpay`, with the octo-coin scene.

## Asset map

| Source URL | Local path |
|---|---|
| `/_next/static/media/b8176a400df2b386-s.p.woff2` | `public/sites/inkgames/fonts/RuderPlakatLL-Regular.woff2` |
| `/_next/static/media/dc03e58dafb0f94e-s.p.woff2` | `public/sites/inkgames/fonts/PPNeueMontreal-Regular.woff2` |
| `/_next/static/media/eb0b6447daad5399-s.p.woff2` | `public/sites/inkgames/fonts/PPNeueMontreal-Medium.woff2` |
| `/_next/static/media/772d87814c6d4363-s.p.woff2` | `public/sites/inkgames/fonts/PPNeueMontrealMono-Medium.woff2` |
| `webadm.inkgames.com/uploads/<name>` (10 images) | `public/sites/inkgames/images/<name>` |
| `webadm.inkgames.com/uploads/<name>.mp4` (5) | `public/sites/inkgames/videos/<name>.mp4` |
| `/3d/models/<n>/<n>.glb` (24) | `public/sites/inkgames/3d/models/<n>.glb` |
| `/3d/images/**` (27) | `public/sites/inkgames/3d/images/**` |
| `/images/download/{appstore,playstore}.png` | `public/sites/inkgames/download/` |
| `/images/games/wonderland-blur.jpg` | `public/sites/inkgames/games/wonderland-blur.jpg` |
| inline `<svg viewBox="0 0 159 32">` | `src/components/sites/inkgames/icons/InkGamesLogo.tsx` |
| inline `<svg viewBox="0 0 27 33">` | `.../icons/OctoMark.tsx` |
| inline `<svg viewBox="0 0 8 8">` | `.../icons/ArrowIcon.tsx` |
| inline `<svg viewBox="0 0 9 7">` | `.../icons/ChevronIcon.tsx` |

Content type check: the CMS `.png`/`.jpg` URLs return their stated formats
(`file` confirms JPEG/PNG); the site's own `_next/image` variants were not used — the
originals were taken from `webadm.inkgames.com` directly.

## Route map

| Source | Local |
|---|---|
| `https://inkgames.com/` | `/` → `src/app/page.tsx` |
| `https://inkgames.com/games/` | `/games` → `src/app/games/page.tsx` |

Out of scope and left pointing at the source: `/studio`, `/support`, `/privacy`,
`/terms-and-conditions`, `/inkpay`, `dashboard.inkgames.com`, the news articles, the
App Store / Play Store listings and the social profiles.

---

# Build notes

## Structure

```
src/app/
  layout.tsx            loader, cookies, header, shared r3f canvas, footer
  page.tsx              /        → HomeHero · Media · ScrollFloat · Cards · NewsList · Media
  games/page.tsx        /games   → GamesHero · Media · ScrollFloat(tabs) · CardCarousel
                                   · ScrollList · CtaBlock · ScrollAnim
src/components/sites/inkgames/
  content.ts            every string and media path, lifted from the CMS payload
  ui/                   Button · SplitText · Reveal · Layout (Container/Grid/Kicker/Spacer)
  layout/               Header · Footer · Cookies · PageLoader · SmoothScroll
  blocks/               one component per CMS block type
  three/                R3FCanvas · R3FBlock · Elem3d · Model · Img3d · Float
                        · ScrollTransform · the five scenes
  icons/                the four inline SVGs, as components
src/hooks/useScrollProgress.ts
```

Styling is CSS Modules plus the tokens in `src/app/globals.css`, which is the closest
match for a source built on styled-components with `clamp()`/`min()` fluid math
throughout. Tailwind is still installed and imported, so utilities remain available.

## How the 3d is wired

One fixed, pointer-events-none `<Canvas>` sits at `z-index: 1` for the whole page, and
each section projects into it through drei's `<View>` — the same architecture as the
source's single `R3FCanvasMain` plus per-section `R3FBlock`s. Sections that must cover
the canvas carry `z-index: 2`; the ones that show it through (the hero, the cards, the
pinned sections) are left at `z-index: auto` or given transparent backgrounds, exactly as
the source does.

`Elem3d` is a direct port of the source's positioning helper: positions and sizes are
fractions of the viewport rather than world units. Two deviations were necessary:

- drei's `<View>` freezes its portal's `size` at mount, so r3f's `viewport` is stale
  inside a view. `useViewportSize()` derives the visible plane from the camera instead,
  whose aspect drei does refresh every frame.
- the breakpoint comes from `window.innerWidth` (as in the source's store) rather than
  the view's own width.

Object tables for the hero, the three cards, the four `gamesTabs` sets and the InkPay
scene are the source's own values, recovered from its JS chunks. Models load from the
site's own `.glb` files; since every one of them is normalised to ~2 units and rendered
at `scale={0.5}`, one generic loader covers all 24.

## Known differences from the source

1. **`gamesExplore` (the purple homepage section) object table is reconstructed**, not
   recovered. The source's own table for this variant did not survive minification
   legibly, so board placement, sizes and travel were tuned by eye against screenshots.
   Every other scene uses the source's literal values.
2. **Scroll-driven scenes are pinned with CSS `position: sticky`**, not GSAP
   ScrollTrigger. Same start/end and same travel; easing through the pin is linear where
   the source applies a smoothing lerp, so fast scrubbing settles a touch more abruptly.
3. **`SplitText` splits on measured line boxes**, re-measured on resize. The source uses
   the same clipped-line reveal; line *breaks* can differ by a word at viewport widths
   where a word sits exactly on the boundary.
4. **No page-transition layer.** The source animates between routes with a
   `TransitionLayer`; here navigation is a plain App Router push.
5. **Card tilt reads the pointer over the whole view** rather than tracking
   `mouseenter`/`mouseleave` on the DOM card, so a card can lean slightly before the
   cursor is over it.
6. **`--v` includes the source's 16:9 height cap** (`min(100vw, 100vh * 16/9)`), so type
   and spacing shrink on short windows exactly as they do on the source — screenshots
   only line up when both windows have the same height as well as the same width.
7. Out-of-scope destinations (`/studio`, `/support`, `/privacy`,
   `/terms-and-conditions`, `/inkpay`, the dashboard, the news articles, the app stores
   and the social profiles) still point at the real site.
