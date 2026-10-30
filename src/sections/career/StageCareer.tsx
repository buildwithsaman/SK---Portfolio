import Reveal from "../../components/ui/Reveal";
import { experiences, profile } from "../../data/cv";

export default function StageCareer() {
  return (
    <section
      id="career"
      className="overflow-x-clip py-10 lg:py-28"
      aria-labelledby="career-heading"
    >
      <div className="stage-shell">
        <Reveal>
          <span className="stage-kicker">02 — Career</span>
          <h2 id="career-heading" className="sr-only">
            My career
          </h2>
          <p
            aria-hidden="true"
            className="display-name mt-3 text-[clamp(2.85rem,14vw,8rem)] text-ink lg:mt-2"
          >
            My career
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {profile.summary[0]}
          </p>
        </Reveal>

        <Reveal
          className="mt-10 grid gap-8 border-t border-edge/70 pt-8 md:grid-cols-3 md:gap-8 lg:mt-12 lg:pt-10"
          delay={0.1}
        >
          {experiences.map((item) => (
            <article key={item.company}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
                {item.period}
              </p>
              <h3 className="mt-2 text-lg font-medium text-ink">{item.role}</h3>
              <p className="mt-1 text-sm text-muted">{item.company}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {item.location}
              </p>
              {item.summary.map((line) => (
                <p
                  key={line}
                  className="mt-4 text-sm leading-relaxed text-muted"
                >
                  {line}
                </p>
              ))}
              {item.recognition ? (
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-accent2">
                  {item.recognition}
                </p>
              ) : null}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
