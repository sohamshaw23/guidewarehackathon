// Centralized Mock DB for Next.js API Routes
class MockDB {
  private static instance: MockDB;
  public tables: any;

  private constructor() {
    this.tables = {
      users: [
        {
          id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com',
          password_hash: '$2b$10$Ep99uK9F.oIDx/5iXh9LbeIksY9vD.Gv9/L2EwL0Y8yF8yF8yF8yF',
          lat: 19.0760, lng: 72.8777, avg_daily_income: 600.00, working_hours: 10.0, trust_score: 85
        }
      ],
      plans: [
        { id: 1, name: 'Basic', premium_base: 20.00, coverage_limit: 500.00, description: 'Basic coverage' },
        { id: 2, name: 'Standard', premium_base: 40.00, coverage_limit: 1200.00, description: 'Standard coverage' },
        { id: 3, name: 'Premium', premium_base: 70.00, coverage_limit: 2500.00, description: 'Comprehensive coverage' }
      ],
      policies: [],
      disruptions: [
        { id: 1, type: 'Rainfall', zone: 'HSR Layout', severity: 'High', threshold_value: 50, status: 'active', created_at: new Date() }
      ],
      activity_logs: [],
      payouts: [
        { id: 1, user_id: 1, disruption_id: 1, amount: 250, disruption_type: 'Rainfall', status: 'paid', created_at: new Date(Date.now() - 86400000) }
      ],
      trust_score_history: []
    };
  }

  public static getInstance(): MockDB {
    if (!MockDB.instance) {
      MockDB.instance = new MockDB();
    }
    return MockDB.instance;
  }
}

export const mockDB = MockDB.getInstance();
