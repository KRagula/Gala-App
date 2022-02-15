import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Confirm.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import testImage3 from '../assets/claire.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

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

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				<div className='OfferAreaWrapper'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Confirm</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Approve Claire's offer for this date</div>
						</div>
					</div>
					<div className='OfferArea'>
						<div className='OfferListingInfo'>
							<div className='OfferProfileAreaWrapper'>
								<div className='ExploreEntryProfileArea'>
									<img src={testImage3} className='ExploreEntryProfileImage' />
									<div className='ExploreEntryProfileText'>Claire</div>
									<div className='ExploreEntryProfileStars'>
										<FaStar fontSize='11px' color='#424242' />
										<FaStar fontSize='11px' color='#424242' />
										<FaStar fontSize='11px' color='#424242' />
										<FaStarHalfAlt fontSize='11px' color='#424242' />
										<FaRegStar fontSize='11px' color='#424242' />
									</div>
								</div>
							</div>
							<div className='DatesEntryRightArea'>
								<div className='DatesEntryDescriptionArea'>
									<div className='DatesEntryDescriptionTitle'>
										<div className='ExploreEntryDescriptionTitleMain'>PITBULL CONCERT</div>
										<div className='ExploreEntryDescriptionTitleSub'>
											Come to the Pitbull concert with me this Saturday at the Moda Center!
										</div>
									</div>
									<div className='ExploreEntryDescriptionLogistics'>
										<div>$50.00</div>
										<div className='ExploreEntryDot' />
										<div>Portland, OR (5 mi)</div>
										<div className='ExploreEntryDot' />
										<div>01/20/2022</div>
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
											<div className='OfferBidInfoRowPrice'>$110.00</div>
										</div>
									</div>
								</div>
								<div className='OfferBidRequestWrapper'>
									<div className='OfferBidRequest'>
										<div>Claire's Bid:</div>
										<div className='OfferBidInfoRowPrice Bold'>$105.00</div>
									</div>
								</div>
								<div className='OfferBidOptionArea'>
									<div className='OfferBidOptionButton Submit'>Confirm</div>
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

export default Confirm;
