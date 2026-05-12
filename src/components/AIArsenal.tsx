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

export default function AIArsenal() {
  const [tools, setTools] = useState<AITool[]>(fallbackAIArsenal);

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
    <section className="py-24 px-8 overflow-hidden relative" id="ai-arsenal">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Ticker */}
        <div className="w-full overflow-hidden border-y border-system-border py-4 mb-24 rotate-[-1deg] bg-secondary-bg/50 backdrop-blur-md">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-sm font-mono tracking-widest text-text-secondary uppercase">
                Exploring // Building // Shipping // 
              </span>
            ))}
          </motion.div>
        </div>

        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-display tracking-widest mb-6 uppercase text-accent text-glow">
            AI_ARSENAL
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-mono text-text-primary uppercase leading-relaxed">
            I don't just use AI tools. I learn how they work and wire them into real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => {
            const Icon = iconMap[tool.icon] || Cpu;
            return (
              <motion.div 
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative h-64 [perspective:1000px] group cursor-pointer"
              >
                <div 
                  className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-card p-6 flex flex-col justify-center items-center gap-4 border border-system-border group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all">
                     <div className="absolute inset-x-0 top-0 h-1 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                     
                     <div className="text-text-secondary drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] transition-colors group-hover:text-accent">
                        <Icon size={48} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-lg md:text-xl font-display tracking-wider text-text-primary uppercase font-semibold mt-2 text-center">{tool.name}</h3>
                     <span className={`text-[10px] md:text-xs px-2 py-1 rounded-sm font-mono uppercase border mt-auto ${
                       tool.status === "In Production" ? "bg-project-green/10 text-project-green border-project-green/50" : 
                       tool.status === "Actively Learning" ? "bg-project-blue/10 text-project-blue border-project-blue/50" : 
                       "bg-project-orange/10 text-project-orange border-project-orange/50"
                     }`}>
                       {tool.status}
                     </span>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#ccff00] p-8 flex flex-col justify-start text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                     <h4 className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest mb-4 opacity-50">HOW I USE THIS</h4>
                     <p className="text-sm md:text-base font-mono font-bold text-black leading-relaxed">
                        {tool.usage}
                     </p>
                     <div className="absolute bottom-6 right-6 text-black opacity-10">
                        <Icon size={32} />
                     </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 pt-12 border-t border-system-border flex flex-col md:flex-row justify-between items-center gap-8 bg-black/40 backdrop-blur-md p-6 rounded-sm">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#00FFFF] animate-pulse" />
              <span className="text-sm md:text-base font-display text-accent uppercase tracking-wider">Awaiting Next-Gen Integration</span>
           </div>
           <div className="text-sm font-mono text-text-secondary uppercase tracking-widest">
              Real-world implementation over hype.
           </div>
        </div>
      </div>
    </section>
  );
}
