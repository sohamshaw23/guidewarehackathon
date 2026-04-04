/**
 * PredictiveRiskService (ML Mock)
 * 
 * Simulates a Machine Learning model that analyzes historical and predictive data 
 * for hyper-local risk factors.
 */
class MLService {
  /**
   * Returns a risk score for a specific coordinate and time
   * Factors: Historical water logging, Predictive weather models
   */
  static async getPredictiveRisk(lat, lng) {
    // In a real scenario, this would call a Python ML service or a GIS database
    // Here we simulate hyper-local "safe zones" and "risk zones"
    
    // Mock safe zones (e.g., South Mumbai is historically safer from water logging)
    const isSafeZone = (lat > 18.9 && lat < 19.0); 
    const waterLoggingRisk = isSafeZone ? 0.05 : 0.25;

    // Simulate predictive weather model (chance of extreme event in next 7 days)
    const predictiveWeatherFactor = Math.random() * 0.5; // 0 to 0.5 additional risk

    return {
      water_logging_risk: waterLoggingRisk,
      predictive_weather_risk: parseFloat(predictiveWeatherFactor.toFixed(2)),
      is_safe_zone: isSafeZone,
      total_risk_score: parseFloat((waterLoggingRisk + predictiveWeatherFactor).toFixed(2))
    };
  }

  /**
   * Analyzes activity patterns to detect anomalies (Fraud detection)
   */
  static async detectActivityAnomaly(logs) {
    if (logs.length < 2) return 0;
    
    // Simple regression/variance check mockup
    const orders = logs.map(l => l.orders_completed);
    const avg = orders.reduce((a, b) => a + b, 0) / orders.length;
    const variance = orders.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / orders.length;

    return variance > 5 ? 0.8 : 0.1; // High variance might indicate fraud or disruption
  }
}

module.exports = MLService;
