/**
 * Mock Payout Jobs (In-memory)
 * Replaces BullMQ for demo-ready zero-touch flow.
 */
const EligibilityEngine = require('../services/eligibilityService');
const PayoutService = require('../services/payoutService');
const TrustScoreService = require('../services/trustScoreService');
const db = require('../config/db');

class MockQueue {
    constructor(name) {
        this.name = name;
        console.log(`Initialized Mock Queue: ${name}`);
    }

    async add(jobName, data) {
        console.log(`[Job: ${this.name}] Added: ${jobName}`);
        // Process immediately for demo or with short delay
        setImmediate(() => this.process(data));
    }

    async process(data) {
        if (this.name === 'disruption-check') {
            const { disruptionId } = data;
            const usersRes = await db.query("SELECT user_id FROM policies WHERE status = 'active'");
            for (const user of usersRes.rows) {
                await payoutQueue.add(`payout-user-${user.user_id}`, { userId: user.user_id, disruptionId });
            }
        } else if (this.name === 'payout-process') {
            const { userId, disruptionId } = data;
            const eligibility = await EligibilityEngine.checkEligibility(userId, disruptionId);
            if (eligibility.eligible) {
                await PayoutService.processPayout(userId, disruptionId, eligibility);
                await TrustScoreService.updateScore(userId, 1, 'Successful valid claim');
            }
        }
    }
}

const disruptionQueue = new MockQueue('disruption-check');
const payoutQueue = new MockQueue('payout-process');
const weeklyJobQueue = new MockQueue('weekly-maintenance');

module.exports = {
  disruptionQueue,
  payoutQueue,
  weeklyJobQueue
};
