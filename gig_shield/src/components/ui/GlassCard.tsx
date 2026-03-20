"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  animate?: boolean;
  delay?: number;
}

export const GlassCard = ({
  children,
  className,
  hoverGlow = true,
  animate = true,
  delay = 0,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={hoverGlow ? { translateY: -4, borderColor: "rgba(168, 85, 247, 0.8)", boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" } : {}}
      className={cn(
        "glass rounded-sm p-4 relative overflow-hidden transition-colors border border-neonPurple/20",
        className
      )}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
