import React from 'react';
import '../css/DatesEntry.css';
import testImage from '../assets/kanishka.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

function DatesEntry(props) {
  return (
    <React.Fragment>
      <div className="DatesEntryPaper">
        <div className="ExploreEntryProfileAreaWrapper">
          <div className="ExploreEntryProfileArea">
            <img src={testImage} className="ExploreEntryProfileImage"/>
            <div className="ExploreEntryProfileText">
              Kanishka
            </div>
            <div className="ExploreEntryProfileStars">
              <FaStar fontSize="11px" color="#424242"/>
              <FaStar fontSize="11px" color="#424242"/>
              <FaStarHalfAlt fontSize="11px" color="#424242"/>
              <FaRegStar fontSize="11px" color="#424242"/>
              <FaRegStar fontSize="11px" color="#424242"/>
            </div>
          </div>
        </div>
        <div className="DatesEntryRightArea">
          <div className="DatesEntryDescriptionArea">
            <div className="DatesEntryDescriptionTitle">
              <div className="ExploreEntryDescriptionTitleMain">
                PITBULL CONCERT
              </div>
              <div className="ExploreEntryDescriptionTitleSub">
                Come to the Pitbull concert with me this Saturday at the Moda Center! Tickets and drinks on me.
              </div>
            </div>
            <div className="ExploreEntryDescriptionLogistics">
              <div>$50.00</div>
              <div className="ExploreEntryDot" />
              <div>Portland, OR (5 mi)</div>
              <div className="ExploreEntryDot" />
              <div>01/20/2022</div>
            </div>
          </div>
          <div className="DatesEntryBottomArea">
            <div className="BidsEntryBottomLeftArea">
              <div className="BidsEntryBottomLeftAreaRow">
                <i>Status: </i>
                {props.isUpcoming ?
                  props.isOngoing ?
                    <div className="BidsEntryBottomLeftAreaRowStatus Ongoing">
                      Ongoing.
                    </div>
                    :
                    <div className="BidsEntryBottomLeftAreaRowStatus Confirmed">
                      Confirmed.
                    </div>
                  :
                  <div className="BidsEntryBottomLeftAreaRowStatus Completed">
                    Completed.
                  </div>
                }
              </div>
            </div>
            <div className="BidsEntryBottomRightArea">
              <div className="BidsEntryBottomRightAreaRow">
                {props.isUpcoming ?
                  <div className="BidsEntryBottomRightAreaWidget Confirm">
                    Click for details
                  </div> 
                  :
                  <div />
                }
                <div className="BidsEntryBottomRightAreaWidget Deny">
                  Click to withdraw
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DatesEntry;
