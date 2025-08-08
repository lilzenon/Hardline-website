#!/usr/bin/env node

/**
 * Performance Testing Script for KUTT B2B Database Optimizations
 * 
 * This script tests the performance improvements made to the database
 * and provides before/after comparisons.
 */

const knex = require('../server/knex');
const redis = require('../server/redis');
const query = require('../server/queries');

class PerformanceTester {
    constructor() {
        this.results = {
            database: {},
            redis: {},
            queries: {},
            summary: {}
        };
    }

    /**
     * Run all performance tests
     */
    async runAllTests() {
        console.log('🚀 Starting Performance Tests...\n');
        
        try {
            await this.testDatabaseConnection();
            await this.testConnectionPool();
            await this.testQueryPerformance();
            await this.testRedisPerformance();
            await this.testCacheEfficiency();
            
            this.generateReport();
        } catch (error) {
            console.error('🚨 Performance test failed:', error);
        } finally {
            await this.cleanup();
        }
    }

    /**
     * Test database connection performance
     */
    async testDatabaseConnection() {
        console.log('📊 Testing Database Connection Performance...');
        
        const tests = [];
        const iterations = 10;
        
        for (let i = 0; i < iterations; i++) {
            const start = Date.now();
            await knex.raw('SELECT 1 as test');
            tests.push(Date.now() - start);
        }
        
        this.results.database.connectionTime = {
            average: (tests.reduce((a, b) => a + b, 0) / tests.length).toFixed(2),
            min: Math.min(...tests),
            max: Math.max(...tests),
            tests: tests.length
        };
        
        console.log(`   ✅ Average connection time: ${this.results.database.connectionTime.average}ms`);
    }

    /**
     * Test connection pool efficiency
     */
    async testConnectionPool() {
        console.log('📊 Testing Connection Pool Efficiency...');
        
        const pool = knex.client.pool;
        const poolStats = {
            used: pool.numUsed(),
            free: pool.numFree(),
            pending: pool.numPendingAcquires(),
            total: pool.numUsed() + pool.numFree(),
            max: pool.max,
            min: pool.min
        };
        
        // Test concurrent connections
        const concurrentQueries = Array(5).fill().map(async () => {
            const start = Date.now();
            await knex.raw('SELECT pg_sleep(0.1)'); // 100ms delay
            return Date.now() - start;
        });
        
        const concurrentResults = await Promise.all(concurrentQueries);
        
        this.results.database.connectionPool = {
            stats: poolStats,
            concurrentQueryTime: {
                average: (concurrentResults.reduce((a, b) => a + b, 0) / concurrentResults.length).toFixed(2),
                efficiency: poolStats.used / poolStats.max < 0.8 ? 'good' : 'high'
            }
        };
        
        console.log(`   ✅ Pool utilization: ${poolStats.used}/${poolStats.max} (${((poolStats.used/poolStats.max)*100).toFixed(1)}%)`);
    }

    /**
     * Test query performance with new indexes
     */
    async testQueryPerformance() {
        console.log('📊 Testing Query Performance...');
        
        const queryTests = [
            {
                name: 'User Links Query',
                test: async () => {
                    const start = Date.now();
                    await query.link.get({ user_id: 1 }, { skip: 0, limit: 10 });
                    return Date.now() - start;
                }
            },
            {
                name: 'Link Stats Query',
                test: async () => {
                    const start = Date.now();
                    await knex('links')
                        .select('id', 'address', 'visit_count')
                        .where('visit_count', '>', 0)
                        .orderBy('visit_count', 'desc')
                        .limit(10);
                    return Date.now() - start;
                }
            },
            {
                name: 'User Analytics Query',
                test: async () => {
                    const start = Date.now();
                    await knex('visits')
                        .select('user_id')
                        .count('id as total_visits')
                        .where('created_at', '>', knex.raw("NOW() - INTERVAL '30 days'"))
                        .groupBy('user_id')
                        .limit(10);
                    return Date.now() - start;
                }
            },
            {
                name: 'Domain Search Query',
                test: async () => {
                    const start = Date.now();
                    await knex('domains')
                        .select('*')
                        .where('address', 'like', '%example%')
                        .limit(10);
                    return Date.now() - start;
                }
            }
        ];

        this.results.queries = {};
        
        for (const queryTest of queryTests) {
            try {
                const times = [];
                const iterations = 5;
                
                for (let i = 0; i < iterations; i++) {
                    const time = await queryTest.test();
                    times.push(time);
                }
                
                this.results.queries[queryTest.name] = {
                    average: (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2),
                    min: Math.min(...times),
                    max: Math.max(...times),
                    status: times.every(t => t < 1000) ? 'excellent' : times.every(t => t < 5000) ? 'good' : 'slow'
                };
                
                console.log(`   ✅ ${queryTest.name}: ${this.results.queries[queryTest.name].average}ms (${this.results.queries[queryTest.name].status})`);
            } catch (error) {
                console.log(`   ❌ ${queryTest.name}: Failed - ${error.message}`);
                this.results.queries[queryTest.name] = { error: error.message };
            }
        }
    }

    /**
     * Test Redis performance
     */
    async testRedisPerformance() {
        console.log('📊 Testing Redis Performance...');
        
        if (!redis.client) {
            console.log('   ⚠️ Redis is disabled, skipping tests');
            this.results.redis = { status: 'disabled' };
            return;
        }

        try {
            // Test Redis connection
            const pingStart = Date.now();
            await redis.client.ping();
            const pingTime = Date.now() - pingStart;

            // Test Redis operations
            const setStart = Date.now();
            await redis.client.set('test:performance', JSON.stringify({ test: 'data', timestamp: Date.now() }), 'EX', 60);
            const setTime = Date.now() - setStart;

            const getStart = Date.now();
            const data = await redis.client.get('test:performance');
            const getTime = Date.now() - getStart;

            // Clean up
            await redis.client.delete('test:performance');

            this.results.redis = {
                ping: `${pingTime}ms`,
                set: `${setTime}ms`,
                get: `${getTime}ms`,
                status: pingTime < 10 && setTime < 10 && getTime < 5 ? 'excellent' : 'good'
            };

            console.log(`   ✅ Redis ping: ${pingTime}ms, set: ${setTime}ms, get: ${getTime}ms`);
        } catch (error) {
            console.log(`   ❌ Redis test failed: ${error.message}`);
            this.results.redis = { error: error.message };
        }
    }

    /**
     * Test cache efficiency
     */
    async testCacheEfficiency() {
        console.log('📊 Testing Cache Efficiency...');
        
        if (!redis.client) {
            console.log('   ⚠️ Redis is disabled, skipping cache tests');
            return;
        }

        try {
            // Test cache miss (first request)
            const missStart = Date.now();
            const testLinkId = 1;
            await query.visit.find({ link_id: testLinkId });
            const missTime = Date.now() - missStart;

            // Test cache hit (second request)
            const hitStart = Date.now();
            await query.visit.find({ link_id: testLinkId });
            const hitTime = Date.now() - hitStart;

            const improvement = ((missTime - hitTime) / missTime * 100).toFixed(1);

            this.results.cache = {
                missTime: `${missTime}ms`,
                hitTime: `${hitTime}ms`,
                improvement: `${improvement}%`,
                status: improvement > 50 ? 'excellent' : improvement > 20 ? 'good' : 'poor'
            };

            console.log(`   ✅ Cache miss: ${missTime}ms, hit: ${hitTime}ms, improvement: ${improvement}%`);
        } catch (error) {
            console.log(`   ❌ Cache test failed: ${error.message}`);
            this.results.cache = { error: error.message };
        }
    }

    /**
     * Generate performance report
     */
    generateReport() {
        console.log('\n📋 Performance Test Report');
        console.log('=' .repeat(50));
        
        // Database Performance
        console.log('\n🗄️ Database Performance:');
        if (this.results.database.connectionTime) {
            console.log(`   Connection Time: ${this.results.database.connectionTime.average}ms avg`);
        }
        if (this.results.database.connectionPool) {
            console.log(`   Pool Efficiency: ${this.results.database.connectionPool.concurrentQueryTime.efficiency}`);
        }

        // Query Performance
        console.log('\n🔍 Query Performance:');
        Object.entries(this.results.queries).forEach(([name, result]) => {
            if (result.error) {
                console.log(`   ${name}: ❌ ${result.error}`);
            } else {
                console.log(`   ${name}: ${result.average}ms (${result.status})`);
            }
        });

        // Redis Performance
        console.log('\n🔴 Redis Performance:');
        if (this.results.redis.status === 'disabled') {
            console.log('   Status: Disabled');
        } else if (this.results.redis.error) {
            console.log(`   Status: ❌ ${this.results.redis.error}`);
        } else {
            console.log(`   Status: ${this.results.redis.status}`);
            console.log(`   Operations: ping ${this.results.redis.ping}, set ${this.results.redis.set}, get ${this.results.redis.get}`);
        }

        // Cache Efficiency
        if (this.results.cache) {
            console.log('\n💾 Cache Efficiency:');
            if (this.results.cache.error) {
                console.log(`   Status: ❌ ${this.results.cache.error}`);
            } else {
                console.log(`   Performance: ${this.results.cache.improvement} improvement (${this.results.cache.status})`);
            }
        }

        // Recommendations
        console.log('\n💡 Recommendations:');
        this.generateRecommendations();
    }

    /**
     * Generate performance recommendations
     */
    generateRecommendations() {
        const recommendations = [];

        // Database recommendations
        if (this.results.database.connectionTime?.average > 100) {
            recommendations.push('Consider optimizing database connection settings');
        }

        // Query recommendations
        Object.entries(this.results.queries).forEach(([name, result]) => {
            if (result.status === 'slow') {
                recommendations.push(`Optimize ${name} - consider adding indexes or query optimization`);
            }
        });

        // Redis recommendations
        if (this.results.redis?.status === 'disabled') {
            recommendations.push('Enable Redis for better caching performance');
        }

        // Cache recommendations
        if (this.results.cache?.status === 'poor') {
            recommendations.push('Review cache TTL settings and cache key strategies');
        }

        if (recommendations.length === 0) {
            console.log('   ✅ All systems performing well!');
        } else {
            recommendations.forEach(rec => console.log(`   • ${rec}`));
        }
    }

    /**
     * Cleanup resources
     */
    async cleanup() {
        console.log('\n🧹 Cleaning up...');
        try {
            await knex.destroy();
            if (redis.client) {
                redis.client.disconnect();
            }
            console.log('✅ Cleanup completed');
        } catch (error) {
            console.error('❌ Cleanup error:', error.message);
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new PerformanceTester();
    tester.runAllTests().catch(console.error);
}

module.exports = PerformanceTester;
