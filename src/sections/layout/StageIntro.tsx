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
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  root.style.scrollBehavior = previous;
}

function skipWantsHero() {
  return document.documentElement.getAttribute("data-intro-at-hero") === "true";
}

function markSkipToHero() {
  document.documentElement.setAttribute("data-intro-at-hero", "true");
  const url = `${window.location.pathname}${window.location.search}` || "/";
  if (window.location.hash) {
    history.replaceState(null, "", url);
  }
  pinToTop();
}

function landAtHero() {
  markSkipToHero();
  requestAnimationFrame(pinToTop);
  window.setTimeout(pinToTop, 50);
  window.setTimeout(pinToTop, 200);
}

function revealStage(skipped = false) {
  window.dispatchEvent(
    new CustomEvent("stage-intro-done", {
      detail: { skipped: skipped || skipWantsHero() },
    }),
  );
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
  landAtHero();
}

function finishIntro(immediate = false) {
  landAtHero();
  const boot = document.getElementById("stage-boot");
  if (immediate || !boot) {
    dismissBoot();
    revealStage(true);
    requestAnimationFrame(pinToTop);
    return;
  }
  revealStage(true);
  boot.classList.add("is-exiting");
  window.setTimeout(() => dismissBoot(), INTRO_FADE_MS);
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
      dismissBoot();
      revealStage(true);
      return;
    }

    if (reduceMotion === null) return;

    if (
      shouldSkipIntro(reduceMotion) ||
      boot.getAttribute("data-done") === "true"
    ) {
      dismissBoot();
      revealStage(true);
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
      markSkipToHero();
      if (finished) {
        dismissBoot();
        return;
      }
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
      if (target.closest(".skip-link") || target.closest("#boot-skip")) {
        skip();
        return;
      }
      if (
        window.matchMedia("(max-width: 1023px)").matches &&
        target.closest("#stage-boot")
      ) {
        skip();
      }
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
