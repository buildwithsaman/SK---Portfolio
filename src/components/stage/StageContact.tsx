import { useState } from "react";
import Reveal from "../ui/Reveal";
import { certifications, profile, volunteer } from "../../data/cv";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "in/saman-shakil-khan",
    href: profile.linkedin,
  },
  {
    label: "GitHub",
    value: "buildwithsaman",
    href: profile.github,
  },
];

export default function StageContact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="stage-section pb-28"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <span className="stage-kicker">06 — Contact</span>
        <h2 id="contact-heading" className="stage-title max-w-2xl">
          Contact{" "}
          <span className="gradient-role">{profile.name}</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {profile.location} · {profile.email} · {profile.phone}
        </p>
      </Reveal>

      <Reveal className="mt-10" delay={0.06}>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="cta-solid">
            Contact Me
          </a>
          <button type="button" onClick={copyEmail} className="cta-ghost">
            {copied ? "Email copied" : "Copy email"}
          </button>
          <a
            href={profile.resume}
            download={profile.resumeName}
            className="inline-flex items-center px-4 py-3 text-sm text-muted transition-colors hover:text-accent2"
          >
            Download CV
          </a>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={0.1}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group flex items-baseline justify-between gap-4 border-b border-edge/70 py-4 transition-colors hover:border-accent2/50"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink">{c.value}</span>
                </span>
                <span
                  className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent2"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14" delay={0.12}>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
              Certifications
            </h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="text-sm">
                  <div className="font-medium text-ink">{c.name}</div>
                  <div className="text-xs text-muted">
                    {c.org} · {c.year}
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
                <li key={v.role} className="text-sm">
                  <div className="font-medium text-ink">{v.role}</div>
                  <div className="text-xs text-muted">
                    {v.org} · {v.year}
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
