import React from 'react';
import '../css/MessagesEntry.css';
import testImage from '../assets/kanishka.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

function MessagesEntry(props) {
  // Note: re-using a lot of components from Explore to improve reusability
  return (
    <React.Fragment>
      <div className="MessagesEntryPaper">
        <div className="MessagesNewMessageNotifArea">
          <div className="MessagesNewMessageNotif">
            {/* Notify users if there is a new mesesage */}
            {props.isNewMessage ? 
              <span class="MessagesNewMessageDot"></span> 
              :
              <div />}
          </div>
        </div>
        <div className="MessagesEntryProfileAreaWrapper">
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
            <div className="MessagesEntryDescriptionTitle">
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
            <div className="MessagesEntryDescriptionBottomArea"> 
              <div className="MessagesNewMessageArea">
                {props.isNewMessage ?
                  <div className="MessagesNewMessageTitle">
                    New message from Kanishka: 
                  </div>
                  :
                  <div>No new messages.</div>
                }
                {props.isNewMessage ?
                  <div className="MessagesNewMessageText">
                    {'"'.concat(props.newMessage, '"')}
                  </div>
                  : <div className="MessagesNewMessageText" />
                }
              </div>
              <div className="MessagesEntrySeeMore">
                Click to message
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MessagesEntry;
