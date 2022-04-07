import React, { useState, useImage, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Update.css';
import testImage from '../assets/kanishka.jpeg';
import defaultImage from '../assets/default.jpeg';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { editProfile, getProfile } from '../axios/profile.js';
import { uploadFile, fileUsage } from '../axios/aws.js';

import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

const defaultMaskOptions = {
	prefix: '',
	suffix: '',
	allowDecimal: false,
	integerLimit: 3,
	allowNegative: false,
	allowLeadingZeroes: false,
};

const MAX_NUM_TAGS = 10;

function Update() {
	const [interestsList, setInterestsList] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [headline, setHeadline] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [funFact, setFunFact] = useState('');
	const [showTagInsn, setShowTagInsn] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const [profileInfo, setProfileInfo] = useState({});

	useEffect(async () => {
		const res = await getProfile(Cookies.get('userId'));
		setProfileInfo(res);

		setFirstName(res.firstName);
		setLastName(res.lastName);
		setHeadline(res.headline);
		setAge(res.age);
		setGender(res.gender);
		setFunFact(res.funFact);
		if (res.interests) {
			setInterestsList(res.interests);
		}
	}, []);

	const ageMask = createNumberMask({
		...defaultMaskOptions,
	});

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			var newTagVal = document.getElementById('TagInputField').value;
			newTagVal = newTagVal.toLowerCase();
			if (
				newTagVal.length > 0 &&
				!interestsList.includes(newTagVal) &&
				interestsList.length <= MAX_NUM_TAGS
			) {
				setInterestsList(interestsList => [...interestsList, newTagVal]);
				document.getElementById('TagInputField').value = '';
				setShowTagInsn(false);
			}
		}
	};

	const handleChange = () => {
		const tagLength = document.getElementById('TagInputField').value.trim().length;
		if (showTagInsn && tagLength == 0) {
			setShowTagInsn(false);
		} else if (!showTagInsn && tagLength > 0) {
			setShowTagInsn(true);
		}
	};

	const handleDeleteTag = tagVal => {
		const index = interestsList.indexOf(tagVal);
		if (index > -1) {
			setInterestsList(interestsList.filter(val => val !== tagVal));
		}
	};

	const onSubmitClick = async () => {
		if (!firstName || !lastName) {
			alert('Please Fill First Name and Last Name Text Fields!');
			return;
		}

		const formattedProfileInfo = {
			firstName: firstName,
			lastName: lastName,
			headline: headline,
			age: age,
			gender: gender,
			funFact: funFact,
			interests: interestsList,
		};

		const res = await editProfile(formattedProfileInfo);
		if (res && selectedImage) {
			await uploadFile(selectedImage, Cookies.get('userId'), fileUsage.profilePicture);
		}

		if (res) window.location = `${ROUTE.PROFILE}?id=${Cookies.get('userId')}`;
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
				<Navigation selectedOption='update' />
				<div className='CreateArea'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Update</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Polish up your user profile</div>
						</div>
					</div>
					<div className='CreateFormArea'>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>First Name:</div>
							<input
								className='UpdateFormRowInput Name'
								placeholder='First Name'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Last Name:</div>
							<input
								className='UpdateFormRowInput Name'
								placeholder='Last Name'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow Proof'>
							<div className='CreateFormRowTitle'>Profile Picture:</div>
							<input
								type='file'
								className='UpdateFormProfileInput'
								accept='image/jpeg, image/png'
								onChange={event => {
									setSelectedImage(event.target.files[0]);
								}}
								required></input>
							{selectedImage ? (
								<div className='UpdateFormProfilePictureWrapper'>
									<img
										className='UpdateFormProfilePicture'
										alt={defaultImage}
										src={URL.createObjectURL(selectedImage)}
									/>
								</div>
							) : (
								<div className='UpdateFormProfilePictureWrapper'>
									<img
										className='UpdateFormProfilePicture'
										alt={defaultImage}
										src={profileInfo.profilePictureLink}
									/>
								</div>
							)}
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Headline:</div>
							<input
								className='UpdateFormRowInput LongText'
								placeholder='Headline about yourself'
								value={headline}
								onChange={e => setHeadline(e.target.value)}
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Age:</div>
							<MaskedInput
								className='UpdateFormRowInput Age'
								mask={ageMask}
								placeholder='Age'
								value={age}
								onChange={e => setAge(e.target.value)}
							/>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Gender:</div>
							<select
								name='gender-select'
								id='gender-select'
								className='UpdateGenderSelect'
								onChange={e => setGender(e.target.value)}>
								{gender == 'Unspecified' ? (
									<option value='Unspecified' selected>
										Unspecified
									</option>
								) : (
									<option value='Unspecified'>Unspecified</option>
								)}
								{gender == 'Male' ? (
									<option value='Male' selected>
										Male
									</option>
								) : (
									<option value='Male'>Male</option>
								)}
								{gender == 'Female' ? (
									<option value='Female' selected>
										Female
									</option>
								) : (
									<option value='Female'>Female</option>
								)}
								{gender == 'Other' ? (
									<option value='Other' selected>
										Other
									</option>
								) : (
									<option value='Other'>Other</option>
								)}
							</select>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Fun Fact:</div>
							<input
								className='UpdateFormRowInput LongText'
								placeholder='Headline about yourself'
								value={funFact}
								onChange={e => setFunFact(e.target.value)}
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle Tags'>Interests:</div>
							<div className='CreateFormRowInputAreaTags'>
								<input
									className='CreateFormRowInput Tag'
									placeholder='i.e. Bowling'
									maxlength='15'
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									id='TagInputField'></input>
								{showTagInsn ? (
									<div className='CreateFormInputTagInsn'>Click Enter to write interest</div>
								) : (
									<div />
								)}
							</div>
						</div>
						<div className='CreateFormRow Tags'>
							<div className='CreateFormRowTitle'></div>
							<div className='CreateFormTagsArea'>
								{interestsList.length > 0 ? (
									interestsList.map(tag => (
										<div className='CreateFormTagEntry' key={tag}>
											<div
												className='CreateFormTagEntryX'
												id={tag}
												onClick={() => handleDeleteTag(tag)}>
												<FontAwesomeIcon icon={faTimes} />
											</div>
											{tag}
										</div>
									))
								) : (
									<div />
								)}
							</div>
						</div>
						<div className='CreateFormButtonArea'>
							<div
								className='CreateFormButton Submit'
								onClick={onSubmitClick}
								style={{ textDecoration: 'none', cursor: 'pointer' }}>
								Submit
							</div>
							<Link
								to={`${ROUTE.PROFILE}?id=${Cookies.get('userId')}`}
								style={{ textDecoration: 'none' }}>
								<div className='CreateFormButton Clear'>Back</div>
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
		</React.Fragment>
	);
}

export default Update;
