import { profile } from "../../data/cv";
import Reveal from "../ui/Reveal";

export default function StagePractice() {
  return (
    <section
      id="highlights"
      className="py-10 lg:py-14"
      aria-labelledby="practice-heading"
    >
      <div className="stage-shell">
        <Reveal>
          <span className="stage-kicker">01 — What I Do</span>
          <h2 id="practice-heading" className="stage-title max-w-xl">
            What I <span className="gradient-role">do</span>
          </h2>
        </Reveal>

        <Reveal className="mt-6 sm:mt-8">
          <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6">
            {profile.achievements.map((item) => (
              <li key={item.value}>
                <p className="font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
