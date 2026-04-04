const PayoutService = require('../services/payoutService');

class PayoutController {
  static async getHistory(req, res) {
    try {
      const payouts = await PayoutService.getUserPayouts(req.user.id);
      res.status(200).json(payouts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PayoutController;
