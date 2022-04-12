import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userTemplate from '../models/UserModel.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import {
	CredentialError,
	UserExistsError,
	InvalidCredentialError,
} from '../error/credential-errors.js';
import serverConfig from '../configurations/server-config.js';

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

	try {
		const userDoc = await userTemplate.findOne({ email: req.body.email });
		if (userDoc) return next(new UserExistsError(req.body.email));
		const signupData = await signedUpUser.save();
		const options = {
			maxAge: 10000 * 60 * 60,
		};

		res.cookie('first-name', req.body.firstName, options);
		res.cookie('email', req.body.email, options);
		res.cookie('docid', signedUpUser._id, options);
		res.cookie('rating', 5, options);
		return res.json({
			id: signupData._id.toString(),
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
			const payload = {
				id: doc._id,
				email: doc.email,
			};

			jwt.sign(payload, serverConfig.jwtSecret, { expiresIn: 86400 }, (err, token) => {
				if (err) return next(new ServerError(serverErrorTypes.generic, err));

				const options = {
					maxAge: 1000 * 60 * 60, // would expire after 60 minutes
				};
				res.cookie('firstName', doc.firstName, options);
				res.cookie('lastName', doc.lastName, options);
				res.cookie('email', doc.email, options);
				res.cookie('userId', doc._id.toString(), options);

				return res.json({
					message: 'Success',
					token: 'Bearer ' + token,
					data: 'data',
				});
			});
		} else return next(new InvalidCredentialError());
	});
};

const isAuth = async (req, res, next) => {
	if (
		!req.cookies.firstName ||
		!req.cookies.lastName ||
		!req.cookies.email ||
		!req.cookies.userId
	) {
		let doc;
		try {
			doc = await userTemplate.findById(req.user.id);
			if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // User DNE
		} catch (err) {
			return next(new ServerError(serverErrorTypes.mongodb, err));
		}

		const options = {
			maxAge: 1000 * 60 * 60, // would expire after 60 minutes
		};
		res.cookie('firstName', doc.firstName, options);
		res.cookie('lastName', doc.lastName, options);
		res.cookie('email', doc.email, options);
		res.cookie('userId', doc._id.toString(), options);
	}
	res.json({ isLoggedIn: true });
};

export default {
	signup: signup,
	login: login,
	isAuth: isAuth,
};
