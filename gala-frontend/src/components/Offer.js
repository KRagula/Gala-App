import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Offer.css';
import defaultImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { getPost } from '../axios/posts.js';
import { sendBid } from '../axios/bids.js';
import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

const defaultMaskOptions = {
	prefix: '$',
	suffix: '',
	includeThousandsSeparator: true,
	thousandsSeparatorSymbol: ',',
	allowDecimal: true,
	decimalSymbol: '.',
	decimalLimit: 2, // how many digits allowed after the decimal
	integerLimit: 7, // limit length of integer numbers
	allowNegative: false,
	allowLeadingZeroes: false,
};

function Offer() {
	const currencyMask = createNumberMask({
		...defaultMaskOptions,
	});

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
	const [creatorData, setCreatorData] = useState({});
	const [display, setDisplay] = useState(false);
	const [priceExp, setPriceExp] = useState('');

	useEffect(async () => {
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await getPost(queryParams.get('id'));
		console.log(res);
		if (
			!res ||
			res.creatorId.role == 'creator' ||
			res.creatorId.role == 'engager' ||
			res.bidWinnerId
		)
			return;

		setDisplay(true);
		setListingData(res);
		setCreatorData(res.creatorId);
	}, []);

	const onSubmitBid = async () => {
		if (!priceExp) {
			alert('Enter a bid!');
			return;
		}
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await sendBid(queryParams.get('id'), Number(priceExp.replace(/[^0-9.-]+/g, '')));
		if (!res) {
			alert('Something went wrong!');
			return;
		}
		window.location = ROUTE.MYBIDS;
	};

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				{display ? (
					<div className='OfferAreaWrapper'>
						<div className='DashboardTitleDescriptionAreaWrapper'>
							<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
								<div className='DashboardTitleText'>Offer</div>
								<div className='DashboardTitleDot' />
								<div className='DashboardDescriptionText'>Place a bid for this date</div>
							</div>
						</div>
						<div className='OfferArea'>
							<div className='OfferListingInfo'>
								<div className='OfferProfileAreaWrapper'>
									<div className='ExploreEntryProfileArea'>
										<img
											src={
												creatorData.profilePictureLink
													? creatorData.profilePictureLink
													: defaultImage
											}
											className='ExploreEntryProfileImage'
										/>
										<div className='ExploreEntryProfileText'>{creatorData.firstName}</div>
										<div className='ExploreEntryProfileStars'>
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
												{listingData.cityAddress}, {listingData.stateAddress} (1 mi)
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
												<div className='OfferBidInfoRowPrice Bold'>
													{listingData.highestBid
														? new Intl.NumberFormat('en-US', {
																style: 'currency',
																currency: 'USD',
														  }).format(listingData.highestBid)
														: null}
												</div>
											</div>
										</div>
									</div>
									<div className='OfferBidRequestWrapper'>
										<div className='OfferBidRequest'>
											<div className='OfferBidRequestPrompt'>Your Bid:</div>
											<div>
												<MaskedInput
													className='OfferBidRequestInput'
													mask={currencyMask}
													onChange={event => setPriceExp(event.target.value)}
													placeholder='$0.00'
												/>
											</div>
										</div>
									</div>
									<div className='OfferBidOptionArea'>
										<div
											className='OfferBidOptionButton Submit'
											onClick={onSubmitBid}
											style={{ textDecoration: 'none', cursor: 'pointer' }}>
											Submit
										</div>
										<Link
											to={`${ROUTE.LISTING}?id=${listingData._id}`}
											style={{ textDecoration: 'none' }}>
											<div className='OfferBidOptionButton GoBack'>Go Back</div>
										</Link>
									</div>
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
					</div>
				) : (
					'You cannot make an offer for this date'
				)}
			</div>
			{/* <Anime
				initial={timeline}
				control={control}
				setMeta={setMeta}
				animeConfig={{
					autoplay: true,
					duration: 4000,
					easing: 'easeInOutSine',
				}}></Anime> */}
		</React.Fragment>
	);
}

export default Offer;
