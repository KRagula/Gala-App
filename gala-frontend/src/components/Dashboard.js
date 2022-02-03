import React from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <React.Fragment>
      <UserHeader />
      <div className="DashboardArea">
        <Navigation />
        <div className="ExploreArea">
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Dashboard;
