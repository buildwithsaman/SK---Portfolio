import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  caseStudies,
  experiences,
  type CaseStudy,
  type ExperienceDomain,
} from "../data/cv";
import Reveal from "./ui/Reveal";
import DepthCard from "./ui/DepthCard";
import { ExperienceAtmosphere } from "./ui/SectionAtmosphere";

function ProjectVisual({ type }: { type: CaseStudy["type"] }) {
  if (type === "analytics") {
    return (
      <div
        className="relative flex h-full min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl border border-edge bg-[#0b1220] p-5"
        aria-hidden="true"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
          Impact
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="text-2xl font-semibold text-white">~70%</div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
              cost reduction
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="text-2xl font-semibold text-cyan-300">+30%</div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
              recovery lift
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "lifecycle") {
    return (
      <div
        className="relative flex h-full min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl border border-edge bg-panel p-5"
        aria-hidden="true"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent2">
          Delivery
        </div>
        <div className="mt-4 space-y-2">
          {["Figma", "Next.js", "EN / AR + RTL", "CloudFront"].map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl border border-edge/80 bg-paper/40 px-3 py-2"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 font-mono text-[10px] text-accent">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-ink">{step}</span>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl border border-edge bg-gradient-to-br from-accent/10 via-panel to-accent2/10 p-5"
      aria-hidden="true"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
        Operations platform
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["React", "Mapbox", "D3"].map((value) => (
          <div
            key={value}
            className="rounded-xl border border-edge/80 bg-panel/80 px-2.5 py-3 text-center"
          >
            <div className="font-mono text-xs font-semibold text-ink">
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-edge/80 bg-panel/70 p-3">
        <div className="text-xs text-muted">6 analytics · 10s map polling</div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-edge">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-accent2" />
        </div>
      </div>
    </div>
  );
}

function DomainAccordion({ domains }: { domains: ExperienceDomain[] }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(domains[0]?.id ?? null);

  return (
    <div className="mt-5 space-y-2">
      {domains.map((domain, index) => {
        const panelId = `${baseId}-panel-${domain.id}`;
        const buttonId = `${baseId}-button-${domain.id}`;
        const isOpen = openId === domain.id;

        return (
          <div
            key={domain.id}
            className="overflow-hidden rounded-xl border border-edge/80 bg-panel/60"
          >
            <h4>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : domain.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-panel/90"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm font-semibold text-ink">
                    {domain.title}
                  </span>
                </span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-edge text-sm text-muted"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-edge/70 px-4 py-4 text-sm leading-relaxed text-muted">
                    <p>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Problem —{" "}
                      </span>
                      {domain.problem}
                    </p>
                    <p>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Ownership —{" "}
                      </span>
                      {domain.ownership}
                    </p>
                    <p>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Built —{" "}
                      </span>
                      {domain.built}
                    </p>
                    <p>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Impact —{" "}
                      </span>
                      {domain.impact}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {domain.tech.map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const udrive = experiences.find((experience) => experience.domains?.length);

  return (
    <section
      id="experience"
      className="section-pad isolate"
      aria-labelledby="experience-heading"
    >
      <ExperienceAtmosphere />
      <Reveal>
        <span className="eyebrow">02 · Selected work</span>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <h2
            id="experience-heading"
            className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl"
          >
            Engineering work with{" "}
            <span className="gradient-text">demonstrable impact</span>.
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Production systems across platforms, applications, integrations, and
            automation.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
        {caseStudies.map((project, index) => (
          <Reveal key={project.number} delay={index * 0.05}>
            <DepthCard
              tilt={index === 0}
              className="surface rounded-2xl p-3 md:p-4"
            >
              <article className="grid items-stretch gap-5 lg:grid-cols-2">
                <div
                  className={`flex flex-col p-2 md:p-3 ${index % 2 ? "lg:order-2" : ""}`}
                >
                  <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/25 bg-accent/10">
                      {project.number}
                    </span>
                    {project.category}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {project.title}
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        Problem
                      </dt>
                      <dd className="mt-1 text-muted">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        Ownership
                      </dt>
                      <dd className="mt-1 text-muted">{project.ownership}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        Implementation
                      </dt>
                      <dd className="mt-1 text-muted">
                        {project.implementation}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-accent2/20 bg-accent2/5 px-3 py-2.5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent2">
                        Result
                      </dt>
                      <dd className="mt-1 text-sm text-ink/90">{project.result}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {project.impact.map((metric) => (
                      <div key={metric.label} className="metric-chip">
                        <div className="text-base font-semibold gradient-text">
                          {metric.value}
                        </div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-muted">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={index % 2 ? "lg:order-1" : ""}>
                  <ProjectVisual type={project.type} />
                </div>
              </article>
            </DepthCard>
          </Reveal>
        ))}
      </div>

      {udrive?.domains && (
        <Reveal className="mt-12 md:mt-14">
          <div className="mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Udrive · domains
            </span>
            <h3 className="mt-1.5 text-xl font-semibold text-ink md:text-2xl">
              Expandable ownership areas
            </h3>
          </div>
          <DomainAccordion domains={udrive.domains} />
        </Reveal>
      )}

      <Reveal className="mt-12 md:mt-14">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Career
            </span>
            <h3 className="mt-1.5 text-xl font-semibold text-ink md:text-2xl">
              Professional experience
            </h3>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted md:block">
            Dubai · 2023—Now
          </span>
        </div>
      </Reveal>
      <div className="grid gap-2.5 lg:grid-cols-3">
        {experiences.map((experience, index) => (
          <Reveal key={experience.company} delay={index * 0.04}>
            <article className="surface h-full rounded-2xl p-4 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-accent">
                  0{index + 1}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {experience.period}
                </span>
              </div>
              <h4 className="mt-4 text-base font-semibold leading-snug text-ink">
                {experience.company}
              </h4>
              <p className="mt-1 text-xs text-accent2">{experience.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {experience.summary}
              </p>
              {experience.recognition && (
                <div className="mt-4 border-t border-edge pt-3 text-xs leading-relaxed text-muted">
                  ★ {experience.recognition}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
