"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { disruptionFeed } from "@/data/mockData";
import { NeonBadge } from "@/components/ui/NeonBadge";

export const DisruptionFeed = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-24 pb-24 md:pb-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-8">
        <h2 className="font-heading text-lg text-white mb-2 flex items-center gap-2">
          <Clock size={22} className="text-neonPink" />
          DISRUPTION FEED
        </h2>
        <p className="text-xs text-textMuted uppercase tracking-widest">Historical Event Logs · Automated Verification Chain</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-neonPink via-neonPurple to-transparent shadow-neonPink/20" />

        {/* Feed Items */}
        <div className="space-y-8 pl-8">
          {disruptionFeed.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[27px] top-4 w-4 h-4 rounded-full bg-black border-2 border-neonPink shadow-neonPink z-10">
                 <motion.div
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="w-full h-full rounded-full bg-neonPink/20"
                 />
              </div>

              <GlassCard 
                className={`border-l-4 border-l-neon${item.color.charAt(0).toUpperCase() + item.color.slice(1)} group hover:bg-surfaceHover/50`}
                hoverGlow
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-start gap-4">
                      <div className="text-3xl pixelated">{item.icon}</div>
                      <div>
                         <h4 className="text-sm font-heading text-white mb-2 tracking-tighter">{item.event}</h4>
                         <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[10px] text-textMuted flex items-center gap-1 uppercase">
                               <Clock size={12} /> {item.time}
                            </span>
                            <span className="text-[10px] text-textMuted flex items-center gap-1 uppercase">
                               <MapPin size={12} /> {item.event.split('—')[1]?.trim() || "Dynamic Zone"}
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                      <div className="text-lg font-heading text-neonGreen glow-green tracking-tighter">
                         {item.status === 'paid' ? item.amount : '...'}
                      </div>
                      <div className="flex items-center gap-1.5">
                         {item.status === 'paid' ? (
                           <NeonBadge variant="green" className="text-[9px] px-1.5">
                             <CheckCircle2 size={10} className="mr-1" /> PAID
                           </NeonBadge>
                         ) : (
                           <div className="flex items-center gap-2 text-neonYellow text-[9px] font-heading animate-pulse">
                              <Zap size={10} className="fill-current" /> PROCESSING
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Status Shimmer Effect for Paid Items */}
                {item.status === 'paid' && (
                   <motion.div
                     initial={{ x: "-100%" }}
                     whileInView={{ x: "200%" }}
                     transition={{ duration: 1.5, repeat: 0, delay: 0.5 }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-neonGreen/10 to-transparent pointer-events-none"
                   />
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
         <button className="text-[10px] font-heading text-textMuted hover:text-white uppercase tracking-widest transition-colors flex items-center mx-auto gap-2 group">
            Load Historical Logs
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.span>
         </button>
      </div>
    </div>
  );
};
