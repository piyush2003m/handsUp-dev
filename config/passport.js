const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
          const student = await User.findOne({ googleId: profile.id });
          if (student) {
              done(null, student);
          } else {
              let newUser = new User();

              newUser.googleId = profile.id;
              newUser.displayName = profile.displayName;
              newUser.firstName = profile.name.givenName;
              newUser.image = profile.photos[0].value;

              newUser
                  .save()
                  .then(() => done(null, student))
                  .catch((err) => console.log(err));
          }
      } catch (err) {
          console.log(err);
      }
  }))

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
}