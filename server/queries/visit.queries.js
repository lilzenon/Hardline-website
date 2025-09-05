// 🔧 OPTIMIZED: Replace date-fns with dayjs for bundle optimization
const dayjs = require("dayjs");

const utils = require("../utils");
const redis = require("../redis");
const knex = require("../knex");
const env = require("../env");

async function add(params) {
    const data = {
        ...params,
        country: params.country.toLowerCase(),
        referrer: params.referrer.toLowerCase()
    };

    const nowUTC = new Date().toISOString();
    const truncatedNow = nowUTC.substring(0, 10) + " " + nowUTC.substring(11, 14) + "00:00";

    // CRITICAL FIX: Add timeout to transaction to prevent hanging
    return knex.transaction(async(trx) => {
        // Set transaction timeout to prevent hanging
        await trx.raw('SET LOCAL statement_timeout = 5000'); // 5 second timeout

        // Create a subquery first that truncates the
        const subquery = trx("visits")
            .select("visits.*")
            .select({
                created_at_hours: utils.knexUtils(trx).truncatedTimestamp("created_at", "hour")
            })
            .where({ link_id: data.link_id })
            .as("subquery");

        // CRITICAL FIX: Use timeout and reduce lock time
        const visit = await Promise.race([
            trx
            .select("*")
            .from(subquery)
            .where("created_at_hours", "=", truncatedNow)
            .forUpdate()
            .first(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Visit query timeout')), 3000)
            )
        ]);

        if (visit) {
            const countries = typeof visit.countries === "string" ? JSON.parse(visit.countries) : visit.countries;
            const referrers = typeof visit.referrers === "string" ? JSON.parse(visit.referrers) : visit.referrers;

            // CRITICAL FIX: Add timeout to update query
            await Promise.race([
                trx("visits")
                .where({ id: visit.id })
                .increment(`br_${data.browser}`, 1)
                .increment(`os_${data.os}`, 1)
                .increment("total", 1)
                .update({
                    updated_at: utils.dateToUTC(new Date()),
                    countries: JSON.stringify({
                        ...countries,
                        [data.country]: (countries[data.country] || 0) + 1
                    }),
                    referrers: JSON.stringify({
                        ...referrers,
                        [data.referrer]: (referrers[data.referrer] || 0) + 1
                    })
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Visit update timeout')), 8000)
                )
            ]);
        } else {
            // CRITICAL FIX: Add timeout to insert query
            await Promise.race([
                trx("visits").insert({
                    [`br_${data.browser}`]: 1,
                    countries: {
                        [data.country]: 1
                    },
                    referrers: {
                        [data.referrer]: 1
                    },
                    [`os_${data.os}`]: 1,
                    total: 1,
                    link_id: data.link_id,
                    user_id: data.user_id,
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Visit insert timeout')), 8000)
                )
            ]);
        }

        return visit;
    }).catch(error => {
        // CRITICAL FIX: Handle timeout errors gracefully
        if (error.message.includes('timeout')) {
            console.error('🚨 Visit database operation timed out:', error.message);
            throw new Error('Visit processing timeout');
        }
        throw error;
    });
}

async function find(match, total) {
    // Enhanced caching with longer TTL for expensive stats
    if (match.link_id && env.REDIS_ENABLED && redis.isRedisReady()) {
        try {
            const key = redis.key.stats(match.link_id);
            const cached = await redis.safeRedisCommand('get', key);
            if (cached) return JSON.parse(cached);
        } catch (error) {
            // Redis not available, continue without cache
            console.warn('⚠️ Redis cache read failed for visit stats, continuing with database query:', error.message);
        }
    }

    const stats = {
        lastDay: {
            stats: utils.getInitStats(),
            views: new Array(24).fill(0),
            total: 0
        },
        lastWeek: {
            stats: utils.getInitStats(),
            views: new Array(7).fill(0),
            total: 0
        },
        lastMonth: {
            stats: utils.getInitStats(),
            views: new Array(30).fill(0),
            total: 0
        },
        lastYear: {
            stats: utils.getInitStats(),
            views: new Array(12).fill(0),
            total: 0
        }
    };

    const now = new Date();
    const periods = utils.getStatsPeriods(now);

    // Optimize query with date range filtering and proper indexing
    const query = knex("visits")
        .where(match)
        .where('created_at', '>=', periods[periods.length - 1][1]) // Only get data from the oldest period we need
        .orderBy('created_at', 'desc'); // Use index efficiently

    // Use streaming for large datasets but with timeout
    const visitsStream = query.stream();

    // Add timeout to prevent hanging queries
    const streamTimeout = setTimeout(() => {
        visitsStream.destroy();
        console.warn('⚠️ Visit stats query timed out for match:', match);
    }, 25000); // 25 second timeout

    try {
        for await (const visit of visitsStream) {
            periods.forEach(([type, fromDate]) => {
                const isIncluded = dayjs(utils.parseDatetime(visit.created_at)).isAfter(dayjs(fromDate));
                if (!isIncluded) return;
                const diffFunction = utils.getDifferenceFunction(type);
                const diff = diffFunction(now, utils.parseDatetime(visit.created_at));
                const index = stats[type].views.length - diff - 1;
                const view = stats[type].views[index];
                const period = stats[type].stats;

                // Safe JSON parsing with error handling
                let countries, referrers;
                try {
                    countries = typeof visit.countries === "string" ? JSON.parse(visit.countries) : visit.countries;
                    referrers = typeof visit.referrers === "string" ? JSON.parse(visit.referrers) : visit.referrers;
                } catch (parseError) {
                    console.warn('⚠️ Failed to parse visit data:', parseError.message);
                    countries = {};
                    referrers = {};
                }
                stats[type].stats = {
                    browser: {
                        chrome: period.browser.chrome + visit.br_chrome,
                        edge: period.browser.edge + visit.br_edge,
                        firefox: period.browser.firefox + visit.br_firefox,
                        ie: period.browser.ie + visit.br_ie,
                        opera: period.browser.opera + visit.br_opera,
                        other: period.browser.other + visit.br_other,
                        safari: period.browser.safari + visit.br_safari
                    },
                    os: {
                        android: period.os.android + visit.os_android,
                        ios: period.os.ios + visit.os_ios,
                        linux: period.os.linux + visit.os_linux,
                        macos: period.os.macos + visit.os_macos,
                        other: period.os.other + visit.os_other,
                        windows: period.os.windows + visit.os_windows
                    },
                    country: {
                        ...period.country,
                        ...Object.entries(countries).reduce(
                            (obj, [country, count]) => ({
                                ...obj,
                                [country]: (period.country[country] || 0) + count
                            }), {}
                        )
                    },
                    referrer: {
                        ...period.referrer,
                        ...Object.entries(referrers).reduce(
                            (obj, [referrer, count]) => ({
                                ...obj,
                                [referrer]: (period.referrer[referrer] || 0) + count
                            }), {}
                        )
                    }
                };
                stats[type].views[index] += (visit.total || 0);
                stats[type].total += (visit.total || 0);
            });
        }
    } catch (error) {
        console.error('🚨 Error processing visit stats:', error);
        // Continue with partial data rather than failing completely
    } finally {
        // Clear timeout and ensure stream is closed
        clearTimeout(streamTimeout);
        if (!visitsStream.destroyed) {
            visitsStream.destroy();
        }
    }

    const response = {
        lastYear: {
            stats: utils.statsObjectToArray(stats.lastYear.stats),
            views: stats.lastYear.views,
            total: stats.lastYear.total
        },
        lastDay: {
            stats: utils.statsObjectToArray(stats.lastDay.stats),
            views: stats.lastDay.views,
            total: stats.lastDay.total
        },
        lastMonth: {
            stats: utils.statsObjectToArray(stats.lastMonth.stats),
            views: stats.lastMonth.views,
            total: stats.lastMonth.total
        },
        lastWeek: {
            stats: utils.statsObjectToArray(stats.lastWeek.stats),
            views: stats.lastWeek.views,
            total: stats.lastWeek.total
        },
        updatedAt: new Date()
    };

    if (match.link_id && env.REDIS_ENABLED && redis.isRedisReady()) {
        try {
            const key = redis.key.stats(match.link_id);
            // Longer cache TTL for expensive stats queries (5 minutes)
            await redis.safeRedisCommand('setex', key, 300, JSON.stringify(response));
        } catch (error) {
            // Redis not available, continue without cache
            console.warn('⚠️ Redis cache write failed for visit stats:', error.message);
        }
    }

    return response;
};


module.exports = {
    add,
    find
};