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
    const response = await fetch(url, config);
    
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
      console.log('API Response Status:', response.status);
      console.log('API Response Text:', responseText);
      
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          console.log('API Response Data:', data);
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
      console.error('API Error Response:', { status: response.status, data, responseText });
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle network errors (failed to fetch)
    if (error.message === 'Failed to fetch' || error.name === 'TypeError' || !error.status) {
      const networkError = new Error(
        'Cannot connect to server. Please check:\n' +
        '1. Backend server is running (python manage.py runserver)\n' +
        '2. Backend URL is correct: http://127.0.0.1:8000\n' +
        '3. No firewall blocking the connection'
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
    
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  login: async (username, password) => {
    // Django uses username, not email for login
    return apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  refresh: async (refreshToken) => {
    return apiCall('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },

  getCurrentUser: async () => {
    // Django doesn't have /auth/me by default
    // Try to get user info from accounts endpoint or create a custom endpoint
    // For now, return empty user object
    try {
      // Try accounts endpoint which requires auth
      await apiCall('/accounts/');
      return { user: { username: 'User' } };
    } catch (error) {
      throw error;
    }
  },
};

// Accounts API
export const accountsAPI = {
  getAll: async () => {
    return apiCall('/accounts');
  },

  getById: async (id) => {
    return apiCall(`/accounts/${id}`);
  },

  create: async (name) => {
    return apiCall('/accounts', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  update: async (id, name) => {
    return apiCall(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  },

  delete: async (id) => {
    return apiCall(`/accounts/${id}`, {
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
    const endpoint = queryString ? `/transactions?${queryString}` : '/transactions';
    return apiCall(endpoint);
  },

  getById: async (id) => {
    return apiCall(`/transactions/${id}`);
  },

  create: async (transactionData) => {
    return apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },

  update: async (id, transactionData) => {
    return apiCall(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    });
  },

  delete: async (id) => {
    return apiCall(`/transactions/${id}`, {
      method: 'DELETE',
    });
  },

  getSummary: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.account) queryParams.append('account', filters.account);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/transactions/summary?${queryString}` : '/transactions/summary';
    return apiCall(endpoint);
  },
};

// Notes API
export const notesAPI = {
  getAll: async () => {
    return apiCall('/notes');
  },

  getById: async (id) => {
    return apiCall(`/notes/${id}`);
  },

  create: async (text) => {
    return apiCall('/notes', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  update: async (id, text) => {
    return apiCall(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  },

  delete: async (id) => {
    return apiCall(`/notes/${id}`, {
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
    return apiCall('/settings', {
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

