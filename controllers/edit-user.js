const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const adminAccess = require("../middlewares/admin-access");
const userModel = require("../models/user");

router.get("/edituser/:username", authRequire, adminAccess, (req, res) => {
	userModel.findOne({ username: req.params.username }, (err, user) => {
		if (err) return res.redirect("/userslist");
		if (!user) return res.redirect("/userslist");
		if (user.role !== "stuff" && req.user.role !== "superuser") return res.redirect("/userslist");

		res.render("edit-profile-page", {
			message: req.flash("err"),
			user,
			action: "/edituser",
			header: "Edit User",
			cancel: "/userslist",
			page: "/edituser"
		});
	});
});

router.post("/edituser", authRequire, adminAccess, (req, res) => {
	const { username, nickname, oldusername } = req.body;

	if (!nickname) {
		req.flash("err", "Nickname is empty!");
		return res.redirect("/edituser/" + oldusername);
	}

	if (!username) {
		req.flash("err", "Username is empty!");
		return res.redirect("/edituser/" + oldusername);
	}

	userModel.findOne({ username: oldusername }, (err, oldUser) => {
		if (err) return res.redirect("/userslist");
		if (!oldUser) return res.redirect("/userslist");
		if (oldUser.role !== "stuff" && req.user.role !== "superuser") return res.redirect("/userslist");

		if (nickname !== oldUser.nickname && username !== oldUser.username) {
			userModel.findOne({ username }, (err, user) => {
				if (err) return res.redirect("/edituser/" + oldusername);
				if (user) {
					req.flash("err", "User is already exist!");
					return res.redirect("/edituser/" + oldusername);
				}

				userModel.findByIdAndUpdate(oldUser._id, { $set: { username, nickname } }, (err, user) => {
					if (err) return res.redirect("/edituser/" + oldusername);
					req.flash("err", "User is updated");
					res.redirect("/edituser/" + username);
				});
			});
		} else if (nickname !== oldUser.nickname) {
			userModel.findByIdAndUpdate(oldUser._id, { nickname }, (err, user) => {
				if (err) return res.redirect("/edituser/" + oldusername);
				req.flash("err", "User is updated");
				res.redirect("/edituser/" + oldusername);
			});
		} else if (username !== oldUser.username) {
			userModel.findOne({ username }, (err, user) => {
				if (err) return res.redirect("/edituser/" + oldusername);
				if (user) {
					req.flash("err", "User is already exist!");
					return res.redirect("/edituser/" + oldusername);
				}

				userModel.findByIdAndUpdate(oldUser._id, { $set: { username } }, (err, user) => {
					if (err) return res.redirect("/edituser/" + oldusername);
					req.flash("err", "User is updated");
					return res.redirect("/edituser/" + username);
				});
			});
		} else if (nickname === oldUser.nickname && username === oldUser.username) {
			req.flash("err", "No information change!");
			res.redirect("/edituser/" + oldusername);
		}
	});
});

module.exports = router;
