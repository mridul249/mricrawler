const express = require('express');
const cors = require('cors');
const { corsOptions, apiLimiter } = require('./middleware/security');
const trackingRoutes = require('./routes/tracking');

const app = express();

app.set('trust proxy', 1); // Required for Render so rate-limiting uses the real client IP.

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use('/api/', apiLimiter);
app.use('/api', trackingRoutes);

module.exports = app;
