import { useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

type OrbitTechnology = {
  name: string;
  label: string;
  category: Category;
  ring: 1 | 2 | 3;
  angle: number;
};

const orbitTechnologies: OrbitTechnology[] = [
  { name: "React 19", label: "React", category: "Frontend", ring: 1, angle: 12 },
  { name: "TypeScript", label: "TypeScript", category: "Frontend", ring: 1, angle: 132 },
  { name: "RESTful API design", label: "REST", category: "Backend & APIs", ring: 1, angle: 252 },
  { name: "AWS (EC2, Route 53, CloudWatch)", label: "AWS", category: "Cloud & DevOps", ring: 2, angle: 15 },
  { name: "Apache Kafka", label: "Kafka", category: "Data, Maps & Monitoring", ring: 2, angle: 75 },
  { name: "MUI 5/6", label: "MUI", category: "Frontend", ring: 2, angle: 135 },
  { name: "Nginx", label: "Nginx", category: "Cloud & DevOps", ring: 2, angle: 195 },
  { name: "D3", label: "D3", category: "Data, Maps & Monitoring", ring: 2, angle: 255 },
  { name: "OAuth2", label: "OAuth2", category: "Backend & APIs", ring: 2, angle: 315 },
  { name: "Apache Airflow", label: "Airflow", category: "Data, Maps & Monitoring", ring: 3, angle: 8 },
  { name: "Apache Superset", label: "Superset", category: "Data, Maps & Monitoring", ring: 3, angle: 53 },
  { name: "React Native (Expo)", label: "React Native", category: "Mobile", ring: 3, angle: 98 },
  { name: "Vite 8", label: "Vite", category: "Cloud & DevOps", ring: 3, angle: 143 },
  { name: "Mapbox GL / MapLibre GL", label: "MapLibre", category: "Data, Maps & Monitoring", ring: 3, angle: 188 },
  { name: "Python (Tkinter, PyQt, scripting)", label: "Python", category: "Languages & Tools", ring: 3, angle: 233 },
  { name: "Cloudflare", label: "Cloudflare", category: "Cloud & DevOps", ring: 3, angle: 278 },
  { name: "TanStack React Query 5", label: "React Query", category: "Frontend", ring: 3, angle: 323 },
];

const ringDuration = { 1: 18, 2: 29, 3: 42 };

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

function TechnologyOrbit({
  activeCategory,
  onCategoryChange,
  onHoverCategory,
}: {
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  onHoverCategory: (category: Category | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [hoveredTechnology, setHoveredTechnology] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const groupedRings = useMemo(
    () => [1, 2, 3].map((ring) => orbitTechnologies.filter((tech) => tech.ring === ring)),
    [],
  );

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -7,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 9,
    });
  };

  const focusedCategory = hoveredTechnology
    ? orbitTechnologies.find((tech) => tech.name === hoveredTechnology)?.category ?? null
    : activeCategory;

  return (
    <div
      className="skills-orbit-stage relative min-h-[460px] overflow-hidden rounded-[2rem] sm:min-h-[560px] lg:min-h-[720px]"
      onMouseMove={handlePointerMove}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHoveredTechnology(null);
        onHoverCategory(null);
      }}
      aria-label="Interactive technology orbit"
    >
      <div className="skills-orbit-grid absolute inset-0" />
      <motion.div
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-[90px]"
        animate={reduceMotion ? undefined : { x: [0, 32, -8, 0], y: [0, 20, -15, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]"
        animate={reduceMotion ? undefined : { x: [0, -34, 8, 0], y: [0, -20, 16, 0], scale: [1, 0.94, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-6 top-6 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-2 text-violet-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
          Technology system
        </span>
        <span className="hidden text-slate-400 sm:block">Move · hover · select</span>
      </div>

      <motion.div
        className={`skills-orbit-sphere absolute left-1/2 top-1/2 h-[24rem] w-[24rem] sm:h-[31rem] sm:w-[31rem] xl:h-[37rem] xl:w-[37rem] ${hoveredTechnology ? "is-paused" : ""}`}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hoveredTechnology ? 1.015 : 1 }}
        transition={{ type: "spring", stiffness: 85, damping: 18, mass: 0.7 }}
        style={{ x: "-50%", y: "-50%", transformPerspective: 1000 }}
      >
        <svg className="pointer-events-none absolute inset-[12%] h-[76%] w-[76%] opacity-60" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="skillLine" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#7c3aed" stopOpacity=".45" />
              <stop offset="1" stopColor="#06b6d4" stopOpacity=".12" />
            </linearGradient>
          </defs>
          {orbitTechnologies.slice(0, 11).map((tech, index) => {
            const radius = tech.ring === 1 ? 18 : tech.ring === 2 ? 29 : 39;
            const angle = (tech.angle * Math.PI) / 180;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            return <line key={tech.name} x1="50" y1="50" x2={x} y2={y} stroke="url(#skillLine)" strokeWidth=".22" strokeDasharray={`${2 + (index % 3)} 3`} />;
          })}
        </svg>

        {groupedRings.map((technologies, ringIndex) => {
          const ring = (ringIndex + 1) as 1 | 2 | 3;
          return (
            <div
              key={ring}
              className={`skills-orbit-ring skills-orbit-ring-${ring} absolute left-1/2 top-1/2 rounded-full border ${ring === 2 ? "border-dashed" : ""}`}
              style={{ "--orbit-duration": `${ringDuration[ring]}s` } as React.CSSProperties}
            >
              {technologies.map((tech) => {
                const meta = categoryMeta[tech.category];
                const dimmed = Boolean(focusedCategory && focusedCategory !== tech.category);
                const highlighted = focusedCategory === tech.category;
                return (
                  <div
                    key={tech.name}
                    className="skills-orbit-node absolute left-1/2 top-1/2"
                    style={{ "--orbit-angle": `${tech.angle}deg` } as React.CSSProperties}
                  >
                    <motion.button
                      type="button"
                      className={`skills-orbit-pill group relative flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border bg-white/75 px-3 py-2 text-[11px] font-medium text-slate-700 shadow-[0_8px_24px_-14px_rgba(15,23,42,.45)] backdrop-blur-xl transition-[opacity,border-color,box-shadow] sm:text-xs ${dimmed ? "opacity-25" : "opacity-100"}`}
                      style={{
                        "--pill-glow": meta.color,
                        borderColor: highlighted ? `${meta.color}70` : "rgba(255,255,255,.82)",
                        boxShadow: highlighted ? `0 12px 34px -14px ${meta.color}` : undefined,
                      } as React.CSSProperties}
                      onMouseEnter={() => {
                        setHoveredTechnology(tech.name);
                        onHoverCategory(tech.category);
                      }}
                      onMouseLeave={() => {
                        setHoveredTechnology(null);
                        onHoverCategory(null);
                      }}
                      onFocus={() => {
                        setHoveredTechnology(tech.name);
                        onHoverCategory(tech.category);
                      }}
                      onBlur={() => {
                        setHoveredTechnology(null);
                        onHoverCategory(null);
                      }}
                      onClick={() => onCategoryChange(activeCategory === tech.category ? null : tech.category)}
                      whileHover={{ y: -4, scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`${tech.name}, ${tech.category}`}
                    >
                      <span className="h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]" style={{ color: meta.color, backgroundColor: meta.color }} />
                      {tech.label}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          );
        })}

        <motion.button
          type="button"
          onClick={() => onCategoryChange(activeCategory === "Backend & APIs" ? null : "Backend & APIs")}
          className="skills-core absolute left-1/2 top-1/2 z-20 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-white/70 text-center shadow-[0_22px_70px_-22px_rgba(79,70,229,.7)] backdrop-blur-2xl sm:h-36 sm:w-36"
          animate={reduceMotion ? undefined : { boxShadow: ["0 22px 70px -22px rgba(79,70,229,.45)", "0 26px 85px -18px rgba(6,182,212,.62)", "0 22px 70px -22px rgba(79,70,229,.45)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06 }}
        >
          <span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">Core runtime</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Node.js</span>
            <span className="mt-1 block text-[9px] text-cyan-600">API · services</span>
          </span>
        </motion.button>
      </motion.div>

      <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between border-t border-white/60 pt-4 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400">
        <span>{orbitTechnologies.length + 1} connected tools</span>
        <button type="button" className="pointer-events-auto transition-colors hover:text-violet-600" onClick={() => onCategoryChange(null)}>
          {activeCategory ? "Clear focus" : "Select a category"}
        </button>
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
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={mobile ? undefined : { y: -6 }}
      className={`skills-category-card group relative w-full overflow-hidden rounded-[1.35rem] border p-4 text-left transition-[border-color,box-shadow,background] duration-300 sm:p-5 ${active ? "is-active" : ""}`}
      style={{ "--category-color": meta.color, "--category-color-2": meta.color2 } as React.CSSProperties}
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
          <span className="block text-sm font-semibold tracking-tight text-slate-900">{group.category}</span>
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">{meta.description}</span>
        </span>
        <span className="grid h-8 min-w-8 place-items-center rounded-full border border-slate-200/80 bg-white/60 px-2 font-mono text-[9px] text-slate-500">
          {String(group.items.length).padStart(2, "0")}
        </span>
        {mobile && (
          <motion.span animate={{ rotate: expanded ? 45 : 0 }} className="ml-1 text-xl font-light text-slate-400" aria-hidden="true">+</motion.span>
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
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
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
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<Category | null>("Frontend");
  const categoryOrder: Category[] = [
    "Frontend",
    "Backend & APIs",
    "Cloud & DevOps",
    "Mobile",
    "Data, Maps & Monitoring",
    "Languages & Tools",
  ];
  const orderedGroups = categoryOrder.map(
    (category) => skillGroups.find((group) => group.category === category)!,
  );

  const selectCategory = (category: Category) => {
    setActiveCategory((current) => (current === category ? null : category));
    if (mobile) setExpandedCategory((current) => (current === category ? null : category));
  };

  return (
    <section id="skills" className="skills-showcase relative isolate overflow-hidden bg-[#F8FAFC] py-24 md:py-32">
      <div className="skills-section-grid pointer-events-none absolute inset-0 -z-20" />
      <div className="skills-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />
      <motion.div
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-violet-400/15 blur-[110px]"
        animate={{ y: [0, -35, 10, 0], x: [0, 25, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-28 bottom-28 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-300/15 blur-[120px]"
        animate={{ y: [0, 28, -12, 0], x: [0, -18, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <span className="eyebrow">03 · Skills</span>
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 md:text-6xl">
            Tools chosen for the <span className="skills-animated-gradient">problem.</span>
            <span className="block text-slate-500">Not the trend.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Every technology is selected based on performance, scalability, and long-term maintainability.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7 lg:sticky lg:top-24">
            <TechnologyOrbit
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onHoverCategory={setHoveredCategory}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {orderedGroups.map((group, index) => (
              <SkillCard
                key={group.category}
                group={group}
                index={index}
                mobile={mobile}
                active={(hoveredCategory ?? activeCategory) === group.category}
                expanded={expandedCategory === group.category}
                onSelect={() => selectCategory(group.category)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
