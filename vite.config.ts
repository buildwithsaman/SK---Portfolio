import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { applySeoHead, buildSitemapXml } from "./scripts/seoHead";
import { buildSeoStaticShell } from "./scripts/seoStaticShell";

/**
 * GitHub Pages + custom domain:
 * Keep `base: "./"` so assets resolve on both https://buildwithsaman.dev/
 * and the project Pages URL if the CNAME is missing. Absolute `base: "/"`
 * is not required because canonical/OG/JSON-LD already use profile.siteUrl.
 */
function seoStaticShellPlugin() {
  return {
    name: "seo-static-shell",
    transformIndexHtml(html: string) {
      const withHead = applySeoHead(html);
      const shell = buildSeoStaticShell();
      return withHead.replace(
        '<div id="root"></div>',
        `<div id="root">\n${shell}\n</div>`,
      );
    },
    closeBundle() {
      writeFileSync(resolve("dist/sitemap.xml"), buildSitemapXml());
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
