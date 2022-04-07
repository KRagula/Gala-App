import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import BidsEntry from './BidsEntry.js';
import '../css/Listing.css';
import testImage from '../assets/default.jpeg';
import testFile from '../assets/file-test.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { getPost } from '../axios/posts.js';

import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

function Listing(props) {
	// For collapse Bids Received box
	const [collapseFirst, setCollapseFirst] = useState(false);

	const handleCollapseFirst = () => {
		setCollapseFirst(!collapseFirst);
	};

	// For toggling "thanks for notifying us" text
	const [showThanksForNotif, setShowThanksForNotif] = useState(false);

	// For "I'm Okay"/"I'm in Danger" box
	const [isInDanger, setIsInDanger] = useState(false);

	const handleSetOkay = () => {
		setShowThanksForNotif(true);
	};

	const handleSetInDanger = () => {
		setIsInDanger(true);
		setShowThanksForNotif(true);
	};

	// For toggling "thanks for feedback" text
	const [showThanksForFeedback, setShowThanksForFeedback] = useState(false);

	// For "Rate your date" box
	const [dateRating, setDateRating] = useState(0);
	const [listingData, setListingData] = useState({});
	const [creatorData, setCreatorData] = useState({});

	useEffect(async () => {
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await getPost(queryParams.get('id'));
		if (!res) return;

		setListingData(res);
		setCreatorData(res.creatorId);
		console.log(res);
	}, []);

	const handleOneStars = () => {
		setShowThanksForFeedback(true);
		setDateRating(1);
	};

	const handleTwoStars = () => {
		setShowThanksForFeedback(true);
		setDateRating(2);
	};

	const handleThreeStars = () => {
		setShowThanksForFeedback(true);
		setDateRating(3);
	};

	const handleFourStars = () => {
		setShowThanksForFeedback(true);
		setDateRating(4);
	};

	const handleFiveStars = () => {
		setShowThanksForFeedback(true);
		setDateRating(5);
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

	var name = 'Kanishka';
	if (props.role === 'creator') {
		name = 'you';
	}

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
							<div className='DashboardDescriptionText'>View this date by {name}</div>
						</div>
					</div>
					<div className='ListingArea'>
						<div className='ListingProfileAreaWrapper'>
							<div className='ExploreEntryProfileArea'>
								<img
									src={creatorData.profilePictureLink ? creatorData.profilePictureLink : testImage}
									className='ListingProfileImage'
								/>
								<div className='ListingProfileText'>{`${creatorData.firstName} ${creatorData.lastName}`}</div>
								<div className='ListingProfileStars'>
									{[...Array(5)].map((x, i) => {
										return Math.round(creatorData.rating * 2) / 2 >= i + 1 ? (
											<FaStar fontSize='11px' color='#424242' />
										) : (
											<React.Fragment>
												{Math.round(creatorData.rating * 2) / 2 > i ? (
													<FaStarHalfAlt fontSize='11px' color='#424242' />
												) : (
													<FaRegStar fontSize='11px' color='#424242' />
												)}
											</React.Fragment>
										);
									})}
								</div>
							</div>
						</div>
						<div className='ListingDataPaper'>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Title:</div>
								<div className='ListingDataRowInfo'>{listingData.title}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Description:</div>
								<div className='ListingDataRowInfo'>{listingData.description}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Address:</div>
								<div className='ListingDataRowInfo'>
									{listingData.streetAddress ? (
										<a
											href={`https://www.google.com/maps/place/${listingData.streetAddress}, ${listingData.cityAddress}, ${listingData.stateAddress} ${listingData.zipAddress}`}
											class='ListingAddress'
											target='_blank'>
											{`${listingData.streetAddress}, ${listingData.cityAddress}, ${listingData.stateAddress} ${listingData.zipAddress}`}
										</a>
									) : null}
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Time:</div>
								<div className='ListingDataRowInfo'>
									{listingData.timeEnd && listingData.timeStart ? (
										<>
											<b>
												{`${new Date(listingData.timeStart).toLocaleDateString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}`}
											</b>{' '}
											to{' '}
											<b>
												{new Date(listingData.timeEnd).toLocaleDateString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</b>
										</>
									) : null}
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Auction Price:</div>
								<div className='ListingDataRowInfo'>
									<i>
										{listingData.price
											? new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
											  }).format(listingData.price)
											: null}
									</i>
								</div>
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
										{listingData.tags
											? listingData.tags.map((tag, i) => <div className='ListingTag'>{tag}</div>)
											: null}
									</div>
								</div>
							</div>
							{props.role === 'creator' ? (
								<div className='ListingDeleteArea'>
									<div className='ListingDelete'>Click to remove listing</div>
								</div>
							) : (
								<div />
							)}
						</div>
						{props.role === 'creator' ? (
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
						{props.role === 'engager' ? (
							<div className='ListingEngagedArea'>
								<div className='ListingEngagedStatusArea'>
									Status:
									{props.status === 'waiting' ? (
										<div className='ListingEngagedStatus Waiting'>Waiting for response...</div>
									) : (
										<div />
									)}
									{props.status === 'confirmed' ? (
										<div className='ListingEngagedStatus Confirmed'>Confirmed.</div>
									) : (
										<div />
									)}
									{props.status === 'ongoing' ? (
										<div className='ListingEngagedStatus Ongoing'>Ongoing.</div>
									) : (
										<div />
									)}
									{props.status === 'completed' ? (
										<div className='ListingEngagedStatus Completed'>Completed.</div>
									) : (
										<div />
									)}
								</div>
								{props.status === 'waiting' ? (
									<div className='ListingEngagedStatusArea Extra'>Your Bid: $60.00</div>
								) : (
									<div />
								)}
								{props.status === 'ongoing' ? (
									<div>
										{!showThanksForNotif ? (
											<div className='ListingEngagedStatusArea Extra'>
												How's your date going?
												<div className='ListingCheckupBox Good' onClick={handleSetOkay}>
													I'm okay.
												</div>
												<div className='ListingCheckupBox Bad' onClick={handleSetInDanger}>
													I might be in danger.
												</div>
											</div>
										) : (
											<div className='ListingEngagedStatusArea Extra'>
												Thanks for letting us know!
												{isInDanger ? (
													<div className='ListingEngagedStatusTextArea'>
														We are in contact with authorities to aid you.
													</div>
												) : (
													<div />
												)}
											</div>
										)}
									</div>
								) : (
									<div />
								)}
								{props.status === 'completed' ? (
									<div>
										{!showThanksForFeedback ? (
											<div className='ListingEngagedStatusArea Extra'>
												Rate your experience:
												<div className='ListingEngagedStatusTextArea'>
													<FaRegStar fontSize='16px' color='#424242' onClick={handleOneStars} />
													<FaRegStar fontSize='16px' color='#424242' onClick={handleTwoStars} />
													<FaRegStar fontSize='16px' color='#424242' onClick={handleThreeStars} />
													<FaRegStar fontSize='16px' color='#424242' onClick={handleFourStars} />
													<FaRegStar fontSize='16px' color='#424242' onClick={handleFiveStars} />
												</div>
											</div>
										) : (
											<div className='ListingEngagedStatusArea Extra'>
												Thanks for your feedback! (for debugging: {dateRating} stars)
											</div>
										)}
									</div>
								) : (
									<div />
								)}
							</div>
						) : (
							<div />
						)}
						{props.role !== 'creator' ? (
							<div>
								{props.role === 'observer' ? (
									<div className='ListingMessageOptionArea'>
										<div className='ListingMessageOption Red'>Click to offer a bid</div>
										<div className='ListingMessageOption Blue'>Click to message</div>
									</div>
								) : (
									<div />
								)}
								{props.role === 'engager' && props.status !== 'completed' ? (
									<div className='ListingMessageOptionArea'>
										{props.status !== 'ongoing' ? (
											<div className='ListingMessageOption Red'>Click to offer a bid</div>
										) : (
											<div />
										)}
										<Link to={ROUTE.MESSAGE} style={{ textDecoration: 'none' }}>
											<div className='ListingMessageOption Blue'>Click to message</div>
										</Link>
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
