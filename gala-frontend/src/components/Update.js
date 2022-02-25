import React, { useState, useImage } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../axios/posts.js';

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
	const [interestsList, setInterestsList] = useState(['food', 'dancing', 'bowling']);
	const [showTagInsn, setShowTagInsn] = useState(false);

	const [selectedImage, setSelectedImage] = useState(null);

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
								defaultValue='Kanishka'
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Last Name:</div>
							<input
								className='UpdateFormRowInput Name'
								placeholder='Last Name'
								defaultValue='Ragula'
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow Proof'>
							<div className='CreateFormRowTitle'>Profile Picture:</div>
							<input
								type='file'
								className='UpdateFormProfileInput'
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
									<img className='UpdateFormProfilePicture' alt={defaultImage} src={testImage} />
								</div>
							)}
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Headline:</div>
							<input
								className='UpdateFormRowInput LongText'
								placeholder='Headline about yourself'
								defaultValue="Hi! I'm Kanishka and I'm an investment banker."
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Age:</div>
							<MaskedInput
								className='UpdateFormRowInput Age'
								mask={ageMask}
								placeholder='Age'
								value='20'
							/>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Gender:</div>
							<select name='gender-select' id='gender-select' className='UpdateGenderSelect'>
								<option value='unspecified' selected disabled>
									Unspecified
								</option>
								<option value='man'>Man</option>
								<option value='woman'>Woman</option>
								<option value='other'>Other</option>
							</select>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Fun Fact:</div>
							<input
								className='UpdateFormRowInput LongText'
								placeholder='Headline about yourself'
								defaultValue='I have a twin brother.'
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
							<Link to={ROUTE.PROFILE} style={{ textDecoration: 'none' }}>
								<div className='CreateFormButton Submit'>Submit</div>
							</Link>
							<Link to={ROUTE.PROFILE} style={{ textDecoration: 'none' }}>
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
