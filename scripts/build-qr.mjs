/**
 * Builds the printable QR codes for the sticker landing page (/q/<code>), one per code in
 * `qrLanding.codes` (src/components/sites/boostlab/content.ts), into
 * BoostlabStudioAssets/QR/:
 *  - <code>.svg: vector, for the print shop; scales to any size without blurring;
 *  - <code>.png: 2048 px, for quick previews or tools that don't take SVG.
 *
 * Black on white with the standard four-module quiet zone, which every phone camera reads.
 * Error correction level Q survives about a quarter of the code being scratched or dirty.
 *
 * Run: npm run qr          (all codes in content.ts)
 *      npm run qr -- abc123 (just the codes given)
 * NEXT_PUBLIC_SITE_URL overrides the domain, as it does for the site.
 */
import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://boostlabgames.com").replace(/\/$/, "");
const CONTENT = "src/components/sites/boostlab/content.ts";
const OUT = "BoostlabStudioAssets/QR";

/** content.ts imports videos, so plain Node can't load it: read the codes array as text. */
async function codesFromContent() {
  const source = await fs.readFile(CONTENT, "utf8");
  const list = source.match(/qrLanding = \{[\s\S]*?codes:\s*\[([^\]]*)\]/)?.[1];
  if (!list) throw new Error(`No qrLanding.codes found in ${CONTENT}`);
  return [...list.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

const codes = process.argv.length > 2 ? process.argv.slice(2) : await codesFromContent();
const options = {
  errorCorrectionLevel: "Q",
  margin: 4,
  color: { dark: "#000000", light: "#ffffff" },
};

await fs.mkdir(OUT, { recursive: true });

for (const code of codes) {
  const url = `${SITE_URL}/q/${code}`;
  await fs.writeFile(path.join(OUT, `${code}.svg`), await QRCode.toString(url, { ...options, type: "svg" }));
  await QRCode.toFile(path.join(OUT, `${code}.png`), url, { ...options, width: 2048 });
  console.log(`${url} -> ${OUT}/${code}.svg, ${code}.png`);
}
