<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Boostlab Game Studio website

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict), built with Webpack
- **Styling:** CSS Modules plus global tokens and a base reset in `src/app/globals.css` (no Tailwind)
- **Smooth scroll:** Lenis
- **Contact form:** Server Action sending mail with Nodemailer over the Hostinger mailbox
- **Deployment:** Node.js app on Hostinger (`npm run build`, then `npm start`)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- CSS Modules; inline styles only for dynamic values (CSS custom properties)
- 2-space indentation
- Responsive: mobile-first

## Project Structure
```
src/
  app/                    # Routes: /, /games, /support, plus SEO files
  components/sites/boostlab/
    blocks/               # Page sections
    layout/               # Header, footer, smooth scroll
    ui/                   # Shared pieces (Button, Reveal, SplitText, Layout)
    icons/                # SVG icons
    content.ts            # All copy, links and media paths
  lib/                    # cn() and SEO helpers
  types/                  # TypeScript types
public/sites/boostlab/    # Images, fonts and videos
scripts/                  # Asset build scripts (e.g. themed backdrops and sprites)
BoostlabStudioAssets/     # Source game art (not served)
```
