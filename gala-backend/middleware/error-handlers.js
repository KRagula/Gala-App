const errorLogger = (err, req, res, next) => {
	if (err.classification == 'server') {
		console.log(err);
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
