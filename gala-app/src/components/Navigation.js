import React from 'react';
import '../css/Navigation.css';

function Navigation() {
  var shouldCollapse = false;
  return (
    <React.Fragment>
      {shouldCollapse ? <div className="NavigationAreaCollapsed">
        navigation
      </div> : <div className="NavigationArea">
        navigation
      </div>}
      
    </React.Fragment>
  );
}

export default Navigation;
