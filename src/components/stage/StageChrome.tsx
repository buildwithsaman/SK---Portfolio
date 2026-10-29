import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  Home01Icon,
  Layers01Icon,
  Mail01Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import { navLinks } from "../../data/cv";
import { introAlreadyComplete } from "../../lib/introTiming";
import GooeyNav, { type GooeyNavItem } from "../ui/GooeyNav";

/** Document-order sections mapped onto existing nav items. */
const NAV_SECTIONS: { id: string; nav: string }[] = [
  { id: "home", nav: "home" },
  { id: "highlights", nav: "home" },
  { id: "career", nav: "career" },
  { id: "work", nav: "work" },
  { id: "skills", nav: "skills" },
  { id: "contact", nav: "contact" },
];

const TAB_ICONS: Record<string, ReactNode> = {
  home: <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={1.8} />,
  career: <HugeiconsIcon icon={Briefcase01Icon} size={18} strokeWidth={1.8} />,
  work: <HugeiconsIcon icon={Layers01Icon} size={18} strokeWidth={1.8} />,
  skills: <HugeiconsIcon icon={SourceCodeIcon} size={18} strokeWidth={1.8} />,
  contact: <HugeiconsIcon icon={Mail01Icon} size={18} strokeWidth={1.8} />,
};

function sectionIdFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, "");
  if (id === "about") return "home";
  if (id === "highlights") return "highlights";
  if (navLinks.some((link) => link.id === id)) return id;
  return null;
}

function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  if (id === "home") {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function spySection(): string {
  const marker = window.innerHeight * 0.42;
  let current = "home";
  for (const section of NAV_SECTIONS) {
    const el = document.getElementById(section.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) current = section.nav;
  }
  return current;
}

function sectionReached(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top;
  const marker = window.innerHeight * 0.42;
  return top <= marker && top > -96;
}

export default function StageChrome() {
  const [active, setActive] = useState("home");
  const [hoverNav, setHoverNav] = useState(false);
  const reduceMotion = useReducedMotion();
  const preferSmooth = !reduceMotion;
  const lockRef = useRef<string | null>(null);
  const lockTimer = useRef(0);

  const releaseLock = useCallback(() => {
    window.clearTimeout(lockTimer.current);
    lockRef.current = null;
  }, []);

  const holdActive = useCallback(
    (id: string) => {
      lockRef.current = id;
      setActive(id);
      window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(releaseLock, 1400);
    },
    [releaseLock],
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const measure = () => {
      const locked = lockRef.current;
      if (locked) {
        if (sectionReached(locked) || spySection() === locked) {
          releaseLock();
        } else {
          return;
        }
      }
      setActive(spySection());
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scrollend", releaseLock);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scrollend", releaseLock);
      window.clearTimeout(lockTimer.current);
    };
  }, [releaseLock]);

  useEffect(() => {
    const applyHash = (
      behavior: ScrollBehavior,
      opts?: { homeIfEmpty?: boolean; lock?: boolean },
    ) => {
      const id = sectionIdFromHash(window.location.hash);
      requestAnimationFrame(() => {
        const lock = opts?.lock !== false;
        if (id) {
          if (lock) holdActive(id === "highlights" ? "home" : id);
          scrollToSection(id, behavior);
        } else if (opts?.homeIfEmpty && !window.location.hash) {
          if (lock) holdActive("home");
          scrollToSection("home", behavior);
        }
      });
    };

    const runLanding = () =>
      applyHash("auto", { lock: false, homeIfEmpty: true });
    if (introAlreadyComplete(reduceMotion)) {
      runLanding();
    } else {
      window.addEventListener("stage-intro-done", runLanding, { once: true });
    }

    const behavior = preferSmooth ? "smooth" : "auto";
    const onHashChange = () => applyHash(behavior);
    const onPopState = () => applyHash(behavior, { homeIfEmpty: true });

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("stage-intro-done", runLanding);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
    };
  }, [preferSmooth, holdActive, reduceMotion]);

  const goToSection = useCallback(
    (id: string) => {
      holdActive(id);
      const nextHash = `#${id}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
      scrollToSection(id, preferSmooth ? "smooth" : "auto");
    },
    [preferSmooth, holdActive],
  );

  const tabItems: GooeyNavItem[] = navLinks.map((link) => ({
    label: link.label,
    href: `#${link.id}`,
    icon: TAB_ICONS[link.id],
  }));

  const activeTab = Math.max(
    0,
    navLinks.findIndex((link) => link.id === active),
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2 lg:bottom-auto lg:top-0 lg:pb-2 lg:pt-[max(0.7rem,env(safe-area-inset-top))]">
      <div className="pointer-events-auto w-full max-w-[26.5rem] lg:max-w-[32rem]">
        <GooeyNav
          items={tabItems}
          activeIndex={activeTab}
          theme="dark"
          size="sm"
          frame
          color="#a8a2ff"
          activeTextColor="#02010a"
          colors={["#0d00a4", "#22007c", "#a8a2ff"]}
          particleCount={12}
          spread={40}
          animationTime={560}
          timeVariance={240}
          gooeyness={0.55}
          wobble={0.45}
          hoverEffect={hoverNav}
          className="gooey-nav--app"
          onChange={(_, item) => {
            const id = item.href?.replace(/^#/, "") || "home";
            goToSection(id);
          }}
        />
      </div>
    </div>
  );
}
