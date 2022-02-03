import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Listing.css';
import testImage from '../assets/kanishka.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const { Anime } = ReactAnime;

function Listing() {
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

export default Listing;
