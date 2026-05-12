/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

import TerminalIntro from "./components/TerminalIntro";
import ThreeBackground from "./components/ThreeBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AIArsenal from "./components/AIArsenal";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

import Hobbies from "./components/Hobbies";
import CurrentQuest from "./components/CurrentQuest";
import ScrollRobot from "./components/ScrollRobot";

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
    <div className="relative min-h-screen bg-primary-bg selection:bg-accent selection:text-black font-sans">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <TerminalIntro key="intro" onComplete={() => setPhase("portfolio")} />
        ) : (
          <motion.main
             key="portfolio"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="relative z-10 border-4 border-accent min-h-screen flex flex-col scanlines"
          >
            <ScrollRobot />
            <ThreeBackground />
            
            {/* Cyber Header */}
            <header className="flex justify-between items-end p-6 md:p-8 border-b border-system-border bg-secondary-bg/50 backdrop-blur-md">
              <div className="flex flex-col">
                <span className="system-label mb-2">SYSTEM_STATUS // ONLINE</span>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#00FFFF] animate-pulse"></div>
                  <p className="text-base font-display tracking-wider text-text-primary text-glow">USER_AUTHENTICATED</p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <span className="system-label mb-2">CURRENT_OBJ</span>
                <p className="text-base font-display uppercase text-text-primary">SEARCHING_FOR_OPPORTUNITY</p>
              </div>
            </header>

            <div className="flex-grow">
              <Hero />
              <About />
              <Timeline />
              <Projects />
              <Skills />
              <CurrentQuest />
              <Hobbies />
              <AIArsenal />
              <Contact />
            </div>

            {/* Cyber Footer */}
            <footer className="p-8 border-t border-system-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-secondary-bg/80 backdrop-blur-md">
              <div className="md:col-span-4 flex items-center gap-6">
                 <a href="https://github.com/asadrasheed16" target="_blank" rel="noopener noreferrer" className="text-sm font-display hover:text-accent transition-colors text-text-secondary">GITHUB</a>
                 <a href="https://www.linkedin.com/in/asadrasheed-" target="_blank" rel="noopener noreferrer" className="text-sm font-display hover:text-accent transition-colors text-text-secondary">LINKEDIN</a>
                 <a href="https://wa.me/qr/HE3URPPYKPB7C1" target="_blank" rel="noopener noreferrer" className="text-sm font-display hover:text-accent transition-colors text-text-secondary">WHATSAPP</a>
                 <a href="#" className="text-sm font-display hover:text-accent transition-colors text-text-secondary">RESUME</a>
              </div>
              <div className="md:col-span-4 text-center">
                 <p className="system-label">BASE_CAMP // PK</p>
              </div>
              <div className="md:col-span-4 flex justify-end">
                 <button className="cyber-button">INITIATE_CONTACT</button>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
