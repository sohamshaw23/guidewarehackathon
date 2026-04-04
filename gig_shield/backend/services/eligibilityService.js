const db = require('../config/db');
const ActivityService = require('./activityService');

class EligibilityEngine {
  /**
   * Checks if a user is eligible for a payout during a specific disruption
   */
  static async checkEligibility(userId, disruptionId) {
    // 1. Get disruption and user details
    const [disruptionRes, userRes, policyRes] = await Promise.all([
      db.query('SELECT * FROM disruptions WHERE id = $1', [disruptionId]),
      db.query('SELECT * FROM users WHERE id = $1', [userId]),
      db.query("SELECT * FROM policies WHERE user_id = $1 AND status = 'active'", [userId])
    ]);

    const disruption = disruptionRes.rows[0];
    const user = userRes.rows[0];
    const policy = policyRes.rows[0];

    if (!disruption || !user || !policy) {
        return { eligible: false, reason: 'Missing disruption, user, or active policy' };
    }

    // 2. Check duplicate claim
    const claimRes = await db.query(
      'SELECT id FROM payouts WHERE user_id = $1 AND disruption_id = $2',
      [userId, disruptionId]
    );
    if (claimRes.rows.length > 0) {
      return { eligible: false, reason: 'Duplicate claim detected' };
    }

    // 3. Zone check (Mocked distance check)
    // In production, use PostGIS or Haversine distance
    const distLat = Math.abs(user.lat - disruption.metadata?.lat || user.lat);
    const distLng = Math.abs(user.lng - disruption.metadata?.lng || user.lng);
    if (distLat > 0.5 || distLng > 0.5) {
      return { eligible: false, reason: 'Outside affected zone' };
    }

    // 4. Activity drop check
    const recentActivity = await ActivityService.getRecentActivity(userId, 6);
    if (recentActivity.length === 0) {
      return { eligible: false, reason: 'No recent activity detected' };
    }

    const orderAvg = recentActivity.reduce((acc, log) => acc + log.orders_completed, 0) / recentActivity.length;
    // If user is still doing many orders, maybe not eligible (threshold dependent)
    if (orderAvg > 3) {
        return { eligible: false, reason: 'Activity level remains high', orders: orderAvg };
    }

    return { 
        eligible: true, 
        policy_id: policy.id,
        avg_daily_income: user.avg_daily_income,
        working_hours: user.working_hours,
        trust_score: user.trust_score
    };
  }
}

module.exports = EligibilityEngine;
