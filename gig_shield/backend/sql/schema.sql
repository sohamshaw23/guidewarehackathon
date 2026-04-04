-- GigShield Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    avg_daily_income DECIMAL(10, 2) DEFAULT 500.00,
    working_hours DECIMAL(4, 2) DEFAULT 8.0,
    trust_score INTEGER DEFAULT 80 CHECK (trust_score >= 0 AND trust_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Plans
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- Basic, Standard, Premium
    premium_base DECIMAL(10, 2) NOT NULL,
    coverage_limit DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Policies
CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES plans(id),
    status VARCHAR(20) DEFAULT 'inactive', -- active, inactive, expired
    auto_renew BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    current_premium DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disruption Events
CREATE TABLE IF NOT EXISTS disruptions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- Rainfall, AQI, Curfew, PowerOutage, Closure
    zone VARCHAR(100), -- Area identifier
    severity VARCHAR(20), -- Low, Medium, High
    threshold_value DECIMAL(10, 2),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active', -- active, resolved
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    orders_completed INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payouts
CREATE TABLE IF NOT EXISTS payouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    disruption_id INTEGER REFERENCES disruptions(id),
    policy_id INTEGER REFERENCES policies(id),
    amount DECIMAL(10, 2) NOT NULL,
    loss_hours DECIMAL(5, 2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, hold, rejected, paid
    payout_method VARCHAR(50) DEFAULT 'UPI',
    transaction_ref VARCHAR(255),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trust Score History
CREATE TABLE IF NOT EXISTS trust_score_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    old_score INTEGER,
    new_score INTEGER,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_policies_user ON policies(user_id);
CREATE INDEX idx_activity_user_time ON activity_logs(user_id, timestamp);
CREATE INDEX idx_disruptions_status ON disruptions(status);
CREATE INDEX idx_payouts_user ON payouts(user_id);
