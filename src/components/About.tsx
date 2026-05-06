import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Code2, Server, Database, Globe } from "lucide-react";
import { fallbackAbout } from "../data/fallbackData";

export default function About() {
  const [aboutData, setAboutData] = useState<any>(fallbackAbout);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load about");
        return res.json();
      })
      .then((data) => setAboutData(data ?? fallbackAbout))
      .catch(() => setAboutData(fallbackAbout));
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Statements */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="system-label mb-4">Architectural Philosophy</h2>
              <p className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                {aboutData?.about || "I build the systems that power products. Clean APIs. Solid architecture. Code that ships."}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display text-text-primary">03+</span>
                <span className="text-xs uppercase tracking-widest text-text-secondary opacity-60">Projects Shipped</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display text-text-primary">MERN</span>
                <span className="text-xs uppercase tracking-widest text-text-secondary opacity-60">Primary Stack</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display text-text-primary">24/7</span>
                <span className="text-xs uppercase tracking-widest text-text-secondary opacity-60">Logic First</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Orbit */}
          <div className="lg:col-span-5 relative h-[400px] flex items-center justify-center">
             <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full" />
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="relative w-64 h-64 border border-border rounded-full flex items-center justify-center"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-text-secondary">
                   <Server size={20} />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-text-secondary">
                   <Database size={20} />
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-text-secondary">
                   <Code2 size={20} />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-text-secondary">
                   <Globe size={20} />
                </div>
             </motion.div>
             <div className="z-10 text-[80px] font-display text-text-primary opacity-5 blur-[1px] pointer-events-none">
                BACKEND
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
