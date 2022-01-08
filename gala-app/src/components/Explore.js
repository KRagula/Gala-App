import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Explore.css';

const { Anime } = ReactAnime;

function Explore() {
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
        <Navigation selectedOption="explore"/>
        <div className="ExploreArea">
          <div className="DashboardTitleDescriptionAreaWrapper">
            <div className="DashboardTitleDescriptionArea"
                 id="DashboardTitleDescriptionArea">
              <div className="DashboardTitleText">
                Explore
              </div>
              <div className="DashboardTitleDot"/>
              <div className="DashboardDescriptionText">
                Find potential dates in your area
              </div>
            </div>
          </div>
          <div className="ExploreToolbarArea">
            hi
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

export default Explore;
