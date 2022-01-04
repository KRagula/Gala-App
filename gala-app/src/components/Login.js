import React, { useState } from 'react';
import ReactAnime from 'react-animejs'
import Header from './Header';
import '../css/Login.css';

const { Anime } = ReactAnime;

function Login() {
    // controller state
    const [control, setControl] = useState(null);

    // meta state
    const [meta, setMeta] = useState({
        control: control,
        progress: 100,
        currentTime: 0,
        duration: 0
    });
  
    // timeline
    var timeline = [];
    timeline.push(
      {
          targets: "#LoginFormArea",
          delay: 10,
          duration: 3000,
          opacity: 100,
          easing: 'easeInOutSine',
      })

  return (
    <React.Fragment>
      <Header />
      <div class="LoginFormArea" id="LoginFormArea">
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
      <Anime initial={timeline}
              control={control}
              setMeta={setMeta}
              animeConfig={{
                  autoplay: true,
                  duration: 4000,
                  easing: "easeInOutSine"
              }}>
        </Anime>
    </React.Fragment>
  );
}

export default Login;
