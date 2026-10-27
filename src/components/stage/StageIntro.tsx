import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

function applyLandingHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  });
}

function revealStage() {
  window.dispatchEvent(new Event("stage-intro-done"));
}

function dismissBoot() {
  const boot = document.getElementById("stage-boot");
  boot?.setAttribute("data-done", "true");
  applyLandingHash();
}

/** Brief non-blocking cover for first paint, then fade. */
export default function StageIntro() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const boot = document.getElementById("stage-boot");
    if (!boot) {
      revealStage();
      dismissBoot();
      return;
    }

    if (reduceMotion === true) {
      revealStage();
      dismissBoot();
      return;
    }

    if (reduceMotion === null) return;

    const holdMs = 180;
    const fadeMs = 280;
    const hold = window.setTimeout(() => {
      boot.classList.add("is-exiting");
      revealStage();
      window.setTimeout(dismissBoot, fadeMs);
    }, holdMs);

    return () => window.clearTimeout(hold);
  }, [reduceMotion]);

  return null;
}
