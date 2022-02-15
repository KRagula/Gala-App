import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Offer.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
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
											You bring the balls, I bring the racket.
										</div>
									</div>
									<div className='ExploreEntryDescriptionLogistics'>
										<div>$20.00</div>
										<div className='ExploreEntryDot' />
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
									<div className='OfferBidInfo'>
										<div className='OfferBidInfoRow'>
											<div>Auction Price:</div>
											<div className='OfferBidInfoRowPrice'>$100.00</div>
										</div>
										<div className='OfferBidInfoRow'>
											<div>Highest Bid:</div>
											<div className='OfferBidInfoRowPrice Highest'>$110.00</div>
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
												placeholder='$0.00'
											/>
										</div>
									</div>
								</div>
								<div className='OfferBidOptionArea'>
									<div className='OfferBidOptionButton Submit'>Submit</div>
									<div className='OfferBidOptionButton GoBack'>Go Back</div>
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

export default Offer;
