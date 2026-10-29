import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroRoles, profile } from "../../data/cv";
import useMediaQuery from "../../hooks/useMediaQuery";
import { INTRO_TOTAL_MS, introAlreadyComplete } from "../../lib/introTiming";
import { easeOut } from "../../lib/motion";
import Magnetic from "../ui/Magnetic";
import StageFigure from "./StageFigure";

const roles = [...heroRoles];

const roleTextClass =
  "gradient-role text-[1.05rem] font-semibold leading-snug tracking-tight sm:text-2xl md:text-[2rem] min-[1800px]:text-4xl";

const char = {
  hidden: { opacity: 0, y: 72, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

function SplitLine({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } },
      }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
          variants={char}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function StageHero() {
  const reduceMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const staticHero = Boolean(reduceMotion || mobile);
  const [ready, setReady] = useState(() => introAlreadyComplete(reduceMotion));
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (introAlreadyComplete(reduceMotion)) {
      setReady(true);
      return;
    }

    const boot = document.getElementById("stage-boot");
    const onDone = () => setReady(true);
    window.addEventListener("stage-intro-done", onDone);

    const observer = new MutationObserver(() => {
      if (introAlreadyComplete(reduceMotion)) setReady(true);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skip-intro"],
    });
    if (boot) {
      observer.observe(boot, {
        attributes: true,
        attributeFilter: ["data-done"],
      });
    }

    const fallback = window.setTimeout(
      () => setReady(true),
      INTRO_TOTAL_MS + 1200,
    );
    return () => {
      window.removeEventListener("stage-intro-done", onDone);
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (staticHero || !ready) return;
    setRole(0);
    const id = window.setInterval(() => {
      setRole((current) => (current + 1) % roles.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [staticHero, ready]);

  const showMotion = !staticHero && ready;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] min-h-[100dvh] items-center overflow-x-clip pt-[max(4.75rem,env(safe-area-inset-top)+3.25rem)] max-md:min-h-0 max-md:items-start max-md:pb-[max(6.75rem,calc(env(safe-area-inset-bottom)+5.5rem))] lg:pt-[max(6.25rem,env(safe-area-inset-top)+5rem)]"
    >
      <div className="stage-noise pointer-events-none absolute inset-[-8%] z-0" />

      <motion.div
        className="stage-shell relative z-[3] grid items-center gap-8 pb-16 max-md:pb-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)] lg:gap-6 lg:pb-10 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        initial={staticHero ? false : "hidden"}
        animate={showMotion ? "show" : staticHero ? undefined : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <div className="relative z-[4] max-w-3xl 2xl:max-w-4xl min-[1800px]:max-w-5xl">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent2 sm:text-[11px]"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easeOut },
              },
            }}
          >
            Hello, I&apos;m
          </motion.p>

          <h1 className="mt-4">
            <span className="sr-only">
              {profile.name}, {profile.title}
            </span>
            <span
              aria-hidden="true"
              className="display-name block text-[clamp(3.4rem,8vw,13rem)] text-ink"
            >
              {staticHero ? (
                <>
                  <span className="block">Saman</span>
                  <span className="block">Khan</span>
                </>
              ) : (
                <>
                  <SplitLine text="SAMAN" className="block" />
                  <SplitLine text="KHAN" className="block" />
                </>
              )}
            </span>
          </h1>

          <div className="relative mt-5 overflow-hidden sm:mt-7">
            <div className="grid" aria-hidden="true">
              {roles.map((line) => (
                <p
                  key={line}
                  className={`${roleTextClass} invisible col-start-1 row-start-1 select-none`}
                >
                  {line}
                </p>
              ))}
            </div>
            {staticHero || !showMotion ? (
              <p className={`absolute inset-0 ${roleTextClass}`}>{roles[0]}</p>
            ) : (
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={roles[role]}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease: easeOut }}
                  className={`absolute inset-0 ${roleTextClass}`}
                >
                  {roles[role]}
                </motion.p>
              </AnimatePresence>
            )}
          </div>

          <motion.p
            className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: easeOut },
              },
            }}
          >
            {profile.heroLead}
          </motion.p>

          <motion.p
            className="mt-3 max-w-md text-sm leading-relaxed text-muted/80"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: easeOut },
              },
            }}
          >
            {profile.heroSupport}
          </motion.p>

          <motion.p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            {profile.location}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-3 sm:mt-8"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easeOut },
              },
            }}
          >
            <Magnetic>
              <a href="#work" className="cta-solid">
                Explore My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                download={profile.resumeName}
                className="cta-ghost"
              >
                Download CV ↗
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {mobile ? null : (
          <div
            className={`flex justify-center ${
              reduceMotion ? "xl:justify-end" : "xl:hidden"
            }`}
          >
            <StageFigure compact />
          </div>
        )}
      </motion.div>
    </section>
  );
}
