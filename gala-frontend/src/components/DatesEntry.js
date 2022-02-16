import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/DatesEntry.css';
import testImage from '../assets/kanishka.jpeg';
import testImage2 from '../assets/eddie.jpeg';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import ROUTE from '../configurations/route-frontend-config.js';

function DatesEntry(props) {
	return (
		<React.Fragment>
			<div className='DatesEntryPaper'>
				<div className='ExploreEntryProfileAreaWrapper'>
					<div className='ExploreEntryProfileArea'>
						<img src={testImage2} className='ExploreEntryProfileImage' />
						<div className='ExploreEntryProfileText'>Eddie</div>
						<div className='ExploreEntryProfileStars'>
							<FaStar fontSize='11px' color='#424242' />
							<FaStarHalfAlt fontSize='11px' color='#424242' />
							<FaRegStar fontSize='11px' color='#424242' />
							<FaRegStar fontSize='11px' color='#424242' />
							<FaRegStar fontSize='11px' color='#424242' />
						</div>
					</div>
				</div>
				<div className='DatesEntryRightArea'>
					<div className='DatesEntryDescriptionArea'>
						<div className='DatesEntryDescriptionTitle'>
							<div className='ExploreEntryDescriptionTitleMain'>TENNIS LESSONS</div>
							<div className='ExploreEntryDescriptionTitleSub'>
								I've played tennis for a few years, would be happy to give lessons at Penn Park!
							</div>
						</div>
						<div className='ExploreEntryDescriptionLogistics'>
							<div>$20.00</div>
							<div className='ExploreEntryDot' />
							<div>Philadelpia, PA (1 mi)</div>
							<div className='ExploreEntryDot' />
							<div>02/15/2022</div>
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
								<Link to={ROUTE.LISTING} style={{ textDecoration: 'none' }}>
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
