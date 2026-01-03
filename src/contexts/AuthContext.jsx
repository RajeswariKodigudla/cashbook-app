import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, logout as authLogout, getCurrentUser } from '../services/auth';
import { getAuthToken } from '../config/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Only log in development
  if (import.meta.env.MODE === 'development') {
    console.log("🔐 AuthProvider is initializing...");
  }

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log("🔐 AuthProvider useEffect running, calling checkAuth...");
    }
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const hasToken = isAuthenticated();
      if (import.meta.env.MODE === 'development') {
        console.log('Auth check - has token:', hasToken);
      }
      
      if (!hasToken) {
        // No token - definitely not authenticated
        if (import.meta.env.MODE === 'development') {
          console.log('No token found - not authenticated');
        }
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
      
      // Token exists - validate it by trying to get user info
      // Use a timeout to prevent hanging (3 seconds max)
      if (import.meta.env.MODE === 'development') {
        console.log('Token found - validating...');
      }
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth check timeout - backend may not be accessible')), 3000)
        );
        
        const userDataPromise = getCurrentUser();
        const userData = await Promise.race([userDataPromise, timeoutPromise]);
        
        if (import.meta.env.MODE === 'development') {
          console.log('Token valid - user:', userData);
        }
        setUser(userData.user || { username: 'User' });
        setIsAuth(true);
      } catch (error) {
        console.error('Token validation failed:', error);
        
        // Check if it's a backend connection issue
        if (error.message?.includes('timeout') || 
            error.message?.includes('Failed to fetch') ||
            error.message?.includes('GitHub Pages') ||
            error.isNetworkError) {
          console.warn('⚠️ Backend connection issue detected');
          console.warn('   This might be because:');
          console.warn('   1. Backend is not deployed (GitHub Pages cannot host Django)');
          console.warn('   2. Backend URL is incorrect');
          console.warn('   3. Backend server is not running');
          console.warn('   Run testBackendConnection() in console to diagnose');
        }
        
        // Token is invalid or network error - clear it and mark as not authenticated
        // Don't clear token on network errors - just mark as not authenticated
        // This allows user to try again if backend comes back online
        if (error.message?.includes('timeout') || 
            error.message?.includes('Failed to fetch') ||
            error.isNetworkError) {
          console.log('Network error or timeout - marking as not authenticated (keeping token for retry)');
        } else {
          console.log('Token invalid - clearing and logging out');
          try {
            authLogout(); // Clear invalid token
          } catch (logoutError) {
            console.error('Logout error:', logoutError);
          }
        }
        setIsAuth(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuth(false);
      setUser(null);
    } finally {
      // Always set loading to false, even if there's an error
      setLoading(false);
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    setIsAuth(true);
  };

  const handleLogout = () => {
    authLogout();
    setUser(null);
    setIsAuth(false);
  };

  const value = {
    user,
    isAuthenticated: isAuth,
    loading,
    login: handleLogin,
    logout: handleLogout,
    refreshAuth: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

