import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI, register } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import '../styles/loginPage.css';

export default function Login() {
  const navigate = useNavigate();
  const { login: setAuth, isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        // Django uses username, not email for login
        result = await loginAPI(formData.username || formData.email, formData.password);
        if (result.success) {
          setAuth(result.user, result.token);
          // Redirect to home page
          navigate('/');
        } else {
          setError(result.message || 'Authentication failed');
        }
      } else {
        // Registration - validate password confirmation
        if (formData.password !== formData.password_confirm) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        result = await register(
          formData.username, 
          formData.email, 
          formData.password, 
          formData.password_confirm,
          formData.first_name,
          formData.last_name
        );
        
        if (result.success) {
          // After successful registration, automatically log the user in
          const loginResult = await loginAPI(formData.username, formData.password);
          if (loginResult.success) {
            setAuth(loginResult.user, loginResult.token);
            navigate('/');
          } else {
            setError('Registration successful! Please login.');
            setIsLogin(true);
          }
        } else {
          setError(result.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Cashbook App</h1>
          <p>{isLogin ? 'Welcome back! Please login to continue.' : 'Create a new account to get started.'}</p>
        </div>

        <div className="login-card">
          <div className="login-tabs">
            <button
              className={isLogin ? 'active' : ''}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Login
            </button>
            <button
              className={!isLogin ? 'active' : ''}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Register
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-row">
                <input
                  type="text"
                  placeholder="First Name (optional)"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Last Name (optional)"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="form-input"
                />
              </div>
            )}
            
            <input
              type="text"
              placeholder={isLogin ? "Username or Email" : "Username"}
              value={isLogin ? (formData.username || formData.email) : formData.username}
              onChange={(e) => {
                if (isLogin) {
                  setFormData({ ...formData, username: e.target.value, email: e.target.value });
                } else {
                  setFormData({ ...formData, username: e.target.value });
                }
              }}
              className="form-input"
              required
            />
            
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
            )}
            
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-input"
              required
            />
            
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirm}
                onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                className="form-input"
                required
              />
            )}
            
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <span onClick={() => setIsLogin(false)} className="link-text">
                    Register here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span onClick={() => setIsLogin(true)} className="link-text">
                    Login here
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

