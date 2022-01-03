import React from 'react';
import Header from '../components/Header';
import '../css/Signup.css';


function Signup() {
  return (
    <React.Fragment>
      <Header />
      <div class="SignupFormArea">
        <div>
          <div class="SignupTitleArea">
            <div class="SignupTitle">
              Enter Gala.
            </div>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              First Name
            </div>
            <input type="text" class="SignupInput" required placeholder="Robin" />
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Last Name
            </div>
            <input type="text" class="SignupInput" required placeholder="Tan" />
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Email Address
            </div>
            <input type="text" class="SignupInput" required placeholder="robin@gmail.com" />
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Password
            </div>
            <input type="text" class="SignupInput" required placeholder="Password" />
          </div>
          <div class="SignupSubmitButton">
            Sign Up
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
