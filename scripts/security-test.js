#!/usr/bin/env node

/**
 * Comprehensive Security Testing Script
 * Tests all implemented security measures
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class SecurityTester {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    /**
     * Run all security tests
     */
    async runAllTests() {
        console.log('🔒 Starting comprehensive security tests...\n');

        await this.testSecurityHeaders();
        await this.testCSPHeaders();
        await this.testHTTPSRedirection();
        await this.testRateLimiting();
        await this.testInputValidation();
        await this.testSQLInjectionProtection();
        await this.testXSSProtection();
        await this.testCSRFProtection();
        await this.testAuthenticationSecurity();
        await this.testSessionSecurity();

        this.printResults();
    }

    /**
     * Test security headers
     */
    async testSecurityHeaders() {
        console.log('🛡️ Testing Security Headers...');

        const requiredHeaders = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': ['DENY', 'SAMEORIGIN'],
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Strict-Transport-Security': null // Should exist in production
        };

        try {
            const response = await this.makeRequest('/');
            
            for (const [header, expectedValue] of Object.entries(requiredHeaders)) {
                const actualValue = response.headers[header.toLowerCase()];
                
                if (!actualValue) {
                    this.addResult(false, `Missing security header: ${header}`);
                } else if (expectedValue && Array.isArray(expectedValue)) {
                    if (expectedValue.includes(actualValue)) {
                        this.addResult(true, `Security header ${header} is correctly set`);
                    } else {
                        this.addResult(false, `Security header ${header} has incorrect value: ${actualValue}`);
                    }
                } else if (expectedValue && actualValue !== expectedValue) {
                    this.addResult(false, `Security header ${header} has incorrect value: ${actualValue}`);
                } else {
                    this.addResult(true, `Security header ${header} is correctly set`);
                }
            }
        } catch (error) {
            this.addResult(false, `Failed to test security headers: ${error.message}`);
        }
    }

    /**
     * Test Content Security Policy
     */
    async testCSPHeaders() {
        console.log('🛡️ Testing Content Security Policy...');

        try {
            const response = await this.makeRequest('/');
            const csp = response.headers['content-security-policy'];
            
            if (!csp) {
                this.addResult(false, 'Missing Content-Security-Policy header');
                return;
            }

            const requiredDirectives = [
                'default-src',
                'script-src',
                'style-src',
                'img-src',
                'object-src'
            ];

            for (const directive of requiredDirectives) {
                if (csp.includes(directive)) {
                    this.addResult(true, `CSP contains ${directive} directive`);
                } else {
                    this.addResult(false, `CSP missing ${directive} directive`);
                }
            }

            // Check for unsafe directives
            if (csp.includes("'unsafe-eval'") && !csp.includes('development')) {
                this.addResult(false, "CSP contains 'unsafe-eval' in production");
            } else {
                this.addResult(true, "CSP does not contain dangerous 'unsafe-eval'");
            }

        } catch (error) {
            this.addResult(false, `Failed to test CSP: ${error.message}`);
        }
    }

    /**
     * Test HTTPS redirection
     */
    async testHTTPSRedirection() {
        console.log('🔒 Testing HTTPS Redirection...');

        if (this.baseUrl.startsWith('https://')) {
            try {
                const httpUrl = this.baseUrl.replace('https://', 'http://');
                const response = await this.makeRequest('/', { baseUrl: httpUrl, followRedirects: false });
                
                if (response.statusCode >= 300 && response.statusCode < 400) {
                    const location = response.headers.location;
                    if (location && location.startsWith('https://')) {
                        this.addResult(true, 'HTTP requests are redirected to HTTPS');
                    } else {
                        this.addResult(false, 'HTTP requests are not properly redirected to HTTPS');
                    }
                } else {
                    this.addResult(false, 'HTTP requests are not redirected');
                }
            } catch (error) {
                this.addResult(false, `Failed to test HTTPS redirection: ${error.message}`);
            }
        } else {
            this.addResult(false, 'Application is not running on HTTPS');
        }
    }

    /**
     * Test rate limiting
     */
    async testRateLimiting() {
        console.log('⏱️ Testing Rate Limiting...');

        try {
            const requests = [];
            for (let i = 0; i < 10; i++) {
                requests.push(this.makeRequest('/api/auth/admin/login', {
                    method: 'POST',
                    body: JSON.stringify({ email: 'test@test.com', password: 'test' }),
                    headers: { 'Content-Type': 'application/json' }
                }));
            }

            const responses = await Promise.all(requests);
            const rateLimited = responses.some(r => r.statusCode === 429);

            if (rateLimited) {
                this.addResult(true, 'Rate limiting is working');
            } else {
                this.addResult(false, 'Rate limiting may not be working properly');
            }
        } catch (error) {
            this.addResult(false, `Failed to test rate limiting: ${error.message}`);
        }
    }

    /**
     * Test input validation
     */
    async testInputValidation() {
        console.log('✅ Testing Input Validation...');

        const testCases = [
            { email: '', password: 'test123' }, // Empty email
            { email: 'invalid-email', password: 'test123' }, // Invalid email
            { email: 'test@test.com', password: '' }, // Empty password
            { email: 'test@test.com', password: '123' }, // Short password
        ];

        for (const testCase of testCases) {
            try {
                const response = await this.makeRequest('/api/auth/admin/login', {
                    method: 'POST',
                    body: JSON.stringify(testCase),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.statusCode === 400) {
                    this.addResult(true, `Input validation rejected invalid data: ${JSON.stringify(testCase)}`);
                } else {
                    this.addResult(false, `Input validation failed to reject: ${JSON.stringify(testCase)}`);
                }
            } catch (error) {
                this.addResult(false, `Failed to test input validation: ${error.message}`);
            }
        }
    }

    /**
     * Test SQL injection protection
     */
    async testSQLInjectionProtection() {
        console.log('💉 Testing SQL Injection Protection...');

        const sqlInjectionPayloads = [
            "'; DROP TABLE users; --",
            "' OR '1'='1",
            "' UNION SELECT * FROM users --",
            "'; INSERT INTO users VALUES ('hacker', 'password'); --"
        ];

        for (const payload of sqlInjectionPayloads) {
            try {
                const response = await this.makeRequest('/api/auth/admin/login', {
                    method: 'POST',
                    body: JSON.stringify({ email: payload, password: 'test' }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.statusCode === 400) {
                    this.addResult(true, `SQL injection payload blocked: ${payload.substring(0, 20)}...`);
                } else {
                    this.addResult(false, `SQL injection payload not blocked: ${payload.substring(0, 20)}...`);
                }
            } catch (error) {
                this.addResult(false, `Failed to test SQL injection protection: ${error.message}`);
            }
        }
    }

    /**
     * Test XSS protection
     */
    async testXSSProtection() {
        console.log('🚫 Testing XSS Protection...');

        const xssPayloads = [
            '<script>alert("XSS")</script>',
            'javascript:alert("XSS")',
            '<img src="x" onerror="alert(\'XSS\')">'
        ];

        for (const payload of xssPayloads) {
            try {
                const response = await this.makeRequest('/api/auth/admin/login', {
                    method: 'POST',
                    body: JSON.stringify({ email: payload, password: 'test' }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.statusCode === 400) {
                    this.addResult(true, `XSS payload blocked: ${payload.substring(0, 20)}...`);
                } else {
                    this.addResult(false, `XSS payload not blocked: ${payload.substring(0, 20)}...`);
                }
            } catch (error) {
                this.addResult(false, `Failed to test XSS protection: ${error.message}`);
            }
        }
    }

    /**
     * Test CSRF protection
     */
    async testCSRFProtection() {
        console.log('🛡️ Testing CSRF Protection...');

        try {
            const response = await this.makeRequest('/api/auth/admin/login', {
                method: 'POST',
                body: JSON.stringify({ email: 'test@test.com', password: 'test123' }),
                headers: { 'Content-Type': 'application/json' }
                // Intentionally not including CSRF token
            });

            if (response.statusCode === 403) {
                this.addResult(true, 'CSRF protection is working');
            } else {
                this.addResult(false, 'CSRF protection may not be working');
            }
        } catch (error) {
            this.addResult(false, `Failed to test CSRF protection: ${error.message}`);
        }
    }

    /**
     * Test authentication security
     */
    async testAuthenticationSecurity() {
        console.log('🔐 Testing Authentication Security...');

        try {
            // Test accessing protected endpoint without authentication
            const response = await this.makeRequest('/api/health/database');

            if (response.statusCode === 401) {
                this.addResult(true, 'Protected endpoints require authentication');
            } else {
                this.addResult(false, 'Protected endpoints may not require authentication');
            }
        } catch (error) {
            this.addResult(false, `Failed to test authentication security: ${error.message}`);
        }
    }

    /**
     * Test session security
     */
    async testSessionSecurity() {
        console.log('🍪 Testing Session Security...');

        try {
            const response = await this.makeRequest('/');
            const setCookie = response.headers['set-cookie'];

            if (setCookie) {
                const hasHttpOnly = setCookie.some(cookie => cookie.includes('HttpOnly'));
                const hasSecure = setCookie.some(cookie => cookie.includes('Secure'));
                const hasSameSite = setCookie.some(cookie => cookie.includes('SameSite'));

                if (hasHttpOnly) {
                    this.addResult(true, 'Session cookies have HttpOnly flag');
                } else {
                    this.addResult(false, 'Session cookies missing HttpOnly flag');
                }

                if (hasSameSite) {
                    this.addResult(true, 'Session cookies have SameSite attribute');
                } else {
                    this.addResult(false, 'Session cookies missing SameSite attribute');
                }
            }
        } catch (error) {
            this.addResult(false, `Failed to test session security: ${error.message}`);
        }
    }

    /**
     * Make HTTP request
     */
    async makeRequest(path, options = {}) {
        const url = new URL(path, options.baseUrl || this.baseUrl);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        return new Promise((resolve, reject) => {
            const requestOptions = {
                hostname: url.hostname,
                port: url.port || (isHttps ? 443 : 80),
                path: url.pathname + url.search,
                method: options.method || 'GET',
                headers: options.headers || {},
                rejectUnauthorized: false // For self-signed certificates in testing
            };

            const req = client.request(requestOptions, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    res.body = data;
                    resolve(res);
                });
            });

            req.on('error', reject);

            if (options.body) {
                req.write(options.body);
            }

            req.end();
        });
    }

    /**
     * Add test result
     */
    addResult(passed, message) {
        this.results.tests.push({ passed, message });
        if (passed) {
            this.results.passed++;
            console.log(`  ✅ ${message}`);
        } else {
            this.results.failed++;
            console.log(`  ❌ ${message}`);
        }
    }

    /**
     * Print final results
     */
    printResults() {
        console.log('\n' + '='.repeat(60));
        console.log('🔒 SECURITY TEST RESULTS');
        console.log('='.repeat(60));
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📊 Total: ${this.results.tests.length}`);
        
        const successRate = (this.results.passed / this.results.tests.length * 100).toFixed(1);
        console.log(`📈 Success Rate: ${successRate}%`);

        if (this.results.failed > 0) {
            console.log('\n⚠️ FAILED TESTS:');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => console.log(`  - ${test.message}`));
        }

        console.log('\n' + '='.repeat(60));
    }
}

// Run tests if called directly
if (require.main === module) {
    const baseUrl = process.argv[2] || 'http://localhost:3000';
    const tester = new SecurityTester(baseUrl);
    tester.runAllTests().catch(console.error);
}

module.exports = SecurityTester;
