import { useId } from "react";
import {
  motion,
  useReducedMotion,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";
import usePointerNorm from "../../hooks/usePointerNorm";
import useFinePointer from "../../hooks/useFinePointer";

const NODES = [
  { x: 168, y: 196 },
  { x: 248, y: 162 },
  { x: 318, y: 210 },
  { x: 292, y: 292 },
  { x: 214, y: 318 },
  { x: 156, y: 268 },
  { x: 236, y: 244 },
];

const PATH = NODES.map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`).join(
  " ",
);

export default function IdentityRig({
  progress,
  compact = false,
}: {
  progress?: MotionValue<number>;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const pointerOn = useFinePointer();
  const { nx, ny } = usePointerNorm();
  const time = useTime();
  const uid = useId().replaceAll(":", "");

  const rotate = useTransform(time, (t) => (t / 90) % 360);
  const counter = useTransform(time, (t) => -((t / 140) % 360));
  const sweep = useTransform(progress ?? time, (v) =>
    progress ? 24 + v * 292 : 40 + ((v / 40) % 280),
  );

  const tiltX = useTransform(ny, [-1, 1], [7, -7]);
  const tiltY = useTransform(nx, [-1, 1], [-9, 9]);
  const glowX = useTransform(nx, [-1, 1], ["32%", "68%"]);
  const glowY = useTransform(ny, [-1, 1], ["30%", "64%"]);
  const nodeShiftX = useTransform(nx, [-1, 1], [-10, 10]);
  const nodeShiftY = useTransform(ny, [-1, 1], [-8, 8]);

  const sizeClass = compact
    ? "h-[16.5rem] w-[16.5rem] sm:h-[19rem] sm:w-[19rem] lg:h-[24rem] lg:w-[24rem]"
    : "h-[min(30rem,58vw)] w-[min(30rem,58vw)] xl:h-[34rem] xl:w-[34rem]";

  return (
    <motion.div
      aria-hidden="true"
      className={`relative ${sizeClass}`}
      style={
        reduceMotion || !pointerOn
          ? undefined
          : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }
      }
    >
      {pointerOn && (
        <motion.div
          className="pointer-events-none absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--navy-electric)/0.14),transparent_68%)]"
          style={{ left: glowX, top: glowY, x: "-50%", y: "-50%" }}
        />
      )}

      <svg viewBox="0 0 520 560" className="relative h-full w-full" fill="none">
        <defs>
          <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(13 0 164)" stopOpacity="0.9" />
            <stop offset="55%" stopColor="rgb(34 0 124)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="rgb(13 0 164)" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="46%" r="50%">
            <stop offset="0%" stopColor="rgb(13 0 164)" stopOpacity="0.28" />
            <stop offset="55%" stopColor="rgb(20 1 82)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(2 1 10)" stopOpacity="0" />
          </radialGradient>
          <filter
            id={`${uid}-soft`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <rect
          x="36"
          y="48"
          width="448"
          height="464"
          rx="28"
          stroke="rgb(20 1 82)"
          strokeWidth="1.2"
        />
        <path
          d="M36 92 V62 h30 M448 62 h30 v30 M478 468 v30 h-30 M66 498 H36 v-30"
          stroke="rgb(13 0 164)"
          strokeWidth="1.6"
          strokeOpacity="0.85"
        />

        <circle cx="260" cy="280" r="168" fill={`url(#${uid}-core)`} />

        <g transform="translate(260 280)">
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const inner = i % 9 === 0 ? 158 : 168;
            return (
              <line
                key={i}
                x1={Math.cos(a) * inner}
                y1={Math.sin(a) * inner}
                x2={Math.cos(a) * 176}
                y2={Math.sin(a) * 176}
                stroke="rgb(34 0 124)"
                strokeOpacity={i % 9 === 0 ? 0.7 : 0.28}
                strokeWidth={i % 9 === 0 ? 1.4 : 0.7}
              />
            );
          })}
        </g>

        <g transform="translate(260 280)">
          <motion.g style={reduceMotion ? undefined : { rotate }}>
            <ellipse
              cx="0"
              cy="0"
              rx="154"
              ry="118"
              stroke={`url(#${uid}-ring)`}
              strokeWidth="1.15"
              strokeDasharray="7 11"
            />
          </motion.g>
          <motion.g style={reduceMotion ? undefined : { rotate: counter }}>
            <ellipse
              cx="0"
              cy="0"
              rx="108"
              ry="148"
              stroke="rgb(13 0 164)"
              strokeOpacity="0.35"
              strokeWidth="0.9"
              strokeDasharray="2 10"
            />
          </motion.g>
        </g>

        <circle
          cx="260"
          cy="280"
          r="72"
          stroke="rgb(250 250 252)"
          strokeOpacity="0.16"
        />
        <circle
          cx="260"
          cy="280"
          r="22"
          stroke={`url(#${uid}-ring)`}
          strokeWidth="1.4"
        />
        <circle cx="260" cy="280" r="5" fill="rgb(13 0 164)" />

        <motion.g
          style={
            reduceMotion || !pointerOn
              ? undefined
              : { x: nodeShiftX, y: nodeShiftY }
          }
        >
          <path
            d={PATH}
            stroke="rgb(34 0 124)"
            strokeOpacity="0.55"
            strokeWidth="1.1"
            filter={`url(#${uid}-soft)`}
          />
          <path
            d={PATH}
            stroke="rgb(13 0 164)"
            strokeOpacity="0.8"
            strokeWidth="0.7"
          />
          {NODES.map((node, i) => (
            <g key={`${node.x}-${node.y}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={i === 6 ? 5.5 : 3.4}
                fill={i === 6 ? "rgb(13 0 164)" : "rgb(2 1 10)"}
                stroke="rgb(13 0 164)"
                strokeWidth="1.1"
              />
            </g>
          ))}
        </motion.g>

        <motion.line
          x1="86"
          x2="434"
          stroke="rgb(13 0 164)"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          style={{ y: sweep }}
        />

        <text
          x="260"
          y="478"
          textAnchor="middle"
          fill="rgb(148 144 176)"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="0.28em"
        >
          25.20°N 55.27°E
        </text>
        <text
          x="260"
          y="86"
          textAnchor="middle"
          fill="rgb(13 0 164)"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="0.34em"
        >
          DXB · FIELD
        </text>
      </svg>
    </motion.div>
  );
}
