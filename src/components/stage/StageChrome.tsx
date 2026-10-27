import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, profile, stageActs } from "../../data/cv";
import { easeOut } from "../../lib/motion";
import Magnetic from "../ui/Magnetic";

function sectionIdFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, "");
  return stageActs.some((act) => act.id === id) ? id : null;
}

function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export default function StageChrome() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [pastHero, setPastHero] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const preferSmooth = !reduceMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -48% 0px" },
    );
    stageActs.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direct hash URLs + browser back/forward (popstate + hashchange)
  useEffect(() => {
    const applyHash = (
      behavior: ScrollBehavior,
      opts?: { homeIfEmpty?: boolean },
    ) => {
      const id = sectionIdFromHash(window.location.hash);
      requestAnimationFrame(() => {
        if (id) scrollToSection(id, behavior);
        else if (opts?.homeIfEmpty && !window.location.hash) {
          scrollToSection("home", behavior);
        }
      });
    };

    applyHash("auto");

    const behavior = preferSmooth ? "smooth" : "auto";
    const onHashChange = () => applyHash(behavior);
    const onPopState = () => applyHash(behavior, { homeIfEmpty: true });

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
    };
  }, [preferSmooth]);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (open) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("aria-hidden", "true");
      const focusable = menuRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      focusable?.focus();
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("aria-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = [
        ...menuRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    setOpen(false);
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    scrollToSection(id, preferSmooth ? "smooth" : "auto");
  };

  const linkClass = (id: string) =>
    `rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors xl:px-3 ${
      active === id ? "bg-white/10 text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-3 sm:py-4 md:px-8">
          <a
            href="#home"
            onClick={(e) => onNavClick(e, "home")}
            className="relative font-mono text-sm tracking-[0.22em] text-ink transition-colors hover:text-accent2"
            aria-label="SK home"
          >
            <AnimatePresence mode="wait" initial={false}>
              {pastHero ? (
                <motion.span
                  key="mark"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="inline-flex items-center gap-2"
                >
                  <img
                    src="/logo-mark.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  SK
                </motion.span>
              ) : (
                <motion.span
                  key="sk"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  SK
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => onNavClick(e, link.id)}
                className={linkClass(link.id)}
                aria-current={active === link.id ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic strength={8}>
              <a
                href={profile.resume}
                download={profile.resumeName}
                className="inline-flex items-center gap-1.5 rounded-full border border-edge/80 bg-paper/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-md transition-colors hover:border-accent2/50 hover:text-accent2 sm:gap-2 sm:px-3.5"
              >
                <span className="sm:hidden">CV</span>
                <span className="hidden sm:inline">Download CV</span>
                <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-edge/80 bg-paper/60 backdrop-blur-md lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="font-mono text-xs">
                {open ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex"
        aria-label="Section progress"
      >
        {stageActs.map((act) => (
          <a
            key={act.id}
            href={`#${act.id}`}
            onClick={(e) => onNavClick(e, act.id)}
            className="pointer-events-auto group flex min-h-6 items-center justify-end gap-2 py-1.5"
            aria-current={active === act.id ? "true" : undefined}
            aria-label={act.name}
            title={act.name}
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-wider transition-opacity ${
                active === act.id
                  ? "text-accent2 opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-70"
              }`}
            >
              {act.name}
            </span>
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                active === act.id
                  ? "w-6 bg-accent2"
                  : "w-2 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </a>
        ))}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex flex-1 flex-col justify-center gap-1">
              {stageActs.map((act, i) => (
                <motion.a
                  key={act.id}
                  href={`#${act.id}`}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: easeOut }}
                  onClick={(e) => onNavClick(e, act.id)}
                  className="flex items-baseline gap-4 border-b border-edge/60 py-4 text-left"
                  aria-current={active === act.id ? "page" : undefined}
                >
                  <span className="font-mono text-xs text-accent2">
                    {act.label}
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-ink">
                    {act.name}
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="cta-solid justify-center bg-gradient-to-r from-accent2 to-accent text-paper"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
