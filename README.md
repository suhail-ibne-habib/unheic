# Unheic

Private, in-browser **HEIC to JPG** converter. Files never leave your device.

## Why `heic-to` instead of `heic-to-jpg`

`heic-to-jpg` is a Node CLI. It cannot run in a browser and would require uploading photos to a server.

This app uses [`heic-to`](https://www.npmjs.com/package/heic-to) (libheif in WebAssembly) so conversion stays on the user’s device — matching the Unheic design.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production URL

Set this before building so canonical URLs, Open Graph, sitemap, and robots.txt are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://umheic.online
```

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Hostinger

Use **Node.js 20 or 22** in hPanel. The build script is `next build --webpack` because Hostinger’s image is too old for Next.js 16’s native Turbopack binary (`GLIBC_2.29`).
