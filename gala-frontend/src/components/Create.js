import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Create.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../axios/posts.js';

import ROUTE from '../configurations/route-frontend-config.js';

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

const MAX_NUM_TAGS = 10;

function Create() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [title, setTitle] = useState('');
	const [descriptionEvent, setDescriptionEvent] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');
	const [stateLoc, setStateLoc] = useState('');
	const [priceExp, setPriceExp] = useState('');

	const currencyMask = createNumberMask({
		...defaultMaskOptions,
	});

	const [tagsList, setTagsList] = useState([]);
	const [showTagInsn, setShowTagInsn] = useState(false);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			var newTagVal = document.getElementById('TagInputField').value;
			newTagVal = newTagVal.toLowerCase();
			if (
				newTagVal.length > 0 &&
				!tagsList.includes(newTagVal) &&
				tagsList.length <= MAX_NUM_TAGS
			) {
				setTagsList(tagsList => [...tagsList, newTagVal]);
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
		const index = tagsList.indexOf(tagVal);
		if (index > -1) {
			setTagsList(tagsList.filter(val => val !== tagVal));
		}
	};

	const onSubmit = event => {
		//event.preventDefault(); Take out once we can redirect to a post
		const newPost = {
			title: title,
			description: descriptionEvent,
			streetAddress: street,
			cityAddress: city,
			stateAddress: stateLoc,
			zipAddress: zip,
			timeStart: startDate,
			timeEnd: endDate,
			price: priceExp,
			tags: tagsList,
			hostEmail: 'fillerUseCookies@gmail.com', //TODO: USE HOST ID
		};
		createPost(newPost);
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
				<Navigation selectedOption='create' />
				<div className='CreateArea'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Create</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Propose a date and meet new friends</div>
						</div>
					</div>
					<div className='CreateFormArea'>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Title:</div>
							<input
								className='CreateFormRowInput'
								placeholder='Title of Experience'
								onChange={event => setTitle(event.target.value)}
								id='TitleInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Description:</div>
							<input
								className='CreateFormRowInput'
								placeholder='Description of Experience'
								onChange={event => setDescriptionEvent(event.target.value)}
								id='DescriptionInputField'></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Address:</div>
							<div className='CreateFormInputAreaAddress'>
								<div className='CreateFormInputAreaRowAddress AddressFirst'>
									<input
										className='CreateFormRowInputAddress'
										placeholder='Street Name'
										onChange={event => setStreet(event.target.value)}
										id='StreetInputField'></input>
								</div>
								<div className='CreateFormInputAreaRowAddress'>
									<input
										className='CreateFormRowInputAddress'
										placeholder='City'
										onChange={event => setCity(event.target.value)}
										id='CityInputField'></input>
									<input
										className='CreateFormRowInputAddress'
										placeholder='State'
										onChange={event => setStateLoc(event.target.value)}
										id='StateInputField'></input>
									<input
										className='CreateFormRowInputAddress'
										placeholder='ZIP Code'
										onChange={event => setZip(event.target.value)}
										id='ZipInputField'></input>
								</div>
							</div>
						</div>
						<div className='CreateFormRow Time'>
							<div className='CreateFormRowTitle Time'>Time:</div>
							<div className='CreateFormInputAreaTime'>
								<div className='CreateFormDateTime'>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DesktopDateTimePicker
											value={startDate}
											onChange={newStartDate => {
												setStartDate(newStartDate);
											}}
											renderInput={params => <TextField {...params} />}
											minDate={new Date()}
										/>
									</LocalizationProvider>
								</div>
								<div className='CreateFormTimeBetweenText'>
									<div>to</div>
								</div>
								<div className='CreateFormDateTime'>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DesktopDateTimePicker
											value={endDate}
											onChange={newEndDate => {
												setEndDate(newEndDate);
											}}
											renderInput={params => <TextField {...params} />}
											minDate={startDate}
										/>
									</LocalizationProvider>
								</div>
							</div>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle'>Auction Price:</div>
							<MaskedInput
								className='CreateFormRowInput Price'
								mask={currencyMask}
								onChange={event => setPriceExp(event.target.value)}
								placeholder='$0.00'
							/>
						</div>
						<div className='CreateFormRow Proof'>
							<div className='CreateFormRowTitle'>Proof of Experience:</div>
							<input type='file' className='CreateFormInputProof' required></input>
						</div>
						<div className='CreateFormRow'>
							<div className='CreateFormRowTitle Tags'>Tags:</div>
							<div className='CreateFormRowInputAreaTags'>
								<input
									className='CreateFormRowInput Tag'
									placeholder='Fun'
									maxlength='15'
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									id='TagInputField'></input>
								{showTagInsn ? (
									<div className='CreateFormInputTagInsn'>Click Enter to write tag</div>
								) : (
									<div />
								)}
							</div>
						</div>
						<div className='CreateFormRow Tags'>
							<div className='CreateFormRowTitle'></div>
							<div className='CreateFormTagsArea'>
								{tagsList.length > 0 ? (
									tagsList.map(tag => (
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
							<Link to={ROUTE.MYDATES} style={{ textDecoration: 'none' }}>
								<div className='CreateFormButton Submit' onClick={onSubmit}>
									Submit
								</div>
							</Link>
							<div className='CreateFormButton Clear'>Clear</div>
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

export default Create;
