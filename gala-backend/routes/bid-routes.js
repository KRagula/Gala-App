import axios from 'axios';
import bidTemplate from '../models/BidModels.js';
import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import postTemplate from '../models/PostModels.js';
import userTemplate from '../models/UserModel.js';
import mongoose from 'mongoose';

//returns: [postinfo of all bids sent]
/* TO DO 
1. Extract Listing info (title, auction price, highest bid, usersBid)
2. Extract User info (name, rating, picture)
3. Get Max Bid (which is of all the bids with the same post ID, which one has the highest bidAmount)
*/

const getBidsSent = async (req, res, next) => {
	// console.log(typeof req.params.username);
	// console.log(req.body);
	// console.log(req.params);
	//Verify request comes from logged in user?
	let bids_sent_data = [];
	try {
		//this gets bid X posts for bids where postId (the post the email bid on from bid Table) = postId (from post Table)
		const doc = await bidTemplate.find({ bidderEmail: req.params.username }).populate({
			path: 'postId',
		});
		if (!doc) {
			return res.json({});
		} else {
			const json_doc = JSON.stringify(doc);
			const json_obj = JSON.parse(json_doc);
			// let highest_bid = 0;
			//calculates the highest bid
			for (let j = 0; j < json_obj.length; j += 1) {
				const post_id = mongoose.Types.ObjectId(json_obj[j]['postId']['_id']);
				//find highest_bid per post
				const highest_bid = await bidTemplate
					.find({ postId: post_id })
					.sort({ bidAmount: -1 })
					.select('bidAmount')
					.limit(1);
				json_obj[j]['highestBid'] = JSON.parse(JSON.stringify(highest_bid))[0]['bidAmount'];
				// console.log('this is json highest bid', json_obj['highestBid']);
				// console.log('this is the highest_bid', highest_bid);
			}
			// console.log('this is json_obj', json_obj);
			// console.log('this is bids sent data', bids_sent_data);
			for (let i = 0; i < json_obj.length; i += 1) {
				if (json_obj[i]['postId']) {
					let host_email = json_obj[i]['postId']['hostEmail'];
					// console.log('this is host email', host_email);
					const user_query = await userTemplate
						.find({ email: host_email })
						.select('firstName lastName profilePicture');
					// console.log('this is json_obj', json_obj);
					// console.log('this is host email', host_email);
					json_obj[i]['user_profile'] = user_query;
					// console.log('this is json_obj after', json_obj);
					// console.log('this is i', i);
					// console.log('this is bids sent element', json_obj[i]);
					bids_sent_data.push(json_obj[i]);
					//console.log('this is the user query', user_query);
				}
			}
			// console.log('this is bids_sent_data', bids_sent_data);
			// console.log('this is json_doc', json_obj[0]['postId']['hostEmail']);
			// console.log('this is data', bids_sent_data);
			return res.json(bids_sent_data);
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
			//Need to
			//extract title, auction price, highest Big
			// console.log('this is json_ids', doc[0]['_id'].toString());
			return res.json(bidsReceived.flat());
		}
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

export default {
	getBidsSent: getBidsSent,
	getBidsReceived: getBidsReceived,
};
