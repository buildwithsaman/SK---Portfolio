import Reveal from "./ui/Reveal";
import { profile } from "../data/cv";
import DepthCard from "./ui/DepthCard";

const highlights = [
  {
    title: "End-to-end ownership",
    body: "Frontend architecture, AWS deployment, CI/CD, and RBAC — I take features from idea to production.",
  },
  {
    title: "Measurable impact",
    body: "~70% infrastructure cost reduction and a 30% lift in debt recovery through automation and smart migrations.",
  },
  {
    title: "Clean, performant code",
    body: "SOLID / DRY principles, TypeScript, code reviews, and automated testing to keep delivery reliable.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <Reveal>
        <span className="eyebrow">01 · About</span>
      </Reveal>
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <Reveal delay={0.05}>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Turning complex requirements into{" "}
            <span className="gradient-text">software people rely on</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {profile.summary}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {profile.focus}
          </p>
        </Reveal>

        <div className="space-y-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={0.1 + i * 0.08}>
              <DepthCard className="glass group rounded-2xl p-6">
                <div className="mb-2 font-mono text-xs text-accent">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {h.body}
                </p>
              </DepthCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
