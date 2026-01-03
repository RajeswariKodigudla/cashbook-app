// API Configuration
// Backend URL: https://rajeswarikodigudla.github.io/cashbook-backend/
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://rajeswarikodigudla.github.io/cashbook-backend/api'  // Deployed backend URL
    : 'http://127.0.0.1:8000/api');                // Local development

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

