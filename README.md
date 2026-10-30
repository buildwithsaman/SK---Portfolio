# Cinematic developer portfolio

A dark, motion-heavy personal site you can fork and rebuild as your own. Live example: [buildwithsaman.dev](https://buildwithsaman.dev).

Vite + React 19 + TypeScript + Tailwind + Framer Motion. Static output. No Next.js, no server at request time.

If you want something like this for yourself, start here. Copy the structure, then replace the content and assets.

## What you get

- Full-viewport intro in the same dark navy and periwinkle as the rest of the page, then a Hero with a transparent looping character (or an SVG fallback)
- Tab bar at the top from `lg`, and along the bottom below `lg`. Ask me opens the stored Q&A on every viewport.
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

- `--paper` near-black `#010005`
- `--deep-twilight` edges `#140152`
- `--navy` / `--navy-electric` glow and spotlight `#22007c` / `#0d00a4`
- `--ink` / `--muted` text
- `--stage-max` / `--stage-gutter` page width

Tailwind maps those names in `tailwind.config.js`.

## How the page is built

`src/App.tsx` is the map. Every viewport gets the cinematic page. Ask me (`src/sections/chat`) opens the stored Q&A over it. Phones never see the crawlable SEO résumé; `#seo-static-shell` is `display: none` in `index.html`.

Page sections live in `src/sections/`. Each folder has an `index.ts` barrel. Swap a section by changing that folder and the data it reads.

```
src/sections/layout/       intro, nav, social rail, footer
src/sections/hero/         identity, hero copy, Memoji / IdentityRig
src/sections/highlights/   What I Do
src/sections/career/       Career
src/sections/work/         Work
src/sections/skills/       Skills
src/sections/contact/      Contact
src/sections/chat/         Ask me overlay
src/components/ui/         reusable motion pieces (GooeyNav, FlowingMenu, FlexCarousel, Magnetic, Reveal)
```

1. Intro splash (`src/sections/layout/StageIntro.tsx` + `#stage-boot` in `index.html`). The boot cover is inline in `index.html` so it paints before CSS; keep its colors on the same dark navy / periwinkle tokens as `src/index.css`. Timing lives in `src/lib/introTiming.ts`. Esc skips on desktop. Tap the cover to skip below `lg`. On a touch `lg` device, a Continue control skips. The first load always opens the Hero at the top, even if the URL still has another section hash. Esc, tap, and Continue skip to the same place. Reduced-motion skips immediately.
2. Nav (`src/sections/layout/StageChrome.tsx`: `GooeyNav` tab bar at the top from `lg`, along the bottom below `lg`)
3. Hero (`src/sections/hero`: `StageIdentity` → `StageHero`. From `xl` (1280px) the Hero is a two-column composition: intro and CTAs on the left (~54%), looping character on a violet glow stage on the right (~46%). Width follows `--stage-max` so the Hero and later sections keep expanding on 1536px, 1800px, 2400px, and 3000px screens. Suggestion chips under the character open the same Ask me panel (`openSiteChat` in `src/lib/siteChat.ts`) as the corner control. From `lg` to `xl` the previous two-column layout stays. Below `lg` the Hero is copy only. Reduced-motion users get the poster and a static role.)
4. What I Do (`src/sections/highlights` → `profile.achievements`)
5. Career (`src/sections/career` → open layout like Contact: giant heading, current-role intro, then one column per role)
6. Work (`src/sections/work` → `FlowingMenu` rows from `udriveDomains`. Rows start closed. Labels are one word. Hovering or tapping a row expands title, ownership, contributions, and tech under that row’s marquee. No work stills in this section.)
7. Skills (`src/sections/skills` → a liquid `FlexCarousel` of tech cards. Drag, swipe, wheel, or keys move the row; click the centered card to open its docs. Reduced-motion users get a static card grid.)
8. Contact (`src/sections/contact` → open layout with the large name, title, CTAs, and email / social / education columns) + footer in `src/sections/layout`. The Hero intro is the only bio on the page.
9. Ask me (`src/sections/chat`). The same stored Q&A opens from the corner control, and from `xl` also from the Hero chips under the character. Esc or Close dismisses it. On `xl` and up, hide the corner control while the Hero invite (`#hero-ask`) is on screen, and show it again once that invite scrolls away. Below `lg`, sit the control above the bottom tab bar, and open the panel full screen so answers stay above the keyboard.

Answers come from stored replies in `src/lib/assistant.ts`, not a live model. Typing two or more characters suggests up to six matching questions. Selecting one, or sending an exact question or alias, shows that stored answer. A question that is not in the store gets a contact fallback instead of a generated fact. Keep CV, GitHub, LinkedIn, and email wired to `src/data/cv.ts`. Download CV uses `public/Saman_Khan_CV.pdf`. The prompt is a pill; do not draw a rectangular focus ring on the textarea when someone taps to type. Chat avatars stay circular. On a mouse or trackpad, drag, wheel, or arrow keys move the suggestion chips.

Hashes used by the nav: `#home`, `#career`, `#work`, `#skills`, `#contact`. What I Do is `#highlights` and counts as Home in the tab bar. Clicking a tab always scrolls to that section, even if it is already active, so Home from What I Do returns you to the hero.

## Character

The Hero figure is a silent looping Memoji (poster plus video) from `lg` up. From `xl` it sits in the right column with a soft violet glow; do not wrap it in a card, and do not upscale past the native 640×480 clip. Below `lg` the portfolio page does not play that loop. `CHARACTER_ENABLED = false` in `src/lib/character.ts` restores the SVG IdentityRig (DXB FIELD).

```
public/character/memoji-poster.webp
public/character/memoji.mp4         # silent H.264 High (Chrome, Firefox, Android, GPU decode)
public/character/memoji-hevc.mp4    # silent HEVC hvc1 in MP4 (Safari / iOS, GPU decode)
```

Strip audio before you copy a new clip in. Encode opaque 8-bit 4:2:0 H.264 plus HEVC so the browser can hardware-decode on the GPU. Flatten the studio onto the page paper (`#010005`) in the file. Put HEVC in an `.mp4` with `hvc1`, not a `.mov`. GitHub Pages serves `.mov` as `video/quicktime`, and iOS Safari often will not play that in a `<video>` tag. Do not ship VP9-with-alpha. Do not put `mix-blend-mode` or filters on the `<video>`, and do not restart the clip from `ended` while `loop` is set — that hitch is what makes the Memoji feel lagged. A radial mask on the wrapper fades the studio; keep it off the video element itself. Reduced-motion users see the poster only. The Hero column plays the loop from `lg` up. Ask me uses the same poster plus clip in the chat panel on every viewport. Mark the clip `autoPlay muted playsInline` and do not `visibility: hidden` it while it starts, or iOS will keep the poster.

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

The page asks browsers not to keep a stale copy: `index.html` sends no-cache / no-store, the boot script drops Cache Storage and service workers, and a back-forward restore reloads so you land on Home. Dev and `npm run preview` send the same no-store headers for HTML, JS, and CSS. Leave the Memoji clips cacheable so they do not re-download every visit. GitHub Pages may still CDN-cache HTML for a few minutes after a deploy.

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
