import Reveal from "./ui/Reveal";
import { AboutAtmosphere } from "./ui/SectionAtmosphere";
import { howIWork, profile } from "../data/cv";

const highlights = [
  {
    title: "Production ownership",
    body: "Build and maintain production applications across internal platforms, customer-facing products, and operational tooling.",
  },
  {
    title: "Frontend strength, full delivery",
    body: "React, Next.js, and TypeScript depth — with Python/Kafka integrations, APIs, and AWS deployments.",
  },
  {
    title: "Verified impact",
    body: "~70% infrastructure cost reduction and 30% improved debt recovery through automation initiatives.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-pad isolate"
      aria-labelledby="about-heading"
    >
      <AboutAtmosphere />
      <Reveal>
        <span className="eyebrow">01 · About</span>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <Reveal delay={0.04}>
          <h2
            id="about-heading"
            className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl"
          >
            Software Developer building{" "}
            <span className="gradient-text">complete production systems</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="border-l-2 border-accent/40 pl-4">
            <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {profile.summary}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-2.5 md:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.title} delay={0.06 + i * 0.05}>
            <article className="surface h-full rounded-2xl p-4 transition-colors hover:border-accent/30 md:p-5">
              <div className="font-mono text-[10px] text-accent">
                0{i + 1}
              </div>
              <h3 className="mt-3 text-base font-semibold text-ink">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8" delay={0.1}>
        <div className="surface-muted rounded-2xl p-4 md:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                How I work
              </div>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                Engineering capabilities
              </h3>
            </div>
            <div className="hidden h-px flex-1 max-w-[12rem] bg-gradient-to-r from-accent/40 to-transparent sm:block" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {howIWork.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-edge/60 bg-panel/50 p-3 transition-colors hover:border-accent/25"
              >
                <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
