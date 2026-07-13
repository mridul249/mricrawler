const express = require('express');
const { verifySecret } = require('../middleware/security');
const { trackVisit, trackEvent } = require('../controllers/trackingController');

const router = express.Router();

router.post('/ping', verifySecret, trackVisit);
router.post('/action', verifySecret, trackEvent);

module.exports = router;