/**
 * CORS Connection Test Utility
 * Run this in browser console to diagnose CORS issues
 */

export const testCorsConnection = async () => {
  const API_URL = 'https://rajeswari.pythonanywhere.com/api';
  
  console.log('🔍 Testing CORS Connection...\n');
  
  // Test 1: Simple GET request
  console.log('Test 1: GET /api/');
  try {
    const response = await fetch(API_URL + '/');
    const corsHeaders = {
      'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
      'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
    };
    
    if (corsHeaders['access-control-allow-origin']) {
      console.log('✅ CORS Headers Found:', corsHeaders);
      const data = await response.json();
      console.log('✅ GET Request Successful:', data);
    } else {
      console.error('❌ NO CORS HEADERS! Backend needs CORS configuration.');
      console.error('📋 Solution: Update settings.py on PythonAnywhere');
    }
  } catch (error) {
    console.error('❌ GET Request Failed:', error.message);
    console.error('📋 This is a CORS error. Backend needs CORS configuration.');
  }
  
  console.log('\n');
  
  // Test 2: Preflight OPTIONS request
  console.log('Test 2: OPTIONS Preflight Request');
  try {
    const response = await fetch(API_URL + '/token/', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://rajeswarikodigudla.github.io',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type,authorization',
      }
    });
    
    const corsHeaders = {
      'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
      'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
    };
    
    if (corsHeaders['access-control-allow-origin']) {
      console.log('✅ Preflight Successful:', corsHeaders);
    } else {
      console.error('❌ Preflight Failed - No CORS headers');
    }
  } catch (error) {
    console.error('❌ Preflight Error:', error.message);
  }
  
  console.log('\n');
  
  // Test 3: POST request (login attempt)
  console.log('Test 3: POST /api/token/ (Login)');
  try {
    const response = await fetch(API_URL + '/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        password: 'test'
      })
    });
    
    // 401 is expected for wrong credentials, but means CORS worked
    if (response.status === 401) {
      console.log('✅ POST Request Successful! (401 = wrong credentials, but CORS is working)');
    } else {
      console.log('✅ POST Request Successful! Status:', response.status);
    }
  } catch (error) {
    console.error('❌ POST Request Failed:', error.message);
    console.error('📋 This is a CORS error. Backend needs CORS configuration.');
  }
  
  console.log('\n');
  console.log('📋 If you see CORS errors, update PythonAnywhere:');
  console.log('1. Open cashbook_backend/settings.py');
  console.log('2. Copy CORS code from EXACT_CODE_TO_COPY_PYTHONANYWHERE.txt');
  console.log('3. Save and reload web app');
};

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  window.testCorsConnection = testCorsConnection;
}

