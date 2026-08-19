# Circuit

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

Then open the printed local URL. `npm run build` produces a static `dist/`
you can deploy anywhere (Netlify, Vercel, GitHub Pages, etc.) or wrap as a PWA.

## Project structure

```
index.html          Vite entry HTML
src/main.jsx         React root
src/App.jsx           The app (screens, workout data, coaching logic)
src/storage.js        localStorage persistence layer
```
