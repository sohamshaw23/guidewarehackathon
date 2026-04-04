const express = require('express');
const PayoutController = require('../controllers/payoutController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.get('/history', authenticate, PayoutController.getHistory);

module.exports = router;
