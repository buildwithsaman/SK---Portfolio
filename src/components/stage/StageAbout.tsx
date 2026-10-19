import Reveal from "../ui/Reveal";
import { education, experiences, profile } from "../../data/cv";

export default function StageAbout() {
  const recognition = experiences.find((e) => e.recognition)?.recognition;

  return (
    <section
      id="about"
      className="stage-section"
      aria-labelledby="about-heading"
    >
      <Reveal>
        <span className="stage-kicker">02 — About</span>
        <h2 id="about-heading" className="stage-title max-w-3xl">
          Frontend-focused{" "}
          <span className="gradient-role">Software Engineer</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal delay={0.06}>
          <p className="text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
            {profile.summary}
          </p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-accent2">
            {profile.location}
          </p>
          {recognition && (
            <p className="mt-6 border-l border-accent/50 pl-4 text-sm text-muted">
              ★ {recognition}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
            Education
          </div>
          <ul className="mt-4 space-y-5">
            {education.map((item) => (
              <li key={item.degree}>
                <div className="text-sm font-medium text-ink">{item.degree}</div>
                <div className="mt-1 text-xs text-muted">
                  {item.place} · {item.period}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
