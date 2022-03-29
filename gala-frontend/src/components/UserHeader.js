import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserHeader.css';

import ROUTE from '../configurations/route-frontend-config.js';

const cleanCookiesSignout = () => {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c
			.replace(/^ +/, '')
			.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
	});
	window.location = ROUTE.HOME;
};

function UserHeader() {
	function setHeaderValue() {
		const firstname = document.cookie
			.split('; ')
			.find(row => row.startsWith('first-name='))
			.split('=')[1];
		console.log('Test if Runs');
		document.getElementById('nameWelcome').innerHTML = 'Welcome back, ' + firstname;
	}
	return (
		<React.Fragment>
			<div className='HeaderArea'>
				<div className='HeaderLeftArea'>
					<div className='GalaLogoArea'>
						<Link to={ROUTE.EXPLORE} style={{ textDecoration: 'none' }}>
							<div className='GalaLogo' onLoad={setHeaderValue}>
								Gala
							</div>
						</Link>
					</div>
					<div className='WelcomeAreaWrapper'>
						<div className='WelcomeArea' id='nameWelcome'>
							Welcome back, Robin2
						</div>
					</div>
				</div>
				<div className='HeaderRightArea'>
					<Link to={ROUTE.PROFILE} style={{ textDecoration: 'none' }}>
						<div className='ProfileButton'>Profile</div>
					</Link>
					<div className='SignoutButton' onClick={cleanCookiesSignout}>
						Sign Out
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default UserHeader;
