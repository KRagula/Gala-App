import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const getBidsReceived = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/experience/bids-received`, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res)
		.catch(err => {
			// do something later
		});
};

export const getBidsSent = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/experience/bids-sent`, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res)
		.catch(err => {
			// do something later
		});
};

export const sendBid = async postId => {
	return axios.post(`${serverConfig.backendURL}/experience/offer-bid/${postId}`);
};
