/**
 * Single source of truth for the LOG_LEVEL knob.
 *
 * WHY: stdout on DigitalOcean App Platform is synchronous. At the default
 * level the server used to write one line per request plus ~15 lines per
 * homepage render, which is real event-loop time on the hot path. Anything
 * that fires per request or per render belongs behind `isVerbose()`; startup,
 * warnings and errors stay unconditional. server.js re-exports these so the
 * existing `CURRENT_LOG_LEVEL >= LOG_LEVELS.VERBOSE` checks keep working.
 */
const LOG_LEVELS = {
    MINIMAL: 1, // Only webhook requests and errors
    NORMAL: 2,  // Standard logging (default)
    VERBOSE: 3, // Detailed debugging (per-request / per-render lines)
    DEBUG: 4    // Full debugging with all headers
};

const CURRENT_LOG_LEVEL = process.env.LOG_LEVEL
    ? (LOG_LEVELS[String(process.env.LOG_LEVEL).toUpperCase()] || LOG_LEVELS.NORMAL)
    : LOG_LEVELS.NORMAL;

function isVerbose() {
    return CURRENT_LOG_LEVEL >= LOG_LEVELS.VERBOSE;
}

/** console.log that only fires at LOG_LEVEL=VERBOSE or above. */
function verboseLog(...args) {
    if (CURRENT_LOG_LEVEL >= LOG_LEVELS.VERBOSE) console.log(...args);
}

module.exports = { LOG_LEVELS, CURRENT_LOG_LEVEL, isVerbose, verboseLog };
