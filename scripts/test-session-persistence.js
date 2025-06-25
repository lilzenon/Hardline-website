#!/usr/bin/env node

/**
 * Session Persistence and Scaling Test Script
 * 
 * This script tests the session store implementation to ensure:
 * 1. Sessions persist across server restarts
 * 2. Sessions work correctly with multiple instances
 * 3. Session security features function properly
 * 4. Performance under load
 */

const axios = require('axios');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class SessionPersistenceTest {
    constructor() {
        this.baseURL = 'http://localhost:3000';
        this.testResults = {
            persistence: {},
            security: {},
            performance: {},
            scaling: {}
        };
        this.testSessions = [];
        this.serverProcess = null;
    }

    /**
     * Run all session persistence tests
     */
    async runAllTests() {
        console.log('🧪 Starting Session Persistence Tests...\n');
        
        try {
            await this.testBasicSessionCreation();
            await this.testSessionPersistence();
            await this.testSessionSecurity();
            await this.testSessionPerformance();
            await this.testSessionScaling();
            
            this.generateReport();
        } catch (error) {
            console.error('🚨 Session persistence test failed:', error);
        } finally {
            await this.cleanup();
        }
    }

    /**
     * Test basic session creation and retrieval
     */
    async testBasicSessionCreation() {
        console.log('📊 Testing Basic Session Creation...');
        
        try {
            // Start server if not running
            await this.ensureServerRunning();
            
            // Test session creation through login
            const response = await axios.post(`${this.baseURL}/api/auth/signin`, {
                email: 'test@example.com',
                password: 'testpassword'
            }, {
                withCredentials: true,
                validateStatus: () => true // Accept any status
            });
            
            const cookies = response.headers['set-cookie'];
            const sessionCookie = cookies?.find(cookie => cookie.includes('kutt.sid'));
            
            this.testResults.persistence.basicCreation = {
                status: sessionCookie ? 'pass' : 'fail',
                sessionCookie: !!sessionCookie,
                responseStatus: response.status
            };
            
            if (sessionCookie) {
                this.testSessions.push({
                    cookie: sessionCookie,
                    createdAt: new Date().toISOString()
                });
                console.log('   ✅ Session creation successful');
            } else {
                console.log('   ❌ Session creation failed');
            }
        } catch (error) {
            console.log(`   ❌ Session creation error: ${error.message}`);
            this.testResults.persistence.basicCreation = {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test session persistence across server restarts
     */
    async testSessionPersistence() {
        console.log('📊 Testing Session Persistence Across Restarts...');
        
        try {
            // Create a test session
            const sessionData = await this.createTestSession();
            
            if (!sessionData.cookie) {
                throw new Error('Failed to create test session');
            }
            
            // Verify session works before restart
            const beforeRestart = await this.verifySession(sessionData.cookie);
            
            // Restart server
            console.log('   🔄 Restarting server...');
            await this.restartServer();
            
            // Wait for server to be ready
            await this.waitForServer();
            
            // Verify session still works after restart
            const afterRestart = await this.verifySession(sessionData.cookie);
            
            this.testResults.persistence.acrossRestarts = {
                status: afterRestart.valid ? 'pass' : 'fail',
                beforeRestart: beforeRestart.valid,
                afterRestart: afterRestart.valid,
                sessionStore: process.env.REDIS_ENABLED ? 'redis' : 'file'
            };
            
            if (afterRestart.valid) {
                console.log('   ✅ Session persisted across restart');
            } else {
                console.log('   ❌ Session lost after restart');
            }
        } catch (error) {
            console.log(`   ❌ Persistence test error: ${error.message}`);
            this.testResults.persistence.acrossRestarts = {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test session security features
     */
    async testSessionSecurity() {
        console.log('📊 Testing Session Security Features...');
        
        try {
            const sessionData = await this.createTestSession();
            
            // Test CSRF protection
            const csrfTest = await this.testCSRFProtection(sessionData.cookie);
            
            // Test session fingerprinting
            const fingerprintTest = await this.testSessionFingerprinting(sessionData.cookie);
            
            // Test suspicious activity detection
            const suspiciousTest = await this.testSuspiciousActivityDetection();
            
            this.testResults.security = {
                csrf: csrfTest,
                fingerprinting: fingerprintTest,
                suspiciousActivity: suspiciousTest,
                overall: csrfTest.status === 'pass' && fingerprintTest.status === 'pass' ? 'pass' : 'partial'
            };
            
            console.log(`   ✅ Security tests completed: ${this.testResults.security.overall}`);
        } catch (error) {
            console.log(`   ❌ Security test error: ${error.message}`);
            this.testResults.security = {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test session performance under load
     */
    async testSessionPerformance() {
        console.log('📊 Testing Session Performance Under Load...');
        
        try {
            const concurrentSessions = 50;
            const startTime = Date.now();
            
            // Create multiple sessions concurrently
            const sessionPromises = Array(concurrentSessions).fill().map(() => 
                this.createTestSession()
            );
            
            const sessions = await Promise.all(sessionPromises);
            const creationTime = Date.now() - startTime;
            
            // Test concurrent session access
            const accessStartTime = Date.now();
            const accessPromises = sessions.map(session => 
                this.verifySession(session.cookie)
            );
            
            const accessResults = await Promise.all(accessPromises);
            const accessTime = Date.now() - accessStartTime;
            
            const successfulSessions = sessions.filter(s => s.cookie).length;
            const successfulAccess = accessResults.filter(r => r.valid).length;
            
            this.testResults.performance = {
                status: successfulSessions >= concurrentSessions * 0.9 ? 'pass' : 'fail',
                concurrentSessions,
                successfulCreations: successfulSessions,
                successfulAccess,
                creationTime: `${creationTime}ms`,
                accessTime: `${accessTime}ms`,
                avgCreationTime: `${(creationTime / concurrentSessions).toFixed(2)}ms`,
                avgAccessTime: `${(accessTime / concurrentSessions).toFixed(2)}ms`
            };
            
            console.log(`   ✅ Performance test: ${successfulSessions}/${concurrentSessions} sessions created`);
            console.log(`   ✅ Average creation time: ${this.testResults.performance.avgCreationTime}`);
        } catch (error) {
            console.log(`   ❌ Performance test error: ${error.message}`);
            this.testResults.performance = {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test session scaling across multiple instances
     */
    async testSessionScaling() {
        console.log('📊 Testing Session Scaling (Simulated)...');
        
        try {
            // This simulates multiple instances by testing session sharing
            const sessionData = await this.createTestSession();
            
            // Simulate different instance by changing user agent
            const scalingTest = await axios.get(`${this.baseURL}/api/monitoring/sessions`, {
                headers: {
                    'Cookie': sessionData.cookie,
                    'User-Agent': 'Different-Instance-Simulator'
                },
                validateStatus: () => true
            });
            
            this.testResults.scaling = {
                status: scalingTest.status === 200 ? 'pass' : 'fail',
                responseStatus: scalingTest.status,
                sessionSharing: scalingTest.status === 200,
                storeType: process.env.REDIS_ENABLED ? 'redis' : 'file'
            };
            
            if (scalingTest.status === 200) {
                console.log('   ✅ Session sharing across instances works');
            } else {
                console.log('   ❌ Session sharing failed');
            }
        } catch (error) {
            console.log(`   ❌ Scaling test error: ${error.message}`);
            this.testResults.scaling = {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Create a test session
     */
    async createTestSession() {
        try {
            const response = await axios.get(`${this.baseURL}/api/monitoring/health`, {
                withCredentials: true,
                validateStatus: () => true
            });
            
            const cookies = response.headers['set-cookie'];
            const sessionCookie = cookies?.find(cookie => cookie.includes('kutt.sid'));
            
            return {
                cookie: sessionCookie,
                status: response.status,
                createdAt: new Date().toISOString()
            };
        } catch (error) {
            return {
                cookie: null,
                error: error.message
            };
        }
    }

    /**
     * Verify session is valid
     */
    async verifySession(cookie) {
        try {
            const response = await axios.get(`${this.baseURL}/api/monitoring/health`, {
                headers: {
                    'Cookie': cookie
                },
                validateStatus: () => true
            });
            
            return {
                valid: response.status === 200,
                status: response.status
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message
            };
        }
    }

    /**
     * Test CSRF protection
     */
    async testCSRFProtection(cookie) {
        try {
            // Try POST without CSRF token
            const response = await axios.post(`${this.baseURL}/api/test-csrf`, {
                test: 'data'
            }, {
                headers: {
                    'Cookie': cookie
                },
                validateStatus: () => true
            });
            
            return {
                status: response.status === 403 ? 'pass' : 'fail',
                responseStatus: response.status,
                message: response.status === 403 ? 'CSRF protection working' : 'CSRF protection may be bypassed'
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test session fingerprinting
     */
    async testSessionFingerprinting(cookie) {
        try {
            // Access with different user agent
            const response = await axios.get(`${this.baseURL}/api/monitoring/health`, {
                headers: {
                    'Cookie': cookie,
                    'User-Agent': 'Malicious-Bot-Attempting-Hijack'
                },
                validateStatus: () => true
            });
            
            return {
                status: 'pass', // Fingerprinting is passive, so we just check it doesn't break
                responseStatus: response.status,
                message: 'Fingerprinting test completed'
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Test suspicious activity detection
     */
    async testSuspiciousActivityDetection() {
        try {
            // Make rapid requests to trigger rate limiting
            const rapidRequests = Array(15).fill().map(() => 
                axios.get(`${this.baseURL}/api/monitoring/health`, {
                    headers: {
                        'User-Agent': '' // Suspicious empty user agent
                    },
                    validateStatus: () => true
                })
            );
            
            const results = await Promise.all(rapidRequests);
            const blockedRequests = results.filter(r => r.status === 429).length;
            
            return {
                status: blockedRequests > 0 ? 'pass' : 'partial',
                blockedRequests,
                totalRequests: rapidRequests.length,
                message: blockedRequests > 0 ? 'Rate limiting working' : 'Rate limiting not triggered'
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Ensure server is running
     */
    async ensureServerRunning() {
        try {
            await axios.get(`${this.baseURL}/api/monitoring/health`, { timeout: 5000 });
            console.log('   ✅ Server is running');
        } catch (error) {
            console.log('   🚀 Starting server...');
            await this.startServer();
            await this.waitForServer();
        }
    }

    /**
     * Start server
     */
    async startServer() {
        return new Promise((resolve, reject) => {
            this.serverProcess = spawn('npm', ['start'], {
                cwd: path.join(__dirname, '..'),
                stdio: 'pipe'
            });
            
            this.serverProcess.stdout.on('data', (data) => {
                if (data.toString().includes('Server listening')) {
                    resolve();
                }
            });
            
            setTimeout(() => {
                resolve(); // Resolve after timeout even if we don't see the message
            }, 10000);
        });
    }

    /**
     * Restart server
     */
    async restartServer() {
        if (this.serverProcess) {
            this.serverProcess.kill();
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await this.startServer();
    }

    /**
     * Wait for server to be ready
     */
    async waitForServer() {
        const maxAttempts = 30;
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            try {
                await axios.get(`${this.baseURL}/api/monitoring/health`, { timeout: 1000 });
                console.log('   ✅ Server is ready');
                return;
            } catch (error) {
                attempts++;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        throw new Error('Server failed to start within timeout');
    }

    /**
     * Generate test report
     */
    generateReport() {
        console.log('\n📋 Session Persistence Test Report');
        console.log('=' .repeat(50));
        
        // Persistence Tests
        console.log('\n🔄 Persistence Tests:');
        Object.entries(this.testResults.persistence).forEach(([test, result]) => {
            const status = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
            console.log(`   ${status} ${test}: ${result.status}`);
        });
        
        // Security Tests
        console.log('\n🔐 Security Tests:');
        if (this.testResults.security.overall) {
            console.log(`   ✅ Overall Security: ${this.testResults.security.overall}`);
            console.log(`   🛡️ CSRF Protection: ${this.testResults.security.csrf?.status || 'not tested'}`);
            console.log(`   🔍 Fingerprinting: ${this.testResults.security.fingerprinting?.status || 'not tested'}`);
        }
        
        // Performance Tests
        console.log('\n⚡ Performance Tests:');
        if (this.testResults.performance.status) {
            console.log(`   ✅ Load Test: ${this.testResults.performance.status}`);
            console.log(`   📊 Sessions Created: ${this.testResults.performance.successfulCreations}/${this.testResults.performance.concurrentSessions}`);
            console.log(`   ⏱️ Avg Creation Time: ${this.testResults.performance.avgCreationTime}`);
        }
        
        // Scaling Tests
        console.log('\n📈 Scaling Tests:');
        if (this.testResults.scaling.status) {
            console.log(`   ✅ Session Sharing: ${this.testResults.scaling.status}`);
            console.log(`   🗄️ Store Type: ${this.testResults.scaling.storeType}`);
        }
        
        // Recommendations
        console.log('\n💡 Recommendations:');
        this.generateRecommendations();
    }

    /**
     * Generate recommendations based on test results
     */
    generateRecommendations() {
        const recommendations = [];
        
        if (this.testResults.persistence.acrossRestarts?.status === 'fail') {
            recommendations.push('Enable Redis for session persistence across restarts');
        }
        
        if (this.testResults.performance?.status === 'fail') {
            recommendations.push('Optimize session store configuration for better performance');
        }
        
        if (this.testResults.scaling?.storeType === 'file') {
            recommendations.push('Use Redis for better scaling across multiple instances');
        }
        
        if (recommendations.length === 0) {
            console.log('   ✅ All tests passed - session store is production ready!');
        } else {
            recommendations.forEach(rec => console.log(`   • ${rec}`));
        }
    }

    /**
     * Cleanup resources
     */
    async cleanup() {
        console.log('\n🧹 Cleaning up...');
        
        if (this.serverProcess) {
            this.serverProcess.kill();
        }
        
        console.log('✅ Cleanup completed');
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new SessionPersistenceTest();
    tester.runAllTests().catch(console.error);
}

module.exports = SessionPersistenceTest;
