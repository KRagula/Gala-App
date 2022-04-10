import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const makePayment = postData => {
	axios
		.post(`${serverConfig.backendURL}/payment/pay`, postData, {
			// withCredentials: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(response => {
			console.log('hello');
			console.log('this is the response', response);
		})
		.catch(error => {
			console.log('reached this part');
			console.log('this is the error', error);
		});
};

export const getPaymentPost = async postId => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/payment/${postId}`, {
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
