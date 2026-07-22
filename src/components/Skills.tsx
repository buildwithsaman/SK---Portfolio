import { Suspense, lazy } from "react";
import Reveal from "./ui/Reveal";
import { skillGroups, techCloud } from "../data/cv";
import DepthCard from "./ui/DepthCard";
import useMediaQuery from "../hooks/useMediaQuery";

const SkillsCloud = lazy(() => import("./three/SkillsCloud"));

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
            : "Drag your cursor over the sphere — hover a technology to highlight it."}
        </p>
      </Reveal>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        {/* 3D interactive cloud */}
        <Reveal className="lg:sticky lg:top-28">
          <div className="glass relative h-[440px] w-full overflow-hidden rounded-[2rem] border border-white/90 shadow-xl shadow-slate-900/[0.06] lg:h-[520px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.13),transparent_62%)]" />
            <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
              <span className="text-accent">Interactive skill orbit</span>
              <span className="hidden text-slate-400 sm:block">
                {useLiteVisuals ? "Animated technology map" : "Drag to explore"}
              </span>
            </div>
            {useLiteVisuals ? (
              <div
                className="relative flex h-full items-center justify-center overflow-hidden px-6"
                aria-label="Technology cloud"
              >
                <div className="mobile-orbit absolute h-64 w-64 rounded-full border border-accent/15" />
                <div className="mobile-orbit mobile-orbit-reverse absolute h-44 w-44 rounded-full border border-accent2/20" />
                <div className="relative flex max-w-sm flex-wrap justify-center gap-2">
                  {techCloud.slice(0, 14).map((tech, index) => (
                    <span
                      key={tech}
                      style={{ animationDelay: `${index * -0.24}s` }}
                      className={`mobile-float rounded-full border bg-white/70 px-3 py-1.5 font-mono text-xs shadow-sm backdrop-blur ${
                        index % 2
                          ? "border-accent2/20 text-accent2"
                          : "border-accent/20 text-accent"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="grid h-full place-items-center text-slate-400">
                    Loading…
                  </div>
                }
              >
                <SkillsCloud />
              </Suspense>
            )}
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
