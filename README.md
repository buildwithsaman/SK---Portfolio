# Cinematic developer portfolio

A dark, motion-heavy personal site you can fork and rebuild as your own. Live example: [buildwithsaman.dev](https://buildwithsaman.dev).

Vite + React 19 + TypeScript + Tailwind + Framer Motion. Static output. No Next.js, no server at request time.

If you want something like this for yourself, start here. Copy the structure, then replace the content and assets.

## What you get

- Full-viewport intro in the same dark navy and periwinkle as the rest of the page, then a Hero with a transparent looping character (or an SVG fallback)
- Tab bar at the top from `lg`. Below `lg`, a conversational mobile portfolio replaces the long page.
- What I Do (impact stats), Career (role cards with copy), Work (hovering menu with copy expanding under the active row), Skills (scroll-driven cards), Contact
- Page copy in `src/data/cv.ts`. Mobile Q&A replies in `src/lib/assistant.ts`.
- Build-time SEO shell so crawlers see real HTML before React mounts
- GitHub Pages deploy on push to `main`

## Quick start

Node 22+.

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run typecheck
npm run lint
npm run format
npm run build      # writes dist/
npm run preview    # http://127.0.0.1:4180
```

## Make it yours

Do this in order. Leave the components alone until the site says your name.

### 1. Identity and copy

Edit **`src/data/cv.ts`**. That file drives the cinematic UI and the SEO shell. Mobile question replies live in `src/lib/assistant.ts` as the `TOPICS` list (`id`, `question`, `answer`, `aliases`, `keywords`). Keep those answers aligned with the CV, public-safe, and do not invent facts for unmatched questions. Do not expose Udrive source, screenshots, live dashboards, customer data, endpoints, or internal architecture. Sample demos are a conversation, not an existing deliverable. Public GitHub is for work you can share; company projects stay private.

Replace:

- `profile` (name, title, location, email, phone, links, hero lines, SEO title/description, `siteUrl`)
- `heroRoles` (rotating line under the name)
- `practices` (What I Do copy in the SEO shell)
- `profile.achievements` (What I Do stats)
- `experiences` (Career slides, current role first)
- `udriveDomains` or your own work items (Work menu rows; title, role, ownership, contributions, and tech expand under the hovered row)
- `techStack` (Skills cards; `id` must match SVG filenames)
- `education`, `navLinks`

Keep copy in `cv.ts`. Do not paste biography into JSX. Website copy should not use `--`.

### 2. Files in `public/`

| Path                                                   | What to put there                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| `Saman_Khan_CV.pdf`                                    | Your CV. Rename it and update `profile.resume` / `profile.resumeName` |
| `logo-mark.svg`, `favicon.svg`, `apple-touch-icon.png` | Your mark                                                             |
| `og-image.png`                                         | 1200×630 social image                                                 |
| `skills/{id}.svg`                                      | One icon per tech stack item                                          |
| `character/`                                           | Hero loop (see Character below)                                       |
| `CNAME`                                                | Your domain, or delete it for `username.github.io`                    |

### 3. Domain and SEO

1. Set `profile.siteUrl` and `profile.contentUpdated` in `cv.ts`
2. Set `public/CNAME` to your domain, or remove it
3. Titles, description, canonical, Open Graph, Twitter, and JSON-LD come from `index.html` plus `scripts/seoHead.ts`
4. The crawlable body is built in `scripts/seoStaticShell.ts` from the same `cv.ts` data. It is visually hidden in `index.html` so phones do not flash the full résumé before React mounts.

After a content change, run `npm run build` so `dist/sitemap.xml` matches.

### 4. Color

Tokens live in `src/index.css`:

- `--black` `#02010a`, `--paper` near-black `#010005`
- `--prussian-blue` panels `#04052e`
- `--deep-twilight` edges `#140152`
- `--navy` / `--navy-electric` glow and spotlight `#22007c` / `#0d00a4`
- `--ink` / `--muted` text
- `--stage-max` / `--stage-gutter` page width

Tailwind maps those names in `tailwind.config.js`.

## How the page is built

`src/App.tsx` is the map. From `lg` (1024px) up it is the cinematic page. Below `lg` it is a conversational mobile UI (`src/components/mobile/`) that answers from stored replies in `src/lib/assistant.ts`.

**Desktop (`lg` and up)**

1. Intro splash (`StageIntro` + `#stage-boot` in `index.html`). The boot cover is inline in `index.html` so it paints before CSS; keep its colors on the same dark navy / periwinkle tokens as `src/index.css`. Timing lives in `src/lib/introTiming.ts`. Esc skips. On a touch `lg` device, a Continue control skips. Reduced-motion skips immediately.
2. Nav (`StageChrome`: `GooeyNav` tab bar at the top from `lg`)
3. Hero (`StageIdentity` → `StageHero` + character in the right column. Reduced-motion users get the poster and a static role.)
4. What I Do (`StagePractice` → `profile.achievements`)
5. Career (`StageCareer` → open layout like Contact: giant heading, current-role intro, then one column per role)
6. Work (`StageWork` → `FlowingMenu` rows from `udriveDomains`. Rows start closed. Labels are one word. Hovering a row expands title, ownership, contributions, and tech under that row’s marquee. No work stills in this section.)
7. Skills (`StageSkills` → a liquid `FlexCarousel` of tech cards. Drag, swipe, wheel, or keys move the row; click the centered card to open its docs. Reduced-motion users get a static card grid.)
8. Contact (`StageContact` → open layout with the large name, title, CTAs, and email / social / education columns) + footer. The Hero intro is the only bio on the page.

**Mobile (below `lg`)**

Phones never see the crawlable SEO résumé; `#seo-static-shell` is `display: none` in `index.html`. They open the same dark loading marquee as desktop (`#stage-boot`) for `MOBILE_LOAD_MS` (2s) in `src/lib/introTiming.ts`, then fade into the Memoji chat. Keep `index.html` and that constant in sync. Tap the cover to skip. Reduced-motion skips immediately. Do not dismiss the boot the instant React mounts, or the résumé dump flashes and the character page is skipped.

`MobilePortfolio` then shows the looping Memoji, a greeting, suggestion chips (`WELCOME_CHIPS` in `src/lib/assistant.ts`), and a glass prompt. The hero Memoji uses an ellipse veil so the studio fades into the paper. Do not clip it to a circle or add a halo plate. Chat avatars stay circular. The prompt is a pill; do not draw a rectangular focus ring on the textarea when someone taps to type.

Answers come from stored replies in `src/lib/assistant.ts`, not a live model. Typing two or more characters suggests up to six matching questions. Selecting one, or sending an exact question or alias, shows that stored answer. A question that is not in the store gets a contact fallback instead of a generated fact. Keep CV, GitHub, LinkedIn, and email wired to `src/data/cv.ts`. Download CV uses `public/Saman_Khan_CV.pdf`.

`components/stage/` is page layout. `components/ui/` is reusable motion pieces. Swap a section by changing that one stage file and the data it reads.

Hashes used by the nav: `#home`, `#career`, `#work`, `#skills`, `#contact`. What I Do is `#highlights` and counts as Home in the tab bar. Clicking a tab always scrolls to that section, even if it is already active, so Home from What I Do returns you to the hero.

## Character

The Hero figure is a silent looping Memoji (poster plus video). `CHARACTER_ENABLED = false` in `src/lib/character.ts` restores the SVG IdentityRig (DXB FIELD).

```
public/character/memoji-poster.webp
public/character/memoji.mp4         # silent H.264 High (Chrome, Firefox, Android, GPU decode)
public/character/memoji-hevc.mp4    # silent HEVC hvc1 in MP4 (Safari / iOS, GPU decode)
```

Strip audio before you copy a new clip in. Encode opaque 8-bit 4:2:0 H.264 plus HEVC so the browser can hardware-decode on the GPU. Flatten the studio onto the page paper (`#010005`) in the file. Put HEVC in an `.mp4` with `hvc1`, not a `.mov`. GitHub Pages serves `.mov` as `video/quicktime`, and iOS Safari often will not play that in a `<video>` tag. Do not ship VP9-with-alpha. Do not put `mix-blend-mode` or filters on the `<video>`, and do not restart the clip from `ended` while `loop` is set — that hitch is what makes the Memoji feel lagged. A radial mask on the wrapper fades the studio; keep it off the video element itself. Reduced-motion users see the poster only. Desktop (`lg`) plays the loop in the Hero column. Below `lg`, the same poster plus H.264/HEVC clip sits in the conversational welcome, with the same ellipse fade and no circular plate. Mark the clip `autoPlay muted playsInline` and do not `visibility: hidden` it while it starts, or iOS will keep the poster.

## Optional React Bits Pro

`components.json` already lists the Pro registries. They need a key:

```bash
# .env.local (gitignored)
REACTBITS_LICENSE_KEY=your_key
```

Without a key, this repo uses local ports of the same public APIs (GooeyNav, FlowingMenu, FlexCarousel). You can keep those, or replace them with the official install later.

## Credits

The cinematic pieces in `src/components/ui/` are local ports. Name the originals if you ship a fork.

**Ideas and components**

- [GooeyNav](https://reactbits.dev/components/gooey-nav), [FlowingMenu](https://reactbits.dev/components/flowing-menu), and [FlexCarousel](https://reactbits.dev/components/flex-carousel) from [React Bits](https://reactbits.dev) by [David Haz](https://github.com/DavidHDev) ([DavidHDev/react-bits](https://github.com/DavidHDev/react-bits))
- [OGL](https://github.com/oframe/ogl) by [Nathan Gordon](https://github.com/gordonnl) (`@gordonnl`, [oframe/ogl](https://github.com/oframe/ogl)), the WebGL layer inside FlexCarousel
- [Hugeicons](https://hugeicons.com) (`@hugeicons`, [hugeicons/hugeicons](https://github.com/hugeicons/hugeicons)) for the tab bar and Work icons
- [Framer Motion](https://motion.dev) by [Matt Perry](https://github.com/mattgperry) (`@mattgperry`, [motiondivision/motion](https://github.com/motiondivision/motion)) for Hero, Career, Skills, and pointer motion
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) by Florian Karsten and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) by [JetBrains](https://github.com/JetBrains/JetBrainsMono)

**Stack**

- [Vite](https://github.com/vitejs/vite) by Evan You (`@yyx990803`, [vitejs/vite](https://github.com/vitejs/vite))
- [React](https://github.com/facebook/react) (`@facebook`)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) (`@tailwindlabs`)
- [TypeScript](https://github.com/microsoft/TypeScript) (`@microsoft`)

## Deploy (GitHub Pages)

Workflow: `.github/workflows/deploy.yml`

1. Push `main` (or run the workflow by hand)
2. `npm ci` → `npm run build`
3. `dist/` goes to Pages

In the repo: **Settings → Pages → GitHub Actions**. `vite.config.ts` uses `base: "./"` so the build works on a custom domain and on a project Pages URL.

## Scripts worth knowing

| Command             | What it does                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Vite on `127.0.0.1:5173`                                                                             |
| `npm run typecheck` | `tsc --noEmit`                                                                                       |
| `npm run lint`      | Prettier check, then TypeScript (`tsc --noEmit`)                                                     |
| `npm run format`    | Prettier with `--ignore-unknown`, so `.env.example` and `.gitignore` do not fail                     |
| `npm run build`     | Typecheck, then production build. Injects the SEO shell into `index.html`. Writes `dist/sitemap.xml` |
| `npm run preview`   | Serve `dist/` on port `4180`                                                                         |

## Conventions

- Page copy: `src/data/cv.ts`. Mobile Q&A replies: `src/lib/assistant.ts`
- Keep mobile answers public-safe. Company source, screenshots, live dashboards, customer data, and internal architecture stay private. A sample demo is a conversation, not a file in the repo.
- Do not invent CV facts. Unmatched questions fall back to email.
- Do not use `--` in on-site copy
- Do not commit `.env.local` or secrets
