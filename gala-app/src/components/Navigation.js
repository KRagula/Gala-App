import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../css/Navigation.css';

function Navigation() {
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const handleClick = () => {
    setShouldCollapse(!shouldCollapse);
}
  return (
    <React.Fragment>
      {shouldCollapse ? <div className="NavigationAreaCollapsed">
        <div className="CollapseArea Expand">
          <div className="CollapseBox Expand" onClick={handleClick}>
            <div className="CollapseArrow">
              <div>
                <FontAwesomeIcon icon={faArrowRight}/>
              </div>
            </div>
          </div>
        </div>
      </div> : <div className="NavigationArea">
        <div className="CollapseArea">
          <div className="CollapseBox" onClick={handleClick}>
            <div className="CollapseArrow">
              <div>
                <FontAwesomeIcon icon={faArrowLeft}/>
              </div>
            </div>
          </div>
        </div>
      </div>}
      
    </React.Fragment>
  );
}

export default Navigation;
