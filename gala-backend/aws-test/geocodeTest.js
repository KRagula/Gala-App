import createClient from './main.js';

const start = async () => {
	client = await createClient();

	const params = {
		IndexName: 'GalaPlaceIndex',
		Text: '4200 Pine St, Philadelphia, PA 19104',
	};

	client.searchPlaceIndexForText(params, (err, data) => {
		if (err) console.error(err);
		if (data) console.log(data);
	});
};

start();
