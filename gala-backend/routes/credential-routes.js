import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import signUpTemplate from '../models/SignUpModels.js';
import sendbirdRoutes from './sendbird-routes.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import { CredentialError, UserExistsError } from '../error/credential-errors.js';

const signup = async (req, res, next) => {
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, saltPassword);

	const signedUpUser = new signUpTemplate({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: securePassword,
		salt: saltPassword,
	});

	signUpTemplate.findOne({ email: req.body.email }, (findErr, doc) => {
		if (!doc) {
			signedUpUser
				.save()
				.then(data => {
					res.json({
						firstname: signedUpUser.firstName,
						lastname: signedUpUser.lastName,
						data: 'data',
					});

					sendbirdRoutes.createUser(data._id.toString(), data.firstName, data.lastName);
				})
				.catch(saveErr => next(new ServerError(serverErrorTypes.mongodb, saveErr)));
		} else if (findErr) next(new ServerError(serverErrorTypes.mongodb, findErr));
		else next(new UserExistsError(req.body.email));
	});
};

const login = async (request, response, next) => {
	const response2 = await signUpTemplate.findOne({ email: request.body.email });
	console.log(response2);
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
