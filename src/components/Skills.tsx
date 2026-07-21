import { Suspense, lazy } from "react";
import Reveal from "./ui/Reveal";
import { skillGroups } from "../data/cv";
import DepthCard from "./ui/DepthCard";

const SkillsCloud = lazy(() => import("./three/SkillsCloud"));

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <Reveal>
        <span className="eyebrow">03 · Skills</span>
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          A <span className="gradient-text">full-stack</span> toolkit
        </h2>
        <p className="mt-4 max-w-xl text-slate-600">
          Drag your cursor over the sphere — hover a technology to highlight it.
        </p>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        {/* 3D interactive cloud */}
        <Reveal>
          <div className="relative h-[420px] w-full rounded-3xl">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.10),transparent_60%)]" />
            <Suspense
              fallback={
                <div className="grid h-full place-items-center text-slate-400">
                  Loading…
                </div>
              }
            >
              <SkillsCloud />
            </Suspense>
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
