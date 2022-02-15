import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactAnime from 'react-animejs';
import '../css/Body.css';

import ROUTE from '../configurations/route-frontend-config.js';

const { Anime } = ReactAnime;

function Body() {
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
	var timeline1 = [];
	timeline1.push({
		targets: '#InvitationRectangle',
		delay: 0,
		duration: 100,
		opacity: 100,
		height: 10,
	});
	timeline1.push({
		targets: '#InvitationTriangle',
		delay: 0,
		duration: 1000,
		opacity: 100,
		height: 300,
	});
	timeline1.push({
		targets: '#BodyMainText',
		delay: 0,
		duration: 2000,
		opacity: 100,
		easing: 'easeInOutExpo',
	});

	var timeline2 = [];
	timeline2.push({
		targets: '#CreateAccountButton',
		delay: 2000,
		duration: 2000,
		opacity: 100,
		easing: 'easeInOutExpo',
	});

	const LOOP_ITERATIONS = 10;
	const NUM_SUBTEXTS = 3;
	for (var i = 0; i < LOOP_ITERATIONS; i++) {
		for (var j = 1; j <= NUM_SUBTEXTS; j++) {
			timeline2.push({
				targets: '#BodySubtext-' + j,
				delay: 0,
				duration: 2000,
				opacity: 100,
				easing: 'easeInOutSine',
				loop: true,
			});
			timeline2.push({
				targets: '#BodySubtext-' + j,
				delay: 0,
				duration: 1000,
				opacity: 0,
				easing: 'easeInOutSine',
				loop: true,
			});
		}
	}

	return (
		<React.Fragment>
			<div className='BodyArea'>
				<div className='InvitationRectangle' id='InvitationRectangle'></div>
				<div className='InvitationTriangle' id='InvitationTriangle'></div>
				<div className='BodyMainText' id='BodyMainText'>
					Your invitation is here
				</div>
				<div className='BodySubtext' id='BodySubtext-1'>
					Meet a celebrity
				</div>
				<div className='BodySubtext' id='BodySubtext-2'>
					Skydive with a new friend
				</div>
				<div className='BodySubtext' id='BodySubtext-3'>
					Attend a concert
				</div>
				<div className='CreateAccountButton' id='CreateAccountButton'>
					<Link to={ROUTE.SIGNUP} style={{ textDecoration: 'none' }}>
						<div className='CreateAccountButtonArea'>Create Account</div>
					</Link>
				</div>

				<Anime
					initial={timeline1}
					control={control}
					setMeta={setMeta}
					animeConfig={{
						autoplay: true,
						duration: 4000,
						easing: 'easeInOutSine',
					}}></Anime>
				<Anime
					initial={timeline2}
					control={control}
					setMeta={setMeta}
					animeConfig={{
						autoplay: true,
						duration: 4000,
						easing: 'easeInOutSine',
					}}></Anime>
			</div>
		</React.Fragment>
	);
}

export default Body;
