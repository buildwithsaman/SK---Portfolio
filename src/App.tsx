import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="relative isolate overflow-x-clip">
      <div className="site-grid pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed -left-48 top-[20vh] -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-48 top-[52vh] -z-10 h-[38rem] w-[38rem] rounded-full bg-accent2/10 blur-[130px]" />
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
