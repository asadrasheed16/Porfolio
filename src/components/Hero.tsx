import { motion } from "motion/react";
import { useTypewriter } from "../hooks/useTypewriter";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { magneticEffect } from "../lib/utils";

export default function Hero() {
  const { text } = useTypewriter(
    "Backend Developer. API Architect. Problem Solver.",
    50,
    1000,
  );
  const btnRef1 = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);

  // Served from public folder.
  const devImage = "/profile.png";

  useEffect(() => {
    const cleanup1 = btnRef1.current
      ? magneticEffect(btnRef1.current)
      : undefined;
    const cleanup2 = btnRef2.current
      ? magneticEffect(btnRef2.current)
      : undefined;
    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);

  const name = "ASAD RASHEED";

  return (
    <section className="relative h-screen md:h-[80vh] flex flex-col items-center justify-center overflow-hidden px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-7xl gap-8 items-center h-full">
        <div className="md:col-span-7 relative z-10 order-2 md:order-1">
          <div className="absolute -top-12 -left-4 text-[10px] font-mono text-white/20 rotate-90 origin-left hidden md:block">
            BUILDING THE INFRASTRUCTURE OF THE FUTURE
          </div>
          <h1 className="flex flex-wrap overflow-hidden mb-6">
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="inline-block text-[14vw] md:text-[120px] font-black leading-[0.85] tracking-tighter select-none font-display text-white"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          <div className="h-8 font-mono text-accent text-lg md:text-xl mb-12">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 bg-accent h-6 ml-1 align-middle"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button
              ref={btnRef1}
              className="magnetic-area px-10 py-5 bg-accent text-black font-black uppercase tracking-[0.2em] text-[10px] transition-colors hover:bg-white"
            >
              DEPLOYED_WORK.sh
            </button>
            <button
              ref={btnRef2}
              className="magnetic-area px-10 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[10px] transition-colors hover:bg-white hover:text-black"
            >
              INIT_CONTACT.exe
            </button>
          </div>
        </div>

        <div className="md:col-span-5 h-[400px] md:h-[600px] relative order-1 md:order-2">
          <div className="absolute inset-0 z-0 flex items-center justify-center p-8 md:p-10">
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-visible">
              <img
                src={devImage}
                alt="Asad Rasheed"
                className="relative z-10 w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] w-[52%] h-[8%] rounded-full bg-black/30 blur-lg" />
            </div>
          </div>

          {/* Mobile simplified info */}
          <div className="md:hidden absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm p-4 w-full border-t border-white/10">
            <span className="text-[10px] font-mono text-accent">
              ID 02100 - ASAD RASHEED
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="system-label">Scroll to browse</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={14} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
