export default {
	backendPort: process.env.BACKEND_PORT,
	frontendHost: process.env.FRONTEND_HOST,
	frontendPort: process.env.FRONTEND_PORT,
	frontendURL: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
};
