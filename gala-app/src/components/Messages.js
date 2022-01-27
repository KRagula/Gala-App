import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import MessagesEntry from './MessagesEntry';
import ReactAnime from 'react-animejs';
import '../css/Messages.css';

const { Anime } = ReactAnime;

function Messages() {
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
        <Navigation selectedOption="messages"/>
        <div className="MessagesArea">
          <div className="DashboardTitleDescriptionAreaWrapper">
            <div className="DashboardTitleDescriptionArea"
                 id="DashboardTitleDescriptionArea">
              <div className="DashboardTitleText">
                Messages
              </div>
              <div className="DashboardTitleDot"/>
              <div className="DashboardDescriptionText">
                Chat with a friend to confirm a date
              </div>
            </div>
          </div>
          {/* Re-using explore's toolbar */}
          <div className="ExploreToolbarArea">
            <div className="ExploreToolbarLeftArea">
              <input className="ExploreToolbarSearch" placeholder="Search by keyword">
              </input>
              <select name="explore-sort" id="explore-sort" className="ExploreToolbarSelect">
                <option value="none" selected disabled hidden>Sort by</option>
                <option value="most_recent">Unread first</option>
                <option value="least_recent">Read first</option>
                <option value="most_recent">Earliest message</option>
                <option value="least_recent">Latest message</option>
                <option value="most_recent">Earliest date</option>
                <option value="least_recent">Latest date</option>
              </select>
            </div>
          </div>
          <div className="MessagesEntryArea">
            <MessagesEntry />
            <MessagesEntry />
            <MessagesEntry />
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

export default Messages;
