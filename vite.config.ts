import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    // HeroScene (Three.js) is lazy-loaded and desktop-only; size warning is expected.
    chunkSizeWarningLimit: 1100,
  },
});
