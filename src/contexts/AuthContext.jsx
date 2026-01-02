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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const hasToken = isAuthenticated();
      console.log('Auth check - has token:', hasToken);
      
      if (!hasToken) {
        // No token - definitely not authenticated
        console.log('No token found - not authenticated');
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
      
      // Token exists - validate it by trying to get user info
      console.log('Token found - validating...');
      try {
        const userData = await getCurrentUser();
        console.log('Token valid - user:', userData);
        setUser(userData.user || { username: 'User' });
        setIsAuth(true);
      } catch (error) {
        console.error('Token validation failed:', error);
        // Token is invalid - clear it and mark as not authenticated
        if (error.status === 401 || error.status === 0 || error.message?.includes('401') || error.message?.includes('Failed to fetch')) {
          console.log('Token invalid or expired - clearing and logging out');
          authLogout(); // Clear invalid token
          setIsAuth(false);
          setUser(null);
        } else {
          // Network error or other issue - still mark as not authenticated to be safe
          console.log('Error validating token - marking as not authenticated');
          setIsAuth(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuth(false);
      setUser(null);
    } finally {
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

