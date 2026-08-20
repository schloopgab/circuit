# Circuit

**Live: https://schloopgab.github.io/circuit/** — open that on your phone
and Add to Home Screen (iOS: Share → Add to Home Screen. Android: ⋮ menu →
Add to Home Screen / Install app). It's a real installable PWA with offline
support; nothing you log ever leaves your device (see Stack below).

A full-body circuit workout tracker: three rotating circuits (each cycling
through 4 exercise-variant sets week to week), shoulder/knee-aware exercise
tagging, per-exercise weight logging with a simple progressive-overload
"coach", and workout history with streaks.

## Stack

- React 18 + Vite
- Persistence: `localStorage`, behind a small `src/storage.js` abstraction
  (same shape as the `window.storage` API the component was originally
  written against, so a real backend can replace it later without touching
  `App.jsx`)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Deployment

Pushing to `main` auto-deploys to GitHub Pages via
`.github/workflows/deploy.yml` (build + `actions/deploy-pages`) — nothing
manual needed beyond `git push`. Pages is configured with source "GitHub
Actions" (already set on the repo).

`vite.config.js`'s `base` is `/circuit/` only when the workflow sets
`GITHUB_PAGES=true`; a plain local `npm run build` still resolves at `/`,
so LAN/phone testing (below) isn't affected by the Pages subpath.

## Using it on your phone over the same Wi-Fi (no deploy needed)

The app is a PWA (installable, works offline once loaded) and the dev/preview
servers already bind to this machine's LAN address, not just `localhost`.

1. On this PC: `npm run build && npm run preview` (or double-click
   `preview.cmd`) — this is the one that matters for phone testing, since
   the installable-app bits (manifest, service worker) only get injected
   into a production build, not `npm run dev`.
2. Find this machine's local IP (Windows: `ipconfig`, look for the Wi-Fi
   adapter's IPv4 address) and note the port it prints, e.g.
   `http://192.168.1.76:4173`.
3. On your phone, on the **same Wi-Fi network**, open that address in the
   browser.
4. Add it to your home screen:
   - **iOS Safari**: Share icon → Add to Home Screen.
   - **Android Chrome**: ⋮ menu → Add to Home Screen / Install app.

**Caveat:** this only works while the PC is on, `npm run preview` is
running, and the phone is on the same network — the IP can also change if
your router reassigns it, and Service Workers need HTTPS to register (this
plain-HTTP LAN setup doesn't have it, so offline support won't kick in here
specifically). Mainly useful for testing a change before it's deployed —
for actual daily use, the live GitHub Pages URL above is the one to use.

## Project structure

```
index.html                Vite entry HTML; PWA/iOS meta tags
vite.config.js             LAN host binding + PWA plugin config
scripts/generate-icons.mjs One-off script that generated public/icons/*
public/icons/               App icons (manifest + apple-touch-icon)
src/main.jsx                 React root
src/App.jsx                   Top-level state, screen routing
src/theme.js                   Color/font tokens
src/data/workouts.js            Circuit/exercise data + rotation logic
src/lib/date.js                  Date/week/streak helpers
src/lib/coach.js                  Progressive-overload suggestion logic
src/components/*.jsx               Per-screen components
src/storage.js                      localStorage persistence layer
```
