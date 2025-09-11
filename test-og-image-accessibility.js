/**
 * Test script to verify OG image accessibility for social media crawlers
 * Tests both local file existence and public URL accessibility
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function testOGImageAccessibility() {
    console.log('🖼️ Testing OG image accessibility for social media crawlers...\n');

    const tests = [
        {
            name: 'Local File Existence',
            test: async () => {
                const imagePath = path.join(__dirname, 'static', 'images', 'og-image.png');
                const exists = fs.existsSync(imagePath);
                if (exists) {
                    const stats = fs.statSync(imagePath);
                    return {
                        success: true,
                        details: `File exists: ${imagePath} (${Math.round(stats.size / 1024)}KB)`
                    };
                } else {
                    return {
                        success: false,
                        details: `File not found: ${imagePath}`
                    };
                }
            }
        },
        {
            name: 'Homepage OG Image URL (Production)',
            test: async () => {
                const url = 'https://b2b.click/images/og-image.png';
                try {
                    const response = await fetch(url, {
                        method: 'HEAD',
                        timeout: 10000,
                        headers: {
                            'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
                        }
                    });
                    
                    return {
                        success: response.ok,
                        details: `Status: ${response.status}, Content-Type: ${response.headers.get('content-type')}, Size: ${response.headers.get('content-length')} bytes`
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: `Error: ${error.message}`
                    };
                }
            }
        },
        {
            name: 'Homepage OG Image URL (Local Dev)',
            test: async () => {
                const url = 'http://localhost:3001/images/og-image.png';
                try {
                    const response = await fetch(url, {
                        method: 'HEAD',
                        timeout: 5000,
                        headers: {
                            'User-Agent': 'facebookexternalhit/1.1'
                        }
                    });
                    
                    return {
                        success: response.ok,
                        details: `Status: ${response.status}, Content-Type: ${response.headers.get('content-type')}`
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: `Error: ${error.message} (This is expected if local server is not running)`
                    };
                }
            }
        },
        {
            name: 'SEO API Response',
            test: async () => {
                const url = process.env.NODE_ENV === 'production' 
                    ? 'https://admin.b2b.click/api/settings/seo'
                    : 'http://localhost:3002/api/settings/seo';
                
                try {
                    const response = await fetch(url, {
                        timeout: 10000
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        const ogImage = data.settings?.default_og_image;
                        
                        return {
                            success: !!ogImage,
                            details: `OG Image URL from API: ${ogImage || 'NOT SET'}`
                        };
                    } else {
                        return {
                            success: false,
                            details: `API Error: ${response.status} ${response.statusText}`
                        };
                    }
                } catch (error) {
                    return {
                        success: false,
                        details: `Error: ${error.message}`
                    };
                }
            }
        },
        {
            name: 'Homepage Meta Tags',
            test: async () => {
                const url = process.env.NODE_ENV === 'production' 
                    ? 'https://b2b.click/'
                    : 'http://localhost:3001/';
                
                try {
                    const response = await fetch(url, {
                        timeout: 10000,
                        headers: {
                            'User-Agent': 'facebookexternalhit/1.1'
                        }
                    });
                    
                    if (response.ok) {
                        const html = await response.text();
                        
                        // Look for OG image meta tag
                        const ogImageMatch = html.match(/<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
                        const ogImageUrl = ogImageMatch ? ogImageMatch[1] : null;
                        
                        // Look for other OG tags
                        const ogTitleMatch = html.match(/<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
                        const ogDescMatch = html.match(/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
                        
                        return {
                            success: !!ogImageUrl,
                            details: `OG Image: ${ogImageUrl || 'NOT FOUND'}\nOG Title: ${ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND'}\nOG Description: ${ogDescMatch ? ogDescMatch[1].substring(0, 100) + '...' : 'NOT FOUND'}`
                        };
                    } else {
                        return {
                            success: false,
                            details: `Homepage Error: ${response.status} ${response.statusText}`
                        };
                    }
                } catch (error) {
                    return {
                        success: false,
                        details: `Error: ${error.message}`
                    };
                }
            }
        }
    ];

    let passedTests = 0;
    let totalTests = tests.length;

    for (const test of tests) {
        console.log(`🧪 Testing: ${test.name}`);
        
        try {
            const result = await test.test();
            
            if (result.success) {
                console.log(`   ✅ PASSED`);
                console.log(`   📝 ${result.details}\n`);
                passedTests++;
            } else {
                console.log(`   ❌ FAILED`);
                console.log(`   📝 ${result.details}\n`);
            }
        } catch (error) {
            console.log(`   ❌ ERROR`);
            console.log(`   📝 ${error.message}\n`);
        }
    }

    // Summary
    console.log('📊 OG IMAGE ACCESSIBILITY SUMMARY');
    console.log('==================================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${totalTests - passedTests}`);

    if (passedTests === totalTests) {
        console.log('\n✅ ALL TESTS PASSED - OG image should be accessible to social media crawlers');
    } else if (passedTests >= 3) {
        console.log('\n⚠️ MOSTLY WORKING - Some issues detected but core functionality should work');
    } else {
        console.log('\n🚨 CRITICAL ISSUES - OG image may not be accessible to social media crawlers');
    }

    // Recommendations
    console.log('\n🔍 RECOMMENDATIONS:');
    console.log('1. Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/');
    console.log('2. Test with Twitter Card Validator: https://cards-dev.twitter.com/validator');
    console.log('3. Test with LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/');
    console.log('4. Ensure OG image is 1200x630px for optimal display');
    console.log('5. Verify image is under 8MB and in JPG/PNG format');

    return {
        totalTests,
        passedTests,
        success: passedTests >= 3
    };
}

// Run the test
testOGImageAccessibility()
    .then(result => {
        process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });
