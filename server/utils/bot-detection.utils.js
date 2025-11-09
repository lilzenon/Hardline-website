/**
 * Bot Detection Utilities
 * 
 * Detects social media crawlers and search engine bots
 * to optimize redirect behavior for SEO.
 */

/**
 * List of known bot/crawler user agents
 * These bots need to read meta tags before following redirects
 */
const BOT_USER_AGENTS = [
    // Social Media Crawlers
    'facebookexternalhit',      // Facebook
    'Facebot',                   // Facebook
    'facebookcatalog',           // Facebook Catalog
    'Twitterbot',                // Twitter
    'LinkedInBot',               // LinkedIn
    'Slackbot',                  // Slack
    'Discordbot',                // Discord
    'WhatsApp',                  // WhatsApp
    'TelegramBot',               // Telegram
    'SkypeUriPreview',           // Skype
    
    // Search Engine Bots
    'Googlebot',                 // Google
    'Bingbot',                   // Bing
    'Slurp',                     // Yahoo
    'DuckDuckBot',               // DuckDuckGo
    'Baiduspider',               // Baidu
    'YandexBot',                 // Yandex
    'Sogou',                     // Sogou
    'Exabot',                    // Exalead
    
    // SEO & Analytics Tools
    'Screaming Frog',            // Screaming Frog SEO Spider
    'Semrush',                   // SEMrush
    'Ahrefs',                    // Ahrefs
    'Moz',                       // Moz
    'Majestic',                  // Majestic SEO
    
    // Other Crawlers
    'ia_archiver',               // Internet Archive
    'archive.org_bot',           // Internet Archive
    'Applebot',                  // Apple
    'PingdomBot',                // Pingdom
    'UptimeRobot',               // Uptime Robot
    'StatusCake',                // StatusCake
    
    // Preview/Embed Services
    'embedly',                   // Embedly
    'quora link preview',        // Quora
    'Pinterestbot',              // Pinterest
    'vkShare',                   // VK
    'redditbot',                 // Reddit
    'tumblr',                    // Tumblr
    'bitlybot',                  // Bitly
    
    // Messaging Apps
    'iMessageBot',               // iMessage
    'MessengerBot',              // Facebook Messenger
    'Line',                      // Line
    'Viber',                     // Viber
    'WeChat',                    // WeChat
];

/**
 * Detect if the request is from a bot/crawler
 * 
 * @param {Object} req - Express request object
 * @returns {boolean} True if request is from a bot
 */
function isBot(req) {
    const userAgent = req.get('user-agent') || '';
    
    // Check if user agent matches any known bot patterns
    return BOT_USER_AGENTS.some(botAgent => 
        userAgent.toLowerCase().includes(botAgent.toLowerCase())
    );
}

/**
 * Detect if the request is from a social media crawler
 * (subset of bots that specifically need meta tags for previews)
 * 
 * @param {Object} req - Express request object
 * @returns {boolean} True if request is from a social media crawler
 */
function isSocialMediaCrawler(req) {
    const userAgent = req.get('user-agent') || '';
    const socialCrawlers = [
        'facebookexternalhit',
        'Facebot',
        'Twitterbot',
        'LinkedInBot',
        'Slackbot',
        'Discordbot',
        'WhatsApp',
        'TelegramBot',
        'Pinterestbot',
        'vkShare',
        'redditbot'
    ];
    
    return socialCrawlers.some(crawler => 
        userAgent.toLowerCase().includes(crawler.toLowerCase())
    );
}

/**
 * Detect if the request is from a search engine bot
 * 
 * @param {Object} req - Express request object
 * @returns {boolean} True if request is from a search engine
 */
function isSearchEngine(req) {
    const userAgent = req.get('user-agent') || '';
    const searchEngines = [
        'Googlebot',
        'Bingbot',
        'Slurp',
        'DuckDuckBot',
        'Baiduspider',
        'YandexBot'
    ];
    
    return searchEngines.some(engine => 
        userAgent.toLowerCase().includes(engine.toLowerCase())
    );
}

/**
 * Get bot type for logging/analytics
 * 
 * @param {Object} req - Express request object
 * @returns {string|null} Bot type or null if not a bot
 */
function getBotType(req) {
    if (isSocialMediaCrawler(req)) return 'social_media_crawler';
    if (isSearchEngine(req)) return 'search_engine';
    if (isBot(req)) return 'other_bot';
    return null;
}

/**
 * Log bot detection for analytics
 * 
 * @param {Object} req - Express request object
 * @param {string} eventSlug - Event slug being accessed
 */
function logBotAccess(req, eventSlug) {
    const botType = getBotType(req);
    if (botType) {
        const userAgent = req.get('user-agent') || 'unknown';
        const ip = req.ip || req.connection.remoteAddress;
        
        console.log(`🤖 Bot Access Detected:`, {
            type: botType,
            event: eventSlug,
            userAgent: userAgent.substring(0, 100), // Truncate for logging
            ip: ip,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = {
    isBot,
    isSocialMediaCrawler,
    isSearchEngine,
    getBotType,
    logBotAccess
};

