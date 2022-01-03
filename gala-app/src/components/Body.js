import React, { useRef, useState, useEffect } from 'react';
import '../css/Body.css';
import ReactAnime from 'react-animejs'
import anime from 'animejs/lib/anime.es.js'

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
          targets: "#Body-Main-Text",
          delay: 0,
          duration: 1000,
          opacity: 100,
          easing: 'easeInOutExpo',
      })
  timeline.push(
      {
          targets: "#Create-Account-Button",
          delay: 0,
          duration: 3000,
          opacity: 100,
          easing: 'easeInOutSine',
      })

  const LOOP_ITERATIONS = 10;
  const NUM_SUBTEXTS = 3;
  for (var i = 0; i < LOOP_ITERATIONS; i++) {
    for (var j = 1; j <= NUM_SUBTEXTS; j++) {
      timeline.push(
        {
            targets: "#Body-Subtext-" + j,
            delay: 0,
            duration: 2000,
            opacity: 100,
            easing: 'easeInOutSine',
            loop: true,
        })
      timeline.push(
        {
            targets: "#Body-Subtext-" + j,
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
      <div className="Body-Main-Text" id="Body-Main-Text">
        Dive In
      </div>
      <div className="Body-Subtext" id="Body-Subtext-1">
        Meet a celebrity
      </div>
      <div className="Body-Subtext" id="Body-Subtext-2">
        Skydive with a new friend
      </div>
      <div className="Body-Subtext" id="Body-Subtext-3">
        Attend a concert
      </div>
      <div className="Create-Account-Button" id="Create-Account-Button">
        Create Account
      </div>
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
