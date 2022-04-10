import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/BidsEntry.css';
import defaultImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { withdrawBid, denyBid } from '../axios/bids.js';

import ROUTE from '../configurations/route-frontend-config.js';

function BidsEntry(props) {
	const onWithdrawClick = async () => {
		await withdrawBid(props.data.bidId);
		window.location.reload(false);
	};

	const onDenyClick = async () => {
		await denyBid(props.data.bidId);
		window.location.reload(false);
	};

	return (
		<React.Fragment>
			{props.isReceived ? (
				// Component for received bids
				<div className='BidsEntryPaper'>
					<div className='ExploreEntryProfileAreaWrapper'>
						<Link
							to={`${ROUTE.PROFILE}?id=${props.data.userId}`}
							style={{ textDecoration: 'none' }}>
							<div className='ExploreEntryProfileArea'>
								<img
									src={props.data.profileImage ? props.data.profileImage : defaultImage}
									className='ExploreEntryProfileImage'
								/>
								<div className='ExploreEntryProfileText' style={{ color: 'black' }}>
									{props.data.profileName}
								</div>
								<div className='ExploreEntryProfileStars'>
									{[...Array(5)].map((x, i) => {
										return props.data.profileRating >= i + 1 ? (
											<FaStar fontSize='11px' color='#424242' />
										) : (
											<React.Fragment>
												{props.data.profileRating > i ? (
													<FaStarHalfAlt fontSize='11px' color='#424242' />
												) : (
													<FaRegStar fontSize='11px' color='#424242' />
												)}
											</React.Fragment>
										);
									})}
								</div>
							</div>
						</Link>
					</div>
					<div className='ExploreEntryRightArea'>
						<div className='ExploreEntryDescriptionArea'>
							<div className='BidsEntryDescriptionTitle'>
								<div className='ExploreEntryDescriptionTitleMain'>{props.data.title}</div>
								<div className='BidsEntryDescriptionTitleSub'>
									Auction Price: {props.data.auctionPrice}
								</div>
								<div className='BidsEntryDescriptionTitleSub'>
									Highest Bid: <b>{props.data.highestBid}</b>
								</div>
							</div>
						</div>
						<div className='BidsEntryBottomArea'>
							<div className='BidsEntryBottomLeftArea'>
								<div className='BidsEntryBottomLeftAreaRow'>
									<div className='BidsEntryBottomLeftAreaRowChevron'>
										<FontAwesomeIcon icon={faChevronRight} />
									</div>
									{props.data.profileName}'s Bid:
									<div className='BidsEntryBottomLeftAreaRowPrice'>
										<b>{props.data.bidAmount}</b>
									</div>
								</div>
							</div>
							<div className='BidsEntryBottomRightArea'>
								<div className='BidsEntryBottomRightAreaRow'>
									<Link
										to={`${ROUTE.CONFIRM}?id=${props.data.bidId}`}
										style={{ textDecoration: 'none' }}>
										<div className='BidsEntryBottomRightAreaWidget Confirm'>Click to Confirm</div>
									</Link>
									<div
										className='BidsEntryBottomRightAreaWidget Deny'
										onClick={onDenyClick}
										style={{ textDecoration: 'none', cursor: 'pointer' }}>
										Click to Deny
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				// Component for sent bids
				<div className='BidsEntryPaper'>
					<div className='ExploreEntryProfileAreaWrapper'>
						<div className='ExploreEntryProfileArea'>
							<img
								src={props.data.profileImage ? props.data.profileImage : defaultImage}
								className='ExploreEntryProfileImage'
							/>
							<div className='ExploreEntryProfileText'>{props.data.profileName}</div>
							<div className='ExploreEntryProfileStars'>
								{[...Array(5)].map((x, i) => {
									return props.data.profileRating >= i + 1 ? (
										<FaStar fontSize='11px' color='#424242' />
									) : (
										<React.Fragment>
											{props.data.profileRating > i ? (
												<FaStarHalfAlt fontSize='11px' color='#424242' />
											) : (
												<FaRegStar fontSize='11px' color='#424242' />
											)}
										</React.Fragment>
									);
								})}
							</div>
						</div>
					</div>
					<div className='ExploreEntryRightArea'>
						<div className='ExploreEntryDescriptionArea'>
							<div className='BidsEntryDescriptionTitle'>
								<div className='ExploreEntryDescriptionTitleMain'>{props.data.title}</div>
								<div className='BidsEntryDescriptionTitleSub'>
									Auction Price: {props.data.auctionPrice}
								</div>
								<div className='BidsEntryDescriptionTitleSub'>
									Highest Bid: <b>{props.data.highestBid}</b>
								</div>
							</div>
						</div>
						<div className='BidsEntryBottomArea'>
							<div className='BidsEntryBottomLeftArea'>
								<div className='BidsEntryBottomLeftAreaRow'>
									<div className='BidsEntryBottomLeftAreaRowWrapper'>
										<div className='BidsEntryBottomLeftAreaRowChevron'>
											<FontAwesomeIcon icon={faChevronRight} />
										</div>
										Your Bid:
										<div className='BidsEntryBottomLeftAreaRowPrice'>
											<b>{props.data.bidAmount}</b>
										</div>
									</div>
								</div>
								<div className='BidsEntryBottomLeftAreaRow'>
									<i>Status: </i>
									{props.data.bidStatus == 'Confirmed' ? (
										<div className='BidsEntryBottomLeftAreaRowStatus Confirmed'>Confirmed.</div>
									) : props.data.bidStatus == 'Waiting for response' ? (
										<div className='BidsEntryBottomLeftAreaRowStatus Waiting'>
											Waiting for response.
										</div>
									) : (
										<div className='BidsEntryBottomLeftAreaRowStatus Denied'>Denied.</div>
									)}
								</div>
							</div>
							<div className='BidsEntryBottomRightArea'>
								<div className='BidsEntryBottomRightAreaRow'>
									{props.isConfirmed ? (
										<Link to={ROUTE.PAYMENT} style={{ textDecoration: 'none' }}>
											<div className='BidsEntryBottomRightAreaWidget Confirm'>
												<b>Click to Payment</b>
											</div>
										</Link>
									) : (
										<div
											className='BidsEntryBottomRightAreaWidget Deny'
											onClick={onWithdrawClick}
											style={{ textDecoration: 'none', cursor: 'pointer' }}>
											Click to Withdraw
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

export default BidsEntry;
