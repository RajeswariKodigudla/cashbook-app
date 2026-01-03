// API Configuration
// Backend deployed to PythonAnywhere: https://rajeswari.pythonanywhere.com
//
// Vite uses import.meta.env instead of process.env
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://rajeswari.pythonanywhere.com/api'  // PythonAnywhere backend URL
    : 'http://127.0.0.1:8000/api');  // Local development

// Log the API URL for debugging
console.log('🌐 API Base URL:', API_BASE_URL);
console.log('💡 To test connection, run: testBackendConnection() in browser console');

// For Node.js backend, use:
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

