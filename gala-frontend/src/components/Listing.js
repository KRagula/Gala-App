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
import { getPost, deletePost } from '../axios/posts.js';
import { createChannel } from '../axios/messaging.js';

import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

const Listing = props => {
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
	const [name, setName] = useState('');

	useEffect(async () => {
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await getPost(queryParams.get('id'));
		console.log(res);
		if (!res) return;
		if (res.creatorId.role == 'creator') {
			setName('you');
		} else {
			setName(res.creatorId.firstName);
		}

		console.log(res);

		setListingData(res);
		setCreatorData(res.creatorId);
	}, []);

	const onRemoveClick = async () => {
		const queryParams = new URLSearchParams(window.location.search);
		await deletePost(queryParams.get('id'));
		window.location = ROUTE.EXPLORE;
	};

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

	const onMessageClick = async () => {
		window.location = ROUTE.MESSAGE;
		// const data = {
		// 	channelName: 'asd',
		// 	ids: [],
		// };
		// const res = await createChannel(data);
		// if (res) {
		// 	window.location = ROUTE.MESSAGE;
		// } else {
		// 	alert('Something went wrong on our end!');
		// }
	};

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
							<Link
								to={`${ROUTE.PROFILE}?id=${creatorData._id}`}
								style={{ textDecoration: 'none' }}>
								<div className='ExploreEntryProfileArea'>
									<img
										src={
											creatorData.profilePictureLink ? creatorData.profilePictureLink : testImage
										}
										className='ListingProfileImage'
									/>
									<div className='ListingProfileText' style={{ color: 'black' }}>
										{creatorData.firstName
											? `${creatorData.firstName} ${creatorData.lastName}`
											: null}
									</div>
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
							</Link>
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
									<i>
										{listingData.highestBid
											? new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
											  }).format(listingData.highestBid)
											: null}
									</i>
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Proof of Experience:</div>
								<div className='ListingDataRowInfo'>
									<div className='ListingDataProofWrapper'>
										<div className='ListingDataProof'>
											{listingData.proofExperienceLink ? (
												<a
													href={listingData.proofExperienceLink}
													target='_blank'
													class='ListingProof'>
													{listingData.proofExperienceName.substring(17)}
												</a>
											) : null}
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
							{creatorData.role === 'creator' && !listingData.bidWinnerId ? (
								<div className='ListingDeleteArea'>
									<div
										className='ListingDelete'
										onClick={onRemoveClick}
										style={{ textDecoration: 'none', cursor: 'pointer' }}>
										Click to remove listing
									</div>
								</div>
							) : (
								<div />
							)}
						</div>
						{creatorData.role === 'creator' ? (
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
										{listingData.allBids.map((i, x) => (
											<BidsEntry
												isReceived={true}
												data={{
													userId: i.bidderId._id,
													profileImage: i.bidderId.profilePictureLink,
													profileName: i.bidderId.firstName,
													profileRating: i.bidderId.rating,
													title: listingData.title,
													auctionPrice: listingData.price
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(listingData.price)
														: null,
													highestBid: listingData.highestBid
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(listingData.highestBid)
														: null,
													bidAmount: i.bidAmount
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(i.bidAmount)
														: null,
													bidId: i._id,
													bidStatus: i.status,
													location: true,
												}}
											/>
										))}
									</div>
								) : (
									<div />
								)}
							</div>
						) : (
							<div />
						)}
						{creatorData.role === 'engager' ? (
							<div className='ListingEngagedArea'>
								<div className='ListingEngagedStatusArea'>
									Status:
									{listingData.status === 'Waiting for response' ? (
										<div className='ListingEngagedStatus Waiting'>Waiting for response...</div>
									) : (
										<div />
									)}
									{listingData.status === 'Confirmed' ? (
										<div className='ListingEngagedStatus Confirmed'>Confirmed.</div>
									) : (
										<div />
									)}
									{listingData.status === 'Denied' ? (
										<div className='ListingEngagedStatus Denied'>Denied.</div>
									) : (
										<div />
									)}
									{listingData.status === 'ongoing' ? (
										<div className='ListingEngagedStatus Ongoing'>Ongoing.</div>
									) : (
										<div />
									)}
									{listingData.status === 'completed' ? (
										<div className='ListingEngagedStatus Completed'>Completed.</div>
									) : (
										<div />
									)}
								</div>
								{listingData.status === 'Waiting for response' ? (
									<div className='ListingEngagedStatusArea Extra'>
										Your Bid:{' '}
										{listingData.bidderAmount
											? new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
											  }).format(listingData.bidderAmount)
											: null}
									</div>
								) : (
									<div />
								)}
								{creatorData.role == 'engager' &&
								listingData.status === 'Confirmed' &&
								Date.now() >= new Date(listingData.timeStart) &&
								Date.now() <= new Date(listingData.timeEnd) ? (
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
						{creatorData.role !== 'creator' ? (
							<div>
								{creatorData.role === 'observer' ? (
									<div className='ListingMessageOptionArea'>
										{!listingData.bidWinnerId || new Date(listingData.timeEnd) < Date.now() ? (
											<Link
												to={`${ROUTE.OFFER}?id=${listingData._id}`}
												style={{ textDecoration: 'none' }}>
												<div className='ListingMessageOption Red'>Click to offer a bid</div>
											</Link>
										) : null}

										<div
											className='ListingMessageOption Blue'
											onClick={onMessageClick}
											style={{ cursor: 'pointer' }}>
											Click to message
										</div>
									</div>
								) : (
									<div />
								)}
								{creatorData.role === 'engager' && props.status !== 'completed' ? (
									<div className='ListingMessageOptionArea'>
										{props.status !== 'ongoing' ? (
											<div className='ListingMessageOption Red'>Click to offer a bid</div>
										) : (
											<div />
										)}
										<div
											className='ListingMessageOption Blue'
											onClick={onMessageClick}
											style={{ cursor: 'pointer' }}>
											Click to message
										</div>
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
};

export default Listing;
