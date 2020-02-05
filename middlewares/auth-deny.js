function authDeny(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/dashboard");
	}

	next();
}

module.exports = authDeny;
