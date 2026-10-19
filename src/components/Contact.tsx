import { useState } from "react";
import Reveal from "./ui/Reveal";
import { profile } from "../data/cv";
import { ContactAtmosphere } from "./ui/SectionAtmosphere";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
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
    value: "github.com/buildwithsaman",
    href: profile.github,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <div className="surface relative isolate overflow-hidden rounded-2xl p-5 md:p-8">
          <ContactAtmosphere />
          <div className="relative z-10">
            <span className="eyebrow">05 · Contact</span>
            <h2
              id="contact-heading"
              className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl"
            >
              Let’s discuss the{" "}
              <span className="gradient-text">next opportunity</span>.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {profile.openTo}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-accent2 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent2"
              >
                Contact Me
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center rounded-xl border border-edge bg-panel/70 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/35"
              >
                {copied ? "Email copied" : "Copy email"}
              </button>
              <a
                href={profile.resume}
                download={profile.resumeName}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                Download CV
              </a>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between bg-panel px-4 py-3.5 transition-colors hover:bg-paper/80"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      {l.label}
                    </div>
                    <div className="mt-0.5 text-sm text-ink">{l.value}</div>
                  </div>
                  <span
                    className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
