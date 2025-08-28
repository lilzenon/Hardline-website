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
        // Optimized connection settings for PostgreSQL
        ...(isPostgres && {
            statement_timeout: 30000, // 30 seconds
            query_timeout: 25000, // 25 seconds
            connectionTimeoutMillis: 10000, // 10 seconds
            idleTimeoutMillis: 30000, // 30 seconds
        }),
        pool: {
            min: env.DB_POOL_MIN || 1,
            max: env.DB_POOL_MAX || 2, // Reduced to 2 for better stability
            // Optimized timeouts for faster response
            acquireTimeoutMillis: 8000, // Reduced from 15s to 8s
            createTimeoutMillis: 6000, // Reduced from 10s to 6s
            destroyTimeoutMillis: 3000, // Reduced from 5s to 3s
            idleTimeoutMillis: 15000, // Reduced from 20s to 15s
            reapIntervalMillis: 500, // Check more frequently (every 500ms)
            createRetryIntervalMillis: 100, // Faster retry (every 100ms)
            // Validation and error handling
            propagateCreateError: false, // Don't crash on connection errors
            afterCreate: function(conn, done) {
                // Set connection-level timeouts for PostgreSQL
                if (isPostgres) {
                    conn.query('SET statement_timeout = 15000', function(err) { // Reduced from 30s to 15s
                        if (err) {
                            console.warn('⚠️ Failed to set statement_timeout:', err.message);
                        }
                        done(err, conn);
                    });
                } else {
                    done(null, conn);
                }
            },
            // Add connection validation
            validate: function(conn) {
                return conn && !conn.destroyed;
            },
            // Log connection pool events for debugging
            log: {
                warn: function(message) {
                    console.warn('🔶 DB Pool Warning:', message);
                },
                error: function(message) {
                    console.error('🔴 DB Pool Error:', message);
                },
                deprecate: function(message) {
                    console.warn('⚠️ DB Pool Deprecation:', message);
                }
            }
        }
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