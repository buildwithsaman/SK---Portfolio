import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4180,
  },
  build: {
    // SkSculpture (Three.js) is lazy-loaded and desktop-only; size warning is expected.
    chunkSizeWarningLimit: 1100,
  },
});
