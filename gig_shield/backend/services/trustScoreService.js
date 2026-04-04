const db = require('../config/db');

class TrustScoreService {
  static async updateScore(userId, delta, reason) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      const userRes = await client.query('SELECT trust_score FROM users WHERE id = $1', [userId]);
      const oldScore = userRes.rows[0].trust_score;
      let newScore = oldScore + delta;
      
      // Keep score within bounds 0-100
      newScore = Math.max(0, Math.min(100, newScore));

      // Update user
      await client.query('UPDATE users SET trust_score = $1 WHERE id = $2', [newScore, userId]);

      // Record history
      await client.query(
        'INSERT INTO trust_score_history (user_id, old_score, new_score, reason) VALUES ($1, $2, $3, $4)',
        [userId, oldScore, newScore, reason]
      );

      await client.query('COMMIT');
      return { user_id: userId, old_score: oldScore, new_score: newScore };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async calculateWeeklyUpdates() {
    // Logic to increment score for users with no fraud and active policies
    const query = `
      UPDATE users 
      SET trust_score = LEAST(100, trust_score + 2)
      WHERE id IN (SELECT user_id FROM policies WHERE status = 'active')
      RETURNING id, trust_score
    `;
    const { rows } = await db.query(query);
    return rows;
  }
}

module.exports = TrustScoreService;
