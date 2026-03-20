"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
  variant?: "xp" | "health" | "energy";
}

export const ProgressBar = ({
  value,
  max,
  label,
  className,
  variant = "xp",
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantGradients = {
    xp: "from-neonPurple via-neonBlue to-neonGreen",
    health: "from-red-500 to-neonPink",
    energy: "from-neonBlue to-cyan-400",
  };

  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <div className="flex justify-between text-[10px] font-heading text-textMuted uppercase tracking-tighter">
          <span>{label}</span>
          <span>{value} / {max}</span>
        </div>
      )}
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={cn(
            "h-full bg-gradient-to-r relative",
            variantGradients[variant]
          )}
        >
          {/* Glowing Tip */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_#fff] opacity-50" />
          
          {/* Animated Shine */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
          />
        </motion.div>
      </div>
    </div>
  );
};
