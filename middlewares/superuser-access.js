const userModel = require("../models/user");

function superuserAccess(req, res, next) {
	if (req.user.role === "superuser") {
		userModel.find({ _id: { $ne: req.user._id } }, (err, users) => {
			res.render("users-list", { users });
		});
	} else {
		next();
	}
}

module.exports = superuserAccess;
