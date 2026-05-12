import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Copy, Check, MessageCircle } from "lucide-react";
import { fallbackContact } from "../data/fallbackData";

export default function Contact() {
  const [data, setData] = useState<any>(fallbackContact);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contact");
        return res.json();
      })
      .then((d) => setData(d ?? fallbackContact))
      .catch(() => setData(fallbackContact));
  }, []);

  const copyToClipboard = () => {
    if (data?.email) {
      navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4" id="contact">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-xs uppercase tracking-[0.3em] font-mono opacity-50">Available for internships</span>
        </motion.div>

        <h2 className="text-[12vw] sm:text-[10vw] font-black leading-[0.8] tracking-tighter hover:text-accent transition-colors duration-500 uppercase">
           LET'S<br/>BUILD.
        </h2>

        <div className="group relative inline-block">
          <button 
            onClick={copyToClipboard}
            className="text-xl md:text-4xl font-mono border-b-4 border-accent/20 pb-4 hover:border-accent transition-all flex items-center gap-4 uppercase tracking-tighter"
          >
            {data?.email || "asadrasheeddev@gmail.com"}
            <span className="text-accent transition-transform group-hover:scale-125">
               {copied ? <Check size={32} /> : <Copy size={32} />}
            </span>
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-accent"
              >
                Copied to clipboard
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4 sm:gap-8 justify-center pt-12">
           <a href={data?.github} target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-full hover:bg-accent hover:text-black transition-all">
              <Github size={24} />
           </a>
           <a href={data?.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-full hover:bg-accent hover:text-black transition-all">
              <Linkedin size={24} />
           </a>
           <a href={`mailto:${data?.email}`} className="p-4 glass-card rounded-full hover:bg-accent hover:text-black transition-all">
              <Mail size={24} />
           </a>
           {data?.whatsapp && (
             <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-full hover:bg-green-500 hover:text-black transition-all">
                <MessageCircle size={24} />
             </a>
           )}
        </div>
      </div>

      <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.4em] font-mono opacity-20">
         © 2024-2026 ASAD RASHEED · ARCHITECTING THE BACKEND
      </div>
    </section>
  );
}
