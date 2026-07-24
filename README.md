# Saman Shakil Khan — 3D Interactive Portfolio

A modern, single-page 3D portfolio for **Saman Shakil Khan**, Full Stack Developer (Dubai, UAE).

Built with a responsive WebGL hero scene, a draggable 3D skills cloud, pointer-reactive
depth cards, scroll-driven motion, and an accessible glass-and-aurora visual system.

## Tech stack

- **React 19.2 + TypeScript 7 + Vite 8** — fast, typed single-page application
- **three.js + @react-three/fiber + @react-three/drei** — the 3D scenes
  - Interactive code window, orbital system, glyphs, particle field, and cursor lighting (hero)
  - Draggable Fibonacci-sphere technology cloud with hover highlighting (skills)
- **Framer Motion** — scroll reveals, staggered hero intro, animated nav pill & scroll progress bar
- **Tailwind CSS** — utility-first styling and theme tokens

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run typecheck  # run the TypeScript 7 compiler
npm run build      # production build to /dist
npm run preview    # preview the production build
```

## Structure

```
src/
  App.tsx                  # page composition + scroll progress bar
  data/cv.ts               # all portfolio content (single source of truth)
  components/
    Navbar.tsx             # sticky nav with active-section tracking
    Hero.tsx               # hero copy over the 3D scene
    About.tsx              # summary + highlight cards
    Experience.tsx         # timeline of roles & projects
    Skills.tsx             # 3D cloud + grouped skill chips
    Education.tsx          # education, certifications, volunteering
    Contact.tsx            # contact CTA + links
    Footer.tsx
    ui/Reveal.tsx          # reusable scroll-reveal wrapper
    three/HeroScene.tsx    # WebGL hero background
    three/SkillsCloud.tsx  # WebGL rotating tech cloud
```

To update content, edit `src/data/cv.ts` — the UI is fully data-driven.
