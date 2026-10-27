import { useEffect } from "react";
import { useSpring, type MotionValue } from "framer-motion";
import { stageTilt } from "../lib/motion";
import useFinePointer from "./useFinePointer";

/** Normalized pointer in -1..1, damped. Zero when fine pointer is off. */
export default function usePointerNorm(): {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
} {
  const enabled = useFinePointer();
  const nx = useSpring(0, stageTilt);
  const ny = useSpring(0, stageTilt);

  useEffect(() => {
    if (!enabled) {
      nx.set(0);
      ny.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      nx.set(Math.max(-1, Math.min(1, x)));
      ny.set(Math.max(-1, Math.min(1, y)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, nx, ny]);

  return { nx, ny };
}
