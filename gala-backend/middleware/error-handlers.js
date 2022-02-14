const errorLogger = (err, req, res, next) => {
	if (err.classification == 'server') {
		// Log or do some notification to us here
	}

	next(err);
};

const errorResponder = (err, req, res, next) => {
	res.status(err.statusCode).send({ error: err.message });
};

export default {
	errorLogger: errorLogger,
	errorResponder: errorResponder,
};
