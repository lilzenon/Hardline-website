#!/usr/bin/env node

/**
 * SEO Testing Script for BOUNCE2BOUNCE
 * Tests various SEO implementations and provides recommendations
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://b2b.click';
const TEST_TIMEOUT = 10000;

// ANSI color codes for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

/**
 * Main testing function
 */
async function runSEOTests() {
    console.log(`${colors.bold}${colors.blue}🔍 BOUNCE2BOUNCE SEO Testing Suite${colors.reset}\n`);
    console.log(`Testing domain: ${BASE_URL}\n`);
    
    const results = {
        passed: 0,
        failed: 0,
        warnings: 0,
        tests: []
    };
    
    try {
        // Test 1: Sitemap accessibility
        await testSitemap(results);
        
        // Test 2: Robots.txt
        await testRobotsTxt(results);
        
        // Test 3: LLMs.txt for AI optimization
        await testLLMsTxt(results);
        
        // Test 4: Homepage meta tags
        await testHomepageMeta(results);
        
        // Test 5: Structured data validation
        await testStructuredData(results);
        
        // Test 6: Performance indicators
        await testPerformanceIndicators(results);
        
        // Test 7: Mobile optimization
        await testMobileOptimization(results);
        
        // Test 8: Security headers
        await testSecurityHeaders(results);
        
        // Generate report
        generateReport(results);
        
    } catch (error) {
        console.error(`${colors.red}❌ Testing failed: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

/**
 * Test sitemap accessibility and content
 */
async function testSitemap(results) {
    console.log('🗺️  Testing XML Sitemap...');
    
    try {
        const response = await makeRequest(`${BASE_URL}/sitemap.xml`);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            // Check if it's valid XML
            if (content.includes('<?xml') && content.includes('<urlset')) {
                addResult(results, 'sitemap_accessible', 'pass', 'Sitemap is accessible and valid XML');
                
                // Count URLs in sitemap
                const urlCount = (content.match(/<url>/g) || []).length;
                if (urlCount > 0) {
                    addResult(results, 'sitemap_content', 'pass', `Sitemap contains ${urlCount} URLs`);
                } else {
                    addResult(results, 'sitemap_content', 'warning', 'Sitemap contains no URLs');
                }
            } else {
                addResult(results, 'sitemap_format', 'fail', 'Sitemap is not valid XML format');
            }
        } else {
            addResult(results, 'sitemap_accessible', 'fail', `Sitemap returned status ${response.statusCode}`);
        }
    } catch (error) {
        addResult(results, 'sitemap_accessible', 'fail', `Sitemap test failed: ${error.message}`);
    }
}

/**
 * Test robots.txt
 */
async function testRobotsTxt(results) {
    console.log('🤖 Testing Robots.txt...');
    
    try {
        const response = await makeRequest(`${BASE_URL}/robots.txt`);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            if (content.includes('User-agent:')) {
                addResult(results, 'robots_accessible', 'pass', 'Robots.txt is accessible and valid');
                
                // Check for sitemap reference
                if (content.includes('Sitemap:')) {
                    addResult(results, 'robots_sitemap', 'pass', 'Robots.txt includes sitemap reference');
                } else {
                    addResult(results, 'robots_sitemap', 'warning', 'Robots.txt missing sitemap reference');
                }
                
                // Check for proper directives
                if (content.includes('Allow:') || content.includes('Disallow:')) {
                    addResult(results, 'robots_directives', 'pass', 'Robots.txt has proper crawling directives');
                } else {
                    addResult(results, 'robots_directives', 'warning', 'Robots.txt missing crawling directives');
                }
            } else {
                addResult(results, 'robots_format', 'fail', 'Robots.txt is not properly formatted');
            }
        } else {
            addResult(results, 'robots_accessible', 'fail', `Robots.txt returned status ${response.statusCode}`);
        }
    } catch (error) {
        addResult(results, 'robots_accessible', 'fail', `Robots.txt test failed: ${error.message}`);
    }
}

/**
 * Test LLMs.txt for AI optimization
 */
async function testLLMsTxt(results) {
    console.log('🤖 Testing LLMs.txt for AI optimization...');
    
    try {
        const response = await makeRequest(`${BASE_URL}/llms.txt`);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            if (content.includes('BOUNCE2BOUNCE')) {
                addResult(results, 'llms_accessible', 'pass', 'LLMs.txt is accessible and contains platform info');
                
                // Check for key sections
                const sections = ['Platform Overview', 'Core Features', 'Target Audience'];
                const missingSections = sections.filter(section => !content.includes(section));
                
                if (missingSections.length === 0) {
                    addResult(results, 'llms_content', 'pass', 'LLMs.txt contains all required sections');
                } else {
                    addResult(results, 'llms_content', 'warning', `LLMs.txt missing sections: ${missingSections.join(', ')}`);
                }
            } else {
                addResult(results, 'llms_content', 'fail', 'LLMs.txt missing platform information');
            }
        } else {
            addResult(results, 'llms_accessible', 'warning', 'LLMs.txt not accessible (optional for AI optimization)');
        }
    } catch (error) {
        addResult(results, 'llms_accessible', 'warning', `LLMs.txt test failed: ${error.message}`);
    }
}

/**
 * Test homepage meta tags
 */
async function testHomepageMeta(results) {
    console.log('🏠 Testing Homepage Meta Tags...');
    
    try {
        const response = await makeRequest(BASE_URL);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            // Check for essential meta tags
            const metaTags = {
                title: /<title[^>]*>([^<]+)<\/title>/i,
                description: /<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i,
                viewport: /<meta[^>]*name=["\']viewport["\'][^>]*>/i,
                'og:title': /<meta[^>]*property=["\']og:title["\'][^>]*>/i,
                'og:description': /<meta[^>]*property=["\']og:description["\'][^>]*>/i,
                'twitter:card': /<meta[^>]*name=["\']twitter:card["\'][^>]*>/i
            };
            
            let foundTags = 0;
            for (const [tag, regex] of Object.entries(metaTags)) {
                if (regex.test(content)) {
                    foundTags++;
                } else {
                    addResult(results, `meta_${tag}`, 'warning', `Missing ${tag} meta tag`);
                }
            }
            
            if (foundTags === Object.keys(metaTags).length) {
                addResult(results, 'meta_tags_complete', 'pass', 'All essential meta tags present');
            } else {
                addResult(results, 'meta_tags_complete', 'warning', `${foundTags}/${Object.keys(metaTags).length} meta tags found`);
            }
            
            // Check for structured data
            if (content.includes('application/ld+json')) {
                addResult(results, 'structured_data', 'pass', 'Structured data (JSON-LD) found');
            } else {
                addResult(results, 'structured_data', 'fail', 'No structured data found');
            }
        } else {
            addResult(results, 'homepage_accessible', 'fail', `Homepage returned status ${response.statusCode}`);
        }
    } catch (error) {
        addResult(results, 'homepage_accessible', 'fail', `Homepage test failed: ${error.message}`);
    }
}

/**
 * Test structured data implementation
 */
async function testStructuredData(results) {
    console.log('📊 Testing Structured Data...');
    
    try {
        const response = await makeRequest(BASE_URL);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            // Check for different types of structured data
            const structuredDataTypes = {
                Organization: /"@type":\s*"Organization"/,
                ItemList: /"@type":\s*"ItemList"/,
                BreadcrumbList: /"@type":\s*"BreadcrumbList"/
            };
            
            let foundTypes = 0;
            for (const [type, regex] of Object.entries(structuredDataTypes)) {
                if (regex.test(content)) {
                    foundTypes++;
                    addResult(results, `structured_${type}`, 'pass', `${type} structured data found`);
                } else {
                    addResult(results, `structured_${type}`, 'warning', `${type} structured data missing`);
                }
            }
            
            if (foundTypes > 0) {
                addResult(results, 'structured_data_overall', 'pass', `${foundTypes} types of structured data implemented`);
            } else {
                addResult(results, 'structured_data_overall', 'fail', 'No structured data found');
            }
        }
    } catch (error) {
        addResult(results, 'structured_data_test', 'fail', `Structured data test failed: ${error.message}`);
    }
}

/**
 * Test performance indicators
 */
async function testPerformanceIndicators(results) {
    console.log('⚡ Testing Performance Indicators...');
    
    try {
        const response = await makeRequest(BASE_URL);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            // Check for performance optimizations
            const optimizations = {
                preload: /<link[^>]*rel=["\']preload["\'][^>]*>/i,
                prefetch: /<link[^>]*rel=["\']prefetch["\'][^>]*>/i,
                dns_prefetch: /<link[^>]*rel=["\']dns-prefetch["\'][^>]*>/i,
                preconnect: /<link[^>]*rel=["\']preconnect["\'][^>]*>/i,
                service_worker: /serviceWorker\.register/i,
                lazy_loading: /loading=["\']lazy["\']|loading:\s*["\']lazy["\']/i
            };
            
            let foundOptimizations = 0;
            for (const [opt, regex] of Object.entries(optimizations)) {
                if (regex.test(content)) {
                    foundOptimizations++;
                    addResult(results, `perf_${opt}`, 'pass', `${opt.replace('_', ' ')} optimization found`);
                }
            }
            
            if (foundOptimizations >= 3) {
                addResult(results, 'performance_overall', 'pass', `${foundOptimizations} performance optimizations implemented`);
            } else {
                addResult(results, 'performance_overall', 'warning', `Only ${foundOptimizations} performance optimizations found`);
            }
        }
    } catch (error) {
        addResult(results, 'performance_test', 'fail', `Performance test failed: ${error.message}`);
    }
}

/**
 * Test mobile optimization
 */
async function testMobileOptimization(results) {
    console.log('📱 Testing Mobile Optimization...');
    
    try {
        const response = await makeRequest(BASE_URL);
        
        if (response.statusCode === 200) {
            const content = response.data;
            
            // Check for mobile optimization indicators
            if (content.includes('viewport-fit=cover')) {
                addResult(results, 'mobile_viewport', 'pass', 'Mobile viewport properly configured');
            } else {
                addResult(results, 'mobile_viewport', 'warning', 'Mobile viewport could be optimized');
            }
            
            if (content.includes('apple-mobile-web-app')) {
                addResult(results, 'mobile_pwa', 'pass', 'PWA meta tags found');
            } else {
                addResult(results, 'mobile_pwa', 'warning', 'PWA optimization missing');
            }
            
            if (content.includes('manifest.webmanifest')) {
                addResult(results, 'mobile_manifest', 'pass', 'Web app manifest linked');
            } else {
                addResult(results, 'mobile_manifest', 'warning', 'Web app manifest missing');
            }
        }
    } catch (error) {
        addResult(results, 'mobile_test', 'fail', `Mobile optimization test failed: ${error.message}`);
    }
}

/**
 * Test security headers
 */
async function testSecurityHeaders(results) {
    console.log('🔒 Testing Security Headers...');
    
    try {
        const response = await makeRequest(BASE_URL);
        
        // Check response headers
        const headers = response.headers || {};
        
        if (headers['strict-transport-security']) {
            addResult(results, 'security_hsts', 'pass', 'HSTS header present');
        } else {
            addResult(results, 'security_hsts', 'warning', 'HSTS header missing');
        }
        
        if (headers['x-content-type-options']) {
            addResult(results, 'security_content_type', 'pass', 'Content-Type-Options header present');
        } else {
            addResult(results, 'security_content_type', 'warning', 'Content-Type-Options header missing');
        }
        
    } catch (error) {
        addResult(results, 'security_test', 'fail', `Security headers test failed: ${error.message}`);
    }
}

/**
 * Helper function to make HTTP requests
 */
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Request timeout'));
        }, TEST_TIMEOUT);
        
        https.get(url, (res) => {
            clearTimeout(timeout);
            
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        }).on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

/**
 * Add test result
 */
function addResult(results, test, status, message) {
    results.tests.push({ test, status, message });
    
    if (status === 'pass') {
        results.passed++;
        console.log(`  ${colors.green}✓${colors.reset} ${message}`);
    } else if (status === 'fail') {
        results.failed++;
        console.log(`  ${colors.red}✗${colors.reset} ${message}`);
    } else {
        results.warnings++;
        console.log(`  ${colors.yellow}⚠${colors.reset} ${message}`);
    }
}

/**
 * Generate final report
 */
function generateReport(results) {
    console.log(`\n${colors.bold}📊 SEO Test Results Summary${colors.reset}`);
    console.log(`${colors.green}✓ Passed: ${results.passed}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${results.failed}${colors.reset}`);
    console.log(`${colors.yellow}⚠ Warnings: ${results.warnings}${colors.reset}`);
    
    const total = results.passed + results.failed + results.warnings;
    const score = Math.round((results.passed / total) * 100);
    
    console.log(`\n${colors.bold}Overall SEO Score: ${score}%${colors.reset}`);
    
    if (score >= 90) {
        console.log(`${colors.green}🎉 Excellent SEO implementation!${colors.reset}`);
    } else if (score >= 75) {
        console.log(`${colors.yellow}👍 Good SEO implementation with room for improvement${colors.reset}`);
    } else {
        console.log(`${colors.red}⚠️  SEO implementation needs attention${colors.reset}`);
    }
    
    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'seo-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        domain: BASE_URL,
        score,
        summary: {
            passed: results.passed,
            failed: results.failed,
            warnings: results.warnings,
            total
        },
        tests: results.tests
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

// Run tests if called directly
if (require.main === module) {
    runSEOTests().catch(console.error);
}

module.exports = { runSEOTests };
