/**
 * Test backend connection and provide diagnostic information
 */
export const testBackendConnection = async () => {
  const { API_BASE_URL } = await import('../config/api');
  
  console.log('🧪 Testing Backend Connection...\n');
  console.log('📍 Backend URL:', API_BASE_URL);
  
  const results = {
    url: API_BASE_URL,
    tests: []
  };
  
  // Test 1: Check if URL is accessible
  try {
    console.log('Test 1: Checking if URL is accessible...');
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const contentType = response.headers.get('content-type') || '';
    const isHTML = contentType.includes('text/html');
    const isJSON = contentType.includes('application/json');
    
    if (isHTML) {
      results.tests.push({
        name: 'URL Accessibility',
        status: '⚠️',
        message: 'URL returns HTML (likely GitHub Pages, not API)',
        details: 'GitHub Pages cannot host Django APIs. You need to deploy to Railway/Render/etc.'
      });
      console.warn('⚠️ URL returns HTML - this is likely GitHub Pages documentation, not an API');
    } else if (isJSON) {
      const data = await response.json();
      results.tests.push({
        name: 'URL Accessibility',
        status: '✅',
        message: 'URL is accessible and returns JSON',
        details: data
      });
      console.log('✅ URL is accessible and returns JSON:', data);
    } else {
      results.tests.push({
        name: 'URL Accessibility',
        status: '❌',
        message: `Unexpected content type: ${contentType}`,
        details: `Status: ${response.status} ${response.statusText}`
      });
      console.error('❌ Unexpected response:', response.status, contentType);
    }
  } catch (error) {
    results.tests.push({
      name: 'URL Accessibility',
      status: '❌',
      message: 'Cannot connect to URL',
      details: error.message
    });
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('Failed to fetch')) {
      console.error('\n💡 This usually means:');
      console.error('   1. Backend is not deployed at this URL');
      console.error('   2. CORS is not enabled');
      console.error('   3. Backend server is not running');
    }
  }
  
  // Test 2: Check CORS
  try {
    console.log('\nTest 2: Checking CORS...');
    const response = await fetch(API_BASE_URL, {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'GET',
      },
    });
    
    const corsHeaders = {
      'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
    };
    
    if (corsHeaders['access-control-allow-origin']) {
      results.tests.push({
        name: 'CORS Configuration',
        status: '✅',
        message: 'CORS headers present',
        details: corsHeaders
      });
      console.log('✅ CORS is configured:', corsHeaders);
    } else {
      results.tests.push({
        name: 'CORS Configuration',
        status: '⚠️',
        message: 'CORS headers not found',
        details: 'Backend may need CORS configuration'
      });
      console.warn('⚠️ CORS headers not found');
    }
  } catch (error) {
    results.tests.push({
      name: 'CORS Configuration',
      status: '❌',
      message: 'CORS check failed',
      details: error.message
    });
    console.error('❌ CORS check failed:', error.message);
  }
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  results.tests.forEach(test => {
    console.log(`${test.status} ${test.name}: ${test.message}`);
  });
  
  return results;
};

// Auto-run on import (optional - comment out if not needed)
// testBackendConnection();

