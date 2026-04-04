const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const policyRoutes = require('./routes/policyRoutes');
const disruptionRoutes = require('./routes/disruptionRoutes');
const activityRoutes = require('./routes/activityRoutes');
const payoutRoutes = require('./routes/payoutRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// Routes
app.use('/auth', authRoutes);
app.use('/policy', policyRoutes);
app.use('/disruption', disruptionRoutes);
app.use('/activity', activityRoutes);
app.use('/payout', payoutRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'GigShield API is running 🚀', version: '1.0.0' });
});

// Real-time notifications
io.on('connection', (socket) => {
  console.log('User connected to socket:', socket.id);
  
  socket.on('join-zone', (zone) => {
    socket.join(zone);
    console.log(`Socket ${socket.id} joined zone: ${zone}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from socket');
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', detail: err.message });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`GigShield Backend running on port ${PORT}`);
});

// For background jobs: In a production app, these usually run in separate processes
// For demo, we import the workers and the automated trigger service
require('./jobs/payoutJobs');
const TriggerService = require('./services/triggerService');

// Simulate real-time monitoring (check triggers every 2 minutes for demo)
if (process.env.NODE_ENV !== 'test') {
    setInterval(() => {
        TriggerService.checkAllTriggers().catch(console.error);
    }, 120000); 
}
