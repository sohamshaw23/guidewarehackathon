const DisruptionEngine = require('../services/disruptionEngine');
const { disruptionQueue } = require('../jobs/payoutJobs');

class DisruptionController {
  static async trigger(req, res) {
    try {
      const disruption = await DisruptionEngine.triggerDisruption(req.body);
      
      // Auto-add to processing queue
      await disruptionQueue.add(`check-${disruption.id}`, { disruptionId: disruption.id });

      res.status(201).json({ 
          message: 'Disruption event created and queued for processing', 
          disruption 
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getActive(req, res) {
    try {
      const disruptions = await DisruptionEngine.getActiveDisruptions();
      res.status(200).json(disruptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = DisruptionController;
