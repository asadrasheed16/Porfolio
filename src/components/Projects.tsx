import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { fallbackProjects } from "../data/fallbackData";

interface Project {
  id: string;
  title: string;
  accent: string;
  type: string;
  description: string;
  tech: string[];
  links: Record<string, string>;
  badge?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => setProjects(Array.isArray(data) ? data : fallbackProjects))
      .catch(() => setProjects(fallbackProjects));
  }, []);

  return (
    <section className="py-24 px-8 overflow-hidden relative" id="projects">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-system-border pb-12 relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl text-accent text-glow uppercase tracking-widest font-display mb-4">
            <span className="opacity-50">///</span> FEATURED_DEPLOYMENTS
          </h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter text-text-primary uppercase font-display">03 TOTAL.</p>
        </div>
        <p className="max-w-md text-sm md:text-base text-text-secondary font-sans uppercase leading-relaxed border-l-2 border-accent pl-4">
          Proprietary systems and open-source contributions architected for high availability and performant logic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <div 
              className="glass-card p-8 flex flex-col gap-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] border-l-4 h-full relative group"
              style={{ borderColor: project.accent, boxShadow: expandedId === project.id ? `0 0 20px ${project.accent}40` : '' }}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              {/* Subtle accent background glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" 
                style={{ backgroundColor: project.accent }} 
              />

              <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-4">
                    <span 
                      className="text-xs px-3 py-1 bg-black/50 border border-system-border rounded-sm font-mono tracking-widest uppercase font-semibold text-text-primary"
                      style={{ borderLeftColor: project.accent, borderLeftWidth: '2px' }}
                    >
                      {project.type}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-wider uppercase text-text-primary drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
              </div>

              <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans relative z-10">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-xs font-mono font-semibold uppercase px-2 py-1 bg-secondary-bg border border-system-border" style={{ color: project.accent }}>
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between relative z-10 border-t border-system-border/50">
                <span className="text-xs font-display tracking-widest uppercase text-accent animate-pulse">
                  {expandedId === project.id ? "COLLAPSE_DATA" : "EXPAND_DATA"}
                </span>
                <ArrowUpRight size={20} className="text-accent group-hover:rotate-45 transition-transform duration-300" />
              </div>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-6 border-t border-system-border mt-4 relative z-10"
                  >
                     <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                           {project.tech.map(t => (
                             <span key={t} className="px-3 py-1 bg-black text-xs font-mono uppercase text-text-primary border border-system-border">
                               {t}
                             </span>
                           ))}
                        </div>
                        <div className="flex gap-6 pt-2">
                           {project.links.github && (
                             <a href={project.links.github} className="text-sm font-display tracking-widest uppercase hover:text-accent flex items-center gap-2 transition-colors text-text-secondary border-b border-transparent hover:border-accent pb-1">
                               <Github size={16}/> REPOSITORY
                             </a>
                           )}
                           {project.links.live && (
                             <a href={project.links.live} className="text-sm font-display tracking-widest uppercase hover:text-accent flex items-center gap-2 transition-colors text-text-secondary border-b border-transparent hover:border-accent pb-1" style={{ color: project.accent }}>
                               <ExternalLink size={16}/> LIVE_DEPLOY
                             </a>
                           )}
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
