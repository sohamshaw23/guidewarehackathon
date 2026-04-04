const fs = require('fs');
const path = require('path');
const { pool } = require('./config/db');

async function setup() {
  try {
    console.log('--- GigShield DB Setup ---');
    
    const schema = fs.readFileSync(path.join(__currentDir, 'sql/schema.sql'), 'utf8');
    const seed = fs.readFileSync(path.join(__currentDir, 'sql/seed.sql'), 'utf8');

    console.log('Creating tables...');
    await pool.query(schema);
    
    console.log('Seeding data...');
    await pool.query(seed);

    console.log('✅ Database setup complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  }
}

// Simple hack for __dirname in ESM if needed, but we are using CommonJS
const __currentDir = __dirname;
setup();
