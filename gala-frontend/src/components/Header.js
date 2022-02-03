import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
	return (
		<React.Fragment>
			<div className='HeaderArea'>
				<div className='HeaderLeftArea'>
					<div className='GalaLogoArea'>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<div className='GalaLogo'>Gala</div>
						</Link>
					</div>
					<div className='HeaderLeftWidgetArea'>
						<div className='HeaderLeftWidget'>
							<Link class='header' to='/safety' style={{ textDecoration: 'none' }}>
								Safety
							</Link>
						</div>
						<div className='HeaderLeftWidget'>
							<Link class='header' to='/about' style={{ textDecoration: 'none' }}>
								About
							</Link>
						</div>
						<div className='HeaderLeftWidget'>
							<Link class='header' to='/contact' style={{ textDecoration: 'none' }}>
								Contact
							</Link>
						</div>
					</div>
				</div>
				<div className='HeaderRightArea'>
					<Link to='/signup' style={{ textDecoration: 'none' }}>
						<div className='SignupButton'>Sign Up</div>
					</Link>
					<Link to='/login' style={{ textDecoration: 'none' }}>
						<div className='LoginButton'>Login</div>
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Header;
