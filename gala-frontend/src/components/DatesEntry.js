import React from 'react';
import '../css/DatesEntry.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

function DatesEntry(props) {
  return (
    <React.Fragment>
      <div className="DatesEntryPaper">
        <div className="ExploreEntryProfileAreaWrapper">
          <div className="ExploreEntryProfileArea">
            <img src={testImage2} className="ExploreEntryProfileImage"/>
            <div className="ExploreEntryProfileText">
              Eddie
            </div>
            <div className="ExploreEntryProfileStars">
              <FaStar fontSize="11px" color="#424242"/>
              <FaStarHalfAlt fontSize="11px" color="#424242"/>
              <FaRegStar fontSize="11px" color="#424242"/>
              <FaRegStar fontSize="11px" color="#424242"/>
              <FaRegStar fontSize="11px" color="#424242"/>
            </div>
          </div>
        </div>
        <div className="DatesEntryRightArea">
          <div className="DatesEntryDescriptionArea">
            <div className="DatesEntryDescriptionTitle">
              <div className="ExploreEntryDescriptionTitleMain">
                TENNIS LESSONS
              </div>
              <div className="ExploreEntryDescriptionTitleSub">
                You bring the balls, I bring the racket.
              </div>
            </div>
            <div className="ExploreEntryDescriptionLogistics">
              <div>$20.00</div>
              <div className="ExploreEntryDot" />
              <div>Philadelpia, PA (1 mi)</div>
              <div className="ExploreEntryDot" />
              <div>02/15/2022</div>
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
                <div className="BidsEntryBottomRightAreaWidget Confirm">
                  Click for details
                </div> 
                {props.isUpcoming ?
                  <div className="BidsEntryBottomRightAreaWidget Deny">
                    Click to withdraw
                  </div>  
                  :
                  <div />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DatesEntry;
