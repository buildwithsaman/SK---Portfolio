import { motion, useReducedMotion } from "framer-motion";

const colors = ["#0891b2", "#7c3aed", "#db2777"];

export function AboutAtmosphere() {
  const reduceMotion = useReducedMotion();
  const steps = [
    [150, 420, "01"],
    [430, 220, "02"],
    [750, 390, "03"],
    [1050, 180, "04"],
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-cyan-300/10 blur-[100px]" />
      <svg viewBox="0 0 1200 650" className="absolute inset-0 h-full w-full opacity-50">
        <motion.path
          d="M-80 520 C 190 520 250 150 470 250 S 770 540 1280 100"
          fill="none"
          stroke="url(#about-flow)"
          strokeWidth="2"
          strokeDasharray="10 16"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -104] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="about-flow" x1="0" x2="1">
            <stop offset="0" stopColor={colors[0]} stopOpacity="0.06" />
            <stop offset="0.5" stopColor={colors[1]} stopOpacity="0.28" />
            <stop offset="1" stopColor={colors[2]} stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {steps.map(([cx, cy, label], index) => (
          <g key={label}>
            <motion.rect
              x={cx - 28}
              y={cy - 28}
              width="56"
              height="56"
              rx="18"
              fill="white"
              fillOpacity="0.34"
              stroke={colors[index % colors.length]}
              strokeOpacity="0.18"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4 + index * 0.5, repeat: Infinity, delay: index * -0.6 }}
            />
            <text x={cx} y={cy + 4} textAnchor="middle" fill={colors[index % colors.length]} fillOpacity="0.35" fontFamily="monospace" fontSize="12">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ExperienceAtmosphere() {
  const reduceMotion = useReducedMotion();
  const milestones = [170, 470, 770, 1070];

  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-violet-300/10 blur-[110px]" />
      <svg viewBox="0 0 1200 900" className="absolute inset-0 h-full w-full opacity-55">
        <motion.path
          d="M-80 260 C 250 80 420 520 690 330 S 980 120 1280 410"
          fill="none"
          stroke="#0891b2"
          strokeOpacity="0.14"
          strokeWidth="2"
          strokeDasharray="7 13"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {milestones.map((cx, index) => (
          <g key={cx}>
            <motion.circle
              cx={cx}
              cy={index % 2 ? 430 : 245}
              r={26}
              style={{ transformOrigin: `${cx}px ${index % 2 ? 430 : 245}px` }}
              fill="none"
              stroke={colors[index % colors.length]}
              strokeOpacity="0.13"
              animate={reduceMotion ? undefined : { scale: [0.62, 1.62], opacity: [0.35, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.7 }}
            />
            <circle cx={cx} cy={index % 2 ? 430 : 245} r="5" fill={colors[index % colors.length]} opacity="0.42" />
          </g>
        ))}
        <motion.path
          d="M100 720 H1100"
          stroke="url(#delivery-line)"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -64] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="delivery-line" x1="0" x2="1">
            <stop stopColor={colors[0]} stopOpacity="0" />
            <stop offset="0.5" stopColor={colors[1]} stopOpacity="0.24" />
            <stop offset="1" stopColor={colors[2]} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function EducationAtmosphere() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    [130, 470],
    [270, 230],
    [470, 380],
    [680, 165],
    [850, 360],
    [1080, 205],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-[90px]" />
      <div className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-violet-300/10 blur-[100px]" />
      <motion.svg
        viewBox="0 0 1200 700"
        className="absolute inset-0 h-full w-full opacity-55"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="learning-path" x1="0" x2="1">
            <stop offset="0" stopColor={colors[0]} stopOpacity="0.08" />
            <stop offset="0.5" stopColor={colors[1]} stopOpacity="0.3" />
            <stop offset="1" stopColor={colors[2]} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-80 560 C 180 510 210 150 470 310 S 760 560 1280 120"
          fill="none"
          stroke="url(#learning-path)"
          strokeWidth="2"
          strokeDasharray="9 14"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -92] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <path
          d="M130 470 L270 230 L470 380 L680 165 L850 360 L1080 205"
          fill="none"
          stroke="#0891b2"
          strokeOpacity="0.12"
          strokeWidth="1.4"
        />
        {nodes.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <motion.circle
              cx={cx}
              cy={cy}
              r={18}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              fill={colors[index % colors.length]}
              opacity="0.07"
              animate={reduceMotion ? undefined : { scale: [0.72, 1.33, 0.72], opacity: [0.04, 0.12, 0.04] }}
              transition={{ duration: 3.4 + index * 0.25, repeat: Infinity, delay: index * 0.32 }}
            />
            <circle cx={cx} cy={cy} r="4" fill={colors[index % colors.length]} opacity="0.45" />
          </g>
        ))}
        <motion.g
          style={{ transformOrigin: "850px 360px" }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="850" cy="360" rx="170" ry="90" fill="none" stroke="#7c3aed" strokeOpacity="0.11" />
          <circle cx="1015" cy="360" r="7" fill="#7c3aed" opacity="0.45" />
        </motion.g>
        {["LEARN", "BUILD", "LEAD"].map((label, index) => (
          <motion.text
            key={label}
            x={190 + index * 390}
            y={590 - (index % 2) * 350}
            fill={colors[index]}
            fillOpacity="0.16"
            fontSize="15"
            fontFamily="monospace"
            letterSpacing="5"
            animate={reduceMotion ? undefined : { opacity: [0.08, 0.28, 0.08] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.9 }}
          >
            {label}
          </motion.text>
        ))}
      </motion.svg>
    </div>
  );
}

export function ContactAtmosphere() {
  const reduceMotion = useReducedMotion();
  const waves = [0, 1, 2];

  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[8%] top-1/3 h-72 w-72 rounded-full bg-violet-300/10 blur-[90px]" />
      <div className="absolute right-[4%] top-10 h-80 w-80 rounded-full bg-cyan-300/10 blur-[100px]" />
      <svg viewBox="0 0 1200 650" className="absolute inset-0 h-full w-full opacity-75">
        {waves.map((wave) => (
          <motion.path
            key={wave}
            d={`M-80 ${390 + wave * 34} C 230 ${120 + wave * 30}, 450 ${600 - wave * 25}, 760 ${290 + wave * 18} S 1080 ${110 + wave * 30}, 1280 ${330 + wave * 22}`}
            fill="none"
            stroke={colors[wave]}
            strokeOpacity={0.17 - wave * 0.022}
            strokeWidth={2 - wave * 0.3}
            strokeDasharray={`${12 + wave * 5} ${18 + wave * 6}`}
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -120] }}
            transition={{ duration: 8 + wave * 3, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {[260, 630, 970].map((cx, index) => (
          <g key={cx}>
            <motion.circle
              cx={cx}
              cy={index === 1 ? 410 : 250}
              r={28}
              style={{ transformOrigin: `${cx}px ${index === 1 ? 410 : 250}px` }}
              fill="none"
              stroke={colors[index]}
              strokeOpacity="0.16"
              animate={reduceMotion ? undefined : { scale: [0.64, 1.86], opacity: [0.35, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.75 }}
            />
            <circle cx={cx} cy={index === 1 ? 410 : 250} r="6" fill={colors[index]} opacity="0.5" />
          </g>
        ))}
        <motion.g
          animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="930" y="390" width="118" height="64" rx="18" fill="white" fillOpacity="0.38" stroke="#0891b2" strokeOpacity="0.16" />
          <path d="M960 454 L946 472 L980 454" fill="white" fillOpacity="0.38" />
          {[964, 988, 1012].map((cx) => <circle key={cx} cx={cx} cy="422" r="4" fill="#0891b2" opacity="0.35" />)}
        </motion.g>
      </svg>
    </div>
  );
}
