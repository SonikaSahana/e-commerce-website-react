import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  // Function to check if token is expired (5 minutes limit)
  const isTokenExpired = () => {
    const storedToken = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");

    if (!storedToken || !loginTime) {
      return true; // No token, consider it expired
    }

    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - parseInt(loginTime, 10)) / 1000; // Convert ms to seconds

    return elapsedTime > 300; // 300 seconds (5 minutes)
  };

  // Function to logout user
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    navigate("/login");
  };

  // Load token from localStorage on refresh
  useEffect(() => {
    if (isTokenExpired()) {
      logout();
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // Login function - Store token & login timestamp
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("loginTime", new Date().getTime()); // Store current time in milliseconds
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
