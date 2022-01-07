import React from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import Explore from './Explore';
import '../css/Dashboard2.css';

function Dashboard2() {
  return (
    <React.Fragment>
      <UserHeader />
      <div className="Dashboard2Area">
        <Navigation />
        <Explore />
      </div>
    </React.Fragment>
    
  );
}

export default Dashboard2;
