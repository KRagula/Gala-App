import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/DatesEntry.css';
import defaultImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import ROUTE from '../configurations/route-frontend-config.js';

function DatesEntry(props) {
	return (
		<React.Fragment>
			<div className='DatesEntryPaper'>
				<div className='ExploreEntryProfileAreaWrapper'>
					<Link to={`${ROUTE.PROFILE}?id=${props.data.userId}`} style={{ textDecoration: 'none' }}>
						<div className='ExploreEntryProfileArea'>
							<img
								src={props.data.profileImage ? props.data.profileImage : defaultImage}
								className='ExploreEntryProfileImage'
							/>
							<div className='ExploreEntryProfileText' style={{ color: 'black' }}>
								{props.data.firstName}
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
				<div className='DatesEntryRightArea'>
					<div className='DatesEntryDescriptionArea'>
						<div className='DatesEntryDescriptionTitle'>
							<div className='ExploreEntryDescriptionTitleMain'>{props.data.title}</div>
							<div className='ExploreEntryDescriptionTitleSub'>{props.data.description}</div>
						</div>
						<div className='ExploreEntryDescriptionLogistics'>
							<div>{props.data.price}</div>
							<div className='ExploreEntryDot' />
							<div>
								{props.data.city}, {props.data.state} ({props.data.distance} mi)
							</div>
							<div className='ExploreEntryDot' />
							<div>{props.data.startDateCleaned}</div>
						</div>
					</div>
					<div className='DatesEntryBottomArea'>
						<div className='BidsEntryBottomLeftArea'>
							<div className='BidsEntryBottomLeftAreaRow'>
								{!props.isOwn ? (
									<div className='DatesEntryBottomLeftAreaRowStatusWrapper'>
										<i>Status: </i>
										{props.isUpcoming ? (
											props.isOngoing ? (
												<div className='BidsEntryBottomLeftAreaRowStatus Ongoing'>Ongoing.</div>
											) : (
												<div className='BidsEntryBottomLeftAreaRowStatus Confirmed'>Confirmed.</div>
											)
										) : (
											<div className='BidsEntryBottomLeftAreaRowStatus Completed'>Completed.</div>
										)}
									</div>
								) : (
									<div />
								)}
							</div>
						</div>
						<div className='BidsEntryBottomRightArea'>
							<div className='BidsEntryBottomRightAreaRow'>
								<Link
									to={`${ROUTE.LISTING}?id=${props.data.postId}`}
									style={{ textDecoration: 'none' }}>
									<div className='BidsEntryBottomRightAreaWidget Confirm'>Click for details</div>
								</Link>
								{props.isUpcoming ? (
									<div className='BidsEntryBottomRightAreaWidget Deny'>Click to withdraw</div>
								) : (
									<div />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default DatesEntry;
