import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Confirm.css';
import defaultImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { confirmBid, getBid } from '../axios/bids.js';
import ROUTE from '../configurations/route-frontend-config.js';
import { getConfirmEmail } from '../axios/emails';

const { Anime } = ReactAnime;

function Confirm() {
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

	const [listingData, setListingData] = useState({});
	const [bidderData, setBidderData] = useState({});
	const [bidData, setBidData] = useState({});
	const [display, setDisplay] = useState(false);

	useEffect(async () => {
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await getBid(queryParams.get('id'));
		console.log(res);
		if (!res || res.role != 'creator' || new Date(res.timeEnd) < Date.now()) return;

		setDisplay(true);
		setListingData(res.postId);
		setBidderData(res.bidderId);
		setBidData(res);
	}, []);

	const onConfirmClick = async () => {
		console.log('onConfirmClick got clicked');
		console.log('this is bid Data', bidData);
		getConfirmEmail();
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await confirmBid(queryParams.get('id'));
		if (!res) {
			alert('Something went wrong!');
			return;
		}
		window.location = `${ROUTE.LISTING}?id=${listingData._id}`;
	};

	// function sendEmail() {
	// 	fetch('http://127.0.0.1:8080/bidConfirm'); //query string url
	// 	// .catch(err => console.error(err));
	// }

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				{display ? (
					<div className='OfferAreaWrapper'>
						<div className='DashboardTitleDescriptionAreaWrapper'>
							<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
								<div className='DashboardTitleText'>Confirm</div>
								<div className='DashboardTitleDot' />
								<div className='DashboardDescriptionText'>
									Approve {bidderData.firstName}'s offer for this date
								</div>
							</div>
						</div>
						<div className='OfferArea'>
							<div className='OfferListingInfo'>
								<div className='OfferProfileAreaWrapper'>
									<div className='ExploreEntryProfileArea'>
										<img
											src={
												bidderData.profilePictureLink ? bidderData.profilePictureLink : defaultImage
											}
											className='ExploreEntryProfileImage'
										/>
										<div className='ExploreEntryProfileText'>{bidderData.firstName}</div>
										<div className='ExploreEntryProfileStars'>
											{[...Array(5)].map((x, i) => {
												return Math.round(bidderData.rating * 2) / 2 >= i + 1 ? (
													<FaStar fontSize='11px' color='#424242' />
												) : (
													<React.Fragment>
														{Math.round(bidderData.rating * 2) / 2 > i ? (
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
								<div className='DatesEntryRightArea'>
									<div className='DatesEntryDescriptionArea'>
										<div className='DatesEntryDescriptionTitle'>
											<div className='ExploreEntryDescriptionTitleMain'>{listingData.title}</div>
											<div className='ExploreEntryDescriptionTitleSub'>
												{listingData.description}
											</div>
										</div>
										<div className='ExploreEntryDescriptionLogistics'>
											<div>
												{listingData.cityAddress}, {listingData.stateAddress} (5 mi)
											</div>
											<div className='ExploreEntryDot' />
											<div>
												{`${new Date(listingData.timeStart).toLocaleDateString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}`}{' '}
												to{' '}
												{new Date(listingData.timeEnd).toLocaleDateString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='OfferBidAreaWrapper'>
								<div className='OfferBidArea'>
									<div className='OfferBidInfoWrapper'>
										<div className='OfferBidInfo'>
											<div className='OfferBidInfoRow'>
												<div>Auction Price:</div>
												<div className='OfferBidInfoRowPrice'>
													{listingData.price
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(listingData.price)
														: null}
												</div>
											</div>
											<div className='OfferBidInfoRow'>
												<div>Highest Bid:</div>
												<div className='OfferBidInfoRowPrice'>
													{bidData.highestBid
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(bidData.highestBid)
														: null}
												</div>
											</div>
										</div>
									</div>
									<div className='OfferBidRequestWrapper'>
										<div className='OfferBidRequest'>
											<div>{bidderData.firstName}'s Bid:</div>
											<div className='OfferBidInfoRowPrice Bold'>
												{bidData.bidAmount
													? new Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
													  }).format(bidData.bidAmount)
													: null}
											</div>
										</div>
									</div>
									<div className='OfferBidOptionArea'>
										{/* <div className='OfferBidOptionButton Submit'>Confirm</div> */}
										<button
											className='OfferBidOptionButton Submit'
											onClick={onConfirmClick}
											style={{ textDecoration: 'none', cursor: 'pointer' }}>
											{' '}
											Confirm{' '}
										</button>
										<div className='OfferBidOptionButton GoBack'>Go Back</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					'You do not have access to this page'
				)}
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

export default Confirm;
