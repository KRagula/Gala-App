import mongoose from 'mongoose';

const bidTemplate = new mongoose.Schema({
	postId: {
		type: mongoose.Types.ObjectId,
		ref: 'postTable',
	},
	bidderEmail: {
		type: String,
		required: true,
	},
	bidderAmount: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('bidTable', bidTemplate);