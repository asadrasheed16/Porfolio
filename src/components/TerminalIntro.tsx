import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TerminalIntroProps {
  onComplete: () => void;
}

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const commands = [
    "> initializing asadrasheed.me...",
    "> loading backend developer...",
    "> stack: [ MERN ]",
    "> 3 projects shipped. 0 excuses.",
    "> launching portfolio..."
  ];

  useEffect(() => {
    if (currentIndex < commands.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, commands[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timeout);
    } else {
      // Small pause after last command before shattering
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] bg-primary-bg flex items-center justify-center p-4"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "circIn" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl font-mono text-accent text-sm md:text-base leading-relaxed"
      >
        <div className="bg-secondary-bg/50 border border-white/10 p-6 rounded-lg shadow-2xl backdrop-blur-md">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              {line}
            </motion.div>
          ))}
          {currentIndex < commands.length && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-2 h-5 bg-accent inline-block align-middle ml-1"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
