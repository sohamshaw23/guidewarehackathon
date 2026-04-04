const express = require('express');
const PolicyController = require('../controllers/policyController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.get('/plans', PolicyController.getPlans);
router.post('/activate', authenticate, PolicyController.activatePolicy);
router.get('/status', authenticate, PolicyController.getPolicyStatus);

module.exports = router;
