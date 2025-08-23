// Test analytics data flow from homepage to dashboard
const http = require('http');

async function testAnalyticsFlow() {
    console.log('🧪 Testing consolidated analytics data flow...');
    console.log('📍 Homepage: http://localhost:3000/');
    console.log('📍 Dashboard: http://localhost:3002/');

    const testData = {
        event: 'page_view',
        sessionId: 'test_session_' + Date.now(),
        timestamp: Date.now(),
        properties: {
            page_url: 'http://localhost:3000/',
            page_title: 'BOUNCE2BOUNCE Homepage - Consolidated Analytics Test',
            referrer: '',
            utm_source: 'test',
            utm_medium: 'manual',
            utm_campaign: 'consolidation_test',
            viewport_width: 1920,
            viewport_height: 1080,
            timezone: 'America/New_York',
            language: 'en-US'
        }
    };

    try {
        console.log('📤 Sending test analytics data to dashboard...');
        console.log('📊 Data:', JSON.stringify(testData, null, 2));

        const postData = JSON.stringify(testData);
        const options = {
            hostname: 'localhost',
            port: 3002,
            path: '/api/analytics/track',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        await new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    console.log('📥 Response status:', res.statusCode);
                    console.log('📥 Response headers:', res.headers);

                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        console.log('✅ Analytics data sent successfully!');
                        console.log('📊 Response:', data);
                        resolve({ success: true, data });
                    } else {
                        console.log('❌ Analytics request failed:');
                        console.log('📊 Error response:', data);
                        resolve({ success: false, error: data });
                    }
                });
            });

            req.on('error', (error) => {
                console.error('❌ Request error:', error.message);
                reject(error);
            });

            req.write(postData);
            req.end();
        });

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testAnalyticsFlow();