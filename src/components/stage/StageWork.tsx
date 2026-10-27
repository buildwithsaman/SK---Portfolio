import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { udriveDomains, type ExperienceDomain } from "../../data/cv";
import { easeOut } from "../../lib/motion";

const figures: Record<string, { value: string; label: string }[]> = {
  "operations-analytics": [
    { value: "6", label: "analytics areas" },
    { value: "10s", label: "driver map polling" },
  ],
  "subscription-crm": [
    { value: "CRM", label: "lead-to-fleet workflows" },
    { value: "Vite", label: "CRA → Vite migration" },
  ],
  "website-apps": [
    { value: "~20", label: "website routes" },
    { value: "EN / AR", label: "RTL locales" },
  ],
  "kyc-backend": [
    { value: "KYC", label: "document pipeline" },
    { value: "Kafka", label: "event processing" },
  ],
  "automation-tools": [
    { value: "~70%", label: "infra cost reduction" },
    { value: "30%", label: "debt recovery" },
  ],
};

export default function StageWork() {
  const [active, setActive] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16"
      aria-labelledby="work-heading"
    >
      <Reveal>
        <span className="stage-kicker">04 — Selected Work</span>
        <h2 id="work-heading" className="stage-title max-w-3xl">
          My <span className="gradient-role">Work</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
          Engineering contributions across Udrive&apos;s mobility technology
          ecosystem.
        </p>
      </Reveal>

      <ol className="mt-16 divide-y divide-edge/70 border-y border-edge/70">
        {udriveDomains.map((item, index) => {
          const open = active === index;
          const panelId = `${baseId}-panel-${item.id}`;
          const stats = figures[item.id] ?? [];
          const flip = index % 2 === 1;

          return (
            <li key={item.id}>
              <article
                className={`grid gap-6 py-10 md:grid-cols-[8rem_1fr] md:items-start lg:grid-cols-[10rem_minmax(0,1fr)_14rem] ${
                  flip
                    ? "lg:[grid-template-columns:14rem_minmax(0,1fr)_10rem]"
                    : ""
                }`}
              >
                <p
                  className={`chapter-num text-5xl md:text-6xl ${
                    flip ? "lg:order-3 lg:text-right" : ""
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className={flip ? "lg:order-2" : ""}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActive(open ? null : index)}
                    className="w-full text-left"
                  >
                    <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent2">
                      {item.role}
                    </p>
                  </button>

                  <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                    {stats.map((stat) => (
                      <li key={stat.label}>
                        <span className="block text-2xl font-semibold tracking-tight text-ink">
                          {stat.value}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          {stat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p
                  className={`hidden text-sm leading-relaxed text-muted lg:block ${
                    flip ? "lg:order-1" : ""
                  }`}
                >
                  {item.focus}
                </p>
              </article>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <WorkDetail item={item} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function WorkDetail({ item }: { item: ExperienceDomain }) {
  return (
    <div className="grid gap-8 pb-12 md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr_14rem]">
      <div className="hidden md:block" />
      <div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {item.ownership}
        </p>
        <h4 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
          Key contributions
        </h4>
        <ul className="mt-3 max-w-2xl space-y-2.5">
          {item.contributions.map((point) => (
            <li
              key={point.slice(0, 48)}
              className="border-l border-edge pl-3 text-sm leading-relaxed text-muted"
            >
              {point}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-edge/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
