import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import '../css/Navigation.css';

function Navigation(props) {
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
        <div className="OptionsArea">
          {props.selectedOption == "explore" ?
            <div className = "OptionSelected">
              <div className="OptionSelectedSide" />
                <div>
                  EXPLORE
                </div>
                <div className="OptionSelectedSide">
                <FontAwesomeIcon icon={faChevronRight}/>
              </div>
            </div>
            :
            <div className = "Option">
              EXPLORE
          </div>
          }
          {props.selectedOption == "create" ?
            <div className = "OptionSelected">
              <div className="OptionSelectedSide" />
                <div>
                  CREATE
                </div>
                <div className="OptionSelectedSide">
                <FontAwesomeIcon icon={faChevronRight}/>
              </div>
            </div>
            :
            <div className = "Option">
              CREATE
          </div>
          }
          {props.selectedOption == "messages" ?
            <div className = "OptionSelected">
              <div className="OptionSelectedSide" />
                <div>
                  MESSAGES
                </div>
                <div className="OptionSelectedSide">
                <FontAwesomeIcon icon={faChevronRight}/>
              </div>
            </div>
            :
            <div className = "Option">
              MESSAGES
          </div>
          }
          {props.selectedOption == "archive" ?
            <div className = "OptionSelected">
              <div className="OptionSelectedSide" />
                <div>
                  ARCHIVE
                </div>
                <div className="OptionSelectedSide">
                <FontAwesomeIcon icon={faChevronRight}/>
              </div>
            </div>
            :
            <div className = "Option">
              ARCHIVE
          </div>
          }
        </div>
      </div>}
      
    </React.Fragment>
  );
}

export default Navigation;
