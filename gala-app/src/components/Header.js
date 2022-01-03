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
          <div className="Header-Left-Widget">
            Safety
          </div>
          <div className="Header-Left-Widget">
            About
          </div>
          <div className="Header-Left-Widget">
            Contact
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
