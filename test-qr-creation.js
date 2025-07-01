const fetch = require('node-fetch');

async function testQRCodeCreation() {
    try {
        // First, let's check if we can get events
        console.log('🔍 Testing QR code creation...');
        
        // Test creating a QR code for event ID 22 (mentioned in the error)
        const response = await fetch('http://localhost:3000/api/events/22/qr-codes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Note: In real scenario, we'd need proper authentication
                'Authorization': 'Bearer test-token'
            },
            body: JSON.stringify({
                name: 'Test QR Code',
                description: 'Test QR code for debugging',
                custom_url: null
            })
        });

        console.log('📊 Response status:', response.status);
        const result = await response.json();
        console.log('📊 Response body:', JSON.stringify(result, null, 2));

        if (!response.ok) {
            console.error('❌ QR code creation failed:', result.message);
        } else {
            console.log('✅ QR code created successfully!');
        }

    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
}

// Run the test
testQRCodeCreation();
