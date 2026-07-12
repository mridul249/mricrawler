const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    visitorId: String,
    action: String,
    label: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
