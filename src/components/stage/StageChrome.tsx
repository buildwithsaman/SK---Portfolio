import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, profile, stageActs } from "../../data/cv";
import { easeOut } from "../../lib/motion";

export default function StageChrome() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [pastHero, setPastHero] = useState(false);
  const reduceMotion = useReducedMotion();

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
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("main-content");
    if (main) {
      if (open) main.setAttribute("aria-hidden", "true");
      else main.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("aria-hidden");
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
          <button
            type="button"
            onClick={() => go("home")}
            className="relative font-mono text-sm tracking-[0.22em] text-ink transition-colors hover:text-accent2"
            aria-label="Go to stage"
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
          </button>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={`rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors xl:px-3 ${
                  active === link.id
                    ? "bg-white/10 text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 rounded-full border border-edge/80 bg-paper/60 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-md transition-colors hover:border-accent2/50 hover:text-accent2"
            >
              Download CV
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-edge/80 bg-paper/60 backdrop-blur-md lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="font-mono text-xs">
                {open ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop act progress */}
      <nav
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex"
        aria-label="Act progress"
      >
        {stageActs.map((act) => (
          <button
            key={act.id}
            type="button"
            onClick={() => go(act.id)}
            className="pointer-events-auto group flex items-center justify-end gap-2"
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
          </button>
        ))}
      </nav>

      {/* Immersive mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper px-6 pb-10 pt-24 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex flex-1 flex-col justify-center gap-1">
              {stageActs.map((act, i) => (
                <motion.button
                  key={act.id}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: easeOut }}
                  onClick={() => go(act.id)}
                  className="flex items-baseline gap-4 border-b border-edge/60 py-4 text-left"
                >
                  <span className="font-mono text-xs text-accent2">
                    {act.label}
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-ink">
                    {act.name}
                  </span>
                </motion.button>
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
              <a
                href={profile.resume}
                download={profile.resumeName}
                onClick={() => setOpen(false)}
                className="cta-ghost justify-center"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={profile.resume}
        download={profile.resumeName}
        className="pointer-events-auto fixed bottom-6 right-5 z-40 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent2 xl:flex"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Download CV
      </a>
    </>
  );
}
