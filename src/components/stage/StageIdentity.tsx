import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { scrollSpring } from "../../lib/scrollMotion";
import IdentityRig from "./IdentityRig";
import StageHero from "./StageHero";
import StageAbout from "./StageAbout";

export default function StageIdentity() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const x = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.12, 0.22, 0.85],
      ["0vw", "-14vw", "-48vw", "-50vw"],
    ),
    scrollSpring,
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.22, 0.85], ["0vh", "4vh", "10vh"]),
    scrollSpring,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.12, 0.22, 0.85], [1, 0.78, 0.46, 0.4]),
    scrollSpring,
  );
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.12, 0.22, 0.75, 0.95],
      [1, 0.94, 0.55, 0.3, 0.12],
    ),
    scrollSpring,
  );

  return (
    <div ref={ref} className="relative">
      <div
        className={`pointer-events-none sticky top-0 z-[2] h-[100svh] ${
          reduceMotion ? "hidden" : "hidden xl:block"
        }`}
      >
        <motion.div
          className="flex h-full items-center justify-end pr-[3%] xl:pr-[7%]"
          style={
            reduceMotion
              ? undefined
              : { x, y, scale, opacity, transformOrigin: "center center" }
          }
        >
          <IdentityRig progress={scrollYProgress} />
        </motion.div>
      </div>

      <div
        className={`relative z-[3] ${reduceMotion ? "" : "xl:-mt-[100svh]"}`}
      >
        <StageHero />
        <StageAbout />
      </div>
    </div>
  );
}
