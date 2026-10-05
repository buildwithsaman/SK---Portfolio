import Reveal from "./ui/Reveal";
import DepthCard from "./ui/DepthCard";
import { AboutAtmosphere } from "./ui/SectionAtmosphere";

const highlights = [
  {
    title: "Frontend ownership",
    body: "Primary owner of large React/TypeScript admin systems — operations, analytics, CRM, and mobility tooling.",
  },
  {
    title: "Measurable impact",
    body: "~70% infrastructure cost reduction via analytics migration, and 30% better debt recovery through invoice automation.",
  },
  {
    title: "Full delivery cycle",
    body: "From Figma to production — responsive UI, API integration, AWS deployment, and continuous improvement.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad isolate">
      <AboutAtmosphere />
      <Reveal>
        <span className="eyebrow">01 · About</span>
      </Reveal>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            I turn operational complexity into{" "}
            <span className="gradient-text">focused software</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border-l border-accent/30 pl-5">
            <p className="text-base leading-relaxed text-slate-600">
              I’m a Dubai-based software engineer focused on customer-facing
              web apps, internal operations platforms, analytics dashboards,
              and automation — using React, Next.js, TypeScript, Python, and
              AWS.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              I value clear communication, collaboration, and owning quality
              from development through deployment.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
        {highlights.map((h, i) => (
          <Reveal key={h.title} delay={0.1 + i * 0.08}>
            <DepthCard className="glass group h-full rounded-2xl p-5 md:p-6">
              <div className="mb-6 font-mono text-xs text-accent md:mb-8">
                0{i + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {h.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {h.body}
              </p>
            </DepthCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 md:mt-8" delay={0.15}>
        <div className="rounded-2xl border border-slate-200/70 bg-white/40 p-5 backdrop-blur md:p-6">
          <div className="grid gap-5 sm:grid-cols-4">
            {["Understand", "Architect", "Ship", "Improve"].map(
              (step, index) => (
                <div
                  key={step}
                  className="relative flex items-center gap-3 sm:block"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-900 font-mono text-[9px] text-white">
                    {index + 1}
                  </span>
                  <div className="sm:mt-3">
                    <div className="text-sm font-medium text-slate-800">
                      {step}
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                      {index === 0 && "Users + constraints"}
                      {index === 1 && "System + experience"}
                      {index === 2 && "Tested + observable"}
                      {index === 3 && "Measure + iterate"}
                    </div>
                  </div>
                  {index < 3 && (
                    <span className="absolute left-7 top-3 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-slate-300 to-transparent sm:block" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
