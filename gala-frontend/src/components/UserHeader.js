import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserHeader.css';

import ROUTE from '../configurations/route-frontend-config.js';

function UserHeader() {
	function setHeaderValue() {
		const firstname = document.cookie
			.split('; ')
			.find(row => row.startsWith('firstname='))
			.split('=')[1];
		console.log('Test if Runs');
		document.getElementById('nameWelcome').innerHTML = 'Welcome back, ' + firstname;
	}
	return (
		<React.Fragment>
			<div className='HeaderArea'>
				<div className='HeaderLeftArea'>
					<div className='GalaLogoArea'>
						<Link to={ROUTE.DASHBOARD} style={{ textDecoration: 'none' }}>
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
					<Link to={ROUTE.HOME} style={{ textDecoration: 'none' }}>
						<div className='SignoutButton'>Sign Out</div>
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
}

export default UserHeader;
