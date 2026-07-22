import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useMediaQuery from "./hooks/useMediaQuery";

const HeroScene = lazy(() => import("./components/three/HeroScene"));

export default function App() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [customSceneActive, setCustomSceneActive] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const visibleSections = new Set<string>();
    const sections = ["skills", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target.id);
          else visibleSections.delete(entry.target.id);
        });
        setCustomSceneActive(visibleSections.size > 0);
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.12 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="site-grid pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed -left-48 top-[20vh] -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-48 top-[52vh] -z-10 h-[38rem] w-[38rem] rounded-full bg-accent2/10 blur-[130px]" />
      {!reduceMotion && (
        <motion.div
          animate={{ opacity: customSceneActive ? 0 : isMobile ? 0.2 : 0.75 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
      )}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent via-accent2 to-accent3"
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
