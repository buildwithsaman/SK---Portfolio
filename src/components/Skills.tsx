import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { skillGroups, techCloud } from "../data/cv";
import DepthCard from "./ui/DepthCard";
import useMediaQuery from "../hooks/useMediaQuery";

const orbitPositions = [
  [50, 16],
  [73, 22],
  [85, 42],
  [78, 66],
  [61, 78],
  [38, 80],
  [20, 67],
  [15, 43],
  [27, 23],
  [66, 45],
  [38, 50],
] as const;

function TechnologyMap({ compact }: { compact: boolean }) {
  const reduceMotion = useReducedMotion();
  const technologies = techCloud.slice(0, 14);

  if (compact) {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden px-6" aria-label="Technology map">
        <div className="mobile-orbit absolute h-64 w-64 rounded-full border border-accent/15" />
        <div className="mobile-orbit mobile-orbit-reverse absolute h-44 w-44 rounded-full border border-accent2/20" />
        <div className="relative flex max-w-sm flex-wrap justify-center gap-2">
          {technologies.map((tech, index) => (
            <span
              key={tech}
              style={{ animationDelay: `${index * -0.24}s` }}
              className={`mobile-float rounded-full border bg-white/70 px-3 py-1.5 font-mono text-xs shadow-sm backdrop-blur ${
                index % 2 ? "border-accent2/20 text-accent2" : "border-accent/20 text-accent"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" aria-label="Animated technology map">
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/15"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent2/15"
        animate={reduceMotion ? undefined : { rotate: -360, scale: [1, 1.04, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/75 text-center shadow-[0_20px_60px_-28px_rgba(124,58,237,0.45)] backdrop-blur-xl">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">Core stack</div>
          <div className="mt-1 text-sm font-semibold gradient-text">React · TS · Node</div>
        </div>
      </div>
      {technologies.slice(3).map((tech, index) => {
        const [left, top] = orbitPositions[index];
        return (
          <div key={tech} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%`, top: `${top}%` }}>
            <motion.span
              className="block whitespace-nowrap rounded-full border border-white/90 bg-white/80 px-3 py-1.5 font-mono text-[11px] text-slate-600 shadow-sm backdrop-blur-xl"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              whileHover={{ scale: 1.08, color: "#7c3aed" }}
              transition={{ duration: 3.8 + (index % 4) * 0.55, repeat: Infinity, delay: index * -0.3, ease: "easeInOut" }}
            >
              {tech}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const useLiteVisuals = useMediaQuery(
    "(max-width: 767px), (prefers-reduced-motion: reduce)",
  );

  return (
    <section id="skills" className="section-pad">
      <Reveal>
        <span className="eyebrow">03 · Skills</span>
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Tools chosen for the <span className="gradient-text">problem</span>, not the trend.
        </h2>
        <p className="mt-4 max-w-xl text-slate-600">
          {useLiteVisuals
            ? "A focused set of technologies I use to ship reliable products."
            : "A living map of the technologies I use across product, platform, and delivery."}
        </p>
      </Reveal>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        {/* 3D interactive cloud */}
        <Reveal className="lg:sticky lg:top-28">
          <div className="glass relative h-[440px] w-full overflow-hidden rounded-[2rem] border border-white/90 shadow-xl shadow-slate-900/[0.06] lg:h-[520px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.13),transparent_62%)]" />
            <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
              <span className="text-accent">Animated skill map</span>
              <span className="hidden text-slate-400 sm:block">
                Product · Platform · Delivery
              </span>
            </div>
            <TechnologyMap compact={useLiteVisuals} />
            <div className="pointer-events-none absolute inset-x-5 bottom-5 z-10 flex items-center justify-between border-t border-slate-200/70 pt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">
              <span>14 signature tools</span>
              <span>Frontend · Cloud · Data</span>
            </div>
          </div>
        </Reveal>

        {/* grouped skills */}
        <div className="columns-1 gap-4 sm:columns-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 0.05}
              className="mb-4 break-inside-avoid"
            >
              <DepthCard className="glass rounded-[1.4rem] p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                    {group.category}
                  </h3>
                  <span className="rounded-full border border-slate-200 bg-white/60 px-2 py-0.5 font-mono text-[9px] text-slate-400">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-slate-200/80 bg-white/65 px-2.5 py-1.5 text-xs text-slate-700 transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </DepthCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
