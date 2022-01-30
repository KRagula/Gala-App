import React from 'react';
import '../css/BidsEntry.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/claire.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'

function BidsEntry(props) {
  return (
    <React.Fragment>
      {props.isReceived ? 
      // Component for received bids
      <div className="BidsEntryPaper">
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
        <div className="ExploreEntryRightArea">
          <div className="ExploreEntryDescriptionArea">
            <div className="BidsEntryDescriptionTitle">
              <div className="ExploreEntryDescriptionTitleMain">
                PITBULL CONCERT
              </div>
              <div className="BidsEntryDescriptionTitleSub">
                Auction Price: $50.00
              </div>
              <div className="BidsEntryDescriptionTitleSub">
                Highest Bid: <b>$60.00</b>
              </div>
            </div>
          </div>
          <div className="BidsEntryBottomArea">
            <div className="BidsEntryBottomLeftArea">
              <div className="BidsEntryBottomLeftAreaRow">
                <div className="BidsEntryBottomLeftAreaRowChevron">
                  <FontAwesomeIcon icon={faChevronRight}/>
                </div>
                Kanishka's Bid:
                <div className="BidsEntryBottomLeftAreaRowPrice">
                  <b>$55.00</b>
                </div>
              </div>
            </div>
            <div className="BidsEntryBottomRightArea">
              <div className="BidsEntryBottomRightAreaRow">
                <div className="BidsEntryBottomRightAreaWidget Confirm">
                  Click to Confirm
                </div>  
                <div className="BidsEntryBottomRightAreaWidget Deny">
                  Click to Deny
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      // Component for sent bids
      <div className="BidsEntryPaper">
        <div className="ExploreEntryProfileAreaWrapper">
          <div className="ExploreEntryProfileArea">
            <img src={testImage2} className="ExploreEntryProfileImage"/>
            <div className="ExploreEntryProfileText">
              Claire
            </div>
            <div className="ExploreEntryProfileStars">
              <FaStar fontSize="11px" color="#424242"/>
              <FaStar fontSize="11px" color="#424242"/>
              <FaStar fontSize="11px" color="#424242"/>
              <FaStar fontSize="11px" color="#424242"/>
              <FaStarHalfAlt fontSize="11px" color="#424242"/>
            </div>
          </div>
        </div>
        <div className="ExploreEntryRightArea">
          <div className="ExploreEntryDescriptionArea">
            <div className="BidsEntryDescriptionTitle">
              <div className="ExploreEntryDescriptionTitleMain">
                PITBULL CONCERT
              </div>
              <div className="BidsEntryDescriptionTitleSub">
                Auction Price: $50.00
              </div>
              <div className="BidsEntryDescriptionTitleSub">
                Highest Bid: <b>$60.00</b>
              </div>
            </div>
          </div>
          <div className="BidsEntryBottomArea">
            <div className="BidsEntryBottomLeftArea">
              <div className="BidsEntryBottomLeftAreaRow">
                <div className="BidsEntryBottomLeftAreaRowChevron">
                  <FontAwesomeIcon icon={faChevronRight}/>
                </div>
                Kanishka's Bid:
                <div className="BidsEntryBottomLeftAreaRowPrice">
                  <b>$55.00</b>
                </div>
              </div>
            </div>
            <div className="BidsEntryBottomRightArea">
              <div className="BidsEntryBottomRightAreaRow">
                <div className="BidsEntryBottomRightAreaWidget Confirm">
                  Click to Confirm
                </div>  
                <div className="BidsEntryBottomRightAreaWidget Deny">
                  Click to Deny
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
}
    </React.Fragment>
  );
}

export default BidsEntry;
