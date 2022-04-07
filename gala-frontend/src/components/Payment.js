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

const { Anime } = ReactAnime;

function Payment() {
	const [clickedCheckbox, setClickedCheckbox] = useState(false);
	const [entryDataPay, setEntryDataPay] = useState([]);
	const [entryDataPayCleaned, setEntryDataPayCleaned] = useState([]);
	const [showDatesEntries, setShowDatesEntries] = useState(false);

	const handleClickCheckbox = () => {
		setClickedCheckbox(!clickedCheckbox);
	};

	useEffect(async () => {
		const entryDataPayRaw = await getPaymentPost();
		console.log('this si entry data pay raw', entryDataPayRaw);

		const entryDataPayProcessed = entryDataPayRaw.data.map(item => {
			const titleCleaned = item.title.toUpperCase();
			const description = item.description;
			const priceCleaned = '$' + parseFloat(item.price).toFixed(2);
			const cityAddress = item.cityAddress;
			const stateAddress = item.stateAddress;
			const distance = 5; // todo after claire updates backend
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
			const firstName = 'hello';
			const profileRating = 1;
			// todo after claire updates backend
			const profileImage = 'https://gala-app.s3.amazonaws.com/profile-pictures/1649134732730.jpg';
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
				profileRating: profileRating,
				profileImage: profileImage,
				textHash: textHash,
			};
		});

		setEntryDataPay(entryDataPayProcessed);
		setEntryDataPayCleaned(entryDataPayProcessed);

		setShowDatesEntries(true);
	}, []);

	const onSubmit = event => {
		//event.preventDefault(); Take out once we can redirect to a post
		entryDataPayCleaned.map(data => {
			const newPost = {
				title: data.title,
				description: data.description,
				price: 126,
			};
			makePayment(newPost);
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

	var form_url_var = '';
	entryDataPayCleaned.map(data => {
		const form_url =
			'http://localhost:8080/payment/pay?title=' +
			data.title +
			'&price=' +
			data.price +
			'&description=' +
			data.description;
		form_url_var = form_url;
	});

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
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
													return data.price;
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
									<form
										action='http://localhost:8080/payment/pay?title=Cooking With Eddie&price=1&description=Make guac and salsa with Eddie'
										method='post'>
										<input className='PaymentOptionButton Submit' type='submit' value='Purchase' />
									</form>

									<div className='PaymentOptionButton GoBack'>Go Back</div>
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

export default Payment;
