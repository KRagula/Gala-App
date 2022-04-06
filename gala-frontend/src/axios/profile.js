import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../configurations/server-config.js';

export const getProfile = async userId => {
	return axios
		.get(`${serverConfig.backendURL}/profile/${userId}`, {
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

export const editProfile = async profileInfo => {
	return axios
		.put(`${serverConfig.backendURL}/profile/${Cookies.get('userId')}`, profileInfo, {
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
