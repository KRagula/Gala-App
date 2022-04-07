import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const makePayment = postData => {
	axios
		.post(`${serverConfig.backendURL}/payment/pay`, postData, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(response => {
			if (response.data.statusMessage == 'Payment successful') {
				//Will eventually send post ID
				//Need to redirect to the post page once created
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export const getPaymentPost = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/payment/624e48e8e71b8cdc666c39f7`, {
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
