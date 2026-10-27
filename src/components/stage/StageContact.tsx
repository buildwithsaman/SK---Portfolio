import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { certifications, profile, volunteer } from "../../data/cv";

const socials = [
  { label: "Github", href: profile.github },
  { label: "Linkedin", href: profile.linkedin },
];

export default function StageContact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28 xl:px-16"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <span className="stage-kicker">06 — Contact</span>
        <h2 id="contact-heading" className="sr-only">
          Let&apos;s Build Something Meaningful
        </h2>
        <p
          aria-hidden="true"
          className="display-name mt-6 text-[clamp(2.4rem,10vw,8rem)] text-ink"
        >
          {profile.name}
        </p>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {profile.contactIntro} {profile.contactSupport}
        </p>
      </Reveal>

      <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.06}>
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
        className="mt-16 grid gap-10 border-t border-edge/70 pt-10 md:grid-cols-3"
        delay={0.1}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Email
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 block break-all text-sm text-ink transition-colors hover:text-accent2"
          >
            {profile.email}
          </a>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Location
          </p>
          <p className="mt-2 text-sm text-ink">{profile.locationFull}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
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
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Designed and developed by
          </p>
          <p className="mt-2 text-lg text-ink">
            <span className="gradient-role">{profile.name}</span>
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-16 grid gap-10 md:grid-cols-2" delay={0.12}>
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
            Certifications & Professional Development
          </h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((item) => (
              <li key={item.name} className="text-sm">
                <div className="font-medium text-ink">{item.name}</div>
                <div className="text-xs text-muted">
                  {item.org} ({item.year})
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
            Volunteering
          </h3>
          <ul className="mt-4 space-y-3">
            {volunteer.map((item) => (
              <li key={`${item.role}-${item.org}`} className="text-sm">
                <div className="font-medium text-ink">{item.role}</div>
                <div className="text-xs text-muted">
                  {item.org} ({item.year})
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
