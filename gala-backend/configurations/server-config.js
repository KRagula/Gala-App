export default {
	backendHost: process.env.BACKEND_HOST,
	backendPort: process.env.BACKEND_PORT,
	backendURL: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
	frontendHost: process.env.FRONTEND_HOST,
	frontendPort: process.env.FRONTEND_PORT,
	frontendURL: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
	jwtSecret: process.env.JWT_SECRET,
};
