const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const adminAccess = require("../middlewares/admin-access");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

router.get("/changepassword/:username/:previouspage", authRequire, adminAccess, (req, res) => {
	userModel.findOne({ username: req.params.username }, (err, user) => {
		if (err) return res.redirect("back");
		if (!user) return res.redirect("back");
		if (req.user.role === "admin" && user.role !== "stuff") return res.redirect("back");

		var previouspage = "/" + req.params.previouspage;

		if (previouspage !== "/editprofile") {
			previouspage = previouspage + "/" + req.params.username;
		}

		res.render("change-password-page", {
			message: req.flash("err"),
			username: req.params.username,
			previouspage: previouspage,
			user: req.user
		});
	});
});

router.post("/changepassword", authRequire, adminAccess, (req, res) => {
	const { oldpassword, password, username, previouspage } = req.body;

	var previouspage1 = previouspage;

	if (previouspage1 !== "/editprofile") {
		previouspage1 = "/edituser";
	}

	if (!username) return res.redirect("/changepassword/nooooooouser" + previouspage1);

	if (!oldpassword) {
		req.flash("err", "Old Password is empty!");
		return res.redirect("/changepassword/" + username + previouspage1);
	}

	if (oldpassword.length < 6) {
		req.flash("err", "Old password is less than 6 character long!");
		return res.redirect("/changepassword/" + username + previouspage1);
	}

	if (!password) {
		req.flash("err", "Password is empty!");
		return res.redirect("/changepassword/" + username + previouspage1);
	}

	if (password.length < 6) {
		req.flash("err", "Password must be more than 5 character long!");
		return res.redirect("/changepassword/" + username + previouspage1);
	}

	if (password === oldpassword) {
		req.flash("err", "Password and Old Password is identical!");
		return res.redirect("/changepassword/" + username + previouspage1);
	}

	userModel.findOne({ username }, (err, user) => {
		if (err) return res.redirect("/changepassword/" + username + previouspage1);
		if (!user) return res.redirect("/changepassword/" + username + previouspage1);

		if (req.user.role !== user.role) {
			if (req.user.role !== "superuser" && user.role !== "stuff") {
				return res.redirect("/changepassword/" + username + previouspage1);
			}
		}

		if (bcrypt.compareSync(oldpassword, user.password)) {
			userModel.findByIdAndUpdate(user._id, { $set: { password: bcrypt.hashSync(password, 10) } }, (err, user) => {
				if (err) return res.redirect("/changepassword/" + username + previouspage1);
				req.flash("err", "Password is updated");
				res.redirect("/changepassword/" + username + previouspage1);
			});
		} else {
			req.flash("err", "Old Password isn't correct!");
			res.redirect("/changepassword/" + username + previouspage1);
		}
	});
});

module.exports = router;
