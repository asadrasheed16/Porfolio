import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollRobot() {
  const { scrollY } = useScroll();
  
  // The legs cycle through a walking animation based on scroll position.
  // Math.sin creates an oscillating value between -1 and 1.
  const leg1Rotate = useTransform(scrollY, (y) => Math.sin(y / 40) * 45);
  const leg2Rotate = useTransform(scrollY, (y) => Math.sin((y / 40) + Math.PI) * 45);
  
  // A slight up-and-down bounce for the body as it "walks"
  const bodyY = useTransform(scrollY, (y) => Math.abs(Math.sin(y / 20)) * -4);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] scale-150">
      
      {/* Robot Antenna */}
      <div className="w-1 h-3 bg-accent animate-pulse"></div>
      <div className="w-2 h-1 bg-accent"></div>

      <motion.div style={{ y: bodyY }} className="flex flex-col items-center">
        {/* Robot Head */}
        <div className="w-8 h-6 bg-black border-[1.5px] border-accent flex items-center justify-center gap-1 relative">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></div>
          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
          
          {/* Scanline overlay for head */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_2px] pointer-events-none"></div>
        </div>

        {/* Robot Body */}
        <div className="w-6 h-8 bg-black border-[1.5px] border-accent mt-[1px] flex flex-col items-center py-1 gap-1">
          <div className="w-3 h-0.5 bg-accent/50"></div>
          <div className="w-3 h-0.5 bg-accent/50"></div>
          <div className="w-3 h-0.5 bg-accent/50"></div>
        </div>
      </motion.div>

      {/* Robot Legs Container */}
      <div className="flex gap-2 -mt-1 relative z-[-1]">
        {/* Left Leg */}
        <motion.div 
          style={{ rotate: leg1Rotate, originY: 0 }} 
          className="w-1.5 h-6 bg-black border-[1px] border-accent"
        />
        {/* Right Leg */}
        <motion.div 
          style={{ rotate: leg2Rotate, originY: 0 }} 
          className="w-1.5 h-6 bg-black border-[1px] border-accent"
        />
      </div>
    </div>
  );
}
