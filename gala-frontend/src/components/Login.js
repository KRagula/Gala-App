import React, { useState } from 'react';
import ReactAnime from 'react-animejs';
import Header from './Header';
import { login } from '../axios/credentials.js';
import '../css/Login.css';

const { Anime } = ReactAnime;

const Login = () => {
	// controller state
	const [control, setControl] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = event => {
		event.preventDefault();
		const credentials = {
			username: email,
			password: password,
		};
		login(credentials);
	};

	// meta state
	const [meta, setMeta] = useState({
		control: control,
		progress: 100,
		currentTime: 0,
		duration: 0,
	});

	// timeline
	const timeline = [];
	timeline.push({
		targets: '#LoginFormArea',
		delay: 10,
		duration: 3000,
		opacity: 100,
		easing: 'easeInOutSine',
	});

	return (
		<React.Fragment>
			<Header />
			<div class='LoginFormArea' id='LoginFormArea'>
				<div>
					<div class='LoginTitleArea'>
						<div class='LoginTitle'>Welcome back.</div>
					</div>
					<div class='LoginInputArea'>
						<div
							class='LoginInputTitle'
							style={{ color: 'red', align: 'center' }}
							id='errorArea'></div>
					</div>
					<div class='LoginInputArea'>
						<div class='LoginInputTitle'>Email Address</div>
						<input
							type='text'
							class='LoginInput'
							placeholder='email@email.com'
							onChange={event => setEmail(event.target.value)}
							required
						/>
					</div>
					<div class='LoginInputArea'>
						<div class='LoginInputTitle'>Password</div>
						<input
							type='password'
							class='LoginInput'
							placeholder='Password'
							onChange={event => setPassword(event.target.value)}
							required
						/>
					</div>
					<div class='LoginSubmitButton' onClick={onSubmit}>
						Log In
					</div>
				</div>
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

export default Login;
