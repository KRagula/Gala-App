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

export const sendBid = async (postId, bidAmount) => {
	return axios
		.post(
			`${serverConfig.backendURL}/experience/offer-bid/${postId}`,
			{ bidAmount: bidAmount },
			{
				withCredentials: true,
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			}
		)
		.then(res => res.data)
		.catch(err => false);
};

export const withdrawBid = async bidId => {
	return axios
		.delete(`${serverConfig.backendURL}/experience/delete-bid/${bidId}`, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(err => false);
};

export const confirmBid = async bidId => {
	return axios
		.put(
			`${serverConfig.backendURL}/experience/confirm-bid/${bidId}`,
			{},
			{
				withCredentials: true,
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			}
		)
		.then(res => res.data)
		.catch(err => false);
};

export const getBid = async bidId => {
	return axios
		.get(`${serverConfig.backendURL}/experience/single-bid/${bidId}`, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(err => false);
};

export const denyBid = async bidId => {
	return axios
		.put(
			`${serverConfig.backendURL}/experience/deny-bid/${bidId}`,
			{},
			{
				withCredentials: true,
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			}
		)
		.then(res => res.data)
		.catch(err => false);
};
