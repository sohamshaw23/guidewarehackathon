"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "purple" | "blue" | "pink" | "green" | "yellow" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
  pulse?: boolean;
}

export const NeonButton = ({
  children,
  onClick,
  variant = "purple",
  size = "md",
  className,
  glow = true,
  pulse = false,
}: NeonButtonProps) => {
  const variantStyles = {
    purple: "bg-neonPurple text-white shadow-neonPurple hover:bg-neonPurple/80",
    blue: "bg-neonBlue text-white shadow-neonBlue hover:bg-neonBlue/80",
    pink: "bg-neonPink text-white shadow-neonPink hover:bg-neonPink/80",
    green: "bg-neonGreen text-white shadow-neonGreen hover:bg-neonGreen/80",
    yellow: "bg-neonYellow text-black shadow-neonYellow hover:bg-neonYellow/80",
    ghost: "bg-transparent border border-white/20 text-white hover:bg-white/10 shadow-none",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
    xl: "px-10 py-4 text-lg font-heading tracking-wider",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative rounded-sm font-medium transition-all duration-200 uppercase",
        variantStyles[variant],
        sizeStyles[size],
        pulse && "animate-pulse",
        className
      )}
    >
      {/* Ripple Effect Container */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Outer Pulse Ring for specific variants */}
      {pulse && (
        <span className={cn(
          "absolute inset-0 rounded-sm animate-ping opacity-20 pointer-events-none",
          variantStyles[variant].split(" ")[0]
        )} />
      )}
    </motion.button>
  );
};
