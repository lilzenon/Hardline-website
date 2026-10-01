const knex = require('../knex');
const { CustomError } = require('../utils');

/**
 * Database Security Middleware
 * Provides additional security layers for database operations.
 *
 * HOW THE SQL-INJECTION SCANNER WORKS (read before changing it):
 *
 * Every database query in this codebase goes through Knex with bound parameters,
 * so request input is never spliced into SQL text. The scanner below is
 * defence-in-depth *monitoring*, not the primary defence, and it must never
 * break legitimate traffic:
 *
 *  - Read requests (GET / HEAD / OPTIONS) are NEVER blocked. A navigation whose
 *    query string merely looks suspicious is logged as a security event and
 *    then served normally. Blocking reads used to turn every Instagram and
 *    Facebook click into a 500, because `fbclid` click IDs are base64url tokens
 *    that routinely contain `--`, which matched the old "SQL comment" pattern.
 *    Hashtags (`#`) in search terms and `--` in UTM campaign names failed the
 *    same way.
 *
 *  - Write requests (POST / PUT / PATCH / DELETE) are rejected with a 400 only
 *    when a parameter matches a HIGH-CONFIDENCE SQL pattern such as
 *    `UNION SELECT`, `; DROP TABLE`, `OR 1=1` or `pg_sleep(`. Plain `--`, `#`,
 *    `/* ... *\/` or English words such as "system", "shell", "exec", "eval",
 *    "update" or "delete" are not evidence of an attack and are not matched;
 *    event copy like "doors at 9; drop by the box office #party" must save.
 *
 *  - Well-known third-party tracking parameters (fbclid, gclid, utm_*, ...) are
 *    never inspected at all. They are opaque tokens minted by other platforms,
 *    they are never used in a query, and inspecting them only produces noise.
 *
 *  - Express 5 exposes `req.query` as a getter: assigning `req.query = ...`
 *    is a silent no-op. The scanner therefore never tries to rewrite the
 *    request; it only inspects it.
 */

/**
 * High-confidence SQL injection patterns.
 * Each pattern requires real SQL *structure*, not just a keyword, so ordinary
 * prose, hashtags, dashes and base64 tokens do not match.
 */
const SQL_INJECTION_PATTERNS = [
    // Union-based: UNION [ALL|DISTINCT] SELECT
    /\bunion\b\s+(?:all\s+|distinct\s+)?select\b/i,

    // Tautology-based: OR 1=1, AND 'a'='a', OR "x" LIKE "x"
    /\b(?:or|and)\b\s*(?:'[^']*'|"[^"]*"|\d+)\s*(?:=|<>|!=|\blike\b)\s*(?:'[^']*'|"[^"]*"|\d+)/i,

    // Time-based blind: WAITFOR DELAY, SLEEP(, BENCHMARK(, PG_SLEEP(
    /\bwaitfor\s+delay\b|\b(?:sleep|benchmark|pg_sleep)\s*\(/i,

    // Error-based (MySQL XML functions)
    /\b(?:extractvalue|updatexml)\s*\(/i,

    // Stacked queries: ; DROP TABLE, ; TRUNCATE TABLE, ; ALTER TABLE ...
    /;\s*(?:drop|alter|truncate)\s+(?:table|database|schema|index|view|user|role)\b/i,

    // Stacked queries: ; DELETE FROM, ; INSERT INTO, ; UPDATE x SET, ; CREATE TABLE, ; EXEC(
    /;\s*(?:delete\s+from|insert\s+into|update\s+[\w."`]+\s+set|create\s+(?:table|database|schema|index|view|user|role)|exec(?:ute)?\s*\(|shutdown\b)/i,

    // Schema / file-system probing
    /\binformation_schema\s*\./i,
    /\b(?:pg_read_file|pg_ls_dir|load_file)\s*\(/i
];

/**
 * Third-party click / campaign identifiers that are appended to inbound links by
 * Instagram, Facebook, Google, TikTok, Microsoft, Mailchimp, HubSpot and others.
 * They are opaque, never reach a query, and are skipped by the scanner entirely.
 */
const TRACKING_PARAM_NAMES = new Set([
    // Meta (Facebook / Instagram / Threads)
    'fbclid', 'igshid', 'igsh', 'img_index', 'fb_action_ids', 'fb_action_types', 'fb_source', 'fb_ref',
    // Google (Ads, Analytics, Search)
    'gclid', 'gclsrc', 'dclid', 'gbraid', 'wbraid', 'srsltid', '_ga', '_gl', '_gid', 'gad_source', 'gad_campaignid',
    // Microsoft / Bing, TikTok, X, LinkedIn, Snapchat, Reddit, Pinterest, Yandex
    'msclkid', 'ttclid', 'twclid', 'li_fat_id', 'sccid', 'rdt_cid', 'epik', 'yclid',
    // Email / marketing automation
    'mc_cid', 'mc_eid', '_hsenc', '_hsmi', 'hsctatracking', 'mkt_tok', 'vero_id', 'vero_conv',
    'oly_anon_id', 'oly_enc_id', 'wickedid', 'ef_id', 's_kwcid', 'ncid', 'cmpid',
    // Generic referral markers
    'ref', 'ref_src', 'ref_url', 'si'
]);
const TRACKING_PARAM_PREFIXES = ['utm_', 'hsa_', 'pk_', 'piwik_', 'mtm_', 'matomo_', 'at_', 'sc_', 'ig_', 'fb_'];

const READ_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const MAX_SCAN_DEPTH = 6;
const MAX_SCAN_LENGTH = 10000; // only the first 10k chars of any single value are examined
const LOG_SAMPLE_LENGTH = 200;

/**
 * Is this query-string key a well-known third-party tracking parameter?
 * @param {string} key
 * @returns {boolean}
 */
function isTrackingParam(key) {
    const normalized = String(key).toLowerCase();
    if (TRACKING_PARAM_NAMES.has(normalized)) {
        return true;
    }
    return TRACKING_PARAM_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

/**
 * Detect potential SQL injection attempts
 * @param {string} input - Input string to check
 * @returns {boolean} - True if potential injection detected
 */
function detectSQLInjection(input) {
    if (!input || typeof input !== 'string') {
        return false;
    }

    const value = input.length > MAX_SCAN_LENGTH ? input.slice(0, MAX_SCAN_LENGTH) : input;
    return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(value));
}

/**
 * Walk one request section (query / body / params) and collect every key whose
 * value looks like SQL. Nested objects and arrays are inspected too.
 * @param {any} section
 * @param {{ skipTracking?: boolean }} [options] - skipTracking ignores top-level tracking params
 * @returns {Array<{ key: string, sample: string }>}
 */
function findSuspiciousInputs(section, options = {}) {
    const findings = [];
    const skipTracking = options.skipTracking === true;

    const visit = (value, keyPath, depth) => {
        if (value == null || depth > MAX_SCAN_DEPTH) {
            return;
        }

        if (typeof value === 'string') {
            if (detectSQLInjection(value)) {
                findings.push({ key: keyPath, sample: value.slice(0, LOG_SAMPLE_LENGTH) });
            }
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item, index) => visit(item, `${keyPath}[${index}]`, depth + 1));
            return;
        }

        if (typeof value === 'object') {
            Object.keys(value).forEach(key => {
                if (depth === 0 && skipTracking && isTrackingParam(key)) {
                    return;
                }
                visit(value[key], keyPath ? `${keyPath}.${key}` : key, depth + 1);
            });
        }
    };

    visit(section, '', 0);
    return findings;
}

/**
 * Sanitize database input
 * @param {any} input - Input to sanitize
 * @returns {any} - Sanitized input
 */
function sanitizeDatabaseInput(input) {
    if (typeof input === 'string') {
        // Remove null bytes and control characters
        return input.replace(/\0/g, '').replace(/[\x00-\x1F\x7F]/g, '');
    }

    if (Array.isArray(input)) {
        return input.map(sanitizeDatabaseInput);
    }

    if (input && typeof input === 'object') {
        const sanitized = {};
        Object.keys(input).forEach(key => {
            sanitized[key] = sanitizeDatabaseInput(input[key]);
        });
        return sanitized;
    }

    return input;
}

/**
 * Validate database query parameters
 * @param {Object} params - Query parameters
 * @returns {Object} - Validated parameters
 */
function validateQueryParams(params) {
    const validated = {};

    Object.keys(params || {}).forEach(key => {
        const value = params[key];

        // Check for SQL injection (tracking params are never inspected)
        if (typeof value === 'string' && !isTrackingParam(key) && detectSQLInjection(value)) {
            throw new CustomError(`Potential SQL injection detected in parameter: ${key}`, 400);
        }

        // Sanitize the value
        validated[key] = sanitizeDatabaseInput(value);
    });

    return validated;
}

/**
 * Database query security wrapper
 * @param {Function} queryFn - Query function to wrap
 * @returns {Function} - Wrapped query function
 */
function secureQuery(queryFn) {
    return async function(...args) {
        try {
            // Log query for monitoring (in development)
            if (process.env.NODE_ENV === 'development' && process.env.DB_DEBUG === 'true') {
                console.log('🔍 Executing secure query:', queryFn.toString().substring(0, 100));
            }

            // Execute query with timeout
            const result = await Promise.race([
                queryFn.apply(this, args),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Query timeout')), 30000)
                )
            ]);

            return result;
        } catch (error) {
            // Log database errors securely
            console.error('🚨 Database query error:', {
                error: error.message,
                code: error.code,
                timestamp: new Date().toISOString()
            });

            // Don't expose internal database errors
            if (error.message.includes('timeout')) {
                throw new CustomError('Database operation timed out', 503);
            }

            throw new CustomError('Database operation failed', 500);
        }
    };
}

/**
 * Best-effort hand-off to the security monitor so repeated probes from one IP
 * still raise an alert. Never throws and never delays the request.
 */
function recordSecurityEvent(req, details) {
    try {
        const { securityMonitor } = require('./security-monitoring.middleware');
        if (securityMonitor && typeof securityMonitor.logSecurityEvent === 'function') {
            Promise.resolve(securityMonitor.logSecurityEvent('sql_injection_attempt', {
                message: `Suspicious SQL-like input (${details.action})`,
                parameters: details.parameters.map(finding => finding.key),
                action: details.action
            }, req)).catch(() => {});
        }
    } catch (_) {
        // monitoring is optional
    }
}

/**
 * Middleware to detect SQL-like request input.
 * Reads are logged and served; writes with high-confidence SQL are rejected (400).
 */
function sqlInjectionProtection() {
    return (req, res, next) => {
        let findings = [];

        try {
            // Mounted at app level, req.params is always {} and req.body is not parsed
            // yet; both are still inspected so the middleware also works inside a router.
            findings = [
                ...findSuspiciousInputs(req.query, { skipTracking: true }),
                ...findSuspiciousInputs(req.body),
                ...findSuspiciousInputs(req.params)
            ];
        } catch (scanError) {
            // The scanner must never be the reason a request fails.
            console.error('🚨 SQL injection scanner error:', scanError.message);
            return next();
        }

        if (findings.length === 0) {
            return next();
        }

        const isRead = READ_METHODS.has(req.method);
        const details = {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl || req.url,
            userAgent: req.headers['user-agent'],
            referer: req.headers.referer,
            parameters: findings,
            action: isRead ? 'logged' : 'blocked',
            timestamp: new Date().toISOString()
        };

        console.warn('🚨 Suspicious SQL-like input detected:', details);
        recordSecurityEvent(req, details);

        if (isRead) {
            // Reads never splice input into SQL (every query is parameterised through
            // Knex), so the request is served normally after being logged.
            return next();
        }

        return next(new CustomError(`Potential SQL injection detected in parameter: ${findings[0].key}`, 400));
    };
}

/**
 * Database connection health check
 */
async function checkDatabaseHealth() {
    try {
        await knex.raw('SELECT 1');
        return { healthy: true, timestamp: new Date().toISOString() };
    } catch (error) {
        console.error('🚨 Database health check failed:', error.message);
        return {
            healthy: false,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Database connection monitoring
 */
function monitorDatabaseConnections() {
    setInterval(async() => {
        try {
            // CRITICAL FIX: Check if pool exists before accessing properties
            if (!knex || !knex.client || !knex.client.pool) {
                console.warn('⚠️ Database pool not available for monitoring');
                return;
            }

            const pool = knex.client.pool;

            // CRITICAL FIX: Safely access pool methods with fallbacks
            const stats = {
                used: typeof pool.numUsed === 'function' ? pool.numUsed() : 0,
                free: typeof pool.numFree === 'function' ? pool.numFree() : 0,
                pending: typeof pool.numPendingAcquires === 'function' ? pool.numPendingAcquires() : 0,
                pendingCreates: typeof pool.numPendingCreates === 'function' ? pool.numPendingCreates() : 0,
                max: pool.max || 0,
                min: pool.min || 0,
                timestamp: new Date().toISOString()
            };

            // Log if connection pool is under stress
            if (stats.pending > 5 || (stats.max > 0 && stats.used > (stats.max * 0.8))) {
                console.warn('⚠️ Database connection pool under stress:', stats);
            }

            // Log stats in development
            if (process.env.NODE_ENV === 'development') {
                console.log('📊 Database connection stats:', stats);
            }
        } catch (error) {
            console.error('🚨 Database monitoring error:', error.message);
        }
    }, 60000); // Check every minute
}

/**
 * Secure database transaction wrapper
 * @param {Function} transactionFn - Transaction function
 * @returns {Promise} - Transaction result
 */
async function secureTransaction(transactionFn) {
    const trx = await knex.transaction();

    try {
        // Set transaction timeout
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Transaction timeout')), 30000)
        );

        const result = await Promise.race([
            transactionFn(trx),
            timeoutPromise
        ]);

        await trx.commit();
        return result;
    } catch (error) {
        await trx.rollback();

        console.error('🚨 Database transaction error:', {
            error: error.message,
            timestamp: new Date().toISOString()
        });

        if (error.message.includes('timeout')) {
            throw new CustomError('Database transaction timed out', 503);
        }

        throw new CustomError('Database transaction failed', 500);
    }
}

/**
 * Initialize database security monitoring
 */
function initializeDatabaseSecurity() {
    // Start connection monitoring
    monitorDatabaseConnections();

    // Set up graceful shutdown
    process.on('SIGTERM', async() => {
        console.log('🔄 Gracefully closing database connections...');
        await knex.destroy();
        console.log('✅ Database connections closed');
    });

    process.on('SIGINT', async() => {
        console.log('🔄 Gracefully closing database connections...');
        await knex.destroy();
        console.log('✅ Database connections closed');
        process.exit(0);
    });
}

module.exports = {
    detectSQLInjection,
    isTrackingParam,
    findSuspiciousInputs,
    sanitizeDatabaseInput,
    validateQueryParams,
    secureQuery,
    sqlInjectionProtection,
    checkDatabaseHealth,
    secureTransaction,
    initializeDatabaseSecurity
};