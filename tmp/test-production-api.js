// Test Production Dashboard API
const https = require('https');

console.log('🔍 Testing Production Dashboard API...\n');

// Test 1: Dashboard API
console.log('📡 Fetching from: https://admin.b2b.click/api/settings/seo/fast');
https.get('https://admin.b2b.click/api/settings/seo/fast', (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('\n✅ Dashboard API Response:');
            console.log('Status:', res.statusCode);
            console.log('Success:', json.success);
            
            if (json.settings) {
                console.log('\n📊 SEO Settings Fields:');
                console.log('- default_title:', json.settings.default_title ? '✅ Present' : '❌ Missing');
                console.log('- about_page_title:', json.settings.about_page_title ? '✅ Present' : '❌ Missing');
                console.log('- faq_page_title:', json.settings.faq_page_title ? '✅ Present' : '❌ Missing');
                
                console.log('\n📝 About Page SEO Values:');
                console.log('- Title:', json.settings.about_page_title || 'NOT SET');
                console.log('- Description:', json.settings.about_page_description ? json.settings.about_page_description.substring(0, 80) + '...' : 'NOT SET');
                console.log('- Keywords:', json.settings.about_page_keywords || 'NOT SET');
                console.log('- OG Image:', json.settings.about_page_og_image || 'NOT SET');
                
                console.log('\n📝 FAQ Page SEO Values:');
                console.log('- Title:', json.settings.faq_page_title || 'NOT SET');
                console.log('- Description:', json.settings.faq_page_description ? json.settings.faq_page_description.substring(0, 80) + '...' : 'NOT SET');
                console.log('- Keywords:', json.settings.faq_page_keywords || 'NOT SET');
                console.log('- OG Image:', json.settings.faq_page_og_image || 'NOT SET');
                
                // Write full response to file for inspection
                const fs = require('fs');
                fs.writeFileSync('tmp/dashboard-api-response.json', JSON.stringify(json, null, 2));
                console.log('\n💾 Full response saved to: tmp/dashboard-api-response.json');
            }
        } catch (error) {
            console.error('❌ Error parsing JSON:', error.message);
            console.log('Raw response:', data);
        }
    });
}).on('error', (error) => {
    console.error('❌ Error fetching dashboard API:', error.message);
});

// Test 2: Homepage Server (what it fetches)
setTimeout(() => {
    console.log('\n\n🔍 Testing what Homepage Server would fetch...\n');
    console.log('📡 Fetching from: https://admin.b2b.click/api/settings/seo');
    
    https.get('https://admin.b2b.click/api/settings/seo', (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                console.log('\n✅ Homepage Server API Response:');
                console.log('Status:', res.statusCode);
                console.log('Success:', json.success);
                
                if (json.settings) {
                    console.log('\n📊 SEO Settings Fields:');
                    console.log('- about_page_title:', json.settings.about_page_title ? '✅ Present' : '❌ Missing');
                    console.log('- faq_page_title:', json.settings.faq_page_title ? '✅ Present' : '❌ Missing');
                    
                    console.log('\n📝 About Page SEO Values:');
                    console.log('- Title:', json.settings.about_page_title || 'NOT SET');
                    
                    console.log('\n📝 FAQ Page SEO Values:');
                    console.log('- Title:', json.settings.faq_page_title || 'NOT SET');
                    
                    // Write full response to file
                    const fs = require('fs');
                    fs.writeFileSync('tmp/homepage-server-api-response.json', JSON.stringify(json, null, 2));
                    console.log('\n💾 Full response saved to: tmp/homepage-server-api-response.json');
                }
            } catch (error) {
                console.error('❌ Error parsing JSON:', error.message);
                console.log('Raw response:', data);
            }
        });
    }).on('error', (error) => {
        console.error('❌ Error fetching homepage server API:', error.message);
    });
}, 2000);

