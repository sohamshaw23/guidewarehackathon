const db = require('../config/db');
const PremiumEngine = require('../services/premiumEngine');

class PolicyController {
  static async getPlans(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM plans ORDER BY id ASC');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async activatePolicy(req, res) {
    try {
      const { plan_id, auto_renew } = req.body;
      const userId = req.user.id;

      // 1. Calculate dynamic premium
      const { adjusted_premium } = await PremiumEngine.calculatePremium(userId, plan_id);

      // 2. Activate policy
      const query = `
        INSERT INTO policies (user_id, plan_id, status, auto_renew, current_premium, start_date, end_date)
        VALUES ($1, $2, 'active', $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days')
        ON CONFLICT (user_id) DO UPDATE SET 
            plan_id = EXCLUDED.plan_id, status = 'active', current_premium = EXCLUDED.current_premium, 
            start_date = CURRENT_TIMESTAMP, end_date = CURRENT_TIMESTAMP + INTERVAL '7 days'
        RETURNING *
      `;
      // Note: Added ON CONFLICT assumption, but schema doesn't have unique constraint. 
      // For demo, let's just insert or manage one active policy per user logic-wise.
      // Better: Update existing inactive or insert new.
      
      const insertQuery = `
        INSERT INTO policies (user_id, plan_id, status, auto_renew, current_premium, start_date, end_date)
        VALUES ($1, $2, 'active', $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days')
        RETURNING *
      `;
      
      const { rows } = await db.query(insertQuery, [userId, plan_id, auto_renew || true, adjusted_premium]);
      res.status(201).json({ message: 'Policy activated successfully', policy: rows[0] });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getPolicyStatus(req, res) {
    try {
      const { rows } = await db.query(
        "SELECT p.*, pl.name as plan_name, pl.coverage_limit FROM policies p JOIN plans pl ON p.plan_id = pl.id WHERE p.user_id = $1 AND p.status = 'active' ORDER BY p.created_at DESC",
        [req.user.id]
      );
      res.status(200).json(rows[0] || { message: 'No active policy' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PolicyController;
