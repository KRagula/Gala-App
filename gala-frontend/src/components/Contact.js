import React, { useState } from 'react';
import ReactAnime from 'react-animejs'
import Header from './Header';
import '../css/Contact.css';

const { Anime } = ReactAnime;

function Contact() {
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
        targets: "#ContactTitle",
        delay: 10,
        duration: 3000,
        opacity: 100,
        easing: 'easeInOutSine',
    })
  var timeline2 = [];
  timeline2.push(
    {
        targets: "#ContactPaper",
        delay: 10,
        duration: 4000,
        opacity: 100,
        easing: 'easeInOutSine',
    })

  return (
    <React.Fragment>
      <Header />
      <div className="ContactAreaWrapper">
        <div className="ContactArea">
          <div className="ContactTitle" id="ContactTitle">
            Contact
          </div>
          <div className="ContactPaper"  id="ContactPaper">
            Questions or concerns? Contact us at support@gala.com.
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

export default Contact;
