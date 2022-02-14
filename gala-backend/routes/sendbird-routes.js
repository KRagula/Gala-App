import axios from 'axios';
import sendbirdConfig from '../configurations/sendbird-config.js';

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

	axios
		.post(`${sendbirdConfig.apiRequestURL}/users`, body, axiosConfig)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			throw err;
		});
};

const joinGroup = async () => {
	const body = {
		name: 'Tennis Lessons Experience 2',
		user_ids: ['1', '2'],
		is_distinct: true,
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
