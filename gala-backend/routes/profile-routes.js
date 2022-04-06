import bcrypt from 'bcrypt';

import userTemplate from '../models/UserModel.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import {
	CredentialError,
	UserExistsError,
	InvalidCredentialError,
} from '../error/credential-errors.js';

const getProfile = async (req, res, next) => {
	let doc;
	try {
		doc = await userTemplate.findById(req.params.profileid);
		if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // User DNE
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	res.json({
		profilePictureLink: doc.profilePictureLink,
		firstName: doc.firstName,
		lastName: doc.lastName,
		email: doc.email,
		rating: doc.rating,
		headline: doc.headline,
		gender: doc.gender,
		age: doc.age,
		funFact: doc.funFact,
		interests: doc.interests,
		numDates: doc.numDates,
	});
};

const editProfile = async (req, res, next) => {
	if (req.params.profileid == req.user.id) {
		const filter = { _id: req.params.profileid };
		const update = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			headline: req.body.headline,
			age: req.body.age,
			gender: req.body.gender,
			funFact: req.body.funFact,
			interests: req.body.interests,
		};
		await userTemplate.findOneAndUpdate(filter, update, { new: true });
	} else {
		return next(new InvalidCredentialError());
	}
};

export default {
	getProfile: getProfile,
	editProfile: editProfile,
};
