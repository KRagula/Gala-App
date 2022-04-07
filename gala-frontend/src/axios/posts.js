import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const createPost = async postData => {
	return axios
		.post(`${serverConfig.backendURL}${routeExperience.makePost}`, postData, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(error => false);
};

export const getNearbyPosts = async locationData => {
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
		.catch(err => false);
};

export const getBids = async listingId => {
	return axios.get();
};
