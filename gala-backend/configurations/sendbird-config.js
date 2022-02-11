export default {
	appId: process.env.SEND_BIRD_APP_ID,
	secondaryToken: process.env.SEND_BIRD_APP_SECONDARY_TOKEN,
	apiRequestURL: `https://api-${process.env.SEND_BIRD_APP_ID}.sendbird.com/v3`,
};
