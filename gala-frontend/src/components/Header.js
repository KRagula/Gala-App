import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import ROUTE from '../configurations/route-frontend-config.js';

function Header() {
	return (
		<React.Fragment>
			<div className='HeaderArea'>
				<div className='HeaderLeftArea'>
					<div className='GalaLogoArea'>
						<Link to={ROUTE.HOME} style={{ textDecoration: 'none' }}>
							<div className='GalaLogo'>Gala</div>
						</Link>
					</div>
					<div className='HeaderLeftWidgetArea'>
						<div className='HeaderLeftWidget'>
							<Link class='header' to={ROUTE.SAFETY} style={{ textDecoration: 'none' }}>
								Safety
							</Link>
						</div>
						<div className='HeaderLeftWidget'>
							<Link class='header' to={ROUTE.ABOUT} style={{ textDecoration: 'none' }}>
								About
							</Link>
						</div>
						<div className='HeaderLeftWidget'>
							<Link class='header' to={ROUTE.CONTACT} style={{ textDecoration: 'none' }}>
								Contact
							</Link>
						</div>
					</div>
				</div>
				<div className='HeaderRightArea'>
					<Link to={ROUTE.SIGNUP} style={{ textDecoration: 'none' }}>
						<div className='SignupButton'>Sign Up</div>
					</Link>
					<Link to={ROUTE.LOGIN} style={{ textDecoration: 'none' }}>
						<div className='LoginButton'>Login</div>
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Header;
