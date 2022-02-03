import React, { useState } from 'react';
import ReactAnime from 'react-animejs'
import Header from './Header';
import '../css/Safety.css';

const { Anime } = ReactAnime;

function Safety() {
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
  var timeline1 = [];
  timeline1.push(
    {
        targets: "#SafetyTitle",
        delay: 10,
        duration: 3000,
        opacity: 100,
        easing: 'easeInOutSine',
    })
  var timeline2 = [];
  timeline2.push(
    {
        targets: "#SafetyPaper",
        delay: 10,
        duration: 4000,
        opacity: 100,
        easing: 'easeInOutSine',
    })

  return (
    <React.Fragment>
      <Header />
      <div className="SafetyAreaWrapper">
        <div className="SafetyArea">
          <div className="SafetyTitle" id="SafetyTitle">
            Safety
          </div>
          <div className="SafetyPaper"  id="SafetyPaper">
            We are extremely committed to the safety of our customers.
            <br /><br />
            Each offer of experience requires a thorough vetting process including a submission of proof.
            <br /><br />
            Gala's platform also uses an escrow service to guarantee that the offerer receives payment upon completion of experience.
            <br /><br />
            Finally, during your meetup, we will send a notification for you to check up on you. If you signal that you are in any danger,
            we will promptly contact emergency services.
            <br /><br />
            TODO: refine this content, make it look better
          </div>
          <Anime initial={timeline1}
              control={control}
              setMeta={setMeta}
              animeConfig={{
                  autoplay: true,
                  duration: 4000,
                  easing: "easeInOutSine"
              }}>
          </Anime>
          <Anime initial={timeline2}
              control={control}
              setMeta={setMeta}
              animeConfig={{
                  autoplay: true,
                  duration: 4000,
                  easing: "easeInOutSine"
              }}>
          </Anime>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Safety;
