import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { udriveDomains } from "../../data/cv";
import { easeOut } from "../../lib/motion";

export default function StageWork() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section id="work" className="stage-section" aria-labelledby="work-heading">
      <Reveal>
        <span className="stage-kicker">04 — Work</span>
        <h2 id="work-heading" className="stage-title max-w-3xl">
          Udrive experience —{" "}
          <span className="gradient-role">five CV sections</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
          Content below is taken from the Udrive experience section of the CV.
          Select a chapter for the full detail.
        </p>
      </Reveal>

      <div className="mt-12 space-y-0">
        {udriveDomains.map((item, index) => {
          const open = active === index;
          const panelId = `${baseId}-panel-${index}`;
          const tabId = `${baseId}-tab-${index}`;
          const beats: [string, string][] = [
            ["Ownership", item.ownership],
            ["What I built", item.built],
            ...(item.result
              ? ([["Result", item.result]] as [string, string][])
              : []),
          ];

          return (
            <article
              key={item.id}
              className={`relative border-t border-edge/70 transition-colors duration-300 ${
                open ? "border-accent2/40 bg-white/[0.015]" : "hover:bg-white/[0.01]"
              } ${index === udriveDomains.length - 1 ? "border-b" : ""}`}
            >
              {open && (
                <span
                  className="absolute bottom-0 left-0 top-0 w-0.5 bg-gradient-to-b from-accent2 via-accent to-transparent"
                  aria-hidden="true"
                />
              )}

              <h3>
                <button
                  type="button"
                  id={tabId}
                  aria-expanded={open}
                  aria-controls={open ? panelId : undefined}
                  onClick={() => setActive(index)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive((index + 1) % udriveDomains.length);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive(
                        (index - 1 + udriveDomains.length) %
                          udriveDomains.length,
                      );
                    }
                  }}
                  className="group flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-8"
                >
                  <span
                    className={`mt-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
                      open ? "text-accent2" : "text-muted"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-xl font-semibold tracking-tight transition-colors md:text-2xl ${
                        open ? "gradient-role" : "text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    {!open && (
                      <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted">
                        {item.ownership}
                      </span>
                    )}
                    {!open && (
                      <span className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                        {item.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-edge/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted/80"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 font-mono text-xs transition-colors ${
                      open ? "text-accent2" : "text-muted"
                    }`}
                    aria-hidden="true"
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>

              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={tabId}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: easeOut }}
                  className="pb-10 pl-9 md:pl-12"
                >
                  <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
                    <dl className="space-y-7">
                      {beats.map(([label, body], i) => (
                        <motion.div
                          key={label}
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: reduceMotion ? 0 : 0.04 * i,
                            ease: easeOut,
                          }}
                        >
                          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
                            {label}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-relaxed">
                            {body}
                          </dd>
                        </motion.div>
                      ))}
                    </dl>

                    <aside>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-edge bg-panel/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </aside>
                  </div>
                </motion.div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
