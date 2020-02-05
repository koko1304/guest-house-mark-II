function checkCreateUserField(req, res, next) {
	const { username, password, nickname, role } = req.body;

	if (!nickname) {
		req.flash("err", "Nickname is empty!");
		return res.redirect("/createuser");
	} else {
		req.flash("nickname-field", nickname);
	}

	if (!username) {
		req.flash("err", "Username is empty!");
		return res.redirect("/createuser");
	} else {
		req.flash("username-field", username);
	}

	if (!password) {
		req.flash("err", "Password is empty!");
		return res.redirect("/createuser");
	}

	if (!role) {
		req.flash("err", "Role is empty!");
		return res.redirect("/createuser");
	}

	next();
}

module.exports = checkCreateUserField;
