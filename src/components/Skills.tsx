import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { skillGroups } from "../data/cv";
import useMediaQuery from "../hooks/useMediaQuery";

type Category = (typeof skillGroups)[number]["category"];

const categoryMeta: Record<
  Category,
  { description: string; color: string; color2: string; symbol: string }
> = {
  Frontend: {
    description: "Interfaces, state management, design systems, and builds.",
    color: "#7c3aed",
    color2: "#a855f7",
    symbol: "◫",
  },
  "Backend & APIs": {
    description: "Service runtimes, API contracts, and application security.",
    color: "#4f46e5",
    color2: "#6366f1",
    symbol: "⌁",
  },
  "Cloud & DevOps": {
    description: "Cloud infrastructure, delivery automation, and edge tooling.",
    color: "#2563eb",
    color2: "#3b82f6",
    symbol: "△",
  },
  Mobile: {
    description: "Cross-platform applications and native Android foundations.",
    color: "#0891b2",
    color2: "#06b6d4",
    symbol: "▯",
  },
  "Data, Maps & Monitoring": {
    description: "Data pipelines, analytics, mapping, and persistence.",
    color: "#06b6d4",
    color2: "#22d3ee",
    symbol: "⌗",
  },
  "Languages & Tools": {
    description: "Programming, collaboration, and creative delivery tools.",
    color: "#5b5bd6",
    color2: "#8b5cf6",
    symbol: "{ }",
  },
};

function CategoryIcon({ category }: { category: Category }) {
  const meta = categoryMeta[category];

  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/80 text-[13px] font-semibold text-white shadow-lg"
      style={{
        background: `linear-gradient(145deg, ${meta.color}, ${meta.color2})`,
        boxShadow: `0 12px 28px -14px ${meta.color}`,
      }}
      aria-hidden="true"
    >
      {meta.symbol}
    </span>
  );
}

function SkillCategoryCard({
  group,
  index,
  mobile,
  expanded,
  onToggle,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  mobile: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const meta = categoryMeta[group.category];
  const itemCount = group.subgroups.reduce(
    (total, subgroup) => total + subgroup.items.length,
    0,
  );
  const cardId = `skills-category-${index}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.48,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="skills-category-row group relative overflow-hidden rounded-2xl border border-white/80 bg-white/45 p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-6"
      style={
        {
          "--category-color": meta.color,
          "--category-color-2": meta.color2,
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="relative z-10 flex w-full items-center gap-3 text-left"
        onClick={onToggle}
        aria-expanded={mobile ? expanded : true}
        aria-controls={cardId}
      >
        <CategoryIcon category={group.category} />
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold tracking-tight text-slate-900">
            {group.category}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
            {meta.description}
          </span>
        </span>
        <span className="grid h-8 min-w-8 place-items-center rounded-full border border-slate-200/80 bg-white/70 px-2 font-mono text-[9px] text-slate-500">
          {String(itemCount).padStart(2, "0")}
        </span>
        {mobile && (
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            className="ml-1 text-xl font-light text-slate-400"
            aria-hidden="true"
          >
            +
          </motion.span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {(!mobile || expanded) && (
          <motion.div
            id={cardId}
            initial={mobile ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-slate-200/60 pt-5">
              {group.subgroups.map((subgroup) => (
                <div
                  key={subgroup.label}
                  className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                >
                  <span
                    className="pt-1 font-mono text-[9px] uppercase tracking-[0.17em]"
                    style={{ color: meta.color }}
                  >
                    {subgroup.label}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {subgroup.items.map((item) => (
                      <span
                        key={item}
                        className="skills-tech-pill inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/75 px-2.5 py-1.5 text-[10px] leading-tight text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:text-slate-900"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: meta.color }}
                        />
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
}

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
      className="skills-showcase relative isolate overflow-hidden bg-[#F8FAFC] py-24 md:py-32"
    >
      <div className="skills-section-grid pointer-events-none absolute inset-0 -z-20" />
      <div className="skills-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-violet-400/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 bottom-28 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-300/15 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <span className="eyebrow">03 · Skills</span>
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 md:text-6xl">
            Tools chosen for the{" "}
            <span className="skills-animated-gradient">problem.</span>
            <span className="block text-slate-500">Not the trend.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            A clear hierarchy of capabilities, with every technology assigned
            to one focused area.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="skills-unified-panel overflow-hidden rounded-[2rem] p-4 sm:p-6 lg:p-8">
            <div className="relative z-10 mb-6 flex flex-col gap-2 border-b border-white/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-violet-600">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Technology stack
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                {skillGroups.length} categories · {totalTools} tools
              </span>
            </div>

            <div className="relative z-10 grid gap-4 lg:grid-cols-2">
              {skillGroups.map((group, index) => (
                <SkillCategoryCard
                  key={group.category}
                  group={group}
                  index={index}
                  mobile={mobile}
                  expanded={expandedCategory === group.category}
                  onToggle={() => {
                    if (mobile) {
                      setExpandedCategory((current) =>
                        current === group.category ? null : group.category,
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
