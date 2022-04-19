import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import DatesEntry from './DatesEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactAnime from 'react-animejs';
import '../css/Bids.css';
import { getDates } from '../axios/dates';
import { ShimmerCategoryItem } from 'react-shimmer-effects';

const { Anime } = ReactAnime;

function Dates() {
	const [entryDataUpcoming, setEntryDataUpcoming] = useState([]);
	const [entryDataUpcomingCleaned, setEntryDataUpcomingCleaned] = useState([]);
	const [entryDataCreated, setEntryDataCreated] = useState([]);
	const [entryDataCreatedCleaned, setEntryDataCreatedCleaned] = useState([]);
	const [entryDataPast, setEntryDataPast] = useState([]);
	const [entryDataPastCleaned, setEntryDataPastCleaned] = useState([]);
	const [showDatesEntries, setShowDatesEntries] = useState(false);

	useEffect(async () => {
		const getPosition = () => {
			return new Promise((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject)
			);
		};
		const positionData = await getPosition();
		let currentLocation = {
			latitude: positionData.coords.latitude,
			longitude: positionData.coords.longitude,
		};

		// if (navigator.geolocation) {

		// 	navigator.geolocation.getCurrentPosition(position => {

		// 	}

		// 	);

		// }
		// console.log(currentLocation);

		const entryDataRaw = await getDates(currentLocation);

		const entryDataUpcomingProcessed = entryDataRaw.data.upcomingDates.map(item => {
			const titleCleaned = item.postId.title.toUpperCase();
			const description = item.postId.description;
			const priceCleaned = '$' + parseFloat(item.postId.price).toFixed(2);
			const cityAddress = item.postId.cityAddress;
			const stateAddress = item.postId.stateAddress;
			const distance = item.userDistance; // todo after claire updates backend
			const startDateObject = new Date(item.postId.timeStart);
			const month = (startDateObject.getUTCMonth() + 1).toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
			const day = startDateObject
				.getUTCDate()
				.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			const year = startDateObject.getUTCFullYear();
			const startDateCleaned = month + '/' + day + '/' + year;
			const status = item.dateStatus;
			const firstName = item.hostInfo.firstName;
			const profileRating = item.hostInfo.rating;
			const profileImage = item.hostInfo.profilePictureLink;
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
				status +
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
				status: status,
				firstName: firstName,
				profileRating: profileRating,
				profileImage: profileImage,
				textHash: textHash,
				userId: item.hostInfo._id,
				postId: item._id,
			};
		});

		setEntryDataUpcoming(entryDataUpcomingProcessed);
		setEntryDataUpcomingCleaned(entryDataUpcomingProcessed);

		const entryDataCreatedProcessed = entryDataRaw.data.createdDates.map(item => {
			const titleCleaned = item.title.toUpperCase();
			const description = item.description;
			const priceCleaned = '$' + parseFloat(item.price).toFixed(2);
			const cityAddress = item.cityAddress;
			const stateAddress = item.stateAddress;
			const distance = item.userDistance; // todo after claire updates backend
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
			const status = '';
			const firstName = item.hostInfo.firstName;
			const profileRating = item.hostInfo.rating;
			const profileImage = item.hostInfo.profilePictureLink;
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
				status +
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
				status: status,
				firstName: firstName,
				profileRating: profileRating,
				profileImage: profileImage,
				textHash: textHash,
				userId: item.hostInfo._id,
				postId: item._id,
			};
		});

		setEntryDataCreated(entryDataCreatedProcessed);
		setEntryDataCreatedCleaned(entryDataCreatedProcessed);

		const entryDataPastProcessed = entryDataRaw.data.pastDates.map(item => {
			const titleCleaned = item.postId.title.toUpperCase();
			const description = item.postId.description;
			const priceCleaned = '$' + parseFloat(item.postId.price).toFixed(2);
			const cityAddress = item.postId.cityAddress;
			const stateAddress = item.postId.stateAddress;
			const distance = item.userDistance; // todo after claire updates backend
			const startDateObject = new Date(item.postId.timeStart);
			const month = (startDateObject.getUTCMonth() + 1).toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
			const day = startDateObject
				.getUTCDate()
				.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			const year = startDateObject.getUTCFullYear();
			const startDateCleaned = month + '/' + day + '/' + year;
			const status = item.dateStatus;
			const firstName = item.hostInfo.firstName;
			const profileRating = item.hostInfo.rating;
			const profileImage = item.hostInfo.profilePictureLink;
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
				status +
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
				status: status,
				firstName: firstName,
				profileRating: profileRating,
				profileImage: profileImage,
				textHash: textHash,
				userId: item.hostInfo._id,
				postId: item._id,
			};
		});

		setEntryDataPast(entryDataPastProcessed);
		setEntryDataPastCleaned(entryDataPastProcessed);

		setShowDatesEntries(true);
	}, []);

	const handleToolbarSearch = sectionType => {
		if (sectionType === 'upcoming') {
			const searchText = document.getElementById('DatesUpcomingToolbarSearch').value.trim();
			const entryDataProcessed = entryDataUpcoming.filter(item => {
				return item.textHash.includes(searchText.toLowerCase());
			});
			setEntryDataUpcomingCleaned(entryDataProcessed);
		} else if (sectionType === 'created') {
			const searchText = document.getElementById('DatesCreatedToolbarSearch').value.trim();
			const entryDataProcessed = entryDataCreated.filter(item => {
				return item.textHash.includes(searchText.toLowerCase());
			});
			setEntryDataCreatedCleaned(entryDataProcessed);
		} else if (sectionType === 'past') {
			const searchText = document.getElementById('DatesPastToolbarSearch').value.trim();
			const entryDataProcessed = entryDataPast.filter(item => {
				return item.textHash.includes(searchText.toLowerCase());
			});
			setEntryDataPastCleaned(entryDataProcessed);
		}
	};

	const handleSorting = sectionType => {
		var sortType = 'latest';
		if (sectionType === 'upcoming') {
			if (document.getElementById('DatesUpcomingToolbarSort') !== null) {
				sortType = document.getElementById('DatesUpcomingToolbarSort').value;
			}
		} else if (sectionType === 'created') {
			if (document.getElementById('DatesCreatedToolbarSort') !== null) {
				sortType = document.getElementById('DatesCreatedToolbarSort').value;
			}
		} else if (sectionType === 'past') {
			if (document.getElementById('DatesPastToolbarSort') !== null) {
				sortType = document.getElementById('DatesPastToolbarSort').value;
			}
		}

		var entryDataProcessed;
		if (sectionType === 'upcoming') {
			entryDataProcessed = entryDataUpcomingCleaned;
		} else if (sectionType === 'created') {
			entryDataProcessed = entryDataCreatedCleaned;
		} else if (sectionType === 'past') {
			entryDataProcessed = entryDataPastCleaned;
		}

		switch (sortType) {
			case 'latest':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return b.startDateObject - a.startDateObject;
				});
				break;
			case 'earliest':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return a.startDateObject - b.startDateObject;
				});
				break;
		}

		if (sectionType === 'upcoming') {
			setEntryDataUpcomingCleaned(entryDataProcessed.slice());
		} else if (sectionType === 'created') {
			setEntryDataCreatedCleaned(entryDataProcessed.slice());
		} else if (sectionType === 'past') {
			setEntryDataPastCleaned(entryDataProcessed.slice());
		}
	};

	const [collapseFirst, setCollapseFirst] = useState(false);
	const [collapseSecond, setCollapseSecond] = useState(false);
	const [collapseThird, setCollapseThird] = useState(false);

	const handleCollapseFirst = () => {
		setCollapseFirst(!collapseFirst);
	};

	const handleCollapseSecond = () => {
		setCollapseSecond(!collapseSecond);
	};

	const handleCollapseThird = () => {
		setCollapseThird(!collapseThird);
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
			{/* Note: reusing components from Bids and Explore */}
			<div className='DashboardArea'>
				<Navigation selectedOption='dates' />
				<div className='BidsArea'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>My Dates</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>View your past and upcoming dates</div>
						</div>
					</div>
					<div className='BidsCollapsableArea'>
						<div className='BidsCollapseBar'>
							<div className='BidsCollapseText'>Upcoming Dates</div>
							{collapseFirst ? (
								<div className='BidsCollapseArrow' onClick={handleCollapseFirst}>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
							) : (
								<div className='BidsCollapseArrow' onClick={handleCollapseFirst}>
									<FontAwesomeIcon icon={faChevronUp} />
								</div>
							)}
						</div>
						{!collapseFirst ? (
							<div>
								<div className='BidsToolbarArea'>
									<input
										id='DatesUpcomingToolbarSearch'
										className='BidsToolbarSearch'
										placeholder='Search by keyword'
										onChange={e => handleToolbarSearch('upcoming')}></input>
									<select
										id='DatesUpcomingToolbarSort'
										className='BidsToolbarSelect'
										onChange={e => handleSorting('upcoming')}>
										<option value='latest' selected disabled hidden>
											Sort by
										</option>
										<option value='latest'>Latest</option>
										<option value='earliest'>Earliest</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									{showDatesEntries ? (
										<div>
											{entryDataUpcomingCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataUpcomingCleaned.map(data => {
														return (
															<DatesEntry
																isUpcoming={true}
																isOngoing={data.status === 'Ongoing'}
																data={data}
															/>
														);
													})}
												</React.Fragment>
											) : (
												<div> No entries found.</div>
											)}
										</div>
									) : (
										<div>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
										</div>
									)}
								</div>
							</div>
						) : (
							<div />
						)}
					</div>
					<div className='BidsCollapsableArea'>
						<div className='BidsCollapseBar'>
							<div className='BidsCollapseText'>Dates You Created</div>
							{collapseSecond ? (
								<div className='BidsCollapseArrow' onClick={handleCollapseSecond}>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
							) : (
								<div className='BidsCollapseArrow' onClick={handleCollapseSecond}>
									<FontAwesomeIcon icon={faChevronUp} />
								</div>
							)}
						</div>
						{!collapseSecond ? (
							<div>
								<div className='BidsToolbarArea'>
									<input
										id='DatesCreatedToolbarSearch'
										className='BidsToolbarSearch'
										placeholder='Search by keyword'
										onChange={e => handleToolbarSearch('created')}></input>
									<select
										id='DatesCreatedToolbarSort'
										className='BidsToolbarSelect'
										onChange={e => handleSorting('created')}>
										<option value='latest' selected disabled hidden>
											Sort by
										</option>
										<option value='latest'>Latest</option>
										<option value='earliest'>Earliest</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									{showDatesEntries ? (
										<div>
											{entryDataCreatedCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataCreatedCleaned.map(data => {
														return <DatesEntry isUpcoming={false} isOwn={true} data={data} />;
													})}
												</React.Fragment>
											) : (
												<div> No entries found.</div>
											)}
										</div>
									) : (
										<div>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
										</div>
									)}
								</div>
							</div>
						) : (
							<div />
						)}
					</div>
					<div className='BidsCollapsableArea'>
						<div className='BidsCollapseBar'>
							<div className='BidsCollapseText'>Past Dates</div>
							{collapseThird ? (
								<div className='BidsCollapseArrow' onClick={handleCollapseThird}>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
							) : (
								<div className='BidsCollapseArrow' onClick={handleCollapseThird}>
									<FontAwesomeIcon icon={faChevronUp} />
								</div>
							)}
						</div>
						{!collapseThird ? (
							<div>
								<div className='BidsToolbarArea'>
									<input
										id='DatesPastToolbarSearch'
										className='BidsToolbarSearch'
										placeholder='Search by keyword'
										onChange={e => handleToolbarSearch('past')}></input>
									<select
										id='DatesPastToolbarSort'
										className='BidsToolbarSelect'
										onChange={e => handleSorting('past')}>
										<option value='latest' selected disabled hidden>
											Sort by
										</option>
										<option value='latest'>Latest</option>
										<option value='earliest'>Earliest</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									{showDatesEntries ? (
										<div>
											{entryDataPastCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataPastCleaned.map(data => {
														return <DatesEntry isUpcoming={false} data={data} />;
													})}
												</React.Fragment>
											) : (
												<div> No entries found.</div>
											)}
										</div>
									) : (
										<div>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
											<ShimmerCategoryItem
												hasImage
												imageType='circular'
												imageWidth={100}
												imageHeight={100}
												text
												cta
											/>
										</div>
									)}
								</div>
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

export default Dates;
