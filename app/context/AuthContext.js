"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;
    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuth(true);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuth(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
