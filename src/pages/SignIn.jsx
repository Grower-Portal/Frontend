import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';
import growerPortalLogo from '../icons/grower-portal.png';


function SignIn() {
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [resetPasswordMessage, setResetPasswordMessage] = useState('');
    const [otpVerificationSuccess, setOtpVerificationSuccess] = useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Your login logic here
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;

        const credentials = {
            username: usernameInput,
            password: passwordInput,
        };

        axios.post('http://localhost:8080/api/auth/login', credentials)
            .then((response) => {
                // Handle the response, which may include a JWT token
                // If authentication is successful, you can store the token securely
                // Redirect the user to the desired page
                navigate('/Application+Dashboard');
            })
            .catch((error) => {
                // Handle authentication error (e.g., invalid credentials)
                alert('Invalid username or password. Please try again.');
            });
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Implement password reset functionality here
        // After successful handling, set the reset message
        setResetPasswordMessage('Email containing OTP has been sent. Please check your inbox or junk/spam folder and enter the OTP in the area below');
        setShowNewPasswordForm(false); // Hide the new password form
        setOtpVerificationSuccess(true);
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        // Implement OTP verification logic here
        // Check if OTP is valid
        const isOtpValid = true; // Replace with your OTP verification logic
        if (isOtpValid) {
            setVerificationMessage('OTP verified successfully!');
            setShowForgotPasswordForm(false); // Hide the forgot password form
            setShowNewPasswordForm(true); // Show New Password form
        } else {
            // Handle incorrect OTP
            // Display an error message or take appropriate action
            setVerificationMessage('OTP verification failed. Please try again.');
        }
    }

    const handlePasswordReset = () => {
        // Implement password reset logic here
        // Update the password for the user
        // After successful password reset, navigate the user to the login page or another appropriate page
        alert('Password reset successful.');
        navigate('/SignIn'); // Example: Navigate to the login page
        window.location.reload();
    }

    return (
        <div className="login-container visible" id="loginContainer">
            <img
                src={growerPortalLogo} // Use the imported logo variable here
                alt="Grower Portal Logo"
                aria-label="grower-portal-logo"
                style={{ width: '135px', height: '39px' }}
            />
        
            {!showForgotPasswordForm && !otpVerificationSuccess && (
                <form id="login-form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
            )}
            {showForgotPasswordForm && !otpVerificationSuccess && (
                <div id="forgot-password-form">
                    <h2>Forgot Password</h2>
                    <p>Enter your email to reset your password.</p>
                    <form id="reset-password-form" onSubmit={handleResetPassword}>
                        {/* Email input field */}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        <button type="submit">Send OTP</button>
                    </form>
                    {resetPasswordMessage && <p style={{ color: 'blue' }}>{resetPasswordMessage}</p>}
                </div>
            )}
            {otpVerificationSuccess && !showNewPasswordForm && (
                <div id="otp-verification-form">
                    <h2>OTP Verification</h2>
                    <p>Enter the OTP sent to your email.</p>
                    <form id="verify-otp-form" onSubmit={handleOtpVerification}>
                        {/* OTP input field */}
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <button type="submit">Verify OTP</button>
                    </form>
                    {/* Message after OTP verification */}
                    {verificationMessage && <p style={{ color: 'green' }}>{verificationMessage}</p>}
                </div>
            )}
            {showNewPasswordForm && (
                <div id="new-password-form">
                    <h2>Reset Password</h2>
                    <p>Enter your new password.</p>
                    <form id="reset-new-password-form">
                        {/* New password and confirm password input fields */}
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                        <button type="button" onClick={handlePasswordReset}>Reset Password</button>
                    </form>
                </div>
            )}
            <p className="forgot-password" onClick={() => setShowForgotPasswordForm(true)}>
                {showForgotPasswordForm || otpVerificationSuccess ? '' : 'Forgot Password?'}
            </p>
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
