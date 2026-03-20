"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export const NeonToggle = ({
  enabled,
  onChange,
  className,
}: NeonToggleProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
          enabled ? "bg-neonPurple/40" : "bg-white/10"
        )}
      >
        <span className="sr-only">Toggle Shield</span>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            enabled ? "translate-x-8 shadow-neonPurple bg-white" : "translate-x-0 bg-gray-500"
          )}
        >
          {enabled && (
             <span className="absolute inset-0 rounded-full animate-pulse bg-neonPurple/40" />
          )}
        </motion.span>
        
        {/* Electric Arc Effect (CSS) */}
        {enabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neonBlue/40 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
};
