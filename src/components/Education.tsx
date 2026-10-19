import Reveal from "./ui/Reveal";
import { education, certifications, volunteer, experiences } from "../data/cv";
import { EducationAtmosphere } from "./ui/SectionAtmosphere";

export default function Education() {
  const recognition = experiences.find((item) => item.recognition)?.recognition;

  return (
    <section
      id="education"
      className="section-pad isolate"
      aria-labelledby="education-heading"
    >
      <EducationAtmosphere />
      <Reveal>
        <span className="eyebrow">04 · Education</span>
        <h2
          id="education-heading"
          className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl"
        >
          Background &{" "}
          <span className="gradient-text">credibility</span>.
        </h2>
      </Reveal>

      {recognition && (
        <Reveal className="mt-6" delay={0.04}>
          <div className="surface-muted rounded-xl px-4 py-3 text-sm text-muted">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Recognition ·{" "}
            </span>
            ★ {recognition}
          </div>
        </Reveal>
      )}

      <div className="mt-5 grid gap-2.5 lg:grid-cols-3">
        <Reveal>
          <article className="surface h-full rounded-2xl p-4 md:p-5">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Education
            </h3>
            <div className="mt-4 space-y-4">
              {education.map((e) => (
                <div key={e.degree} className="border-l border-edge pl-3">
                  <div className="text-sm font-semibold leading-snug text-ink">
                    {e.degree}
                  </div>
                  <div className="mt-1 text-xs text-muted">{e.place}</div>
                  <div className="mt-1 font-mono text-[10px] text-accent">
                    {e.period}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="surface h-full rounded-2xl p-4 md:p-5">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Development
            </h3>
            <div className="mt-4 space-y-3">
              {certifications.map((c) => (
                <div key={c.name} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                  <div>
                    <div className="text-sm font-medium leading-snug text-ink">
                      {c.name}
                    </div>
                    <div className="mt-0.5 text-xs text-muted">
                      {c.org} · {c.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="surface h-full rounded-2xl p-4 md:p-5">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Volunteering
            </h3>
            <div className="mt-4 space-y-4">
              {volunteer.map((v) => (
                <div key={v.role} className="border-l border-edge pl-3">
                  <div className="text-sm font-semibold leading-snug text-ink">
                    {v.role}
                  </div>
                  <div className="mt-1 text-xs text-muted">{v.org}</div>
                  <div className="mt-1 font-mono text-[10px] text-accent">
                    {v.year}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
