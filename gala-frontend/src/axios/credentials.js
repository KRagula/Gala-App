import axios from 'axios';

import serverConfig from '../configurations/server-config.js';

export const login = credentials => {
	axios
		.post(`${serverConfig.backendURL}/credential/login`, credentials, { withCredentials: true })
		.then(response => {
			if (response.data.data == 'data') {
				//document.cookie='firstname='+response.data.firstname+';max-age=3600'
				//document.cookie='lastname='+response.data.lastname+';max-age=3600'
				// document.cookie('firstname', response.data.firstname)
				// document.cookie('lastname', response.data.lastname)
				//console.log(response.getResponseHeader('Set-Cookie'))
				//console.log(response.headers.cookie)
				window.location = '/explore';
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

export const signup = registered => {
	axios
		.post(`${serverConfig.backendURL}/credential/signup`, registered, { withCredentials: true })
		.then(response => {
			if (response.data.data == 'data') {
				// document.cookie = 'firstname=' + response.data.firstname + ';max-age=3600';
				// document.cookie = 'lastname=' + response.data.lastname + ';max-age=3600';
				// document.cookie('firstname', response.data.firstname)
				// document.cookie('lastname', response.data.lastname)
				//console.log(response.getResponseHeader('Set-Cookie'))
				//console.log(response.headers.cookie)
				window.location = '/explore';
			}
		})
		.catch(error => {
			if (error.response.status == '409') {
				document.getElementById('errorArea').innerHTML = 'Error User Exists';
			} else {
				document.getElementById('errorArea').innerHTML =
					'Service Unavailable, please try again later';
			}
		});
};
