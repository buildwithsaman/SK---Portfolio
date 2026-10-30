import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import {
  INTRO_FADE_MS,
  INTRO_HOLD_100_MS,
  INTRO_LOAD_MS,
  INTRO_TOTAL_MS,
  INTRO_WELCOME_MS,
} from "../../lib/introTiming";

function pinToTop() {
  window.scrollTo(0, 0);
}

function applyLandingHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id || id === "home" || id === "about") {
    pinToTop();
    return;
  }
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

function shouldSkipIntro(reduceMotion: boolean | null) {
  if (reduceMotion) return true;
  return document.documentElement.getAttribute("data-skip-intro") === "true";
}

function clearIntroInert() {
  document.querySelectorAll("#root [inert]").forEach((node) => {
    node.removeAttribute("inert");
  });
}

function setPageInert(active: boolean) {
  const skip = document.querySelector(".skip-link");
  const scope = skip?.parentElement;

  if (!active) {
    if (scope) {
      for (const child of scope.children) child.removeAttribute("inert");
    }
    clearIntroInert();
    return;
  }

  if (!scope || !(skip instanceof HTMLElement)) return;

  for (const child of scope.children) {
    if (child === skip || child.classList.contains("skip-link")) continue;
    child.setAttribute("inert", "");
  }

  const focused = document.activeElement;
  if (
    focused instanceof HTMLElement &&
    focused !== skip &&
    !skip.contains(focused) &&
    focused.closest("[inert]")
  ) {
    skip.focus({ preventScroll: true });
  }
}

function dismissBoot() {
  const boot = document.getElementById("stage-boot");
  boot?.setAttribute("data-done", "true");
  document.body.style.overflow = "";
  setPageInert(false);
  applyLandingHash();
}

function finishIntro(immediate = false) {
  revealStage();
  const boot = document.getElementById("stage-boot");
  if (immediate || !boot) {
    dismissBoot();
    return;
  }
  boot.classList.add("is-exiting");
  window.setTimeout(dismissBoot, INTRO_FADE_MS);
}

type IntroPhase = "load" | "welcome" | "exiting" | "done";

function phaseAt(elapsed: number): IntroPhase {
  if (elapsed < INTRO_LOAD_MS + INTRO_HOLD_100_MS) return "load";
  if (elapsed < INTRO_LOAD_MS + INTRO_HOLD_100_MS + INTRO_WELCOME_MS) {
    return "welcome";
  }
  if (elapsed < INTRO_TOTAL_MS) return "exiting";
  return "done";
}

/** Cinematic intro over #stage-boot, then fade into the hero. */
export default function StageIntro() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const boot = document.getElementById("stage-boot");
    if (!boot) {
      revealStage();
      dismissBoot();
      return;
    }

    if (reduceMotion === null) return;

    if (
      shouldSkipIntro(reduceMotion) ||
      boot.getAttribute("data-done") === "true"
    ) {
      revealStage();
      dismissBoot();
      return;
    }

    let cancelled = false;
    let raf = 0;
    let finished = false;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    pinToTop();
    document.body.style.overflow = "hidden";
    setPageInert(true);

    if (!boot.dataset.introT0) {
      boot.dataset.introT0 = String(performance.now());
    }
    const startedAt = Number(boot.dataset.introT0);

    const complete = (immediate: boolean) => {
      if (finished) return;
      finished = true;
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onPointer, true);
      window.removeEventListener("pointerup", onPointer, true);
      finishIntro(immediate);
    };

    const skip = () => {
      if (cancelled) return;
      complete(true);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        skip();
      }
    };
    const onPointer = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".skip-link") || target.closest("#boot-skip")) skip();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onPointer, true);
    window.addEventListener("pointerup", onPointer, true);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startedAt;
      const phase = phaseAt(elapsed);

      if (phase !== "load") {
        boot.classList.add("is-welcome");
      }

      if (phase === "exiting" || phase === "done") {
        complete(phase === "done");
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onPointer, true);
      window.removeEventListener("pointerup", onPointer, true);
      if (!finished) {
        document.body.style.overflow = "";
        setPageInert(false);
      }
    };
  }, [reduceMotion]);

  return null;
}
