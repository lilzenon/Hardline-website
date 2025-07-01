const fetch = require('node-fetch');

async function testQRCodeAPI() {
    try {
        console.log('🔍 Testing QR code API...');
        
        // Test without authentication first
        console.log('📊 Testing without authentication...');
        const response1 = await fetch('http://localhost:3000/api/events/22/qr-codes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test QR Code',
                description: 'Test QR code for debugging'
            })
        });

        console.log('📊 Response status (no auth):', response1.status);
        const result1 = await response1.text();
        console.log('📊 Response body (no auth):', result1);

        // Test GET endpoint without auth
        console.log('\n📊 Testing GET endpoint without authentication...');
        const response2 = await fetch('http://localhost:3000/api/events/22/qr-codes');
        console.log('📊 GET Response status (no auth):', response2.status);
        const result2 = await response2.text();
        console.log('📊 GET Response body (no auth):', result2);

    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
}

// Run the test
testQRCodeAPI();
