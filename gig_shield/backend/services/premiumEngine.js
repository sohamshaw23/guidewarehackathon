const db = require('../config/db');
const MLService = require('./mlService');

class PremiumEngine {
  /**
   * Calculates adjusted premium using ML-driven risk factors
   * Factors: Zone Risk, Weather Risk, Trust Score, Earnings, ML Predictive Risk
   */
  static async calculatePremium(userId, planId) {
    // 1. Get user data and plan base premium
    const userQuery = 'SELECT trust_score, avg_daily_income, lat, lng FROM users WHERE id = $1';
    const planQuery = 'SELECT name, premium_base FROM plans WHERE id = $1';
    
    const [userRes, planRes] = await Promise.all([
      db.query(userQuery, [userId]),
      db.query(planQuery, [planId])
    ]);

    const user = userRes.rows[0];
    const plan = planRes.rows[0];

    if (!user || !plan) throw new Error('User or Plan not found');

    let basePremium = parseFloat(plan.premium_base);
    
    // 2. ML Predictive factors
    const mlRisk = await MLService.getPredictiveRisk(user.lat, user.lng);
    
    // 3. User factors
    // Trust score discount: 100 trust score = 20% discount
    const trustFactor = 1.2 - (user.trust_score / 100) * 0.4; 
    
    // 4. ML-Driven Adjustments (Phase 2 requirement)
    // Reduce premium if in safe zone, increase if high predictive weather risk
    let mlAdjustment = mlRisk.total_risk_score * 10; // e.g., 0.5 risk = ₹5 surcharge
    if (mlRisk.is_safe_zone) {
        mlAdjustment -= 2; // Flat ₹2 discount for safe zones
    }

    // 5. Final Calculation
    let finalPremium = basePremium * trustFactor + mlAdjustment;
    
    // Safety caps
    finalPremium = Math.max(basePremium * 0.6, Math.min(finalPremium, basePremium * 3.0));

    return {
      base_premium: basePremium,
      adjusted_premium: parseFloat(finalPremium.toFixed(2)),
      factors: {
        trust_factor: trustFactor.toFixed(2),
        ml_predictive_risk: mlRisk.total_risk_score,
        is_safe_zone: mlRisk.is_safe_zone,
        ml_adjustment_amount: mlAdjustment
      }
    };
  }
}

module.exports = PremiumEngine;
