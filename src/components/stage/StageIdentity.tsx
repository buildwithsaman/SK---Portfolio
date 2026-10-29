import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { scrollSpring } from "../../lib/scrollMotion";
import StageFigure from "./StageFigure";
import StageHero from "./StageHero";

function useWideDesktop() {
  const [wide, setWide] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1280px)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return wide;
}

export default function StageIdentity() {
  const identityRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const wide = useWideDesktop();
  const { scrollYProgress } = useScroll({
    target: identityRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useSpring(
    useTransform(heroProgress, [0, 0.38], ["0vh", "1.5vh"]),
    scrollSpring,
  );
  const opacity = useSpring(
    useTransform(heroProgress, [0, 0.08, 0.22, 0.36], [1, 1, 0.32, 0]),
    scrollSpring,
  );

  return (
    <div ref={identityRef} className="relative">
      {wide && !reduceMotion ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[100svh] overflow-hidden">
          <div className="stage-shell flex h-full items-start justify-end pt-[max(4.9rem,env(safe-area-inset-top)+3.35rem)] lg:pt-[max(6.4rem,env(safe-area-inset-top)+5.15rem)]">
            <div className="character-wide-shift">
              <motion.div
                className="will-change-transform"
                style={{
                  y,
                  opacity,
                  transformOrigin: "50% 16%",
                }}
              >
                <StageFigure progress={scrollYProgress} />
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}

      <div ref={heroRef} className="relative z-[3]">
        <StageHero />
      </div>
    </div>
  );
}
