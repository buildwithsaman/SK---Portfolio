import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile, skillGroups } from "../../data/cv";
import { scrollSpring } from "../../lib/scrollMotion";

const heroStack = skillGroups[0].items.slice(0, 3);

export default function StageHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 120]),
    scrollSpring,
  );
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 72]),
    scrollSpring,
  );
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.75, 0]),
    scrollSpring,
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] min-h-[100dvh] items-center justify-center overflow-hidden pt-[max(4.5rem,env(safe-area-inset-top)+3rem)]"
    >
      <motion.div
        className="stage-noise absolute inset-[-10%] z-0"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: bgY }}
      />
      <motion.div
        className="hero-vignette pointer-events-none absolute inset-[-8%] z-[1]"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: bgY }}
      />

      <motion.div
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-[3] mx-auto w-full max-w-3xl px-5 pb-16 pt-2 text-center sm:pb-20 sm:pt-4 md:px-8 md:pt-6"
      >
        <p className="flex justify-center">
          <span className="stage-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
            Hello, I&apos;m
          </span>
        </p>

        <h1 className="relative z-[4] mt-4 sm:mt-5">
          <span className="sr-only">
            {profile.name} — {profile.title}
          </span>
          <span
            aria-hidden="true"
            className="display-name block text-[clamp(2.6rem,11vw,6.5rem)] text-ink drop-shadow-[0_6px_32px_rgba(6,5,9,0.95)]"
          >
            {profile.name}
          </span>
        </h1>

        <div className="relative z-[5] mx-auto mt-4 max-w-2xl sm:mt-5 md:mt-7">
          <p className="px-1 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.16em] text-balance sm:text-sm sm:tracking-[0.22em] md:text-base">
            <span className="gradient-role font-semibold">{profile.title}</span>
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:tracking-[0.2em] md:text-[11px]">
            {profile.location}
            <span className="mx-2 text-edge" aria-hidden="true">
              ·
            </span>
            <span className="inline sm:hidden">
              {heroStack.slice(0, 2).join(" · ")}
            </span>
            <span className="hidden sm:inline">{heroStack.join(" · ")}</span>
          </p>
          <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-ink sm:mt-5 sm:text-base md:text-lg">
            {profile.heroLead}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] sm:mt-4 md:text-[0.95rem]">
            {profile.heroDescription}
          </p>
          <p className="mt-3 hidden text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] sm:block md:text-[0.95rem]">
            {profile.heroSupport}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
            <a href="#work" className="cta-solid">
              Explore My Work
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
