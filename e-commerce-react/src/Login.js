import React, { useState, useContext } from "react";
import { AuthContext } from "./store/AuthContext";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); 

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_FIREBASE_API_KEY"; 

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Authentication failed");
      }

      console.log("Token:", data.idToken);
      login(data.idToken); 

      alert("Login successful!");
    } catch (err) {
      setError("Authentication Failed! Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <input type="email" placeholder="Enter Email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter Password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>{loading ? <div className="loader"></div> : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
