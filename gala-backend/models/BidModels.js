import mongoose from 'mongoose';
import dbConfig from '../configurations/db-config.js';

const bidTemplate = new mongoose.Schema({
	postId: {
		type: mongoose.Types.ObjectId,
		ref: dbConfig.mongoDBTablePosts,
	},
	bidderId: {
		type: mongoose.Types.ObjectId,
		ref: dbConfig.mongoDBTableUser,
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
		required: true,
	},
});

export default mongoose.model('bidTable', bidTemplate);
