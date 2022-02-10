import axios from 'axios';
import sendbirdConfig from '../configurations/sendbird-config.js';

const axiosConfig = {
	headers: {
		'Api-Token': sendbirdConfig.secondaryToken,
	},
};

const createUser = async () => {
	const body = {
		user_id: 'hi',
		nickname: 'testguy',
		profile_url: '',
	};
	axios
		.post(`${sendbirdConfig.apiRequestURL}/users`, body, axiosConfig)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

const joinGroup = async () => {
	const body = {
		name: 'Tennis Lessons Experience 2',
		user_ids: ['1', '2'],
	};

	axios
		.post(`${sendbirdConfig.apiRequestURL}/group_channels`, body, axiosConfig)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export default {
	createUser: createUser,
	joinGroup: joinGroup,
};
