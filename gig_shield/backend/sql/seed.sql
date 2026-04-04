-- Seed Plans
INSERT INTO plans (name, premium_base, coverage_limit, description) VALUES
('Basic', 20.00, 500.00, 'Basic coverage for heavy rainfall and minor disruptions.'),
('Standard', 40.00, 1200.00, 'Standard coverage including high AQI and partial lockdowns.'),
('Premium', 70.00, 2500.00, 'Comprehensive coverage for all disruptions with prioritized payouts.');

-- Sample Users (password: password123)
-- Hashes generated via bcrypt: $2b$10$oJ7BvK8p8iHhJ5o6L4eGuehXzN6oZ5r9H5.B.y8A8v8v8v8v8v8v
-- Actually, I'll let the registration API handle the password hashing or use a generic one.
-- For seed, I'll use a mocked hash.
INSERT INTO users (name, phone, email, password_hash, lat, lng, avg_daily_income, working_hours, trust_score) VALUES
('Rahul Sharma', '9876543210', 'rahul@example.com', '$2b$10$Ep99uK9F.oIDx/5iXh9LbeIksY9vD.Gv9/L2EwL0Y8yF8yF8yF8yF', 19.0760, 72.8777, 600.00, 10.0, 85),
('Priya Singh', '9876543211', 'priya@example.com', '$2b$10$Ep99uK9F.oIDx/5iXh9LbeIksY9vD.Gv9/L2EwL0Y8yF8yF8yF8yF', 28.6139, 77.2090, 800.00, 8.0, 92),
('Amit Kumar', '9876543212', 'amit@example.com', '$2b$10$Ep99uK9F.oIDx/5iXh9LbeIksY9vD.Gv9/L2EwL0Y8yF8yF8yF8yF', 12.9716, 77.5946, 450.00, 12.0, 75);

-- Sample Active Policy for Rahul
INSERT INTO policies (user_id, plan_id, status, current_premium, start_date, end_date) VALUES
(1, 2, 'active', 40.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days');
