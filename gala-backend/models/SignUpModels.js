import mongoose from 'mongoose';

const signUpTemplate = new mongoose.Schema({
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
});

export default mongoose.model('mytable', signUpTemplate);
