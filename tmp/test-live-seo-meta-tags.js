/**
 * Test script to verify live SEO meta tags on bounce2bounce.com
 * This fetches the actual HTML and extracts all SEO-related meta tags
 */

const https = require('https');

async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractMetaTags(html) {
    const tags = {};
    
    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) tags.title = titleMatch[1];
    
    // Extract meta description
    const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    if (descMatch) tags.description = descMatch[1];
    
    // Extract meta keywords
    const keywordsMatch = html.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
    if (keywordsMatch) tags.keywords = keywordsMatch[1];
    
    // Extract OG title
    const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
    if (ogTitleMatch) tags.ogTitle = ogTitleMatch[1];
    
    // Extract OG description
    const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
    if (ogDescMatch) tags.ogDescription = ogDescMatch[1];
    
    // Extract OG image
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="(.*?)"/i);
    if (ogImageMatch) tags.ogImage = ogImageMatch[1];
    
    // Extract Twitter title
    const twitterTitleMatch = html.match(/<meta\s+name="twitter:title"\s+content="(.*?)"/i);
    if (twitterTitleMatch) tags.twitterTitle = twitterTitleMatch[1];
    
    // Extract Twitter description
    const twitterDescMatch = html.match(/<meta\s+name="twitter:description"\s+content="(.*?)"/i);
    if (twitterDescMatch) tags.twitterDescription = twitterDescMatch[1];
    
    return tags;
}

async function testPage(url, pageName) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`🔍 Testing: ${pageName}`);
    console.log(`📍 URL: ${url}`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    console.log('='.repeat(80));
    
    try {
        const html = await fetchPage(url);
        const tags = extractMetaTags(html);
        
        console.log('\n📋 SEO Meta Tags Found:');
        console.log('─'.repeat(80));
        console.log(`Title:              ${tags.title || '❌ NOT FOUND'}`);
        console.log(`Description:        ${tags.description || '❌ NOT FOUND'}`);
        console.log(`Keywords:           ${tags.keywords || '❌ NOT FOUND'}`);
        console.log(`OG Title:           ${tags.ogTitle || '❌ NOT FOUND'}`);
        console.log(`OG Description:     ${tags.ogDescription || '❌ NOT FOUND'}`);
        console.log(`OG Image:           ${tags.ogImage || '❌ NOT FOUND'}`);
        console.log(`Twitter Title:      ${tags.twitterTitle || '❌ NOT FOUND'}`);
        console.log(`Twitter Desc:       ${tags.twitterDescription || '❌ NOT FOUND'}`);
        
        return tags;
    } catch (error) {
        console.error(`❌ Error fetching ${pageName}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('\n🚀 Live SEO Meta Tags Test');
    console.log('Testing bounce2bounce.com pages to verify SEO settings are applied\n');
    
    // Test About page
    const aboutTags = await testPage('https://bounce2bounce.com/about', 'About Page');
    
    // Test FAQ page
    const faqTags = await testPage('https://bounce2bounce.com/faq', 'FAQ Page');
    
    // Test Homepage
    const homeTags = await testPage('https://bounce2bounce.com/', 'Homepage');
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 SUMMARY');
    console.log('='.repeat(80));
    
    if (aboutTags) {
        console.log('\n✅ About Page:');
        console.log(`   Title: "${aboutTags.title}"`);
        console.log(`   Expected: "About BOUNCE2BOUNCE | AAA" (or your custom value)`);
        console.log(`   Match: ${aboutTags.title === 'About BOUNCE2BOUNCE | AAA' ? '✅ YES' : '❌ NO'}`);
    }
    
    if (faqTags) {
        console.log('\n✅ FAQ Page:');
        console.log(`   Title: "${faqTags.title}"`);
        console.log(`   Expected: "FAQ - BOUNCE2BOUNCE | Frequently Asked Questions!" (or your custom value)`);
        console.log(`   Match: ${faqTags.title === 'FAQ - BOUNCE2BOUNCE | Frequently Asked Questions!' ? '✅ YES' : '❌ NO'}`);
    }
    
    if (homeTags) {
        console.log('\n✅ Homepage:');
        console.log(`   Title: "${homeTags.title}"`);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('💡 NOTE: If SEO tools show different values, they may be caching old data.');
    console.log('   Try using Google Search Console URL Inspection Tool for the most accurate results.');
    console.log('='.repeat(80) + '\n');
}

main().catch(console.error);

