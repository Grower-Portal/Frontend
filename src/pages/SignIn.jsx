import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';
import growerPortalLogo from '../icons/grower-portal.png';
import logoPlaceholder from '../icons/LogoSupremeRice.png';
import logoPlaceholderSu from '../icons/SubrLogo.png';


function SignIn() {
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [resetPasswordMessage, setResetPasswordMessage] = useState('');
    const [otpVerificationSuccess, setOtpVerificationSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Your login logic here
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;
    
        axios.post(`http://localhost:8080/api/auth/login?username=${usernameInput}&password=${passwordInput}`)
            .then((response) => {
                    // Check if both farmer and jwt exist in the response
                if (response.data.farmer && response.data.jwt) {
                    // Authentication was successful
                    // Store the JWT token securely (e.g., in localStorage)
                    const { farmer_ID, firstName, lastName, email, address, phone, dob } = response.data.farmer;
      
                    // Store user information in localStorage
                    localStorage.setItem('farmerId', farmer_ID);
                    localStorage.setItem('firstName', firstName);
                    localStorage.setItem('lastName', lastName);
                    localStorage.setItem('email', email);
                    localStorage.setItem('address', address);
                    localStorage.setItem('phone', phone);
                    localStorage.setItem('dob', dob);
                    localStorage.setItem('token', response.data.jwt);

                    // Redirect the user to the desired page
                    navigate(`/ApplicationDashboard?farmer_id=${response.data.farmer.farmer_ID}`);
                } else {
                    // Authentication failed, handle accordingly
                    alert('Invalid username or password. Please try again.');
                }
            })
            .catch((error) => {
                // Handle network errors or server issues
                console.error('An error occurred during login:', error);
                alert('An error occurred during login. Please try again later.');
            });
    }

    // const handleLogin = () => {
    //     // Your login logic here
    //     let usernameInput = document.getElementById("username").value;
    //     let passwordInput = document.getElementById("password").value;

    //     const credentials = {
    //         username: usernameInput,
    //         password: passwordInput,
    //     };

    //     axios.post('http://grower-portal-412701.uc.r.appspot.com/api/auth/login', credentials)
    //         .then((response) => {
    //             // Handle the response, which may include a JWT token
    //             // If authentication is successful, you can store the token securely
    //             // Redirect the user to the desired page
    //             navigate('/Application+Dashboard');
    //         })
    //         .catch((error) => {
    //             // Handle authentication error (e.g., invalid credentials)
    //             alert('Invalid username or password. Please try again.');
    //         });
    // }

    
    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;

    axios.post(`http://localhost:8080/auth/request-password-reset?email=${email}`)
        .then((response) => {
            // Implement password reset functionality here
            // After successful handling, set the reset message
            setResetPasswordMessage('Email containing OTP has been sent. Please check your inbox or junk/spam folder and enter the OTP in the area below');
            // setShowNewPasswordForm(false); // Hide the new password form
            setOtpVerificationSuccess(true);
        })
        .catch((error) => {
            // Handle request error
            console.error('An error occurred during password reset request:', error);
            alert('An error occurred during password reset request. Please try again later.');
        });
    };

    const handlePasswordReset = () => {
        const otp = document.getElementById("otp").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmNewPassword").value;

        const userData = { newPassword, confirmPassword};
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Make a POST request to reset the password
        axios.post(`http://localhost:8080/auth/reset-password?otp=${otp}`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*',
            },
        })
        .then((response) => {
            // Handle password reset success
            setVerificationMessage('OTP verified successfully!');
            alert('Password reset successful.');
            navigate('/SignIn'); // Navigate to the login page
            window.location.reload(); // Refresh the page
        })
        .catch((error) => {
            // Handle password reset failure
            console.error('An error occurred during password reset:', error);
            alert('An error occurred during password reset. Please try again.');
        });
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
            {otpVerificationSuccess && (
                <div id="otp-verification-form">
                    <h2>OTP Verification</h2>
                    <p>Enter the OTP sent to your email.</p>
                    <form id="verify-otp-form">
                        {/* OTP input field */}
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <input type="password" id = "newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <input type="password" id = "confirmNewPassword" placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                        <button type="button" onClick={handlePasswordReset}>Reset Password</button>
                    </form>
                    {/* Message after OTP verification */}
                    {verificationMessage && <p style={{ color: 'green' }}>{verificationMessage}</p>}
                </div>
            )}
            <p className="forgot-password" onClick={() => setShowForgotPasswordForm(true)}>
                {showForgotPasswordForm || otpVerificationSuccess ? '' : 'Forgot Password?'}
            </p>
            {/* <p>Don't have an account? <Link to="/Register">Sign Up</Link></p> */}
            <div className="powered-by">
                <p>Powered by:</p>
                <div className="logo-container-log">
                    <div className="logo">
                        <img src={logoPlaceholderSu} alt="Logo-su" className="logo" />
                    </div>
                    <div className="logo">
                        <img src={logoPlaceholder} alt="Logo" className="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
