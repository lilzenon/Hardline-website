/**
 * Test Soft 404 Issues - Simulate Googlebot Crawl
 * 
 * This script simulates what Googlebot sees when crawling the About and FAQ pages
 * to diagnose soft 404 errors reported in Google Search Console.
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require('cheerio');

async function testPageForSoft404(url, pageName) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`🔍 Testing ${pageName}: ${url}`);
    console.log(`${'='.repeat(80)}\n`);

    try {
        // Fetch the page with Googlebot user agent
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        // Check HTTP status code
        console.log(`📊 HTTP Status: ${response.status} ${response.statusText}`);
        if (response.status !== 200) {
            console.log(`❌ FAIL: Page returns ${response.status} instead of 200`);
            return false;
        }
        console.log(`✅ PASS: Page returns 200 OK\n`);

        // Get HTML content
        const html = await response.text();
        const $ = cheerio.load(html);

        // Check 1: Page has content
        console.log(`📄 Content Analysis:`);
        const bodyText = $('body').text().trim();
        const contentLength = bodyText.length;
        console.log(`   Content Length: ${contentLength} characters`);
        
        if (contentLength < 100) {
            console.log(`   ❌ FAIL: Page has insufficient content (< 100 characters)`);
            console.log(`   This is a PRIMARY cause of soft 404 errors!`);
            return false;
        } else if (contentLength < 500) {
            console.log(`   ⚠️  WARNING: Page has minimal content (< 500 characters)`);
            console.log(`   Consider adding more content to avoid soft 404`);
        } else {
            console.log(`   ✅ PASS: Page has sufficient content`);
        }

        // Check 2: Meta tags
        console.log(`\n🏷️  Meta Tags:`);
        
        const title = $('title').text();
        console.log(`   Title: ${title || '(MISSING)'}`);
        if (!title || title.trim() === '') {
            console.log(`   ❌ FAIL: Missing title tag`);
            return false;
        } else if (title.toLowerCase().includes('404') || title.toLowerCase().includes('not found') || title.toLowerCase().includes('error')) {
            console.log(`   ❌ FAIL: Title suggests error page`);
            return false;
        } else {
            console.log(`   ✅ PASS: Title is present and doesn't suggest error`);
        }

        const description = $('meta[name="description"]').attr('content');
        console.log(`   Description: ${description ? description.substring(0, 100) + '...' : '(MISSING)'}`);
        if (!description || description.trim() === '') {
            console.log(`   ⚠️  WARNING: Missing meta description`);
        } else {
            console.log(`   ✅ PASS: Meta description is present`);
        }

        const ogTitle = $('meta[property="og:title"]').attr('content');
        console.log(`   OG Title: ${ogTitle || '(MISSING)'}`);
        
        const ogDescription = $('meta[property="og:description"]').attr('content');
        console.log(`   OG Description: ${ogDescription ? ogDescription.substring(0, 100) + '...' : '(MISSING)'}`);

        const canonical = $('link[rel="canonical"]').attr('href');
        console.log(`   Canonical: ${canonical || '(MISSING)'}`);

        // Check 3: Structured data
        console.log(`\n📊 Structured Data:`);
        const jsonLdScripts = $('script[type="application/ld+json"]');
        console.log(`   JSON-LD Scripts: ${jsonLdScripts.length}`);
        
        if (jsonLdScripts.length === 0) {
            console.log(`   ⚠️  WARNING: No structured data found`);
        } else {
            jsonLdScripts.each((i, elem) => {
                try {
                    const data = JSON.parse($(elem).html());
                    console.log(`   Schema ${i + 1}: ${data['@type'] || 'Unknown'}`);
                } catch (e) {
                    console.log(`   ⚠️  Invalid JSON-LD in script ${i + 1}`);
                }
            });
        }

        // Check 4: Main content elements
        console.log(`\n🎯 Main Content Elements:`);
        const h1Count = $('h1').length;
        const h2Count = $('h2').length;
        const pCount = $('p').length;
        const imgCount = $('img').length;
        const linkCount = $('a').length;

        console.log(`   H1 tags: ${h1Count}`);
        console.log(`   H2 tags: ${h2Count}`);
        console.log(`   Paragraphs: ${pCount}`);
        console.log(`   Images: ${imgCount}`);
        console.log(`   Links: ${linkCount}`);

        if (h1Count === 0) {
            console.log(`   ⚠️  WARNING: No H1 tag found`);
        }
        if (pCount < 3) {
            console.log(`   ⚠️  WARNING: Very few paragraphs (< 3)`);
        }

        // Check 5: Error indicators
        console.log(`\n🚨 Error Indicators:`);
        const errorKeywords = ['404', 'not found', 'page not found', 'error', 'oops', 'something went wrong'];
        let hasErrorIndicators = false;

        for (const keyword of errorKeywords) {
            if (bodyText.toLowerCase().includes(keyword)) {
                console.log(`   ⚠️  Found error keyword: "${keyword}"`);
                hasErrorIndicators = true;
            }
        }

        if (!hasErrorIndicators) {
            console.log(`   ✅ PASS: No error indicators found`);
        }

        // Check 6: React hydration check
        console.log(`\n⚛️  React Hydration:`);
        const rootDiv = $('#root');
        if (rootDiv.length === 0) {
            console.log(`   ❌ FAIL: No #root div found`);
            return false;
        }

        const rootContent = rootDiv.html();
        if (!rootContent || rootContent.trim() === '') {
            console.log(`   ❌ FAIL: #root div is empty - SSR failed!`);
            console.log(`   This is a PRIMARY cause of soft 404 errors!`);
            return false;
        } else {
            console.log(`   ✅ PASS: #root div has content (${rootContent.length} characters)`);
        }

        // Final verdict
        console.log(`\n\n📋 FINAL VERDICT:`);
        if (contentLength >= 500 && title && !hasErrorIndicators && rootContent) {
            console.log(`   ✅ Page appears HEALTHY - should NOT trigger soft 404`);
            return true;
        } else {
            console.log(`   ❌ Page has ISSUES - may trigger soft 404`);
            console.log(`\n🔧 Recommendations:`);
            if (contentLength < 500) {
                console.log(`   - Add more content to the page (aim for 500+ characters)`);
            }
            if (!title) {
                console.log(`   - Add a proper title tag`);
            }
            if (hasErrorIndicators) {
                console.log(`   - Remove error-related keywords from content`);
            }
            if (!rootContent) {
                console.log(`   - Fix server-side rendering to populate #root div`);
            }
            return false;
        }

    } catch (error) {
        console.error(`❌ ERROR: ${error.message}`);
        console.error(error.stack);
        return false;
    }
}

async function runTests() {
    console.log('\n🤖 GOOGLEBOT SOFT 404 DIAGNOSTIC TEST\n');
    console.log('This test simulates what Googlebot sees when crawling your pages.');
    console.log('It checks for common causes of soft 404 errors:\n');
    console.log('  1. Insufficient content');
    console.log('  2. Missing or poor meta tags');
    console.log('  3. Empty page (SSR failure)');
    console.log('  4. Error indicators in content');
    console.log('  5. Missing structured data\n');

    const tests = [
        { url: 'https://bounce2bounce.com/about', name: 'About Page' },
        { url: 'https://bounce2bounce.com/faq', name: 'FAQ Page' },
        { url: 'https://bounce2bounce.com/', name: 'Homepage (control)' }
    ];

    const results = [];
    for (const test of tests) {
        const passed = await testPageForSoft404(test.url, test.name);
        results.push({ name: test.name, passed });
    }

    console.log(`\n\n${'='.repeat(80)}`);
    console.log(`📊 SUMMARY`);
    console.log(`${'='.repeat(80)}\n`);

    results.forEach(result => {
        const status = result.passed ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${result.name}`);
    });

    const allPassed = results.every(r => r.passed);
    if (allPassed) {
        console.log(`\n✅ All pages passed! Soft 404 errors may be a false positive or temporary issue.`);
    } else {
        console.log(`\n❌ Some pages failed! These issues are likely causing soft 404 errors.`);
    }

    console.log('\n');
}

// Run the tests
runTests();

