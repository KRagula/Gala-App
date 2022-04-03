import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userTemplate from '../models/UserModel.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import {
	CredentialError,
	UserExistsError,
	InvalidCredentialError,
} from '../error/credential-errors.js';

const signup = async (req, res, next) => {
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, saltPassword);

	const signedUpUser = new userTemplate({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: securePassword,
		salt: saltPassword,
		profilePictureLink: req.body.profilePictureLink,
		profilePictureName: req.body.profilePictureName,
		rating: 5,
		numRatings: 1,
	});

	let signupData;
	try {
		const userDoc = await userTemplate.findOne({ email: req.body.email });
		if (userDoc) return next(new UserExistsError(req.body.email));
		let idVal;
		signupData = await signedUpUser.save(postId => {});
		console.log(signupData);
		const options = {
			maxAge: 1000 * 60 * 60, // would expire after 60 minutes
		};

		res.cookie('first-name', req.body.firstName, options);
		res.cookie('email', req.body.email, options);
		res.cookie('docid', signedUpUser._id, options);
		res.cookie('rating', 5, options);
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
		doc = await userTemplate.findOne({ email: req.body.email });
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
			res.cookie('email', doc.email, options);
			res.cookie('docid', doc._id, options);
			if (doc.rating) {
				res.cookie('rating', doc.rating, options);
			} else {
				res.cookie('rating', 5, options);
			}
			res.json({ firstname: doc.firstName, lastname: doc.lastName, data: 'data' });
		} else return next(new InvalidCredentialError());
	});
};

export default {
	signup: signup,
	login: login,
};
