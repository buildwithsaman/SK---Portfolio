import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { applySeoHead, buildSitemapXml } from "./scripts/seoHead.ts";
import { buildSeoStaticShell } from "./scripts/seoStaticShell.ts";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

/**
 * GitHub Pages + custom domain:
 * Keep `base: "./"` so assets resolve on both https://buildwithsaman.dev/
 * and the project Pages URL if the CNAME is missing. Absolute `base: "/"`
 * is not required because canonical/OG/JSON-LD already use profile.siteUrl.
 */
const noStore = "no-store, no-cache, must-revalidate";

function shouldStore(url = "") {
  return /\.(mp4|webm|mov|webp|png|jpe?g|gif|ico|woff2?)$/i.test(
    url.split("?")[0],
  );
}

function noStorePlugin() {
  const apply = (
    req: { url?: string },
    res: {
      setHeader: (
        name: string,
        value: number | string | readonly string[],
      ) => unknown;
    },
    next: () => void,
  ) => {
    if (!shouldStore(req.url)) {
      const original = res.setHeader.bind(res);
      res.setHeader = ((
        name: string,
        value: number | string | readonly string[],
      ) => {
        if (String(name).toLowerCase() === "cache-control") {
          return original("Cache-Control", noStore);
        }
        return original(name, value);
      }) as typeof res.setHeader;
      original("Cache-Control", noStore);
      original("Pragma", "no-cache");
      original("Expires", "0");
    }
    next();
  };

  return {
    name: "no-store-page",
    configureServer(server: {
      middlewares: { use: (handler: typeof apply) => void };
    }) {
      server.middlewares.use(apply);
    },
    configurePreviewServer(server: {
      middlewares: { use: (handler: typeof apply) => void };
    }) {
      server.middlewares.use(apply);
    },
  };
}

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
  plugins: [react(), seoStaticShellPlugin(), noStorePlugin()],
  resolve: {
    alias: {
      "@": resolve(projectRoot, "src"),
    },
  },
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
