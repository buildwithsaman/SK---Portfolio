import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { stageTilt } from "../../lib/motion";
import useFinePointer from "../../hooks/useFinePointer";

/**
 * Decorative follow-spot. Native cursor stays visible so text selection
 * and clicking are never blocked (pointer-events: none).
 */
export default function StageCursor() {
  const enabled = useFinePointer();
  const x = useSpring(-40, stageTilt);
  const y = useSpring(-40, stageTilt);
  const scale = useSpring(1, stageTilt);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea",
      );
      scale.set(interactive ? 1.45 : 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, scale, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden lg:block mix-blend-difference"
      style={{
        x,
        y,
        scale,
        opacity: visible ? 0.7 : 0,
      }}
    >
      <span className="-ml-4 -mt-4 block h-8 w-8 rounded-full border border-accent2/50 bg-accent2/5" />
    </motion.div>
  );
}
