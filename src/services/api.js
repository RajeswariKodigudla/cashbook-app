import { API_BASE_URL, getAuthHeaders } from '../config/api';

// Generic API call function with automatic token refresh
const apiCall = async (endpoint, options = {}, retry = true) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    // Only log in development mode to reduce console noise
    if (import.meta.env.MODE === 'development') {
      console.log('📡 Making API call to:', url);
    }
    const response = await fetch(url, config);
    if (import.meta.env.MODE === 'development') {
      console.log('📡 API Response Status:', response.status, response.statusText);
    }
    
    // Check if response is HTML (GitHub Pages) instead of JSON (API)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html') && response.status === 200) {
      console.error('❌ Backend returned HTML instead of JSON - likely GitHub Pages documentation, not API');
      throw new Error(
        'Backend URL appears to be GitHub Pages (static site), not a Django API server.\n\n' +
        'GitHub Pages cannot host Django backends. You need to:\n' +
        '1. Deploy your Django backend to Railway, Render, or another platform\n' +
        '2. Update API_BASE_URL in src/config/api.js with the actual backend URL\n' +
        '3. Or use local backend: http://127.0.0.1:8000/api (run: python manage.py runserver)'
      );
    }
    
    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && retry) {
      try {
        const { refreshToken } = await import('./auth');
        await refreshToken();
        // Retry the request with new token
        return apiCall(endpoint, options, false);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
        throw new Error('Session expired. Please login again.');
      }
    }

    // Try to parse JSON, but handle non-JSON responses
    let data;
    let responseText = '';
    try {
      responseText = await response.text();
      // Only log in development mode to reduce console noise
      if (import.meta.env.MODE === 'development') {
        console.log('API Response Status:', response.status);
        console.log('API Response Text:', responseText);
      }
      
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          // Only log in development mode
          if (import.meta.env.MODE === 'development') {
            console.log('API Response Data:', data);
          }
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          console.error('Response text was:', responseText);
          // If it's not JSON, create error with the text
          throw new Error(`Invalid JSON response from server. Response: ${responseText.substring(0, 200)}`);
        }
      } else {
        data = {};
      }
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      // If it's already an Error, re-throw it
      if (parseError instanceof Error) {
        throw parseError;
      }
      data = { message: 'Invalid response from server', rawResponse: responseText };
    }

    if (!response.ok) {
      // Build detailed error message
      let errorMessage = 'Something went wrong';
      
      if (data.detail) {
        errorMessage = data.detail;
      } else if (data.message) {
        errorMessage = data.message;
      } else if (data.non_field_errors && data.non_field_errors.length > 0) {
        errorMessage = data.non_field_errors[0];
      } else if (typeof data === 'object' && Object.keys(data).length > 0) {
        // If there are field errors, format them
        const fieldErrors = Object.entries(data)
          .filter(([key, value]) => Array.isArray(value) && value.length > 0)
          .map(([key, value]) => `${key}: ${value[0]}`)
          .join(', ');
        if (fieldErrors) {
          errorMessage = fieldErrors;
        }
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      error.responseText = responseText;
      // Enhanced error logging for validation errors
      if (response.status === 400 && data) {
        console.error('❌ Validation Error Details:');
        Object.entries(data).forEach(([field, errors]) => {
          if (Array.isArray(errors) && errors.length > 0) {
            console.error(`  ❌ ${field}:`, errors);
          } else if (typeof errors === 'string') {
            console.error(`  ❌ ${field}:`, errors);
          }
        });
      }
      console.error('API Error Response:', { status: response.status, data, responseText });
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle network errors (failed to fetch)
    if (error.message === 'Failed to fetch' || error.name === 'TypeError' || !error.status) {
      // Check if it's a CORS error
      const isCorsError = error.message.includes('CORS') || 
                         error.message.includes('Access-Control') ||
                         (error.name === 'TypeError' && !error.status);
      
      let errorMessage = 'Cannot connect to backend server.\n\n';
      
      if (API_BASE_URL.includes('github.io')) {
        errorMessage += '⚠️ IMPORTANT: GitHub Pages cannot host Django APIs!\n\n';
        errorMessage += 'The URL https://rajeswarikodigudla.github.io/cashbook-backend/ is likely just documentation.\n\n';
        errorMessage += 'SOLUTIONS:\n';
        errorMessage += '1. Deploy Django backend to Railway/Render/Heroku\n';
        errorMessage += '2. Update API_BASE_URL in src/config/api.js\n';
        errorMessage += '3. Or use local backend (see below)\n\n';
      }
      
      errorMessage += 'TROUBLESHOOTING:\n';
      errorMessage += `1. Backend URL: ${API_BASE_URL}\n`;
      errorMessage += '2. Test in browser: Open the URL above\n';
      errorMessage += '3. Should return JSON, not HTML\n';
      if (isCorsError) {
        errorMessage += '4. CORS error detected - backend needs CORS headers\n';
      }
      errorMessage += '5. For local dev: Run "python manage.py runserver" and use http://127.0.0.1:8000/api';
      
      const networkError = new Error(errorMessage);
      networkError.isNetworkError = true;
      networkError.isCorsError = isCorsError;
      throw networkError;
    }
    
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password, password_confirm, first_name, last_name) => {
    return apiCall('/register/', {
      method: 'POST',
      body: JSON.stringify({ 
        username, 
        email, 
        password, 
        password_confirm, 
        first_name: first_name || '', 
        last_name: last_name || '' 
      }),
    });
  },

  login: async (username, password) => {
    // Django REST Framework JWT uses /api/token/ endpoint
    return apiCall('/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  refresh: async (refreshToken) => {
    // Django REST Framework JWT uses /api/token/refresh/ endpoint
    return apiCall('/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },

  getCurrentUser: async () => {
    // Django doesn't have /auth/me by default
    // Since we don't have a user endpoint, we'll validate the token by trying
    // a simple API call. If it succeeds, user is authenticated.
    // For now, just return a default user - the token validation happens via
    // the login/refresh token mechanism
    try {
      // Try a simple endpoint that requires auth (like transactions summary)
      // This validates the token without needing a user endpoint
      await apiCall('/transactions/summary/');
      // If successful, return default user - token is valid
      return { user: { username: 'User' } };
    } catch (error) {
      // If it's a 404 or endpoint doesn't exist, that's OK - token might still be valid
      // If it's 401, token is invalid
      if (error.status === 401) {
        throw error; // Token is invalid
      }
      // For 404 or other errors, assume token is valid (might be endpoint issue)
      // Return default user - the actual auth will be validated on next API call
      return { user: { username: 'User' } };
    }
  },
};

// Accounts API
export const accountsAPI = {
  getAll: async () => {
    return apiCall('/accounts/');
  },

  getById: async (id) => {
    return apiCall(`/accounts/${id}/`);
  },

  create: async (name) => {
    return apiCall('/accounts/', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  update: async (id, name) => {
    return apiCall(`/accounts/${id}/`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  },

  delete: async (id) => {
    return apiCall(`/accounts/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.account) queryParams.append('account', filters.account);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.skip) queryParams.append('skip', filters.skip);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/transactions/?${queryString}` : '/transactions/';
    return apiCall(endpoint);
  },

  getById: async (id) => {
    return apiCall(`/transactions/${id}/`);
  },

  create: async (transactionData) => {
    return apiCall('/transactions/', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },

  update: async (id, transactionData) => {
    return apiCall(`/transactions/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    });
  },

  delete: async (id) => {
    return apiCall(`/transactions/${id}/`, {
      method: 'DELETE',
    });
  },

  getSummary: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.account) queryParams.append('account', filters.account);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/transactions/summary/?${queryString}` : '/transactions/summary/';
    return apiCall(endpoint);
  },
  
  getIncome: async () => {
    // Get all income transactions
    return apiCall('/transactions/income/');
  },
  
  getExpense: async () => {
    // Get all expense transactions
    return apiCall('/transactions/expense/');
  },
};

// Notes API
export const notesAPI = {
  getAll: async () => {
    return apiCall('/notes/');
  },

  getById: async (id) => {
    return apiCall(`/notes/${id}/`);
  },

  create: async (text) => {
    return apiCall('/notes/', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  update: async (id, text) => {
    return apiCall(`/notes/${id}/`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  },

  delete: async (id) => {
    return apiCall(`/notes/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Settings API
export const settingsAPI = {
  get: async () => {
    return apiCall('/settings');
  },

  update: async (settingsData) => {
    return apiCall('/settings/', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },

  setAppLock: async (password) => {
    return apiCall('/settings/set_app_lock/', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  verifyAppLock: async (password) => {
    return apiCall('/settings/verify_app_lock/', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  removeAppLock: async () => {
    return apiCall('/settings/remove_app_lock/', {
      method: 'DELETE',
    });
  },
};

// Backup API
export const backupAPI = {
  get: async () => {
    return apiCall('/backup');
  },

  restore: async (backupData) => {
    return apiCall('/backup/restore', {
      method: 'POST',
      body: JSON.stringify(backupData),
    });
  },
};

