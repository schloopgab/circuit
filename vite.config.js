import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  // GitHub Pages serves a project site (not a user/org *.github.io root
  // site) under /<repo-name>/, so production asset URLs need that prefix —
  // but only when actually building *for* Pages (the deploy workflow sets
  // GITHUB_PAGES=true). A plain local `npm run build && npm run preview`
  // (used for LAN/phone testing, see README) still resolves at "/", since
  // preview serves whatever base the build it's pointed at was made with.
  base: process.env.GITHUB_PAGES === "true" ? "/circuit/" : "/",
  // host: true binds to 0.0.0.0 (not just localhost) so a phone on the same
  // Wi-Fi can reach this machine's dev server at its LAN IP.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/favicon-32.png"],
      manifest: {
        name: "Circuit",
        short_name: "Circuit",
        description: "Full-body circuit workout tracker with weight logging and progressive-overload coaching.",
        // No start_url/scope here on purpose: vite-plugin-pwa fills both in
        // from the resolved `base` above, so this stays correct whether
        // that's "/" (local dev) or "/circuit/" (GitHub Pages) without
        // needing to hardcode the path twice.
        display: "standalone",
        background_color: "#14181A",
        theme_color: "#14181A",
        icons: [
          // Deliberately relative (no leading slash) so these resolve
          // against `base` too, instead of hardcoding the deploy path.
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Precache the app shell so it still loads (and existing data is
        // still readable/loggable) with no network at all.
        globPatterns: ["**/*.{js,css,html,png,svg}"],
      },
    }),
  ],
}));
