import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a custom hook for using the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider to manage authentication state globally
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check sessionStorage (or localStorage) for a stored token
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    // Set token in both state and sessionStorage (or localStorage)
    setToken(newToken);
    sessionStorage.setItem("token", newToken); // Optionally, use localStorage
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token"); // Optionally, use localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};