import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/UserHeader.css';

function UserHeader() {
  return (
    <React.Fragment>
      <div className="HeaderArea">
        <div className="HeaderLeftArea">
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <div className="GalaLogo">
              Gala
            </div>
          </Link> 
        </div>
        <div className="HeaderRightArea">
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div className="ProfileButton">
              Profile
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="SignoutButton">
              Sign Out
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default UserHeader;
