/**
 * Login component
 */

import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const { setAuth } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    // Simple authentication (can be enhanced with backend)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setAuth(username);
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border border-blue-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl mb-4 shadow-lg">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Cashbook App
          </h1>
          <p className="text-blue-600 font-medium text-sm sm:text-base">Sign in to manage your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            autoFocus
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full touch-manipulation"
          >
            Sign In
          </Button>

          <div className="text-center text-xs sm:text-sm text-slate-500 mt-4">
            <p>Default credentials: <span className="font-medium">admin</span> / <span className="font-medium">admin123</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

