import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate(); 

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); 
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
