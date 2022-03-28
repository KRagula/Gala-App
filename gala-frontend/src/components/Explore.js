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

import { getNearbyPosts } from '../axios/posts';

const { Anime } = ReactAnime;

function Explore() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const [entryData, setEntryData] = useState([]);
	const [showExploreEntries, setShowExploreEntries] = useState(false);

	const onRetrievePosition = async position => {
		const positionData = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			range: 200000,
		};

		const nearbyPosts = await getNearbyPosts(positionData);
		console.log(nearbyPosts);
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

				return {
					title: titleCleaned,
					description: item.description,
					price: priceCleaned,
					city: item.cityAddress,
					state: item.stateAddress,
					startDate: startDateCleaned,
					tags: item.tags,
				};
			})
		);

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
							<input className='ExploreToolbarSearch' placeholder='Search by keyword'></input>
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
							<select name='explore-sort' id='explore-sort' className='ExploreToolbarSelect'>
								<option value='none' selected disabled hidden>
									Sort by
								</option>
								<option value='most_recent'>Most recent</option>
								<option value='least_recent'>Least recent</option>
								<option value='most_recent'>Earliest</option>
								<option value='least_recent'>Latest</option>
								<option value='most_recent'>Highest $$</option>
								<option value='least_recent'>Lowest $$</option>
								<option value='for_you'>For you</option>
							</select>
						</div>
					</div>
					<div className='ExploreEntryArea'>
						{showExploreEntries ? (
							<React.Fragment>
								{entryData.map(data => {
									return <ExploreEntry data={data} />;
								})}
							</React.Fragment>
						) : (
							<div>not received anything yet</div>
						)}
					</div>
					<div className='ExplorePaginationArea'>
						<Pagination count={10} />
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
