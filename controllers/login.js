const express = require("express");
const router = express.Router();
const passport = require("passport");
const authDeny = require("../middlewares/auth-deny");
const checkUsernamePassword = require("../middlewares/check-username-password");

router.get("/login", authDeny, (req, res) => {
	res.render("login-page", { message: req.flash("err"), username: req.flash("username") });
});

router.post(
	"/login",
	authDeny,
	checkUsernamePassword,
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login"
	})
);

module.exports = router;
