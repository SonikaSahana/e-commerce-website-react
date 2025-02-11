import React, { useState, useContext } from "react";
import { AuthContext } from "./store/AuthContext";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token, logout } = useContext(AuthContext);

  const handleChangePassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=YOUR_FIREBASE_API_KEY",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token, 
            newPassword: newPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Failed to change password");
      }

      alert("Password changed successfully! Please log in again.");
      logout();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Your User Profile</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <button onClick={handleChangePassword} style={{ padding: "10px 20px", background: "purple", color: "white", border: "none" }}>
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
