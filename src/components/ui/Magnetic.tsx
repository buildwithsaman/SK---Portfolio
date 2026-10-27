import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { stageTilt } from "../../lib/motion";
import useFinePointer from "../../hooks/useFinePointer";

export default function Magnetic({
  children,
  strength = 10,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const enabled = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, stageTilt);
  const y = useSpring(0, stageTilt);
  const classes = `inline-flex ${className}`.trim();

  if (!enabled) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={classes}
      style={{ x, y }}
      onPointerMove={(event) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        x.set((dx / rect.width) * strength);
        y.set((dy / rect.height) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
