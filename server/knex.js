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
        // Optimized connection settings for PostgreSQL (PERFORMANCE TUNED for dashboard)
        ...(isPostgres && {
            // TIMEOUT FIX: Increased PostgreSQL timeouts to prevent 12-second frontend timeouts
            statement_timeout: 15000, // 15 seconds - allows complex queries to complete
            query_timeout: 12000, // 12 seconds - matches frontend timeout expectation
            connectionTimeoutMillis: 8000, // 8 seconds - stable connection establishment
            idleTimeoutMillis: 30000, // 30 seconds - keep connections alive longer
            // Add lock timeout to prevent deadlocks
            lock_timeout: 10000, // 10 seconds - prevent indefinite lock waits
        }),
        pool: {
            min: env.DB_POOL_MIN || 2, // Increased minimum for better availability
            max: env.DB_POOL_MAX || 5, // Increased to 5 for better concurrency under load
            // TIMEOUT FIX: Optimized for 12-second frontend timeout resolution
            acquireTimeoutMillis: 8000, // Increased to 8s to prevent pool exhaustion
            createTimeoutMillis: 10000, // Increased to 10s for stable connections
            destroyTimeoutMillis: 5000, // Increased to 5s for proper cleanup
            idleTimeoutMillis: 30000, // Increased to 30s to keep connections alive longer
            reapIntervalMillis: 1000, // Check every 1s for balanced performance
            createRetryIntervalMillis: 200, // Retry every 200ms for stability
            // Enhanced validation and error handling
            propagateCreateError: false, // Don't crash on connection errors
            // Add eviction policy to prevent stale connections
            evictionRunIntervalMillis: 10000, // Run eviction every 10s
            numTestsPerEvictionRun: 3, // Test 3 connections per eviction run
            softIdleTimeoutMillis: 20000, // Soft idle timeout before eviction
            afterCreate: function(conn, done) {
                // TIMEOUT FIX: Set optimized PostgreSQL session parameters
                if (isPostgres) {
                    // Set multiple timeout parameters for comprehensive coverage
                    const timeoutQueries = [
                        'SET statement_timeout = 15000', // 15s for complex queries
                        'SET lock_timeout = 10000', // 10s to prevent deadlocks
                        'SET idle_in_transaction_session_timeout = 20000', // 20s for idle transactions
                        'SET tcp_keepalives_idle = 300', // 5 minutes for TCP keepalive
                        'SET tcp_keepalives_interval = 30', // 30s keepalive interval
                        'SET tcp_keepalives_count = 3' // 3 keepalive probes
                    ];

                    let completed = 0;
                    let hasError = false;

                    timeoutQueries.forEach(query => {
                        conn.query(query, function(err) {
                            if (err && !hasError) {
                                hasError = true;
                                console.warn(`⚠️ Failed to set PostgreSQL parameter: ${query}`, err.message);
                                return done(err, conn);
                            }
                            completed++;
                            if (completed === timeoutQueries.length && !hasError) {
                                console.log('✅ PostgreSQL connection optimized for timeout prevention');
                                done(null, conn);
                            }
                        });
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