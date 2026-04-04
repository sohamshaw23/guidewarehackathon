const express = require('express');
const DisruptionController = require('../controllers/disruptionController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/trigger', authenticate, DisruptionController.trigger); // Admin/System usually
router.get('/active', DisruptionController.getActive);

module.exports = router;
