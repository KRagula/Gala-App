import React from 'react';
import '../css/BidsEntry.css';
import testImage from '../assets/kanishka.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

function BidsEntry() {
  return (
    <React.Fragment>
      <div className="ExploreEntryPaper">
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
            <div className="ExploreEntryDescriptionTitle">
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
            <div className="ExploreEntryDescriptionBottomArea">
              <div className="ExploreEntryDescriptionTagWrapper">
                <div className="ExploreEntryDescriptionTagTitle">
                  Tags:
                </div>
                <div className="ExploreEntryDescriptionTagArea">
                  <div className="ExploreEntryTag">concert</div>
                  <div className="ExploreEntryTag">fun</div>
                  <div className="ExploreEntryTag">music</div> 
                  <div className="ExploreEntryTag">food</div>
                  <div className="ExploreEntryTag">dancing</div>
                  <div className="ExploreEntryTag">disco</div> 
                </div>
              </div>
            </div>
          </div>
          <div className="ExploreEntrySeeMoreArea">
            <div className="ExploreEntrySeeMore">
              Click to see more
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BidsEntry;
