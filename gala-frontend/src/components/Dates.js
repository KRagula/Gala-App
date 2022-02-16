import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import DatesEntry from './DatesEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactAnime from 'react-animejs';
import '../css/Bids.css';

const { Anime } = ReactAnime;

function Dates() {
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
							<div className='BidsEntryArea'>
								<DatesEntry isUpcoming={true} isOngoing={true} />
								<DatesEntry isUpcoming={true} isOngoing={false} />
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
							<div className='BidsEntryArea'>
								<DatesEntry isUpcoming={false} isOwn={true} />
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
							<div className='BidsEntryArea'>
								<DatesEntry isUpcoming={false} />
								<DatesEntry isUpcoming={false} />
								<DatesEntry isUpcoming={false} />
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
