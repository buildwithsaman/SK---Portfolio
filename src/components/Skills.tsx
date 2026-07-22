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

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        {/* 3D interactive cloud */}
        <Reveal>
          <div className="relative h-[420px] w-full rounded-3xl">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.10),transparent_60%)]" />
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
          </div>
        </Reveal>

        {/* grouped skills */}
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <DepthCard className="glass h-full rounded-2xl p-5">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 transition-colors hover:border-accent/50 hover:text-accent"
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
