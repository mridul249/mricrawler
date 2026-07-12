async function getLocation(ip) {
    if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.')) {
        return 'Unknown Location';
    }
    try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geo = await geoRes.json();
        if (geo.status === 'success') {
            return `${geo.city}, ${geo.regionName}, ${geo.country}`;
        }
    } catch (e) {
        // Best-effort lookup — fail silently
    }
    return 'Unknown Location';
}

module.exports = { getLocation };
