import React from 'react';
import '../css/ExploreEntry.css';
import defaultImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

function ExploreEntry() {
  return (
    <React.Fragment>
      <div className="ExploreEntryPaper">
        <div className="ExploreEntryProfileAreaWrapper">
          <div className="ExploreEntryProfileArea">
            <img src={defaultImage} className="ExploreEntryProfileImage"/>
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
      </div>
    </React.Fragment>
  );
}

export default ExploreEntry;
