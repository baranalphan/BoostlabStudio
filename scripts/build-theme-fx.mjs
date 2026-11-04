/**
 * Turns the game art in BoostlabStudioAssets/Games into web-ready assets for the themed
 * "Our games" section (public/sites/boostlab/images/fx/<theme>/).
 *
 * Most "transparent" sprites came out of the image generator fully opaque, with either a
 * fake grey checkerboard or a plain white background baked in. Both are keyed out here by
 * flood-filling the background in from the image edges, so highlights inside an item
 * (which the background never reaches) stay intact:
 *  - checker: the grey squares go, the warm glow around each item becomes a soft halo;
 *  - white:   the white goes, the grey drop shadow becomes a real semi-transparent shadow.
 * Sprites that already have real transparency (the fish) are only trimmed and resized.
 *
 * Run: node scripts/build-theme-fx.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "BoostlabStudioAssets/Games";
const OUT = "public/sites/boostlab/images/fx";

async function load(file) {
  const { data, info } = await sharp(path.join(SRC, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

function helpers({ data, width, height }) {
  const n = width * height;
  const chromaAt = (p) => {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    return Math.max(r, g, b) - Math.min(r, g, b);
  };
  const lumAt = (p) => (data[p * 3] + data[p * 3 + 1] + data[p * 3 + 2]) / 3;
  const queue = new Int32Array(n);
  /**
   * Marks everything reachable from seeds through pixels passing test(next, from); returns
   * the marked pixels.
   */
  const flood = (mask, test, seeds) => {
    let head = 0, tail = 0;
    // Seeds may already be marked (a second pass starts from the first one's area).
    for (const p of seeds) {
      mask[p] = 1;
      queue[tail++] = p;
    }
    while (head < tail) {
      const p = queue[head++];
      const x = p % width;
      for (const q of [x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1, p - width, p + width]) {
        if (q >= 0 && q < n && !mask[q] && test(q, p)) {
          mask[q] = 1;
          queue[tail++] = q;
        }
      }
    }
    return queue.slice(0, tail);
  };
  const edges = [];
  for (let x = 0; x < width; x++) edges.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) edges.push(y * width, y * width + width - 1);
  const marked = (mask) => {
    const list = [];
    for (let p = 0; p < n; p++) if (mask[p]) list.push(p);
    return list;
  };
  return { n, chromaAt, lumAt, flood, edges, marked };
}

/**
 * Checkerboard key, for solid objects with a soft glow around them.
 *  1. Flood the checker greys in from the image edges.
 *  2. Large, weakly tinted grey patches the flood can't reach (the loop of the ankh) are
 *     holes too.
 *  3. Flood on through the faint glow. Whatever is still not reached is an item's core and
 *     stays opaque; the glow in between keeps a soft, grey-free alpha.
 */
function keyChecker(img, { maxGrey = 242 } = {}) {
  const { data } = img;
  const { n, chromaAt, lumAt, flood, edges, marked } = helpers(img);
  const greys = (p) => chromaAt(p) < 16 && lumAt(p) > 110 && lumAt(p) < maxGrey;
  const faint = (p) => chromaAt(p) < 40 && lumAt(p) > 120;
  const tinted = (p) => chromaAt(p) < 48 && lumAt(p) > 150;

  const backdrop = new Uint8Array(n);
  flood(backdrop, greys, edges.filter(greys));
  const holes = new Uint8Array(n);
  for (let p = 0; p < n; p++) {
    if (backdrop[p] || holes[p] || !tinted(p)) continue;
    const patch = flood(holes, (q) => !backdrop[q] && tinted(q), [p]);
    if (patch.length < 1500) continue;
    let sum = 0;
    for (const q of patch) sum += chromaAt(q);
    if (sum / patch.length < 34) for (const q of patch) backdrop[q] = 1;
  }
  const outside = Uint8Array.from(backdrop);
  flood(outside, faint, marked(backdrop));

  const rgba = Buffer.alloc(n * 4);
  for (let p = 0; p < n; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    const o = p * 4;
    if (!outside[p]) {
      rgba.set([r, g, b, 255], o);
      continue;
    }
    if (backdrop[p]) continue;
    const lo = Math.min(r, g, b);
    const chroma = Math.max(r, g, b) - lo;
    const alpha = Math.max(0, Math.min(1, (chroma - 10) / 40)) * 0.7;
    const tint = (c) => 175 + ((c - lo) / Math.max(chroma, 1)) * 80;
    rgba.set([tint(r), tint(g), tint(b), Math.round(alpha * 255)], o);
  }
  return { rgba, core: outside };
}

/**
 * White-background key.
 *  1. Flood the pure white (250–255 in these renders) in from the edges. With `holes` set,
 *     enclosed pure-white patches of at least that many pixels go too (the gaps between
 *     kelp leaves) — off by default, since it would punch out a diamond's white sparkles.
 *  2. Flood on into the grey drop shadow — but only where brightness changes smoothly from
 *     pixel to pixel. Shadows fade gradually; an item's silhouette steps sharply, so white
 *     surfaces (the white half of a capsule, the powder in a bag) are not eaten.
 *  3. The shadow becomes black with an opacity that follows its darkness; core pixels that
 *     touch the background are half-faded so no white fringe is left.
 */
function keyWhite(img, { holes: minHole = Infinity } = {}) {
  const { data, width } = img;
  const { n, chromaAt, lumAt, flood, edges, marked } = helpers(img);
  const white = (p) => chromaAt(p) < 10 && lumAt(p) >= 247;
  const shadow = (q, from) => chromaAt(q) < 18 && lumAt(q) >= 140 && Math.abs(lumAt(q) - lumAt(from)) <= 2.5;

  const backdrop = new Uint8Array(n);
  flood(backdrop, white, edges.filter(white));
  const seen = new Uint8Array(n);
  for (let p = 0; minHole < Infinity && p < n; p++) {
    if (backdrop[p] || seen[p] || !white(p)) continue;
    const patch = flood(seen, (q) => !backdrop[q] && white(q), [p]);
    if (patch.length >= minHole) for (const q of patch) backdrop[q] = 1;
  }
  const outside = Uint8Array.from(backdrop);
  flood(outside, shadow, marked(backdrop));

  const rgba = Buffer.alloc(n * 4);
  for (let p = 0; p < n; p++) {
    const o = p * 4;
    if (backdrop[p]) continue;
    if (outside[p]) {
      const alpha = Math.min(1, ((250 - lumAt(p)) / 250) * 2.5) * 0.55;
      rgba.set([0, 0, 0, Math.round(alpha * 255)], o);
      continue;
    }
    const x = p % width;
    const edge =
      (x > 0 && outside[p - 1]) || (x < width - 1 && outside[p + 1]) || outside[p - width] || outside[p + width];
    rgba.set([data[p * 3], data[p * 3 + 1], data[p * 3 + 2], edge ? 150 : 255], o);
  }
  return { rgba, core: outside };
}

/** Crops a sprite with real transparency to its visible pixels. */
async function trimAlpha(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 12) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return sharp(file).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 });
}

/** The largest foreground blob: its bounding box and a mask of its pixels. */
function largestBlob(core, width, height) {
  const n = width * height;
  const label = new Int32Array(n);
  const queue = new Int32Array(n);
  let best = null;
  let next = 1;
  for (let start = 0; start < n; start++) {
    if (core[start] || label[start]) continue;
    let head = 0, tail = 0, size = 0;
    let x0 = width, y0 = height, x1 = 0, y1 = 0;
    label[start] = next;
    queue[tail++] = start;
    while (head < tail) {
      const p = queue[head++];
      size++;
      const x = p % width, y = (p / width) | 0;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      for (const q of [x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1, p - width, p + width]) {
        if (q >= 0 && q < n && !core[q] && !label[q]) {
          label[q] = next;
          queue[tail++] = q;
        }
      }
    }
    if (!best || size > best.size) best = { size, x0, y0, x1, y1, id: next };
    next++;
  }
  const keep = new Uint8Array(n);
  for (let p = 0; p < n; p++) if (label[p] === best.id) keep[p] = 1;
  return { ...best, keep };
}

async function writeWebp(input, out, maxSide) {
  await input
    .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 92, effort: 6 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${out}  ${meta.width}x${meta.height}`);
}

/** Keys one sprite, crops it to its item (plus room for halo/shadow) and saves it. */
/**
 * For convex items (the diamond): white sparkles on the rim get keyed out with the white
 * background, leaving star-shaped holes. Every light, transparent pixel between the first
 * and last opaque pixel of its row and of its column is put back.
 */
function fillConvex(rgba, { data, width }, box) {
  const restore = (p) => {
    const lum = (data[p * 3] + data[p * 3 + 1] + data[p * 3 + 2]) / 3;
    if (!rgba[p * 4 + 3] && lum >= 200) rgba.set([data[p * 3], data[p * 3 + 1], data[p * 3 + 2], 255], p * 4);
  };
  const span = (from, to, step) => {
    let first = -1, last = -1;
    for (let p = from; p <= to; p += step) {
      if (rgba[p * 4 + 3] === 255) {
        if (first < 0) first = p;
        last = p;
      }
    }
    if (first >= 0) for (let p = first; p <= last; p += step) restore(p);
  };
  for (let y = box.y0; y <= box.y1; y++) span(y * width + box.x0, y * width + box.x1, 1);
  for (let x = box.x0; x <= box.x1; x++) span(box.y0 * width + x, box.y1 * width + x, width);
}

/**
 * Removes the pale floor shadow under an item by colour. The shadow picks up a tint of
 * the item but stays pale: its saturation (chroma ÷ brightest channel) is far below even
 * the item's lightest facet. `bottom` limits it to the lower share of the item, and
 * `maxSaturation`/`minLum` tune it (the diamond's own facets are pale too, higher up).
 */
function cutShadow(rgba, { data, width }, box, { maxSaturation = 0.3, minLum = 110, bottom = 1, connected = false } = {}) {
  const from = Math.round(box.y1 - (box.y1 - box.y0) * bottom);
  const pale = (p) => {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    const hi = Math.max(r, g, b);
    return (r + g + b) / 3 >= minLum && (hi ? (hi - Math.min(r, g, b)) / hi : 0) < maxSaturation;
  };
  if (connected) {
    // Only pale pixels reachable from the transparent outside: a banknote's cream paper is
    // ringed by its dark border, so it is never reached, while the shadow under it is.
    const height = rgba.length / 4 / width;
    const x0 = Math.max(0, box.x0 - 40), x1 = Math.min(width - 1, box.x1 + 40);
    const y0 = Math.max(0, from), y1 = Math.min(height - 1, box.y1 + 40);
    const seen = new Uint8Array(width * height);
    const queue = [];
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const p = y * width + x;
        if (!rgba[p * 4 + 3]) {
          seen[p] = 1;
          queue.push(p);
        }
      }
    }
    while (queue.length) {
      const p = queue.pop();
      const x = p % width, y = (p / width) | 0;
      for (const [qx, qy] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (qx < x0 || qx > x1 || qy < y0 || qy > y1) continue;
        const q = qy * width + qx;
        if (seen[q] || !rgba[q * 4 + 3] || !pale(q)) continue;
        seen[q] = 1;
        rgba[q * 4 + 3] = 0;
        queue.push(q);
      }
    }
    return;
  }
  for (let y = Math.max(box.y0, from); y <= box.y1 + 40; y++) {
    for (let x = Math.max(0, box.x0 - 40); x <= box.x1 + 40 && x < width; x++) {
      const p = y * width + x;
      if (!rgba[p * 4 + 3]) continue;
      const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
      const hi = Math.max(r, g, b);
      const saturation = hi ? (hi - Math.min(r, g, b)) / hi : 0;
      if ((r + g + b) / 3 >= minLum && saturation < maxSaturation) rgba[p * 4 + 3] = 0;
    }
  }
}

async function sprite(file, out, { key, maxSide, pad = 40, isolate = false, convex = false, shadowless, ...options }) {
  const img = await load(file);
  const { rgba, core } = key === "white" ? keyWhite(img, options) : keyChecker(img, options);
  const box = largestBlob(core, img.width, img.height);
  // Things that fall through the air: only the item itself — no floor shadow, no stray
  // specks around it.
  if (isolate) for (let p = 0; p < img.width * img.height; p++) if (!box.keep[p]) rgba[p * 4 + 3] = 0;
  // Shadow first, so the convex fill can't bridge from the item down to its shadow.
  if (shadowless?.connected) cutShadow(rgba, img, box, shadowless);
  else if (shadowless) {
    cutShadow(rgba, img, box, shadowless === true ? {} : shadowless);
    // The shadow's core, right under the item, is a little more tinted.
    cutShadow(rgba, img, box, { maxSaturation: 0.42, bottom: 0.08 });
  }
  if (convex) fillConvex(rgba, img, box);
  const left = Math.max(0, box.x0 - pad);
  const top = Math.max(0, box.y0 - pad);
  const width = Math.min(img.width - left, box.x1 - box.x0 + 1 + pad * 2);
  const height = Math.min(img.height - top, box.y1 - box.y0 + 1 + pad * 2);
  const raw = sharp(rgba, { raw: { width: img.width, height: img.height, channels: 4 } }).extract({ left, top, width, height });
  await writeWebp(raw, out, maxSide);
}

/**
 * The portrait (4:5) backdrop behind the games page's showreel and "Our games" together.
 * Kept at its source size so it is never upscaled; phones show it fixed to the viewport.
 */
async function backdrop(file, dir) {
  await sharp(path.join(SRC, file)).webp({ quality: 84, effort: 6 }).toFile(path.join(dir, "bg.webp"));
  console.log(`${dir}/bg.webp`);
}

// ---- Pyramid Diggers: desert ----
{
  const dir = path.join(OUT, "desert");
  await fs.mkdir(dir, { recursive: true });
  await backdrop("PyramidDiggers/Assets/pyramidNewBG.png", dir);
  for (const [n, name] of [
    [1, "coin"],
    [2, "ankh"],
    [3, "scarab"],
    [4, "vase"],
  ]) {
    await sprite(`PyramidDiggers/Assets/pyramidTresure${n}.png`, path.join(dir, `treasure-${name}.webp`), {
      key: "checker",
      maxSide: 320,
    });
  }
}

// ---- Idle Reef: aquarium ----
{
  const dir = path.join(OUT, "reef");
  await fs.mkdir(dir, { recursive: true });
  await backdrop("IdleReef/Assets/idlereefNewBG.png", dir);
  // Real transparency already: trim and resize only.
  const fish = (await fs.readdir(path.join(SRC, "IdleReef/Fishs"))).filter((f) => f.endsWith(".png"));
  for (const file of fish) {
    const id = file.match(/^\d+/)?.[0];
    const kind = ["2", "31", "48"].includes(id) ? "jelly" : id === "11" ? "seahorse" : "fish";
    await writeWebp(
      await trimAlpha(path.join(SRC, "IdleReef/Fishs", file)),
      path.join(dir, `${kind}-${id}.webp`),
      kind === "fish" ? 480 : 360,
    );
  }
}

// ---- Sins Simulator: crime city ----
{
  const dir = path.join(OUT, "city");
  await fs.mkdir(dir, { recursive: true });
  await backdrop("SinSim/Assets/pimpNewBG.png", dir);
  // Coins, the round tablets and the diamond keep a pale floor shadow the white key can't
  // tell from the background, so it is cut off below the item.
  const items = [
    [`pimpPara1.png`, `bill-1`, {}],
    // The wavy and the crumpled note, and the orange capsule, cast a pale strip of shadow.
    // The wavy note also has a pale paper margin outside its green border, which reads as a
    // white rim once it falls over the dark city; it goes with the shadow.
    [`pimpPara2.png`, `bill-2`, { shadowless: { connected: true, bottom: 1 } }],
    [`pimpPara3.png`, `bill-3`, { shadowless: { connected: true, bottom: 0.3 } }],
    ...[1, 2].map((n) => [`pimpCoin${n}.png`, `coin-${n}`, { shadowless: true }]),
    ...[1, 2].map((n) => [`pimpHap${n}.png`, `pill-${n}`, { shadowless: true }]),
    ...[3, 4].map((n) => [`pimpHap${n}.png`, `pill-${n}`, {}]),
    [`pimpHap5.png`, `pill-5`, { shadowless: { connected: true, bottom: 0.3 } }],
    ...[1, 2].map((n) => [`pimpZip${n}.png`, `bag-${n}`, {}]),
    ["pimpElmas.png", "diamond", { convex: true, shadowless: { maxSaturation: 0.14, bottom: 0.14 } }],
  ];
  for (const [file, name, extra] of items) {
    await sprite(`SinSim/Assets/${file}`, path.join(dir, `${name}.webp`), {
      key: "white",
      maxSide: 256,
      pad: 12,
      isolate: true,
      ...extra,
    });
  }
}
