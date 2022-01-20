import React, { useState } from "react";
import ReactAnime from 'react-animejs'
import Header from '../components/Header';
import axios from 'axios'
import '../css/Signup.css';

const { Anime } = ReactAnime;

function Signup() {
  var state = {
      firstName:'',
      lastName:'',
      email:'',
      password:''
  }
  function onSubmit(event){
    event.preventDefault()
    const registered = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password
    }
    var isError = false;
    axios.post('http://localhost:4000/app/signup', registered)
        .then(function(response) {
          if (response.data=="valid") {
            window.location = '/explore'
          }
        })
        .catch(function (error) {
          isError=true;
          if (error.response.status == "409") {
            document.getElementById("errorArea").innerHTML = "Error User Exists";
          } else {
            document.getElementById("errorArea").innerHTML = "Service Unavailable, please try again later";
          }
          
          
          console.log(error.response.status);
        })
    if (!isError) {
      //window.location = '/explore'
    }
    
  }

  function changeFirstName(event){
      state.firstName = event.target.value
  }

  function changeLastName(event){
      state.lastName=event.target.value

  }

  function changeEmail(event){
    state.email=event.target.value
  }

  function changePassword(event){
    state.password=event.target.value
  }

  const [selectedImage, setSelectedImage] = useState(null);

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
        targets: "#SignupFormArea",
        delay: 10,
        duration: 3000,
        opacity: 100,
        easing: 'easeInOutSine',
    })

  return (
    <React.Fragment>
      <Header />
      <div class="SignupFormArea" id="SignupFormArea">
        <div>
          <div class="SignupTitleArea">
            <div class="SignupTitle" id="titleHeader">
              Enter Gala.
            </div>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle" style={{color: "red", align:"center"}} id="errorArea">
              
            </div>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              First Name
            </div>
            <input type="text" class="SignupInput" required placeholder="First Name" id="firstNameInput" onChange={changeFirstName}/>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Last Name
            </div>
            <input type="text" class="SignupInput" required placeholder="Last Name" id="lastNameInput" onChange={changeLastName}/>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Email Address
            </div>
            <input type="text" class="SignupInput" required placeholder="email@email.com" id="emailInput" onChange={changeEmail}/>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Password
            </div>
            <input type="password" class="SignupInput" required placeholder="Password" id="passwordInput" onChange={changePassword}/>
          </div>
          <div class="SignupInputArea">
            <div class="SignupInputTitle">
              Profile Picture
            </div>
            <input type="file" class="SignupInput" required onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }} />
            {selectedImage && (
              <img className="SignupProfilePicture"
                alt="No Image Found"
                src={URL.createObjectURL(selectedImage)}
              />
            )}
          </div>
          <div class="SignupSubmitButton" onClick={onSubmit} >
            Sign Up
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



export default Signup;
