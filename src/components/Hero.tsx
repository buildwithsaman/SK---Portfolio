import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { profile, stats } from "../data/cv";

const HeroScene = lazy(() => import("./three/HeroScene"));

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const technologies = [
    "React 19",
    "TypeScript",
    "Node.js",
    "AWS",
    "Kafka",
    "Three.js",
  ];
  return (
    <section
      id="home"
      className="relative flex min-h-[820px] items-center overflow-hidden sm:min-h-[800px] lg:min-h-screen"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 md:opacity-75"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      {/* gradient vignette keeps copy readable above the hero-only 3D scene */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-paper/30 via-transparent to-paper/80" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_30%,rgba(8,145,178,0.10),transparent_45%)]" />
      <div className="hero-noise pointer-events-none absolute inset-0 z-[1]" />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-5 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mobile-hero-copy max-w-[42rem] pb-24 pt-16 text-center md:pb-0 md:pt-20 md:text-left"
        >
          <motion.span variants={item} className="eyebrow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {profile.location} · Available for opportunities
          </motion.span>

          <motion.h1
            variants={item}
            className="text-[3.35rem] font-bold leading-[0.96] tracking-[-0.06em] text-slate-900 sm:text-6xl md:text-7xl lg:text-[5.4rem]"
          >
            {profile.name.split(" ")[0]}
            <br />
            <span className="gradient-text inline-block pb-2">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 flex items-center justify-center gap-3 font-mono text-sm text-accent md:mt-3 md:justify-start md:text-base"
          >
            <span className="h-px w-8 bg-accent/60" />
            {profile.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:mx-0 md:text-lg"
          >
            I build data-intensive platforms end-to-end — from crisp React
            frontends to resilient Node.js services and cloud infrastructure
            that ships on time.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03]"
            >
              View my work
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 font-medium text-slate-700 backdrop-blur transition-colors hover:bg-white"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-4 text-left sm:grid-cols-4 sm:gap-2"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="mobile-stat rounded-xl border border-white/80 bg-white/50 px-3 py-3 backdrop-blur-sm"
              >
                <div className="text-xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="tech-rail pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-white/70 bg-white/35 py-3 backdrop-blur-md">
        <div className="tech-track flex items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
          {[...technologies, ...technologies].map((tech, index) => (
            <span key={`${tech}-${index}`} className="flex items-center gap-8">
              {tech}
              <span className="text-accent2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* interaction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="pointer-events-none absolute bottom-16 right-6 z-10 hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur lg:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
        Move · tap · scroll
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-300 p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
