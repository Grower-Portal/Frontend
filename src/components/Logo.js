import React from 'react';
import logoPlaceholder from '../icons/LogoSupremeRice.png'; // Import your logo image
import logoPlaceholderSu from '../icons/SubrLogo.png';
import '../styles/Logo.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logoPlaceholder} alt="Logo" className="logo" />
            <img src={logoPlaceholderSu} alt="Logo-su" className="logo" />
        </div>
    );
};

export default Logo;
