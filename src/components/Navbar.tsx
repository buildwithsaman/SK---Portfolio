import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, profile } from "../data/cv";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`relative mx-auto flex w-[calc(100%-2rem)] max-w-6xl items-center justify-end rounded-2xl px-5 py-3 transition-all duration-300 lg:justify-center ${
          scrolled
            ? "glass shadow-lg shadow-slate-900/[0.04]"
            : "border border-transparent bg-white/20 backdrop-blur-sm"
        }`}
      >
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-slate-900/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-8 hidden items-center gap-2 lg:flex">
          <a
            href={profile.resume}
            download={profile.resumeName}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-accent/20 transition-transform hover:scale-[1.03]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download CV
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Let's talk
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white/70 lg:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-4 mt-2 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm ${
                  active === link.id
                    ? "bg-slate-900/[0.06] text-slate-900"
                    : "text-slate-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={profile.resume}
              download={profile.resumeName}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-3 text-sm font-medium text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 12 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
