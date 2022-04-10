import mongoose from 'mongoose';
import axios from 'axios';
import postTemplate from '../models/PostModels.js';
import bidTemplate from '../models/BidModels.js';
import geoConfig from '../configurations/geo-config.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';

const postNew = async (req, res, next) => {
	const addressString = `${req.body.streetAddress}, ${req.body.cityAddress}, ${req.body.stateAddress}, ${req.body.zipAddress}`;

	const coordinates = await getCoordinates(addressString);

	if (coordinates[0] == -181) {
		return next(new ServerError(serverErrorTypes.geo, -181));
	}

	const newPost = new postTemplate({
		title: req.body.title,
		description: req.body.description,
		streetAddress: req.body.streetAddress,
		cityAddress: req.body.cityAddress,
		stateAddress: req.body.stateAddress,
		zipAddress: req.body.zipAddress,
		timeStart: req.body.timeStart,
		timeEnd: req.body.timeEnd,
		price: Number(req.body.price.replace(/[^0-9.-]+/g, '')),
		tags: req.body.tags,
		timeCreated: new Date(),
		creatorId: mongoose.Types.ObjectId(req.user.id),
		location: {
			type: 'Point',
			coordinates: [coordinates[0], coordinates[1]],
		},
	});

	try {
		const doc = await newPost.save();
		return res.json({ id: doc._id.toString() });
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const getNearbyPosts = async (req, res, next) => {
	//Verify request comes from logged in user?
	const rangeSearch = req.body.range;
	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	// console.log(req.body);
	// const addressCoords = await getCoordinates(req.body.address);
	const addressCoords = [req.body.longitude, req.body.latitude];
	try {
		const doc = await postTemplate
			.find({
				location: {
					$nearSphere: {
						$geometry: {
							type: 'Point',
							coordinates: addressCoords,
						},
						$maxDistance: Number(rangeSearch),
						$minDistance: 0,
					},
				},
			})
			.populate('creatorId');

		if (!doc) {
			return res.json({});
		} else {
			// console.log(doc);
			if (req.body.startDate && req.body.endDate) {
				let startDateCast = new Date(req.body.startDate);
				startDateCast.setDate(startDateCast.getDate() - 1);
				let endDateCast = new Date(req.body.endDate);
				let returnList = doc.filter(currentElement => {
					return startDateCast <= currentElement.timeStart && endDateCast >= currentElement.timeEnd;
				});
				const newReturnList = returnList.map((elem, i) => {
					var R = 3960; // Radius of the earth in miles
					var dLat = (Math.PI / 180) * (req.body.latitude - elem.location.coordinates[1]); // deg2rad below
					var dLon = (Math.PI / 180) * (req.body.longitude - elem.location.coordinates[0]);
					var a =
						Math.sin(dLat / 2) * Math.sin(dLat / 2) +
						Math.cos((Math.PI / 180) * req.body.latitude) *
							Math.cos((Math.PI / 180) * elem.location.coordinates[1]) *
							Math.sin(dLon / 2) *
							Math.sin(dLon / 2);
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					var d = R * c; // Distance in miles
					d = Math.round(d * 10) / 10; //Rounded for aesthetics

					elem = elem.toObject();

					elem.userDistance = d.toString();
					return elem;
				});
				return res.json(newReturnList);
			} else {
				return res.json(doc);
			}
		}
	} catch (err) {
		console.log(err);
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const getCoordinates = async address => {
	var returnValue = [-181];
	const addURI = encodeURI(address);
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		addURI +
		'.json?limit=1&access_token=' +
		geoConfig.mapToken;
	const response = axios.get(url);
	returnValue = response.then(data => {
		return data.data.features[0].center;
	});
	return returnValue;
};

const getListing = async (req, res, next) => {
	let doc;
	try {
		doc = await postTemplate.findById(req.params.listingId).populate('creatorId');
		if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // Post DNE
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	let bidDoc;
	try {
		bidDoc = await bidTemplate
			.findOne({
				postId: mongoose.Types.ObjectId(req.params.listingId),
			})
			.sort('-bidAmount');
		if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // Post DNE
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	doc = doc.toObject();
	doc.highestBid = bidDoc && bidDoc.bidAmount ? bidDoc.bidAmount : 0;
	doc.status = bidDoc ? bidDoc.status : undefined;
	doc.bidderAmount = bidDoc ? bidDoc.bidAmount : undefined;
	if (req.user.id == doc.creatorId._id.toString()) {
		doc.creatorId.role = 'creator';
		let allBids;
		try {
			allBids = await bidTemplate
				.find({
					postId: mongoose.Types.ObjectId(req.params.listingId),
					status: { $ne: 'Denied' },
				})
				.sort('-bidAmount')
				.populate('bidderId');
			if (!doc) return next(new ServerError(serverErrorTypes.mongodb, err)); // Post DNE
		} catch (err) {
			return next(new ServerError(serverErrorTypes.mongodb, err));
		}
		doc.allBids = allBids;
	} else {
		try {
			const bidExists = await bidTemplate.findOne({
				bidderId: mongoose.Types.ObjectId(req.user.id),
				postId: mongoose.Types.ObjectId(req.params.listingId),
			});
			if (bidExists && bidExists.bidderId == doc.bidWinnerId) {
				doc.creatorId.role = 'winner';
			} else if (!bidExists) {
				doc.creatorId.role = 'observer';
			} else {
				doc.creatorId.role = 'engager';
			}
		} catch (err) {
			return next(new ServerError(serverErrorTypes.mongodb, err));
		}
	}
	res.json(doc);
};

const deleteListing = async (req, res, next) => {
	try {
		await bidTemplate.deleteMany({
			postId: mongoose.Types.ObjectId(req.params.listingId),
		});
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	try {
		await postTemplate.deleteOne({ _id: mongoose.Types.ObjectId(req.params.listingId) });
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}

	res.json({ message: 'success' });
};

export default {
	postNew: postNew,
	getNearbyPosts: getNearbyPosts,
	getListing: getListing,
	deleteListing: deleteListing,
};
