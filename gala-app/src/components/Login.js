import React, { useState } from 'react';
import ReactAnime from 'react-animejs'
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios'
import '../css/Login.css';

const { Anime } = ReactAnime;

function Login() {

    var state = {
        email:'',
        password:''
    }

    function onSubmit(event){
      event.preventDefault()
      const credentials = {
          email: state.email,
          password: state.password
      }
      axios.post('http://localhost:4000/app/login', credentials)
          .then(function(response) {
            if (response.data=="valid") {
              window.location = '/explore'
            }
          })
          .catch(function (error) {
            if (error.response.status == "409") {
              document.getElementById("errorArea").innerHTML = "Incorrect Password or User Doesn't Exist";
            } else {
              document.getElementById("errorArea").innerHTML = "Incorrect Password or User Doesn't Exist";
            }
            
            
            console.log(error.response.status);
          })
      
    }

    function changeEmail(event){
      state.email=event.target.value
    }
  
    function changePassword(event){
      state.password=event.target.value
    }

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
            <div class="LoginInputTitle" style={{color: "red", align:"center"}} id="errorArea">
            </div>
          </div>
          <div class="LoginInputArea">
            <div class="LoginInputTitle">
              Email Address
            </div>
            <input type="text" class="LoginInput" required placeholder="email@email.com" onChange={changeEmail}/>
          </div>
          <div class="LoginInputArea">
            <div class="LoginInputTitle">
              Password
            </div>
            <input type="password" class="LoginInput" required placeholder="Password" onChange={changePassword}/>
          </div>
          <div class="LoginSubmitButton" onClick={onSubmit}>
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
