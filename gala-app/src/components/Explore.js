import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ExploreEntry from './ExploreEntry';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Explore.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const { Anime } = ReactAnime;

function Explore() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
            <div className="ExploreToolbarLeftArea">
              <input className="ExploreToolbarSearch" placeholder="Search by keyword">
              </input>
              <div className="DatePickerArea">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <div className="DatePickerBetweenText">
                  to
                </div>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
              </div>
            </div>
            <div className="ExploreToolbarRightArea">
              <select name="explore-distance" id="explore-distance" className="ExploreToolbarSelect">
                <option value="none" selected disabled hidden>Distance</option>
                <option value="one_mile">1 mile</option>
                <option value="five_miles">5 miles</option>
                <option value="ten_miles">10 miles</option>
                <option value="fifty_miles">50 miles</option>
              </select>
              <select name="explore-sort" id="explore-sort" className="ExploreToolbarSelect">
                <option value="none" selected disabled hidden>Sort by</option>
                <option value="most_recent">Most recent</option>
                <option value="least_recent">Least recent</option>
                <option value="most_recent">Earliest</option>
                <option value="least_recent">Latest</option>
                <option value="most_recent">Highest $$</option>
                <option value="least_recent">Lowest $$</option>
                <option value="for_you">For you</option>
              </select>
            </div>
          </div>
          <div className="ExploreEntryArea">
            <ExploreEntry />
            <ExploreEntry />
            <ExploreEntry />
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
