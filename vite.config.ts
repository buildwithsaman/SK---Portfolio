import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildSeoStaticShell } from "./scripts/seoStaticShell";

/** Injects crawlable HTML into #root at build/dev time. createRoot replaces it client-side. */
function seoStaticShellPlugin() {
  return {
    name: "seo-static-shell",
    transformIndexHtml(html: string) {
      const shell = buildSeoStaticShell();
      return html.replace(
        '<div id="root"></div>',
        `<div id="root">\n${shell}\n</div>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), seoStaticShellPlugin()],
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
    chunkSizeWarningLimit: 600,
  },
});
