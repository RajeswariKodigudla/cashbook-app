import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

export default function AuthGuard({ children }) {
  const { isAuthenticated, loading, login, refreshAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthGuard - loading:', loading, 'isAuthenticated:', isAuthenticated);
  }, [isAuthenticated, loading]);

  const handleLoginSuccess = async (user, token) => {
    console.log('Login success in AuthGuard:', user, token);
    // Update auth context
    if (login) {
      login(user, token);
    }
    // Refresh auth state
    if (refreshAuth) {
      await refreshAuth();
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginModal
        onClose={() => {
          // Don't allow closing without login - show message
          alert('Please login to continue');
        }}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  return <>{children}</>;
}

