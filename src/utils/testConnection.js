/**
 * Test script to verify frontend-backend connection
 * Run this in browser console to test the connection
 */

export const testConnection = async () => {
  // Vite uses import.meta.env instead of process.env
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  const results = [];

  console.log('🧪 Testing Frontend-Backend Connection...\n');

  // Test 1: Check backend is running
  try {
    const healthCheck = await fetch('http://127.0.0.1:8000/');
    const healthData = await healthCheck.json();
    results.push({ test: 'Backend Running', status: '✅', data: healthData });
    console.log('✅ Backend is running');
  } catch (error) {
    results.push({ test: 'Backend Running', status: '❌', error: error.message });
    console.error('❌ Backend not running:', error.message);
    return results;
  }

  // Test 2: Check API URL configuration
  results.push({ 
    test: 'API URL Config', 
    status: '✅', 
    data: API_URL 
  });
  console.log('✅ API URL:', API_URL);

  // Test 3: Test login (if credentials provided)
  const testUsername = prompt('Enter username for login test (or cancel to skip):');
  if (testUsername) {
    const testPassword = prompt('Enter password:');
    try {
      const loginResponse = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: testUsername, password: testPassword }),
      });
      const loginData = await loginResponse.json();
      
      if (loginData.access) {
        localStorage.setItem('authToken', loginData.access);
        if (loginData.refresh) {
          localStorage.setItem('refreshToken', loginData.refresh);
        }
        results.push({ test: 'Login', status: '✅', data: 'Token received' });
        console.log('✅ Login successful! Token saved.');

        // Test 4: Test authenticated endpoint
        try {
          const accountsResponse = await fetch(`${API_URL}/accounts/`, {
            headers: {
              'Authorization': `Bearer ${loginData.access}`,
              'Content-Type': 'application/json',
            },
          });
          const accountsData = await accountsResponse.json();
          results.push({ test: 'Get Accounts', status: '✅', data: accountsData });
          console.log('✅ Authenticated request successful:', accountsData);
        } catch (error) {
          results.push({ test: 'Get Accounts', status: '❌', error: error.message });
          console.error('❌ Authenticated request failed:', error.message);
        }
      } else {
        results.push({ test: 'Login', status: '❌', error: loginData });
        console.error('❌ Login failed:', loginData);
      }
    } catch (error) {
      results.push({ test: 'Login', status: '❌', error: error.message });
      console.error('❌ Login error:', error.message);
    }
  }

  // Test 5: Check token storage
  const token = localStorage.getItem('authToken');
  if (token) {
    results.push({ test: 'Token Storage', status: '✅', data: 'Token exists' });
    console.log('✅ Token stored in localStorage');
  } else {
    results.push({ test: 'Token Storage', status: '⚠️', data: 'No token found' });
    console.warn('⚠️ No token in localStorage');
  }

  console.log('\n📊 Test Results Summary:');
  results.forEach(result => {
    console.log(`${result.status} ${result.test}`);
  });

  return results;
};

// Auto-run test on import (optional)
// testConnection();



