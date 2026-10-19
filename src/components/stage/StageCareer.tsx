import Reveal from "../ui/Reveal";
import { experiences } from "../../data/cv";

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
          Professional{" "}
          <span className="gradient-role">experience</span>
        </h2>
      </Reveal>

      <ol className="relative mt-12 md:mt-16">
        <div
          className="absolute bottom-2 left-[0.35rem] top-2 w-px bg-gradient-to-b from-accent2/80 via-edge to-transparent md:left-[7.25rem]"
          aria-hidden="true"
        />

        {experiences.map((job, index) => (
          <Reveal key={job.company} delay={index * 0.05}>
            <li className="relative grid gap-3 py-8 md:grid-cols-[7.5rem_1fr] md:gap-12 md:py-10">
              <div className="relative flex items-center gap-3 md:block md:pt-1">
                <span
                  className="relative z-10 h-2 w-2 shrink-0 rounded-full bg-accent2 ring-4 ring-paper md:absolute md:-right-[0.3rem] md:left-auto md:top-2.5"
                  aria-hidden="true"
                />
                <time
                  className="pl-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:pl-0 md:text-right md:text-[11px]"
                  dateTime={job.period}
                >
                  {job.period}
                </time>
              </div>

              <div className="border-b border-edge/50 pb-8 pl-5 last:border-b-0 md:border-b-0 md:pb-0 md:pl-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-ink md:text-xl">
                    {job.company}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {job.location}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-accent2">{job.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
                  {job.summary}
                </p>
                {job.recognition && (
                  <p className="mt-4 border-l border-accent2/40 pl-3 text-xs leading-relaxed text-muted">
                    ★ {job.recognition}
                  </p>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
