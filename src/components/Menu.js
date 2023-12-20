import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

function Menu({ menuOpen, toggleMenu }) {
    return (
        <div id="menu-container" className={menuOpen ? 'open' : ''}>
            <div id="menu-content">
                <h2 style={{ color: '#2E7D32' , fontWeight: 'bold'}}>MENU</h2>
                <ul>
                    <li><Link to="/StepsToFollow" onClick={toggleMenu}>Steps to Follow</Link></li>
                    <li><Link to="/Dashboard" onClick={toggleMenu}>Dashboard</Link></li>
                    <li><Link to="/AddApplication" onClick={toggleMenu}>Add Application</Link></li>
                    <li><Link to="/About" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/ContactUs" onClick={toggleMenu}>Contact Us</Link></li>
                    <li><Link to="/Report" onClick={toggleMenu}>Report</Link></li>
                    <li><Link to="/UserInformation" onClick={toggleMenu}>User Information</Link></li>
                    <li><Link to="/SensorData" onClick={toggleMenu}>Sensor Data</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
