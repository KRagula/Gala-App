export default {
	backendHost: process.env.REACT_APP_BACKEND_HOST,
	backendPort: process.env.REACT_APP_BACKEND_PORT,
	backendURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`,
};
