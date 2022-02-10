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
	longitude: {
		type: Number,
		required: true,
	},
	latitude: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('postTable', postTemplate);
