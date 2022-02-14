import jwt from 'jsonwebtoken';
import axios from 'axios';
import postTemplate from '../models/PostModels.js';

const postNew = async (request, response) => {
	const addressString =
		request.body.streetAddress +
		', ' +
		request.body.cityAddress +
		', ' +
		request.body.stateAddress +
		', ' +
		request.body.zipAddress;

	var coordinates = await getCoordinates(addressString);

	if (coordinates[0] == -181) {
		response.json({ statusMessage: 'Geocoding Error' });
		return;
	}

	const newPost = new postTemplate({
		title: request.body.title,
		description: request.body.description,
		streetAddress: request.body.streetAddress,
		cityAddress: request.body.cityAddress,
		stateAddress: request.body.stateAddress,
		zipAddress: request.body.zipAddress,
		timeStart: request.body.timeStart,
		timeEnd: request.body.timeEnd,
		price: Number(request.body.price.replace(/[^0-9.-]+/g, '')),
		tags: request.body.tags,
		hostEmail: request.body.hostEmail,
		longitude: coordinates[0],
		latitude: coordinates[1],
	});

	//TODO: Verify that the JWT matches for the email payload
	//TODO: Generate ID for the post?
	newPost
		.save()
		.then(data => {
			response.json({ statusMessage: 'Saved' });
		})
		.catch(error => {
			response.json(error);
		});
};

const getCityPosts = async (request, response) => {
	//Verify request comes from logged in user?
	const response2 = await postTemplate.find({ cityAddress: request.body.cityAddress });
	if (!response2) {
		response.json({});
		return;
	} else {
		response.json(response2);
	}
};

const getCoordinates = async address => {
	var returnValue = [-181];
	const addURI = encodeURI(address);
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		addURI +
		'.json?limit=1&access_token=' +
		process.env.MAPS_TOKEN;
	const response = axios.get(url);
	returnValue = response.then(data => {
		return data.data.features[0].center;
	});
	return returnValue;
};

export default {
	postNew: postNew,
	getCityPosts: getCityPosts,
};
