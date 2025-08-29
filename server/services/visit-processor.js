/**
 * Robust Visit Processing Service
 * Handles visit tracking with multiple fallback strategies
 */

const UAParser = require("ua-parser-js");
const geoip = require("geoip-lite");
const URL = require("url");
const query = require("../queries");
const utils = require("../utils");

// Browser and OS detection lists
const browsersList = [
    "chrome", "firefox", "safari", "edge", "opera", "ie"
];

const osList = [
    "windows", "macos", "linux", "android", "ios"
];

const filterInBrowser = agent => browser => {
    return agent.browser.name && agent.browser.name.toLowerCase().includes(browser);
};

const filterInOs = agent => os => {
    return agent.os.name && agent.os.name.toLowerCase().includes(os);
};

const removeWww = url => {
    return url ? url.replace(/^www\./, "") : url;
};

class VisitProcessor {
    constructor() {
        this.processingQueue = [];
        this.isProcessing = false;
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1 second
        this.batchSize = 5;
        this.processInterval = 2000; // Process every 2 seconds

        // Start background processor
        this.startBackgroundProcessor();

        console.log('✅ Robust Visit Processor initialized');
    }

    /**
     * Add visit for processing with multiple strategies
     */
    async addVisit(visitData) {
        try {
            // Strategy 1: Try immediate processing (fastest)
            const result = await this.processVisitImmediate(visitData);
            console.log('✅ Visit processed immediately');
            return result;
        } catch (error) {
            console.warn('⚠️ Immediate processing failed, queuing for batch:', error.message);

            // Strategy 2: Add to background queue
            this.processingQueue.push({
                data: visitData,
                attempts: 0,
                addedAt: Date.now()
            });

            console.log(`📊 Visit queued for background processing (queue size: ${this.processingQueue.length})`);
        }
    }

    /**
     * Process visit immediately with timeout protection
     */
    async processVisitImmediate(visitData) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Immediate visit processing timeout')), 30000);
        });

        return Promise.race([
            this.processVisitCore(visitData),
            timeoutPromise
        ]);
    }

    /**
     * Core visit processing logic
     */
    async processVisitCore(visitData) {
        const tasks = [];

        // 1. Increment link visit count with proper INTEGER ID handling
        const linkId = typeof visitData.link.id === 'number' ? visitData.link.id : parseInt(visitData.link.id, 10);
        tasks.push(query.link.incrementVisit({ id: linkId }));

        // 2. Parse user agent
        const userAgent = visitData.userAgent || (visitData.headers && visitData.headers["user-agent"]);
        const parser = new UAParser(userAgent);
        const agent = parser.getResult();
        const [browser = "Other"] = browsersList.filter(filterInBrowser(agent));
        const [os = "Other"] = osList.filter(filterInOs(agent));

        // 3. Process referrer
        const referrer = visitData.referrer && removeWww(URL.parse(visitData.referrer).hostname);

        // 4. Get country data
        const geoData = geoip.lookup(visitData.ip);
        const country = visitData.country || (geoData && geoData.country);

        // 5. Add visit record with simplified approach and proper INTEGER ID handling
        tasks.push(
            this.addVisitRecord({
                browser: browser.toLowerCase(),
                country: country || "Unknown",
                link_id: typeof visitData.link.id === 'number' ? visitData.link.id : parseInt(visitData.link.id, 10),
                user_id: typeof visitData.link.user_id === 'number' ? visitData.link.user_id : parseInt(visitData.link.user_id, 10),
                os: os.toLowerCase().replace(/\s/gi, ""),
                referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct"
            })
        );

        return Promise.all(tasks);
    }

    /**
     * Simplified visit record insertion with better error handling
     */
    async addVisitRecord(visitData) {
        try {
            // Use a simpler approach - just insert the visit without complex aggregation
            const result = await query.visit.add(visitData);
            return result;
        } catch (error) {
            // If complex aggregation fails, try simple insert
            console.warn('⚠️ Complex visit insert failed, trying simple approach:', error.message);

            try {
                // Fallback: Simple insert without aggregation - FIXED JSONB FORMAT
                const knex = require("../knex");

                // Map browser and OS to valid database columns
                const browserMap = {
                    'chrome': 'br_chrome',
                    'firefox': 'br_firefox',
                    'safari': 'br_safari',
                    'edge': 'br_edge',
                    'opera': 'br_opera',
                    'ie': 'br_ie'
                };

                const osMap = {
                    'windows': 'os_windows',
                    'macos': 'os_macos',
                    'linux': 'os_linux',
                    'android': 'os_android',
                    'ios': 'os_ios'
                };

                const browserColumn = browserMap[visitData.browser.toLowerCase()] || 'br_other';
                const osColumn = osMap[visitData.os.toLowerCase()] || 'os_other';

                const insertData = {
                    [browserColumn]: 1,
                    [osColumn]: 1,
                    total: 1,
                    link_id: visitData.link_id,
                    user_id: visitData.user_id,
                    countries: {
                        [visitData.country]: 1
                    },
                    referrers: {
                        [visitData.referrer]: 1
                    },
                    created_at: new Date(),
                    updated_at: new Date()
                };

                await knex("visits").insert(insertData);

                console.log('✅ Visit recorded with simple insert');
                return true;
            } catch (fallbackError) {
                console.error('🚨 Both visit insert methods failed:', fallbackError.message);
                throw fallbackError;
            }
        }
    }

    /**
     * Background processor for queued visits
     */
    startBackgroundProcessor() {
        setInterval(async() => {
            if (this.isProcessing || this.processingQueue.length === 0) {
                return;
            }

            this.isProcessing = true;

            try {
                const batch = this.processingQueue.splice(0, this.batchSize);
                console.log(`🔄 Processing visit batch of ${batch.length} items`);

                for (const item of batch) {
                    try {
                        await this.processVisitCore(item.data);
                        console.log('✅ Background visit processed successfully');
                    } catch (error) {
                        item.attempts++;

                        if (item.attempts < this.maxRetries) {
                            // Retry later
                            setTimeout(() => {
                                this.processingQueue.push(item);
                            }, this.retryDelay * item.attempts);

                            console.warn(`⚠️ Visit processing failed, will retry (attempt ${item.attempts}/${this.maxRetries}):`, error.message);
                        } else {
                            console.error(`🚨 Visit processing failed permanently after ${this.maxRetries} attempts:`, error.message);
                        }
                    }
                }
            } catch (error) {
                console.error('🚨 Background processor error:', error.message);
            } finally {
                this.isProcessing = false;
            }
        }, this.processInterval);
    }

    /**
     * Get processing statistics
     */
    getStats() {
        return {
            queueSize: this.processingQueue.length,
            isProcessing: this.isProcessing,
            oldestQueueItem: this.processingQueue.length > 0 ?
                Date.now() - this.processingQueue[0].addedAt : 0
        };
    }
}

// Create singleton instance
const visitProcessor = new VisitProcessor();

module.exports = visitProcessor;