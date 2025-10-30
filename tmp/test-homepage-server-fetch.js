// Test what Homepage Server actually fetches (simulating renders.handler.js)
const https = require('https');

console.log('🔍 Testing Homepage Server API Fetch (simulating renders.handler.js)...\n');

async function testHomepageServerFetch() {
    return new Promise((resolve, reject) => {
        const dashboardApiUrl = 'https://admin.b2b.click/api/settings/seo';

        console.log('📡 Fetching from:', dashboardApiUrl);
        console.log('⏱️  Timeout: 10 seconds');
        console.log('🔄 Follow redirects: YES (default)\n');

        https.get(dashboardApiUrl, (res) => {
            let data = '';
            let redirectCount = 0;

            // Handle redirects
            if (res.statusCode === 307 || res.statusCode === 301 || res.statusCode === 302) {
                redirectCount++;
                console.log(`🔄 Redirect ${redirectCount}: ${res.statusCode} to ${res.headers.location}`);

                // Follow redirect
                https.get(res.headers.location.startsWith('http') ? res.headers.location : `https://admin.b2b.click${res.headers.location}`, (redirectRes) => {
                    let redirectData = '';

                    redirectRes.on('data', (chunk) => {
                        redirectData += chunk;
                    });

                    redirectRes.on('end', () => {
                        processResponse(redirectRes, redirectData);
                    });
                }).on('error', reject);

                return;
            }

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                processResponse(res, data);
            });
        }).on('error', reject);

        function processResponse(response, data) {
            console.log('✅ Response received:');
            console.log('- Status:', response.statusCode);
            console.log('- Status Text:', response.statusMessage);
            console.log('- Content-Type:', response.headers['content-type']);

            if (response.statusCode === 200) {
                try {
                    const apiResponse = JSON.parse(data);
                    console.log('\n📊 Response Structure:');
                    console.log('- success:', apiResponse.success);
                    console.log('- Has settings:', !!apiResponse.settings);

                    if (apiResponse.settings) {
                        const settings = apiResponse.settings;

                        console.log('\n📝 Homepage SEO:');
                        console.log('- default_title:', settings.default_title || 'NOT SET');
                        console.log('- default_description:', settings.default_description ? settings.default_description.substring(0, 60) + '...' : 'NOT SET');

                        console.log('\n📝 About Page SEO:');
                        console.log('- about_page_title:', settings.about_page_title || '❌ NOT SET');
                        console.log('- about_page_description:', settings.about_page_description ? settings.about_page_description.substring(0, 60) + '...' : '❌ NOT SET');
                        console.log('- about_page_keywords:', settings.about_page_keywords || '❌ NOT SET');
                        console.log('- about_page_og_image:', settings.about_page_og_image || '❌ NOT SET');

                        console.log('\n📝 FAQ Page SEO:');
                        console.log('- faq_page_title:', settings.faq_page_title || '❌ NOT SET');
                        console.log('- faq_page_description:', settings.faq_page_description ? settings.faq_page_description.substring(0, 60) + '...' : '❌ NOT SET');
                        console.log('- faq_page_keywords:', settings.faq_page_keywords || '❌ NOT SET');
                        console.log('- faq_page_og_image:', settings.faq_page_og_image || '❌ NOT SET');

                        // Check if page-specific fields are present
                        const hasAboutFields = !!(settings.about_page_title && settings.about_page_description);
                        const hasFaqFields = !!(settings.faq_page_title && settings.faq_page_description);

                        console.log('\n🎯 Page-Specific SEO Status:');
                        console.log('- About Page Fields:', hasAboutFields ? '✅ PRESENT' : '❌ MISSING');
                        console.log('- FAQ Page Fields:', hasFaqFields ? '✅ PRESENT' : '❌ MISSING');

                        if (!hasAboutFields || !hasFaqFields) {
                            console.log('\n🚨 CRITICAL ISSUE: Page-specific SEO fields are MISSING from API response!');
                            console.log('This is why the live pages show fallback values.');
                        } else {
                            console.log('\n✅ SUCCESS: Page-specific SEO fields are present in API response!');
                            console.log('If live pages still show fallback values, the issue is in server-side rendering or client-side override.');
                        }

                        // Save full response
                        const fs = require('fs');
                        fs.writeFileSync('tmp/homepage-server-fetch-response.json', JSON.stringify(apiResponse, null, 2));
                        console.log('\n💾 Full response saved to: tmp/homepage-server-fetch-response.json');
                    }

                    resolve();
                } catch (error) {
                    console.error('\n❌ Error parsing JSON:', error.message);
                    console.log('Raw response:', data);
                    reject(error);
                }
            } else {
                console.error('\n❌ API request failed:');
                console.error('- Status:', response.statusCode);
                console.error('- Status Text:', response.statusMessage);
                console.error('- Response:', data);
                reject(new Error(`API request failed with status ${response.statusCode}`));
            }
        }
    });
}

testHomepageServerFetch().catch(error => {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
});

