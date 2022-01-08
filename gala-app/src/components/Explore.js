import React from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import '../css/Explore.css';

function Explore() {
  return (
    <React.Fragment>
      <UserHeader />
      <div className="DashboardArea">
        <Navigation selectedOption="explore"/>
        <div className="ExploreArea">
          explore stuff
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Explore;
