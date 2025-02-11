import React, { useContext } from "react";
import { AuthContext } from "./store/AuthContext";

const Profile = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h2>Welcome to Your Profile</h2>
      <p>Your authentication token:</p>
      <code>{token}</code>
    </div>
  );
};

export default Profile;
