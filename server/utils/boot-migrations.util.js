/**
 * Run pending Knex migrations AFTER the HTTP server is listening.
 *
 * WHY: the Dockerfile used to run `npm run migrate && npm start`, so
 *   - a DB blip at boot = the container exits before listening = platform
 *     crash loop, and every visitor gets a cold start;
 *   - every cold start waited on the migration round trip before binding
 *     the port, even when nothing was pending.
 * Now the server binds first and migrations run here, with retries, and a
 * failure is logged loudly but NEVER exits the process: a running site with
 * one pending index is strictly better than no site.
 *
 * Stale locks: if a previous container was killed mid-migration the
 * knex_migrations_lock row stays set and every later `latest()` fails with
 * "Migration table is already locked". We only force-free it when a locked
 * attempt has already failed AND the completed-migration list has not moved
 * between two consecutive locked attempts (a live migrator on another
 * instance would be making progress). forceFreeMigrationsLock() is never
 * called before a failed attempt.
 */

const DEFAULTS = {
    attempts: 3,
    delayMs: 5000,
};

function isLockedError(err) {
    const msg = String((err && err.message) || err || '').toLowerCase();
    return msg.includes('already locked') || msg.includes('migration table is locked');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function completedCount(knex, config) {
    try {
        const list = await knex.migrate.list(config);
        // knex returns [completed[], pending[]]
        return Array.isArray(list) && Array.isArray(list[0]) ? list[0].length : -1;
    } catch (_) {
        return -1;
    }
}

/**
 * @param {object} opts
 * @param {import('knex').Knex} opts.knex    the app's knex instance
 * @param {object} opts.config               knex migration config (directory, tableName, ...)
 * @param {number} [opts.attempts=3]
 * @param {number} [opts.delayMs=5000]
 * @param {object} [opts.logger=console]
 * @returns {Promise<{ok:boolean, attempts:number, batch?:number, migrations?:string[], error?:Error}>}
 *   Always resolves; never throws.
 */
async function runMigrationsWithRetry({ knex, config, attempts = DEFAULTS.attempts, delayMs = DEFAULTS.delayMs, logger = console }) {
    let lastError = null;
    let lastLockedCompleted = null; // completed count seen at the previous locked failure

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const [batch, migrations] = await knex.migrate.latest(config);
            if (migrations && migrations.length) {
                logger.log(`✅ Migrations applied (batch ${batch}): ${migrations.join(', ')}`);
            } else {
                logger.log('✅ Migrations: nothing pending');
            }
            return { ok: true, attempts: attempt, batch, migrations: migrations || [] };
        } catch (err) {
            lastError = err;
            const locked = isLockedError(err);
            logger.error(`⚠️ Migration attempt ${attempt}/${attempts} failed${locked ? ' (table locked)' : ''}: ${err && err.message}`);

            if (locked) {
                const completed = await completedCount(knex, config);
                // Only after a FAILED locked attempt, and only when the other
                // side made no progress since the last locked attempt.
                if (lastLockedCompleted !== null && completed === lastLockedCompleted) {
                    try {
                        await knex.migrate.forceFreeMigrationsLock(config);
                        logger.warn('🔓 Released a stale migration lock (no other instance made progress between attempts)');
                    } catch (freeErr) {
                        logger.error('⚠️ Could not release migration lock:', freeErr && freeErr.message);
                    }
                }
                lastLockedCompleted = completed;
            }

            if (attempt < attempts) await sleep(delayMs);
        }
    }

    logger.error('🚨 MIGRATIONS FAILED after all attempts — server keeps running on the current schema. Run `npm run migrate` manually and investigate:', lastError && lastError.message);
    return { ok: false, attempts, error: lastError };
}

module.exports = { runMigrationsWithRetry, isLockedError };
