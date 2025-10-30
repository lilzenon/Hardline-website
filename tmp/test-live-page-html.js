// Test what HTML is actually served on live pages
const https = require('https');

console.log('🔍 Testing Live Page HTML Source...\n');

async function testLivePage(url, pageName) {
    return new Promise((resolve, reject) => {
        console.log(`\n📡 Fetching: ${url}`);
        
        https.get(url, (res) => {
            let html = '';
            
            res.on('data', (chunk) => {
                html += chunk;
            });
            
            res.on('end', () => {
                console.log(`✅ Response received (${html.length} bytes)`);
                
                // Extract meta tags
                const titleMatch = html.match(/<title>(.*?)<\/title>/i);
                const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
                const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
                const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
                const keywordsMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
                
                console.log(`\n📝 ${pageName} Meta Tags:`);
                console.log('- <title>:', titleMatch ? titleMatch[1] : '❌ NOT FOUND');
                console.log('- description:', descMatch ? descMatch[1].substring(0, 80) + '...' : '❌ NOT FOUND');
                console.log('- og:title:', ogTitleMatch ? ogTitleMatch[1] : '❌ NOT FOUND');
                console.log('- og:description:', ogDescMatch ? ogDescMatch[1].substring(0, 80) + '...' : '❌ NOT FOUND');
                console.log('- keywords:', keywordsMatch ? keywordsMatch[1] : '❌ NOT FOUND');
                
                // Check if it's using page-specific SEO
                const isUsingPageSpecific = titleMatch && (
                    (pageName === 'About Page' && titleMatch[1].includes('About BOUNCE2BOUNCE')) ||
                    (pageName === 'FAQ Page' && titleMatch[1].includes('FAQ'))
                );
                
                console.log('\n🎯 SEO Status:');
                if (isUsingPageSpecific) {
                    console.log(`✅ ${pageName} is using page-specific SEO!`);
                } else {
                    console.log(`❌ ${pageName} is using FALLBACK/DEFAULT SEO!`);
                    console.log('Expected title to contain:', pageName === 'About Page' ? 'About BOUNCE2BOUNCE' : 'FAQ');
                    console.log('Actual title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
                }
                
                // Save HTML to file
                const fs = require('fs');
                const filename = `tmp/live-${pageName.toLowerCase().replace(' ', '-')}-html.html`;
                fs.writeFileSync(filename, html);
                console.log(`💾 Full HTML saved to: ${filename}`);
                
                resolve({
                    pageName,
                    title: titleMatch ? titleMatch[1] : null,
                    description: descMatch ? descMatch[1] : null,
                    isUsingPageSpecific
                });
            });
        }).on('error', reject);
    });
}

async function runTests() {
    try {
        console.log('🚀 Testing Live Pages on bounce2bounce.com\n');
        console.log('=' .repeat(80));
        
        const aboutResult = await testLivePage('https://bounce2bounce.com/about', 'About Page');
        
        console.log('\n' + '='.repeat(80));
        
        const faqResult = await testLivePage('https://bounce2bounce.com/faq', 'FAQ Page');
        
        console.log('\n' + '='.repeat(80));
        console.log('\n📊 SUMMARY:');
        console.log('- About Page:', aboutResult.isUsingPageSpecific ? '✅ Page-Specific SEO' : '❌ Fallback SEO');
        console.log('- FAQ Page:', faqResult.isUsingPageSpecific ? '✅ Page-Specific SEO' : '❌ Fallback SEO');
        
        if (!aboutResult.isUsingPageSpecific || !faqResult.isUsingPageSpecific) {
            console.log('\n🚨 CRITICAL ISSUE CONFIRMED:');
            console.log('Live pages are NOT using page-specific SEO despite API returning correct data!');
            console.log('The issue is in server-side rendering or client-side override.');
        } else {
            console.log('\n✅ SUCCESS: Both pages are using page-specific SEO!');
        }
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTests();

