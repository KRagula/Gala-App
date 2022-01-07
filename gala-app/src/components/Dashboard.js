import React from 'react';
import UserHeader from './UserHeader';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <React.Fragment>
      <UserHeader />
      <div className="DashboardAreaWrapper">
        <div className="DashboardArea">
          <div className="DashboardRow">
            <div className="DashboardPanel">
              <div className="DashboardPanelTextArea">
                <div className="DashboardPanelMainText">
                  Explore
                </div>
                <div className="DashboardPanelSubText">
                  Find potential dates in your area.
                </div>
              </div>
            </div>
            <div className="DashboardPanel">
              <div className="DashboardPanelTextArea">
                <div className="DashboardPanelMainText">
                  Create
                </div>
                <div className="DashboardPanelSubText">
                  Propose a date and meet new friends.
                </div>
              </div>
            </div>
          </div>
          <div className="DashboardRow">
            <div className="DashboardPanel">
              <div className="DashboardPanelTextArea">
                <div className="DashboardPanelMainText">
                  Archive
                </div>
                <div className="DashboardPanelSubText">
                  See your dates, past and present.
                </div>
              </div>
            </div>
            <div className="DashboardPanel">
              <div className="DashboardPanelTextArea">
                <div className="DashboardPanelMainText">
                  Message
                </div>
                <div className="DashboardPanelSubText">
                  View new messages to confirm a date.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    
  );
}

export default Dashboard;
