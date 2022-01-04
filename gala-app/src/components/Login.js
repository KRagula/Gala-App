import React from 'react';
import Header from './Header';
import '../css/Login.css';

function Login() {
  return (
    <React.Fragment>
      <Header />
      <div class="LoginFormArea">
        <div>
          <div class="LoginTitleArea">
            <div class="LoginTitle">
              Welcome back.
            </div>
          </div>
          <div class="LoginInputArea">
            <div class="LoginInputTitle">
              Email Address
            </div>
            <input type="text" class="LoginInput" required placeholder="robin@gmail.com" />
          </div>
          <div class="LoginInputArea">
            <div class="LoginInputTitle">
              Password
            </div>
            <input type="text" class="LoginInput" required placeholder="Password" />
          </div>
          <div class="LoginSubmitButton">
            Log In
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
