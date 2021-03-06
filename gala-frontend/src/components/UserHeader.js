import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../css/UserHeader.css';

import ROUTE from '../configurations/route-frontend-config.js';

const cleanCookiesSignout = () => {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c
			.replace(/^ +/, '')
			.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
	});

	localStorage.removeItem('token');

	window.location = ROUTE.HOME;
};

const UserHeader = () => {
	return (
		<React.Fragment>
			<div className='HeaderArea'>
				<div className='HeaderLeftArea'>
					<div className='GalaLogoArea'>
						<Link to={ROUTE.EXPLORE} style={{ textDecoration: 'none' }}>
							<div className='GalaLogo'>Gala</div>
						</Link>
					</div>
					<div className='WelcomeAreaWrapper'>
						<div className='WelcomeArea' id='nameWelcome'>
							Welcome back, {Cookies.get('firstName')}
						</div>
					</div>
				</div>
				<div className='HeaderRightArea'>
					<Link
						to={`${ROUTE.PROFILE}?id=${Cookies.get('userId')}`}
						style={{ textDecoration: 'none' }}>
						<div className='ProfileButton'>Profile</div>
					</Link>
					<div
						className='SignoutButton'
						onClick={cleanCookiesSignout}
						style={{
							cursor: 'pointer',
						}}>
						Sign Out
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default UserHeader;
