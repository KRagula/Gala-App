import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../configurations/server-config.js';

export const createChannel = async messagingInfo => {
	return axios
		.post(`${serverConfig.backendURL}/messaging/create`, messagingInfo, {
			withCredentials: true,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		.then(res => res.data)
		.catch(error => {
			console.log(error);
		});
};
