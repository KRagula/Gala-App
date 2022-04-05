import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const getBidsReceived = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/experience/bids-received/kragula@seas.upenn.edu`, {
			withCredentials: true,
		})
		.then(res => res)
		.catch(err => {
			// do something later
		});
};

export const getBidsSent = async () => {
	// todo: remove hardcode email
	return await axios
		.get(`${serverConfig.backendURL}/experience/bids-sent/kragula@seas.upenn.edu`, {
			withCredentials: true,
		})
		.then(res => res)
		.catch(err => {
			// do something later
		});
};
