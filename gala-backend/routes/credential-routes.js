import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import signUpTemplate from '../models/SignUpModels.js';

const signup = async (request, response) => {
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(request.body.password, saltPassword);

	const signedUpUser = new signUpTemplate({
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		password: securePassword,
		salt: saltPassword,
	});

	signUpTemplate.findOne({ email: request.body.email }, (err, res) => {
		if (!res) {
			signedUpUser
				.save()
				.then(data => {
					response.json({
						firstname: signedUpUser.firstName,
						lastname: signedUpUser.lastName,
						data: 'data',
					});
				})
				.catch(error => {
					response.json(error);
				});
		} else {
			response.sendStatus(409);
		}
	});
};

const login = async (request, response) => {
	const response2 = await signUpTemplate.findOne({ email: request.body.email });
	if (!response2) {
		response.sendStatus(409);
		return;
	}

	bcrypt.compare(request.body.password, response2.password, (err, res) => {
		if (err) {
			response.sendStatus(410);
			//Invalid password
		}
		if (res) {
			// Send JWT
			let options = {
				maxAge: 1000 * 60 * 60, // would expire after 60 minutes
			};

			//   var nameCookie = 'firstname=' + response2.firstName
			//   var lastNameCookie = 'lastname=' + response2.lastName

			response.cookie('first-name', response2.firstName, options);
			response.cookie('last-name', response2.lastName, options);
			response.json({ firstname: response2.firstName, lastname: response2.lastName, data: 'data' });
		} else {
			// response is OutgoingMessage object that server response http request
			response.sendStatus(401);
		}
	});
};

export default {
	signup: signup,
	login: login,
};
