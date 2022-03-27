import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeAWS from '../configurations/route-aws-config.js';

export const fileUsage = {
	profilePicture: 'profilePicture',
};

export const uploadFile = async file => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('fileusage', fileUsage.profilePicture);

	return axios
		.post(`${serverConfig.backendURL}${routeAWS.fileUpload}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(res => res)
		.catch(err => err);
};
