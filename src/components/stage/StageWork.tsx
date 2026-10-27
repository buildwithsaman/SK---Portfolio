import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { udriveDomains, type ExperienceDomain } from "../../data/cv";
import { easeOut, STAGE_PERSPECTIVE } from "../../lib/motion";

export default function StageWork() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const item = udriveDomains[active] ?? udriveDomains[0];
  const panelId = `${baseId}-panel`;

  return (
    <section id="work" className="stage-section" aria-labelledby="work-heading">
      <Reveal>
        <span className="stage-kicker">04 — Selected Work</span>
        <h2 id="work-heading" className="stage-title max-w-3xl">
          Production Applications &{" "}
          <span className="gradient-role">Engineering Experience</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
          A selection of engineering contributions across Udrive&apos;s mobility
          technology ecosystem.
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <a href="#career" className="transition-colors hover:text-accent2">
            From Professional Experience
          </a>
          <span aria-hidden="true"> · </span>
          {udriveDomains.length} production areas
        </p>
      </Reveal>

      {reduceMotion ? (
        <WorkAccordion active={active} setActive={setActive} baseId={baseId} />
      ) : (
        <>
          <WorkDeckMobile active={active} setActive={setActive} />
          <WorkDeckDesktop active={active} setActive={setActive} />
          <AnimatePresence mode="wait">
            <WorkPanel
              key={item.id}
              item={item}
              panelId={panelId}
              index={active}
            />
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

function WorkDeckDesktop({
  active,
  setActive,
}: {
  active: number;
  setActive: (index: number) => void;
}) {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fromKey = useRef(false);
  const [wide, setWide] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fromKey.current) return;
    fromKey.current = false;
    cardRefs.current[active]?.focus({ preventScroll: true });
  }, [active]);

  const move = (delta: number) => {
    fromKey.current = true;
    setActive((active + delta + udriveDomains.length) % udriveDomains.length);
  };

  const spread = wide ? 88 : 42;
  const tilt = wide ? -14 : -8;
  const depth = wide ? 80 : 48;

  return (
    <div
      className="relative mx-auto mt-12 hidden h-[23.5rem] max-w-4xl [transform-style:preserve-3d] md:block"
      style={{ perspective: STAGE_PERSPECTIVE }}
    >
      {udriveDomains.map((item, index) => {
        const offset = index - active;
        const abs = Math.abs(offset);
        const hidden = abs > 2;
        return (
          <motion.button
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            type="button"
            tabIndex={index === active ? 0 : -1}
            aria-pressed={active === index}
            aria-label={`${String(index + 1).padStart(2, "0")} ${item.title}, ${item.role}`}
            onClick={() => setActive(index)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(1);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              }
              if (e.key === "Home") {
                e.preventDefault();
                fromKey.current = true;
                setActive(0);
              }
              if (e.key === "End") {
                e.preventDefault();
                fromKey.current = true;
                setActive(udriveDomains.length - 1);
              }
            }}
            initial={false}
            animate={{
              x: offset * spread,
              y: abs * (wide ? 10 : 8),
              z: abs === 0 ? 1 : -abs * depth,
              rotateY: offset * tilt,
              scale: 1 - Math.min(abs, 2) * 0.05,
              opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0.55, ease: easeOut }}
            style={{
              zIndex: 20 - abs,
              pointerEvents: hidden ? "none" : "auto",
            }}
            className={`absolute inset-x-[16%] top-0 flex h-[20.75rem] flex-col overflow-hidden border bg-paper p-6 text-left shadow-[0_30px_80px_rgba(0,0,0,0.5)] [transform-style:preserve-3d] lg:inset-x-[12%] lg:p-7 ${
              active === index
                ? "border-accent2/45"
                : "border-edge/70 hover:border-edge"
            }`}
          >
            <DeckFace item={item} index={index} compact={index !== active} />
          </motion.button>
        );
      })}
    </div>
  );
}

function WorkDeckMobile({
  active,
  setActive,
}: {
  active: number;
  setActive: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fromScroll = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const root = scrollerRef.current;
    const node = cardRefs.current[active];
    if (!root || !node || fromScroll.current) {
      fromScroll.current = false;
      return;
    }
    const left = node.offsetLeft - (root.clientWidth - node.offsetWidth) / 2;
    root.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(next) && next !== activeRef.current) {
          fromScroll.current = true;
          setActive(next);
        }
      },
      { root, threshold: 0.55 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [setActive]);

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        className="-mx-[1.15rem] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[1.15rem] pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {udriveDomains.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            type="button"
            data-index={index}
            aria-pressed={active === index}
            aria-label={`${String(index + 1).padStart(2, "0")} ${item.title}, ${item.role}`}
            onClick={() => setActive(index)}
            className={`w-[min(82vw,22rem)] shrink-0 snap-center border p-5 text-left transition-colors ${
              active === index
                ? "border-accent2/40 bg-paper/70"
                : "border-edge/70 bg-paper/40"
            }`}
          >
            <DeckFace item={item} index={index} />
          </button>
        ))}
      </div>
      <div
        className="mt-3 flex justify-center gap-2"
        aria-label="Work projects"
      >
        {udriveDomains.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-current={active === index ? "true" : undefined}
            aria-label={`Show ${item.title}`}
            onClick={() => setActive(index)}
            className={`relative h-1.5 rounded-full transition-colors before:absolute before:-inset-y-3 before:-inset-x-2 before:content-[''] ${
              active === index ? "w-6 bg-accent2" : "w-1.5 bg-edge"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DeckFace({
  item,
  index,
  compact = false,
}: {
  item: ExperienceDomain;
  index: number;
  compact?: boolean;
}) {
  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent2">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="mt-3 block text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {item.title}
      </span>
      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
        {item.role}
      </span>
      {!compact && (
        <>
          <span className="mt-3 line-clamp-3 block text-sm leading-relaxed text-muted">
            {item.ownership}
          </span>
          <span className="mt-4 flex min-w-0 flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-full border border-edge/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted/80"
              >
                {t}
              </span>
            ))}
          </span>
        </>
      )}
    </>
  );
}

function WorkPanel({
  item,
  panelId,
  index,
  embedded = false,
}: {
  item: ExperienceDomain;
  panelId: string;
  index: number;
  embedded?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={panelId}
      role="region"
      aria-label={`${item.title} details`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.32, ease: easeOut }}
      className={
        embedded
          ? "min-w-0 px-1 pb-8 pl-9"
          : "mt-10 min-w-0 border-t border-edge/50 pt-8"
      }
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {String(index + 1).padStart(2, "0")} — {item.title}
      </p>
      <div className="mt-6 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
        <div className="min-w-0 space-y-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
                Role
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{item.role}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
                Focus
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.focus}
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
              Overview
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {item.ownership}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent2">
              Key Contributions
            </p>
            <ul className="mt-3 space-y-2.5">
              {item.contributions.map((point) => (
                <li
                  key={point.slice(0, 48)}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted md:text-[0.95rem]"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
            Technology Stack
          </p>
          <div className="mt-3 flex min-w-0 flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="inline-flex max-w-full rounded-full border border-edge bg-panel/40 px-2.5 py-1 font-mono text-[10px] uppercase leading-snug tracking-wider text-ink/90"
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function WorkAccordion({
  active,
  setActive,
  baseId,
}: {
  active: number;
  setActive: (index: number) => void;
  baseId: string;
}) {
  return (
    <div className="mt-12 space-y-0">
      {udriveDomains.map((item, index) => {
        const open = active === index;
        const panelId = `${baseId}-panel-${index}`;
        const tabId = `${baseId}-tab-${index}`;
        return (
          <article
            key={item.id}
            className={`relative border-t border-edge/70 ${
              index === udriveDomains.length - 1 ? "border-b" : ""
            }`}
          >
            <h3>
              <button
                type="button"
                id={tabId}
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                aria-label={`${String(index + 1).padStart(2, "0")} ${item.title}, ${item.role}`}
                onClick={() => setActive(index)}
                className="group flex w-full items-start gap-3 py-5 text-left sm:gap-4 sm:py-6"
              >
                <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold text-ink">
                    {item.title}
                  </span>
                  {!open && (
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
                      {item.role}
                    </span>
                  )}
                </span>
                <span className="font-mono text-xs text-muted" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            {open && (
              <WorkPanel item={item} panelId={panelId} index={index} embedded />
            )}
          </article>
        );
      })}
    </div>
  );
}
