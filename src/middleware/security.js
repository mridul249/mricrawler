const rateLimit = require('express-rate-limit');

const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production'
    ? 'https://mriduld.in'
    : 'http://localhost:5173'; // For local testing

const corsOptions = {
    origin: ALLOWED_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'x-api-key'] 
};

// Blocks an IP if it makes more than 30 requests in 15 minutes.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { success: false, error: 'Too many requests' }
});

// Shared secret between frontend and backend.
function verifySecret(req, res, next) {
    if (req.headers['x-api-key'] !== process.env.VITE_API_SECRET) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
}

module.exports = { corsOptions, apiLimiter, verifySecret };
