import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../configurations/server-config.js';

export const getProfile = async () => {
	return axios
		.get(`${serverConfig.backendURL}/profile/${Cookies.get('userId')}`, {
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
