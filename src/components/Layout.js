// Layout.js
import React, { useState } from 'react';
import Menu from '../components/Menu';
import '../styles/Menu.css';
import SignOut from './SignOut';
import Logo from './Logo';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    {/* SignOut button will be fixed to the top-right of the viewport */}
      <Logo />
      <SignOut />
      {/* Other layout content, like a navigation menu, goes here */}
      <div id="menu-button" className={menuOpen ? 'open' : ''} onClick={toggleMenu}>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>

      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;
