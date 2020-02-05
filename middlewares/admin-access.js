function adminAccess(req, res, next) {
	if (req.user.role !== "admin" && req.user.role !== "superuser") {
		return res.redirect("/check");
	}

	next();
}

module.exports = adminAccess;
