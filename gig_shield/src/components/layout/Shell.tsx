"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { SimModePanel } from "./SimModePanel";
import { PayoutOverlay } from "@/components/animations/PayoutOverlay";

interface SimulationContextType {
  triggerPayout: (type: "rain" | "aqi" | "curfew", amount: number) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
  return context;
};

export const Shell = ({ children }: { children: ReactNode }) => {
  const [payout, setPayout] = useState<{ type: "rain" | "aqi" | "curfew"; amount: number; isOpen: boolean }>({
    type: "rain",
    amount: 0,
    isOpen: false,
  });

  const triggerPayout = (type: "rain" | "aqi" | "curfew", amount: number) => {
    setPayout({ type, amount, isOpen: true });
  };

  return (
    <SimulationContext.Provider value={{ triggerPayout }}>
      <div className="min-h-screen bg-background text-textPrimary selection:bg-neonPurple/30">
        <TopBar />
        
        <main className="relative z-10">
          {children}
        </main>

        <BottomNav />
        
        <SimModePanel 
          onTriggerRain={() => triggerPayout("rain", 450)}
          onTriggerAQI={() => triggerPayout("aqi", 300)}
          onTriggerCurfew={() => triggerPayout("curfew", 800)}
          onBoostScore={() => alert("Trust Score Boosted +5! (Visual Sync only)")}
          onReset={() => window.location.reload()}
        />

        <PayoutOverlay 
          type={payout.type}
          amount={payout.amount}
          isOpen={payout.isOpen}
          onClose={() => setPayout(p => ({ ...p, isOpen: false }))}
        />
      </div>
    </SimulationContext.Provider>
  );
};
