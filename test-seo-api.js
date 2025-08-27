const fetch = require('node-fetch');

async function testSEOAPI() {
    try {
        console.log('🔍 Testing SEO settings API...');
        
        // Test local API
        const localUrl = 'http://localhost:3002/api/settings/seo';
        console.log('1. Testing local API:', localUrl);
        
        try {
            const response = await fetch(localUrl, {
                headers: { 'Accept': 'application/json' },
                timeout: 5000
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Local API response:', {
                    success: data.success,
                    title: data.settings?.default_title || data.default_title,
                    description: data.settings?.default_description || data.default_description
                });
            } else {
                console.log('❌ Local API error:', response.status, response.statusText);
            }
        } catch (error) {
            console.log('❌ Local API failed:', error.message);
        }
        
        // Test production API
        const prodUrl = 'https://admin.b2b.click/api/settings/seo';
        console.log('2. Testing production API:', prodUrl);
        
        try {
            const response = await fetch(prodUrl, {
                headers: { 'Accept': 'application/json' },
                timeout: 5000
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Production API response:', {
                    success: data.success,
                    title: data.settings?.default_title || data.default_title,
                    description: data.settings?.default_description || data.default_description
                });
            } else {
                console.log('❌ Production API error:', response.status, response.statusText);
            }
        } catch (error) {
            console.log('❌ Production API failed:', error.message);
        }
        
        // Test direct database query
        console.log('3. Testing direct database query...');
        const query = require('./server/queries');
        const seoSettings = await query.seoSettings.getSEOSettings();
        console.log('✅ Database query result:', {
            title: seoSettings.default_title,
            description: seoSettings.default_description,
            maintenance_mode: seoSettings.maintenance_mode
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testSEOAPI();
