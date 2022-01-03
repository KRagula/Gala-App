import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactAnime from 'react-animejs'
import '../css/Body.css';

const { Anime } = ReactAnime;

function Body() {
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
          targets: "#BodyMainText",
          delay: 0,
          duration: 2000,
          opacity: 100,
          easing: 'easeInOutExpo',
      })
  timeline.push(
      {
          targets: "#CreateAccountButton",
          delay: 0,
          duration: 2000,
          opacity: 100,
          easing: 'easeInOutExpo',
      })

  const LOOP_ITERATIONS = 10;
  const NUM_SUBTEXTS = 3;
  for (var i = 0; i < LOOP_ITERATIONS; i++) {
    for (var j = 1; j <= NUM_SUBTEXTS; j++) {
      timeline.push(
        {
            targets: "#BodySubtext-" + j,
            delay: 0,
            duration: 2000,
            opacity: 100,
            easing: 'easeInOutSine',
            loop: true,
        })
      timeline.push(
        {
            targets: "#BodySubtext-" + j,
            delay: 0,
            duration: 1000,
            opacity: 0,
            easing: 'easeInOutSine',
            loop: true,
        })
    }
  }
  

  return (
    <React.Fragment>
      <div className="BodyMainText" id="BodyMainText">
        Your invitation is here
      </div>
      <div className="BodySubtext" id="BodySubtext-1">
        Meet a celebrity
      </div>
      <div className="BodySubtext" id="BodySubtext-2">
        Skydive with a new friend
      </div>
      <div className="BodySubtext" id="BodySubtext-3">
        Attend a concert
      </div>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <div className="CreateAccountButton" id="CreateAccountButton">
          Create Account
        </div>
      </Link>
      <Anime initial={timeline}
             control={control}
             setMeta={setMeta}
             animeConfig={{
                autoplay: true,
                duration: 1500,
                easing: "easeInOutSine"
             }}>
        </Anime>
    </React.Fragment>
    
  );
}

export default Body;
