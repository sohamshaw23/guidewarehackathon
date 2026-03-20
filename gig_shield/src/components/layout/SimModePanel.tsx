"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, CloudRain, Wind, AlertTriangle, TrendingUp, RotateCcw, X } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";

interface SimModePanelProps {
  onTriggerRain: () => void;
  onTriggerAQI: () => void;
  onTriggerCurfew: () => void;
  onBoostScore: () => void;
  onReset: () => void;
}

export const SimModePanel = ({
  onTriggerRain,
  onTriggerAQI,
  onTriggerCurfew,
  onBoostScore,
  onReset,
}: SimModePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      {/* Simulation Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-neonYellow shadow-neonYellow/50 rounded-sm text-neonYellow font-heading text-[10px] uppercase tracking-wider"
      >
        <FlaskConical size={16} />
        <span>Sim Mode</span>
      </motion.button>

      {/* Simulation Panel Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 md:w-80"
          >
            <GlassCard className="border-neonYellow/40 shadow-neonYellow/20 p-5 bg-black/95">
              <div className="flex items-center justify-between mb-4 border-b border-neonYellow/20 pb-2">
                <h3 className="font-heading text-[10px] text-neonYellow flex items-center gap-2">
                  <FlaskConical size={14} />
                  Disruption Simulator
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-white">
                    <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <NeonButton 
                  variant="blue" 
                  size="sm" 
                  className="justify-start gap-3 border-none shadow-none"
                  onClick={() => { onTriggerRain(); setIsOpen(false); }}
                >
                  <CloudRain size={16} />
                  Trigger Rain Event
                </NeonButton>
                
                <NeonButton 
                  variant="purple" 
                  size="sm" 
                  className="justify-start gap-3 border-none shadow-none"
                  onClick={() => { onTriggerAQI(); setIsOpen(false); }}
                >
                  <Wind size={16} />
                  Trigger AQI Alert
                </NeonButton>

                <NeonButton 
                  variant="pink" 
                  size="sm" 
                  className="justify-start gap-3 border-none shadow-none"
                  onClick={() => { onTriggerCurfew(); setIsOpen(false); }}
                >
                  <AlertTriangle size={16} />
                  Trigger Curfew
                </NeonButton>

                <NeonButton 
                  variant="green" 
                  size="sm" 
                  className="justify-start gap-3 border-none shadow-none"
                  onClick={() => { onBoostScore(); setIsOpen(false); }}
                >
                  <TrendingUp size={16} />
                  Boost Trust Score +5
                </NeonButton>

                <button 
                  onClick={() => { onReset(); setIsOpen(false); }}
                  className="mt-2 flex items-center justify-center gap-2 py-2 text-[10px] font-heading text-textMuted hover:text-white border border-white/10 rounded-sm uppercase transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset All
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
