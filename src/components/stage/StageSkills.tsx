import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { skillGroups } from "../../data/cv";
import { scrollSpring } from "../../lib/scrollMotion";

/** Vertical scroll needed as a fraction of horizontal travel (was 1:1). */
const SCROLL_TRAVEL_FACTOR = 0.72;

export default function StageSkills() {
  const reduceMotion = useReducedMotion();

  // Same scroll-driven horizontal gallery on mobile and desktop.
  // Stacked accordion only for prefers-reduced-motion.
  if (reduceMotion) {
    return <SkillsStacked />;
  }

  return <SkillsHorizontal />;
}

function SkillsStacked() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="skills"
      className="stage-section"
      aria-labelledby="skills-heading"
    >
      <span className="stage-kicker">05 — Technical Skills</span>
      <h2 id="skills-heading" className="stage-title max-w-2xl">
        Technical <span className="gradient-role">Skills</span>
      </h2>

      <div className="mt-10 space-y-3">
        {skillGroups.map((g, index) => {
          const selected = active === index;
          const panelId = `skills-panel-${index}`;
          return (
            <div
              key={g.category}
              className={`rounded-2xl transition-colors ${
                selected
                  ? "bg-gradient-to-br from-accent2/20 via-accent/10 to-transparent ring-1 ring-accent2/40"
                  : "bg-white/[0.03] ring-1 ring-edge/60"
              }`}
            >
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                className="flex w-full items-start gap-3 px-4 py-5 text-left"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold text-ink">
                    {g.category}
                  </span>
                  {!selected && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {g.items.length} skills
                    </span>
                  )}
                </span>
                <span
                  className="font-mono text-xs text-muted"
                  aria-hidden="true"
                >
                  {selected ? "−" : "+"}
                </span>
              </button>
              {selected && (
                <ul
                  id={panelId}
                  className="flex flex-wrap gap-2 px-4 pb-5"
                  aria-label={`${g.category} skills`}
                >
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SkillsHorizontal() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, track.scrollWidth - window.innerWidth);
    setTravel(next);
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    const ro = track ? new ResizeObserver(measure) : null;
    if (track && ro) ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrollBudget = Math.max(travel * SCROLL_TRAVEL_FACTOR, 1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(xRaw, scrollSpring);
  const progressScale = useSpring(scrollYProgress, scrollSpring);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative"
      style={{ height: `calc(100svh + ${scrollBudget}px)` }}
      aria-labelledby="skills-heading"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,rgb(var(--accent)/0.12),transparent_52%),radial-gradient(ellipse_at_82%_65%,rgb(var(--accent2)/0.09),transparent_48%)]"
          aria-hidden="true"
        />

        <div className="relative z-[1] mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="stage-kicker">05 — Technical Skills</span>
              <h2 id="skills-heading" className="stage-title max-w-2xl">
                Technical <span className="gradient-role">Skills</span>
              </h2>
            </div>
            <div className="mb-1 w-28 md:w-40" aria-hidden="true">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Scroll
              </p>
              <div className="h-px overflow-hidden bg-edge/60">
                <motion.div
                  className="h-full origin-left bg-accent2"
                  style={{ scaleX: progressScale }}
                />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="relative z-[1] mt-10 flex w-max gap-6 pl-5 pr-[10vw] md:gap-8 md:pl-8 md:pr-[14vw]"
        >
          {skillGroups.map((group, index) => (
            <article
              key={group.category}
              className="flex h-[min(48vh,340px)] w-[min(82vw,320px)] shrink-0 flex-col border border-edge/70 bg-paper/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:h-[min(56vh,400px)] sm:w-[min(78vw,340px)] sm:p-6 md:w-[380px] md:p-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {group.category}
              </h3>
              <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2 overflow-y-auto pr-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-edge/60 bg-white/[0.04] px-3 py-1.5 text-sm text-ink/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
