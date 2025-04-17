import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => 
    JSON.parse(localStorage.getItem('user'))
  );

  useEffect(() => {
    const stored = localStorage.getItem('authToken');
    if (stored) {
      setUser({ token: stored });
    }
  }, []);

  const login = (email, password) => {
    const token = `fakeToken-${Date.now()}`;
    localStorage.setItem('authToken', token);
    setUser({ email, token });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
