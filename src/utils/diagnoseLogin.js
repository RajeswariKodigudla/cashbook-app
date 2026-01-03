/**
 * Login Diagnosis Utility
 * Run this in browser console to diagnose login issues
 */

export const diagnoseLogin = async (username, password) => {
  const API_URL = 'https://rajeswari.pythonanywhere.com/api';
  
  console.log('🔍 Diagnosing Login Issues...\n');
  console.log('Backend URL:', API_URL);
  console.log('Username:', username || 'test');
  console.log('Password:', password ? '***' : 'test');
  console.log('\n');
  
  // Test 1: Check if API is accessible
  console.log('Test 1: Checking API accessibility...');
  try {
    const response = await fetch(API_URL + '/');
    const corsHeader = response.headers.get('access-control-allow-origin');
    
    if (corsHeader) {
      console.log('✅ API is accessible');
      console.log('✅ CORS Header:', corsHeader);
      const data = await response.json();
      console.log('✅ API Response:', data);
    } else {
      console.error('❌ NO CORS HEADER! Backend CORS not configured.');
      console.error('📋 Fix: Update settings.py on PythonAnywhere with CORS configuration');
      return;
    }
  } catch (error) {
    console.error('❌ Cannot reach API:', error.message);
    console.error('📋 This is likely a CORS error or network issue');
    return;
  }
  
  console.log('\n');
  
  // Test 2: Test login endpoint
  console.log('Test 2: Testing login endpoint...');
  try {
    const loginResponse = await fetch(API_URL + '/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username || 'test',
        password: password || 'test'
      })
    });
    
    console.log('Login Response Status:', loginResponse.status);
    console.log('Login Response Headers:', {
      'content-type': loginResponse.headers.get('content-type'),
      'access-control-allow-origin': loginResponse.headers.get('access-control-allow-origin'),
    });
    
    const loginData = await loginResponse.text();
    console.log('Login Response Body:', loginData);
    
    if (loginResponse.status === 200) {
      console.log('✅ Login endpoint is working!');
      try {
        const jsonData = JSON.parse(loginData);
        console.log('✅ Login Response (JSON):', jsonData);
      } catch (e) {
        console.log('⚠️ Response is not JSON:', loginData);
      }
    } else if (loginResponse.status === 401) {
      console.log('⚠️ 401 Unauthorized - Wrong credentials (but CORS is working!)');
      console.log('📋 Try with correct username/password');
    } else {
      console.error('❌ Unexpected status:', loginResponse.status);
      console.error('Response:', loginData);
    }
  } catch (error) {
    console.error('❌ Login request failed:', error.message);
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.error('📋 This is a CORS error. Backend needs CORS configuration.');
    }
  }
  
  console.log('\n');
  
  // Test 3: Check frontend configuration
  console.log('Test 3: Checking frontend configuration...');
  const apiBaseUrl = window.location.origin.includes('github.io') 
    ? 'https://rajeswari.pythonanywhere.com/api'
    : 'http://127.0.0.1:8000/api';
  console.log('Expected API URL:', apiBaseUrl);
  console.log('Current origin:', window.location.origin);
  
  console.log('\n');
  console.log('📋 Summary:');
  console.log('1. If CORS header is missing → Update PythonAnywhere settings.py');
  console.log('2. If 401 error → Wrong credentials, try correct username/password');
  console.log('3. If network error → Check backend is running and accessible');
  console.log('4. If still failing → Check browser console for detailed errors');
};

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  window.diagnoseLogin = diagnoseLogin;
  console.log('💡 Run diagnoseLogin(username, password) in console to test login');
}

