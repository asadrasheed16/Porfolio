/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

import TerminalIntro from "./components/TerminalIntro";
import ThreeBackground from "./components/ThreeBackground";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AIArsenal from "./components/AIArsenal";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

export default function App() {
  const [phase, setPhase] = useState<"intro" | "portfolio">("intro");

  useEffect(() => {
    if (phase === "portfolio") {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [phase]);

  return (
    <div className="relative min-h-screen bg-primary-bg selection:bg-accent selection:text-black">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <TerminalIntro key="intro" onComplete={() => setPhase("portfolio")} />
        ) : (
          <motion.main
             key="portfolio"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="relative z-10 border-4 border-system-border min-h-screen flex flex-col"
          >
            <Cursor />
            <ThreeBackground />
            
            {/* Editorial Header */}
            <header className="flex justify-between items-end p-8 border-b border-border">
              <div className="flex flex-col">
                <span className="system-label mb-2">System Status: Fully Operational</span>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <p className="text-sm font-mono tracking-wider text-text-primary">ASAD_RASHEED.sh — 127.0.0.1:3000</p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <span className="system-label mb-2">Current Availability</span>
                <p className="text-sm font-mono uppercase text-text-primary">Open for internships 2024</p>
              </div>
            </header>

            <div className="flex-grow">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <AIArsenal />
              <Timeline />
              <Contact />
            </div>

            {/* Editorial Footer */}
            <footer className="p-8 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-secondary-bg">
              <div className="md:col-span-4 flex items-center gap-6">
                 <a href="#" className="text-xs font-mono hover:text-accent transition-colors text-text-secondary">GITHUB</a>
                 <a href="#" className="text-xs font-mono hover:text-accent transition-colors text-text-secondary">LINKEDIN</a>
                 <a href="#" className="text-xs font-mono hover:text-accent transition-colors text-text-secondary">RESUME</a>
              </div>
              <div className="md:col-span-4 text-center">
                 <p className="system-label">Located in Pakistan / Serving Globally</p>
              </div>
              <div className="md:col-span-4 flex justify-end">
                 <button className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-black transition-colors">GET_IN_TOUCH.exe</button>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
