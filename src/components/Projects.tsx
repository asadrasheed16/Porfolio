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
    <section className="py-24 px-8 overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-12">
        <div>
          <h2 className="system-label mb-4">Featured Deployments</h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter">03 TOTAL.</p>
        </div>
        <p className="max-w-xs text-xs text-zinc-500 font-mono uppercase leading-relaxed">
          Proprietary systems and open-source contributions architected for high availability and performant logic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
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
              className="bg-zinc-900 shadow-2xl p-8 flex flex-col gap-6 cursor-pointer transition-all hover:bg-zinc-800 border-l-4 h-full"
              style={{ borderColor: project.accent }}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <span className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-zinc-400">
                      {project.type}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight">
                      {project.title}
                    </h3>
                  </div>
              </div>

              <p className="text-sm text-white/50 leading-relaxed font-light">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] font-mono text-accent/60 uppercase">#{t}</span>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono opacity-20 uppercase">Click to expand</span>
                <ArrowUpRight size={16} className="text-white/20" />
              </div>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-6 border-t border-white/5 mt-4"
                  >
                     <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                           {project.tech.map(t => (
                             <span key={t} className="px-3 py-1 bg-white/5 text-[9px] font-mono uppercase text-zinc-300">
                               {t}
                             </span>
                           ))}
                        </div>
                        <div className="flex gap-4">
                           {project.links.github && (
                             <a href={project.links.github} className="text-[10px] font-mono hover:text-accent flex items-center gap-1"><Github size={12}/> LINK_DOCS.txt</a>
                           )}
                           {project.links.live && (
                             <a href={project.links.live} className="text-[10px] font-mono hover:text-accent flex items-center gap-1"><ExternalLink size={12}/> LIVE_RUN.exe</a>
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
