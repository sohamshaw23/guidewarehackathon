"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, CheckCircle } from "lucide-react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { CoinRain } from "./CoinRain";

interface PayoutOverlayProps {
  type: "rain" | "aqi" | "curfew";
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig = {
  rain: { title: "HEAVY RAINFALL DETECTED", icon: Shield, subtext: "68mm Rainfall in Koramangala", color: "blue" },
  aqi: { title: "CRITICAL AQI ALERT", icon: Shield, subtext: "AQI exceeded 300 in Whitefield", color: "purple" },
  curfew: { title: "ZONE RESTRICTION ACTIVE", icon: Shield, subtext: "Curfew triggered in Zone 4", color: "pink" },
};

export const PayoutOverlay = ({ type, amount, isOpen, onClose }: PayoutOverlayProps) => {
  const [showText, setShowText] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const config = typeConfig[type];

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setShowText(true), 800);
      const timer2 = setTimeout(() => setShowConfetti(true), 1200);
      const timer3 = setTimeout(() => {
        onClose();
        setShowText(false);
        setShowConfetti(false);
      }, 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
        {/* Flash Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-neonBlue/20 shadow-[inset_0_0_100px_rgba(59,130,246,0.5)]"
        />

        {/* Backdrop */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.9 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 bg-black"
        />

        {/* Coin Rain */}
        <CoinRain />

        {/* Central Card */}
        <motion.div
          initial={{ y: -500, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10 w-full max-w-md px-6 pointer-events-auto"
        >
          <GlassCard className="text-center p-8 border-2 border-white/20 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
            >
              <PixelIcon icon={config.icon} color="yellow" size={48} />
            </motion.div>

            <motion.h2 
              className="font-heading text-xl md:text-2xl text-neonPurple glow-purple mb-4"
            >
              TRIGGER ACTIVATED
            </motion.h2>

            <p className="text-textMuted text-sm uppercase font-medium tracking-widest mb-8">
              {config.subtext}
            </p>

            <div className="h-16 flex items-center justify-center mb-6">
              <AnimatePresence>
                {showText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-3xl md:text-4xl font-heading text-neonGreen shadow-neonGreen flex items-center gap-2">
                       ₹{amount} <Zap size={24} className="fill-current" />
                    </span>
                    <span className="text-[10px] font-heading text-neonGreen mt-2 uppercase">
                      Credited via UPI
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {showConfetti && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex items-center justify-center gap-2 text-neonGreen"
               >
                 <CheckCircle size={16} />
                 <span className="text-xs font-heading">PAYOUT SUCCESSFUL</span>
               </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
