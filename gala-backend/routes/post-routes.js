const postTemplate = require('../models/PostModels');
const jwt = require('jsonwebtoken');

const postNew = (request, response) => {
	
	const newPost = new postTemplate({
		title: request.body.title,
		description: request.body.description,
		streetAddress: request.body.streetAddress,
		cityAddress: request.body.cityAddress,
		stateAddress: request.body.stateAddress,
		zipAddress: request.body.zipAddress,
		timeStart: request.body.timeStart,
		timeEnd: request.body.timeEnd,
		price: request.body.price,
		tags: request.body.tags,
		hostEmail: request.body.hostEmail,
	});
	//TODO: Verify that the JWT matches for the email payload
	//TODO: Generate ID for the post?
	newPost
		.save()
		.then(data=> {
			response.json({statusMessage: 'Saved'})
		})
		.catch(error => {
			response.json(error)
		})
};

const getCityPosts = async (request, response) => {
	//Verify request comes from logged in user?
	const response2 = await postTemplate.find({ cityAddress: request.body.cityAddress });
	if (!response2) {
		response.json({});
		return;
	} else {
		response.json(response2)
	}
};

module.exports = {
	postNew: postNew,
	getCityPosts: getCityPosts,
};
