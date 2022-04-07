import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const createPost = postData => {
	axios
		.post(`${serverConfig.backendURL}${routeExperience.makePost}`, postData, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(response => {
			if (response.data.statusMessage == 'Saved') {
				//Will eventually send post ID
				//Need to redirect to the post page once created
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export const getNearbyPosts = locationData => {
	return axios
		.post(`${serverConfig.backendURL}/experience/get-nearby-posts`, locationData, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(err => {
			// do something later
		});
};

export const getPost = async listingId => {
	return axios
		.get(`${serverConfig.backendURL}/experience/listing/${listingId}`, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(err => {});
};
