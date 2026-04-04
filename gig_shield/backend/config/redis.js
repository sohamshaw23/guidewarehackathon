// Mock Redis for demo (in-memory)
const EventEmitter = require('events');

class MockRedis extends EventEmitter {
  constructor() {
    super();
    setTimeout(() => this.emit('connect'), 100);
    this.data = {};
  }

  async set(key, value) { this.data[key] = value; return 'OK'; }
  async get(key) { return this.data[key] || null; }
  async del(key) { delete this.data[key]; return 1; }
}

const redis = new MockRedis();
const redisConfig = { host: 'localhost', port: 6379 };

module.exports = {
  redis,
  redisConfig
};
