"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Map, Gem, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const tabs = [
  { id: "home", label: "Home", icon: Home, path: "/dashboard" },
  { id: "map", label: "Risk Map", icon: Map, path: "/map" },
  { id: "plans", label: "Plans", icon: Gem, path: "/plans" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 glass border-t border-neonPurple/20 backdrop-blur-xl flex items-center justify-around px-6 pb-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <button
            key={tab.id}
            onClick={() => router.push(tab.path)}
            className="relative flex flex-col items-center justify-center w-full h-full gap-1 group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "transition-colors duration-300 p-1.5 rounded-sm",
                isActive ? "text-neonPurple" : "text-textMuted group-hover:text-white"
              )}
            >
              <tab.icon size={22} className={cn(isActive && "drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]")} />
            </motion.div>
            
            <span className={cn(
              "text-[9px] uppercase font-heading tracking-tighter transition-colors duration-300",
              isActive ? "text-neonPurple" : "text-textMuted group-hover:text-white"
            )}>
              {tab.label}
            </span>

            {/* Neon Underline */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 w-12 h-[2px] bg-neonPurple shadow-neonPurple"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
