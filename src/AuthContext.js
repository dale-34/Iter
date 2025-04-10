import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

// Create the context
const AuthContext = createContext();

// Create a custom hook for using the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider to manage authentication state globally
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check sessionStorage (or localStorage) for a stored token
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUserProfile({ username: decodedToken.username });
      setUserId({ userId: decodedToken.userId });
    }
  }, []);

  const login = (newToken) => {
    // Set token in both state and sessionStorage
    setToken(newToken);
    sessionStorage.setItem("token", newToken); // Optionally, use localStorage

    const decodedToken = jwtDecode(newToken);
    setUserProfile({ username: decodedToken.username });
    setUserId({ userId: decodedToken.userId });
  };

  const logout = () => {
    setToken(null);
    setUserProfile(null);
    setUserId(null);
    sessionStorage.removeItem("token"); // Optionally, use localStorage
  };

  return (
    <AuthContext.Provider value={{ token, userProfile, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};