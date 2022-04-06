import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const getDates = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/experience/dates/armando@gmail.com`, {
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