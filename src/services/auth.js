import { authAPI } from './api';
import { setAuthToken, removeAuthToken } from '../config/api';

// Get current user info
export const getCurrentUser = async () => {
  try {
    const userResponse = await authAPI.getCurrentUser();
    return { user: userResponse.user || { username: 'User' } };
  } catch (error) {
    // Don't log as error if it's just a missing endpoint or 404
    if (error.status === 404 || error.message?.includes('accounts') || error.message?.includes('endpoint')) {
      if (import.meta.env.MODE === 'development') {
        console.log('User endpoint not available, using default user');
      }
      return { user: { username: 'User' } };
    }
    // For network errors or auth errors, log and throw
    console.error('Error getting current user:', error);
    throw error;
  }
};

// Refresh access token using refresh token
export const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    const response = await authAPI.refresh(refreshTokenValue);
    
    if (response.access) {
      setAuthToken(response.access);
      if (response.refresh) {
        localStorage.setItem('refreshToken', response.refresh);
      }
      return response.access;
    }
    
    throw new Error('Invalid refresh response');
  } catch (error) {
    console.error('Token refresh failed:', error);
    // If refresh fails, logout user
    logout();
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    console.log('Attempting login for username:', username);
    const response = await authAPI.login(username, password);
    console.log('Login API response:', response);
    
    // Django JWT returns { access, refresh } not { token }
    if (response.access) {
      setAuthToken(response.access);
      // Store refresh token for token renewal
      if (response.refresh) {
        localStorage.setItem('refreshToken', response.refresh);
      }
      
      // Try to get user info (Django may not return user in login response)
      // Skip this for now as it might fail - just use username
      let user = { username };
      
      // Optional: Try to get user info (don't fail if this doesn't work)
      try {
        const userResponse = await authAPI.getCurrentUser();
        if (userResponse && userResponse.user) {
          user = userResponse.user;
        }
      } catch (err) {
        console.log('getCurrentUser failed (this is OK):', err);
        // Use username from login - this is fine
      }
      
      console.log('✅ Login successful');
      return { 
        success: true, 
        user: user, 
        token: response.access,
        refreshToken: response.refresh 
      };
    }
    
    // If no access token in response
    console.error('❌ No access token in response:', response);
    return { success: false, message: 'Invalid response from server. No access token received.' };
  } catch (error) {
    console.error('❌ Login error:', error);
    
    // Better error messages
    let errorMessage = 'Login failed';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.data) {
      if (error.data.detail) {
        errorMessage = error.data.detail;
      } else if (error.data.message) {
        errorMessage = error.data.message;
      } else if (typeof error.data === 'string') {
        errorMessage = error.data;
      }
    }
    
    return { success: false, message: errorMessage };
  }
};

export const register = async (username, email, password, password_confirm, first_name = '', last_name = '') => {
  try {
    const response = await authAPI.register(username, email, password, password_confirm || password, first_name, last_name);
    // Django register endpoint returns: {"message": "User created successfully", "username": "your_username"}
    if (response.message && response.username) {
      return { 
        success: true, 
        message: response.message, 
        username: response.username 
      };
    }
    return { success: false, message: 'Invalid response from server' };
  } catch (error) {
    // Better error messages
    let errorMessage = 'Registration failed';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.data) {
      if (error.data.detail) {
        errorMessage = error.data.detail;
      } else if (error.data.message) {
        errorMessage = error.data.message;
      } else if (typeof error.data === 'string') {
        errorMessage = error.data;
      }
    }
    return { success: false, message: errorMessage };
  }
};

export const logout = () => {
  removeAuthToken();
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('current_account');
  // Redirect to home page (will show login modal)
  window.location.href = '/';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

