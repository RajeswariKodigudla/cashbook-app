import { useState } from 'react';
import { login, register } from '../services/auth';
import '../styles/loginModal.css';

export default function LoginModal({ onClose, onSuccess }) {
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
        result = await login(formData.username || formData.email, formData.password);
        if (result.success) {
          onSuccess?.(result.user, result.token);
          onClose();
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
          const loginResult = await login(formData.username, formData.password);
          if (loginResult.success) {
            onSuccess?.(loginResult.user, loginResult.token);
            onClose();
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

  return (
    <div className="login-modal-overlay" onClick={(e) => {
      // Don't allow closing by clicking overlay if required
      if (onClose) {
        onClose();
      }
    }}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {onClose && <button className="close-btn" onClick={onClose}>×</button>}
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name (optional)"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name (optional)"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </>
          )}
          <input
            type="text"
            placeholder={isLogin ? "Username" : "Username"}
            value={isLogin ? (formData.username || formData.email) : formData.username}
            onChange={(e) => {
              if (isLogin) {
                setFormData({ ...formData, username: e.target.value, email: e.target.value });
              } else {
                setFormData({ ...formData, username: e.target.value });
              }
            }}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.password_confirm}
              onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
              required
            />
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

