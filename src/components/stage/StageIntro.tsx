import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const STORAGE_KEY = "sk-intro-seen";
const MARQUEE_MS = 720;
const WELCOME_MS = 900;
const FADE_MS = 280;

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

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

function shouldSkipIntro(reduceMotion: boolean | null) {
  if (reduceMotion) return true;
  if (document.documentElement.getAttribute("data-skip-intro") === "true") {
    return true;
  }
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
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
  markSeen();
  revealStage();
  const boot = document.getElementById("stage-boot");
  if (immediate || !boot) {
    dismissBoot();
    return;
  }
  boot.classList.add("is-exiting");
  window.setTimeout(dismissBoot, FADE_MS);
}

/** Cinematic intro over #stage-boot, then fade into the hero. */
export default function StageIntro() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const boot = document.getElementById("stage-boot");
    if (!boot) {
      revealStage();
      dismissBoot();
      return;
    }

    if (reduceMotion === null) return;

    if (shouldSkipIntro(reduceMotion)) {
      revealStage();
      dismissBoot();
      return;
    }

    let cancelled = false;
    let welcomeTimer = 0;
    let fadeTimer = 0;
    document.body.style.overflow = "hidden";
    setPageInert(true);

    const skip = () => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(welcomeTimer);
      window.clearTimeout(fadeTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onPointer, true);
      finishIntro(true);
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
      if (target.closest(".skip-link") || target.closest("#stage-boot")) {
        skip();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onPointer, true);

    welcomeTimer = window.setTimeout(() => {
      if (cancelled) return;
      boot.classList.add("is-welcome");
      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        cancelled = true;
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("click", onPointer, true);
        finishIntro(false);
      }, WELCOME_MS);
    }, MARQUEE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(welcomeTimer);
      window.clearTimeout(fadeTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onPointer, true);
      document.body.style.overflow = "";
      setPageInert(false);
    };
  }, [reduceMotion]);

  return null;
}
