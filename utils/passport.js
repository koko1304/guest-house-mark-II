const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

passport.use(
	new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
		userModel.findOne({ username }, (err, user) => {
			if (err) return done(err);
			if (!user || !bcrypt.compareSync(password, user.password)) {
				req.flash("err", "Username and Password aren't valid!");
				return done(null, false);
			}

			done(null, user);
		});
	})
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	userModel.findById(id, (err, user) => {
		if (err) return done(err);

		done(null, user);
	});
});
