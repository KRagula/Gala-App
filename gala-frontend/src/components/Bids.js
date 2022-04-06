import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import BidsEntry from './BidsEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactAnime from 'react-animejs';
import '../css/Bids.css';
import { getBidsReceived, getBidsSent } from '../axios/bids';
import { ShimmerCategoryItem } from 'react-shimmer-effects';

const { Anime } = ReactAnime;

function Bids() {
	const [entryDataRec, setEntryDataRec] = useState([]);
	const [entryDataRecCleaned, setEntryDataRecCleaned] = useState([]);
	const [entryDataSent, setEntryDataSent] = useState([]);
	const [entryDataSentCleaned, setEntryDataSentCleaned] = useState([]);
	const [showBidsEntries, setShowBidsEntries] = useState(false);

	useEffect(async () => {
		const entryDataRecRaw = await getBidsReceived();

		const entryDataRecProcessed = entryDataRecRaw.data.map(item => {
			const bidAmount = item.bidAmount;
			const highestBid = item.highestBid;
			const title = item.postId.title;
			const auctionPrice = item.postId.price;
			const bidderName = item.user_profile[0].firstName;
			const bidderRating = 2.5; // todo after claire updates backend
			const bidderImage = item.user_profile[0].profilePicture;
			const timestampObject = new Date(); // todo after claire updates backend
			const textHash =
				bidAmount +
				'#' +
				highestBid +
				'#' +
				title +
				'#' +
				auctionPrice +
				'#' +
				bidderName +
				'#' +
				bidderRating +
				'#' +
				bidderImage;

			return {
				bidAmount: bidAmount,
				highestBid: highestBid,
				title: title,
				auctionPrice: auctionPrice,
				bidderName: bidderName,
				bidderRating: bidderRating,
				bidderImage: bidderImage,
				timestampObject: timestampObject,
				textHash: textHash,
			};
		});

		setEntryDataRec(entryDataRecProcessed);
		setEntryDataRecCleaned(entryDataRecProcessed);

		const entryDataSentRaw = await getBidsSent();
		console.log(entryDataSentRaw);

		const entryDataSentProcessed = entryDataSentRaw.data.map(item => {
			const bidAmount = item.bidAmount;
			const highestBid = item.highestBid;
			const title = item.postId.title;
			const auctionPrice = item.postId.price;
			const bidderName = item.user_profile[0].firstName;
			const bidderRating = 2.5; // todo after claire updates backend
			const bidderImage = item.user_profile[0].profilePicture;
			const timestampObject = new Date(); // todo after claire updates backend
			const textHash =
				bidAmount +
				'#' +
				highestBid +
				'#' +
				title +
				'#' +
				auctionPrice +
				'#' +
				bidderName +
				'#' +
				bidderRating +
				'#' +
				bidderImage;

			return {
				bidAmount: bidAmount,
				highestBid: highestBid,
				title: title,
				auctionPrice: auctionPrice,
				bidderName: bidderName,
				bidderRating: bidderRating,
				bidderImage: bidderImage,
				timestampObject: timestampObject,
				textHash: textHash,
			};
		});

		setEntryDataSent(entryDataSentProcessed);
		setEntryDataSentCleaned(entryDataSentProcessed);

		setShowBidsEntries(true);
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
									{showBidsEntries ? (
										<div>
											{entryDataRecCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataRecCleaned.map(data => {
														return <BidsEntry isReceived={true} data={data} />;
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
									{showBidsEntries ? (
										<div>
											{entryDataSentCleaned.length > 0 ? (
												<React.Fragment>
													{entryDataSentCleaned.map(data => {
														console.log(data);
														return <BidsEntry isReceived={false} data={data} isConfirmed={false} />; // todo: update hardcode isConfirmed
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

export default Bids;
