const DisruptionEngine = require('./disruptionEngine');
const { disruptionQueue } = require('../jobs/payoutJobs');
const axios = require('axios'); // Mocking external API calls

/**
 * TriggerService
 * 
 * Handles monitoring of external factors and auto-triggers disruptions.
 */
class TriggerService {
  /**
   * 5 Automated Triggers (Required for Phase 2)
   */
  static async checkAllTriggers() {
    console.log('--- Scanning Automated Triggers ---');
    
    await Promise.all([
      this.checkRainfall(),
      this.checkAQI(),
      this.checkHeatwave(),
      this.checkLockdown(),
      this.checkOrderDrop()
    ]);
  }

  // 1. Rainfall Trigger (> 50mm/hr)
  static async checkRainfall() {
    const rainfall = Math.random() * 80; // Mock current rainfall
    if (rainfall > 50) {
      console.log('⚠️ High Rainfall Detected!');
      await this.createTriggerEvent('Rainfall', rainfall, 'High');
    }
  }

  // 2. AQI Trigger (> 300)
  static async checkAQI() {
    const aqi = Math.random() * 400; // Mock current AQI
    if (aqi > 300) {
      console.log('⚠️ Dangerous AQI Detected!');
      await this.createTriggerEvent('AQI', aqi, 'High');
    }
  }

  // 3. Heatwave Trigger (> 42°C)
  static async checkHeatwave() {
    const temp = 35 + (Math.random() * 15); // Mock temp
    if (temp > 42) {
      console.log('⚠️ Heatwave Detected!');
      await this.createTriggerEvent('Heatwave', temp, 'Medium');
    }
  }

  // 4. Lockdown / Curfew (Simulated status check)
  static async checkLockdown() {
    // Mocking an official alert API
    const isLockdown = Math.random() < 0.05; // 5% chance in simulation
    if (isLockdown) {
      console.log('⚠️ Curfew/Lockdown Detected!');
      await this.createTriggerEvent('Curfew', 1.0, 'Critical');
    }
  }

  // 5. Order Drop (Macro-level disruption based on restaurant status)
  static async checkOrderDrop() {
    const dropPercentage = Math.random() * 60; // Mock drop in city orders
    if (dropPercentage > 40) {
      console.log('⚠️ Significant Order Drop Detected!');
      await this.createTriggerEvent('Closure', dropPercentage, 'High');
    }
  }

  static async createTriggerEvent(type, value, severity) {
    const disruption = await DisruptionEngine.triggerDisruption({
      type,
      zone: 'City Center', // Simplified for demo
      severity,
      threshold_value: value,
      metadata: { source: 'Automated Sensor API' }
    });
    
    // Queue payout processing
    await disruptionQueue.add(`auto-${type}-${disruption.id}`, { disruptionId: disruption.id });
  }
}

module.exports = TriggerService;
