const Visit = require('../models/Visit');
const Event = require('../models/Event');
const { getLocation } = require('../services/geolocation');
const { sendTelegramMessage } = require('../services/telegram');

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
}

async function trackVisit(req, res) {
    res.status(200).json({ success: true });
    try {
        const { visitorId, page, fingerprint } = req.body;
        if (!visitorId || !page || !fingerprint) return;

        const ip = getClientIp(req);
        const location = await getLocation(ip);

        await Visit.create({
            visitorId,
            ip,
            location,
            path: page.path,
            referrer: page.referrer || 'Direct Link',
            os: fingerprint.platform,
            browser: fingerprint.userAgent
        });

        const userVisits = await Visit.countDocuments({ visitorId });
        const totalVisits = await Visit.countDocuments();

        const message = `
🚨 <b>Portfolio Visit!</b> (#${totalVisits} Total)
<b>User Status:</b> Visit #${userVisits} for this user
<b>Path:</b> ${page.path}
<b>Source:</b> ${page.referrer || 'Direct Typing'}
<b>Location:</b> ${location} (IP: ${ip})
<b>OS:</b> ${fingerprint.platform}
<b>Visitor ID:</b> <code>${visitorId}</code>`.trim();

        await sendTelegramMessage(message);
    } catch (error) {
        console.error(error);
    }
}

async function trackEvent(req, res) {
    res.status(200).json({ success: true });
    try {
        const { visitorId, action, label } = req.body;
        if (!visitorId || !action) return;

        await Event.create({ visitorId, action, label });

        const message = `
🖱️ <b>Action Tracked!</b>
<b>Action:</b> ${action}
<b>Target:</b> ${label}
<b>Visitor ID:</b> <code>${visitorId}</code>`.trim();

        await sendTelegramMessage(message);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { trackVisit, trackEvent };
