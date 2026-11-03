# Boostlab Game Studio

The website for Boostlab Game Studio — [boostlabgames.com](https://boostlabgames.com).

Built with Next.js 16 (App Router), React 19 and TypeScript.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + production build
```

## Environment

The support page's contact form sends mail through the studio's Hostinger mailbox.
Copy `.env.example` to `.env.local` and fill in `SMTP_PASS`; set the same variables on the
live server.

## Deployment

Runs as a Node.js app (Node 20.9 or newer): `npm run build`, then `npm start`.
