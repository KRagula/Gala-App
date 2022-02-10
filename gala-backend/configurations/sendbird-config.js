const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

module.exports = {
	appId: process.env.SEND_BIRD_APP_ID,
	secondaryToken: process.env.SEND_BIRD_APP_SECONDARY_TOKEN,
};
