const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");

router.get("/logout", authRequire, (req, res) => {
	req.logout();
	res.redirect("/login");
});

module.exports = router;
