import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <React.Fragment>
      <div className="Header-Area">
        <div className="Header-Left-Area">
        <div className="Gala-Logo">
            Gala
          </div>
        </div>
        <div className="Header-Right-Area">
          <div className="Signup-Button">
            Sign Up
          </div>
          <div className="Login-Button">
            Login
          </div>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Header;
