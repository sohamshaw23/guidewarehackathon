"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { plans } from "@/data/mockData";
import { NeonBadge } from "@/components/ui/NeonBadge";

export const PlanSelection = () => {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  const getPlanIcon = (name: string) => {
    if (name === "PREMIUM") return Crown;
    if (name === "STANDARD") return Shield;
    return Zap;
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-24 pb-24 md:pb-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h2 className="font-heading text-xl md:text-2xl text-white mb-4 glow-white uppercase tracking-tighter">
          Weekly Protection Plans
        </h2>
        <p className="text-sm text-textMuted uppercase font-medium tracking-widest max-w-lg mx-auto leading-relaxed">
          Select a tier to activate parametric coverage. <br/>
          Smart-contract bound. Payouts guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => {
          const Icon = getPlanIcon(plan.name);
          const isSelected = activePlan === plan.id;
          const cardColor = `neon${plan.color.charAt(0).toUpperCase() + plan.color.slice(1)}`;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: plan.recommended ? 1.05 : 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex"
            >
              <GlassCard 
                className={`flex-1 flex flex-col p-8 border-2 ${plan.recommended ? 'border-neonPurple/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-white/10'} transition-all duration-300`}
                hoverGlow={!plan.recommended}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <NeonBadge variant="purple" glow className="py-2 px-4 shadow-neonPurple">
                       <Star size={12} className="mr-2 fill-current" /> MOST POPULAR
                    </NeonBadge>
                  </div>
                )}

                <div className="flex flex-col items-center text-center mb-8">
                   <div className={`p-4 rounded-sm bg-${cardColor}/10 border border-${cardColor}/30 mb-6`}>
                      <Icon size={32} className={`text-${cardColor} drop-shadow-[0_0_8px_rgba(currentcolor,0.5)]`} strokeWidth={2.5} />
                   </div>
                   <h3 className={`font-heading text-lg mb-2 text-${cardColor}`}>{plan.name}</h3>
                   <div className="flex items-baseline gap-1">
                      <span className="font-heading text-2xl text-white tracking-tighter">{plan.price}</span>
                      <span className="text-[10px] text-textMuted font-medium italic">/ week</span>
                   </div>
                </div>

                <div className="flex-1 space-y-4 mb-10">
                   <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                   {plan.features.map((feature, j) => (
                     <div key={j} className="flex items-center gap-3 text-xs text-textMuted group">
                        <Check size={14} className={`text-${cardColor} shrink-0`} />
                        <span className="group-hover:text-white transition-colors">{feature}</span>
                     </div>
                   ))}
                </div>

                <NeonButton
                  variant={plan.color as any}
                  size="lg"
                  className="w-full relative overflow-hidden h-14"
                  onClick={() => setActivePlan(plan.id)}
                  glow={isSelected}
                  pulse={plan.recommended}
                >
                  <motion.div
                    animate={isSelected ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    SELECT PLAN
                  </motion.div>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-neonGreen text-black"
                    >
                      <Check className="mr-2" size={20} /> ACTIVE
                    </motion.div>
                  )}
                </NeonButton>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 p-6 glass border-dashed border-white/20 text-center">
         <p className="text-[10px] font-heading text-textMuted tracking-widest leading-loose">
            *PREMIUM LOCK-IN: FREE FOR 6 MONTHS FOR WORKERS WITH >95 TRUST SCORE. <br/>
            ALL PLANS INCLUDE BLOCKCHAIN DISPUTE RESOLUTION.
         </p>
      </div>
    </div>
  );
};
