import Amplify from 'aws-amplify';

import Location from '../node_modules/aws-sdk/clients/location.js';
import awsconfig from '../src/aws-exports.js';

const createClient = async () => {
	Amplify.configure(awsconfig);
	const credentials = await Amplify.Auth.currentCredentials();
	const client = new Location({
		credentials,
		region: awsconfig.aws_project_region,
	});
	return client;
};

export default createClient;
