import axios from 'axios';

import serverConfig from '../configurations/server-config.js';
import routeCredential from '../configurations/route-credential-config.js';
import ROUTE from '../configurations/route-frontend-config.js';

export const login = credentials => {
	axios
		.post(`${serverConfig.backendURL}${routeCredential.login}`, credentials, {
			withCredentials: true,
		})
		.then(response => {
			if (response.data.data == 'data') {
				//document.cookie='firstname='+response.data.firstname+';max-age=3600'
				//document.cookie='lastname='+response.data.lastname+';max-age=3600'
				// document.cookie('firstname', response.data.firstname)
				// document.cookie('lastname', response.data.lastname)
				//console.log(response.getResponseHeader('Set-Cookie'))
				//console.log(response.headers.cookie)
				window.location = ROUTE.EXPLORE;
			}
		})
		.catch(error => {
			if (error.response.status == '409') {
				document.getElementById('errorArea').innerHTML = "Incorrect Password or User Doesn't Exist";
			} else {
				document.getElementById('errorArea').innerHTML = "Incorrect Password or User Doesn't Exist";
			}
		});
};

export const signup = async registered => {
	return axios
		.post(`${serverConfig.backendURL}${routeCredential.signup}`, registered, {
			withCredentials: true,
		})
		.then(response => {
			if (response.data.data == 'data') {
				// document.cookie = 'firstname=' + response.data.firstname + ';max-age=3600';
				// document.cookie = 'lastname=' + response.data.lastname + ';max-age=3600';
				// document.cookie('firstname', response.data.firstname)
				// document.cookie('lastname', response.data.lastname)
				//console.log(response.getResponseHeader('Set-Cookie'))
				//console.log(response.headers.cookie)
				return true;
			}
		})
		.catch(error => {
			if (error.response.status == '409') {
				document.getElementById('errorArea').innerHTML = 'Error User Exists';
			} else {
				document.getElementById('errorArea').innerHTML =
					'Service Unavailable, please try again later';
			}
			return false;
		});
};

export const logout = async () => {
	axios.delete(
		`${serverConfig.backendURL}/credential/logout`,
		{},
		{
			withCredentials: true,
		}
	);
};
