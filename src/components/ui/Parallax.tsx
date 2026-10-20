import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { scrollSpring } from "../../lib/scrollMotion";

/** Lightweight vertical parallax — native scroll, spring-smoothed transforms */
export default function Parallax({
  children,
  speed = 0.16,
  className = "",
}: {
  children: ReactNode;
  /** 0 = locked, ~0.15–0.25 = gentle drift */
  speed?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.round(speed * 64), Math.round(speed * -64)],
  );
  const y = useSpring(yRaw, scrollSpring);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-visible ${className}`}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
