# Saman Khan — Portfolio

Personal portfolio for **Saman Khan**, Software Engineer | Frontend Development, based in Dubai, UAE.

Live site: [https://buildwithsaman.dev](https://buildwithsaman.dev)

## Stack

- **Vite 8** + **React 19** + **TypeScript 7** — single-page client application
- **Framer Motion** — scroll-linked motion, reveals, and section transitions
- **Tailwind CSS 3** — utility styling with design tokens in `src/index.css`
- **GitHub Pages** — static hosting via GitHub Actions

This is **not** a Next.js app. There is no App Router and no server rendering at request time. A build-time HTML content shell is injected for crawlers (see SEO below).

## Development

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build → dist/
npm run preview    # http://127.0.0.1:4180
```

## Project structure

```
public/                 # Static assets copied to dist (CNAME, robots, sitemap, CV, logos, OG image)
src/
  App.tsx               # Section composition
  main.tsx              # React entry (createRoot)
  index.css             # Global tokens + stage styles
  data/cv.ts            # All portfolio copy & structured data (edit content here)
  components/stage/     # Page sections + chrome (nav, hero, about, …)
  components/ui/        # Reveal, Parallax helpers
  lib/                  # Motion easing / scroll springs
scripts/
  seoStaticShell.ts     # Build-time crawlable HTML for #root
.github/workflows/
  deploy.yml            # Build dist/ and deploy to GitHub Pages
```

## Content management

Update portfolio text, experience, projects, skills, education, and contact details in:

**`src/data/cv.ts`**

UI components read from that file. Avoid duplicating copy in JSX.

## SEO & discoverability

Configured in `index.html` and `public/`:

- Title, description, canonical URL (`https://buildwithsaman.dev/`)
- Open Graph + Twitter cards (`public/og-image.png`, 1200×630)
- JSON-LD (`Person`, `WebSite`, `ProfilePage`)
- `public/robots.txt` and `public/sitemap.xml`
- Build-time static shell in `#root` via `scripts/seoStaticShell.ts` (replaced by React on hydrate)

## Deployment (GitHub Pages)

Workflow: `.github/workflows/deploy.yml`

1. Push to `main` (or run workflow manually)
2. `npm ci` → `npm run build`
3. Upload `./dist` as Pages artifact and deploy

Custom domain: `public/CNAME` contains `buildwithsaman.dev` (copied into `dist/` on build).

Configure the repository Pages settings to use GitHub Actions as the source.

## Brand / share assets (optional)

`personal-share-kit/` holds private sharing materials (contact card, monogram, vCard). It is **not** part of the website build.

## Notes

- CV download is served from `public/Saman_Khan_CV.pdf`
- Production preview port defaults to `4180` (`vite.config.ts`)
