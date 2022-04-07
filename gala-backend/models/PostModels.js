import mongoose from 'mongoose';
import dbConfig from '../configurations/db-config.js';

const postTemplate = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	streetAddress: {
		type: String,
		required: true,
	},
	cityAddress: {
		type: String,
		required: true,
	},
	stateAddress: {
		type: String,
		required: true,
	},
	zipAddress: {
		type: Number,
		required: true,
	},
	timeStart: {
		type: Date,
		required: true,
	},
	timeEnd: {
		type: Date,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	tags: {
		type: Array,
		required: true,
	},
	proofExperienceLink: {
		type: String,
		required: false,
	},
	proofExperienceName: {
		type: String,
		required: false,
	},
	timeCreated: {
		type: Date,
		required: true,
	},
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	creatorId: {
		type: mongoose.Types.ObjectId,
		ref: dbConfig.mongoDBTableUser,
		required: true,
	},
});

export default mongoose.model(dbConfig.mongoDBTablePosts, postTemplate);
