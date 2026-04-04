"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Lock, Shield, Sparkles, Trophy, Zap, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { badges as mockBadges, worker as mockWorker } from "@/data/mockData";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { NeonButton } from "@/components/ui/NeonButton";
import { api } from "@/lib/api";

export const TrustScorePanel = () => {
  const [worker, setWorker] = useState<any>(mockWorker);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.getProfile();
        setWorker({
          ...mockWorker,
          name: profile.name,
          trustScore: profile.trust_score
        });
      } catch (err) {
        console.error("Failed to load profile for TrustScorePanel:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-neonPurple" size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-24 pb-24 md:pb-8 max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
        {/* Big Circular Score */}
        <div className="flex flex-col items-center justify-center relative py-12">
           <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              {/* Rotating Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-neonPurple/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-neonBlue/40 rounded-full"
              />
              
              <div className="text-center relative z-10">
                <motion.span 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="block text-6xl md:text-8xl font-heading text-white glow-white mb-2"
                >
                  {worker.trustScore}
                </motion.span>
                <div className="bg-neonPurple/20 px-3 py-1 border border-neonPurple/50 inline-block">
                  <span className="text-[10px] font-heading text-neonPurple uppercase tracking-tighter">SILVER RANK</span>
                </div>
              </div>
           </div>
           
           <div className="w-full max-w-xs mt-8">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-heading text-textMuted uppercase">Goal: 90 (GOLD)</span>
                 <span className="text-xs font-heading text-neonBlue">{90 - worker.trustScore} XP TO GO</span>
              </div>
              <ProgressBar value={worker.trustScore} max={90} variant="xp" className="h-4" />
           </div>
        </div>
...

        {/* Perks Section */}
        <GlassCard className="h-full flex flex-col justify-center p-8 bg-surface/40 border-neonBlue/20">
           <h3 className="font-heading text-sm text-white mb-6 flex items-center gap-3">
              <Sparkles size={18} className="text-neonBlue" />
              ACTIVE REWARDS
           </h3>
           
           <div className="space-y-4">
              {[
                { label: "Premium reduced by 10%", active: true },
                { label: "Payout in < 30 seconds", active: true },
                { label: "Instant cashback (GOLD ONLY)", active: false },
                { label: "Priority sensor conflict resolution", active: false },
              ].map((perk, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-sm border ${perk.active ? 'border-neonGreen/20 bg-neonGreen/5 text-neonGreen' : 'border-white/5 bg-white/5 text-textMuted opacity-50'}`}>
                   {perk.active ? <Shield size={14} className="fill-current" /> : <Lock size={14} />}
                   <span className="text-xs font-heading tracking-tighter uppercase">{perk.label}</span>
                </div>
              ))}
           </div>
        </GlassCard>
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="font-heading text-sm text-white mb-6 flex items-center gap-3">
          <Trophy size={18} className="text-neonYellow" />
          COLLECTED BADGES
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {mockBadges.map((badge: any) => (
             <motion.div
               key={badge.id}
               whileHover={badge.unlocked ? { y: -5, scale: 1.05 } : {}}
               className="relative"
             >
                <GlassCard className={`${badge.unlocked ? 'border-neonYellow/30 bg-neonYellow/5' : 'opacity-40 grayscale'} text-center p-6 flex flex-col items-center justify-center gap-3`}>
                   <div className="text-4xl mb-2 filter drop-shadow-lg pixelated">
                      {badge.icon}
                   </div>
                   <h4 className="text-[9px] font-heading text-white tracking-tighter uppercase leading-tight line-clamp-1">
                      {badge.name}
                   </h4>
                   {!badge.unlocked && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-sm">
                        <Lock size={20} className="text-white/40" />
                     </div>
                   )}
                </GlassCard>
                
                {badge.unlocked && (
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-neonYellow rounded-full shadow-neonYellow"
                  />
                )}
             </motion.div>
           ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
         <NeonButton variant="purple" size="md" className="w-full md:w-auto font-heading text-[10px]">
            <Award size={14} className="mr-2" /> Share My Shield
         </NeonButton>
         <p className="text-[10px] text-textMuted font-heading uppercase">Current Global Rank: #1,245</p>
      </div>
    </div>
  );
};
