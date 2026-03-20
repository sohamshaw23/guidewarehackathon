"use client";

import { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PixelIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  color?: "purple" | "blue" | "pink" | "green" | "yellow" | "white";
  glow?: boolean;
}

export const PixelIcon = ({
  icon: Icon,
  size = 24,
  className,
  color = "white",
  glow = true,
}: PixelIconProps) => {
  const colorStyles = {
    purple: "text-neonPurple",
    blue: "text-neonBlue",
    pink: "text-neonPink",
    green: "text-neonGreen",
    yellow: "text-neonYellow",
    white: "text-white",
  };

  const glowStyles = {
    purple: "drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    blue: "drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    pink: "drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]",
    green: "drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]",
    yellow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]",
    white: "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
  };

  return (
    <div className={cn(
      "flex items-center justify-center pixelated",
      colorStyles[color],
      glow && glowStyles[color],
      className
    )}>
      <Icon size={size} strokeWidth={2.5} />
    </div>
  );
};
