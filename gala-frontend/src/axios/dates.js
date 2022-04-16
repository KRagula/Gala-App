import axios from 'axios';


import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const getDates = async locationData => {
	// todo: remove hardcode email
	let searchParams = new URLSearchParams(locationData);
	console.log(locationData)


	return await axios
		.get(`${serverConfig.backendURL}/experience/dates?${searchParams.toString()}`, {
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
