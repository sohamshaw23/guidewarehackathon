const db = require('../config/db');

class PayoutService {
  /**
   * Calculates income loss and creates payout record
   * formula: loss = disruption_hours × (avg_daily_income / working_hours)
   */
  static async processPayout(userId, disruptionId, eligibilityData) {
    const { policy_id, avg_daily_income, working_hours, trust_score } = eligibilityData;

    // 1. Get disruption duration (mocked or calculated)
    const disruptionRes = await db.query('SELECT start_time, end_time FROM disruptions WHERE id = $1', [disruptionId]);
    const { start_time, end_time } = disruptionRes.rows[0];

    const start = new Date(start_time);
    const end = end_time ? new Date(end_time) : new Date(); // use current time if still active
    const durationHours = Math.max(0.5, (end - start) / (1000 * 60 * 60));

    // 2. Calculate Payout
    const hourlyRate = parseFloat(avg_daily_income) / parseFloat(working_hours);
    let amount = durationHours * hourlyRate;

    // 3. Trust score bonus/adjustment
    const trustMultiplier = trust_score >= 90 ? 1.1 : 1.0;
    amount = amount * trustMultiplier;

    // 4. Cap by plan limit
    const planRes = await db.query(
        'SELECT coverage_limit FROM plans p JOIN policies pol ON p.id = pol.plan_id WHERE pol.id = $1',
        [policy_id]
    );
    const limit = parseFloat(planRes.rows[0].coverage_limit);
    finalAmount = Math.min(amount, limit);

    // 5. Create Payout record
    const query = `
      INSERT INTO payouts (user_id, disruption_id, policy_id, amount, loss_hours, status, transaction_ref, processed_at)
      VALUES ($1, $2, $3, $4, $5, 'paid', $6, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const transRef = `GS-TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const values = [userId, disruptionId, policy_id, finalAmount.toFixed(2), durationHours.toFixed(2), transRef];
    
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getUserPayouts(userId) {
    const { rows } = await db.query(
        'SELECT p.*, d.type as disruption_type FROM payouts p JOIN disruptions d ON p.disruption_id = d.id WHERE p.user_id = $1 ORDER BY p.created_at DESC',
        [userId]
    );
    return rows;
  }
}

module.exports = PayoutService;
