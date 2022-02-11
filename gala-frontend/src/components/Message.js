import React, { useState } from 'react';
import { SendBirdProvider, withSendBird } from 'sendbird-uikit';
import { App as SendBirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Message.css';

const { Anime } = ReactAnime;

const AppStyle = {
	fontFamily: 'sans-serif',
	textAlign: 'center',
	height: '100vh',
	width: '100vw',
};

const App = () => {
	return (
		<div className={AppStyle}>
			<SendBirdApp
				appId={'819E6E70-321B-4252-B9FF-1BD7E466F490'}
				userId={'1'} // Specify your user ID.
			/>
		</div>
	);
};

const Message = () => {
	// controller state
	const [control, setControl] = useState(null);

	// meta state
	const [meta, setMeta] = useState({
		control: control,
		progress: 100,
		currentTime: 0,
		duration: 0,
	});

	// timeline
	var timeline = [];
	timeline.push({
		targets: '#DashboardTitleDescriptionArea',
		delay: 0,
		duration: 800,
		opacity: 100,
		easing: 'easeInOutExpo',
	});

	return (
		<React.Fragment>
			<UserHeader />
			<div className='DashboardArea'>
				<Navigation />
				<App />
			</div>
			<Anime
				initial={timeline}
				control={control}
				setMeta={setMeta}
				animeConfig={{
					autoplay: true,
					duration: 4000,
					easing: 'easeInOutSine',
				}}></Anime>
		</React.Fragment>
	);
};

export default Message;
