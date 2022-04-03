import React, { useState, setState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ExploreEntry from './ExploreEntry';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Explore.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '@material-ui/lab/Pagination';
import { ShimmerCategoryItem } from 'react-shimmer-effects';

import { getNearbyPosts } from '../axios/posts';

const { Anime } = ReactAnime;

function Explore() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [range, setRange] = useState(10);

	const [entryData, setEntryData] = useState([]);
	const [entryDataCleaned, setEntryDataCleaned] = useState([]);
	const [showExploreEntries, setShowExploreEntries] = useState(false);

	const onRetrievePosition = async position => {
		const positionData = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			range: range * 1609.34,
			startDate: startDate,
			endDate: endDate,
		};

		const nearbyPosts = await getNearbyPosts(positionData);
		console.log(nearbyPosts);
		if (typeof nearbyPosts === 'undefined') {
			setShowExploreEntries(true);
			return;
		}

		setEntryData(
			nearbyPosts.data.map(item => {
				const titleCleaned = item.title.toUpperCase();
				const priceCleaned = '$' + parseFloat(item.price).toFixed(2);
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

				let textHash =
					titleCleaned +
					'#' +
					priceCleaned +
					'#' +
					item.description +
					'#' +
					item.cityAddress +
					'#' +
					item.stateAddress;
				item.tags.forEach(tag => {
					textHash = textHash + '#' + tag;
				});
				textHash = textHash.toLowerCase();

				return {
					title: titleCleaned,
					description: item.description,
					price: priceCleaned,
					city: item.cityAddress,
					state: item.stateAddress,
					startDate: startDateCleaned,
					tags: item.tags,
					startDateObject: startDateObject,
					priceValue: item.price,
					textHash: textHash,
				};
			})
		);
		console.log(entryData);

		setEntryDataCleaned(entryData);
		setShowExploreEntries(true);
	};

	const getEntryData = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onRetrievePosition);
		} else {
			document.innerHTML = 'Geolocation is not supported by this browser.';
		}
	};

	if (showExploreEntries === false) {
		getEntryData();
	}

	const handleToolbarSearch = () => {
		const searchText = document.getElementById('ExploreToolbarSearch').value.trim();
		const entryDataProcessed = entryData.filter(item => {
			return item.textHash.includes(searchText.toLowerCase());
		});
		console.log(entryDataProcessed);
		setEntryDataCleaned(entryDataProcessed);
	};

	const handleSorting = () => {
		const sortType = document.getElementById('ExploreToolbarSelect').value;
		let entryDataProcessed = entryData;
		switch (sortType) {
			case 'earliest':
				entryDataProcessed = entryDataCleaned.sort((a, b) => {
					return a.startDateObject - b.startDateObject;
				});
				break;
			case 'latest':
				entryDataProcessed = entryDataCleaned.sort((a, b) => {
					return b.startDateObject - a.startDateObject;
				});
				break;
			case 'lowest':
				entryDataProcessed = entryDataCleaned.sort((a, b) => {
					return a.priceValue - b.priceValue;
				});
				break;
			case 'highest':
				entryDataProcessed = entryDataCleaned.sort((a, b) => {
					return b.priceValue - a.priceValue;
				});
				break;
		}
		setEntryDataCleaned(entryDataProcessed.slice());
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
				<Navigation selectedOption='explore' />
				<div className='ExploreArea'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>Explore</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Find potential dates in your area</div>
						</div>
					</div>
					<div className='ExploreToolbarArea'>
						<div className='ExploreToolbarLeftArea'>
							<input
								className='ExploreToolbarSearch'
								id='ExploreToolbarSearch'
								placeholder='Search by keyword'
								onChange={handleToolbarSearch}></input>
							<div className='DatePickerArea'>
								<DatePicker selected={startDate} onChange={date => setStartDate(date)} />
								<div className='DatePickerBetweenText'>to</div>
								<DatePicker selected={endDate} onChange={date => setEndDate(date)} />
							</div>
						</div>
						<div className='ExploreToolbarRightArea'>
							<select
								name='explore-distance'
								id='explore-distance'
								className='ExploreToolbarSelect'>
								<option value='none' selected disabled hidden>
									Distance
								</option>
								<option value='one_mile'>1 mile</option>
								<option value='five_miles'>5 miles</option>
								<option value='ten_miles'>10 miles</option>
								<option value='fifty_miles'>50 miles</option>
							</select>
							<select
								id='ExploreToolbarSelect'
								className='ExploreToolbarSelect'
								onChange={handleSorting}>
								<option value='none' selected disabled hidden>
									Sort by
								</option>
								<option value='most_recent'>Most recent</option>
								<option value='least_recent'>Least recent</option>
								<option value='earliest'>Earliest</option>
								<option value='latest'>Latest</option>
								<option value='lowest'>Lowest $$</option>
								<option value='highest'>Highest $$</option>
							</select>
						</div>
					</div>
					<div className='ExploreEntryArea'>
						{showExploreEntries ? (
							<div>
								{entryDataCleaned.length > 0 ? (
									<React.Fragment>
										{entryDataCleaned.map(data => {
											return <ExploreEntry data={data} />;
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

export default Explore;
