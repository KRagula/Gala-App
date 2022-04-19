import React, { useState } from 'react';
import ReactAnime from 'react-animejs';
import Header from './Header';
import '../css/About.css';

const { Anime } = ReactAnime;

function About() {
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
		targets: '#AboutTitle',
		delay: 10,
		duration: 3000,
		opacity: 100,
		easing: 'easeInOutSine',
	});
	var timeline2 = [];
	timeline2.push({
		targets: '#AboutPaper',
		delay: 10,
		duration: 4000,
		opacity: 100,
		easing: 'easeInOutSine',
	});

	return (
		<React.Fragment>
			<Header />
			<div className='AboutAreaWrapper'>
				<div className='AboutArea'>
					<div className='AboutTitle' id='AboutTitle'>
						About
					</div>
					<div className='AboutPaper' id='AboutPaper'>
						We are Gala, an auction-based marketplace for experiences.
						<br />
						<br />
						Want to grab dinner with a celebrity?
						<br />
						Go skydiving with a new friend?
						<br />
						Attend a concert with a neighbor?
						<br />
						<br />
						All without worrying who pays after?
						<br />
						<br />
						Gala is the place to do it.
						<br />
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
			</div>
		</React.Fragment>
	);
}

export default About;
