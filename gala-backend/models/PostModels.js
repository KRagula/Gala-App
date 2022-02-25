import mongoose from 'mongoose';

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
		type: String,
		required: true,
	},
	hostEmail: {
		type: String,
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
});

export default mongoose.model('postTable', postTemplate);
