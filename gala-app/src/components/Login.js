import React from 'react';
import Header from './Header';
import '../css/Login.css';


function Login() {
  return (
    <React.Fragment>
      <Header />
      <div class="Login-Form-Area">
        <div>
          <div class="Login-Title-Area">
            <div class="Login-Title">
              Welcome back.
            </div>
          </div>
          <div class="Input-Area">
            <div class="Input-Title">
              Email Address
            </div>
            <input type="text" class="Input" required placeholder="robin@gmail.com" />
          </div>
          <div class="Input-Area">
            <div class="Input-Title">
              Password
            </div>
            <input type="text" class="Input" required placeholder="Password" />
          </div>
          <div class="Submit-Login-Button">
            Log In
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
