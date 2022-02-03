import React, { useState } from 'react';
import ReactAnime from 'react-animejs';
import Header from './Header';
import { signup } from '../axios/credentials.js';
import '../css/Signup.css';

const { Anime } = ReactAnime;

function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = event => {
		event.preventDefault();
		const registered = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};
		signup(registered);
	};

	const [selectedImage, setSelectedImage] = useState(null);

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
		targets: '#SignupFormArea',
		delay: 10,
		duration: 3000,
		opacity: 100,
		easing: 'easeInOutSine',
	});

	return (
		<React.Fragment>
			<Header />
			<div class='SignupFormArea' id='SignupFormArea'>
				<div>
					<div class='SignupTitleArea'>
						<div class='SignupTitle' id='titleHeader'>
							Enter Gala.
						</div>
					</div>
					<div class='SignupInputArea'>
						<div
							class='SignupInputTitle'
							style={{ color: 'red', align: 'center' }}
							id='errorArea'></div>
					</div>
					<div class='SignupInputArea'>
						<div class='SignupInputTitle'>First Name</div>
						<input
							type='text'
							class='SignupInput'
							required
							placeholder='First Name'
							id='firstNameInput'
							onChange={event => setFirstName(event.target.value)}
						/>
					</div>
					<div class='SignupInputArea'>
						<div class='SignupInputTitle'>Last Name</div>
						<input
							type='text'
							class='SignupInput'
							required
							placeholder='Last Name'
							id='lastNameInput'
							onChange={event => setLastName(event.target.value)}
						/>
					</div>
					<div class='SignupInputArea'>
						<div class='SignupInputTitle'>Email Address</div>
						<input
							type='text'
							class='SignupInput'
							required
							placeholder='email@email.com'
							id='emailInput'
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div class='SignupInputArea'>
						<div class='SignupInputTitle'>Password</div>
						<input
							type='password'
							class='SignupInput'
							required
							placeholder='Password'
							id='passwordInput'
							onChange={event => setPassword(event.target.value)}
						/>
					</div>
					<div class='SignupInputArea'>
						<div class='SignupInputTitle'>Profile Picture</div>
						<input
							type='file'
							class='SignupInput'
							required
							onChange={event => {
								setSelectedImage(event.target.files[0]);
							}}
						/>
						{selectedImage && (
							<img
								className='SignupProfilePicture'
								alt='No Image Found'
								src={URL.createObjectURL(selectedImage)}
							/>
						)}
					</div>
					<div class='SignupSubmitButton' onClick={onSubmit}>
						Sign Up
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
}

export default Signup;
