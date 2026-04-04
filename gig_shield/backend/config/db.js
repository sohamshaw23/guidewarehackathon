// Mock database for demo (in-memory)
class MockDB {
  constructor() {
    this.tables = {
      users: [],
      plans: [
        { id: 1, name: 'Basic', premium_base: 20.00, coverage_limit: 500.00, description: 'Basic coverage' },
        { id: 2, name: 'Standard', premium_base: 40.00, coverage_limit: 1200.00, description: 'Standard coverage' },
        { id: 3, name: 'Premium', premium_base: 70.00, coverage_limit: 2500.00, description: 'Comprehensive coverage' }
      ],
      policies: [],
      disruptions: [],
      activity_logs: [],
      payouts: [],
      trust_score_history: []
    };

    // Seed mock data
    this.tables.users.push({
      id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com',
      password_hash: '$2b$10$Ep99uK9F.oIDx/5iXh9LbeIksY9vD.Gv9/L2EwL0Y8yF8yF8yF8yF',
      lat: 19.0760, lng: 72.8777, avg_daily_income: 600.00, working_hours: 10.0, trust_score: 85
    });
  }

  async query(text, params = []) {
    // Basic mock query handler for simple demo queries
    if (text.includes('INSERT INTO users')) {
      const u = { id: this.tables.users.length + 1, name: params[0], phone: params[1], email: params[2], password_hash: params[3], lat: params[4], lng: params[5], avg_daily_income: params[6], working_hours: params[7], trust_score: 80 };
      this.tables.users.push(u);
      return { rows: [u] };
    }
    
    if (text.includes('SELECT * FROM users WHERE phone')) {
      const u = this.tables.users.find(u => u.phone === params[0]);
      return { rows: u ? [u] : [] };
    }

    if (text.includes('SELECT') && text.includes('FROM users WHERE id')) {
      const u = this.tables.users.find(u => u.id === params[0]);
      return { rows: u ? [u] : [] };
    }

    if (text.includes('SELECT * FROM plans')) {
      return { rows: this.tables.plans };
    }

    if (text.includes('INSERT INTO policies')) {
        const p = { id: this.tables.policies.length + 1, user_id: params[0], plan_id: params[1], status: 'active', auto_renew: params[2], current_premium: params[3], start_date: new Date(), end_date: new Date() };
        this.tables.policies.push(p);
        return { rows: [p] };
    }

    if (text.includes('SELECT') && text.includes('FROM policies')) {
        const p = this.tables.policies.find(p => p.user_id === params[0] && p.status === 'active');
        const plan = this.tables.plans.find(pl => pl.id == (p?.plan_id));
        return { rows: p ? [{ ...p, plan_name: plan?.name, coverage_limit: plan?.coverage_limit }] : [] };
    }

    if (text.includes('INSERT INTO disruptions')) {
        const d = { id: this.tables.disruptions.length + 1, type: params[0], zone: params[1], severity: params[2], threshold_value: params[3], metadata: JSON.parse(params[4]), status: 'active', created_at: new Date() };
        this.tables.disruptions.push(d);
        return { rows: [d] };
    }

    if (text.includes('SELECT * FROM disruptions WHERE status')) {
        return { rows: this.tables.disruptions.filter(d => d.status === 'active') };
    }

    if (text.includes('INSERT INTO activity_logs')) {
        const l = { id: this.tables.activity_logs.length + 1, user_id: params[0], lat: params[1], lng: params[2], orders_completed: params[3], timestamp: new Date() };
        this.tables.activity_logs.push(l);
        return { rows: [l] };
    }
    
    if (text.includes('SELECT * FROM activity_logs')) {
        return { rows: this.tables.activity_logs.filter(l => l.user_id === params[0]) };
    }

    if (text.includes('INSERT INTO payouts')) {
        const pay = { id: this.tables.payouts.length + 1, user_id: params[0], disruption_id: params[1], policy_id: params[2], amount: params[3], loss_hours: params[4], status: 'paid', transaction_ref: params[5], created_at: new Date() };
        this.tables.payouts.push(pay);
        return { rows: [pay] };
    }
    
    if (text.includes('SELECT p.*') && text.includes('payouts')) {
        return { rows: this.tables.payouts.filter(p => p.user_id === params[0]).map(p => ({ ...p, disruption_type: this.tables.disruptions.find(d => d.id == p.disruption_id)?.type })) };
    }

    if (text.includes('UPDATE users SET trust_score')) {
        const u = this.tables.users.find(u => u.id === params[1]);
        if (u) u.trust_score = params[0];
        return { rows: [u] };
    }

    return { rows: [] };
  }

  // Pool simulation
  async connect() {
      return {
          query: this.query.bind(this),
          release: () => {},
      };
  }
}

const db = new MockDB();
module.exports = {
  query: (text, params) => db.query(text, params),
  pool: {
      connect: () => db.connect(),
  }
};
