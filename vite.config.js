import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
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
        start_url: "/",
        display: "standalone",
        background_color: "#14181A",
        theme_color: "#14181A",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icons/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Precache the app shell so it still loads (and existing data is
        // still readable/loggable) with no network at all.
        globPatterns: ["**/*.{js,css,html,png,svg}"],
      },
    }),
  ],
});
