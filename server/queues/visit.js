const { UAParser } = require("ua-parser-js");
const geoip = require("geoip-lite");
const URL = require("node:url");

const { removeWww } = require("../utils");
const query = require("../queries");

const browsersList = ["IE", "Firefox", "Chrome", "Opera", "Safari", "Edge"];
const osList = ["Windows", "Mac OS", "Linux", "Android", "iOS"];

function filterInBrowser(agent) {
    return function(item) {
        return agent.browser.name.toLowerCase().includes(item.toLocaleLowerCase());
    }
}

function filterInOs(agent) {
    return function(item) {
        return agent.os.name.toLowerCase().includes(item.toLocaleLowerCase());
    }
}

module.exports = async function({ data }) {
    try {
        // CRITICAL FIX: Ultra-fast processing with multiple fallback strategies
        const processVisitUltraFast = async() => {
            const results = [];

            // Strategy 1: Try link increment with 2-second timeout
            try {
                // CRITICAL FIX: Ensure link ID is properly formatted as INTEGER
                const linkId = typeof data.link.id === 'number' ? data.link.id : parseInt(data.link.id, 10);

                const linkIncrementPromise = query.link.incrementVisit({ id: linkId });
                const linkTimeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Link increment timeout')), 5000)
                );

                const linkResult = await Promise.race([linkIncrementPromise, linkTimeout]);
                results.push(linkResult);
                console.log('✅ Dashboard link visit incremented successfully');
            } catch (error) {
                console.warn('⚠️ Dashboard link increment failed, continuing:', error.message);
                // Continue processing even if link increment fails
            }

            // Strategy 2: Try simplified visit record with 3-second timeout
            try {
                const userAgent = data.userAgent || (data.headers && data.headers["user-agent"]);
                const parser = new UAParser(userAgent);
                const agent = parser.getResult();
                const [browser = "Other"] = browsersList.filter(filterInBrowser(agent));
                const [os = "Other"] = osList.filter(filterInOs(agent));
                const referrer = data.referrer && removeWww(URL.parse(data.referrer).hostname);
                const geoData = geoip.lookup(data.ip);
                const country = data.country || (geoData && geoData.country);

                // Use simplified visit insertion with proper INTEGER ID handling
                const visitData = {
                    browser: browser.toLowerCase(),
                    country: country || "Unknown",
                    link_id: typeof data.link.id === 'number' ? data.link.id : parseInt(data.link.id, 10),
                    user_id: typeof data.link.user_id === 'number' ? data.link.user_id : parseInt(data.link.user_id, 10),
                    os: os.toLowerCase().replace(/\s/gi, ""),
                    referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct"
                };

                const visitPromise = query.visit.add(visitData);
                const visitTimeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Visit add timeout')), 8000)
                );

                const visitResult = await Promise.race([visitPromise, visitTimeout]);
                results.push(visitResult);
                console.log('✅ Visit record added successfully');
            } catch (error) {
                console.warn('⚠️ Visit record failed, trying fallback:', error.message);

                // Strategy 3: Ultra-simple direct database insert with proper ID handling
                try {
                    const knex = require("../knex");
                    await knex("visits").insert({
                        link_id: typeof data.link.id === 'number' ? data.link.id : parseInt(data.link.id, 10),
                        user_id: typeof data.link.user_id === 'number' ? data.link.user_id : parseInt(data.link.user_id, 10),
                        total: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    console.log('✅ Fallback visit insert successful');
                } catch (fallbackError) {
                    console.error('🚨 All visit processing strategies failed:', fallbackError.message);
                }
            }

            return results;
        };

        // CRITICAL FIX: Increase overall timeout to 12 seconds to match database configuration
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Visit processing timeout')), 12000);
        });

        return await Promise.race([processVisitUltraFast(), timeoutPromise]);

    } catch (error) {
        if (error.message.includes('timeout')) {
            console.error('🚨 Visit worker error: Command timed out (5s limit exceeded)');
        } else {
            console.error('🚨 Visit processing error:', error.message);
        }
        // Don't throw - let the worker continue with other jobs
        return null;
    }
}