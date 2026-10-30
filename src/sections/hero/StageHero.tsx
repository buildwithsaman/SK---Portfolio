import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroRoles, profile } from "../../data/cv";
import useMediaQuery from "../../hooks/useMediaQuery";
import { INTRO_TOTAL_MS, introAlreadyComplete } from "../../lib/introTiming";
import { easeOut } from "../../lib/motion";
import { openSiteChat } from "../../lib/siteChat";
import Magnetic from "../../components/ui/Magnetic";
import StageFigure from "./StageFigure";

const roles = [...heroRoles];

const DESKTOP_HEADLINE = "Software Engineer & Developer";
const DESKTOP_LEAD =
  "I build production-ready web platforms, from internal operational systems to customer-facing digital experiences.";
const DESKTOP_SUPPORT =
  "Working with React, Next.js, TypeScript, and Python, with a focus on frontend architecture, automation, and API integration.";

const HERO_CHIPS = [
  {
    label: "My experience",
    question: "Tell me about your professional experience.",
    topicId: "q168",
  },
  {
    label: "Projects I've built",
    question: "Can I see your previous projects?",
    topicId: "q169",
  },
  {
    label: "Tech stack",
    question: "What is your tech stack?",
    topicId: "q068",
  },
] as const;

const roleTextClass =
  "gradient-role text-[1.2rem] font-semibold leading-snug tracking-tight sm:text-2xl md:text-[2rem] min-[1800px]:text-4xl";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const char = {
  hidden: { opacity: 0, y: 72, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

const charSoft = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

function SplitLine({
  text,
  className,
  soft,
}: {
  text: string;
  className?: string;
  soft?: boolean;
}) {
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
          variants={soft ? charSoft : char}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

function HeroAsk() {
  return (
    <div
      id="hero-ask"
      className="hero-ask relative z-[2] mt-5 w-full max-w-[22rem] text-center xl:mt-6"
    >
      <p className="text-[0.95rem] font-medium tracking-tight text-ink">
        Curious about my work?
      </p>
      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[rgb(var(--ink)/0.62)]">
        Ask me about my experience, projects, or skills.
      </p>
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
        {HERO_CHIPS.map((chip) => (
          <button
            key={chip.topicId}
            type="button"
            className="hero-ask-chip"
            onClick={() =>
              openSiteChat({ question: chip.question, topicId: chip.topicId })
            }
          >
            {chip.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="hero-ask-open mt-3"
        onClick={() => openSiteChat()}
      >
        Ask me
      </button>
    </div>
  );
}

export default function StageHero() {
  const reduceMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const belowLg = useMediaQuery("(max-width: 1023px)");
  const desktop = useMediaQuery("(min-width: 1280px)");
  const plainType = Boolean(reduceMotion || mobile);
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
    if (reduceMotion || !ready || desktop) return;
    setRole(0);
    const id = window.setInterval(() => {
      setRole((current) => (current + 1) % roles.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion, ready, desktop]);

  const showMotion = !plainType && ready;
  const liveRoles = Boolean(!reduceMotion && ready && !desktop);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] min-h-[100dvh] items-center overflow-x-clip pt-[max(4.75rem,env(safe-area-inset-top)+3.25rem)] max-lg:min-h-0 max-lg:items-start max-lg:pt-[max(2.75rem,env(safe-area-inset-top)+1.75rem)] max-lg:pb-10 lg:pt-[max(5.25rem,env(safe-area-inset-top)+3.75rem)] xl:flex-col xl:items-stretch"
    >
      <div className="stage-noise pointer-events-none absolute inset-[-8%] z-0" />

      <motion.div
        className="stage-shell relative z-[3] grid items-center gap-8 pb-16 max-lg:gap-3 max-lg:pb-0 lg:grid-cols-[minmax(18rem,0.88fr)_minmax(16rem,1.12fr)] lg:gap-6 lg:pb-4 xl:min-h-[calc(100svh-8.5rem)] xl:flex-1 xl:grid-cols-[minmax(0,0.54fr)_minmax(0,0.46fr)] xl:gap-10 xl:pb-24 2xl:gap-12 min-[1800px]:gap-16"
        initial={plainType ? false : "hidden"}
        animate={showMotion ? "show" : plainType ? undefined : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className={`relative z-[4] ${desktop ? "max-w-none" : "max-w-3xl 2xl:max-w-4xl min-[1800px]:max-w-5xl"}`}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="min-w-0">
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent2 sm:text-[11px] xl:tracking-[0.32em]"
              variants={fadeUp}
            >
              Hello, I&apos;m
            </motion.p>

            <h1 className="mt-2 max-md:mt-2.5 lg:mt-3 xl:mt-3">
              <span className="sr-only">
                {profile.name}, {profile.title}
              </span>
              <span
                aria-hidden="true"
                className="display-name block text-[clamp(2.55rem,12vw,13rem)] text-ink max-md:leading-[0.9] md:text-[clamp(3.4rem,8vw,13rem)] xl:text-[clamp(5.75rem,9.5vw,13rem)] xl:leading-[0.9]"
              >
                {plainType ? (
                  <>
                    <span className="block">Saman</span>
                    <span className="block">Khan</span>
                  </>
                ) : (
                  <>
                    <SplitLine text="SAMAN" className="block" soft={desktop} />
                    <SplitLine text="KHAN" className="block" soft={desktop} />
                  </>
                )}
              </span>
            </h1>
          </div>

          <div className="relative mt-4 overflow-hidden max-md:mt-4 sm:mt-5 lg:mt-5 xl:hidden">
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
            {!liveRoles ? (
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
            className={`${roleTextClass} mt-4 hidden xl:block xl:text-[1.5rem] xl:leading-snug min-[1800px]:text-[2rem] min-[2400px]:text-[2.35rem]`}
            variants={fadeUp}
          >
            {DESKTOP_HEADLINE}
          </motion.p>

          <motion.p
            className="mt-4 max-w-md text-sm leading-relaxed text-muted max-md:mt-5 max-md:leading-[1.7] sm:text-base lg:mt-4 xl:mt-5 xl:max-w-[30.5rem] xl:text-[1.0625rem] xl:leading-[1.65] xl:text-[rgb(var(--ink)/0.78)] 2xl:max-w-[36rem] min-[1800px]:max-w-[42rem] min-[1800px]:text-[1.125rem]"
            variants={fadeUp}
          >
            {desktop ? DESKTOP_LEAD : profile.heroLead}
          </motion.p>

          <motion.p
            className="mt-3 max-w-md text-sm leading-relaxed text-muted/80 max-md:mt-3.5 max-md:leading-[1.7] xl:mt-3.5 xl:max-w-[30.5rem] xl:text-[0.9375rem] xl:leading-[1.65] xl:text-[rgb(var(--ink)/0.64)] 2xl:max-w-[36rem] min-[1800px]:max-w-[42rem] min-[1800px]:text-[1.05rem]"
            variants={fadeUp}
          >
            {desktop ? DESKTOP_SUPPORT : profile.heroSupport}
          </motion.p>

          <motion.p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted max-md:mt-5 xl:hidden"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            {profile.location}
          </motion.p>

          <motion.div
            className="mt-4 flex flex-wrap gap-3 max-md:mt-6 max-md:flex-col max-md:items-stretch max-md:gap-3 lg:mt-6 xl:mt-7"
            variants={fadeUp}
          >
            <Magnetic className="max-md:w-full">
              <a href="#work" className="cta-solid xl:min-h-[2.85rem] xl:px-6">
                Explore My Work
                {desktop ? (
                  <span aria-hidden="true" className="text-[0.95rem]">
                    →
                  </span>
                ) : null}
              </a>
            </Magnetic>
            <Magnetic className="max-md:w-full">
              <a
                href={profile.resume}
                download={profile.resumeName}
                className="cta-ghost xl:min-h-[2.85rem] xl:border-[rgb(var(--accent)/0.38)] xl:px-6"
              >
                Download CV
                {desktop ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M8 2.5v8M4.75 7.75 8 11l3.25-3.25M3 13.5h10" />
                  </svg>
                ) : (
                  " ↗"
                )}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {belowLg ? null : (
          <motion.div
            className="relative flex min-h-0 flex-col items-center justify-center lg:min-h-[min(38rem,calc(100svh-8rem))] xl:min-h-[min(36rem,calc(100svh-10rem))]"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {desktop ? (
              <motion.div
                className="hero-memoji-glow"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { duration: 0.9, ease: easeOut },
                  },
                }}
              />
            ) : null}
            <motion.div
              className="relative z-[1] flex w-full justify-center"
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: easeOut },
                },
              }}
            >
              <StageFigure />
            </motion.div>
            {desktop ? <HeroAsk /> : null}
          </motion.div>
        )}
      </motion.div>

      {desktop ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[4] hidden xl:block">
          <div className="stage-shell flex items-end justify-between gap-6 pl-[4.75rem] pr-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--ink)/0.38)]">
              React / Next.js / TypeScript / Python
            </p>
            <a
              href="#highlights"
              className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--ink)/0.42)] transition-colors hover:text-accent2"
            >
              Scroll to explore ↓
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
