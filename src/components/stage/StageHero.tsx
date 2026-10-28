import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroRoles, profile } from "../../data/cv";
import { easeOut } from "../../lib/motion";
import Magnetic from "../ui/Magnetic";
import IdentityRig from "./IdentityRig";

const roles = [...heroRoles];

const longestRole = roles.reduce((a, b) => (a.length >= b.length ? a : b));

const roleTextClass =
  "gradient-role text-[1.15rem] font-semibold leading-snug tracking-tight sm:text-3xl md:text-4xl";

const char = {
  hidden: { opacity: 0, y: 72, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

function introAlreadyComplete(reduceMotion: boolean | null) {
  if (reduceMotion) return true;
  if (document.documentElement.getAttribute("data-skip-intro") === "true") {
    return true;
  }
  const boot = document.getElementById("stage-boot");
  if (!boot || boot.getAttribute("data-done") === "true") return true;
  try {
    return sessionStorage.getItem("sk-intro-seen") === "1";
  } catch {
    return false;
  }
}

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

    const fallback = window.setTimeout(() => setReady(true), 2400);
    return () => {
      window.removeEventListener("stage-intro-done", onDone);
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRole((current) => (current + 1) % roles.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const showMotion = !reduceMotion && ready;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] min-h-[100dvh] items-center overflow-x-clip pt-[max(4.75rem,env(safe-area-inset-top)+3.25rem)]"
    >
      <div className="stage-noise pointer-events-none absolute inset-[-8%] z-0" />

      <motion.div
        className="relative z-[3] mx-auto grid w-full max-w-[92rem] items-center gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)] lg:gap-6 lg:px-12 lg:pb-10 xl:px-16"
        initial={reduceMotion ? false : "hidden"}
        animate={showMotion ? "show" : reduceMotion ? undefined : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <div className="relative z-[4] max-w-3xl">
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
              {profile.name} — {profile.title}
            </span>
            <span
              aria-hidden="true"
              className="display-name block text-[clamp(3.4rem,12vw,9.25rem)] text-ink"
            >
              {reduceMotion ? (
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

          <div className="relative mt-5 sm:mt-7">
            <p className={`${roleTextClass} invisible select-none`} aria-hidden>
              {longestRole}
            </p>
            {reduceMotion ? (
              <p className={`absolute inset-0 ${roleTextClass}`}>{roles[0]}</p>
            ) : (
              <AnimatePresence initial={false} mode="sync">
                <motion.p
                  key={roles[role]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className={`pointer-events-none absolute inset-0 ${roleTextClass}`}
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
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            {profile.location}
          </motion.p>

          <motion.div
            className="mt-8"
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
          </motion.div>
        </div>

        <div
          className={`flex justify-center max-sm:pointer-events-none max-sm:absolute max-sm:-right-[46%] max-sm:top-0 max-sm:z-0 max-sm:origin-top-right max-sm:scale-[0.68] max-sm:opacity-[0.16] max-[360px]:-right-[54%] max-[360px]:opacity-[0.12] sm:relative sm:z-[1] sm:scale-100 sm:opacity-100 ${
            reduceMotion ? "xl:justify-end" : "xl:hidden"
          }`}
        >
          <IdentityRig compact />
        </div>
      </motion.div>
    </section>
  );
}
