"use client";

import { motion } from "framer-motion";
import { Bell, Shield } from "lucide-react";
import Link from "next/link";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { AIPredictionBanner } from "@/components/animations/AIPredictionBanner";

export const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AIPredictionBanner />
      <header className="h-16 glass border-b border-neonPurple/20 px-4 md:px-8 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              transition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            <PixelIcon icon={Shield} color="purple" size={28} />
          </motion.div>
          <h1 className="font-heading text-lg md:text-xl text-neonPurple glow-purple tracking-tighter">
            GigShield
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/history">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-sm bg-white/5 border border-white/10"
            >
              <Bell size={20} className="text-textMuted hover:text-white transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neonPink rounded-full shadow-neonPink animate-pulse" />
            </motion.button>
          </Link>
        </div>
      </header>
    </div>
  );
};
