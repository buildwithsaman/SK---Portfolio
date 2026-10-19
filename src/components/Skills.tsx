import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { skillGroups } from "../data/cv";
import useMediaQuery from "../hooks/useMediaQuery";

type Category = (typeof skillGroups)[number]["category"];

export default function Skills() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(
    "Frontend",
  );

  const totalTools = skillGroups.reduce(
    (total, group) =>
      total +
      group.subgroups.reduce(
        (groupTotal, subgroup) => groupTotal + subgroup.items.length,
        0,
      ),
    0,
  );

  return (
    <section
      id="skills"
      className="section-pad isolate"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <span className="eyebrow">03 · Skills</span>
        <h2
          id="skills-heading"
          className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl"
        >
          A production-ready{" "}
          <span className="gradient-text">technology stack</span>.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
          Frontend strength with backend integrations, data systems, and
          infrastructure — organized for quick scanning.
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Stack
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {skillGroups.length} categories · {totalTools} tools
          </span>
        </div>

        <div className="grid gap-2.5 lg:grid-cols-2">
          {skillGroups.map((group, index) => {
            const cardId = `skills-category-${index}`;
            const expanded =
              !mobile || expandedCategory === group.category;
            const itemCount = group.subgroups.reduce(
              (n, s) => n + s.items.length,
              0,
            );

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                className="skills-category-row surface relative overflow-hidden rounded-2xl p-4"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => {
                    if (mobile) {
                      setExpandedCategory((current) =>
                        current === group.category ? null : group.category,
                      );
                    }
                  }}
                  aria-expanded={expanded}
                  aria-controls={cardId}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-[11px] font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">
                      {group.category}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted">
                      {group.subgroups[0]?.items.slice(0, 3).join(" · ")}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {String(itemCount).padStart(2, "0")}
                  </span>
                  {mobile && (
                    <span className="text-lg text-muted" aria-hidden="true">
                      {expanded ? "−" : "+"}
                    </span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={cardId}
                      initial={mobile ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 border-t border-edge/70 pt-4">
                        {group.subgroups.map((subgroup) => (
                          <div
                            key={subgroup.label}
                            className="grid gap-2 sm:grid-cols-[5.5rem_1fr]"
                          >
                            <span className="pt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                              {subgroup.label}
                            </span>
                            <span className="flex flex-wrap gap-1.5">
                              {subgroup.items.map((item) => (
                                <span key={item} className="tech-pill">
                                  {item}
                                </span>
                              ))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
