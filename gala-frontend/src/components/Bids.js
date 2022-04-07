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
			const bidAmount = '$' + parseFloat(item.bidAmount).toFixed(2);
			const bidAmountNum = item.bidAmount;
			const highestBid = '$' + parseFloat(item.highestBid).toFixed(2);
			const title = item.postId.title.toUpperCase();
			const auctionPrice = '$' + parseFloat(item.postId.price).toFixed(2);
			const profileName = item.user_profile[0].firstName;
			const profileRating = Math.round(item.user_profile[0].rating * 2) / 2;
			const profileImage = item.user_profile[0].profilePictureLink;
			const timestampObject = item.postId.timeCreated;
			let textHash =
				bidAmount +
				'#' +
				highestBid +
				'#' +
				title +
				'#' +
				auctionPrice +
				'#' +
				profileName +
				'#' +
				profileRating +
				'#' +
				profileImage;
			textHash = textHash.toLowerCase();

			return {
				bidAmount: bidAmount,
				bidAmountNum: bidAmountNum,
				highestBid: highestBid,
				title: title,
				auctionPrice: auctionPrice,
				profileName: profileName,
				profileRating: profileRating,
				profileImage: profileImage,
				timestampObject: timestampObject,
				textHash: textHash,
			};
		});

		setEntryDataRec(entryDataRecProcessed);
		setEntryDataRecCleaned(entryDataRecProcessed);

		const entryDataSentRaw = await getBidsSent();

		const entryDataSentProcessed = entryDataSentRaw.data.map(item => {
			const bidAmount = '$' + parseFloat(item.bidAmount).toFixed(2);
			const bidAmountNum = item.bidAmount;
			const highestBid = '$' + parseFloat(item.highestBid).toFixed(2);
			const title = item.postId.title.toUpperCase();
			const auctionPrice = '$' + parseFloat(item.postId.price).toFixed(2);
			const profileName = item.user_profile[0].firstName;
			const profileRating = Math.round(item.user_profile[0].rating * 2) / 2;
			const profileImage = item.user_profile[0].profilePictureLink;
			const timestampObject = item.postId.timeCreated;
			let textHash =
				bidAmount +
				'#' +
				highestBid +
				'#' +
				title +
				'#' +
				auctionPrice +
				'#' +
				profileName +
				'#' +
				profileRating +
				'#' +
				profileImage;
			textHash = textHash.toLowerCase();

			return {
				bidAmount: bidAmount,
				bidAmountNum: bidAmountNum,
				highestBid: highestBid,
				title: title,
				auctionPrice: auctionPrice,
				profileName: profileName,
				profileRating: profileRating,
				profileImage: profileImage,
				timestampObject: timestampObject,
				textHash: textHash,
			};
		});

		setEntryDataSent(entryDataSentProcessed);
		setEntryDataSentCleaned(entryDataSentProcessed);

		setShowBidsEntries(true);
	}, []);

	const handleToolbarSearch = isReceived => {
		if (isReceived) {
			const searchText = document.getElementById('BidsReceivedToolbarSearch').value.trim();
			const entryDataProcessed = entryDataRec.filter(item => {
				return item.textHash.includes(searchText.toLowerCase());
			});
			setEntryDataRecCleaned(entryDataProcessed);
		} else {
			const searchText = document.getElementById('BidsSentToolbarSearch').value.trim();
			const entryDataProcessed = entryDataSent.filter(item => {
				return item.textHash.includes(searchText.toLowerCase());
			});
			setEntryDataSentCleaned(entryDataProcessed);
		}
	};

	const handleSorting = isReceived => {
		var sortType = 'highest';
		if (isReceived) {
			if (document.getElementById('BidsReceivedToolbarSort') !== null) {
				sortType = document.getElementById('BidsReceivedToolbarSort').value;
			}
		} else {
			if (document.getElementById('BidsSentToolbarSort') !== null) {
				sortType = document.getElementById('BidsSentToolbarSort').value;
			}
		}

		var entryDataProcessed;
		if (isReceived) {
			entryDataProcessed = entryDataRecCleaned;
		} else {
			entryDataProcessed = entryDataSentCleaned;
		}

		switch (sortType) {
			case 'highest':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return b.bidAmountNum - a.bidAmountNum;
				});
				break;
			case 'lowest':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return a.bidAmountNum - b.bidAmountNum;
				});
				break;
			case 'most_recent':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return b.timestampObject - a.timestampObject;
				});
				break;
			case 'least_recent':
				entryDataProcessed = entryDataProcessed.sort((a, b) => {
					return a.timestampObject - b.timestampObject;
				});
				break;
		}

		if (isReceived) {
			setEntryDataRecCleaned(entryDataProcessed.slice());
		} else {
			setEntryDataSentCleaned(entryDataProcessed.slice());
		}
	};

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
									<input
										id='BidsReceivedToolbarSearch'
										className='BidsToolbarSearch'
										placeholder='Search by keyword'
										onChange={e => handleToolbarSearch(true)}></input>
									<select
										id='BidsReceivedToolbarSort'
										className='BidsToolbarSelect'
										onChange={e => handleSorting(true)}>
										<option value='highest' selected disabled hidden>
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
									<input
										id='BidsSentToolbarSearch'
										className='BidsToolbarSearch'
										placeholder='Search by keyword'
										onChange={e => handleToolbarSearch(false)}></input>
									<select
										id='BidsSentToolbarSort'
										className='BidsToolbarSelect'
										onChange={e => handleSorting(false)}>
										<option value='highest' selected disabled hidden>
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
