import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { heroTechnologies, profile, stats } from "../data/cv";
import useMediaQuery from "../hooks/useMediaQuery";

const HeroScene = lazy(() => import("./three/HeroScene"));

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function MobileBrandVisual() {
  return (
    <div
      className="hero-mobile-brand pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-[16%] flex justify-center opacity-[0.16]">
        <img
          src="/logo-mark.svg"
          alt=""
          width={220}
          height={220}
          className="h-auto w-[min(58vw,16rem)] object-contain drop-shadow-[0_12px_40px_rgba(8,145,178,0.25)]"
          decoding="async"
        />
      </div>
      <div className="absolute bottom-[16%] left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
    </div>
  );
}

export default function Hero() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (!isDesktop || reduceMotion) {
      setShowScene(false);
      return;
    }
    const timer = window.setTimeout(() => setShowScene(true), 180);
    return () => window.clearTimeout(timer);
  }, [isDesktop, reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[38rem] items-center overflow-hidden md:min-h-[42rem] lg:min-h-[min(100vh,52rem)]"
    >
      {showScene ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      ) : (
        <MobileBrandVisual />
      )}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-paper/40 via-transparent to-paper/90" />
      <div className="hero-noise pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mobile-hero-copy max-w-[40rem] pb-20 pt-14 text-center md:pb-8 md:pt-16 md:text-left"
        >
          <motion.span variants={item} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.location} · Open to opportunities
          </motion.span>

          <motion.h1
            variants={item}
            className="text-[2.85rem] font-bold leading-[0.98] tracking-[-0.055em] text-ink sm:text-5xl md:text-6xl lg:text-[4.35rem]"
          >
            {profile.name.split(" ")[0]}
            <br />
            <span className="gradient-text inline-block pb-1">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 flex items-center justify-center gap-3 font-mono text-sm text-accent md:justify-start md:text-[0.95rem]"
          >
            <span className="h-px w-7 bg-accent/60" aria-hidden="true" />
            {profile.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted md:mx-0 md:text-base"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 12 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-edge bg-panel/70 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 grid max-w-xl grid-cols-2 gap-2.5 text-left sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="metric-chip">
                <div className="text-lg font-bold gradient-text">{s.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="tech-rail pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-edge/70 bg-panel/40 py-2.5 backdrop-blur-md">
        <div className="tech-track flex items-center gap-7 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {[...heroTechnologies, ...heroTechnologies].map((tech, index) => (
            <span key={`${tech}-${index}`} className="flex items-center gap-7">
              {tech}
              <span className="text-accent2/80" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
