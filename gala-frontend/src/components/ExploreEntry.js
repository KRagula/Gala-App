import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/ExploreEntry.css';
import testImage from '../assets/default.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import ROUTE from '../configurations/route-frontend-config.js';

function ExploreEntry(props) {
	console.log(props.data);
	return (
		<React.Fragment>
			<div className='ExploreEntryPaper'>
				<div className='ExploreEntryProfileAreaWrapper'>
					<Link
						to={`${ROUTE.PROFILE}?id=${props.data.creatorId._id}`}
						style={{ textDecoration: 'none' }}>
						<div className='ExploreEntryProfileArea'>
							<img
								src={
									props.data.creatorId.profilePictureLink
										? props.data.creatorId.profilePictureLink
										: testImage
								}
								className='ExploreEntryProfileImage'
							/>
							<div className='ExploreEntryProfileText' style={{ color: 'black' }}>
								{props.data.creatorId.firstName}
							</div>
							<div className='ExploreEntryProfileStars'>
								{[...Array(5)].map((x, i) => {
									return Math.round(props.data.creatorId.rating * 2) / 2 >= i + 1 ? (
										<FaStar fontSize='11px' color='#424242' />
									) : (
										<React.Fragment>
											{Math.round(props.data.creatorId.rating * 2) / 2 > i ? (
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
						<div className='ExploreEntryDescriptionTitle'>
							<div className='ExploreEntryDescriptionTitleMain'>{props.data.title}</div>
							<div className='ExploreEntryDescriptionTitleSub'>{props.data.description}</div>
						</div>
						<div className='ExploreEntryDescriptionLogistics'>
							<div>{props.data.price}</div>
							<div className='ExploreEntryDot' />
							<div>
								{props.data.city}, {props.data.state} (5 mi)
							</div>
							<div className='ExploreEntryDot' />
							<div>{props.data.startDate}</div>
						</div>
						<div className='ExploreEntryDescriptionBottomArea'>
							<div className='ExploreEntryDescriptionTagWrapper'>
								<div className='ExploreEntryDescriptionTagTitle'>Tags:</div>
								<div className='ExploreEntryDescriptionTagArea'>
									{props.data.tags.map(item => {
										return <div className='ExploreEntryTag'>{item}</div>;
									})}
								</div>
							</div>
							<div className='ExploreEntrySeeMoreArea'>
								<div className='ExploreEntrySeeMoreAreaWrapper'>
									<Link to={ROUTE.LISTING} style={{ textDecoration: 'none' }}>
										<div className='ExploreEntrySeeMore'>Click to see more</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ExploreEntry;
