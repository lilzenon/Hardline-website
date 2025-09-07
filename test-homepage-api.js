/**
 * Homepage API Integration Test
 * Tests the cross-domain API integration from the homepage perspective
 */

const { default: fetch } = require('node-fetch');

const API_BASE_URL = 'http://localhost:3001/api'; // Through Vite proxy
const DIRECT_API_URL = 'http://localhost:3002/api'; // Direct to dashboard

async function testEndpoint(url, name) {
  try {
    console.log(`🧪 Testing ${name}...`);
    const startTime = Date.now();
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3001',
        'User-Agent': 'Homepage-Test-Client'
      },
      timeout: 10000
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${name} - ${response.status} (${duration}ms)`);
      return { success: true, status: response.status, duration, data };
    } else {
      console.log(`❌ ${name} - ${response.status} (${duration}ms)`);
      return { success: false, status: response.status, duration };
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🏠 Homepage API Integration Test Suite');
  console.log('=====================================\n');
  
  const tests = [
    {
      name: 'Maintenance Status (via Vite proxy)',
      url: `${API_BASE_URL}/settings/maintenance-status`
    },
    {
      name: 'Maintenance Status (direct)',
      url: `${DIRECT_API_URL}/settings/maintenance-status`
    },
    {
      name: 'SEO Settings (via Vite proxy)',
      url: `${API_BASE_URL}/settings/seo`
    },
    {
      name: 'SEO Settings (direct)',
      url: `${DIRECT_API_URL}/settings/seo`
    }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test.url, test.name);
    results.push({ ...test, ...result });
    console.log(''); // Add spacing
  }
  
  // Summary
  console.log('📊 Test Results Summary');
  console.log('========================');
  
  const proxyTests = results.filter(r => r.url.includes('3001'));
  const directTests = results.filter(r => r.url.includes('3002'));
  
  const proxySuccess = proxyTests.filter(r => r.success).length;
  const directSuccess = directTests.filter(r => r.success).length;
  
  console.log(`🔄 Vite Proxy Tests: ${proxySuccess}/${proxyTests.length} passed`);
  console.log(`🎯 Direct API Tests: ${directSuccess}/${directTests.length} passed`);
  
  if (proxySuccess === proxyTests.length && directSuccess === directTests.length) {
    console.log('🎉 All tests passed! Cross-domain integration is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check the results above for details.');
  }
  
  return results;
}

// Run the tests
runTests().catch(console.error);
