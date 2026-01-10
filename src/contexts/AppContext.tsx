/**
 * Application context for global state management
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isAuthenticated: boolean;
  username: string | null;
  setAuth: (username: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('cashbook_auth');
    return !!stored;
  });

  const [username, setUsername] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('cashbook_auth');
      return stored ? JSON.parse(stored).username : null;
    } catch {
      return null;
    }
  });

  const setAuth = (user: string | null) => {
    if (user) {
      localStorage.setItem('cashbook_auth', JSON.stringify({ username: user }));
      setIsAuthenticated(true);
      setUsername(user);
    } else {
      localStorage.removeItem('cashbook_auth');
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, username, setAuth, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

