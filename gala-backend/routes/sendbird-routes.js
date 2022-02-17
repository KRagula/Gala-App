import axios from 'axios';
import sendbirdConfig from '../configurations/sendbird-config.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';

const axiosConfig = {
	headers: {
		'Api-Token': sendbirdConfig.secondaryToken,
	},
};

const createUser = (id, firstName, lastName) => {
	const body = {
		user_id: id,
		nickname: `${firstName} ${lastName}`,
		profile_url: '',
	};

	try {
		return axios.post(`${sendbirdConfig.apiRequestURL}/users`, body, axiosConfig);
	} catch (err) {
		throw new ServerError(serverErrorTypes.sendbird, err);
	}
};

const joinGroup = (channelName, providerId, experiencerId) => {
	const body = {
		name: channelName,
		user_ids: [providerId, experiencerId],
		is_distinct: true,
	};

	try {
		return axios.post(`${sendbirdConfig.apiRequestURL}/group_channels`, body, axiosConfig);
	} catch (err) {
		throw new ServerError(serverErrorTypes.sendbird, err);
	}
};

export default {
	createUser: createUser,
	joinGroup: joinGroup,
};
