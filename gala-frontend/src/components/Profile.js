import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Profile.css';
import testImage from '../assets/kanishka.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { getProfile } from '../axios/profile.js';
import defaultImg from '../assets/default.jpeg';

import ROUTE from '../configurations/route-frontend-config.js';
import Cookies from 'js-cookie';

const { Anime } = ReactAnime;

function Profile(props) {
	// controller state
	const [control, setControl] = useState(null);
	const [profileInfo, setProfileInfo] = useState({});
	const [name, setName] = useState('');

	// meta state
	const [meta, setMeta] = useState({
		control: control,
		progress: 100,
		currentTime: 0,
		duration: 0,
	});

	useEffect(async () => {
		const queryParams = new URLSearchParams(window.location.search);
		if (!queryParams.get('id')) return;
		const res = await getProfile(queryParams.get('id'));
		if (res.rating) {
			res.rating = Math.round(res.rating * 2) / 2;
		}

		if (queryParams.get('id') != Cookies.get('userId')) {
			setName(`${res.firstName}'s`);
		} else {
			setName('your');
		}

		setProfileInfo(res);
	}, []);

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
							<div className='DashboardTitleText'>Profile</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Viewing {name} user profile</div>
						</div>
					</div>
					<div className='ListingArea'>
						<div className='ListingProfileAreaWrapper'>
							<div className='ExploreEntryProfileArea'>
								<img
									src={profileInfo.profilePictureLink ? profileInfo.profilePictureLink : defaultImg}
									className='ListingProfileImage'
								/>
								<div className='ListingProfileText'>
									{profileInfo.firstName} {profileInfo.lastName}
								</div>
								<div className='ListingProfileStars'>
									{[...Array(5)].map((x, i) => {
										return profileInfo.rating >= i + 1 ? (
											<FaStar fontSize='11px' color='#424242' />
										) : (
											<React.Fragment>
												{profileInfo.rating > i ? (
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
						<div className='ListingDataPaper'>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Headline:</div>
								<div className='ListingDataRowInfo'>{profileInfo.headline}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Gender:</div>
								<div className='ListingDataRowInfo'>{profileInfo.gender}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Age:</div>
								<div className='ListingDataRowInfo'>{profileInfo.age}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Fun Fact:</div>
								<div className='ListingDataRowInfo'>{profileInfo.funFact}</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Interests:</div>
								<div className='ListingDataRowInfo'>
									<div className='ListingDataTagArea'>
										{profileInfo.interests
											? profileInfo.interests.map((interest, i) => (
													<div className='ListingTag'>{interest}</div>
											  ))
											: null}
									</div>
								</div>
							</div>
							<div className='ListingDataRow'>
								<div className='ListingDataRowTitle'>Gala Dates:</div>
								<div className='ListingDataRowInfo'>
									{profileInfo.numDates ? profileInfo.numDates : 0}
								</div>
							</div>
						</div>
						{new URLSearchParams(window.location.search).get('id') == Cookies.get('userId') ? (
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
