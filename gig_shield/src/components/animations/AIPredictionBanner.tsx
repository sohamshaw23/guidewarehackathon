"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { predictions } from "@/data/mockData";
import { NeonButton } from "@/components/ui/NeonButton";

export const AIPredictionBanner = () => {
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrediction((prev) => (prev + 1) % predictions.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="relative overflow-hidden bg-[#12121A] border-b border-neonBlue/30 h-12 flex items-center shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
      >
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)",
              "linear-gradient(90deg, rgba(59,130,246,0.1) 0%, rgba(236,72,153,0.1) 100%)",
              "linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="flex items-center gap-1 bg-neonBlue/20 border border-neonBlue/50 px-2 py-0.5 rounded-sm">
               <Zap size={14} className="text-neonBlue animate-pulse" />
               <span className="text-[10px] font-heading text-neonBlue">AI</span>
             </div>
             
             <motion.p
               key={currentPrediction}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-xs md:text-sm text-textPrimary truncate font-medium"
             >
               {predictions[currentPrediction]}
             </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <NeonButton variant="blue" size="sm" className="hidden border-none shadow-none md:flex py-1 px-4 text-[10px]">
              ACTIVATE
            </NeonButton>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-textMuted hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
