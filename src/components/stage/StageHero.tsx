import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile, skillGroups } from "../../data/cv";
import { easeOut, STAGE_PERSPECTIVE } from "../../lib/motion";
import { scrollSpring } from "../../lib/scrollMotion";
import usePointerNorm from "../../hooks/usePointerNorm";
import Magnetic from "../ui/Magnetic";

const heroStack = skillGroups[0].items.slice(0, 3);

const enter = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function StageHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { nx, ny, enabled: pointerOn } = usePointerNorm();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }
    const boot = document.getElementById("stage-boot");
    if (!boot || boot.getAttribute("data-done") === "true") {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener("stage-intro-done", onDone);
    return () => window.removeEventListener("stage-intro-done", onDone);
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 120]),
    scrollSpring,
  );
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 56]),
    scrollSpring,
  );
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.62, 1], [1, 0.82, 0.15]),
    scrollSpring,
  );

  const lightX = useTransform(nx, [-1, 1], ["32%", "68%"]);
  const lightY = useTransform(ny, [-1, 1], ["28%", "58%"]);
  const nameRotateY = useTransform(nx, [-1, 1], [5.5, -5.5]);
  const nameRotateX = useTransform(ny, [-1, 1], [-3.5, 3.5]);

  const showMotion = !reduceMotion && ready;

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] min-h-[100dvh] items-center justify-center overflow-x-clip overflow-y-hidden pt-[max(4.5rem,env(safe-area-inset-top)+3rem)]"
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
      {pointerOn && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-[2] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(var(--stage-glow)/0.24),transparent_68%)]"
          style={{ left: lightX, top: lightY, x: "-50%", y: "-50%" }}
        />
      )}

      <motion.div
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-[3] mx-auto w-full max-w-3xl px-5 pb-16 pt-2 text-center sm:pb-20 sm:pt-4 md:px-8 md:pt-6"
        initial={reduceMotion ? false : "hidden"}
        animate={showMotion ? "show" : reduceMotion ? undefined : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
        }}
      >
        <motion.p className="flex justify-center" variants={enter}>
          <span className="stage-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
            Hello, I&apos;m
          </span>
        </motion.p>

        <motion.h1
          className="relative z-[4] mt-4 sm:mt-5"
          variants={{
            hidden: { opacity: 0, y: 28, rotateX: 8 },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.9, ease: easeOut },
            },
          }}
          style={{ perspective: STAGE_PERSPECTIVE }}
        >
          <span className="sr-only">
            {profile.name} — {profile.title}
          </span>
          <motion.span
            aria-hidden="true"
            className="display-name relative mx-auto block w-fit origin-center px-1 text-[clamp(2.6rem,11vw,6.5rem)] text-ink [transform-style:preserve-3d]"
            style={
              pointerOn
                ? { rotateX: nameRotateX, rotateY: nameRotateY }
                : undefined
            }
          >
            <span
              className="pointer-events-none absolute inset-0 select-none text-accent/20"
              style={{ transform: "translateZ(-22px) translateY(8px)" }}
            >
              {profile.name}
            </span>
            <span className="relative block">{profile.name}</span>
          </motion.span>
        </motion.h1>

        <div className="relative z-[5] mx-auto mt-4 max-w-2xl sm:mt-5 md:mt-7">
          <motion.p
            className="px-1 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.16em] text-balance sm:text-sm sm:tracking-[0.22em] md:text-base"
            variants={enter}
          >
            <span className="gradient-role font-semibold">{profile.title}</span>
          </motion.p>
          <motion.p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:tracking-[0.2em] md:text-[11px]"
            variants={enter}
          >
            {profile.location}
            <span className="mx-2 text-edge" aria-hidden="true">
              ·
            </span>
            <span className="inline sm:hidden">
              {heroStack.slice(0, 2).join(" · ")}
            </span>
            <span className="hidden sm:inline">{heroStack.join(" · ")}</span>
          </motion.p>
          <motion.p
            className="mt-4 text-[0.95rem] font-medium leading-relaxed text-ink sm:mt-5 sm:text-base md:text-lg"
            variants={enter}
          >
            {profile.heroLead}
          </motion.p>
          <motion.p
            className="mt-3 text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] sm:mt-4 md:text-[0.95rem]"
            variants={enter}
          >
            {profile.heroDescription}
          </motion.p>
          <motion.p
            className="mt-3 hidden text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] sm:block md:text-[0.95rem]"
            variants={enter}
          >
            {profile.heroSupport}
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8"
            variants={enter}
          >
            <Magnetic>
              <a href="#work" className="cta-solid">
                Explore My Work
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
