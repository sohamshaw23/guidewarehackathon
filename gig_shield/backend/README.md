# 🚀 GigShield Backend

AI-powered parametric micro-insurance platform for gig workers.

## 🛠️ Tech Stack
- **Node.js (Express)**: REST API
- **PostgreSQL**: Primary Database
- **Redis**: Background Jobs & Real-time
- **BullMQ**: Automated trigger & payout processing
- **Socket.io**: Real-time disruption alerts

---

## 📁 Project Structure
```
/backend
  /config         # DB & Redis connection
  /controllers    # API logic
  /jobs           # BullMQ workers (Payouts/Disruptions)
  /middlewares    # Auth & Error handling
  /models         # (Service-based architecture used)
  /routes         ### 🚀 Vercel Deployment (One-Click Ready)
The project has been unified! The backend is now integrated into **Next.js API Routes**. You can deploy the entire platform to Vercel as a single unit with **zero additional infrastructure**.

**How to Deploy:**
1.  **Git Push**: Push your code to your GitHub repository linked to Vercel.
2.  **Zero Config**: No environment variables are required for the demo as it uses in-memory mock storage.

---

### 💻 Local Development
```bash
# Install dependencies
npm install

# Run the unified dev server
npm run dev
```
The app will be available at `http://localhost:3000`.

---

---

### 3. Backend Only Configuration
Create a database named `gigshield` in PostgreSQL if you want to run setup manually.
Update `.env` in the `backend` folder:

### 5. Run Server
```bash
npm start
# or for development
npm run dev
```

---

## 🔌 API Endpoints

### Auth
- `POST /auth/register`: Register new gig worker
- `POST /auth/login`: Get JWT token
- `GET /auth/profile`: Get user profile (Protected)

### Policy
- `GET /policy/plans`: List insurance plans
- `POST /policy/activate`: Subscribe to a plan (Protected)
- `GET /policy/status`: Current active policy details (Protected)

### Disruption & Payouts
- `POST /disruption/trigger`: Simulate a disruption (e.g., Heavy Rain in Mumbai)
- `GET /disruption/active`: List current disruptions
- `GET /payout/history`: View processed payouts (Protected)

### Activity
- `POST /activity/update`: Send GPS & order logs (Protected)

---

## 🤖 Phase 2: Automation & ML Protection

### 1. Dynamic ML Pricing
The `PremiumEngine` now integrates `MLService` to adjust weekly premiums:
- **Safe Zone Discount**: ₹2 discount if the worker operates in historically safe zones (e.g., low water-logging risk).
- **Predictive Risk Surcharge**: Dynamic adjustments based on a 7-day predictive weather model (simulated).
- **Trust-Based Pricing**: Direct correlation between `trust_score` and premium discounts.

### 2. Automated Triggers
5 real-time triggers monitor environmental and social factors:
1.  **Rainfall**: Triggers if > 50mm/hr.
2.  **AQI**: Triggers if > 300 (Hazardous).
3.  **Heatwave**: Triggers if temp > 42°C.
4.  **Lockdown/Curfew**: Simulated official alert monitoring.
5.  **Order Drop**: Detects macro-level disruptions in restaurant availability.

### 3. Zero-Touch Claims
When a trigger occurs:
1.  **Detection**: `DisruptionEngine` creates an event.
2.  **Validation**: `EligibilityEngine` checks user location and activity drop (via `MLService`).
3.  **Payout**: `PayoutService` calculates loss and creates a record instantly.
4.  **Notification**: Real-time alert sent via **Socket.io**.
