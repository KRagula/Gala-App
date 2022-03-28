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
			}
			for (let i = 0; i < json_obj.length; i += 1) {
				if (json_obj[i]['postId']) {
					let host_email = json_obj[i]['postId']['hostEmail'];
					const user_query = await userTemplate
						.find({ email: host_email })
						.select('firstName lastName profilePicture');
					json_obj[i]['user_profile'] = user_query;
					bids_sent_data.push(json_obj[i]);
				}
			}
			return res.json(bids_sent_data);
		}
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

/*TO DO
1. Get PostID of all Bids where PostID (of bid) = postId (of post) where hostEmail = username (email) X
2. Get Post info (title, auction price, highest bid, usersBid) of all posts in which postID (of bid) = postID (of post) X
3. Get User info (name, rating, picture) of all bidderEmail (of bid) of bids found in #1 X
4. Get highestBid of bids found in #1
*/

const getBidsReceived = async (req, res, next) => {
	//Verify request comes from logged in user?
	try {
		//this gets the postids of the posts that the host has
		const doc = await postTemplate.find({ hostEmail: req.params.username }).select('_id');
		// Now doc represents an array of data on all the posts (including postIds) the host has.
		if (!doc) {
			return res.json({});
		} else {
			let bidsReceived = [];
			//iterate through all posts
			for (let i = 0; i < doc.length; i += 1) {
				const id = doc[i]['_id'].toString();
				const objectId = mongoose.Types.ObjectId(id);
				//this gets all the posts + bids on posts with postId (from post table) = postId (from bid table)
				const bids = await bidTemplate.find({ postId: objectId }).populate({
					path: 'postId',
				});

				//convert this query result to json for easier parsing
				const bids_json = JSON.parse(JSON.stringify(bids));

				//GET USER INFO: get bidderEmail from query result, and then query to find relevant user info
				for (let j = 0; j < bids_json.length; j += 1) {
					const bidder_email = bids_json[j]['bidderEmail'];
					console.log('this is bidder_email', bidder_email);
					const user_query = await userTemplate
						.find({ email: bidder_email })
						.select('firstName lastName profilePicture');
					bids_json[j]['user_profile'] = user_query;
				}

				bidsReceived.push(bids_json);
			}
			bidsReceived = bidsReceived.flat();
			//GET HIGHEST BID: for each post calculated the highest bidAmount
			for (let k = 0; k < bidsReceived.length; k += 1) {
				const post_id = mongoose.Types.ObjectId(bidsReceived[k]['postId']['_id']);
				//find highest_bid per post
				const highest_bid = await bidTemplate
					.find({ postId: post_id })
					.sort({ bidAmount: -1 })
					.select('bidAmount')
					.limit(1);
				bidsReceived[k]['highestBid'] = JSON.parse(JSON.stringify(highest_bid))[0]['bidAmount'];
			}
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
