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
	const userId = mongoose.Types.ObjectId(req.user.id);
	//Verify request comes from logged in user?
	let bids_sent_data = [];
	try {
		//this gets bid X posts for bids where postId (the post the email bid on from bid Table) = postId (from post Table)
		const doc = await bidTemplate.find({ bidderId: userId }).populate({
			path: 'postId',
		});
		if (!doc) {
			return res.json({});
		} else {
			const json_doc = JSON.stringify(doc);
			const json_obj = JSON.parse(json_doc);
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
			//gets user info of the host of the post
			for (let i = 0; i < json_obj.length; i += 1) {
				if (json_obj[i]['postId']) {
					let host_id = json_obj[i]['postId']['creatorId'];
					const user_query = await userTemplate
						.find({ _id: host_id })
						.select('firstName profilePictureLink rating');
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
	const username = mongoose.Types.ObjectId(req.user.id);
	try {
		//this gets the postids of the posts that the host has
		const doc = await postTemplate.find({ creatorId: username }).select('_id');
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
				const bids = await bidTemplate
					.find({ postId: objectId, status: { $ne: 'Denied' } })
					.populate({
						path: 'postId',
					});

				//convert this query result to json for easier parsing
				const bids_json = JSON.parse(JSON.stringify(bids));

				//GET USER INFO: get bidderEmail from query result, and then query to find relevant user info
				for (let j = 0; j < bids_json.length; j += 1) {
					const bidder_id = mongoose.Types.ObjectId(bids_json[j]['bidderId']);
					const user_query = await userTemplate
						.find({ _id: bidder_id })
						.select('firstName profilePictureLink rating');
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

//OFFER BID POST + GET ROUTES
const offerBid = async (req, res, next) => {
	const newBid = new bidTemplate({
		postId: mongoose.Types.ObjectId(req.params.postId),
		bidderId: req.user.id,
		bidAmount: req.body.bidAmount,
		status: 'Waiting for response',
		bidTime: req.body.bidTime,
	});

	try {
		await newBid.save();
		return res.json({ statusMessage: 'New Bid Created' });
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const postInfo = async (req, res, next) => {
	// console.log('this is the url', req._parsedUrl);
	// const urlParams = new URLSearchParams(req._parsedUrl.query);
	// console.log('these are the urlParams', urlParams);
	// console.log('this is latitude', req.query.latitude);
	const addressCoords = [req.query.longitude, req.query.latitude];

	// const addressCoords = [urlParams.get('longitude'), urlParams.get('latitude')];
	// console.log('this is the latitude', urlParams.get('longitude'));
	// const addressCoords = [39.9526, 75.1652];
	try {
		let doc = await postTemplate
			.find({ _id: mongoose.Types.ObjectId(req.params.postId) })
			.populate('creatorId');
		// console.log('this is doc', doc);
		var R = 3960; // Radius of the earth in miles
		var dLat = (Math.PI / 180) * (addressCoords[1] - doc[0].location.coordinates[1]); // deg2rad below
		var dLon = (Math.PI / 180) * (addressCoords[0] - doc[0].location.coordinates[0]);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((Math.PI / 180) * addressCoords[1]) *
				Math.cos((Math.PI / 180) * doc[0].location.coordinates[1]) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in miles
		d = Math.round(d * 10) / 10; //Rounded for aesthetics
		console.log('this is the distance', d);
		// doc[0]['userDistance'] = d;
		// console.log('this is doc updated', doc);
		if (!doc) {
			return res.json({});
		} else {
			if (doc[0].bidWinnerId) {
				const doc2 = await bidTemplate.findOne({ _id: doc[0].bidWinnerId });
				//Calculate Distance from the current location
				// created[j]['userDistance'] = d;
				return res.json({
					doc,
					verified: req.user.id == doc2.bidderId,
					payingPrice: doc2.bidAmount,
					distance: d,
				});
			} else {
				return res.json({ doc, distance: d });
			}
		}
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

//CONFIRM BID ROUTES
const confirmBid = async (req, res, next) => {
	const bidId = mongoose.Types.ObjectId(req.params.bidId);
	const update = { status: 'Confirmed' };
	let doc;
	try {
		doc = await bidTemplate.findOneAndUpdate({ _id: bidId }, update);
		if (!doc) next(new ServerError(serverErrorTypes.mongodb, err));
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	try {
		const allDocs = await bidTemplate.updateMany(
			{ postId: doc.postId, _id: { $ne: doc._id } },
			{ status: 'Denied' }
		);
		if (!allDocs) next(new ServerError(serverErrorTypes.mongodb, err));
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	try {
		await postTemplate.findOneAndUpdate(
			{ _id: doc.postId },
			{
				bidWinnerId: bidId,
			}
		);
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	return res.json({ statusMessage: 'Bid Confirmed' });
};

const denyBid = async (req, res, next) => {
	const bidId = mongoose.Types.ObjectId(req.params.bidId);
	const update = { status: 'Denied' };
	let doc;
	try {
		doc = await bidTemplate.findOneAndUpdate({ _id: bidId }, update);
		if (!doc) next(new ServerError(serverErrorTypes.mongodb, err));
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	return res.json({ statusMessage: 'Bid Denied' });
};

const deleteBid = async (req, res, next) => {
	const bidId = mongoose.Types.ObjectId(req.params.bidId);
	try {
		const doc = await bidTemplate.deleteOne({ _id: bidId });
		return res.json({ statusMessage: 'Bid Deleted' });
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const singleBid = async (req, res, next) => {
	let doc;
	try {
		doc = await bidTemplate
			.findOne({ _id: req.params.bidId })
			.populate('bidderId')
			.populate('postId');
		if (!doc) next(new ServerError(serverErrorTypes.mongodb, err));
		doc = doc.toObject();
		doc.role =
			doc.postId.creatorId == req.user.id && !doc.postId.bidWinnerId ? 'creator' : 'no access';
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	let bidDoc;
	try {
		bidDoc = await bidTemplate
			.findOne({
				postId: doc.postId,
			})
			.sort('-bidAmount');
		if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // Post DNE
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	doc.highestBid = bidDoc && bidDoc.bidAmount ? bidDoc.bidAmount : 0;
	return res.json(doc);
};

export default {
	getBidsSent: getBidsSent,
	getBidsReceived: getBidsReceived,
	offerBid: offerBid,
	postInfo: postInfo,
	confirmBid: confirmBid,
	deleteBid: deleteBid,
	denyBid: denyBid,
	singleBid: singleBid,
};
