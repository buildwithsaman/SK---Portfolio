import Reveal from "../ui/Reveal";
import { certifications, profile, volunteer } from "../../data/cv";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Location",
    value: profile.locationFull,
    href: undefined as string | undefined,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
  },
  {
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
  },
];

export default function StageContact() {
  return (
    <section
      id="contact"
      className="stage-section pb-28"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <span className="stage-kicker">06 — Contact</span>
        <h2 id="contact-heading" className="stage-title max-w-3xl">
          Let&apos;s Build Something{" "}
          <span className="gradient-role">Meaningful</span>
        </h2>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted md:text-base">
          <p>{profile.contactIntro}</p>
          <p>{profile.contactSupport}</p>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={0.06}>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="cta-solid">
            Contact Me
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={0.1}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.label}>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "me noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-baseline justify-between gap-4 border-b border-edge/70 py-4 transition-colors hover:border-accent2/50"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-sm text-ink">
                      {c.value}
                    </span>
                  </span>
                  <span
                    className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent2"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <div className="border-b border-edge/70 py-4">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink">{c.value}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14" delay={0.12}>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
              Certifications & Professional Development
            </h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="text-sm">
                  <div className="font-medium text-ink">{c.name}</div>
                  <div className="text-xs text-muted">
                    {c.org} ({c.year})
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
              {volunteer.map((v) => (
                <li key={`${v.role}-${v.org}`} className="text-sm">
                  <div className="font-medium text-ink">{v.role}</div>
                  <div className="text-xs text-muted">
                    {v.org} ({v.year})
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
