import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Profile.css';
import testImage from '../assets/kanishka.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

function Profile(props) {
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

	var name = "Kanishka's";
	if (props.role === 'creator') {
		name = 'your';
	}

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				<div className='ListingAreaWrapper'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Profile</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>View {name} user profile</div>
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
								<div className='ListingDataRowTitle'>Name:</div>
								<div className='ListingDataRowInfo'>Kanishka Ragula</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Headline:</div>
								<div className='ListingDataRowInfo'>
									Hi! I'm Kanishka. I like memes, finance, and memes about finance. I study in the
									Jerome Fisher Program in Management and Technology. I am going to be an investment
									banker at JP Morgan after I graduate from Penn. I like potato chips.
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Gender:</div>
								<div className='ListingDataRowInfo'>Male</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Age:</div>
								<div className='ListingDataRowInfo'>20</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Interests:</div>
								<div className='ListingDataRowInfo'>
									<div className='ListingDataTagArea'>
										<div className='ListingTag'>finance</div>
										<div className='ListingTag'>memes</div>
										<div className='ListingTag'>potato chips</div>
										<div className='ListingTag'>m and t</div>
										<div className='ListingTag'>wharton</div>
										<div className='ListingTag'>jp morgan</div>
										<div className='ListingTag'>investment banking</div>
										<div className='ListingTag'>partying</div>
									</div>
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Fun Fact:</div>
								<div className='ListingDataRowInfo'>I have a twin brother.</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Gala Dates:</div>
								<div className='ListingDataRowInfo'>3</div>
							</div>
						</div>
						{props.role === 'creator' ? (
							<div className='ProfileUpdateAreaWrapper'>
								<Link to={ROUTE.UPDATE} style={{ textDecoration: 'none' }}>
									<div className='ProfileUpdateArea'>Click to update profile</div>
								</Link>
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

export default Profile;
