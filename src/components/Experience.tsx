import Reveal from "./ui/Reveal";
import { experiences } from "../data/cv";
import DepthCard from "./ui/DepthCard";

const impactByCompany: Record<string, string[]> = {
  "Udrive – Rent-a-Car": [
    "30% recovery lift",
    "~70% lower infra cost",
    "Real-time operations",
  ],
  "Arata International FZC · Bahwan International Group": [
    "Cross-platform mobile",
    "REST API delivery",
    "BI & data quality",
  ],
  "Dubai Technologies": ["Desktop applications", "Cross-team delivery"],
};

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <Reveal>
        <span className="eyebrow">02 · Experience</span>
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Where I've <span className="gradient-text">shipped</span>
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* vertical spine */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent2/40 to-transparent md:left-[9px]" />

        <div className="space-y-14">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <div className="relative pl-8 md:pl-12">
                <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-white ring-2 ring-accent md:h-5 md:w-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs text-accent">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {exp.role} · {exp.location}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {impactByCompany[exp.company]?.map((impact) => (
                    <span
                      key={impact}
                      className="rounded-full border border-accent/15 bg-accent/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent"
                    >
                      {impact}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-5">
                  {exp.projects.map((proj, pi) => (
                    <DepthCard
                      key={pi}
                      className="glass rounded-2xl p-5 md:p-6"
                    >
                      {proj.name && (
                        <h4 className="mb-3 font-mono text-sm text-accent2">
                          {proj.name}
                        </h4>
                      )}
                      <ul className="space-y-2.5">
                        {proj.points.map((pt, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-sm leading-relaxed text-slate-600"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </DepthCard>
                  ))}

                  {exp.recognition && (
                    <div className="flex items-center gap-3 rounded-xl border border-accent2/30 bg-accent2/[0.06] px-4 py-3 text-sm text-slate-700">
                      <span className="text-accent2">★</span>
                      {exp.recognition}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
