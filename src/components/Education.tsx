import Reveal from "./ui/Reveal";
import { education, certifications, volunteer } from "../data/cv";
import DepthCard from "./ui/DepthCard";

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <Reveal>
        <span className="eyebrow">04 · Beyond the work</span>
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Learning, leadership & <span className="gradient-text">foundations</span>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <DepthCard className="glass h-full rounded-2xl p-6">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-accent">
              Education
            </h3>
            <div className="space-y-5">
              {education.map((e) => (
                <div key={e.degree} className="border-l border-slate-200 pl-4">
                  <div className="font-semibold leading-snug text-slate-900">
                    {e.degree}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{e.place}</div>
                  <div className="mt-1 font-mono text-xs text-accent">
                    {e.period}
                  </div>
                </div>
              ))}
            </div>
          </DepthCard>
        </Reveal>

        <Reveal delay={0.08}>
          <DepthCard className="glass h-full rounded-2xl p-6">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-accent">
              Professional Development
            </h3>
            <div className="space-y-4">
              {certifications.map((c) => (
                <div key={c.name} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                  <div>
                    <div className="text-sm font-medium leading-snug text-slate-800">
                      {c.name}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {c.org} · {c.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DepthCard>
        </Reveal>

        <Reveal delay={0.16}>
          <DepthCard className="glass h-full rounded-2xl p-6">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-accent">
              Volunteering
            </h3>
            <div className="space-y-5">
              {volunteer.map((v) => (
                <div key={v.role} className="border-l border-slate-200 pl-4">
                  <div className="font-semibold leading-snug text-slate-900">
                    {v.role}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{v.org}</div>
                  <div className="mt-1 font-mono text-xs text-accent">
                    {v.year}
                  </div>
                </div>
              ))}
            </div>
          </DepthCard>
        </Reveal>
      </div>
    </section>
  );
}
