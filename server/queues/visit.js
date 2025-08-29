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
        // CRITICAL FIX: Add timeout wrapper for entire visit processing
        const processVisit = async() => {
            const tasks = [];

            tasks.push(query.link.incrementVisit({ id: data.link.id }));

            // the following line is for backward compatibility
            // used to send the whole header to get the user agent
            const userAgent = data.userAgent || (data.headers && data.headers["user-agent"]);
            const parser = new UAParser(userAgent);
            const agent = parser.getResult();
            const [browser = "Other"] = browsersList.filter(filterInBrowser(agent));
            const [os = "Other"] = osList.filter(filterInOs(agent));
            const referrer =
                data.referrer && removeWww(URL.parse(data.referrer).hostname);

            const geoData = geoip.lookup(data.ip);
            const country = data.country || (geoData && geoData.country);

            tasks.push(
                query.visit.add({
                    browser: browser.toLowerCase(),
                    country: country || "Unknown",
                    link_id: data.link.id,
                    user_id: data.link.user_id,
                    os: os.toLowerCase().replace(/\s/gi, ""),
                    referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct"
                })
            );

            return Promise.all(tasks);
        };

        // CRITICAL FIX: Add 10-second timeout to prevent hanging workers
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Visit processing timeout')), 10000);
        });

        return await Promise.race([processVisit(), timeoutPromise]);

    } catch (error) {
        console.error('🚨 Visit processing error:', error.message);
        // Don't throw - let the worker continue with other jobs
        return null;
    }
}