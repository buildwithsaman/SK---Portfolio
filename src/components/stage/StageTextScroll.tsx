import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { highlightLines } from "../../data/cv";
import { scrollSpringSnappy } from "../../lib/scrollMotion";

const lines = highlightLines;

export default function StageTextScroll() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progressScale = useSpring(scrollYProgress, scrollSpringSnappy);

  if (reduceMotion) {
    return (
      <section
        id="highlights"
        className="stage-section border-y border-edge/40"
        aria-label="Career highlights"
      >
        <p className="stage-kicker">Highlights</p>
        <ul className="mt-8 space-y-5">
          {lines.map((line) => (
            <li
              key={line}
              className="display-name text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.15] text-ink"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // Before: h-[360vh]. After: 100svh sticky + 6×26svh (mobile) / 6×32svh (md+)
  // → 256svh mobile, 292svh desktop. Keyframes tightened so lines still finish cleanly.
  return (
    <section
      ref={ref}
      id="highlights"
      className="relative h-[calc(100svh+156svh)] md:h-[calc(100svh+192svh)]"
      aria-labelledby="highlights-heading"
    >
      {/* Stable list for assistive tech; animated layer is decorative */}
      <h2 id="highlights-heading" className="sr-only">
        Career highlights
      </h2>
      <ul className="sr-only">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div
        className="sticky top-0 flex h-[100svh] items-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent2)/0.1),transparent_58%)]" />

        <div className="relative mx-auto w-full max-w-5xl px-5 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <p className="stage-kicker">Highlights</p>
            <div className="h-px w-24 overflow-hidden bg-edge/60 md:w-40">
              <motion.div
                className="h-full origin-left bg-accent2"
                style={{ scaleX: progressScale }}
              />
            </div>
          </div>

          <div className="relative min-h-[11rem] sm:min-h-[13rem] md:min-h-[16rem]">
            {lines.map((line, index) => (
              <TextLine
                key={line}
                line={line}
                index={index}
                total={lines.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <ol className="mt-12 flex gap-2">
            {lines.map((line, index) => (
              <ProgressDot
                key={line}
                index={index}
                total={lines.length}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TextLine({
  line,
  index,
  total,
  progress,
}: {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const enter = Math.max(0, index * slice - slice * 0.06);
  const peak = index * slice + slice * 0.32;
  const hold = index * slice + slice * 0.68;
  const exit = Math.min(1, (index + 1) * slice + slice * 0.04);
  const isLast = index === total - 1;

  const opacityRaw = useTransform(
    progress,
    isLast ? [enter, peak, 1] : [enter, peak, hold, exit],
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const yRaw = useTransform(
    progress,
    isLast ? [enter, peak, 1] : [enter, peak, hold, exit],
    isLast ? [48, 0, 0] : [48, 0, 0, -36],
  );

  const opacity = useSpring(opacityRaw, scrollSpringSnappy);
  const y = useSpring(yRaw, scrollSpringSnappy);

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 display-name text-[clamp(1.55rem,5.2vw,3.25rem)] leading-[1.14] text-ink"
    >
      {line}
    </motion.p>
  );
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const active = useTransform(
    progress,
    [index * slice, index * slice + slice * 0.2, (index + 1) * slice],
    [0.25, 1, index === total - 1 ? 1 : 0.25],
  );
  const scale = useTransform(active, [0.25, 1], [1, 1.35]);

  return (
    <motion.li
      style={{ opacity: active, scale }}
      className="h-1.5 w-1.5 rounded-full bg-accent2"
    />
  );
}
