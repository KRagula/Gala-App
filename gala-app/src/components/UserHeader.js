import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserHeader.css';

function UserHeader() {
  return (
    <React.Fragment>
      <div className="HeaderArea">
        <div className="HeaderLeftArea">
          <div className="GalaLogoArea">
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <div className="GalaLogo">
                Gala
              </div>
            </Link>
          </div>
          <div className="WelcomeAreaWrapper">
            <div className="WelcomeArea">
              Welcome back, Robin
            </div>
          </div>
          
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
