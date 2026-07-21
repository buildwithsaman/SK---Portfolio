import { useState } from "react";
import Reveal from "./ui/Reveal";
import { profile } from "../data/cv";

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
    <section id="contact" className="section-pad">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent2/20 blur-3xl" />

          <span className="eyebrow">05 · Contact</span>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Have a problem <span className="gradient-text">worth solving</span>?
          </h2>
          <p className="mt-4 max-w-lg text-slate-600">
            I'm based in {profile.location} and open to full-stack roles and
            collaborations. The fastest way to reach me is email.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03]"
            >
              Say hello →
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-6 py-3 font-medium text-slate-700 backdrop-blur transition-colors hover:border-accent/30 hover:bg-white"
            >
              {copied ? "Copied!" : "Copy email"}
              <span aria-hidden="true">{copied ? "✓" : "⌘"}</span>
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-slate-50"
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-accent">
                    {l.label}
                  </div>
                  <div className="mt-1 text-sm text-slate-700">{l.value}</div>
                </div>
                <span className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
