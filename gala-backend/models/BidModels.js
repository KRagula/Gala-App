import mongoose from 'mongoose';
import dbConfig from '../configurations/db-config.js';

const bidTemplate = new mongoose.Schema({
	postId: {
		type: mongoose.Types.ObjectId,
		ref: dbConfig.mongoDBTablePosts,
		required: true,
	},
	bidderId: {
		type: mongoose.Types.ObjectId,
		ref: dbConfig.mongoDBTableUser,
		required: true,
	},
	bidAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	bidTime: {
		type: Date,
		required: false,
	},
});

export default mongoose.model('bidTable', bidTemplate);
