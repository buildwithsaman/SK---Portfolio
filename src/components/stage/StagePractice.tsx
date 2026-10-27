import Reveal from "../ui/Reveal";
import { profile, skillGroups } from "../../data/cv";

const practices = [
  {
    title: "Frontend architecture",
    kicker: "Production platforms",
    body: profile.summary[1],
    tools: skillGroups[0].items.slice(0, 4),
  },
  {
    title: "Systems beyond the UI",
    kicker: "Mobility, analytics, verification",
    body: profile.summary[3],
    tools: ["Python", "Apache Kafka", "AWS", "Apache Superset"],
  },
];

export default function StagePractice() {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16"
      aria-labelledby="practice-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 text-[clamp(4.5rem,18vw,14rem)] font-semibold leading-none tracking-[-0.06em] text-ink/[0.045]">
        WHAT I DO
      </div>

      <div className="relative z-[1] mx-auto max-w-[92rem]">
        <Reveal>
          <span className="stage-kicker">Practice</span>
          <h2 id="practice-heading" className="stage-title max-w-xl">
            What I <span className="gradient-role">do</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {practices.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="frame-card h-full p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
                  {String(index + 1).padStart(2, "0")} — {item.kicker}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {item.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-edge/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
