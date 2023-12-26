import React from 'react';
import logoPlaceholder from '../icons/LogoSupremeRice.png'; // Import your logo image
import '../styles/Logo.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logoPlaceholder} alt="Logo" className="logo" />
        </div>
    );
};

export default Logo;
