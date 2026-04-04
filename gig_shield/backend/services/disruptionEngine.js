const db = require('../config/db');

class DisruptionEngine {
  /**
   * Triggers a disruption event manually or via sensor data
   */
  static async triggerDisruption(data) {
    const { type, zone, severity, threshold_value, metadata } = data;

    const query = `
      INSERT INTO disruptions (type, zone, severity, threshold_value, metadata)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [type, zone, severity, threshold_value, JSON.stringify(metadata || {})];
    
    const { rows } = await db.query(query, values);
    const disruption = rows[0];

    // After triggering, we would normally add a job to the queue to find affected users
    // This is handled in the Jobs layer, but we can return the disruption record here.
    return disruption;
  }

  static async getActiveDisruptions() {
    const { rows } = await db.query("SELECT * FROM disruptions WHERE status = 'active' ORDER BY created_at DESC");
    return rows;
  }

  static async resolveDisruption(id) {
    const query = "UPDATE disruptions SET status = 'resolved', end_time = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *";
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = DisruptionEngine;
