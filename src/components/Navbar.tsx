import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, profile } from "../data/cv";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo-mark.svg"
      alt="Saman Khan"
      width={40}
      height={40}
      className={`block rounded-xl object-contain shadow-sm ring-1 ring-edge ${className}`}
      decoding="async"
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mobile-nav-shell fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-3.5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 lg:px-5">
        <button
          type="button"
          onClick={() => go("home")}
          className="relative z-10 shrink-0 rounded-xl"
          aria-label="Go to home"
        >
          <LogoMark className="h-11 w-11 lg:h-12 lg:w-12" />
        </button>

        <nav
          className={`relative flex w-fit items-center justify-end rounded-full p-1.5 transition-all duration-300 lg:flex-1 lg:justify-between lg:rounded-2xl lg:px-4 lg:py-2 ${
            scrolled
              ? "glass shadow-panel"
              : "border border-transparent bg-panel/25 backdrop-blur-sm"
          }`}
        >
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active === link.id
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent2 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent"
              aria-label="Contact Me"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-edge bg-panel/80"
            >
              <div className="space-y-1.5" aria-hidden="true">
                <span
                  className={`block h-0.5 w-4 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-4 bg-ink transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-4 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            id="mobile-nav-menu"
            className="mobile-menu-sheet glass mx-4 mt-2 rounded-2xl p-3 lg:hidden"
          >
            <div className="mb-2 flex items-center gap-3 border-b border-edge/70 px-3 pb-3">
              <LogoMark className="h-8 w-8" />
              <div>
                <div className="text-sm font-semibold text-ink">
                  {profile.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  {profile.title}
                </div>
              </div>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm ${
                  active === link.id
                    ? "bg-accent/10 text-ink"
                    : "text-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={profile.resume}
              download={profile.resumeName}
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-2.5 text-sm font-medium text-white"
            >
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="mt-1.5 flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-accent"
            >
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
