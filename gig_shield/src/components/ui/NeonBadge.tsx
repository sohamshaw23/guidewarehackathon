"use client";

import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonBadgeProps {
  children: ReactNode;
  variant?: "purple" | "blue" | "pink" | "green" | "yellow" | "orange";
  className?: string;
  glow?: boolean;
}

export const NeonBadge = ({
  children,
  variant = "blue",
  className,
  glow = true,
}: NeonBadgeProps) => {
  const variantStyles = {
    purple: "bg-neonPurple/20 border-neonPurple text-neonPurple",
    blue: "bg-neonBlue/20 border-neonBlue text-neonBlue",
    pink: "bg-neonPink/20 border-neonPink text-neonPink",
    green: "bg-neonGreen/20 border-neonGreen text-neonGreen",
    yellow: "bg-neonYellow/20 border-neonYellow text-neonYellow",
    orange: "bg-orange-500/20 border-orange-500 text-orange-400",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-shadow duration-300",
      variantStyles[variant],
      glow && "shadow-[0_0_8px_rgba(currentcolor,0.3)]",
      className
    )}>
      {children}
    </span>
  );
};
