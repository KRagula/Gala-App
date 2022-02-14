import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeExperience from '../configurations/route-experience-config.js';

export const createPost = postData => {
	axios
		.post(`${serverConfig.backendURL}${routeExperience.makePost}`, postData, {
			withCredentials: true,
		})
		.then(response => {
			if (response.data.statusMessage == 'Saved') {
				//Will eventually send post ID
				//Need to redirect to the post page once created
			}
		})
		.catch(error => {
			console.log(error);
		});
};
