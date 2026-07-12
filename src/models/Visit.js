const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    visitorId: String,
    ip: String,
    location: String,
    path: String,
    referrer: String,
    os: String,
    browser: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visit', visitSchema);
