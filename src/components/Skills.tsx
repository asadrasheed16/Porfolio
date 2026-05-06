import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { fallbackSkills } from "../data/fallbackData";

interface SkillGroups {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  tools: string[];
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillGroups | null>(fallbackSkills);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load skills");
        return res.json();
      })
      .then((data) => setSkills(data ?? fallbackSkills))
      .catch(() => setSkills(fallbackSkills));
  }, []);

  if (!skills) return null;

  const allSkills = [
    ...skills.languages.map(s => ({ name: s, cat: "languages" })),
    ...skills.frameworks.map(s => ({ name: s, cat: "frameworks" })),
    ...skills.databases.map(s => ({ name: s, cat: "databases" })),
    ...skills.cloud.map(s => ({ name: s, cat: "cloud" })),
    ...skills.tools.map(s => ({ name: s, cat: "tools" }))
  ];

  return (
    <section className="py-24 px-8 overflow-hidden bg-white/[0.02] border-y border-white/5" id="skills">
      <div className="max-w-7xl mx-auto">
        <h2 className="system-label mb-12 text-center">Technical Ecosystem</h2>
        <div 
          ref={containerRef}
          className="relative flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-24"
        >
          {allSkills.map((skill, i) => (
            <motion.div
              key={`${skill.name}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                color: "#E2FF4D", 
                borderColor: "#E2FF4D",
                backgroundColor: "rgba(226, 255, 77, 0.05)"
              }}
              transition={{ delay: i * 0.02 }}
              className="px-6 py-3 border border-white/10 bg-black rounded-sm text-zinc-400 font-black text-sm md:text-lg cursor-default transition-all duration-300 uppercase tracking-tight"
            >
              {skill.name}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-white/10 pt-12">
           {Object.entries(skills).map(([cat, list]) => (
              <div key={cat} className="space-y-4">
                 <h4 className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-30">{cat}</h4>
                 <ul className="space-y-1">
                    {list.map(s => (
                       <li key={s} className="text-sm font-mono opacity-60">{s}</li>
                    ))}
                 </ul>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
