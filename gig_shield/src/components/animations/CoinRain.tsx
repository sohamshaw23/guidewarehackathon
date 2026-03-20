"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Coin {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export const CoinRain = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const newCoins = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1.5,
      size: 4 + Math.random() * 6,
    }));
    setCoins(newCoins);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          initial={{ y: -20, x: `${coin.x}%`, opacity: 1, rotate: 0 }}
          animate={{ 
            y: "110vh", 
            rotate: 360,
            transition: { 
              duration: coin.duration, 
              delay: coin.delay,
              ease: "linear",
              repeat: Infinity
            }
          }}
          style={{
            width: coin.size,
            height: coin.size,
          }}
          className="absolute bg-neonYellow shadow-[0_0_10px_#EAB308] pixelated border border-yellow-600"
        />
      ))}
    </div>
  );
};
