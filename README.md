# GigShield — AI-Powered Parametric Income Insurance for Food Delivery Partners

<img width="1600" height="397" alt="image" src="https://github.com/user-attachments/assets/35418f4c-87cd-4936-82a3-245a55dca6fb" />

> **Guidewire DEVTrails 2026 | Team Submission — Phase 1**
> Protecting the livelihoods of Zomato & Swiggy delivery partners from uncontrollable external disruptions.

---

<img width="1000" height="1500" alt="image" src="https://github.com/user-attachments/assets/4b0e01fc-7f1e-425d-bc17-4ba7b883875c" />

---
## 📌 Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Our Solution — GigShield](#2-our-solution--gigshield)
3. [Persona & Scenario Walkthroughs](#3-persona--scenario-walkthroughs)
4. [Application Workflow](#4-application-workflow)
5. [Weekly Premium Model](#5-weekly-premium-model)
6. [Parametric Triggers](#6-parametric-triggers)
7. [AI/ML Integration Plan](#7-aiml-integration-plan)
8. [Fraud Detection Architecture](#8-fraud-detection-architecture)
9. [Platform Choice — Web + Mobile](#9-platform-choice--web--mobile)
10. [Tech Stack](#10-tech-stack)
11. [USPs & Differentiators](#11-usps--differentiators)
12. [Development Plan](#12-development-plan)
13. [Constraints Compliance](#13-constraints-compliance)
14. [Adversarial Defense & Anti-Spoofing Strategy](#14-Adversarial-Defense-&-Anti-Spoofing-Strategy)

---

## 1. Problem Statement

India's food delivery ecosystem runs on the backs of millions of gig workers partnered with platforms like **Zomato** and **Swiggy**. These workers earn an average of **₹600–₹1,200/day**, with no fixed salary, no paid leave, and no safety net.

When external disruptions strike — a sudden downpour, a curfew, a severe AQI spike — deliveries halt. Riders are left idle with zero income and zero protection. Studies suggest gig workers lose **20–30% of monthly earnings** to such disruptions, yet no affordable insurance product exists to address this gap.

**GigShield** is built to change that.

---

## 2. Our Solution — GigShield

GigShield is an **AI-powered parametric micro-insurance platform** exclusively designed for food delivery partners (Zomato/Swiggy). It:

- **Automatically detects** disruptions via real-world data feeds (weather, AQI, government alerts)
- **Instantly calculates** income loss based on the worker's actual delivery history
- **Triggers payouts automatically** — no claim forms, no agent visits, zero paperwork
- **Charges weekly premiums** aligned with the gig worker's weekly earnings cycle
- **Rewards reliability** via a Gig Worker Trust Score that lowers premiums over time

> Coverage scope: **Income loss ONLY.** GigShield does not cover health, life, accidents, or vehicle repairs.

---

## 3. Persona & Scenario Walkthroughs

### Primary Persona: Ravi, Food Delivery Partner (Zomato)

- **Location:** Bengaluru, Koramangala zone
- **Average earnings:** ₹900/day, ~₹6,300/week
- **Working hours:** 10 AM – 10 PM
- **Insurance plan:** Standard (₹40/week)

<img width="1554" height="970" alt="image" src="https://github.com/user-attachments/assets/3ebfa397-27b2-4bd8-b397-6a50b9c718e0" />

---

### Scenario A: Heavy Rainfall Disruption

> Monday, 3 PM. IMD rainfall alert issued for Bengaluru — rainfall exceeds 65mm in 3 hours.

1. GigShield's weather trigger fires automatically.
2. System verifies Ravi's GPS is in the affected zone.
3. Ravi's delivery activity drops from ~8 orders/hour to 0.
4. System calculates 4 hours of lost income: ₹900 ÷ 8 working hrs × 4 hrs = **₹450 compensation**.
5. Payout sent to Ravi's UPI within minutes. No action needed from Ravi.

---

### Scenario B: Government Curfew — Civil Unrest

> Friday evening. District Collector issues a curfew order for the zone.

1. GigShield monitors official government alert feeds.
2. Curfew trigger fires for the affected pin codes.
3. All active delivery workers in the zone are covered automatically.
4. Full-day income compensation calculated and disbursed.

---

### Scenario C: Severe AQI Alert (Pollution)

> November, 9 AM. Delhi zone AQI crosses 450 — "Severe" category.

1. AQI data feed breaches the 400 threshold.
2. System flags the zone as disrupted.
3. Ravi, operating in that zone, receives auto-compensation for hours unable to work.
4. Notification sent: *"AQI disruption detected. ₹380 credited to your UPI."*

---

### Scenario D: Supply Chain Disruption — LPG/Restaurant Closures

> City-wide LPG shortage causes 70%+ restaurants to temporarily shut.

1. GigShield monitors delivery order density per zone in real time.
2. If active restaurant availability in a zone drops > 60% for 4+ consecutive hours, disruption is flagged.
3. Workers with low order activity confirmed via GPS stationarity.
4. Partial-day payout triggered proportional to lost working hours.

---

### Scenario E: Half-Day Disruption (Partial Coverage)

> Rainfall stops after 3 hours. Ravi works the remaining 5 hours of his shift.

GigShield supports **granular hourly compensation**:
- Disruption window: 10 AM – 1 PM (3 hours)
- Loss calculated per hour based on average daily earnings
- Partial payout: ₹900 ÷ 8 hrs × 3 hrs = **₹337 compensation**

No other micro-insurance product in India compensates at this granularity.

---

## 4. Application Workflow

```
┌────────────────────────────────────────────────────────────────────┐
│                        WORKER ONBOARDING                           │
│  Register → Verify (Phone + Aadhaar lite) → Link Earnings Profile  │
│  → Select Weekly Plan → Enable GPS & Notifications                 │
└───────────────────────────────┬────────────────────────────────────┘
                                │
┌───────────────────────────────▼────────────────────────────────────┐
│                    WEEKLY POLICY ACTIVATION                        │
│  AI calculates premium based on: zone risk, weather forecast,      │
│  worker's disruption history, and Trust Score                      │
│  → Weekly premium auto-debited (UPI Autopay / wallet)              │
└───────────────────────────────┬────────────────────────────────────┘
                                │
┌───────────────────────────────▼────────────────────────────────────┐
│               REAL-TIME DISRUPTION MONITORING                      │
│  Continuous monitoring of: Weather APIs, AQI feeds,                │
│  Government alert feeds, Delivery order density signals            │
└───────────────────────────────┬────────────────────────────────────┘
                                │
              ┌─────────────────▼──────────────────┐
              │       TRIGGER THRESHOLD MET?       │
              └────────────┬─────────────┬─────────┘
                         YES             NO
                           │              │
       ┌───────────────────▼──┐    ┌──────▼──────────────────┐
       │  FRAUD VALIDATION    │    │  Continue Monitoring    │
       │  GPS check           │    └─────────────────────────┘
       │  Activity anomaly    │
       │  Duplicate check     │
       └───────────┬──────────┘
                   │
       ┌───────────▼──────────────────────────────┐
       │         INCOME LOSS CALCULATION          │
       │  Lost hours × Avg hourly earnings        │
       │  Capped at plan coverage limit           │
       └───────────┬──────────────────────────────┘
                   │
       ┌───────────▼──────────────────────────────┐
       │           INSTANT UPI PAYOUT             │
       │  Worker notified + credited automatically│
       │  Trust Score updated                     │
       └──────────────────────────────────────────┘
```

<img width="1131" height="1600" alt="image" src="https://github.com/user-attachments/assets/3b518657-f6e0-454e-9901-4e9ac23bbfff" />

---

## 5. Weekly Premium Model

GigShield's pricing is structured on a **weekly basis** to match the typical payout cycle of food delivery workers.

### Base Plans

| Plan | Weekly Premium | Max Coverage | Best For |
|------|---------------|--------------|----------|
| Basic | ₹20/week | Up to ₹500 income loss | Occasional riders |
| Standard | ₹40/week | Up to ₹1,200 income loss | Regular full-time riders |
| Premium | ₹70/week | Up to ₹2,500 income loss | High-earning riders in high-risk zones |

### Dynamic Premium Adjustment (AI-Powered)

The base premium is **dynamically adjusted** each week by our AI Risk Engine based on:

| Factor | Premium Impact |
|--------|---------------|
| High flood-risk zone | +₹5 – ₹15/week |
| Worker operates in historically safe zone | -₹2 – ₹8/week |
| Severe weather forecast for next week | +₹3 – ₹10/week |
| High Trust Score (consistent payments, no fraud) | -₹2 – ₹5/week |
| First 4 weeks onboarding discount | -₹5/week |

### Payment Flow

- **UPI Autopay** deducted every Monday morning before the work week begins
- Workers can also pay manually via app wallet
- If payment fails, a 24-hour grace window is provided before coverage lapses
- Coverage is **week-specific** — no rollover of unused coverage

---

## 6. Parametric Triggers

GigShield uses **objective, verifiable, third-party data** to trigger claims — eliminating the need for manual claims entirely.

### Trigger Table

| Category | Trigger Event | Data Source | Threshold | Payout |
|----------|--------------|-------------|-----------|--------|
| **Environmental** | Heavy Rainfall | IMD / OpenWeatherMap API | > 50mm in 3 hrs | Proportional to lost hours |
| **Environmental** | Flood Alert | IMD / NDMA alerts | Official flood warning issued | Full disruption window |
| **Environmental** | Severe AQI / Pollution | CPCB AQI API | AQI > 400 | Proportional to lost hours |
| **Environmental** | Extreme Heatwave | IMD alerts | Temp > 45°C for 4+ hrs | Proportional to lost hours |
| **Environmental** | Cyclone / Storm Alert | IMD official alert | Official warning issued for zone | Full disruption window |
| **Social** | Government Curfew | State Govt. / DM alerts | Official curfew order | Full day compensation |
| **Social** | Transport Strike | News API + delivery density drop | > 50% activity drop + verification | Proportional |
| **Social** | Large-scale Road Blockage | Traffic API | Major arterial roads closed > 4 hrs | Proportional |
| **Infrastructure** | Large-scale Power Outage | DISCOM alerts | Zone blackout > 3 hrs | Proportional |
| **Supply Chain** | Restaurant Closures (e.g., LPG shortage) | Delivery order density monitoring | > 60% restaurant drop in zone for 4+ hrs | Proportional |

### Trigger Validation Logic

A trigger payout requires **all three conditions** to be true:
1. External data source confirms disruption threshold crossed
2. Worker's GPS confirms presence in the affected zone during the disruption window
3. Worker's delivery activity drops significantly (fraud detection cross-check)

<img width="1548" height="494" alt="image" src="https://github.com/user-attachments/assets/426d08c0-76e3-4d2a-a8c7-ed7ff9f7bb6c" />

---

## 7. AI/ML Integration Plan

### 7.1 Risk Assessment & Dynamic Premium Engine

**Model type:** Gradient Boosted Trees (XGBoost) / Regression model

**Input features:**
- Worker's delivery zone (lat/long cluster)
- Historical disruption frequency for that zone (past 12 months)
- IMD 7-day weather forecast for the zone
- Worker's average weekly earnings
- Worker's Trust Score
- Season (monsoon = higher risk multiplier)

**Output:** Personalised weekly premium price

**Training data:** Historical IMD weather data, NDMA disaster records, historical AQI data from CPCB

---

### 7.2 Income Loss Calculation Model

**Logic:**
```
Loss = (Disruption Duration in Hours) × (Worker's Average Hourly Earnings)
     = (Disruption Duration in Hours) × (Avg Daily Earnings ÷ Avg Working Hours/Day)
```

Average earnings are derived from the **last 4 weeks' self-reported + pattern-inferred delivery activity**.

Payout is capped at the worker's chosen plan coverage limit.

---

### 7.3 Gig Worker Trust Score

Scored 0–100, updated weekly. Influences premium discounts and payout speed.

**Score components:**

| Factor | Weightage |
|--------|-----------|
| Premium payment consistency | 35% |
| No fraudulent claim history | 30% |
| GPS location authenticity | 20% |
| Claim behaviour (no suspicious patterns) | 15% |

**Benefits of high Trust Score (75+):**
- Up to ₹5/week premium discount
- Priority payout processing (within minutes vs. hours)
- Access to emergency income advance (future feature)

---

### 7.4 Predictive Disruption Alerting

Using weather forecast APIs and historical disruption data, GigShield will **proactively notify workers** 24–48 hours before a likely disruption event:

> *"Heavy rainfall forecast in your zone tomorrow. Your Standard plan covers up to ₹1,200 if deliveries are halted."*

This improves worker preparedness and trust in the platform.

<img width="1188" height="798" alt="image" src="https://github.com/user-attachments/assets/8f742340-c484-4319-8865-1a356c84810b" />

---

## 8. Fraud Detection Architecture

Since payouts are automatic, fraud detection is critical. GigShield implements a multi-layer fraud prevention system:

### Layer 1: GPS Zone Verification
- Worker must be GPS-located within the disrupted zone during the trigger window
- GPS data is cross-referenced every 15 minutes during active coverage hours
- **GPS spoofing detection:** Mock location apps flagged via sensor data cross-check (accelerometer, network triangulation)

### Layer 2: Activity Anomaly Detection
- Worker's order completion rate is compared to their historical baseline
- A genuine disruption produces a sharp, zone-wide drop in activity (affecting multiple workers)
- A single worker claiming disruption while others in the same zone are active → flagged for review

### Layer 3: Duplicate Claim Prevention
- Each disruption event gets a unique Event ID
- A single worker cannot receive multiple payouts for the same Event ID
- Database check runs before every payout execution

### Layer 4: Behavioural Pattern Analysis
- ML model flags anomalies like:
  - Worker who never operates in a zone suddenly appearing there during a disruption
  - Repeated claims from same worker in low-risk zones
  - Claim filed immediately after plan purchase (waiting period applies: 48 hours)

### Layer 5: Community Validation Signal
- Disruption must be affecting a **minimum threshold of workers in the zone** (e.g., 10+ workers show activity drop)
- Single-worker claims during a non-zone disruption are auto-rejected

<img width="1570" height="1028" alt="image" src="https://github.com/user-attachments/assets/1b1901b3-6c75-4fcd-8a47-85a7eee2b833" />

---

## 9. Platform Choice — Web + Mobile

GigShield will be delivered as both a **Progressive Web App (PWA)** and a **React Native mobile app**.

### Rationale

| Consideration | Decision |
|---------------|----------|
| Gig workers primarily use smartphones | Mobile-first UX |
| Low-end Android devices are common | Lightweight React Native app |
| Insurance admin, analytics, insurer dashboard | Web app for desktop |
| Offline capability for workers in low-connectivity zones | PWA with service workers |

**Worker-facing:** Mobile app (React Native)
**Admin/Insurer dashboard:** Web app (React + Tailwind)

<img width="1412" height="1248" alt="image" src="https://github.com/user-attachments/assets/7fc42a62-3777-4bf9-8098-db7bf478ba6d" />

---

## 10. Tech Stack

### Frontend
- **Mobile App:** React Native (Expo)
- **Web Dashboard:** React.js + Tailwind CSS

### Backend
- **API Server:** Node.js (Express) or Python (FastAPI)
- **Database:** PostgreSQL (structured policy/claims data) + Redis (real-time trigger state)
- **Authentication:** Firebase Auth / OTP-based (phone number)

### AI/ML
- **Premium Engine:** Python (scikit-learn / XGBoost)
- **Fraud Detection:** Isolation Forest + Rule-based anomaly detection
- **Risk Scoring:** Custom regression model trained on public weather + claim frequency data

### Integrations
- **Weather:** OpenWeatherMap API (free tier) / IMD public feeds
- **AQI:** CPCB AQI API (public)
- **Government Alerts:** Mock feed + RSS scraping (NDMA, state DM portals)
- **Payment:** Razorpay test mode (UPI Autopay simulation)
- **Maps/GPS:** Google Maps API / OpenStreetMap

### Infrastructure
- **Hosting:** AWS / Vercel (frontend) + Railway / Render (backend)
- **CI/CD:** GitHub Actions
<img width="531" height="628" alt="Screenshot 2026-03-20 at 6 32 06 PM" src="https://github.com/user-attachments/assets/dd29fef5-af87-461f-81a1-f849ca68a259" />

---

## 11. USPs & Differentiators

###  USP 1: Automated Weekly Premium via UPI Autopay
Workers never forget to renew. Coverage auto-activates every Monday. Industry-standard insurance requires manual renewal — GigShield eliminates this friction entirely for a demographic that is notoriously hard to reach.

###  USP 2: Gig Worker Trust Score
A first-of-its-kind reliability score for gig workers. Consistent premium payers and honest claimants are rewarded with lower premiums — building a loyalty loop that incentivises platform retention.

###  USP 3: Granular Hourly Compensation (Half-Day Coverage)
Most parametric products pay for full-day events only. GigShield calculates compensation **per lost hour** — so a 3-hour rainfall disruption pays proportionally, not a binary all-or-nothing.

###  USP 4: Zero-Touch, Zero-Claim Payout
Workers never file a claim. The disruption is detected, validated, and the payout is credited — all within minutes. Workers are notified by push notification.

###  USP 5: Supply Chain Disruption Coverage
Unique to GigShield — the platform detects systemic supply-side failures (e.g., LPG shortage causing mass restaurant closures) via delivery order density monitoring. No other insurance product covers this.

###  USP 6: Proactive Disruption Alerts
GigShield warns workers 24–48 hours before predicted disruptions, helping them plan their week. This turns the platform from a passive safety net into an active financial planning tool.

---

## 12. Development Plan

### Phase 1 (March 4–20): Ideation & Foundation 
- [x] Problem research and persona definition
- [x] Parametric trigger design and disruption taxonomy
- [x] Weekly pricing model design
- [x] AI/ML architecture planning
- [x] Tech stack selection
- [x] This README

### Phase 2 (March 21 – April 4): Automation & Protection
- [ ] Worker registration & onboarding flow
- [ ] Insurance policy creation UI
- [ ] Weekly premium calculation engine (AI model v1)
- [ ] 3–5 automated disruption triggers (Weather, AQI, Curfew, Power, LPG/Density)
- [ ] Claims management module
- [ ] Mock payment integration (Razorpay test mode)

### Phase 3 (April 5–17): Scale & Optimise
- [ ] Advanced fraud detection (GPS spoofing, anomaly ML model)
- [ ] Instant payout simulation with UPI mock
- [ ] Intelligent dashboards — Worker view + Admin/Insurer view
- [ ] Trust Score system fully integrated
- [ ] Final demo video (5-minute walkthrough)
- [ ] Pitch deck (PDF)

---

## 13. Constraints Compliance

| Constraint | GigShield Compliance |
|------------|---------------------|
| No health insurance coverage |  Strictly excluded |
| No life insurance coverage |  Strictly excluded |
| No accident/medical bill coverage |  Strictly excluded |
| No vehicle repair coverage |  Strictly excluded |
| Weekly pricing model |  All plans priced and structured weekly |
| Income loss only |  All payouts calculated as lost hourly/daily earnings |
| Delivery persona focus |  Food delivery partners (Zomato/Swiggy) only |

---

# 14. Adversarial Defense & Anti-Spoofing Strategy

> **24-Hour Critical Pivot — March 20, 2026**
> In response to the threat report of a 500-worker GPS-spoofing syndicate draining a parametric
> insurance pool, GigShield has hardened its fraud architecture with a 5-layer anti-spoofing
> defense stack. Simple GPS verification is obsolete. Our system does not trust GPS alone.

---

## The Threat Model

A coordinated syndicate operates as follows:
1. Workers organize via private Telegram groups, agreeing on a target disruption event
2. Each member installs a GPS-spoofing application, setting a fake location inside the weather-alert zone
3. All 500 members submit claims simultaneously while sitting safely at home
4. The mass simultaneous claims drain the liquidity pool before any human reviewer can intervene

**The exploit succeeds because** basic parametric systems only verify: (a) that a trigger threshold was crossed, and (b) that the GPS coordinate falls inside the affected zone. Both conditions are trivially faked.

GigShield's defense makes GPS coordinate just one of twelve data signals — and the easiest one to ignore if everything else contradicts it.

---

## 1. Differentiation: Genuine Worker vs. Bad Actor

The core insight is that **physical presence leaves signatures that spoofing apps cannot fake**.

### What a genuinely stranded delivery worker looks like:

| Signal | Genuine Worker | Bad Actor at Home |
|--------|---------------|-------------------|
| **Accelerometer** | Bike/scooter vibration pattern, then sudden stop | Stationary — no motion, horizontal device |
| **Cell tower triangulation** | Cell towers match claimed GPS zone ±300m | Residential towers contradict claimed zone |
| **Pre-event order activity** | Completed 3–8 deliveries in the 2 hours before event | Zero orders today, or account created this week |
| **Route plausibility** | Last 10 GPS pings form a realistic delivery path | GPS teleports — impossible physical movement |
| **Battery drain rate** | Normal | GPS spoof apps drain battery 3× faster — detectable |
| **App environment** | Clean production build | Developer mode enabled, known spoof app signature |
| **Peer confirmation** | Nearby verified workers (independently checked) also show zero orders | Cluster of workers all claim same zone, none have prior activity |

**Decision rule:** A claim requires at least 4 of 7 signals to be consistent. A claim with GPS match but accelerometer=stationary + no prior orders + new account = automatic hold regardless of GPS.

---

## 2. Specific Data Points Beyond GPS

### Layer 1 — Device Sensor Fusion (cannot be faked by GPS apps)
- **Accelerometer & gyroscope:** A moving delivery rider on a bike or scooter produces a characteristic vibration signature. A person sitting at home is flat and stationary. Spoofing apps operate at the OS location layer — they cannot fake IMU sensor data.
- **Network triangulation:** The GigShield SDK cross-references GPS with cell tower IDs and nearby WiFi SSIDs. A worker genuinely in a flooded street in Koramangala will have cell towers registered in Koramangala. A person at home in Whitefield will not.
- **Battery consumption rate:** Known GPS spoofing apps (Fake GPS GO, Hola Fake GPS, etc.) consume battery 2.5–4× faster than normal GPS. An anomalous battery drain during a claim window is a fraud signal.
- **App integrity check:** GigShield SDK checks for developer mode, rooted/jailbroken device status, and the presence of known mock location apps installed on the device.

### Layer 2 — Behavioural Baseline
- **Pre-disruption activity requirement:** To be eligible for a payout, a worker must have completed at least one verified delivery in the 2 hours immediately before the disruption trigger. This eliminates workers who were never working that day.
- **Route plausibility scoring:** The last 10 GPS coordinates before the claim are scored for physical plausibility — speed, direction, and location continuity. A GPS coordinate that "jumps" 8km in 2 minutes scores zero.
- **Historical zone affinity:** GigShield tracks each worker's delivery zone history. A worker who has never operated in a zone but suddenly claims a disruption there is flagged for enhanced review.

### Layer 3 — Coordinated Ring Detection (the syndicate's fatal weakness)
This is our most powerful defence against the specific threat described:

- **Temporal spike analysis:** In a genuine weather disruption, claims arrive gradually over 15–30 minutes as workers discover conditions have worsened. A syndicate attack produces a sharp spike — 400+ claims in under 90 seconds. Our system monitors claims-per-minute per zone. If the rate exceeds 50 claims/minute, a **circuit breaker** fires and all payouts from that zone are auto-paused pending review.
- **Social graph clustering:** If 10 or more claimants share two or more of the following — same residential PIN code, same device model, accounts created in the same week, or same referral code — the cluster is flagged as a coordinated ring. No individual claim is rejected, but the entire cluster is moved to human review simultaneously.
- **Claim timing correlation:** Legitimate workers file claims at different times because they're actually outside and dealing with the situation. Syndicate members, coordinated over Telegram, file within seconds of each other. We calculate the standard deviation of claim timestamps — a very low standard deviation (< 30 seconds across 50+ claims) is a strong ring indicator.

### Layer 4 — Cross-Channel Ground Truth
- **Delivery platform order density signal:** If real deliveries have dropped in a zone, the number of active restaurant orders will also have dropped. GigShield cross-references the claimed disruption zone against aggregated (anonymised) order density from partner data or mock feeds. A worker claiming disruption in a zone that still shows normal order flow is flagged.
- **Hyper-local weather grid matching:** The IMD rainfall API provides data at a ~1km grid resolution. A worker's claimed GPS must fall within a grid cell where the actual measured rainfall exceeds threshold — not just "near" the affected zone. This eliminates workers just outside the zone who try to claim anyway.
- **Peer corroboration:** Genuine disruptions affect multiple workers in the same area independently. If a claimant's 5 nearest active workers (by last known location) all show zero order completions, this is strong corroborating evidence. If the claimant's peers are still completing orders normally, the single claim is suspicious.

---

## 3. UX Balance: Handling Flagged Claims Without Penalising Honest Workers

The hardest problem in anti-fraud design is the **false positive** — an honest worker in a genuine network blackspot who gets flagged and doesn't receive their payout when they need it most.

Our three-tier response system is designed so that **no honest worker waits more than 4 hours** and **no honest worker is penalised for a genuine network issue**.

### Tier 1 — Auto-Approve (Trust Score 75+, Fraud Score < 0.2)
- All 5 layers pass cleanly
- Worker has high trust score from consistent payment and clean claim history
- **Outcome:** Instant UPI payout, no friction, no notification about the check
- *This covers the majority of genuine, established workers*

### Tier 2 — Soft-Hold (Trust Score 40–74, or 1–2 flagged signals)
- Some signals are ambiguous — e.g. network drop caused GPS to stall, making route look implausible
- **Outcome:** 50% of payout released immediately so the worker is not left with nothing
- Remaining 50% released automatically after 4 hours if no further flags emerge
- Worker receives a transparent SMS: *"We're verifying your claim due to network signals in your area. Rs.180 sent now, Rs.180 in 4 hours."*
- Optional: worker can submit one photo to fast-track to full payout
- **The network drop grace period:** If a worker's GPS signal disappeared for up to 30 minutes during the event (consistent with network blackout in bad weather), this is NOT counted as a fraud signal. The system uses the last confirmed location before dropout and the first confirmed location after reconnection.

### Tier 3 — Human Review Queue (Trust Score < 40, or Circuit Breaker triggered)
- Multiple strong fraud signals present, or the claim is part of a detected cluster
- **Outcome:** Claim held, worker notified immediately via push and SMS
- Worker is told clearly: *"Your claim is under review. We aim to resolve this within 2 hours. You have not been penalised and will receive your full payout if verified."*
- Human reviewer targets < 2 hour resolution for all held claims
- **Critical:** If the review confirms the worker is genuine, they receive the full payout PLUS a trust score boost as an apology for the inconvenience
- A worker who has been wrongly held three times and cleared each time is automatically upgraded to Tier 1 permanently

### What We Never Do
- We never reject a claim without human review if the worker has a Trust Score above 50
- We never communicate "fraud suspected" to the worker — we use neutral language about "verification"
- We never apply a Trust Score penalty for a flagged claim that is subsequently cleared
- We never make a worker fill a form to dispute — one tap in the app opens a chat with a reviewer

---

## Circuit Breaker — Syndicate Kill Switch

If a coordinated attack is detected (> 50 claims/minute from a single zone):

1. **Instant:** All pending payouts from that zone are auto-paused
2. **T+30s:** Insurer admin dashboard receives a real-time alert with full cluster map
3. **T+2min:** Admin can one-tap freeze the entire zone or release verified individual claims
4. **Liquidity guard:** No single event-zone combination can consume more than 15% of the weekly liquidity pool — this caps the maximum damage from any attack that does partially succeed
5. **Post-incident:** All claims from the frozen batch go through enhanced manual review. Genuine workers are paid with priority. Confirmed fraudulent accounts are permanently banned and reported.

---

## Summary: Why Our Architecture Is Syndicate-Resistant

The 500-worker GPS spoofing attack described in the threat report fails against GigShield because:

- **GPS alone decides nothing.** It is one of twelve signals, weighted at ~8% of the fraud score.
- **Accelerometer data cannot be faked** by OS-level GPS spoofing apps — it requires hardware modification.
- **The coordinated timing itself is the evidence.** 400 claims in 90 seconds is statistically impossible in a genuine weather event and triggers our circuit breaker before significant funds are disbursed.
- **The social graph gives them away.** Workers who organised via Telegram will likely share residential areas, account creation dates, and device models — all detectable through our cluster analysis.
- **Honest workers are protected by the 3-tier UX system.** A genuine worker with a network issue receives partial payment immediately and full payment within 4 hours, without ever being accused of fraud.

> **The syndicates coordinate. So do we — across twelve data dimensions they cannot all fake simultaneously.**
<img width="1587" height="2245" alt="Untitled design-3" src="https://github.com/user-attachments/assets/828d06b4-abcb-43e6-aeb0-de95786e0d2d" />
---

*GigShield · Adversarial Defense & Anti-Spoofing Strategy · DEVTrails 2026 Phase 1 Pivot*

##  Team - Vibe Coders

-  HANNAH IMTIAZ
-  AYMEN AAMIR
-  SOHAM SHAW
-  KARTIKEY MADAAN
-  DIVVYANSH KUDESIAA

---

##  Links

-  Phase 1 Video: *(Add link)*
-  Repository: *(This repo)*

---

*Built with ❤️ for India's gig workers. DEVTrails 2026.*
