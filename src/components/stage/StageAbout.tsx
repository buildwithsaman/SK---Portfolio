import Reveal from "../ui/Reveal";
import { education, profile } from "../../data/cv";

export default function StageAbout() {
  const lead = profile.summary.slice(0, 3);
  const rest = profile.summary.slice(3);

  return (
    <section
      id="about"
      className="relative z-[3] mx-auto w-full max-w-[92rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16"
      aria-labelledby="about-heading"
    >
      <div className="xl:ml-[min(50%,36rem)] xl:max-w-3xl">
        <Reveal>
          <span className="stage-kicker">02 — About</span>
          <h2 id="about-heading" className="stage-title">
            About <span className="gradient-role">Me</span>
          </h2>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent2">
            {profile.aboutIntro}
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mt-10 space-y-5 text-base leading-relaxed text-muted md:text-[1.15rem] md:leading-relaxed"
        >
          {lead.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </Reveal>

        {rest.length > 0 && (
          <Reveal
            delay={0.1}
            className="mt-8 border-l border-accent2/40 pl-5 text-sm leading-relaxed text-ink/90 md:text-base"
          >
            {rest.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="[&:not(:first-child)]:mt-4"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        )}

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Reveal delay={0.08}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
              Selected Achievements
            </p>
            <ul className="mt-5 space-y-6">
              {profile.achievements.map((item) => (
                <li key={item.value}>
                  <span className="block font-sans text-4xl font-semibold tracking-tight gradient-role md:text-5xl">
                    {item.value}
                  </span>
                  <span className="mt-2 block max-w-xs text-sm leading-relaxed text-muted">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
              Education
            </p>
            <ul className="mt-5 space-y-6">
              {education.map((item) => (
                <li key={item.degree}>
                  <div className="text-base font-medium text-ink">
                    {item.degree}
                  </div>
                  <div className="mt-1 text-sm text-muted">{item.place}</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {item.period}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
