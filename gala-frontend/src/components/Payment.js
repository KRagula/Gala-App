import React, { useState, useEffect } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Payment.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { getPaymentPost, makePayment } from '../axios/payments';
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import DatesEntry from './DatesEntry';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

function Payment() {
	const [clickedCheckbox, setClickedCheckbox] = useState(false);
	const [entryDataPay, setEntryDataPay] = useState([]);
	const [entryDataPayCleaned, setEntryDataPayCleaned] = useState([]);
	const [showDatesEntries, setShowDatesEntries] = useState(false);
	const [display, setDisplay] = useState(false);

	const handleClickCheckbox = () => {
		setClickedCheckbox(!clickedCheckbox);
	};

	useEffect(async () => {
		const getPosition = () => {
			return new Promise((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject)
			);
		};
		// console.log('this is position', getPosition);
		const positionData = await getPosition();
		let currentLocation = {
			latitude: positionData.coords.latitude,
			longitude: positionData.coords.longitude,
		};
		// console.log('this is the longitude', currentLocation.longitude);
		// console.log('this is the lat', currentLocation.latitude);

		// console.log('hello');
		const queryParams = new URLSearchParams(window.location.search);
		// console.log('this is the queryparams', queryParams);
		if (!queryParams.get('id')) return;
		// console.log('we passed here');
		// const params = {'id': }
		currentLocation.id = queryParams.get('id');
		const entryDataPayRaw = await getPaymentPost(currentLocation);
		// console.log('this is entrydata raw', entryDataPayRaw);
		// if (!entryDataPayRaw.data.verified) return;

		setDisplay(true);

		// IMPORTANT entryDataPayRaw.data.payingPrice IS THE PAYING PRICE USE THISSSSS
		const entryDataPayProcessed = entryDataPayRaw.data.doc.map(item => {
			// console.log('this is the item', item);
			const titleCleaned = item.title.toUpperCase();
			const description = item.description;
			// console.log('this is the price from data', item.price);
			const priceCleaned = item.price;
			const priceCleanedString = item.price
				? new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
				  }).format(item.price)
				: null;
			// const userDistance =
			// console.log('this is the userDistance', userDistance);
			console.log('this is the priceCleaned', priceCleanedString);
			const cityAddress = item.cityAddress;
			const stateAddress = item.stateAddress;
			const distance = entryDataPayRaw.data.distance; // todo after claire updates backend
			const startDateObject = new Date(item.timeStart);
			const month = (startDateObject.getUTCMonth() + 1).toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
			const day = startDateObject
				.getUTCDate()
				.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			const year = startDateObject.getUTCFullYear();
			const startDateCleaned = month + '/' + day + '/' + year;
			const firstName = item.creatorId.firstName;
			// todo after claire updates backend
			const profileImage = item.creatorId.profilePictureLink;
			let textHash =
				titleCleaned +
				'#' +
				description +
				'#' +
				priceCleaned +
				'#' +
				cityAddress +
				'#' +
				stateAddress +
				'#' +
				startDateCleaned +
				'#' +
				firstName;
			textHash = textHash.toLowerCase();

			return {
				title: titleCleaned,
				description: description,
				price: priceCleaned,
				city: cityAddress,
				state: stateAddress,
				distance: distance,
				startDateObject: startDateObject,
				startDateCleaned: startDateCleaned,
				firstName: firstName,
				profileRating: item.creatorId.rating,
				profileImage: profileImage,
				textHash: textHash,
				postId: item._id,
				userId: item.creatorId._id,
				priceString: priceCleanedString,
			};
		});

		setEntryDataPay(entryDataPayProcessed);
		setEntryDataPayCleaned(entryDataPayProcessed);

		setShowDatesEntries(true);
	}, []);

	const onSubmit = event => {
		//event.preventDefault(); Take out once we can redirect to a post
		entryDataPayCleaned.map(data => {
			// console.log('this is the price in new post', Number(data.price));
			const newPost = {
				title: data.title,
				description: data.description,
				price: data.price,
			};
			const payment = makePayment(newPost);
			payment.then(response => {
				// console.log('this is the response', response);
				window.location.replace(response);
			});
		});
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

	// var form_url_var = '';
	// entryDataPayCleaned.map(data => {
	// 	const form_url =
	// 		'http://localhost:8080/payment/pay?title=' +
	// 		data.title +
	// 		'&price=' +
	// 		data.price +
	// 		'&description=' +
	// 		data.description;
	// 	form_url_var = form_url;
	// });

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				{display ? (
					<div className='PaymentAreaWrapper'>
						<div className='DashboardTitleDescriptionAreaWrapper'>
							<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
								<div className='DashboardTitleText'>Payment</div>
								<div className='DashboardTitleDot' />
								<div className='DashboardDescriptionText'>Purchase and finalize your date</div>
							</div>
						</div>
						<div className='PaymentArea'>
							<div className='BidsEntryArea'>
								<React.Fragment>
									{entryDataPayCleaned.map(data => {
										return <DatesEntry isUpcoming={false} isOwn={true} data={data} />;
									})}
								</React.Fragment>
							</div>
							<div className='OfferBidAreaWrapper'>
								<div className='OfferBidArea'>
									<div className='OfferBidInfoWrapper'>
										<div className='PaymentDateInfo'>
											<div className='PaymentDateInfoRow'>
												<div>Date Price:</div>
												<div className='OfferBidInfoRowPrice Bold'>
													{entryDataPayCleaned.map(data => {
														return data.priceString;
													})}
												</div>
											</div>
										</div>
									</div>
									<div className='OfferBidRequestWrapper'>
										<div className='PaymentAgreeTerms'>
											<div className='OfferBidRequestPrompt'>
												<input type='checkbox' onClick={handleClickCheckbox} /> I agree to the terms
												and conditions.
											</div>
										</div>
									</div>
									<div className='OfferBidOptionArea'>
										{/* <form
											action='http://localhost:8080/payment/pay?title=Cooking With Eddie&price=1&description=Make guac and salsa with Eddie'
											method='post'>
											<input
												className='PaymentOptionButton Submit'
												type='submit'
												value='Purchase'
											/>
										</form> */}
										<div
											className='CreateFormButton Submit'
											onClick={clickedCheckbox ? onSubmit : null}
											style={{
												cursor: 'pointer',
											}}>
											Submit
										</div>

										<Link to={ROUTE.MYBIDS} style={{ textDecoration: 'none' }}>
											<div className='PaymentOptionButton GoBack'>Go Back</div>
										</Link>
									</div>
									{/* <div className='OfferBidOptionArea'>
									{
										<div
											className='CreateFormButton Submit'
											onClick={onSubmit}
											style={{
												cursor: 'pointer',
											}}>
											Submit
										</div>
									}

									<div className='PaymentOptionButton GoBack'>Go Back</div>
								</div> */}
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
					'page loading'
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

export default Payment;
