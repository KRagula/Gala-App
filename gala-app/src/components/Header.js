import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <React.Fragment>
      <div className="HeaderArea">
        <div className="HeaderLeftArea">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="GalaLogo">
              Gala
            </div>
          </Link>
          <div className="HeaderLeftWidget">
            Safety
          </div>
          <div className="HeaderLeftWidget">
            About
          </div>
          <div className="HeaderLeftWidget">
            Contact
          </div>
        </div>
        <div className="HeaderRightArea">
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <div className="SignupButton">
              Sign Up
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div className="LoginButton">
              Login
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Header;
