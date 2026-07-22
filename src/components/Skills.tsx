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
    description: "Responsive interfaces, state, routing, and design systems.",
    color: "#7c3aed",
    color2: "#a855f7",
    symbol: "◫",
  },
  "Backend & APIs": {
    description: "Secure services, integrations, and dependable API contracts.",
    color: "#4f46e5",
    color2: "#6366f1",
    symbol: "⌁",
  },
  "Cloud & DevOps": {
    description: "Cloud delivery, automation, observability, and edge tooling.",
    color: "#2563eb",
    color2: "#3b82f6",
    symbol: "△",
  },
  Mobile: {
    description: "Cross-platform mobile experiences and native foundations.",
    color: "#0891b2",
    color2: "#06b6d4",
    symbol: "▯",
  },
  "Data, Maps & Monitoring": {
    description: "Streaming data, analytics, mapping, and operational insight.",
    color: "#06b6d4",
    color2: "#22d3ee",
    symbol: "⌗",
  },
  "Languages & Tools": {
    description: "Languages and collaboration tools that support delivery.",
    color: "#5b5bd6",
    color2: "#8b5cf6",
    symbol: "{ }",
  },
};

const stackLayers: {
  label: string;
  description: string;
  category: Category;
  technologies: string[];
}[] = [
  {
    label: "Product interface",
    description: "Fast, accessible application experiences.",
    category: "Frontend",
    technologies: ["React 19", "TypeScript", "React Query", "MUI", "Vite"],
  },
  {
    label: "Services & security",
    description: "Clear contracts and protected application flows.",
    category: "Backend & APIs",
    technologies: ["Node.js", "REST APIs", "JWT", "OAuth2", ".NET"],
  },
  {
    label: "Cloud delivery",
    description: "Reliable infrastructure and automated releases.",
    category: "Cloud & DevOps",
    technologies: ["AWS", "Nginx", "Cloudflare", "GitHub Actions"],
  },
  {
    label: "Data & insight",
    description: "Operational data, analytics, and mapping.",
    category: "Data, Maps & Monitoring",
    technologies: ["Kafka", "Airflow", "Superset", "D3", "MapLibre"],
  },
];

function CategoryIcon({ category }: { category: Category }) {
  const meta = categoryMeta[category];
  return (
    <span
      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/80 text-[13px] font-semibold text-white shadow-lg"
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

function TechnologyStack({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
}) {
  return (
    <div
      className="relative p-5 sm:p-7 lg:p-8"
      aria-label="Technology stack overview"
    >
      <div className="skills-stack-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-violet-400/15 blur-[90px]" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-cyan-300/15 blur-[90px]" />

      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-2 text-violet-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Technology stack
        </span>
        <span className="text-slate-400">Stable overview</span>
      </div>

      <button
        type="button"
        onClick={() =>
          onCategoryChange(
            activeCategory === "Backend & APIs" ? null : "Backend & APIs",
          )
        }
        className={`relative z-10 mt-7 flex w-full items-center gap-4 border-y px-1 py-5 text-left transition-colors sm:px-2 ${
          activeCategory === "Backend & APIs"
            ? "border-indigo-200 bg-indigo-50/45"
            : "border-white/80 hover:bg-white/35"
        }`}
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 font-mono text-lg font-semibold text-white shadow-lg shadow-indigo-500/20">
          N
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-indigo-500">
            Core runtime
          </span>
          <span className="mt-1 block text-xl font-semibold tracking-tight text-slate-950">
            Node.js
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-slate-500">
            The service layer connecting product interfaces, APIs, and
            infrastructure.
          </span>
        </span>
        <span className="hidden rounded-full border border-indigo-100 bg-white/70 px-3 py-1 font-mono text-[9px] text-indigo-500 sm:block">
          Full stack
        </span>
      </button>

      <div className="relative z-10 mt-4 space-y-3">
        {stackLayers.map((layer, index) => {
          const meta = categoryMeta[layer.category];
          const active = activeCategory === layer.category;
          return (
            <button
              type="button"
              key={layer.label}
              onClick={() => onCategoryChange(active ? null : layer.category)}
              className={`skills-stack-layer grid w-full gap-4 border-t px-1 py-4 text-left first:border-t-0 sm:grid-cols-[10rem_1fr] sm:items-center sm:px-2 ${active ? "is-active" : ""}`}
              style={{ "--layer-color": meta.color } as CSSProperties}
            >
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="font-mono text-[9px] text-slate-400">
                    0{index + 1}
                  </span>
                  {layer.label}
                </span>
                <span className="mt-1 block text-[10px] leading-relaxed text-slate-500">
                  {layer.description}
                </span>
              </span>
              <span className="flex flex-wrap gap-1.5">
                {layer.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="skills-stack-pill inline-flex items-center gap-1.5 rounded-full border border-white bg-white/75 px-2.5 py-1.5 text-[10px] text-slate-600 shadow-sm"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    {technology}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/70 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400">
        <span>20 signature tools</span>
        {activeCategory ? (
          <button
            type="button"
            className="transition-colors hover:text-violet-600"
            onClick={() => onCategoryChange(null)}
          >
            Clear focus
          </button>
        ) : (
          <span>Select a layer</span>
        )}
      </div>
    </div>
  );
}

function SkillCard({
  group,
  index,
  active,
  expanded,
  mobile,
  onSelect,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  active: boolean;
  expanded: boolean;
  mobile: boolean;
  onSelect: () => void;
}) {
  const meta = categoryMeta[group.category];
  const cardId = `skills-card-${index}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`skills-category-row group relative w-full overflow-hidden border-b border-slate-200/60 p-5 text-left transition-colors duration-200 last:border-b-0 sm:p-6 ${active ? "is-active" : ""}`}
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
        onClick={onSelect}
        aria-expanded={mobile ? expanded : undefined}
        aria-controls={mobile ? cardId : undefined}
      >
        <CategoryIcon category={group.category} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold tracking-tight text-slate-900">
            {group.category}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
            {meta.description}
          </span>
        </span>
        <span className="grid h-8 min-w-8 place-items-center rounded-full border border-slate-200/80 bg-white/60 px-2 font-mono text-[9px] text-slate-500">
          {String(group.items.length).padStart(2, "0")}
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
          >
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-200/60 pt-4">
              {group.items.map((item, itemIndex) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mobile ? itemIndex * 0.025 : 0 }}
                  className="skills-tech-pill inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/65 px-2.5 py-1.5 text-[10px] leading-tight text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:text-slate-900"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: meta.color }}
                  />
                  {item}
                </motion.span>
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
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(
    "Frontend",
  );
  const categoryOrder: Category[] = [
    "Frontend",
    "Backend & APIs",
    "Cloud & DevOps",
    "Mobile",
    "Data, Maps & Monitoring",
    "Languages & Tools",
  ];
  const orderedGroups = categoryOrder.map((category) =>
    skillGroups.find((group) => group.category === category)!,
  );

  const selectCategory = (category: Category) => {
    setActiveCategory((current) => (current === category ? null : category));
    if (mobile)
      setExpandedCategory((current) =>
        current === category ? null : category,
      );
  };

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
            Every technology is selected based on performance, scalability, and
            long-term maintainability.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="skills-unified-panel overflow-hidden rounded-[2rem]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <TechnologyStack
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              <div className="grid grid-cols-1 border-t border-slate-200/60 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:border-l lg:border-t-0">
                {orderedGroups.map((group, index) => (
                  <SkillCard
                    key={group.category}
                    group={group}
                    index={index}
                    mobile={mobile}
                    active={activeCategory === group.category}
                    expanded={expandedCategory === group.category}
                    onSelect={() => selectCategory(group.category)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
