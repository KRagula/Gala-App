import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import BidsEntry from './BidsEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactAnime from 'react-animejs';
import '../css/Bids.css';
import { getBidsReceived } from '../axios/bids';

const { Anime } = ReactAnime;

function Bids() {
	const [entryDataReceived, setEntryDataReceived] = useState([]);
	const [entryDataSent, setEntryDataSent] = useState([]);
	const [showExploreEntries, setShowExploreEntries] = useState(false);

	useEffect(async () => {
		const test = await getBidsReceived();
		console.log(test);
		// todo for robin: console log this test and integrate with forntend
	}, []);

	const [collapseFirst, setCollapseFirst] = useState(false);
	const [collapseSecond, setCollapseSecond] = useState(false);

	const handleCollapseFirst = () => {
		setCollapseFirst(!collapseFirst);
	};

	const handleCollapseSecond = () => {
		setCollapseSecond(!collapseSecond);
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
				<Navigation selectedOption='bids' />
				<div className='BidsArea'>
					<div className='DashboardTitleDescriptionAreaWrapper'>
						<div className='DashboardTitleDescriptionArea' id='DashboardTitleDescriptionArea'>
							<div className='DashboardTitleText'>My Bids</div>
							<div className='DashboardTitleDot' />
							<div className='DashboardDescriptionText'>Confirm or withdraw a bid</div>
						</div>
					</div>

					<div className='BidsCollapsableArea'>
						<div className='BidsCollapseBar'>
							<div className='BidsCollapseText'>Bids Received</div>
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
										name='received-bids-sort'
										id='received-bids-sort'
										className='BidsToolbarSelect'>
										<option value='none' selected disabled hidden>
											Sort by
										</option>
										<option value='highest'>Highest $$</option>
										<option value='lowest'>Lowest $$</option>
										<option value='most_recent'>Most recent</option>
										<option value='least_recent'>Least recent</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									<BidsEntry isReceived={true} />
									<BidsEntry isReceived={true} />
								</div>
							</div>
						) : (
							<div />
						)}
					</div>
					<div className='BidsCollapsableArea'>
						<div className='BidsCollapseBar'>
							<div className='BidsCollapseText'>Bids Sent</div>
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
									<select name='sent-bids-sort' id='sent-bids-sort' className='BidsToolbarSelect'>
										<option value='none' selected disabled hidden>
											Sort by
										</option>
										<option value='highest'>Highest $$</option>
										<option value='lowest'>Lowest $$</option>
										<option value='most_recent'>Most recent</option>
										<option value='least_recent'>Least recent</option>
									</select>
								</div>
								<div className='BidsEntryArea'>
									<BidsEntry isReceived={true} />
									<BidsEntry isReceived={true} />
								</div>
								<div className='BidsEntryArea'>
									<BidsEntry isReceived={false} isConfirmed={true} />
									<BidsEntry isReceived={false} isConfirmed={false} />
									<BidsEntry isReceived={false} isConfirmed={false} />
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

export default Bids;
