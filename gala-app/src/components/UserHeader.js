import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserHeader.css';

function UserHeader() {
  function setHeaderValue(){
    const firstname = document.cookie.split('; ').find(row => row.startsWith('firstname=')).split('=')[1];
    console.log("Test if Runs")
    document.getElementById("nameWelcome").innerHTML = ('Welcome back, ' + firstname)
  }
  return (
    <React.Fragment>
      <div className="HeaderArea" >
        <div className="HeaderLeftArea">
          <div className="GalaLogoArea">
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <div className="GalaLogo" onLoad={setHeaderValue}>
                Gala
              </div>
            </Link>
          </div>
          <div className="WelcomeAreaWrapper">
            <div className="WelcomeArea" id="nameWelcome">
              Welcome back, Robin2
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
