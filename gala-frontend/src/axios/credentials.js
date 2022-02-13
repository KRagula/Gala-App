import axios from 'axios';

//dotenv.config({ path: '../../.env' });

export const login = credentials => {
	axios
		.post(`http://localhost:8080/login`, credentials, { withCredentials: true })
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
		.post(`http://localhost:8080/signup`, registered, { withCredentials: true })
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
