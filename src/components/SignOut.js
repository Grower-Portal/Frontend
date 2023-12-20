// SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignOut.css'; // Path to your CSS file

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user authentication data here (e.g., cookies, local storage)
    localStorage.removeItem('userToken'); // Example of removing user token from local storage

    // Redirect to sign-in page
    navigate('/signin');
  };

  return (
    <button className="signout-button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
