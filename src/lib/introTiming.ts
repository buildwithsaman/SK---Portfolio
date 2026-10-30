/** Full cinematic boot: load hold → welcome → fade. Keep these in sync. */
export const INTRO_LOAD_MS = 3600;
export const INTRO_HOLD_100_MS = 480;
export const INTRO_WELCOME_MS = 2800;
export const INTRO_FADE_MS = 620;
/** Phone loading marquee, then the Memoji chat. Keep in sync with index.html. */
export const MOBILE_LOAD_MS = 2000;

export const INTRO_TOTAL_MS =
  INTRO_LOAD_MS + INTRO_HOLD_100_MS + INTRO_WELCOME_MS + INTRO_FADE_MS;

/** True once the cinematic boot has finished or should be skipped. */
export function introAlreadyComplete(reduceMotion: boolean | null) {
  if (reduceMotion) return true;
  if (typeof document === "undefined") return false;
  if (document.documentElement.getAttribute("data-skip-intro") === "true") {
    return true;
  }
  const boot = document.getElementById("stage-boot");
  return !boot || boot.getAttribute("data-done") === "true";
}

export function dismissStageBoot(immediate = false) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-skip-intro", "true");
  const boot = document.getElementById("stage-boot");
  document.body.style.overflow = "";
  document.querySelectorAll("[inert]").forEach((node) => {
    node.removeAttribute("inert");
  });
  if (!boot || boot.getAttribute("data-done") === "true") return;
  if (immediate) {
    boot.setAttribute("data-done", "true");
    return;
  }
  boot.classList.add("is-exiting");
  window.setTimeout(() => {
    boot.setAttribute("data-done", "true");
  }, INTRO_FADE_MS);
}
