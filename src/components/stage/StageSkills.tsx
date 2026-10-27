import Reveal from "../ui/Reveal";
import { skillGroups } from "../../data/cv";

const featured = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Python",
  "AWS",
  "D3.js",
];

export default function StageSkills() {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <span className="stage-kicker">05 — Technical Skills</span>
        <h2 id="skills-heading" className="stage-title max-w-2xl">
          Tech <span className="gradient-role">stack</span>
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="mt-12 flex flex-wrap gap-3 sm:gap-4">
          {featured.map((item) => (
            <li
              key={item}
              className="rounded-full border border-edge bg-white/[0.03] px-5 py-2.5 text-sm font-medium tracking-tight text-ink sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={0.04 * index}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
              {String(index + 1).padStart(2, "0")} — {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted after:ml-2 after:text-edge after:content-['/'] last:after:content-none"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
