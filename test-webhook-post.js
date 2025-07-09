const https = require('https');

// Test data similar to what Meta sends
const testData = {
    object: 'instagram',
    entry: [
        {
            id: 'test',
            time: Date.now(),
            changes: [
                {
                    field: 'comments',
                    value: {
                        id: 'test_comment_123',
                        text: 'Test comment from webhook test',
                        from: {
                            id: 'test_user_456',
                            username: 'test_user'
                        },
                        media: {
                            id: 'test_media_789'
                        }
                    }
                }
            ]
        }
    ]
};

const postData = JSON.stringify(testData);

const options = {
    hostname: 'b2b.click',
    port: 443,
    path: '/api/webhooks/instagram',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Meta-Webhook-Test/1.0',
        'X-Hub-Signature-256': 'sha256=test_signature' // This will be invalid but should still reach the handler
    }
};

console.log('🧪 Testing POST request to webhook endpoint...');
console.log('🧪 URL: https://b2b.click/api/webhooks/instagram');
console.log('🧪 Data:', testData);

const req = https.request(options, (res) => {
    console.log('✅ Response received!');
    console.log('📊 Status Code:', res.statusCode);
    console.log('📊 Headers:', res.headers);

    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('📊 Response Body:', responseData);
        console.log('🎉 Test completed!');
    });
});

req.on('error', (error) => {
    console.error('❌ Request failed:', error);
});

// Write data to request body
req.write(postData);
req.end();
