import axios from 'axios';
import bidTemplate from '../models/BidModels.js';
import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import postTemplate from '../models/PostModels.js';
import mongoose from 'mongoose';

//returns: [postinfo of all bids sent]
const getBidsSent = async (req, res, next) => {
	// console.log(typeof req.params.username);
	// console.log(req.body);
	// console.log(req.params);
	//Verify request comes from logged in user?
	try {
		//this gets bid X posts for bids where postId (the post the email bid on from bid Table) = postId (from post Table)
		const doc = await bidTemplate.find({ bidderEmail: req.params.username }).populate({
			path: 'postId',
		});
		if (!doc) {
			return res.json({});
		} else {
			return res.json(doc);
		}
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

//first need to get all posts this user has via email
//then get all bids results that match the postIds of the posts the user has
//return
const getBidsReceived = async (req, res, next) => {
	// console.log(typeof req.params.username);
	// console.log(req.body);
	// console.log(req.params);
	//Verify request comes from logged in user?
	try {
		const doc = await postTemplate.find({ hostEmail: req.params.username }).select('_id').lean();
		// console.log('this is doc', doc);
		if (!doc) {
			return res.json({});
		} else {
			let bidsReceived = [];
			for (let i = 0; i < doc.length; i += 1) {
				const id = doc[i]['_id'].toString();
				const objectId = mongoose.Types.ObjectId(id);
				// console.log('this is object id', objectId);
				// console.log(objectId);
				const bids = await bidTemplate.find({ postId: objectId }).populate({
					path: 'postId',
				});
				bidsReceived.push(bids);
				// console.log('this is bids', bids);
			}
			// console.log('this is json_ids', doc[0]['_id'].toString());
			return res.json(bidsReceived);
		}
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

export default {
	getBidsSent: getBidsSent,
	getBidsReceived: getBidsReceived,
};
