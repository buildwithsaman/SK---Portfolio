import { useMemo, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Reveal from "../ui/Reveal";
import FlowingMenu from "../ui/FlowingMenu";
import { profile, udriveDomains, type ExperienceDomain } from "../../data/cv";

const galleryLabels: Record<string, string> = {
  "operations-analytics": "Operations",
  "subscription-crm": "CRM",
  "website-apps": "Website",
  "kyc-backend": "KYC",
  "automation-tools": "Automation",
};

function WorkDetail({
  domain,
  index,
}: {
  domain: ExperienceDomain;
  index: number;
}) {
  return (
    <article className="px-[clamp(1rem,4vw,2.5rem)] pb-5 pt-3 text-left sm:pb-6 sm:pt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent2 sm:tracking-[0.2em]">
        {String(index + 1).padStart(2, "0")} ·{" "}
        {galleryLabels[domain.id] ?? domain.role} · {domain.role}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {domain.title}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {domain.ownership}
      </p>
      <ul className="mt-4 grid max-w-4xl gap-2 text-sm text-ink/85 sm:grid-cols-2">
        {domain.contributions.map((line) => (
          <li
            key={line}
            className="border-l border-accent2/40 pl-3 leading-relaxed"
          >
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-4 break-words font-mono text-[10px] uppercase tracking-[0.08em] text-accent2/90 sm:tracking-[0.16em] sm:text-[11px]">
        {domain.tech.join(" · ")}
      </p>
    </article>
  );
}

export default function StageWork() {
  const compact = useMediaQuery("(max-width: 1023px)");
  const [active, setActive] = useState(-1);

  const items = useMemo(
    () =>
      udriveDomains.map((item, index) => ({
        text: galleryLabels[item.id] ?? item.role,
        marquee: galleryLabels[item.id] ?? item.role,
        meta: item.role,
        detail: <WorkDetail domain={item} index={index} />,
      })),
    [],
  );

  return (
    <section
      className="overflow-x-clip py-10 lg:py-14"
      aria-labelledby="work-heading"
    >
      <div id="work" className="h-0 scroll-mt-5" />
      <div className="stage-shell">
        <Reveal className="text-center">
          <span className="stage-kicker">03 — Selected Work</span>
          <h2
            id="work-heading"
            className="stage-title mx-auto mt-1.5 max-w-2xl"
          >
            My <span className="gradient-role">Work</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
            {profile.workIntro}
          </p>
        </Reveal>

        <div className="relative mt-5 w-full sm:mt-6">
          <FlowingMenu
            items={items}
            speed={48}
            direction="alternate"
            stretch={0.6}
            magnet={0.25}
            followCursor={compact ? 0 : 0.4}
            showIndex
            dimInactive
            align={compact ? "left" : "center"}
            intro={!compact}
            activeIndex={active}
            onActiveIndexChange={setActive}
            onItemClick={(_item, index) => setActive(index)}
            textColor="#fafafc"
            bgColor="transparent"
            marqueeBgColor="#a8a2ff"
            marqueeTextColor="#02010a"
            borderColor="rgba(168, 162, 255, 0.22)"
            ariaLabel="Production work at Udrive"
          />
        </div>
      </div>
    </section>
  );
}
