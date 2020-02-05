const express = require("express");
const router = express.Router();

router.get("/check", (req, res) => {
	res.send({
		user: req.user,
		session: req.session,
		auth: req.isAuthenticated()
	});
});

module.exports = router;
