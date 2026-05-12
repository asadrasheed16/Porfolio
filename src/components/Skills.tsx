import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fallbackSkills } from "../data/fallbackData";

interface SkillGroups {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  tools: string[];
}

// Deterministic random-ish number based on string to generate fake RPG stats
const getStatValue = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const val = Math.abs(hash) % 30;
  return 70 + val; // Returns a value between 70 and 99
};

export default function Skills() {
  const [skills, setSkills] = useState<SkillGroups | null>(fallbackSkills);

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

  return (
    <section className="py-24 px-8 overflow-hidden relative" id="skills">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-system-border pb-4 gap-4">
          <h2 className="text-2xl md:text-3xl text-accent text-glow uppercase tracking-widest font-display">
            <span className="opacity-50">///</span> SYS_CAPABILITIES
          </h2>
          <div className="text-left md:text-right">
            <span className="system-label block">SYS_LEVEL // 99</span>
            <span className="text-text-primary text-sm font-mono tracking-widest">CLASS // FULL_STACK_DEV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([cat, list], catIndex) => (
            list.length > 0 && (
            <motion.div 
              key={cat}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card p-6 border-l-4 border-l-accent relative"
            >
              <h3 className="text-accent font-display text-lg md:text-xl mb-6 uppercase tracking-wider font-semibold">
                {cat}
              </h3>
              
              <div className="space-y-5">
                {list.map((skill, i) => {
                  const stat = getStatValue(skill);
                  return (
                    <div key={skill} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-text-primary font-mono text-sm md:text-base tracking-wider uppercase">{skill}</span>
                        <span className="text-accent font-display text-xs tracking-widest opacity-80">{stat}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-system-border relative overflow-hidden rounded-full">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_10px_#00FFFF]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
