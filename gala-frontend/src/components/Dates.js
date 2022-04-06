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
		const entryDataRaw = await getDates();
		console.log(entryDataRaw);

		const entryDataUpcomingProcessed = entryDataRaw.data.upcomingDates.map(item => {
			const titleCleaned = item.postId.title.toUpperCase();
			const description = item.postId.description;
			const priceCleaned = '$' + parseFloat(item.postId.price).toFixed(2);
			const cityAddress = item.postId.cityAddress;
			const stateAddress = item.postId.stateAddress;
			const distance = 5; // todo after claire updates backend
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
			const rating = item.hostInfo.rating;
			// todo after claire updates backend
			const profileImage = 'https://gala-app.s3.amazonaws.com/profile-pictures/1649134732730.jpg';
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
				startDateCleand: startDateCleaned,
				status: status,
				firstName: firstName,
				rating: rating,
				profileImage: profileImage,
				textHash: textHash,
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
			const distance = 5; // todo after claire updates backend
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
			const rating = item.hostInfo.rating;
			// todo after claire updates backend
			const profileImage = 'https://gala-app.s3.amazonaws.com/profile-pictures/1649134732730.jpg';
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
				startDateCleand: startDateCleaned,
				status: status,
				firstName: firstName,
				rating: rating,
				profileImage: profileImage,
				textHash: textHash,
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
			const distance = 5; // todo after claire updates backend
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
			// todo after claire updates backend
			const profileImage = 'https://gala-app.s3.amazonaws.com/profile-pictures/1649134732730.jpg';
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
				startDateCleand: startDateCleaned,
				status: status,
				firstName: firstName,
				profileRating: profileRating,
				profileImage: profileImage,
				textHash: textHash,
			};
		});

		setEntryDataPast(entryDataPastProcessed);
		setEntryDataPastCleaned(entryDataPastProcessed);

		setShowDatesEntries(true);
	}, []);

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
									<input className='BidsToolbarSearch' placeholder='Search by keyword'></input>
									<select
										name='upcoming-dates-sort'
										id='upcoming-dates-sort'
										className='BidsToolbarSelect'>
										<option value='most_recent' selected disabled hidden>
											Sort by
										</option>
										<option value='most_recent'>Most recent</option>
										<option value='least_recent'>Least recent</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									{showDatesEntries ? (
										<div>
											{entryDataCreatedCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataCreatedCleaned.map(data => {
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
									<DatesEntry isUpcoming={true} isOngoing={true} />
									<DatesEntry isUpcoming={true} isOngoing={false} />
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
									<input className='BidsToolbarSearch' placeholder='Search by keyword'></input>
									<select
										name='created-dates-sort'
										id='created-dates-sort'
										className='BidsToolbarSelect'>
										<option value='most_recent' selected disabled hidden>
											Sort by
										</option>
										<option value='most_recent'>Most recent</option>
										<option value='least_recent'>Least recent</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									<DatesEntry isUpcoming={false} isOwn={true} />
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
									<input className='BidsToolbarSearch' placeholder='Search by keyword'></input>
									<select name='past-dates-sort' id='past-dates-sort' className='BidsToolbarSelect'>
										<option value='most_recent' selected disabled hidden>
											Sort by
										</option>
										<option value='most_recent'>Most recent</option>
										<option value='least_recent'>Least recent</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									<DatesEntry isUpcoming={false} />
									<DatesEntry isUpcoming={false} />
									<DatesEntry isUpcoming={false} />
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
