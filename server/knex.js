const knex = require("knex");

const env = require("./env");

const isSQLite = env.DB_CLIENT === "sqlite3" || env.DB_CLIENT === "better-sqlite3";
const isPostgres = env.DB_CLIENT === "pg" || env.DB_CLIENT === "pg-native";
const isMySQL = env.DB_CLIENT === "mysql" || env.DB_CLIENT === "mysql2";

const db = knex({
    client: env.DB_CLIENT,
    connection: {
        ...(isSQLite && { filename: env.DB_FILENAME }),
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        ssl: env.DB_SSL,
        // PostgreSQL client-level timeouts (forwarded by node-postgres)
        ...(isPostgres && {
            statement_timeout: 15000,
            query_timeout: 12000,
            lock_timeout: 10000,
        }),
    },
    pool: {
        min: env.DB_POOL_MIN || 2,
        max: env.DB_POOL_MAX || 10,
        acquireTimeoutMillis: 8000,
        createTimeoutMillis: 10000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
        propagateCreateError: false,
        afterCreate: function (conn, done) {
            if (!isPostgres) return done(null, conn);
            // SET applies to this session only; needed because pool reuses connections
            const setStatements = [
                'SET statement_timeout = 15000',
                'SET lock_timeout = 10000',
                'SET idle_in_transaction_session_timeout = 20000',
            ].join('; ');
            conn.query(setStatements, function (err) {
                if (err) {
                    console.warn('⚠️ Failed to apply PostgreSQL session timeouts:', err.message);
                    return done(err, conn);
                }
                done(null, conn);
            });
        },
        validate: function (conn) {
            return conn && !conn.destroyed;
        },
    },
    useNullAsDefault: true,
    // Global query timeout
    asyncStackTraces: env.NODE_ENV === 'development',
    debug: env.NODE_ENV === 'development' && env.DB_DEBUG === 'true',
    // Performance optimizations
    acquireConnectionTimeout: 15000,
    // Log slow queries in production
    log: {
        warn(message) {
            console.warn('🐌 Knex Warning:', message);
        },
        error(message) {
            console.error('🚨 Knex Error:', message);
        },
        deprecate(message) {
            console.warn('⚠️ Knex Deprecation:', message);
        },
        debug(message) {
            if (env.NODE_ENV === 'development') {
                console.log('🔍 Knex Debug:', message);
            }
        }
    }
});

db.isPostgres = isPostgres;
db.isSQLite = isSQLite;
db.isMySQL = isMySQL;

db.compatibleILIKE = isPostgres ? "andWhereILike" : "andWhereLike";

module.exports = db;