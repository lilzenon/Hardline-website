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
            max: env.DB_POOL_MAX || 8, // Reduced for Basic tier
            // Connection pool timeouts optimized for Render Basic tier
            acquireTimeoutMillis: 15000, // 15 seconds to acquire connection
            createTimeoutMillis: 10000, // 10 seconds to create connection
            destroyTimeoutMillis: 5000, // 5 seconds to destroy connection
            idleTimeoutMillis: 30000, // 30 seconds idle timeout
            reapIntervalMillis: 1000, // Check for idle connections every second
            createRetryIntervalMillis: 200, // Retry connection creation every 200ms
            // Validation and error handling
            propagateCreateError: false, // Don't crash on connection errors
            afterCreate: function(conn, done) {
                // Set connection-level timeouts for PostgreSQL
                if (isPostgres) {
                    conn.query('SET statement_timeout = 30000', function(err) {
                        if (err) {
                            console.warn('⚠️ Failed to set statement_timeout:', err.message);
                        }
                        done(err, conn);
                    });
                } else {
                    done(null, conn);
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