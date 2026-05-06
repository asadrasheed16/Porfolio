import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Activity, 
  Zap, 
  Link as LinkIcon, 
  BrainCircuit, 
  Bot, 
  Sparkles, 
  Terminal,
  LucideIcon 
} from "lucide-react";
import { fallbackAIArsenal } from "../data/fallbackData";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Activity,
  Zap,
  Link: LinkIcon,
  BrainCircuit,
  Bot,
  Sparkles,
  Terminal
};

interface AITool {
  name: string;
  usage: string;
  status: string;
  icon: string;
}

function GlitchText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+<>?:{}|[]";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("")
          .map((char, index) => {
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      iteration += 1 / 3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

export default function AIArsenal() {
  const [tools, setTools] = useState<AITool[]>(fallbackAIArsenal);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/ai-arsenal")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load AI arsenal");
        return res.json();
      })
      .then((data) => setTools(Array.isArray(data) ? data : fallbackAIArsenal))
      .catch(() => setTools(fallbackAIArsenal));
  }, []);

  return (
    <section className="py-24 px-8 overflow-hidden bg-white/[0.05]" id="ai-arsenal">
      <div className="max-w-7xl mx-auto">
        
        {/* Ticker */}
        <div className="w-full overflow-hidden border-y border-border py-4 mb-24 rotate-[-1deg]">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-[10px] font-mono tracking-[0.5em] text-text-secondary/30 uppercase">
                Exploring · Building · Shipping · 
              </span>
            ))}
          </motion.div>
        </div>

        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase text-text-primary">
            <GlitchText text="AI ARSENAL" />
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base font-mono text-text-secondary uppercase leading-relaxed">
            I don't just use AI tools. I learn how they work and wire them into real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => {
            const Icon = iconMap[tool.icon] || Cpu;
            return (
              <div 
                key={tool.name}
                className="group relative h-64 [perspective:1000px]"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div 
                  className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${hoveredIndex === i ? "[transform:rotateY(180deg)]" : ""}`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-card p-8 flex flex-col items-center justify-center gap-6 border-border overflow-hidden">
                     {/* Pulse Border */}
                     <div className="absolute inset-x-0 top-0 h-[2px] bg-accent/30 animate-[pulse_2s_infinite]" />
                     
                     <div className="text-text-secondary transition-colors group-hover:text-accent">
                        <Icon size={40} strokeWidth={1.5} />
                     </div>
                     
                     <div className="text-center">
                        <h3 className="text-lg font-black tracking-tight mb-2 text-text-primary">{tool.name}</h3>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold ${
                          tool.status === "In Production" ? "bg-green-500/20 text-green-400" : 
                          tool.status === "Actively Learning" ? "bg-blue-500/20 text-blue-400" : 
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {tool.status}
                        </span>
                     </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent p-8 flex flex-col justify-center gap-4 text-black border border-accent">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60">How I use this</h4>
                     <p className="text-sm font-mono leading-relaxed font-bold">
                        {tool.usage}
                     </p>
                     <div className="absolute bottom-6 right-6">
                        <Icon size={24} className="opacity-20" />
                     </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-mono opacity-40 uppercase">Awaiting Next-Gen Integration</span>
           </div>
           <div className="text-[10px] font-mono opacity-20 uppercase tracking-[0.2em]">
              Real-world implementation over hype.
           </div>
        </div>
      </div>
    </section>
  );
}
