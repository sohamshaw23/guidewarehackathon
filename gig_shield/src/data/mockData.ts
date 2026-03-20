export const worker = {
  name: "Ravi Kumar",
  role: "Delivery Partner",
  city: "Bengaluru",
  zone: "Koramangala",
  trustScore: 78,
  rank: "SILVER",
  earnings: {
    today: 1240,
    week: 6800,
  },
  coverage: {
    active: true,
    amount: 5000,
    plan: "STANDARD",
  },
};

export const disruptionFeed = [
  { id: 1, icon: "🌧", event: "Heavy rainfall detected — Koramangala", amount: "₹450 credited", time: "2 mins ago", status: "paid", color: "blue" },
  { id: 2, icon: "🚨", event: "Curfew alert — Zone 4", amount: "Full day payout ₹800", time: "1 hr ago", status: "paid", color: "pink" },
  { id: 3, icon: "😷", event: "AQI exceeded 300 — Whitefield", amount: "₹300 credited", time: "Yesterday", status: "paid", color: "purple" },
  { id: 4, icon: "⚡", event: "Flash flood warning — Ejipura", amount: "Processing...", time: "Just now", status: "processing", color: "yellow" },
  { id: 5, icon: "🌡️", event: "Heatwave Alert — Electronic City", amount: "₹200 credited", time: "3 hrs ago", status: "paid", color: "orange" },
  { id: 6, icon: "💨", event: "High winds — Indiranagar", amount: "₹150 credited", time: "5 hrs ago", status: "paid", color: "blue" },
];

export const plans = [
  { id: "basic", name: "BASIC", price: "₹20/week", color: "blue", features: ["Rain coverage", "AQI alerts", "₹2,000 max payout"], recommended: false },
  { id: "standard", name: "STANDARD", price: "₹40/week", color: "purple", features: ["All Basic features", "Curfew protection", "₹5,000 max payout", "Priority payout"], recommended: true },
  { id: "premium", name: "PREMIUM", price: "₹70/week", color: "pink", features: ["All Standard features", "Accident cover", "₹12,000 max payout", "Dedicated support", "0% premium after 6 months"], recommended: false },
];

export const badges = [
  { id: 1, name: "Early Bird", icon: "🌅", unlocked: true, description: "Active before 6 AM for 5 days" },
  { id: 2, name: "Rain Warrior", icon: "🌧", unlocked: true, description: "Completed 10 deliveries in rain" },
  { id: 3, name: "Streak: 7 Days", icon: "🔥", unlocked: true, description: "Active for 7 consecutive days" },
  { id: 4, name: "Gold Shield", icon: "🏆", unlocked: false, description: "Reach 90 Trust Score" },
  { id: 5, name: "Zero Claim Month", icon: "⭐", unlocked: false, description: "No disruption claims for 30 days" },
  { id: 6, name: "Referral Pro", icon: "👥", unlocked: false, description: "Refer 3 active gig workers" },
];

export const predictions = [
  "Heavy rain predicted 6PM tomorrow",
  "AQI alert expected — Whitefield",
  "Road flooding risk — HSR Layout",
  "Storm warning — Zone 3",
  "Localized curfew warning — CBD Area",
];

const ZONE_NAMES = ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "BTM Layout", "Jayanagar"];

export const riskZones = Array.from({ length: 30 * 20 }, (_, i) => ({
  id: i,
  risk: (i * 7 + 3) % 5 === 0 ? 2 : (i * 13 + 1) % 4 === 0 ? 1 : 0,
  zone: ZONE_NAMES[i % ZONE_NAMES.length],
  rainfall: ((i * 37) % 100),
  aqi: ((i * 73) % 400),
}));
