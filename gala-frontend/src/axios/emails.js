import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../configurations/server-config.js';

export const getDangerMail = async params => {
	// todo: remove hardcode email
	// let searchParams = new URLSearchParams(params.locationData);
	return await axios
		.post(`${serverConfig.backendURL}/dangerMail`, params, {
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

export const getConfirmEmail = async params => {
	// todo: remove hardcode email
	// let searchParams = new URLSearchParams(params.locationData);
	console.log('we got here');
	return await axios
		.post(`${serverConfig.backendURL}/bidConfirm`, params, {
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
