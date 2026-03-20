import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#12121A",
        surfaceHover: "#1A1A28",
        neonPurple: "#A855F7",
        neonBlue: "#3B82F6",
        neonPink: "#EC4899",
        neonGreen: "#22C55E",
        neonYellow: "#EAB308",
        textPrimary: "#F8FAFC",
        textMuted: "#64748B",
      },
      fontFamily: {
        heading: ["var(--font-press-start-2p)"],
        body: ["var(--font-inter)"],
      },
      boxShadow: {
        neonPurple: "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.2)",
        neonBlue: "0 0 20px rgba(59, 130, 246, 0.5)",
        neonGreen: "0 0 20px rgba(34, 197, 94, 0.5)",
        neonPink: "0 0 20px rgba(236, 72, 153, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
