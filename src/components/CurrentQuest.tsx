import { motion } from "motion/react";

export default function CurrentQuest() {
  return (
    <section className="py-24 px-8 overflow-hidden relative" id="quests">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="cyber-panel p-8 relative">
          {/* Cyberpunk Decorative Elements */}
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent"></div>
          <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-accent"></div>

          <h2 className="text-2xl md:text-3xl text-accent text-glow mb-8 flex items-center gap-4 uppercase font-display tracking-widest">
            <span className="w-3 h-3 bg-accent animate-pulse shadow-[0_0_8px_#00FFFF]"></span> ACTIVE_OBJECTIVES
          </h2>

          <div className="space-y-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="border-l-2 border-project-blue pl-6 relative"
            >
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-project-blue shadow-[0_0_8px_#00FFFF]"></div>
              <h3 className="text-project-blue font-display text-lg md:text-xl mb-2 font-semibold tracking-wide">MAIN QUEST: Final Year Project</h3>
              <p className="text-text-primary text-sm md:text-base mb-3 max-w-2xl">
                Objective: Architect and deploy a HIPAA-compliant healthcare platform with AI-integrated OCR and automated pipelines.
              </p>
              <div className="flex gap-3">
                <span className="text-xs bg-project-blue/10 text-project-blue px-3 py-1 uppercase font-display border border-project-blue/50 tracking-wider">Status // IN_PROGRESS</span>
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 uppercase font-display border border-accent/50 tracking-wider">Exp // +5000</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="border-l-2 border-project-orange pl-6 relative"
            >
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-project-orange shadow-[0_0_8px_#FF00FF]"></div>
              <h3 className="text-project-orange font-display text-lg md:text-xl mb-2 font-semibold tracking-wide">SIDE QUEST: 2024-2026 Internships</h3>
              <p className="text-text-primary text-sm md:text-base mb-3 max-w-2xl">
                Objective: Secure a Software Engineering internship to synergize my ambitious roadmap with enterprise scale.
              </p>
              <div className="flex gap-3">
                <span className="text-xs bg-project-orange/10 text-project-orange px-3 py-1 uppercase font-display border border-project-orange/50 tracking-wider">Status // SEARCHING</span>
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 uppercase font-display border border-accent/50 tracking-wider">Reward // PLACEMENT</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-l-2 border-project-green pl-6 relative"
            >
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-project-green shadow-[0_0_8px_#39FF14]"></div>
              <h3 className="text-project-green font-display text-lg md:text-xl mb-2 font-semibold tracking-wide">SIDE QUEST: AI Job Scraper</h3>
              <p className="text-text-primary text-sm md:text-base mb-3 max-w-2xl">
                Objective: Building an intelligent AI-powered scraper to automatically discover, filter, and track top job opportunities.
              </p>
              <div className="flex gap-3">
                <span className="text-xs bg-project-green/10 text-project-green px-3 py-1 uppercase font-display border border-project-green/50 tracking-wider">Status // DEVELOPING</span>
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 uppercase font-display border border-accent/50 tracking-wider">Reward // AUTO_HIRED</span>
              </div>
            </motion.div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
