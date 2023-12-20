import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

function SignIn() {
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [resetPasswordMessage, setResetPasswordMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;

        if (usernameInput === "Admin" && passwordInput === "Southern_Admin") {
            navigate('/Dashboard');
        } else {
            alert('Invalid username or password. Please try again.');
        }
    }

    const handleResetPassword = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        // Implement password reset functionality here
        // After successful handling, set the reset message
        setResetPasswordMessage('Email containing reset password link has been sent.');
    };

    return (
        <div className="login-container visible" id="loginContainer">
            <h2>
                <span className="grower-portal">G</span>rower
                <span className="rower">Portal</span>
            </h2>
            <form id="login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            {showForgotPasswordForm && 
                 <div id="forgot-password-form">
                 <h2>Forgot Password</h2>
                 <p>Enter your email to reset your password.</p>
                 <form id="reset-password-form" onSubmit={handleResetPassword}>
                     <label htmlFor="email">Email:</label>
                     <input type="email" id="email" name="email" required />
                     <button type="submit">Reset Password</button>
                 </form>
                 {resetPasswordMessage && <p style={{color: 'blue'}}>{resetPasswordMessage}</p>}
             </div>
            }
            <p className="forgot-password" onClick={() => setShowForgotPasswordForm(true)}>Forgot Password?</p>
            <p>Don't have an account? <Link to="/Register">Sign Up</Link></p>
            <div className="powered-by">
                <p>Powered by:</p>
                <div className="logo-container">
                    <div className="logo">Logo 1</div>
                    <div className="logo">Logo 2</div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
