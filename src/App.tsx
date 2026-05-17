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
            <header className="border-b border-system-border bg-secondary-bg/50 backdrop-blur-md">
              {/* Top status bar */}
              <div className="flex justify-between items-center px-6 md:px-8 pt-4 pb-3 border-b border-system-border/40">
                <div className="flex flex-col">
                  <span className="system-label mb-1">SYSTEM_STATUS // ONLINE</span>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#00FFFF] animate-pulse"></div>
                    <p className="text-sm font-display tracking-wider text-text-primary text-glow">USER_AUTHENTICATED</p>
                  </div>
                  {/* Asad.exe brand */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="font-display text-2xl md:text-3xl font-bold tracking-widest uppercase"
                      style={{
                        color: "#00FFFF",
                        textShadow: "0 0 12px #00FFFF, 0 0 30px #00FFFF55",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Asad
                    </span>
                    <span
                      className="font-display text-2xl md:text-3xl font-bold tracking-widest uppercase"
                      style={{
                        color: "#FF00FF",
                        textShadow: "0 0 12px #FF00FF, 0 0 30px #FF00FF55",
                        letterSpacing: "0.1em",
                      }}
                    >
                      .exe
                    </span>
                    <span
                      className="font-display text-2xl md:text-3xl font-bold animate-pulse"
                      style={{ color: "#00FFFF", textShadow: "0 0 8px #00FFFF" }}
                    >
                      _
                    </span>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <span className="system-label mb-2">CURRENT_OBJ</span>
                  <p className="text-base font-display uppercase text-text-primary">SEARCHING_FOR_OPPORTUNITY</p>
                </div>
              </div>

              {/* Navigation Bar */}
              <nav className="flex items-center justify-center md:justify-start gap-1 md:gap-2 px-4 md:px-8 py-2 overflow-x-auto">
                {[
                  { label: "// ABOUT",     href: "#about"     },
                  { label: "// TIMELINE",  href: "#timeline"  },
                  { label: "// PROJECTS",  href: "#projects"  },
                  { label: "// SKILLS",    href: "#skills"    },
                  { label: "// QUEST",     href: "#quests"    },
                  { label: "// AI_ARSENAL",href: "#ai-arsenal"},
                  { label: "// CONTACT",   href: "#contact"   },
                ].map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="relative group px-3 py-1.5 font-display text-xs tracking-widest text-text-secondary uppercase transition-all duration-200 hover:text-accent whitespace-nowrap"
                    style={{ textShadow: "none" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.textShadow = "0 0 8px #00FFFF";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.textShadow = "none";
                    }}
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>
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
