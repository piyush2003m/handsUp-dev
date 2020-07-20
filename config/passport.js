const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Student = require('../models/student')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        Student.findById(id, (err, user) => done(err, user))
      });
}