import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { fallbackTimeline } from "../data/fallbackData";

interface TimelineItem {
  year: string;
  event: string;
}

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>(fallbackTimeline);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  useEffect(() => {
    fetch("/api/timeline")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load timeline");
        return res.json();
      })
      .then((data) => setTimeline(Array.isArray(data) ? data : fallbackTimeline))
      .catch(() => setTimeline(fallbackTimeline));
  }, []);

  return (
    <section className="py-24 px-4" id="timeline" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-accent uppercase tracking-widest text-sm font-mono mb-24 text-center">Development Journey</h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-text-primary/10" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-accent shadow-[0_0_15px_rgba(226,255,77,0.3)]" 
          />

          <div className="space-y-24">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row text-right" : "flex-row-reverse text-left"}`}
              >
                <div className="flex-1 space-y-2">
                  <span className="text-text-primary font-display text-4xl">{item.year}</span>
                  <p className="text-lg text-text-secondary font-mono">{item.event}</p>
                </div>
                
                <div className="relative z-10 w-4 h-4 rounded-full bg-primary-bg border-4 border-accent shadow-[0_0_10px_rgba(226,255,77,0.2)]" />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
