const http = require('http');

function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        const req = http.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({ 
                        status: res.statusCode, 
                        data: jsonData, 
                        headers: res.headers,
                        location: res.headers.location 
                    });
                } catch (e) {
                    resolve({ 
                        status: res.statusCode, 
                        data: data, 
                        headers: res.headers,
                        location: res.headers.location 
                    });
                }
            });
        });

        req.on('error', reject);
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

async function testMaintenanceWorkflow() {
    console.log('🔧 Testing Complete Maintenance Mode Workflow...\n');
    
    try {
        // Test 1: Check current maintenance status from dashboard
        console.log('1. Checking maintenance status from dashboard API');
        const dashboardStatus = await makeRequest('http://localhost:3002/api/settings/maintenance-status');
        console.log('Dashboard Status:', JSON.stringify(dashboardStatus.data, null, 2));
        console.log('Maintenance Mode:', dashboardStatus.data.maintenance_mode ? 'ENABLED' : 'DISABLED');
        
        // Test 2: Test homepage access when maintenance is enabled
        console.log('\n2. Testing homepage access (should redirect to /maintenance if enabled)');
        const homepageResponse = await makeRequest('http://localhost:3005/');
        console.log('Homepage Response Status:', homepageResponse.status);
        console.log('Homepage Response Location:', homepageResponse.location || 'No redirect');
        
        if (homepageResponse.status === 302 && homepageResponse.location === '/maintenance') {
            console.log('✅ Homepage correctly redirects to maintenance page');
        } else if (homepageResponse.status === 200) {
            console.log('ℹ️ Homepage accessible (maintenance mode disabled or IP allowed)');
        } else {
            console.log('⚠️ Unexpected homepage response');
        }
        
        // Test 3: Test direct access to maintenance page
        console.log('\n3. Testing direct access to /maintenance page');
        const maintenanceResponse = await makeRequest('http://localhost:3005/maintenance');
        console.log('Maintenance Page Status:', maintenanceResponse.status);
        
        if (maintenanceResponse.status === 200) {
            console.log('✅ Maintenance page is accessible');
        } else {
            console.log('❌ Maintenance page is not accessible');
        }
        
        // Test 4: Test API access during maintenance
        console.log('\n4. Testing API access during maintenance');
        const apiResponse = await makeRequest('http://localhost:3005/api/test');
        console.log('API Response Status:', apiResponse.status);
        console.log('API Response:', JSON.stringify(apiResponse.data, null, 2));
        
        if (apiResponse.status === 200) {
            console.log('✅ API endpoints remain accessible during maintenance');
        } else if (apiResponse.status === 503) {
            console.log('ℹ️ API endpoints return maintenance response');
        }
        
        // Test 5: Test admin routes during maintenance
        console.log('\n5. Testing admin routes during maintenance');
        const adminResponse = await makeRequest('http://localhost:3005/admin');
        console.log('Admin Route Status:', adminResponse.status);
        
        if (adminResponse.status === 200 || adminResponse.status === 302) {
            console.log('✅ Admin routes remain accessible during maintenance');
        } else {
            console.log('⚠️ Admin routes may be affected by maintenance mode');
        }
        
        console.log('\n🎉 Maintenance workflow test completed!');
        
    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

testMaintenanceWorkflow();
