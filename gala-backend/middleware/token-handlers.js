const checkAuthenticated = (req, res, next) => {
	passport.authenticate('jwt', { session: false });
};

export default {
	checkAuthenticated: checkAuthenticated,
};
