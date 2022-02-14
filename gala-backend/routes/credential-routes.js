import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import signUpTemplate from '../models/SignUpModels.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import {
	CredentialError,
	UserExistsError,
	InvalidCredentialError,
} from '../error/credential-errors.js';

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

	let signupData;
	try {
		const userDoc = await signUpTemplate.findOne({ email: req.body.email });
		if (userDoc) return next(new UserExistsError(req.body.email));
		signupData = await signedUpUser.save();

		return res.json({
			firstname: signedUpUser.firstName,
			lastname: signedUpUser.lastName,
			data: 'data',
		});
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const login = async (req, res, next) => {
	let doc;
	try {
		doc = await signUpTemplate.findOne({ email: req.body.email });
		if (!doc) return next(new InvalidCredentialError()); // User DNE
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	bcrypt.compare(req.body.password, doc.password, (err, same) => {
		if (err) return next(new ServerError(serverErrorTypes.generic, err));
		else if (same) {
			// Send JWT
			const options = {
				maxAge: 1000 * 60 * 60, // would expire after 60 minutes
			};

			//   var nameCookie = 'firstname=' + response2.firstName
			//   var lastNameCookie = 'lastname=' + response2.lastName

			res.cookie('first-name', doc.firstName, options);
			res.cookie('last-name', doc.lastName, options);
			res.json({ firstname: doc.firstName, lastname: doc.lastName, data: 'data' });
		} else return next(new InvalidCredentialError());
	});
};

export default {
	signup: signup,
	login: login,
};
