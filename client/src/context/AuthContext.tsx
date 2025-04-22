import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: () => {},
});

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate auth check on initial load
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setIsLoading(false);
      // Default to authenticated in development mode
      setIsAuthenticated(true);
    }, 1000);

    return () => clearTimeout(checkAuth);
  }, []);

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 