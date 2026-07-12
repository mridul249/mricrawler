const express = require('express');
const { verifySecret } = require('../middleware/security');
const { trackVisit, trackEvent } = require('../controllers/trackingController');

const router = express.Router();

router.post('/track', verifySecret, trackVisit);
router.post('/event', verifySecret, trackEvent);

module.exports = router;
