import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeAWS from '../configurations/route-aws-config.js';

export const fileUsage = {
	profilePicture: 'profilePicture',
};

export const uploadFile = file => {
	const formData = new FormData();
	formData.append('file', file);

	axios
		.post(`${serverConfig.backendURL}${routeAWS.fileUpload}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
