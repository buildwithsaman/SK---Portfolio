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

function dismissBoot() {
  const boot = document.getElementById("stage-boot");
  boot?.setAttribute("data-done", "true");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  applyLandingHash();
}

/** Times the CSS LOADING screen in #stage-boot, then fades it out. */
export default function StageIntro() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const boot = document.getElementById("stage-boot");
    if (!boot) {
      dismissBoot();
      return;
    }

    if (reduceMotion === true) {
      dismissBoot();
      return;
    }

    // Wait until preference is known (null → skip until resolved)
    if (reduceMotion === null) return;

    // Let the blur cycle play (~1.5s × ~1.5), then exit
    const holdMs = 2400;
    const fadeMs = 700;
    const hold = window.setTimeout(() => {
      boot.classList.add("is-exiting");
      window.setTimeout(dismissBoot, fadeMs);
    }, holdMs);

    return () => {
      window.clearTimeout(hold);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return null;
}
