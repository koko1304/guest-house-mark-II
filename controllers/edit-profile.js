const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const adminAccess = require("../middlewares/admin-access");
const userModel = require("../models/user");

router.get("/editprofile", authRequire, adminAccess, (req, res) => {
	res.render("edit-profile-page", {
		message: req.flash("err"),
		user: req.user,
		action: "/editprofile",
		header: "Edit Profile",
		cancel: "/dashboard",
		page: "/editprofile"
	});
});

router.post("/editprofile", authRequire, adminAccess, (req, res) => {
	const { username, nickname } = req.body;

	if (!nickname) {
		req.flash("err", "Nickname is empty!");
		return res.redirect("/editprofile");
	}

	if (!username) {
		req.flash("err", "Username is empty!");
		return res.redirect("/editprofile");
	}

	if (nickname !== req.user.nickname && username !== req.user.username) {
		userModel.findOne({ username }, (err, user) => {
			if (err) return res.redirect("/editprofile");
			if (user) {
				req.flash("err", "User is already exist!");
				return res.redirect("/editprofile");
			}

			userModel.findByIdAndUpdate(req.user._id, { $set: { username, nickname } }, (err, user) => {
				if (err) return res.redirect("/editprofile");
				req.flash("err", "User is updated");
				res.redirect("/editprofile");
			});
		});
	} else if (nickname !== req.user.nickname) {
		userModel.findByIdAndUpdate(req.user._id, { nickname }, (err, user) => {
			if (err) return res.redirect("/editprofile");
			req.flash("err", "User is updated");
			res.redirect("/editprofile");
		});
	} else if (username !== req.user.username) {
		userModel.findOne({ username }, (err, user) => {
			if (err) return res.redirect("/editprofile");
			if (user) {
				req.flash("err", "User is already exist!");
				return res.redirect("/editprofile");
			}

			userModel.findByIdAndUpdate(req.user._id, { $set: { username } }, (err, user) => {
				if (err) return res.redirect("/editprofile");
				req.flash("err", "User is updated");
				return res.redirect("/editprofile");
			});
		});
	} else if (nickname === req.user.nickname && username === req.user.username) {
		req.flash("err", "No information change!");
		res.redirect("/editprofile");
	}
});

module.exports = router;
