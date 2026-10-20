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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
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
        className="relative z-[3] mx-auto w-full max-w-3xl px-5 pb-20 pt-4 text-center md:px-8 md:pt-6"
      >
        <p className="flex justify-center">
          <span className="stage-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
            Hello, I&apos;m
          </span>
        </p>

        <h1 className="relative z-[4] mt-5">
          <span className="sr-only">
            {profile.name} — {profile.title}
          </span>
          <span
            aria-hidden="true"
            className="display-name block text-[clamp(3rem,12vw,6.5rem)] text-ink drop-shadow-[0_6px_32px_rgba(6,5,9,0.95)]"
          >
            {profile.name}
          </span>
        </h1>

        <div className="relative z-[5] mx-auto mt-5 max-w-2xl md:mt-7">
          <p className="font-mono text-sm uppercase tracking-[0.22em] md:text-base">
            <span className="gradient-role font-semibold">{profile.title}</span>
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-[11px]">
            {profile.location}
            <span className="mx-2 text-edge" aria-hidden="true">
              ·
            </span>
            {heroStack.join(" · ")}
          </p>
          <p className="mt-5 text-base font-medium leading-relaxed text-ink md:text-lg">
            {profile.heroLead}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] md:text-[0.95rem]">
            {profile.heroDescription}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] md:text-[0.95rem]">
            {profile.heroSupport}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#work" className="cta-solid">
              Explore My Work
            </a>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="cta-ghost"
            >
              Download CV
            </a>
            <a href={`mailto:${profile.email}`} className="cta-ghost">
              Contact Me
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
