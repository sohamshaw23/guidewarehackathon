"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Zap, CloudRain, Wind } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";

const SKYLINE_HEIGHTS = [120,80,160,60,140,90,170,55,130,100,75,150,65,110,85,145,70,135,95,155];
const WINDOW_POSITIONS = [
  { top: 15, left: 25 },
  { top: 45, left: 60 },
  { top: 70, left: 35 },
  { top: 30, left: 75 },
];

export const LandingPage = () => {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const bgY = useTransform(mouseY, [-500, 500], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-[#0A0A0F] overflow-hidden flex flex-col items-center justify-center p-6"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background Grid */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: "linear-gradient(#A855F7 1px, transparent 1px), linear-gradient(90deg, #A855F7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 70%)"
        }} />
      </motion.div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <h1 className="font-heading text-xl text-neonPurple glow-purple tracking-tighter">
          GigShield
        </h1>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tighter"
        >
          <span className="text-white">GIG</span>
          <motion.span 
             animate={{ opacity: [1, 0.8, 1, 0.5, 1], transition: { duration: 2, repeat: Infinity } }}
             className="text-neonPurple glow-purple"
          >
            SHIELD
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-textMuted text-lg md:text-xl font-body max-w-2xl mb-12"
        >
          AI-powered parametric insurance for gig workers. <br className="hidden md:block"/>
          No paperwork. No wait. Instant payouts.
        </motion.p>

        {/* Floating Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 px-4">
          <GlassCard 
            animate 
            delay={0.5} 
            className="md:w-72 border-neonBlue/30 text-left"
            hoverGlow
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neonBlue/20 rounded-sm">
                <CloudRain className="text-neonBlue" size={24} />
              </div>
              <div>
                <p className="text-xs text-textMuted uppercase font-heading mb-1">Live Trigger</p>
                <p className="text-sm text-white leading-relaxed">
                   Rain detected in your zone → <span className="text-neonBlue font-bold">₹450 credited instantly ⚡</span>
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard 
            animate 
            delay={0.7} 
            className="md:w-72 border-neonPink/30 text-left"
            hoverGlow
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neonPink/20 rounded-sm">
                <Wind className="text-neonPink" size={24} />
              </div>
              <div>
                <p className="text-xs text-textMuted uppercase font-heading mb-1">AQI Alert</p>
                <p className="text-sm text-white leading-relaxed">
                   AQI crossed 300 → <span className="text-neonPink font-bold">Payout triggered automatically</span>
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <NeonButton 
            variant="purple" 
            size="xl" 
            pulse 
            onClick={() => router.push("/dashboard")}
            className="group"
          >
            <Zap size={20} className="fill-current group-hover:animate-bounce" />
            Activate Protection
          </NeonButton>
        </motion.div>
      </div>

      {/* Animated Pixel Skyline — deterministic to avoid hydration errors */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none">
        <div className="pixel-skyline absolute bottom-0 w-full flex items-end">
           {SKYLINE_HEIGHTS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 * i, duration: 1 }}
                style={{ 
                  height: `${h}px`,
                  width: `${100 / 20}%`,
                }}
                className="bg-[#12121A] border-t border-x border-white/5 relative"
              >
                {WINDOW_POSITIONS.map((pos, j) => (
                    <motion.div
                      key={j}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2 + j * 0.7, repeat: Infinity }}
                      className="absolute w-1 h-1 bg-neonYellow/60"
                      style={{
                         top: `${pos.top}%`,
                         left: `${pos.left}%`,
                      }}
                    />
                ))}
              </motion.div>
           ))}
        </div>
      </div>

      {/* Footer marquee */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 border-t border-neonPurple/30 flex items-center overflow-hidden z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 text-[10px] font-heading text-neonPurple/50"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>PARAMETRIC · AI-POWERED · INSTANT PAYOUTS · NO PAPERWORK · GIG WORKER FIRST ·</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
