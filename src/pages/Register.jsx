import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(''); 

    const verifyEmail = () => {
        // Placeholder for email verification logic
        alert('Email verification logic goes here.');
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form>
            <label htmlFor="first-name">First Name:</label>
                <input 
                    type="text" 
                    id="first-name" 
                    value={firstname} 
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                />
                <label htmlFor="last-name">Last Name:</label>
                <input 
                    type="text" 
                    id="last-name" 
                    value={lastname} 
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                />
                <label htmlFor="dob">Date of Birth:</label>
                <input 
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required 
                />
                <label htmlFor="create-username">Create Username:</label>
                <input 
                    type="text" 
                    id="create-username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />

                <label htmlFor="create-password">Create Password:</label>
                <input 
                    type="password" 
                    id="create-password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <label htmlFor="confirm-password">Confirm Password:</label>
                <input 
                    type="password" 
                    id="confirm-password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                />

                <label htmlFor="enter-email">Enter Email:</label>
                <input 
                    type="email" 
                    id="enter-email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <label htmlFor="address">Address:</label>
                <input 
                    type="text" 
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required 
                />

                <button type="button" onClick={verifyEmail}>Verify Email</button>
                <button type="button" onClick={verifyEmail}>Sign Up</button>
            </form>
            <Link to="/SignIn" className="back-to-login">Back to Login</Link>
        </div>
    );
}

export default Register;
