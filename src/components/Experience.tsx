import { experiences } from "../data/cv";
import Reveal from "./ui/Reveal";
import DepthCard from "./ui/DepthCard";

type Visual = "operations" | "analytics" | "lifecycle";

const caseStudies: {
  number: string;
  type: Visual;
  category: string;
  title: string;
  summary: string;
  contribution: string;
  impact: { value: string; label: string }[];
  tech: string[];
}[] = [
  {
    number: "01",
    type: "operations",
    category: "UdriveAdmin · Production platform",
    title: "Modernizing fleet operations.",
    summary:
      "The back-office platform operators use across fleet, customers, reservations, billing, claims, live maps, analytics, and administration.",
    contribution:
      "I migrated the frontend from CRACO to Vite 8, standardized server state on React Query 5, centralized API behavior, and introduced resilient, shareable UX patterns.",
    impact: [
      { value: "30%", label: "debt recovery lift" },
      { value: "Live", label: "operational visibility" },
    ],
    tech: ["React 19", "Vite 8", "React Query 5", "MUI 5", "MapLibre GL"],
  },
  {
    number: "02",
    type: "analytics",
    category: "Data infrastructure · Udrive",
    title: "Analytics without the cloud bill.",
    summary:
      "A secure migration to a self-hosted Apache Superset platform with reliable data pipelines and access controls.",
    contribution:
      "I migrated analytics to self-hosted Superset, designing the secure data pipelines and authentication layers behind the platform.",
    impact: [
      { value: "~70%", label: "infrastructure savings" },
      { value: "Secure", label: "self-hosted analytics" },
    ],
    tech: ["Superset", "Airflow", "AWS", "Nginx", "Cloudflare"],
  },
  {
    number: "03",
    type: "lifecycle",
    category: "SN Admin · Production platform",
    title: "From lead to active subscription.",
    summary:
      "An operational portal for leads, deals, customers, vehicles, subscriptions, invoices, products, roles, and release management.",
    contribution:
      "I built modular feature areas and the central deals pipeline, including filters, editing, preview workflows, WhatsApp quick messaging, and printable reporting.",
    impact: [
      { value: "5-stage", label: "sales pipeline" },
      { value: "End-to-end", label: "subscription operations" },
    ],
    tech: ["React 19", "React Router 7", "MUI", "D3", "MapLibre GL"],
  },
];

const careerNotes: Record<string, string> = {
  "Udrive – Rent-a-Car":
    "Building and modernizing two production admin products for car-sharing and subscription operations.",
  "Arata International FZC (Bahwan International Group)":
    "Built a React Native vehicle marketplace and supported .NET APIs, databases, and BI workflows during the internship.",
  "Dubai Technologies":
    "Created Python desktop interfaces and translated operational requirements into working software.",
};

function ProjectVisual({ type }: { type: Visual }) {
  if (type === "analytics") {
    const bars = [44, 70, 52, 88, 64, 94, 76];
    return (
      <div className="relative h-full min-h-[290px] overflow-hidden rounded-[1.4rem] border border-white/80 bg-slate-950 p-5 shadow-2xl shadow-slate-900/20">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
          <span>Analytics / Overview</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <div className="text-3xl font-semibold text-white">~70%</div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">cost reduction</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <div className="text-3xl font-semibold text-cyan-300">Secure</div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">self-hosted analytics</div>
          </div>
        </div>
        <div className="mt-4 flex h-28 items-end gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 pb-4 pt-6">
          {bars.map((height, index) => (
            <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-accent2 to-cyan-300" style={{ height: `${height}%`, opacity: 0.55 + index * 0.06 }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "lifecycle") {
    const steps = ["Lead", "Initial contact", "Qualified", "Deal won", "Deal lost"];
    return (
      <div className="relative flex h-full min-h-[290px] flex-col justify-center overflow-hidden rounded-[1.4rem] border border-white/80 bg-gradient-to-br from-white to-violet-50 p-6 shadow-2xl shadow-slate-900/10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent2/15 blur-3xl" />
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent2">Customer lifecycle</div>
        <div className="relative mt-5 space-y-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[10px] ${index === 3 ? "bg-accent2 text-white" : index === 4 ? "bg-rose-500 text-white" : "border border-accent2/20 bg-white text-accent2"}`}>
                {index + 1}
              </span>
              <div className="flex-1 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 shadow-sm">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  {step}
                  <span className={`font-mono text-[9px] ${index === 4 ? "text-rose-500" : "text-emerald-600"}`}>
                    {index === 3 ? "Won" : index === 4 ? "Lost" : "Stage"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[290px] overflow-hidden rounded-[1.4rem] border border-white/80 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-2xl shadow-slate-900/10">
      <div className="flex items-center gap-2">
        {["#ef4444", "#f59e0b", "#22c55e"].map((color) => (
          <span key={color} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        ))}
        <span className="ml-2 font-mono text-[9px] uppercase tracking-wider text-slate-400">Operations</span>
      </div>
      <div className="mt-5 grid grid-cols-[4rem_1fr] gap-3">
        <div className="space-y-2 rounded-xl bg-slate-900 p-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className={`h-7 rounded-lg ${item === 1 ? "bg-accent" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {["30%", "RBAC", "Live"].map((value) => (
              <div key={value} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="font-mono text-sm font-semibold text-slate-800">{value}</div>
                <div className="mt-1 h-1 w-8 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            {[72, 48, 84, 60].map((width, index) => (
              <div key={index} className="mb-3 flex items-center gap-3 last:mb-0">
                <span className="h-6 w-6 rounded-lg bg-accent/10" />
                <span className="h-1.5 rounded bg-slate-200" style={{ width: `${width}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-white/25" />
      <Reveal>
        <span className="eyebrow">02 · Selected work</span>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Products built around <span className="gradient-text">real outcomes</span>.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            A closer look at how I turn operational complexity into focused, dependable software.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 space-y-8">
        {caseStudies.map((project, index) => (
          <Reveal key={project.number} delay={index * 0.06}>
            <DepthCard className="glass rounded-[2rem] p-3 md:p-5">
              <article className={`grid items-stretch gap-7 lg:grid-cols-2 ${index % 2 ? "" : ""}`}>
                <div className={`flex flex-col p-4 md:p-6 ${index % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/20 bg-accent/[0.06]">{project.number}</span>
                    {project.category}
                  </div>
                  <h3 className="mt-7 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{project.title}</h3>
                  <p className="mt-4 leading-relaxed text-slate-600">{project.summary}</p>
                  <div className="mt-5 border-l-2 border-accent2/30 pl-4 text-sm leading-relaxed text-slate-500">{project.contribution}</div>
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {project.impact.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3">
                        <div className="text-lg font-semibold gradient-text">{metric.value}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-slate-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full bg-slate-900/[0.05] px-3 py-1 font-mono text-[10px] text-slate-600">{tech}</span>
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

      <Reveal className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Career timeline</span>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">The path behind the work.</h3>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-slate-400 md:block">Dubai · 2023—Now</span>
        </div>
      </Reveal>
      <div className="grid gap-4 lg:grid-cols-3">
        {experiences.map((experience, index) => (
          <Reveal key={experience.company} delay={index * 0.06}>
            <DepthCard className="glass h-full rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <span className="font-mono text-[10px] text-slate-400">{experience.period}</span>
              </div>
              <h4 className="mt-8 text-lg font-semibold leading-snug text-slate-900">{experience.company}</h4>
              <p className="mt-1 text-xs text-accent2">{experience.role}</p>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">{careerNotes[experience.company]}</p>
              {experience.recognition && (
                <div className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">★ {experience.recognition}</div>
              )}
            </DepthCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
