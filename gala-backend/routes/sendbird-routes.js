import axios from 'axios';
import sendbirdConfig from '../configurations/sendbird-config.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';

const axiosConfig = {
	headers: {
		'Api-Token': sendbirdConfig.secondaryToken,
	},
};

const createUser = async (id, firstName, lastName) => {
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

const updateUserPhoto = async (id, link) => {
	const body = {
		profile_url: link,
	};

	try {
		return axios.put(`${sendbirdConfig.apiRequestURL}/users/${id}`, body, axiosConfig);
	} catch (err) {
		throw new ServerError(serverErrorTypes.sendbird, err);
	}
};

const updateUserName = async (id, firstName, lastName) => {
	const body = {
		nickname: `${firstName} ${lastName}`,
	};

	try {
		return axios.put(`${sendbirdConfig.apiRequestURL}/users/${id}`, body, axiosConfig);
	} catch (err) {
		throw new ServerError(serverErrorTypes.sendbird, err);
	}
};

const joinGroup = (req, res, next) => {
	const body = {
		users: req.body.ids,
		is_distinct: true,
		is_public: false,
	};

	try {
		axios.post(`${sendbirdConfig.apiRequestURL}/group_channels`, body, axiosConfig);
	} catch (err) {
		throw new ServerError(serverErrorTypes.sendbird, err);
	}

	res.json({ message: 'success' });
};

export default {
	createUser: createUser,
	joinGroup: joinGroup,
	updateUserName: updateUserName,
	updateUserPhoto: updateUserPhoto,
};
