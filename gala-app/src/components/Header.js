import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <React.Fragment>
      <div className="Header-Area">
        <div className="Header-Left-Area">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="Gala-Logo">
              Gala
            </div>
          </Link>
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
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <div className="Signup-Button">
              Sign Up
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div className="Login-Button">
              Login
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Header;
