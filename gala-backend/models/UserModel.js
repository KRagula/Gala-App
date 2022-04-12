import mongoose from 'mongoose';

import dbConfig from '../configurations/db-config.js';

const userTemplate = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	salt: {
		type: String,
		required: true,
	},
	profilePictureLink: {
		type: String,
		required: false,
	},
	profilePictureName: {
		type: String,
		required: false,
	},
	rating: {
		type: Number,
		required: true,
	},
	numRatings: {
		type: Number,
		required: true,
	},
	headline: {
		type: String,
		required: false,
	},
	gender: {
		type: String,
		required: false,
	},
	age: {
		type: Number,
		required: false,
	},
	funFact: {
		type: String,
		required: false,
	},
	interests: {
		type: Array,
		required: false,
	},
});

export default mongoose.model(dbConfig.mongoDBTableUser, userTemplate);
