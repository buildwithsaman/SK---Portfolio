import Reveal from "../ui/Reveal";
import Parallax from "../ui/Parallax";
import { education, profile } from "../../data/cv";

export default function StageAbout() {
  return (
    <section
      id="about"
      className="stage-section"
      aria-labelledby="about-heading"
    >
      <Reveal>
        <span className="stage-kicker">02 — About</span>
        <h2 id="about-heading" className="stage-title max-w-3xl">
          About <span className="gradient-role">Me</span>
        </h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent2 md:text-sm">
          {profile.aboutIntro}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <Reveal delay={0.06}>
          <Parallax speed={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </Parallax>
        </Reveal>

        <div className="space-y-10">
          <Reveal delay={0.08}>
            <Parallax speed={0.22}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
                Selected Achievements
              </div>
              <ul className="mt-4 space-y-4">
                {profile.achievements.map((item) => (
                  <li key={item.value} className="text-sm leading-relaxed">
                    <span className="block text-lg font-semibold tracking-tight gradient-role">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-muted">{item.label}</span>
                  </li>
                ))}
              </ul>
            </Parallax>
          </Reveal>

          <Reveal delay={0.12}>
            <Parallax speed={0.28}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
                Education
              </div>
              <ul className="mt-4 space-y-5">
                {education.map((item) => (
                  <li key={item.degree}>
                    <div className="text-sm font-medium text-ink">
                      {item.degree}
                    </div>
                    <div className="mt-1 text-xs text-muted">{item.place}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      {item.period}
                    </div>
                  </li>
                ))}
              </ul>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
