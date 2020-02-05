function checkUsernamePassword(req, res, next) {
	if (!req.body.username) {
		req.flash("err", "Username is empty!");
		return res.redirect("/login");
	} else {
		req.flash("username", req.body.username);
	}

	if (!req.body.password) {
		req.flash("err", "Password is empty!");
		return res.redirect("/login");
	}

	next();
}

module.exports = checkUsernamePassword;
