import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import BidsEntry from './BidsEntry.js';
import '../css/Listing.css';
import testImage from '../assets/kanishka.jpeg';
import testFile from '../assets/file-test.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const { Anime } = ReactAnime;

function Listing(props) {
	const [collapseFirst, setCollapseFirst] = useState(false);

	const handleCollapseFirst = () => {
		setCollapseFirst(!collapseFirst);
	};

	// controller state
	const [control, setControl] = useState(null);

	// meta state
	const [meta, setMeta] = useState({
		control: control,
		progress: 100,
		currentTime: 0,
		duration: 0,
	});

	// timeline
	var timeline = [];
	timeline.push({
		targets: '#DashboardTitleDescriptionArea',
		delay: 0,
		duration: 800,
		opacity: 100,
		easing: 'easeInOutExpo',
	});

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				<div className='ListingAreaWrapper'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Listing</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>View this date by Kanishka</div>
						</div>
					</div>
					<div className='ListingArea'>
						<div className='ListingProfileAreaWrapper'>
							<div className='ExploreEntryProfileArea'>
								<img src={testImage} className='ListingProfileImage' />
								<div className='ListingProfileText'>Kanishka</div>
								<div className='ListingProfileStars'>
									<FaStar fontSize='12px' color='#424242' />
									<FaStar fontSize='12px' color='#424242' />
									<FaStarHalfAlt fontSize='12px' color='#424242' />
									<FaRegStar fontSize='12px' color='#424242' />
									<FaRegStar fontSize='12px' color='#424242' />
								</div>
							</div>
						</div>
						<div className='ListingDataPaper'>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Title:</div>
								<div className='ListingDataRowInfo'>PITBULL CONCERT</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Description:</div>
								<div className='ListingDataRowInfo'>
									Come to the Pitbull concert with me this Saturday at the Moda Center! Tickets and
									drinks on me.
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Address:</div>
								<div className='ListingDataRowInfo'>
									<a href='https://www.google.com/maps' class='ListingAddress'>
										3925 Walnut Street, Philadelphia, PA 19104
									</a>
									.
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Time:</div>
								<div className='ListingDataRowInfo'>
									<b>02/28/2022 1:00pm</b> to <b>02/28/2022 3:00pm</b>.
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Auction Price:</div>
								<div className='ListingDataRowInfo'>$50.00.</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Highest Bid:</div>
								<div className='ListingDataRowInfo'>
									<i>$70.00.</i>
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Proof of Experience:</div>
								<div className='ListingDataRowInfo'>
									<div className='ListingDataProofWrapper'>
										<div className='ListingDataProof'>
											<a href={testFile} download class='ListingProof'>
												test-file.pdf
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Tags:</div>
								<div className='ListingDataRowInfo'>
									<div className='ListingDataTagArea'>
										<div className='ListingTag'>concert</div>
										<div className='ListingTag'>fun</div>
										<div className='ListingTag'>music</div>
										<div className='ListingTag'>food</div>
										<div className='ListingTag'>dancing</div>
										<div className='ListingTag'>disco</div>
										<div className='ListingTag'>eating</div>
										<div className='ListingTag'>drinking</div>
										<div className='ListingTag'>active</div>
										<div className='ListingTag'>pitbull</div>
									</div>
								</div>
							</div>
							{props.isCreator ? (
								<div className='ListingDeleteArea'>
									<div className='ListingDelete'>Click to remove listing</div>
								</div>
							) : (
								<div />
							)}
						</div>
						{props.isCreator ? (
							<div className='ListingBidsCollapsableArea'>
								<div className='BidsCollapseBar'>
									<div className='BidsCollapseText'>Bids Received</div>
									{collapseFirst ? (
										<div className='BidsCollapseArrow' onClick={handleCollapseFirst}>
											<FontAwesomeIcon icon={faChevronDown} />
										</div>
									) : (
										<div className='BidsCollapseArrow' onClick={handleCollapseFirst}>
											<FontAwesomeIcon icon={faChevronUp} />
										</div>
									)}
								</div>
								{!collapseFirst ? (
									<div className='BidsEntryArea'>
										<BidsEntry isReceived={true} />
										<BidsEntry isReceived={true} />
									</div>
								) : (
									<div />
								)}
							</div>
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
			<Anime
				initial={timeline}
				control={control}
				setMeta={setMeta}
				animeConfig={{
					autoplay: true,
					duration: 4000,
					easing: 'easeInOutSine',
				}}></Anime>
		</React.Fragment>
	);
}

export default Listing;
