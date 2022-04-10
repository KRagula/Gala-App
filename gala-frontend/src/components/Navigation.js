import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../css/Navigation.css';

import ROUTE from '../configurations/route-frontend-config.js';

function Navigation(props) {
	const [shouldCollapse, setShouldCollapse] = useState(false);

	const handleClick = () => {
		setShouldCollapse(!shouldCollapse);
	};
	return (
		<React.Fragment>
			{shouldCollapse ? (
				<div className='NavigationAreaCollapsed'>
					<div className='CollapseArea Expand'>
						<div className='CollapseBox Expand' onClick={handleClick}>
							<div className='CollapseArrow'>
								<div>
									<FontAwesomeIcon icon={faArrowRight} />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='NavigationArea'>
					<div className='CollapseArea'>
						<div className='CollapseBox' onClick={handleClick}>
							<div className='CollapseArrow'>
								<div>
									<FontAwesomeIcon icon={faArrowLeft} />
								</div>
							</div>
						</div>
					</div>
					<div className='OptionsArea'>
						{props.selectedOption == 'explore' ? (
							<div className='OptionSelected'>
								<div className='OptionSelectedSide' />
								<div>EXPLORE</div>
								<div className='OptionSelectedSide'>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						) : (
							<Link to={ROUTE.EXPLORE} style={{ textDecoration: 'none' }}>
								<div className='Option First'>EXPLORE</div>
							</Link>
						)}
						{props.selectedOption == 'create' ? (
							<div className='OptionSelected'>
								<div className='OptionSelectedSide' />
								<div>CREATE</div>
								<div className='OptionSelectedSide'>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						) : (
							<Link to={ROUTE.CREATE} style={{ textDecoration: 'none' }}>
								<div className='Option'>CREATE</div>
							</Link>
						)}
						{props.selectedOption == 'messages' ? (
							<div className='OptionSelected'>
								<div className='OptionSelectedSide' />
								<div>MESSAGES</div>
								<div className='OptionSelectedSide'>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						) : (
							<Link to={ROUTE.MESSAGE} style={{ textDecoration: 'none' }}>
								<div className='Option'>MESSAGES</div>
							</Link>
						)}
						{props.selectedOption == 'bids' ? (
							<div className='OptionSelected'>
								<div className='OptionSelectedSide' />
								<div>MY BIDS</div>
								<div className='OptionSelectedSide'>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						) : (
							<Link to={ROUTE.MYBIDS} style={{ textDecoration: 'none' }}>
								<div className='Option'>MY BIDS</div>
							</Link>
						)}
						{props.selectedOption == 'dates' ? (
							<div className='OptionSelected'>
								<div className='OptionSelectedSide' />
								<div>MY DATES</div>
								<div className='OptionSelectedSide'>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						) : (
							<Link to={ROUTE.MYDATES} style={{ textDecoration: 'none' }}>
								<div className='Option Last'>MY DATES</div>
							</Link>
						)}
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

export default Navigation;
