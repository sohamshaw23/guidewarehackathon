const express = require('express');
const ActivityController = require('../controllers/activityController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/update', authenticate, ActivityController.update);
router.get('/summary', authenticate, ActivityController.getSummary);

module.exports = router;
