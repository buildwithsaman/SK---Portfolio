import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import FlexCarousel from "../ui/FlexCarousel";
import Reveal from "../ui/Reveal";
import { techStack } from "../../data/cv";

function SkillGrid() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {techStack.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="flex h-[9.75rem] flex-col justify-between rounded-2xl border border-edge/70 bg-[#080616] p-3.5 no-underline transition-colors hover:border-accent2/50 sm:h-[18rem] sm:rounded-3xl sm:p-5 lg:p-6"
        >
          <img
            src={`${import.meta.env.BASE_URL}skills/${item.id}.svg`}
            alt=""
            className="h-10 w-10 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-ink sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              {item.subtitle}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function StageSkills() {
  const reduceMotion = useReducedMotion();
  const items = useMemo(
    () =>
      techStack.map((item) => ({
        src: `${import.meta.env.BASE_URL}skills/${item.id}.svg`,
        alt: item.alt,
        title: item.title,
        subtitle: item.subtitle,
        href: item.href,
      })),
    [],
  );

  const heading = (
    <Reveal>
      <span className="stage-kicker">04 — Technical Skills</span>
      <h2 id="skills-heading" className="stage-title max-w-2xl">
        Tech <span className="gradient-role">stack</span>
      </h2>
    </Reveal>
  );

  if (reduceMotion) {
    return (
      <section
        id="skills"
        className="stage-shell overflow-x-clip py-12 lg:py-8"
        aria-labelledby="skills-heading"
      >
        {heading}
        <SkillGrid />
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="stage-shell overflow-x-clip py-12 lg:py-8"
      aria-labelledby="skills-heading"
    >
      {heading}

      <div className="relative mt-6 h-[22rem] w-full sm:h-[28rem] lg:mt-4 lg:h-[32rem]">
        <FlexCarousel
          items={items}
          preset="liquid"
          intro="rise"
          cardHeight={0.5}
          gap={12}
          squeeze={0.2}
          focusOnClick={false}
          captions={false}
          fit="portrait"
          radius={18}
          ariaLabel="Tech stack"
          onSelect={(_index, item) => {
            if (!item.href) return;
            window.open(item.href, "_blank", "noopener,noreferrer");
          }}
        />
      </div>
    </section>
  );
}
