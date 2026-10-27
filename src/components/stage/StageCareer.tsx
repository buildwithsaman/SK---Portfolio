import Reveal from "../ui/Reveal";
import { experiences } from "../../data/cv";

function isInternship(role: string) {
  return /intern/i.test(role);
}

function isCurrent(period: string) {
  return /present/i.test(period);
}

function yearLabel(periodStart: string, current: boolean) {
  if (current) return "NOW";
  return periodStart.slice(0, 4);
}

export default function StageCareer() {
  return (
    <section
      id="career"
      className="mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16"
      aria-labelledby="career-heading"
    >
      <Reveal className="text-center">
        <span className="stage-kicker">03 — Career</span>
        <h2 id="career-heading" className="stage-title mx-auto max-w-2xl">
          My career &amp; <span className="gradient-role">experience</span>
        </h2>
      </Reveal>

      <ol className="relative mx-auto mt-16 max-w-5xl">
        <div
          className="absolute bottom-6 left-[0.35rem] top-6 w-px bg-gradient-to-b from-accent2 via-accent/50 to-transparent md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        {experiences.map((job, index) => {
          const current = isCurrent(job.period);
          const internship = isInternship(job.role);
          const year = yearLabel(job.periodStart, current);

          return (
            <li key={job.company} className="relative py-10 md:py-12">
              <span
                className={`absolute left-[0.1rem] top-12 z-10 h-2.5 w-2.5 rounded-full ring-4 ring-paper md:left-1/2 md:-translate-x-1/2 ${
                  current
                    ? "bg-accent2 shadow-[0_0_16px_rgb(var(--accent2)/0.65)]"
                    : "bg-accent2/80"
                }`}
                aria-hidden="true"
              />

              <Reveal
                delay={index * 0.06}
                className="grid items-start gap-4 pl-7 md:grid-cols-[1fr_6.5rem_1fr] md:gap-10 md:pl-0"
              >
                <div className="md:text-right">
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    {current && (
                      <span className="rounded-full border border-accent2/40 bg-accent2/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent2">
                        Current
                      </span>
                    )}
                    {internship && (
                      <span className="rounded-full border border-edge px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        Internship
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-accent2">{job.company}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {job.location}
                  </p>
                </div>

                <div className="hidden pt-1 text-center md:block">
                  <time
                    className="text-3xl font-medium tracking-tight text-ink"
                    dateTime={
                      job.periodEnd
                        ? `${job.periodStart}/${job.periodEnd}`
                        : job.periodStart
                    }
                  >
                    {year}
                  </time>
                </div>

                <div>
                  <time
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:hidden"
                    dateTime={
                      job.periodEnd
                        ? `${job.periodStart}/${job.periodEnd}`
                        : job.periodStart
                    }
                  >
                    {job.period}
                  </time>
                  <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted md:mt-1 md:text-[0.95rem]">
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
