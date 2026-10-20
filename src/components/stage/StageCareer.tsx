import Reveal from "../ui/Reveal";
import { experiences } from "../../data/cv";

function isInternship(role: string) {
  return /intern/i.test(role);
}

function isCurrent(period: string) {
  return /present/i.test(period);
}

export default function StageCareer() {
  return (
    <section
      id="career"
      className="stage-section"
      aria-labelledby="career-heading"
    >
      <Reveal>
        <span className="stage-kicker">03 — Career</span>
        <h2 id="career-heading" className="stage-title max-w-2xl">
          Professional <span className="gradient-role">Experience</span>
        </h2>
      </Reveal>

      <ol className="relative mt-12 md:mt-16">
        <div
          className="absolute bottom-2 left-[0.35rem] top-2 w-px bg-gradient-to-b from-accent2/80 via-edge to-transparent md:left-[7.25rem]"
          aria-hidden="true"
        />

        {experiences.map((job, index) => {
          const current = isCurrent(job.period);
          const internship = isInternship(job.role);

          return (
            <li
              key={job.company}
              className={`relative py-8 md:py-10 ${current ? "md:pt-8" : ""}`}
            >
              <Reveal
                delay={index * 0.05}
                className="grid gap-3 md:grid-cols-[7.5rem_1fr] md:gap-12"
              >
                <div className="relative flex items-center gap-3 md:block md:pt-1">
                  <span
                    className={`relative z-10 h-2 w-2 shrink-0 rounded-full ring-4 ring-paper md:absolute md:-right-[0.3rem] md:left-auto md:top-2.5 ${
                      current
                        ? "bg-accent2 shadow-[0_0_12px_rgb(var(--accent2)/0.55)]"
                        : "bg-accent2"
                    }`}
                    aria-hidden="true"
                  />
                  <time
                    className={`pl-1 font-mono text-[10px] uppercase tracking-[0.18em] md:pl-0 md:text-right md:text-[11px] ${
                      current ? "text-accent2" : "text-muted"
                    }`}
                    dateTime={
                      job.periodEnd
                        ? `${job.periodStart}/${job.periodEnd}`
                        : job.periodStart
                    }
                  >
                    {job.period}
                  </time>
                </div>

                <div
                  className={`border-b border-edge/50 pb-8 pl-5 last:border-b-0 md:border-b-0 md:pb-0 md:pl-0 ${
                    current
                      ? "rounded-xl md:-ml-3 md:border md:border-accent2/25 md:bg-white/[0.02] md:p-5 md:pl-5"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {current && (
                      <span className="rounded-full border border-accent2/40 bg-accent2/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent2">
                        Current
                      </span>
                    )}
                    {internship && (
                      <span className="rounded-full border border-edge/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        Internship
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-lg font-semibold tracking-tight text-ink md:text-xl ${
                      current || internship ? "mt-2" : ""
                    }`}
                  >
                    {job.role}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent2">
                    {job.company} | {job.location}
                  </p>
                  <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                    {job.summary.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  {job.recognition && (
                    <p className="mt-4 border-l border-accent2/40 pl-3 text-xs leading-relaxed text-muted">
                      ★ {job.recognition}
                    </p>
                  )}
                  {job.domains && job.domains.length > 0 && (
                    <p className="mt-5">
                      <a
                        href="#work"
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent2"
                      >
                        View production applications
                        <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
