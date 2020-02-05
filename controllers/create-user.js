const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const adminAccess = require("../middlewares/admin-access");
const checkCreateUserField = require("../middlewares/check-create-user-field");

router.get("/createuser", authRequire, adminAccess, (req, res) => {
	var roleShow = true;

	if (req.user.role === "admin") {
		roleShow = false;
	}

	res.render("create-user-page", {
		message: req.flash("err"),
		username: req.flash("username-field"),
		nickname: req.flash("nickname-field"),
		rolecheck: roleShow,
		user: req.user
	});
});

router.post("/createuser", authRequire, adminAccess, checkCreateUserField, (req, res) => {
	userModel.findOne({ username: req.body.username }, (err, user) => {
		if (err) return res.redirect("/createuser");
		if (user) {
			req.flash("err", "Username is already exist!");
			return res.redirect("/createuser");
		}

		if (req.body.password.length < 6) {
			req.flash("err", "Password must be more than 5 character long!");
			return res.redirect("/createuser");
		}

		var { username, password, nickname, role } = req.body;

		if (req.user.role !== "superuser") {
			role = "stuff";
		}

		if (role !== "stuff" && role !== "admin") {
			req.flash("err", "Something when wrong please try again later!");
			return res.redirect("/createuser");
		}

		const newUser = new userModel({ username, password: bcrypt.hashSync(password, 10), nickname, role });

		newUser.save((err, user) => {
			if (err) return res.redirect("/createuser");
			res.redirect("/userslist");
		});
	});
});

module.exports = router;
