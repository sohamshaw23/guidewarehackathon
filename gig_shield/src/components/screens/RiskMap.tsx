"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, MapPin, CloudRain, AlertTriangle, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";

const GRID_SIZE = { x: 24, y: 16 };

export const RiskMap = () => {
  const [grid, setGrid] = useState<number[]>([]);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Initialize grid
  useEffect(() => {
    const initialGrid = Array.from({ length: GRID_SIZE.x * GRID_SIZE.y }, () => 
      Math.random() > 0.8 ? (Math.random() > 0.5 ? 2 : 1) : 0
    );
    setGrid(initialGrid);

    const interval = setInterval(() => {
      setGrid(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 1) : 0;
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCellColor = (risk: number) => {
    if (risk === 2) return "bg-red-500/40 border-red-500/50 shadow-[inset_0_0_10px_rgba(239,68,68,0.3)]";
    if (risk === 1) return "bg-yellow-500/30 border-yellow-500/40 shadow-[inset_0_0_10px_rgba(234,179,8,0.2)]";
    return "bg-green-500/10 border-green-500/20";
  };

  const getRiskLabel = (risk: number) => {
    if (risk === 2) return "HIGH RISK";
    if (risk === 1) return "MODERATE";
    return "SAFE ZONE";
  };

  const zones = ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "BTM Layout", "Jayanagar", "Domlur", "MG Road"];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-24 pb-24 md:pb-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
           <h2 className="font-heading text-lg text-white mb-2 flex items-center gap-2">
             <MapPin size={22} className="text-neonBlue" />
             LIVE RISK MAP
           </h2>
           <p className="text-xs text-textMuted uppercase tracking-widest">Bengaluru Mission Control · Real-time environmental sync</p>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 p-3 glass border-white/5 bg-black/40 rounded-sm">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/40 border border-red-500 shadow-neonPink" />
              <span className="text-[9px] font-heading text-textMuted">HIGH</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500/30 border border-yellow-500" />
              <span className="text-[9px] font-heading text-textMuted">MODERATE</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/10 border border-green-500" />
              <span className="text-[9px] font-heading text-textMuted">SAFE</span>
           </div>
        </div>
      </div>

      <div className="relative flex-1 bg-black/60 rounded-sm border border-white/5 overflow-hidden min-h-[500px] flex items-center justify-center">
        {/* Background Haze */}
        <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/5 via-transparent to-neonBlue/5 pointer-events-none" />
        
        {/* Grid */}
        <div 
          className="relative z-10 grid gap-1 p-2"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE.x}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE.y}, 1fr)`,
            width: "100%",
            height: "100%",
          }}
        >
          {grid.map((risk, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: 1 }}
              onMouseEnter={(e) => {
                setHoveredCell(i);
                setTooltipPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredCell(null)}
              className={`aspect-square border transition-all duration-500 cursor-crosshair relative group ${getCellColor(risk)}`}
            >
               {/* Location Pin Mock */}
               {i === 155 && (
                 <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 bg-neonPurple rounded-full shadow-neonPurple" />
                    </motion.div>
                    <div className="absolute -top-4 font-heading text-[8px] text-neonPurple whitespace-nowrap glow-purple">YOU</div>
                 </div>
               )}

               {/* Rain Animation on High Risk */}
               {risk === 2 && (
                 <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
                    <motion.div
                      animate={{ y: [0, 20] }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full"
                      style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px)", backgroundSize: "100% 4px" }}
                    />
                 </div>
               )}
            </motion.div>
          ))}
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {hoveredCell !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ 
                position: "fixed",
                left: tooltipPos.x + 20,
                top: tooltipPos.y - 100,
              }}
              className="z-[100] pointer-events-none"
            >
              <GlassCard className={`p-4 min-w-[180px] shadow-2xl ${grid[hoveredCell] === 2 ? 'border-red-500/50' : 'border-neonBlue/30'}`}>
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                   <h4 className="text-[10px] font-heading text-white">{zones[hoveredCell % zones.length]}</h4>
                   <NeonBadge variant={grid[hoveredCell] === 2 ? "pink" : (grid[hoveredCell] === 1 ? "yellow" : "green")}>
                     {getRiskLabel(grid[hoveredCell])}
                   </NeonBadge>
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-[10px]">
                      <span className="text-textMuted flex items-center gap-1"><CloudRain size={10} /> Rainfall</span>
                      <span className="text-white font-bold">{grid[hoveredCell] * 20 + Math.floor(Math.random() * 20)}mm</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px]">
                      <span className="text-textMuted flex items-center gap-1"><AlertTriangle size={10} /> Trigger</span>
                      <span className={`font-bold ${grid[hoveredCell] === 2 ? 'text-neonPink glow-pink' : 'text-textMuted'}`}>
                        {grid[hoveredCell] === 2 ? 'ACTIVE' : 'IDLE'}
                      </span>
                   </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sonar Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <motion.div
             animate={{ scale: [0, 4], opacity: [0.1, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-neonBlue rounded-full"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <GlassCard className="flex items-center gap-4 border-neonBlue/20">
            <div className="p-3 bg-neonBlue/10 rounded-sm">
               <Info className="text-neonBlue" size={24} />
            </div>
            <div>
               <h4 className="text-[10px] font-heading text-white mb-1">REAL-TIME MONITORING</h4>
               <p className="text-xs text-textMuted leading-relaxed">System syncing with IMD & private sensor networks every 30 seconds. Parametric triggers are zone-specific.</p>
            </div>
         </GlassCard>
         <GlassCard className="flex items-center gap-4 border-neonPurple/20">
            <div className="p-3 bg-neonPurple/10 rounded-sm">
               <ShieldCheck className="text-neonPurple" size={24} />
            </div>
            <div>
               <h4 className="text-[10px] font-heading text-white mb-1">PROTECTION STATUS</h4>
               <p className="text-xs text-textMuted leading-relaxed">Your Current Zone: <span className="text-neonPurple">Koramangala</span> is <span className="text-neonGreen">SAFE</span>. No immediate risk detected in your travel radius.</p>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
