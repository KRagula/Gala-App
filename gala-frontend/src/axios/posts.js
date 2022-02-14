import axios from 'axios';

export const createPost = postData => {
	axios
		.post(`http://localhost:8080/makePost`, postData, { withCredentials: true })
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
