import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthGuard({ children }) {
  // Only log in development
  if (import.meta.env.MODE === 'development') {
    console.log("🛡️ AuthGuard is rendering...");
  }
  
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    // Always log errors
    console.error("❌ Error getting auth context:", error);
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error: Auth context not available</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  
  const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🛡️ AuthGuard - loading:', loading, 'isAuthenticated:', isAuthenticated);
    }
  }, [isAuthenticated, loading]);

  // Removed handleLoginSuccess - Login page handles this now

  if (loading) {
    if (import.meta.env.MODE === 'development') {
      console.log("🛡️ AuthGuard showing loading state");
    }
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ fontSize: '18px' }}>Loading...</div>
        <div style={{ fontSize: '12px', color: '#666' }}>Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (import.meta.env.MODE === 'development') {
      console.log("🛡️ AuthGuard redirecting to login page");
    }
    // Redirect to login page instead of showing modal
    return <Navigate to="/login" replace />;
  }

  if (import.meta.env.MODE === 'development') {
    console.log("🛡️ AuthGuard rendering children (authenticated)");
  }
  return <>{children}</>;
}

