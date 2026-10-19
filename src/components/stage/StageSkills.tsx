import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { skillGroups, techCloud } from "../../data/cv";
import { easeOut } from "../../lib/motion";

export default function StageSkills() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const group = skillGroups[active];

  return (
    <section
      id="skills"
      className="stage-section"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <span className="stage-kicker">05 — Skills</span>
        <h2 id="skills-heading" className="stage-title max-w-2xl">
          A production stack,{" "}
          <span className="gradient-role">not a buzzword wall</span>
        </h2>
      </Reveal>

      <Reveal className="mt-8">
        <div className="skill-marquee overflow-hidden border-y border-edge/50 py-3.5">
          <div className="skill-track flex gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {[...techCloud, ...techCloud].map((tech, i) => (
              <span key={`${tech}-${i}`} className="flex items-center gap-8">
                {tech}
                <span className="text-accent2/60" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-12" delay={0.06}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, index) => {
            const selected = active === index;
            return (
              <button
                key={g.category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                className={`rounded-2xl px-4 py-5 text-left transition-all duration-300 ${
                  selected
                    ? "bg-gradient-to-br from-accent2/20 via-accent/10 to-transparent ring-1 ring-accent2/40"
                    : "bg-white/[0.03] ring-1 ring-edge/60 hover:ring-white/20"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-2 block text-lg font-semibold tracking-tight ${
                    selected ? "text-ink" : "text-muted"
                  }`}
                >
                  {g.category}
                </span>
                <span className="mt-2 block text-xs text-muted">
                  {g.subgroups.reduce((n, s) => n + s.items.length, 0)} tools
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.category}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="mt-8"
            role="region"
            aria-live="polite"
            aria-label={`${group.category} skills`}
          >
            <h3 className="sr-only">{group.category}</h3>
            <div className="grid gap-8 md:grid-cols-2">
              {group.subgroups.map((sub) => (
                <div key={sub.label}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {sub.label}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {sub.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
