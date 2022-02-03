import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Message.css';

const { Anime } = ReactAnime;

function Message() {
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
        targets: "#DashboardTitleDescriptionArea",
        delay: 0,
        duration: 800,
        opacity: 100,
        easing: "easeInOutExpo",
    })

  return (
    <React.Fragment>
      <UserHeader />
      <div className="DashboardArea">
        <Navigation />
        <div className="MessageArea">
          TODO: EDDIE TO USE SENDBIRD
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

export default Message;
