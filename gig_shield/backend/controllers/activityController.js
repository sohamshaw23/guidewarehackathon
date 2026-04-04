const ActivityService = require('../services/activityService');

class ActivityController {
  static async update(req, res) {
    try {
      const { lat, lng, orders_completed } = req.body;
      const activity = await ActivityService.recordActivity(req.user.id, lat, lng, orders_completed);
      res.status(201).json({ message: 'Activity recorded', activity });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getSummary(req, res) {
    try {
      const summary = await ActivityService.getUserSummary(req.user.id);
      res.status(200).json(summary);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ActivityController;
