const withAuth = (req, res, next) => {
	if (!req.session.logged_in) {
		console.log('User is not logged in');
		res.redirect('/login');
	} else {
		console.log('User is logged in');
		next();
	}
};

module.exports = withAuth;
