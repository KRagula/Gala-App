import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Payment.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const { Anime } = ReactAnime;

function Payment() {
	const [clickedCheckbox, setClickedCheckbox] = useState(false);

	const handleClickCheckbox = () => {
		setClickedCheckbox(!clickedCheckbox);
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
				<div className='PaymentAreaWrapper'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Payment</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Purchase and finalize your date</div>
						</div>
					</div>
					<div className='PaymentArea'>
						<div className='OfferListingInfo'>
							<div className='OfferProfileAreaWrapper'>
								<div className='ExploreEntryProfileArea'>
									<img src={testImage2} className='ExploreEntryProfileImage' />
									<div className='ExploreEntryProfileText'>Eddie</div>
									<div className='ExploreEntryProfileStars'>
										<FaStar fontSize='11px' color='#424242' />
										<FaStarHalfAlt fontSize='11px' color='#424242' />
										<FaRegStar fontSize='11px' color='#424242' />
										<FaRegStar fontSize='11px' color='#424242' />
										<FaRegStar fontSize='11px' color='#424242' />
									</div>
								</div>
							</div>
							<div className='DatesEntryRightArea'>
								<div className='DatesEntryDescriptionArea'>
									<div className='DatesEntryDescriptionTitle'>
										<div className='ExploreEntryDescriptionTitleMain'>TENNIS LESSONS</div>
										<div className='ExploreEntryDescriptionTitleSub'>
											I've played tennis for a few years, would be happy to give lessons at Penn
											Park!
										</div>
									</div>
									<div className='ExploreEntryDescriptionLogistics'>
										<div>Philadelpia, PA (1 mi)</div>
										<div className='ExploreEntryDot' />
										<div>02/15/2022</div>
									</div>
								</div>
							</div>
						</div>
						<div className='OfferBidAreaWrapper'>
							<div className='OfferBidArea'>
								<div className='OfferBidInfoWrapper'>
									<div className='PaymentDateInfo'>
										<div className='PaymentDateInfoRow'>
											<div>Date Price:</div>
											<div className='OfferBidInfoRowPrice Bold'>$110.00</div>
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
									<form action='http://localhost:8080/payment/pay' method='post'>
										<input className='PaymentOptionButton Submit' type='submit' value='Purchase' />
									</form>
									<div className='PaymentOptionButton GoBack'>Go Back</div>
								</div>
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
