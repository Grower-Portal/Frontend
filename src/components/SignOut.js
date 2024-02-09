// SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';  
import '../styles/SignOut.css'; // Path to your CSS file

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user authentication data here (e.g., cookies, local storage)
    logout();

    // Redirect to sign-in page
    navigate('/SignIn');
  };

  return (
    <button className="signout-button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
