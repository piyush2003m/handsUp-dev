const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:5000/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const user = await User.findOne({ googleId: profile.id });
					if (user) {
						done(null, user);
					} else {
						const { id, displayName, name, photos, emails } = profile;

						const userProfile = {
							googleId: id,
							displayName: displayName,
							firstName: name.givenName,
							image: photos[0].value,
							email: emails[0].value,
							role: 'student',
						};

						const newUser = await User.create(userProfile);
						done(null, newUser);
					}
				} catch (err) {
					console.log(err);
				}
			},
		),
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => done(err, user))
	});
};
