import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { education, profile } from "../../data/cv";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
];

export default function StageContact() {
  const school = education[0];

  return (
    <section
      id="contact"
      className="overflow-x-clip py-10 lg:py-14"
      aria-labelledby="contact-heading"
    >
      <div className="stage-shell">
        <Reveal>
          <span className="stage-kicker">05 — Contact</span>
          <h2 id="contact-heading" className="sr-only">
            {profile.contactHeading}
          </h2>
          <p
            aria-hidden="true"
            className="display-name mt-3 text-[clamp(2.85rem,14vw,8rem)] text-ink"
          >
            {profile.name}
          </p>
          <p className="gradient-role mt-3 text-lg font-semibold sm:text-xl md:text-2xl">
            {profile.title}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {profile.contactIntro}
          </p>
        </Reveal>

        <Reveal className="mt-6 flex flex-wrap gap-3" delay={0.06}>
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="cta-solid">
              Contact Me →
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="cta-ghost"
            >
              Download CV ↗
            </a>
          </Magnetic>
        </Reveal>

        <Reveal
          className="mt-10 grid gap-8 border-t border-edge/70 pt-8 md:grid-cols-3 md:gap-10"
          delay={0.1}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block break-all text-sm text-ink transition-colors hover:text-accent2"
            >
              {profile.email}
            </a>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              Phone
            </p>
            <a
              href={profile.phoneHref}
              className="mt-2 block text-sm text-ink transition-colors hover:text-accent2"
            >
              {profile.phone}
            </a>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              Location
            </p>
            <p className="mt-2 text-sm text-ink">{profile.locationFull}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              Social
            </p>
            <ul className="mt-2">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="flex items-center justify-between border-b border-edge/80 py-3 text-lg text-ink transition-colors hover:text-accent2"
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              Education
            </p>
            <p className="mt-2 text-lg font-medium text-ink">{school.degree}</p>
            <p className="mt-1 text-sm text-muted">{school.place}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {school.period}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
