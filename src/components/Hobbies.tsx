import { motion } from "motion/react";

const hobbies = [
  { name: "Badminton", type: "Agility", icon: "🏸", desc: "Smashing shuttlecocks with +10 Agility." },
  { name: "Chess", type: "Strategy", icon: "♟️", desc: "Calculating 5 moves ahead. Checkmate." },
  { name: "Book Reading", type: "Lore", icon: "📚", desc: "Absorbing ancient knowledge and new skill trees." },
  { name: "Coding", type: "Crafting", icon: "💻", desc: "Building digital artifacts and tools." },
  { name: "Gaming", type: "Recreation", icon: "🎮", desc: "Leveling up in virtual worlds." },
];

export default function Hobbies() {
  return (
    <section className="py-24 px-8 overflow-hidden relative" id="hobbies">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <h2 className="text-2xl md:text-3xl text-accent text-glow uppercase tracking-widest font-display">
            <span className="opacity-50">///</span> INVENTORY_LOG
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-6 relative group cursor-pointer flex flex-col items-center text-center h-full overflow-hidden"
            >
              {/* Neon Glow on Hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-4xl mb-4 p-4 border border-system-border group-hover:border-accent bg-black/50 transition-colors shadow-inner rounded-sm">
                {hobby.icon}
              </div>
              <h3 className="text-accent font-display text-sm md:text-base mb-1 uppercase tracking-wider font-semibold">{hobby.name}</h3>
              <p className="text-xs md:text-sm font-mono text-text-secondary uppercase tracking-widest mb-4">TYPE // {hobby.type}</p>
              
              <div className="mt-auto h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                <p className="text-sm text-text-primary px-2 border-t border-system-border pt-3">
                  {hobby.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
