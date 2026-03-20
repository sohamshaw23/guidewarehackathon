"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  History, 
  Calendar,
  AlertCircle,
  Map as MapIcon
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { NeonToggle } from "@/components/ui/NeonToggle";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { worker } from "@/data/mockData";

// Count-up component
const CountUp = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const totalDuration = duration * 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration]);
  return <>{count.toLocaleString()}</>;
};

export const Dashboard = () => {
  const [shieldActive, setShieldActive] = useState(worker.coverage.active);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-24 pb-24 md:pb-8 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <GlassCard delay={0.1} className="md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group px-4 py-4">
              <div className="w-24 h-24 rounded-full border-2 border-neonPurple p-1 group-hover:shadow-neonPurple transition-shadow">
                <img 
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Ravi" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full pixelated bg-surface"
                />
              </div>
              <div className="absolute -bottom-2 right-2 bg-neonGreen w-6 h-6 rounded-full border-2 border-surface shadow-neonGreen flex items-center justify-center">
                 <Zap size={12} className="text-black" />
              </div>
            </div>
            
            <h2 className="font-heading text-sm text-white mb-1 uppercase tracking-tighter">
              {worker.name}
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] text-textMuted uppercase tracking-widest">{worker.role}</span>
              <span className="w-1 h-1 bg-textMuted rounded-full" />
              <span className="text-[10px] text-neonBlue uppercase font-bold">{worker.city}</span>
            </div>

            <div className="w-full text-left space-y-4">
               <div>
                 <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[9px] font-heading text-textMuted tracking-tight">TRUST SCORE</span>
                    <span className="text-xl font-heading text-neonGreen shadow-neonGreen">78 <span className="text-xs text-textMuted">/ 100</span></span>
                 </div>
                 <ProgressBar value={78} max={100} variant="xp" />
               </div>
               
               <div className="flex justify-between gap-4 pt-2">
                 <div className="text-center flex-1">
                   <p className="text-[9px] text-textMuted uppercase font-heading">Level</p>
                   <p className="text-sm font-heading text-neonPurple">08</p>
                 </div>
                 <div className="text-center flex-1 border-x border-white/10 px-4">
                   <p className="text-[9px] text-textMuted uppercase font-heading">Rank</p>
                   <p className="text-sm font-heading text-neonBlue">SILVER</p>
                 </div>
                 <div className="text-center flex-1 font-heading text-neonPurple">
                    <p className="text-[9px] text-textMuted uppercase">Streak</p>
                    <p className="text-sm font-heading text-neonPink">07d</p>
                 </div>
               </div>
            </div>
          </div>
        </GlassCard>

        {/* Earnings Card */}
        <GlassCard delay={0.2} className="md:col-span-1 flex flex-col justify-between overflow-hidden group">
           <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-heading text-textMuted uppercase">Today's Earnings</h3>
                <TrendingUp size={16} className="text-neonGreen" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl md:text-4xl font-heading text-white glow-white">₹<CountUp value={worker.earnings.today} /></span>
                <span className="text-xs text-neonGreen font-bold">+12% vs avg</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-neonGreen/10 border border-neonGreen/30 px-3 py-1.5 rounded-sm mb-6">
                <ShieldCheck size={14} className="text-neonGreen" />
                <span className="text-[10px] font-heading text-neonGreen uppercase tracking-tighter">Coverage Active: ₹5,000</span>
              </div>
           </div>

           {/* Mock Sparkline */}
           <div className="h-16 w-full mt-auto flex items-end gap-1">
              {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className="flex-1 bg-neonPurple/20 border-t border-neonPurple group-hover:bg-neonPurple/40 transition-colors"
                />
              ))}
           </div>
        </GlassCard>

        {/* Shield Status Card */}
        <GlassCard delay={0.3} className="md:col-span-1 border-neonPurple/40 flex flex-col items-center justify-center relative">
           {shieldActive && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 m-auto w-24 h-24 border border-neonPurple rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                  transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 m-auto w-24 h-24 border border-neonPurple rounded-full"
                />
              </div>
           )}

           <h3 className="text-[10px] font-heading text-textMuted uppercase mb-6">Shield Status</h3>
           
           <NeonToggle enabled={shieldActive} onChange={setShieldActive} className="mb-6 scale-150" />
           
           <AnimatePresence mode="wait">
             <motion.div
               key={shieldActive ? "active" : "inactive"}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-center"
             >
               {shieldActive ? (
                 <>
                   <div className="flex items-center justify-center gap-2 text-neonPurple font-heading text-[10px] mb-1">
                     <ShieldCheck size={14} />
                     SHIELD ACTIVE
                   </div>
                   <p className="text-[10px] text-textMuted uppercase">Zone: Koramangala 04</p>
                 </>
               ) : (
                 <>
                   <div className="flex items-center justify-center gap-2 text-textMuted font-heading text-[10px] mb-1">
                     <AlertCircle size={14} />
                     SHIELD INACTIVE
                   </div>
                   <p className="text-[10px] text-textMuted uppercase italic">No protection active</p>
                 </>
               )}
             </motion.div>
           </AnimatePresence>
        </GlassCard>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Triggers (mo)", val: 3, icon: Zap, color: "blue" },
          { label: "Paid Out", prefix: "₹", val: 1850, icon: TrendingUp, color: "green" },
          { label: "Days Covered", val: 12, icon: Calendar, color: "purple" },
          { label: "Renewal In", suffix: "d", val: 4, icon: History, color: "pink" },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={0.4 + i * 0.1} className="py-4 border-white/5 hover:border-white/10">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-sm bg-neon${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}/10`}>
                 <stat.icon size={16} className={`text-neon${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}`} />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-heading text-textMuted uppercase tracking-tighter mb-1">{stat.label}</p>
                <p className={`text-sm font-heading text-white`}>
                  {stat.prefix}<CountUp value={stat.val} />{stat.suffix}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Map Preview (Link to full map) */}
      <div className="mt-4">
         <GlassCard className="p-0 border-white/5 overflow-hidden group cursor-pointer" hoverGlow={false}>
            <div className="p-4 flex items-center justify-between border-b border-white/10 bg-white/5">
               <h3 className="font-heading text-[10px] flex items-center gap-2 text-white">
                  <MapIcon size={14} className="text-neonBlue" />
                  Live Risk Map
               </h3>
               <NeonBadge variant="blue" glow>LIVE</NeonBadge>
            </div>
            <div className="h-32 bg-surface flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ 
                 backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)",
                 backgroundSize: "20px 20px"
               }} />
               <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="relative z-10 font-heading text-[10px] text-neonBlue text-center group-hover:scale-110 transition-transform"
               >
                 ENTER MISSION CONTROL MAP
                 <div className="h-[2px] w-full bg-neonBlue mt-1 shadow-neonBlue" />
               </motion.div>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
