import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const makePayment = postData => {
	axios
		.post(`${serverConfig.backendURL}/payment/pay`, postData, {
			// withCredentials: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
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

export const getPaymentPost = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/payment/624e48e8e71b8cdc666c39f7`, {
			// withCredentials: true,
			// headers: {
			// 	'x-access-token': localStorage.getItem('token'),
			// },
		})
		.then(res => res)
		.catch(err => {
			// do something later
		});
};
