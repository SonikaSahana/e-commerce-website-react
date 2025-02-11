import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./store/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import { auth } from "./store/firebaseonfig"; 


const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken(); 
        login(token); 
        navigate("/products"); 
      } catch (err) {
        setError("Invalid email or password. Please try again.");
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;