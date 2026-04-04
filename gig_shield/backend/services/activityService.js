const db = require('../config/db');

class ActivityService {
  static async recordActivity(userId, lat, lng, orders_completed) {
    const query = `
      INSERT INTO activity_logs (user_id, lat, lng, orders_completed)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, lat, lng, orders_completed || 0];
    
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getRecentActivity(userId, hours = 4) {
    const query = `
      SELECT * FROM activity_logs 
      WHERE user_id = $1 
      AND timestamp >= (CURRENT_TIMESTAMP - INTERVAL '${hours} hours')
      ORDER BY timestamp DESC
    `;
    const { rows } = await db.query(query, [userId]);
    return rows;
  }
  
  static async getUserSummary(userId) {
      const query = `
        SELECT 
            COUNT(*) as total_pings, 
            SUM(orders_completed) as total_orders,
            MAX(timestamp) as last_seen
        FROM activity_logs 
        WHERE user_id = $1 
        AND timestamp >= CURRENT_DATE
      `;
      const { rows } = await db.query(query, [userId]);
      return rows[0];
  }
}

module.exports = ActivityService;
