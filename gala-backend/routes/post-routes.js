import mongoose from 'mongoose';
import axios from 'axios';
import postTemplate from '../models/PostModels.js';
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
		await newPost.save();
		return res.json({ statusMessage: 'Saved' });
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

const getCityPosts = async (req, res, next) => {
	//Verify request comes from logged in user?
	try {
		const doc = await postTemplate.find({ cityAddress: req.body.cityAddress });
		if (!doc) {
			return res.json({});
		} else {
			return res.json(doc);
		}
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
				let endDateCast = new Date(req.body.endDate);
				let returnList = doc.filter(currentElement => {
					return (
						startDateCast - 1 <= currentElement.timeStart && endDateCast >= currentElement.timeEnd
					);
				});
				return res.json(returnList);
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

export default {
	postNew: postNew,
	getCityPosts: getCityPosts,
	getNearbyPosts: getNearbyPosts,
};
