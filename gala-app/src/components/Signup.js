import React from 'react';
import Header from '../components/Header';
import '../css/Signup.css';


function Signup() {
  return (
    <React.Fragment>
      <Header />
      <div class="Signup-Form-Area">
        <div>
          <div class="Signup-Title-Area">
            <div class="Signup-Title">
              Welcome to Gala.
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
          <div class="Submit-Button">
            Enter Gala
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
